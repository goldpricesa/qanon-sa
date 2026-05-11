from __future__ import annotations

from datetime import datetime, timezone

from sqlalchemy import desc, select

from app.core.constants import AppealStatus
from app.db.models.appeal import Appeal
from app.db.models.violation import Violation
from app.db.session import session_scope


class AppealService:
    async def submit(self, *, user_id: int, appeal_text: str) -> int:
        appeal_text = appeal_text.strip()[:500]
        async with session_scope() as session:
            last_violation = (
                await session.execute(
                    select(Violation)
                    .where(Violation.user_id == user_id)
                    .order_by(desc(Violation.created_at))
                    .limit(1)
                )
            ).scalar_one_or_none()
            row = Appeal(
                user_id=user_id,
                violation_id=last_violation.id if last_violation else None,
                appeal_text=appeal_text,
                status=AppealStatus.OPEN.value,
            )
            session.add(row)
            await session.flush()
            return row.id

    async def resolve(
        self,
        *,
        appeal_id: int,
        reviewer_admin_id: int,
        status: AppealStatus,
        note: str | None = None,
    ) -> bool:
        async with session_scope() as session:
            row = (
                await session.execute(select(Appeal).where(Appeal.id == appeal_id))
            ).scalar_one_or_none()
            if row is None:
                return False
            row.status = status.value
            row.reviewer_admin_id = reviewer_admin_id
            row.reviewer_note = note
            row.reviewed_at = datetime.now(timezone.utc)
            return True
