from __future__ import annotations

from dataclasses import dataclass

from app.core.constants import ModerationAction, ViolationReason
from app.moderation.schemas import (
    ClassifierOutput,
    PrefilterResult,
    PrefilterVerdict,
)


@dataclass
class Decision:
    action: ModerationAction
    reason: ViolationReason | None
    category: str
    classifier: ClassifierOutput
    prefilter: PrefilterResult


def decide(
    *,
    chat_type: str,
    prefilter: PrefilterResult,
    classifier: ClassifierOutput,
    confidence_floor: float,
) -> Decision:
    """Map prefilter + classifier outputs to a moderation action.

    DMs (`private`) never delete or mute; they get REFUSE for off-topic
    and ANSWER / ESCALATE_LAWYER for legal content.
    """
    is_group = chat_type in {"group", "supergroup"}

    if prefilter.verdict == PrefilterVerdict.HARD_BLOCK_JAILBREAK or classifier.is_jailbreak:
        return Decision(
            action=ModerationAction.SILENT_DELETE if is_group else ModerationAction.REFUSE,
            reason=ViolationReason.JAILBREAK,
            category=classifier.category,
            classifier=classifier,
            prefilter=prefilter,
        )

    if prefilter.verdict == PrefilterVerdict.HARD_BLOCK_BANNED:
        return Decision(
            action=ModerationAction.SILENT_DELETE if is_group else ModerationAction.REFUSE,
            reason=ViolationReason.BANNED_WORD,
            category=classifier.category,
            classifier=classifier,
            prefilter=prefilter,
        )

    # Lenient default: only delete when classifier is confident AND it says off-topic.
    if not classifier.is_legal:
        if classifier.confidence >= confidence_floor:
            return Decision(
                action=ModerationAction.SILENT_DELETE if is_group else ModerationAction.REFUSE,
                reason=ViolationReason.OFF_TOPIC,
                category=classifier.category,
                classifier=classifier,
                prefilter=prefilter,
            )
        # Low confidence + not clearly legal → ignore in groups, refuse in DM.
        return Decision(
            action=ModerationAction.IGNORE if is_group else ModerationAction.REFUSE,
            reason=ViolationReason.OFF_TOPIC,
            category=classifier.category,
            classifier=classifier,
            prefilter=prefilter,
        )

    if classifier.is_legal and not classifier.is_saudi_scope:
        return Decision(
            action=ModerationAction.SILENT_DELETE if is_group else ModerationAction.REFUSE,
            reason=ViolationReason.NON_SAUDI,
            category=classifier.category,
            classifier=classifier,
            prefilter=prefilter,
        )

    if classifier.needs_lawyer:
        return Decision(
            action=ModerationAction.ESCALATE_LAWYER,
            reason=ViolationReason.COMPLEX_HANDOFF,
            category=classifier.category,
            classifier=classifier,
            prefilter=prefilter,
        )

    return Decision(
        action=ModerationAction.ANSWER,
        reason=None,
        category=classifier.category,
        classifier=classifier,
        prefilter=prefilter,
    )
