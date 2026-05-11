from __future__ import annotations

from datetime import datetime

from sqlalchemy import (
    BigInteger,
    DateTime,
    ForeignKey,
    Index,
    Integer,
    SmallInteger,
    String,
    func,
)
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class Violation(Base):
    __tablename__ = "violations"
    __table_args__ = (
        Index("ix_violations_user_created", "user_id", "created_at"),
    )

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(
        BigInteger, ForeignKey("users.telegram_id", ondelete="CASCADE"), nullable=False
    )
    chat_id: Mapped[int] = mapped_column(
        BigInteger, ForeignKey("chats.chat_id", ondelete="CASCADE"), nullable=False
    )
    message_text_hash: Mapped[str] = mapped_column(String(64), nullable=False)
    message_excerpt: Mapped[str | None] = mapped_column(String(120), nullable=True)
    reason: Mapped[str] = mapped_column(String(32), nullable=False)
    severity: Mapped[int] = mapped_column(SmallInteger, default=1, nullable=False)
    action_taken: Mapped[str] = mapped_column(String(16), nullable=False)
    mute_until: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    classifier_json: Mapped[dict | None] = mapped_column(JSONB().with_variant(String(2000), "sqlite"), nullable=True)
    latency_ms: Mapped[int | None] = mapped_column(Integer, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
