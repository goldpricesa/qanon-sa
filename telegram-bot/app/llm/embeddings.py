"""Embedding wrapper using sentence-transformers (multilingual-e5-base).

Kept lazy so unit tests / dev tools don't load the model unless needed.
"""
from __future__ import annotations

from threading import Lock

import numpy as np

from app.core.config import get_settings
from app.core.logging import get_logger

log = get_logger(__name__)

_lock = Lock()
_model = None


def _get_model():
    global _model
    if _model is not None:
        return _model
    with _lock:
        if _model is not None:
            return _model
        from sentence_transformers import SentenceTransformer
        name = get_settings().embedding_model
        log.info("loading_embedding_model", model=name)
        _model = SentenceTransformer(name)
        return _model


class Embedder:
    def __init__(self):
        self.dim = get_settings().embedding_dim

    def embed(self, texts: list[str]) -> np.ndarray:
        if not texts:
            return np.empty((0, self.dim), dtype=np.float32)
        model = _get_model()
        vectors = model.encode(
            texts,
            batch_size=16,
            normalize_embeddings=True,
            convert_to_numpy=True,
            show_progress_bar=False,
        )
        return vectors.astype(np.float32)

    def embed_query(self, query: str) -> np.ndarray:
        return self.embed([f"query: {query}"])[0]
