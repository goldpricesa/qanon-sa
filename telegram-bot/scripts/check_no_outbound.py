"""CI guard: fail the build if any source file mentions disallowed outbound bases.

Allowed: api.telegram.org (Telegram), OLLAMA_HOST (configured), DATABASE_URL host,
huggingface.co (only at install / model download time, never at runtime).
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
APP = ROOT / "app"

BLOCKLIST = [
    r"api\.openai\.com",
    r"api\.anthropic\.com",
    r"generativelanguage\.googleapis\.com",
    r"api\.deepseek\.com",
    r"api\.groq\.com",
    r"api\.together\.xyz",
]

PAT = re.compile("|".join(BLOCKLIST), re.IGNORECASE)


def main() -> int:
    bad: list[str] = []
    for p in APP.rglob("*.py"):
        try:
            text = p.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue
        for m in PAT.finditer(text):
            bad.append(f"{p.relative_to(ROOT)}: {m.group(0)}")

    if bad:
        print("Disallowed outbound references found:")
        for b in bad:
            print(" -", b)
        return 1

    print("OK: no disallowed outbound references.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
