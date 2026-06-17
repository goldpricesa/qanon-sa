from __future__ import annotations

import json

from app.core.config import get_settings
from app.db.models.legal_question import LegalQuestion
from app.db.session import session_scope


class QuestionLogService:
    def __init__(self) -> None:
        self.settings = get_settings()

    async def record(
        self,
        *,
        user_id: int,
        chat_id: int,
        question: str,
        answer: str,
        category: str | None,
        retrieved_chunk_ids: list[int] | None,
        latency_ms: int | None,
        model: str | None,
    ) -> int:
        ids_value = retrieved_chunk_ids
        if self.settings.is_sqlite and retrieved_chunk_ids is not None:
            ids_value = json.dumps(retrieved_chunk_ids)

        async with session_scope() as session:
            row = LegalQuestion(
                user_id=user_id,
                chat_id=chat_id,
                question=question[:4000],
                answer=answer[:4000],
                category=category,
                retrieved_chunk_ids=ids_value,
                latency_ms=latency_ms,
                model=model,
            )
            session.add(row)
            await session.flush()
            return row.id
