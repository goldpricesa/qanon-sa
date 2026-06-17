from __future__ import annotations

import re

from app.core.i18n import DISCLAIMER

_EMOJI_RE = re.compile(
    "["
    "\U0001F600-\U0001F64F"
    "\U0001F300-\U0001F5FF"
    "\U0001F680-\U0001F6FF"
    "\U0001F700-\U0001F77F"
    "\U0001F780-\U0001F7FF"
    "\U0001F800-\U0001F8FF"
    "\U0001F900-\U0001F9FF"
    "\U0001FA00-\U0001FA6F"
    "\U0001FA70-\U0001FAFF"
    "\U00002700-\U000027BF"
    "\U00002600-\U000026FF"
    "]+",
    flags=re.UNICODE,
)

_MAX_CHARS = 900
_SENTENCE_END = re.compile(r"[\.؟!]\s")


def _strip_emoji(text: str) -> str:
    return _EMOJI_RE.sub("", text)


def _truncate(text: str, limit: int = _MAX_CHARS) -> str:
    if len(text) <= limit:
        return text
    cut = text[:limit]
    matches = list(_SENTENCE_END.finditer(cut))
    if matches:
        end = matches[-1].end()
        return cut[:end].rstrip()
    return cut.rstrip()


def finalize_answer(raw: str) -> str:
    text = raw.strip()
    text = _strip_emoji(text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    text = _truncate(text)
    if DISCLAIMER not in text:
        sep = "\n\n" if not text.endswith("\n") else "\n"
        text = f"{text}{sep}{DISCLAIMER}"
    return text.strip()
