"""Ingest kb/posts.json into the kb_chunks table with embeddings.

Usage:
    python -m scripts.ingest_kb [--if-empty]
"""
from __future__ import annotations

import argparse
import asyncio
import hashlib
import json
import re
import sys
from datetime import date
from pathlib import Path

from sqlalchemy import delete, select

from app.core.logging import configure_logging, get_logger
from app.db.models.kb_chunk import KbChunk
from app.db.session import session_scope
from app.llm.embeddings import Embedder
from app.services.kb_ingest_service import chunk_post

KB_PATH = Path("kb/posts.json")
log = get_logger(__name__)


def _hash(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def _parse_date(value) -> date | None:
    if not value:
        return None
    if isinstance(value, str):
        try:
            return date.fromisoformat(value[:10])
        except ValueError:
            return None
    return None


async def _is_empty() -> bool:
    async with session_scope() as session:
        result = await session.execute(select(KbChunk.id).limit(1))
        return result.first() is None


async def ingest(if_empty: bool = False) -> int:
    if if_empty and not await _is_empty():
        log.info("kb_chunks not empty, skipping ingest")
        return 0

    if not KB_PATH.exists():
        log.error("kb/posts.json not found; run scripts/extract_kb.mjs first")
        return 0

    raw = json.loads(KB_PATH.read_text(encoding="utf-8"))
    posts = raw.get("posts", [])
    log.info("kb_ingest_start", posts=len(posts))

    embedder = Embedder()

    async with session_scope() as session:
        await session.execute(delete(KbChunk))

        all_chunks: list[KbChunk] = []
        passages: list[str] = []

        for post in posts:
            chunks = chunk_post(
                title=post["title"],
                category=post["category"],
                category_label=post.get("category_label_ar", ""),
                content_text=post["content_text"],
            )
            reviewed = _parse_date(post.get("reviewed_at"))
            source_urls = post.get("source_urls") or []

            for idx, chunk_text in enumerate(chunks):
                kb = KbChunk(
                    post_slug=post["slug"],
                    title=post["title"][:500],
                    category=post["category"],
                    position=idx,
                    content=chunk_text,
                    content_hash=_hash(chunk_text),
                    source_urls=source_urls if isinstance(source_urls, (list, dict)) else None,
                    reviewed_at=reviewed,
                )
                all_chunks.append(kb)
                # e5 convention: prefix passages
                passages.append(f"passage: {chunk_text}")

        if not all_chunks:
            log.warning("no chunks produced")
            return 0

        log.info("embedding_chunks", count=len(passages))
        vectors = embedder.embed(passages)

        for kb, vec in zip(all_chunks, vectors, strict=True):
            if hasattr(KbChunk.embedding.property.columns[0].type, "dim"):
                kb.embedding = vec.tolist()
            else:
                kb.embedding = json.dumps(vec.tolist())

        session.add_all(all_chunks)

    log.info("kb_ingest_done", chunks=len(all_chunks))
    return len(all_chunks)


def main() -> None:
    configure_logging("ingest")
    parser = argparse.ArgumentParser()
    parser.add_argument("--if-empty", action="store_true", help="Skip if kb_chunks already populated")
    args = parser.parse_args()
    count = asyncio.run(ingest(if_empty=args.if_empty))
    sys.exit(0 if count >= 0 else 1)


if __name__ == "__main__":
    main()
