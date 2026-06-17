from app.services.kb_ingest_service import chunk_post


def test_short_post_single_chunk():
    chunks = chunk_post(
        title="مكافأة نهاية الخدمة",
        category="labor",
        category_label="عمالي",
        content_text="فقرة قصيرة جدًا.\n\nفقرة أخرى قصيرة.",
    )
    # Below MIN_CHARS → no chunk emitted
    assert chunks == []


def test_chunks_include_header():
    long = ("هذه فقرة قانونية مفصلة تشرح حقوق العامل بحسب النظام السعودي. " * 40)
    chunks = chunk_post(
        title="حقوق العامل",
        category="labor",
        category_label="عمالي",
        content_text=long,
    )
    assert chunks
    for c in chunks:
        assert c.startswith("العنوان: حقوق العامل")
        assert "الفئة: عمالي" in c
