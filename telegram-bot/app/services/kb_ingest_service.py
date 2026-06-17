"""Chunking utilities for Arabic legal posts."""
from __future__ import annotations

import re

_PARA_SPLIT = re.compile(r"\n{2,}|\r\n\r\n")
# Rough char-to-token estimate for Arabic with Qwen tokenizer: ~3.5 chars/token.
TARGET_CHARS = 2200       # ~600 tokens
MAX_CHARS = 3200          # ~900 tokens
MIN_CHARS = 250           # don't ship near-empty chunks


def _split_into_paragraphs(text: str) -> list[str]:
    parts = _PARA_SPLIT.split(text)
    return [p.strip() for p in parts if p and p.strip()]


def chunk_post(
    *,
    title: str,
    category: str,
    category_label: str,
    content_text: str,
) -> list[str]:
    """Split a post into context-headed Arabic chunks suitable for embedding."""
    paragraphs = _split_into_paragraphs(content_text)
    if not paragraphs:
        return []

    header = (
        f"العنوان: {title}\n"
        f"الفئة: {category_label or category}\n"
        "المقطع:\n"
    )

    chunks: list[str] = []
    buf: list[str] = []
    buf_len = 0

    def flush() -> None:
        nonlocal buf, buf_len
        if buf and buf_len >= MIN_CHARS:
            chunks.append(header + "\n\n".join(buf))
        buf = []
        buf_len = 0

    for para in paragraphs:
        if len(para) > MAX_CHARS:
            # Hard-split very long paragraphs by sentence-ish boundaries.
            sentences = re.split(r"(?<=[.؟!])\s+", para)
            for s in sentences:
                if buf_len + len(s) + 2 > TARGET_CHARS and buf_len >= MIN_CHARS:
                    flush()
                buf.append(s)
                buf_len += len(s) + 2
            continue

        if buf_len + len(para) + 2 > TARGET_CHARS and buf_len >= MIN_CHARS:
            flush()
        buf.append(para)
        buf_len += len(para) + 2

    flush()
    return chunks
