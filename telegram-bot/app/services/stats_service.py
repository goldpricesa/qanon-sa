from __future__ import annotations

from datetime import datetime, timedelta, timezone
from typing import TypedDict

from sqlalchemy import func, select

from app.db.models.legal_question import LegalQuestion
from app.db.models.user import User
from app.db.models.violation import Violation
from app.db.session import session_scope


class DashboardCounters(TypedDict):
    deleted_24h: int
    violations_24h: int
    currently_muted: int
    questions_24h: int
    avg_latency_ms_24h: float
    jailbreak_attempts_24h: int


def _since(hours: int) -> datetime:
    return datetime.now(timezone.utc) - timedelta(hours=hours)


class StatsService:
    async def dashboard_counters(self) -> DashboardCounters:
        now = datetime.now(timezone.utc)
        async with session_scope() as session:
            since_24 = _since(24)

            deleted = await session.scalar(
                select(func.count(Violation.id)).where(
                    Violation.action_taken == "silent_delete",
                    Violation.created_at >= since_24,
                )
            )
            violations = await session.scalar(
                select(func.count(Violation.id)).where(Violation.created_at >= since_24)
            )
            currently_muted = await session.scalar(
                select(func.count(User.telegram_id)).where(
                    User.muted_until.isnot(None),
                    User.muted_until > now,
                )
            )
            questions = await session.scalar(
                select(func.count(LegalQuestion.id)).where(LegalQuestion.created_at >= since_24)
            )
            avg_latency = await session.scalar(
                select(func.coalesce(func.avg(LegalQuestion.latency_ms), 0)).where(
                    LegalQuestion.created_at >= since_24
                )
            )
            jailbreaks = await session.scalar(
                select(func.count(Violation.id)).where(
                    Violation.reason == "jailbreak",
                    Violation.created_at >= since_24,
                )
            )

        return DashboardCounters(
            deleted_24h=int(deleted or 0),
            violations_24h=int(violations or 0),
            currently_muted=int(currently_muted or 0),
            questions_24h=int(questions or 0),
            avg_latency_ms_24h=float(avg_latency or 0),
            jailbreak_attempts_24h=int(jailbreaks or 0),
        )
