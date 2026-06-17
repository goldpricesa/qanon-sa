from __future__ import annotations

import json
import re

from pydantic import ValidationError

from app.core.config import get_settings
from app.core.logging import get_logger
from app.llm.ollama_client import OllamaClient
from app.llm.prompts import build_classifier_messages
from app.moderation.schemas import ClassifierOutput

log = get_logger(__name__)

_JSON_BLOCK_RE = re.compile(r"\{[\s\S]*\}")


def _extract_json(raw: str) -> str:
    raw = raw.strip()
    if raw.startswith("```"):
        raw = re.sub(r"^```(?:json)?\s*|\s*```$", "", raw)
    match = _JSON_BLOCK_RE.search(raw)
    return match.group(0) if match else raw


async def classify(text: str, client: OllamaClient | None = None) -> ClassifierOutput:
    settings = get_settings()
    messages = build_classifier_messages(text)

    own = False
    if client is None:
        client = OllamaClient()
        own = True

    try:
        raw = await client.chat(
            model=settings.ollama_classifier_model,
            messages=messages,
            temperature=0.0,
            top_p=0.1,
            num_predict=160,
            repeat_penalty=1.0,
            json_mode=True,
        )

        out = _try_parse(raw)
        if out is not None:
            return out

        retry = await client.chat(
            model=settings.ollama_classifier_model,
            messages=messages,
            temperature=0.0,
            top_p=0.1,
            num_predict=160,
            repeat_penalty=1.0,
            json_mode=True,
        )
        out = _try_parse(retry)
        if out is not None:
            return out

        log.warning("classifier_parse_failed_default", raw=raw[:200], retry=retry[:200])
        return ClassifierOutput.safe_default()
    except Exception as exc:
        log.warning("classifier_exception_default", error=str(exc))
        return ClassifierOutput.safe_default()
    finally:
        if own:
            await client.__aexit__(None, None, None)


def _try_parse(raw: str) -> ClassifierOutput | None:
    if not raw:
        return None
    payload = _extract_json(raw)
    try:
        data = json.loads(payload)
    except json.JSONDecodeError:
        return None
    try:
        return ClassifierOutput(**data)
    except ValidationError:
        return None
