from __future__ import annotations

from enum import StrEnum
from typing import Literal

from pydantic import BaseModel, Field, field_validator


class PrefilterVerdict(StrEnum):
    PASS = "pass"
    HARD_BLOCK_JAILBREAK = "hard_block_jailbreak"
    HARD_BLOCK_BANNED = "hard_block_banned"
    LIKELY_OFF_TOPIC = "likely_off_topic"


class PrefilterResult(BaseModel):
    verdict: PrefilterVerdict
    matched_pattern: str | None = None
    note: str | None = None


CategoryLiteral = Literal[
    "labor",
    "commercial",
    "criminal",
    "personal_status",
    "traffic",
    "enforcement",
    "contracts",
    "companies",
    "civil_rights",
    "general",
    "none",
]

OffTopicLiteral = Literal["political", "religious", "tech", "sports", "chat", "none"]


class ClassifierOutput(BaseModel):
    is_legal: bool = False
    is_saudi_scope: bool = False
    needs_lawyer: bool = False
    is_jailbreak: bool = False
    category: CategoryLiteral = "none"
    confidence: float = Field(0.0, ge=0.0, le=1.0)
    off_topic_kind: OffTopicLiteral = "none"

    @field_validator("confidence", mode="before")
    @classmethod
    def _clamp(cls, v):
        try:
            f = float(v)
        except (TypeError, ValueError):
            return 0.0
        return max(0.0, min(1.0, f))

    @classmethod
    def safe_default(cls) -> "ClassifierOutput":
        return cls(
            is_legal=False,
            is_saudi_scope=False,
            needs_lawyer=False,
            is_jailbreak=False,
            category="none",
            confidence=0.0,
            off_topic_kind="chat",
        )
