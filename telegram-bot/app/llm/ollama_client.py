from __future__ import annotations

from typing import Any

import httpx
from tenacity import (
    AsyncRetrying,
    retry_if_exception_type,
    stop_after_attempt,
    wait_exponential,
)

from app.core.config import get_settings
from app.core.logging import get_logger

log = get_logger(__name__)


class OllamaClient:
    def __init__(self, host: str | None = None, timeout: float = 60.0):
        self.host = (host or get_settings().ollama_host).rstrip("/")
        self.timeout = timeout
        self._client: httpx.AsyncClient | None = None

    async def __aenter__(self) -> "OllamaClient":
        self._client = httpx.AsyncClient(base_url=self.host, timeout=self.timeout)
        return self

    async def __aexit__(self, *exc) -> None:
        if self._client is not None:
            await self._client.aclose()
            self._client = None

    async def _ensure(self) -> httpx.AsyncClient:
        if self._client is None:
            self._client = httpx.AsyncClient(base_url=self.host, timeout=self.timeout)
        return self._client

    async def chat(
        self,
        model: str,
        messages: list[dict[str, str]],
        *,
        temperature: float = 0.2,
        top_p: float = 0.9,
        num_predict: int = 320,
        repeat_penalty: float = 1.1,
        json_mode: bool = False,
        stop: list[str] | None = None,
    ) -> str:
        client = await self._ensure()
        payload: dict[str, Any] = {
            "model": model,
            "messages": messages,
            "stream": False,
            "options": {
                "temperature": temperature,
                "top_p": top_p,
                "num_predict": num_predict,
                "repeat_penalty": repeat_penalty,
            },
        }
        if stop:
            payload["options"]["stop"] = stop
        if json_mode:
            payload["format"] = "json"

        async for attempt in AsyncRetrying(
            stop=stop_after_attempt(3),
            wait=wait_exponential(multiplier=0.5, min=0.5, max=4),
            retry=retry_if_exception_type((httpx.HTTPError, httpx.TimeoutException)),
            reraise=True,
        ):
            with attempt:
                resp = await client.post("/api/chat", json=payload)
                resp.raise_for_status()
                data = resp.json()
                return data.get("message", {}).get("content", "") or ""
        return ""

    async def ping(self) -> bool:
        try:
            client = await self._ensure()
            resp = await client.get("/api/tags", timeout=5.0)
            return resp.status_code == 200
        except Exception:
            return False
