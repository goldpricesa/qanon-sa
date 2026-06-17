from __future__ import annotations

import logging
import logging.handlers
import re
import sys
from pathlib import Path

import structlog

from app.core.config import get_settings

_TOKEN_RE = re.compile(r"\b\d{8,12}:[A-Za-z0-9_-]{30,}\b")


def _redact_secrets(_: object, __: str, event_dict: dict) -> dict:
    for key, value in list(event_dict.items()):
        if isinstance(value, str) and _TOKEN_RE.search(value):
            event_dict[key] = _TOKEN_RE.sub("***REDACTED***", value)
    return event_dict


def configure_logging(service: str) -> None:
    settings = get_settings()
    log_dir: Path = settings.log_dir
    log_dir.mkdir(parents=True, exist_ok=True)

    level = getattr(logging, settings.log_level.upper(), logging.INFO)

    root = logging.getLogger()
    root.setLevel(level)
    root.handlers.clear()

    stdout_handler = logging.StreamHandler(sys.stdout)
    stdout_handler.setLevel(level)
    root.addHandler(stdout_handler)

    file_handler = logging.handlers.RotatingFileHandler(
        log_dir / f"{service}.log",
        maxBytes=10 * 1024 * 1024,
        backupCount=5,
        encoding="utf-8",
    )
    file_handler.setLevel(level)
    root.addHandler(file_handler)

    structlog.configure(
        processors=[
            structlog.contextvars.merge_contextvars,
            structlog.processors.add_log_level,
            structlog.processors.TimeStamper(fmt="iso", utc=True),
            _redact_secrets,
            structlog.processors.format_exc_info,
            structlog.processors.JSONRenderer(ensure_ascii=False),
        ],
        wrapper_class=structlog.make_filtering_bound_logger(level),
        logger_factory=structlog.stdlib.LoggerFactory(),
        cache_logger_on_first_use=True,
    )
    structlog.contextvars.bind_contextvars(service=service)


def get_logger(name: str | None = None) -> structlog.stdlib.BoundLogger:
    return structlog.get_logger(name)
