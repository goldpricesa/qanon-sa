from __future__ import annotations

from enum import StrEnum


class LegalCategory(StrEnum):
    LABOR = "labor"
    COMMERCIAL = "commercial"
    CRIMINAL = "criminal"
    PERSONAL_STATUS = "personal_status"
    TRAFFIC = "traffic"
    ENFORCEMENT = "enforcement"
    CONTRACTS = "contracts"
    COMPANIES = "companies"
    CIVIL_RIGHTS = "civil_rights"
    GENERAL = "general"
    NONE = "none"


CATEGORY_LABEL_AR: dict[str, str] = {
    LegalCategory.LABOR.value: "عمالي",
    LegalCategory.COMMERCIAL.value: "تجاري",
    LegalCategory.CRIMINAL.value: "جنائي",
    LegalCategory.PERSONAL_STATUS.value: "أحوال شخصية",
    LegalCategory.TRAFFIC.value: "مرور",
    LegalCategory.ENFORCEMENT.value: "تنفيذ",
    LegalCategory.CONTRACTS.value: "عقود",
    LegalCategory.COMPANIES.value: "شركات",
    LegalCategory.CIVIL_RIGHTS.value: "حقوق مدنية",
    LegalCategory.GENERAL.value: "أنظمة عامة",
    LegalCategory.NONE.value: "—",
}

SITE_CATEGORY_TO_ENUM: dict[str, str] = {
    "عمالي": LegalCategory.LABOR.value,
    "تجاري": LegalCategory.COMMERCIAL.value,
    "جنائي": LegalCategory.CRIMINAL.value,
    "أحوال-شخصية": LegalCategory.PERSONAL_STATUS.value,
    "عقاري": LegalCategory.CONTRACTS.value,
    "مدني": LegalCategory.CIVIL_RIGHTS.value,
}


class ModerationAction(StrEnum):
    ANSWER = "answer"
    REFUSE = "refuse"
    SILENT_DELETE = "silent_delete"
    ESCALATE_LAWYER = "escalate_lawyer"
    IGNORE = "ignore"


class ViolationReason(StrEnum):
    OFF_TOPIC = "off_topic"
    JAILBREAK = "jailbreak"
    BANNED_WORD = "banned_word"
    SPAM = "spam"
    NON_SAUDI = "non_saudi"
    COMPLEX_HANDOFF = "complex_handoff"


class AdminRole(StrEnum):
    SUPERADMIN = "superadmin"
    ADMIN = "admin"
    VIEWER = "viewer"


class AppealStatus(StrEnum):
    OPEN = "open"
    REVIEWED = "reviewed"
    APPROVED = "approved"
    REJECTED = "rejected"


CANNED_KEYS = (
    "start",
    "help",
    "rules",
    "contact",
    "appeal_intro",
    "appeal_received",
    "warn_first",
    "mute_notice",
    "out_of_scope_dm",
    "non_saudi_dm",
    "complex_handoff",
    "disclaimer",
    "rate_limited",
    "missing_admin_rights",
    "appeal_cancel",
)

SETTING_DEFAULTS: dict[str, tuple[str, str]] = {
    "mute_duration_hours": ("12", "int"),
    "warn_threshold": ("1", "int"),
    "mute_threshold": ("2", "int"),
    "rate_limit_per_hour": ("20", "int"),
    "rag_top_k": ("4", "int"),
    "classifier_confidence_min": ("0.6", "float"),
    "enable_fused_mode": ("false", "bool"),
    "moderation_enabled_default": ("true", "bool"),
}
