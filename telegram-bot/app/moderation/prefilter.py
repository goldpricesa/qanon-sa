from __future__ import annotations

import re
import time
from dataclasses import dataclass

from sqlalchemy import select

from app.db.models.banned_word import BannedWord
from app.db.session import session_scope
from app.moderation.guardrails import (
    arabic_ratio,
    contains_url,
    is_jailbreak,
    is_programming_request,
)
from app.moderation.schemas import PrefilterResult, PrefilterVerdict

_MIN_LEN = 2
_MAX_LEN = 2000

_BANNED_CACHE: list[tuple[re.Pattern, str]] = []
_BANNED_CACHE_AT: float = 0.0
_BANNED_TTL = 60.0  # seconds


async def _load_banned_patterns() -> list[tuple[re.Pattern, str]]:
    global _BANNED_CACHE, _BANNED_CACHE_AT
    now = time.monotonic()
    if _BANNED_CACHE and (now - _BANNED_CACHE_AT) < _BANNED_TTL:
        return _BANNED_CACHE

    compiled: list[tuple[re.Pattern, str]] = []
    async with session_scope() as session:
        rows = (
            await session.execute(
                select(BannedWord).where(BannedWord.is_active.is_(True))
            )
        ).scalars().all()
        for row in rows:
            try:
                if row.is_regex:
                    pat = re.compile(row.pattern, re.IGNORECASE)
                else:
                    pat = re.compile(re.escape(row.pattern), re.IGNORECASE)
                compiled.append((pat, row.pattern))
            except re.error:
                continue

    _BANNED_CACHE = compiled
    _BANNED_CACHE_AT = now
    return compiled


@dataclass
class PrefilterContext:
    arabic_ratio: float
    has_url: bool


async def prefilter(text: str) -> tuple[PrefilterResult, PrefilterContext]:
    stripped = text.strip()
    n = len(stripped)
    ctx = PrefilterContext(
        arabic_ratio=arabic_ratio(stripped),
        has_url=contains_url(stripped),
    )

    if n < _MIN_LEN or n > _MAX_LEN:
        return (
            PrefilterResult(verdict=PrefilterVerdict.LIKELY_OFF_TOPIC, note="length"),
            ctx,
        )

    jb, jb_pat = is_jailbreak(stripped)
    if jb:
        return (
            PrefilterResult(verdict=PrefilterVerdict.HARD_BLOCK_JAILBREAK, matched_pattern=jb_pat),
            ctx,
        )

    prog, prog_pat = is_programming_request(stripped)
    if prog:
        return (
            PrefilterResult(
                verdict=PrefilterVerdict.LIKELY_OFF_TOPIC,
                matched_pattern=prog_pat,
                note="programming",
            ),
            ctx,
        )

    for pat, raw in await _load_banned_patterns():
        if pat.search(stripped):
            return (
                PrefilterResult(verdict=PrefilterVerdict.HARD_BLOCK_BANNED, matched_pattern=raw),
                ctx,
            )

    if ctx.arabic_ratio < 0.4 and n > 12:
        return (
            PrefilterResult(verdict=PrefilterVerdict.LIKELY_OFF_TOPIC, note="non_arabic"),
            ctx,
        )

    return PrefilterResult(verdict=PrefilterVerdict.PASS), ctx


def invalidate_banned_cache() -> None:
    global _BANNED_CACHE, _BANNED_CACHE_AT
    _BANNED_CACHE = []
    _BANNED_CACHE_AT = 0.0
