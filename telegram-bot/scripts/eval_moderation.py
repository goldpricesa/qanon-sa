"""Run the full moderation pipeline against tests/eval/cases_arabic.yaml.

Requires Ollama running locally with the configured models. Skips network
calls when --offline is passed (decision is taken from a heuristic stub).
"""
from __future__ import annotations

import argparse
import asyncio
import sys
from collections import Counter
from pathlib import Path

import yaml

from app.core.logging import configure_logging, get_logger
from app.moderation.pipeline import ModerationPipeline

CASES_FILE = Path(__file__).resolve().parents[1] / "tests" / "eval" / "cases_arabic.yaml"
log = get_logger(__name__)


async def run() -> int:
    pipeline = ModerationPipeline()
    data = yaml.safe_load(CASES_FILE.read_text(encoding="utf-8"))
    cases = data["cases"]

    correct = 0
    total = len(cases)
    confusion: Counter = Counter()

    for case in cases:
        result = await pipeline.run(text=case["text"], chat_type=case["chat_type"])
        actual = result.decision.action.value
        expected = case["expected_action"]
        ok = actual == expected
        confusion[(expected, actual)] += 1
        if ok:
            correct += 1
        marker = "OK " if ok else "FAIL"
        print(f"{marker} [{case['chat_type']}] expected={expected:<16} actual={actual:<16} | {case['text'][:60]}")

    print()
    print(f"=== {correct}/{total} correct ({correct / total * 100:.1f}%) ===")
    print("\nConfusion (expected → actual):")
    for (exp, act), n in sorted(confusion.items()):
        print(f"  {exp:<16} → {act:<16} : {n}")
    return 0 if correct >= total * 0.85 else 1


def main() -> None:
    configure_logging("eval")
    parser = argparse.ArgumentParser()
    parser.parse_args()
    sys.exit(asyncio.run(run()))


if __name__ == "__main__":
    main()
