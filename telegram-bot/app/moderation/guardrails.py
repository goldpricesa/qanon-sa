"""Static guardrail patterns: jailbreak / role-override / injection."""
from __future__ import annotations

import re

# Patterns are matched case-insensitively across the message.
_JAILBREAK_PATTERNS = [
    r"\bignore (the |previous |all )?(instructions|prompt|rules)\b",
    r"\bdisregard (the |previous |all )?(instructions|rules)\b",
    r"\bsystem prompt\b",
    r"\bact as\b.*\b(dev|developer|admin|root|dan|jailbreak)\b",
    r"\bdeveloper mode\b",
    r"\bDAN\b",
    r"\bjailbreak\b",
    r"\bbypass (your |the )?(filter|rules|policy|policies)\b",
    r"\bpretend (to be|you are)\b",
    r"تجاهل (التعليمات|التوجيهات|القواعد|السياسة|الأوامر)",
    r"تخطّ?ى التعليمات",
    r"أنت الآن (?:محام[يٍ]?|مساعد|شخص آخر)",
    r"خرج عن دورك|اخرج عن دورك",
    r"تظاهر بأنك",
    r"غيّر (دورك|شخصيتك|تعليمات النظام)",
    r"اعد (?:كتابة|تعريف) (?:التعليمات|الأوامر|نظامك)",
    r"كن (?:محاميًا|مبرمجًا|طبيبًا|صديقًا)",
]

_PROGRAMMING_PATTERNS = [
    r"```",
    r"\bcode\b.*\b(snippet|sample|example)\b",
    r"\b(python|javascript|java|c\+\+|rust|golang|sql|html|css)\b",
    r"\bwrite (a |the )?(code|script|program|function)\b",
    r"اكتب (لي )?(?:كود|سكربت|برنامج|دالة)",
    r"برمج (لي )?",
]

_URL_RE = re.compile(r"https?://\S+|www\.\S+|t\.me/\S+", re.IGNORECASE)
_ARABIC_RE = re.compile(r"[؀-ۿ]")


def is_jailbreak(text: str) -> tuple[bool, str | None]:
    lowered = text
    for pat in _JAILBREAK_PATTERNS:
        if re.search(pat, lowered, flags=re.IGNORECASE):
            return True, pat
    return False, None


def is_programming_request(text: str) -> tuple[bool, str | None]:
    for pat in _PROGRAMMING_PATTERNS:
        if re.search(pat, text, flags=re.IGNORECASE):
            return True, pat
    return False, None


def contains_url(text: str) -> bool:
    return bool(_URL_RE.search(text))


def arabic_ratio(text: str) -> float:
    if not text:
        return 0.0
    letters = [c for c in text if c.isalpha()]
    if not letters:
        return 0.0
    ar = sum(1 for c in letters if _ARABIC_RE.match(c))
    return ar / len(letters)
