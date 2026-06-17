from app.core.i18n import DISCLAIMER
from app.llm.answer_builder import finalize_answer


def test_disclaimer_appended_when_missing():
    out = finalize_answer("بحسب النظام السعودي، يحق للعامل المطالبة بمستحقاته.")
    assert DISCLAIMER in out


def test_disclaimer_not_duplicated():
    answer = f"بحسب النظام السعودي يحق للعامل ذلك.\n\n{DISCLAIMER}"
    out = finalize_answer(answer)
    assert out.count(DISCLAIMER) == 1


def test_emoji_stripped():
    out = finalize_answer("الإجابة 🙂🤖✨")
    assert "🙂" not in out
    assert "🤖" not in out


def test_truncation():
    long = "هذا نص قانوني طويل. " * 200
    out = finalize_answer(long)
    assert len(out) <= 1500  # disclaimer fits below the 900-char cap budget
