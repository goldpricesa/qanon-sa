from app.moderation.classifier import _try_parse


def test_parse_clean_json():
    raw = '{"is_legal": true, "is_saudi_scope": true, "needs_lawyer": false, "is_jailbreak": false, "category": "labor", "confidence": 0.9, "off_topic_kind": "none"}'
    out = _try_parse(raw)
    assert out is not None
    assert out.is_legal is True
    assert out.category == "labor"
    assert out.confidence == 0.9


def test_parse_with_prose_around():
    raw = "حسنًا، هذه الإجابة:\n```json\n" + '{"is_legal": false, "is_saudi_scope": false, "needs_lawyer": false, "is_jailbreak": false, "category": "none", "confidence": 0.4, "off_topic_kind": "chat"}' + "\n```"
    out = _try_parse(raw)
    assert out is not None
    assert out.off_topic_kind == "chat"


def test_parse_invalid_json_returns_none():
    assert _try_parse("not json at all") is None


def test_parse_missing_fields_uses_defaults():
    raw = '{"is_legal": true, "category": "labor"}'
    out = _try_parse(raw)
    assert out is not None
    assert out.is_legal is True
    assert out.is_jailbreak is False
    assert out.confidence == 0.0


def test_confidence_clamped():
    raw = '{"is_legal": true, "confidence": 5.5, "category": "labor"}'
    out = _try_parse(raw)
    assert out is not None
    assert out.confidence == 1.0
