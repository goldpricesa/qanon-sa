from __future__ import annotations

import asyncio
import time
from dataclasses import dataclass

from app.core.config import get_settings
from app.core.constants import ModerationAction
from app.core.logging import get_logger
from app.llm.ollama_client import OllamaClient
from app.llm.prompts import build_answer_messages
from app.llm.rag_retriever import RetrievedChunk, Retriever
from app.moderation.classifier import classify
from app.moderation.decision import Decision, decide
from app.moderation.prefilter import prefilter
from app.moderation.schemas import (
    ClassifierOutput,
    PrefilterResult,
    PrefilterVerdict,
)
from app.services.settings_service import SettingsService

log = get_logger(__name__)


@dataclass
class PipelineResult:
    decision: Decision
    answer_text: str | None
    retrieved: list[RetrievedChunk]
    latency_ms: int


class ModerationPipeline:
    def __init__(self) -> None:
        self.settings = get_settings()
        self.retriever = Retriever()

    async def run(self, *, text: str, chat_type: str) -> PipelineResult:
        started = time.perf_counter()
        settings_svc = SettingsService()

        pre, _ctx = await prefilter(text)

        if pre.verdict in (
            PrefilterVerdict.HARD_BLOCK_JAILBREAK,
            PrefilterVerdict.HARD_BLOCK_BANNED,
        ):
            decision = decide(
                chat_type=chat_type,
                prefilter=pre,
                classifier=ClassifierOutput.safe_default(),
                confidence_floor=await settings_svc.get_float("classifier_confidence_min", self.settings.classifier_confidence_min),
            )
            elapsed = int((time.perf_counter() - started) * 1000)
            return PipelineResult(decision=decision, answer_text=None, retrieved=[], latency_ms=elapsed)

        async with OllamaClient() as ollama:
            classifier_task = asyncio.create_task(classify(text, client=ollama))
            retrieval_task = asyncio.create_task(self.retriever.retrieve(text))
            classifier_out, retrieved = await asyncio.gather(classifier_task, retrieval_task)

            confidence_floor = await settings_svc.get_float(
                "classifier_confidence_min", self.settings.classifier_confidence_min
            )
            decision = decide(
                chat_type=chat_type,
                prefilter=pre,
                classifier=classifier_out,
                confidence_floor=confidence_floor,
            )

            answer_text: str | None = None
            if decision.action == ModerationAction.ANSWER:
                answer_text = await self._answer(text, retrieved, ollama)

        elapsed = int((time.perf_counter() - started) * 1000)
        return PipelineResult(
            decision=decision,
            answer_text=answer_text,
            retrieved=retrieved if decision.action == ModerationAction.ANSWER else [],
            latency_ms=elapsed,
        )

    async def _answer(
        self,
        text: str,
        retrieved: list[RetrievedChunk],
        ollama: OllamaClient,
    ) -> str:
        chunks = [
            {
                "title": r.title,
                "category": r.category,
                "category_label_ar": r.category_label_ar,
                "content": r.content,
            }
            for r in retrieved
        ]
        messages = build_answer_messages(text, chunks)
        raw = await ollama.chat(
            model=self.settings.ollama_answer_model,
            messages=messages,
            temperature=0.2,
            top_p=0.8,
            num_predict=320,
            repeat_penalty=1.1,
        )
        from app.llm.answer_builder import finalize_answer
        return finalize_answer(raw)
