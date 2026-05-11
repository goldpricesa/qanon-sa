from __future__ import annotations

import hashlib
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone

from sqlalchemy import select

from app.core.config import get_settings
from app.core.constants import ModerationAction, ViolationReason
from app.db.models.user import User
from app.db.models.violation import Violation
from app.db.session import session_scope
from app.services.settings_service import SettingsService


@dataclass
class ViolationOutcome:
    total_violations: int
    should_warn: bool
    should_mute: bool
    mute_hours: int


def _hash(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def _excerpt(text: str, limit: int = 80) -> str:
    text = " ".join(text.split())
    return text[:limit]


class ViolationService:
    def __init__(self) -> None:
        self.settings = get_settings()

    async def record(
        self,
        *,
        user_id: int,
        chat_id: int,
        message_text: str,
        reason: ViolationReason,
        action: ModerationAction,
        classifier_json: dict | None = None,
        latency_ms: int | None = None,
    ) -> ViolationOutcome:
        settings_svc = SettingsService()
        warn_threshold = await settings_svc.get_int("warn_threshold", self.settings.warn_threshold)
        mute_threshold = await settings_svc.get_int("mute_threshold", self.settings.mute_threshold)
        mute_hours = await settings_svc.get_int("mute_duration_hours", self.settings.default_mute_hours)

        mute_until: datetime | None = None
        should_warn = False
        should_mute = False

        async with session_scope() as session:
            user = (
                await session.execute(select(User).where(User.telegram_id == user_id))
            ).scalar_one_or_none()
            if user is None:
                user = User(telegram_id=user_id, total_violations=0)
                session.add(user)
                await session.flush()

            user.total_violations = (user.total_violations or 0) + 1
            total = user.total_violations

            if total >= mute_threshold:
                should_mute = True
                mute_until = datetime.now(timezone.utc) + timedelta(hours=mute_hours)
                user.muted_until = mute_until
            elif total >= warn_threshold:
                should_warn = True

            session.add(
                Violation(
                    user_id=user_id,
                    chat_id=chat_id,
                    message_text_hash=_hash(message_text),
                    message_excerpt=_excerpt(message_text),
                    reason=reason.value,
                    severity=1 if not should_mute else 2,
                    action_taken=action.value,
                    mute_until=mute_until,
                    classifier_json=classifier_json,
                    latency_ms=latency_ms,
                )
            )

        return ViolationOutcome(
            total_violations=total,
            should_warn=should_warn and not should_mute,
            should_mute=should_mute,
            mute_hours=mute_hours,
        )

    async def reset_user(self, user_id: int) -> None:
        async with session_scope() as session:
            user = (
                await session.execute(select(User).where(User.telegram_id == user_id))
            ).scalar_one_or_none()
            if user is not None:
                user.total_violations = 0
                user.muted_until = None
