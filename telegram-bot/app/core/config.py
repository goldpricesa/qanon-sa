from __future__ import annotations

from functools import lru_cache
from pathlib import Path
from typing import Literal

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    telegram_bot_token: str = Field(..., alias="TELEGRAM_BOT_TOKEN")

    database_url: str = Field(
        "postgresql+asyncpg://qanonbot:qanonbot@db:5432/qanonbot",
        alias="DATABASE_URL",
    )

    ollama_host: str = Field("http://ollama:11434", alias="OLLAMA_HOST")
    ollama_answer_model: str = Field("qwen2.5:7b-instruct", alias="OLLAMA_ANSWER_MODEL")
    ollama_classifier_model: str = Field("qwen2.5:7b-instruct", alias="OLLAMA_CLASSIFIER_MODEL")
    llm_fused_mode: bool = Field(False, alias="LLM_FUSED_MODE")

    admin_secret_key: str = Field("change-me-please-32-chars-minimum-secret-key", alias="ADMIN_SECRET_KEY")
    admin_initial_username: str = Field("admin", alias="ADMIN_INITIAL_USERNAME")
    admin_initial_password: str = Field("ChangeMe!2026", alias="ADMIN_INITIAL_PASSWORD")
    admin_base_path: str = Field("/admin", alias="ADMIN_BASE_PATH")
    admin_session_hours: int = Field(12, alias="ADMIN_SESSION_HOURS")
    admin_cookie_secure: bool = Field(False, alias="ADMIN_COOKIE_SECURE")

    default_mute_hours: int = Field(12, alias="DEFAULT_MUTE_HOURS")
    warn_threshold: int = Field(1, alias="WARN_THRESHOLD")
    mute_threshold: int = Field(2, alias="MUTE_THRESHOLD")
    rate_limit_per_hour: int = Field(20, alias="RATE_LIMIT_PER_HOUR")
    rag_top_k: int = Field(4, alias="RAG_TOP_K")
    classifier_confidence_min: float = Field(0.6, alias="CLASSIFIER_CONFIDENCE_MIN")

    site_name: str = Field("نظرة قانونية", alias="SITE_NAME")
    site_url: str = Field("https://www.qanon-sa.com", alias="SITE_URL")
    site_contact_phone: str = Field("0560390004", alias="SITE_CONTACT_PHONE")
    site_contact_tel: str = Field("+966560390004", alias="SITE_CONTACT_TEL")
    site_whatsapp: str = Field("https://wa.me/966560390004", alias="SITE_WHATSAPP")

    log_level: str = Field("INFO", alias="LOG_LEVEL")
    log_dir: Path = Field(Path("./logs"), alias="LOG_DIR")

    embedding_model: str = Field("intfloat/multilingual-e5-base", alias="EMBEDDING_MODEL")
    embedding_dim: int = Field(768, alias="EMBEDDING_DIM")

    bot_mode: Literal["polling", "webhook"] = Field("polling", alias="BOT_MODE")
    webhook_base_url: str = Field("", alias="WEBHOOK_BASE_URL")
    webhook_path: str = Field("/tg/webhook", alias="WEBHOOK_PATH")
    webhook_secret: str = Field("", alias="WEBHOOK_SECRET")

    @property
    def is_sqlite(self) -> bool:
        return self.database_url.startswith("sqlite")


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()  # type: ignore[call-arg]
