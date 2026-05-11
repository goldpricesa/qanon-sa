from __future__ import annotations

import asyncio
import json
import sys
from dataclasses import dataclass

import numpy as np
from sqlalchemy import bindparam, select, text

from app.core.config import get_settings
from app.core.constants import CATEGORY_LABEL_AR, LegalCategory
from app.core.logging import configure_logging, get_logger
from app.db.models.kb_chunk import KbChunk
from app.db.session import session_scope
from app.llm.embeddings import Embedder

log = get_logger(__name__)


@dataclass
class RetrievedChunk:
    id: int
    post_slug: str
    title: str
    category: str
    category_label_ar: str
    content: str
    score: float


class Retriever:
    def __init__(self, embedder: Embedder | None = None):
        self.embedder = embedder or Embedder()
        self.settings = get_settings()

    async def retrieve(
        self,
        query: str,
        *,
        top_k: int | None = None,
        category: str | None = None,
    ) -> list[RetrievedChunk]:
        if not query.strip():
            return []

        k = top_k or self.settings.rag_top_k
        loop = asyncio.get_running_loop()
        vec = await loop.run_in_executor(None, self.embedder.embed_query, query)

        if self.settings.is_sqlite:
            return await self._retrieve_sqlite(vec, k, category)
        return await self._retrieve_pgvector(vec, k, category)

    async def _retrieve_pgvector(
        self, query_vec: np.ndarray, k: int, category: str | None
    ) -> list[RetrievedChunk]:
        vec_literal = "[" + ",".join(f"{x:.6f}" for x in query_vec.tolist()) + "]"

        async with session_scope() as session:
            base = (
                "SELECT id, post_slug, title, category, content, "
                "(embedding <=> CAST(:vec AS vector)) AS distance "
                "FROM kb_chunks WHERE embedding IS NOT NULL "
            )
            params: dict = {"vec": vec_literal, "limit": k}

            sql = base
            if category and category not in (LegalCategory.NONE.value, LegalCategory.GENERAL.value):
                sql += "AND category = :category "
                params["category"] = category
            sql += "ORDER BY distance ASC LIMIT :limit"

            rows = (await session.execute(text(sql), params)).all()

            if len(rows) < 2 and category:
                rows = (
                    await session.execute(
                        text(base + "ORDER BY distance ASC LIMIT :limit"),
                        {"vec": vec_literal, "limit": k},
                    )
                ).all()

            return [
                RetrievedChunk(
                    id=r.id,
                    post_slug=r.post_slug,
                    title=r.title,
                    category=r.category,
                    category_label_ar=CATEGORY_LABEL_AR.get(r.category, r.category),
                    content=r.content,
                    score=1.0 - float(r.distance),
                )
                for r in rows
            ]

    async def _retrieve_sqlite(
        self, query_vec: np.ndarray, k: int, category: str | None
    ) -> list[RetrievedChunk]:
        async with session_scope() as session:
            stmt = select(KbChunk)
            if category and category not in (LegalCategory.NONE.value, LegalCategory.GENERAL.value):
                stmt = stmt.where(KbChunk.category == category)
            rows = (await session.execute(stmt)).scalars().all()

        if not rows:
            return []

        embeddings = []
        kept = []
        for r in rows:
            if r.embedding is None:
                continue
            raw = r.embedding if isinstance(r.embedding, list) else json.loads(r.embedding)
            embeddings.append(np.asarray(raw, dtype=np.float32))
            kept.append(r)

        if not embeddings:
            return []

        mat = np.vstack(embeddings)
        scores = mat @ query_vec
        idx = np.argsort(-scores)[:k]
        return [
            RetrievedChunk(
                id=kept[i].id,
                post_slug=kept[i].post_slug,
                title=kept[i].title,
                category=kept[i].category,
                category_label_ar=CATEGORY_LABEL_AR.get(kept[i].category, kept[i].category),
                content=kept[i].content,
                score=float(scores[i]),
            )
            for i in idx
        ]


async def _cli() -> None:
    configure_logging("retriever-cli")
    if len(sys.argv) < 2:
        print("usage: python -m app.llm.rag_retriever <query>")
        sys.exit(1)
    query = " ".join(sys.argv[1:])
    retriever = Retriever()
    results = await retriever.retrieve(query)
    for r in results:
        print(f"[{r.score:.3f}] {r.category_label_ar} | {r.title}")
        print(r.content[:200].replace("\n", " "))
        print("---")


if __name__ == "__main__":
    asyncio.run(_cli())
