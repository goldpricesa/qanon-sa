import pytest

from app.core.constants import ModerationAction, ViolationReason
from app.moderation.decision import decide
from app.moderation.schemas import ClassifierOutput, PrefilterResult, PrefilterVerdict


def _pre(verdict=PrefilterVerdict.PASS):
    return PrefilterResult(verdict=verdict)


@pytest.mark.parametrize("chat_type", ["group", "supergroup"])
def test_jailbreak_group_silent_deletes(chat_type):
    d = decide(
        chat_type=chat_type,
        prefilter=_pre(PrefilterVerdict.HARD_BLOCK_JAILBREAK),
        classifier=ClassifierOutput.safe_default(),
        confidence_floor=0.6,
    )
    assert d.action == ModerationAction.SILENT_DELETE
    assert d.reason == ViolationReason.JAILBREAK


def test_jailbreak_dm_refuses():
    d = decide(
        chat_type="private",
        prefilter=_pre(PrefilterVerdict.HARD_BLOCK_JAILBREAK),
        classifier=ClassifierOutput.safe_default(),
        confidence_floor=0.6,
    )
    assert d.action == ModerationAction.REFUSE


def test_off_topic_low_confidence_group_ignored():
    classifier = ClassifierOutput(is_legal=False, confidence=0.3)
    d = decide(chat_type="group", prefilter=_pre(), classifier=classifier, confidence_floor=0.6)
    assert d.action == ModerationAction.IGNORE


def test_off_topic_high_confidence_group_deleted():
    classifier = ClassifierOutput(is_legal=False, confidence=0.9, off_topic_kind="sports")
    d = decide(chat_type="group", prefilter=_pre(), classifier=classifier, confidence_floor=0.6)
    assert d.action == ModerationAction.SILENT_DELETE
    assert d.reason == ViolationReason.OFF_TOPIC


def test_legal_in_scope_answers():
    classifier = ClassifierOutput(
        is_legal=True, is_saudi_scope=True, needs_lawyer=False,
        category="labor", confidence=0.85,
    )
    d = decide(chat_type="private", prefilter=_pre(), classifier=classifier, confidence_floor=0.6)
    assert d.action == ModerationAction.ANSWER
    assert d.reason is None


def test_legal_needs_lawyer_escalates():
    classifier = ClassifierOutput(
        is_legal=True, is_saudi_scope=True, needs_lawyer=True,
        category="contracts", confidence=0.9,
    )
    d = decide(chat_type="private", prefilter=_pre(), classifier=classifier, confidence_floor=0.6)
    assert d.action == ModerationAction.ESCALATE_LAWYER
    assert d.reason == ViolationReason.COMPLEX_HANDOFF


def test_legal_non_saudi_blocked():
    classifier = ClassifierOutput(
        is_legal=True, is_saudi_scope=False, category="labor", confidence=0.85,
    )
    d_group = decide(chat_type="group", prefilter=_pre(), classifier=classifier, confidence_floor=0.6)
    d_dm = decide(chat_type="private", prefilter=_pre(), classifier=classifier, confidence_floor=0.6)
    assert d_group.action == ModerationAction.SILENT_DELETE
    assert d_group.reason == ViolationReason.NON_SAUDI
    assert d_dm.action == ModerationAction.REFUSE


def test_banned_word_silent_delete():
    d = decide(
        chat_type="group",
        prefilter=_pre(PrefilterVerdict.HARD_BLOCK_BANNED),
        classifier=ClassifierOutput.safe_default(),
        confidence_floor=0.6,
    )
    assert d.action == ModerationAction.SILENT_DELETE
    assert d.reason == ViolationReason.BANNED_WORD
