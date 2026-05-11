from __future__ import annotations

import os

os.environ.setdefault("TELEGRAM_BOT_TOKEN", "0000:test")
os.environ.setdefault("DATABASE_URL", "sqlite+aiosqlite:///./test.db")
os.environ.setdefault("OLLAMA_HOST", "http://localhost:11434")
os.environ.setdefault("ADMIN_SECRET_KEY", "test-secret-key-test-secret-key-32+chars")
