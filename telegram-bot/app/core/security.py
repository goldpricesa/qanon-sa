from __future__ import annotations

import secrets

from itsdangerous import BadSignature, TimestampSigner
from passlib.context import CryptContext

from app.core.config import get_settings

_pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto", bcrypt__rounds=12)


def hash_password(plain: str) -> str:
    return _pwd_context.hash(plain)


def verify_password(plain: str, hashed: str) -> bool:
    try:
        return _pwd_context.verify(plain, hashed)
    except Exception:
        return False


def _signer() -> TimestampSigner:
    return TimestampSigner(get_settings().admin_secret_key)


def sign_session(payload: str) -> str:
    return _signer().sign(payload.encode("utf-8")).decode("utf-8")


def unsign_session(token: str, max_age_seconds: int) -> str | None:
    try:
        raw = _signer().unsign(token.encode("utf-8"), max_age=max_age_seconds)
        return raw.decode("utf-8")
    except BadSignature:
        return None
    except Exception:
        return None


def generate_csrf_token() -> str:
    return secrets.token_urlsafe(32)


def constant_time_equals(a: str, b: str) -> bool:
    return secrets.compare_digest(a.encode("utf-8"), b.encode("utf-8"))
