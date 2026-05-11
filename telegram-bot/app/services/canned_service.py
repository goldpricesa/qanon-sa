from __future__ import annotations

import time

from sqlalchemy import select

from app.core.i18n import CANNED_DEFAULTS
from app.db.models.canned_message import CannedMessage
from app.db.session import session_scope

_CACHE: dict[str, tuple[float, str]] = {}
_TTL = 30.0


class CannedService:
    async def get(self, key: str) -> str:
        now = time.monotonic()
        cached = _CACHE.get(key)
        if cached and (now - cached[0]) < _TTL:
            return cached[1]

        async with session_scope() as session:
            row = (
                await session.execute(select(CannedMessage).where(CannedMessage.key == key))
            ).scalar_one_or_none()

        if row is not None:
            _CACHE[key] = (now, row.content_ar)
            return row.content_ar

        return CANNED_DEFAULTS.get(key, "")

    async def set(self, key: str, content_ar: str, admin_id: int | None = None) -> None:
        async with session_scope() as session:
            row = (
                await session.execute(select(CannedMessage).where(CannedMessage.key == key))
            ).scalar_one_or_none()
            if row is None:
                session.add(CannedMessage(key=key, content_ar=content_ar, updated_by=admin_id))
            else:
                row.content_ar = content_ar
                row.updated_by = admin_id
        _CACHE.pop(key, None)


def invalidate_canned_cache() -> None:
    _CACHE.clear()
