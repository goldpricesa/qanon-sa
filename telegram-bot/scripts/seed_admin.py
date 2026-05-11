"""Seed the initial superadmin from ADMIN_INITIAL_USERNAME/PASSWORD if empty,
and seed canned messages + settings defaults.

Run once at admin container startup.
"""
from __future__ import annotations

import asyncio

from sqlalchemy import select

from app.core.config import get_settings
from app.core.constants import (
    AdminRole,
    CANNED_KEYS,
    SETTING_DEFAULTS,
)
from app.core.i18n import CANNED_DEFAULTS
from app.core.logging import configure_logging, get_logger
from app.core.security import hash_password
from app.db.models.admin import Admin
from app.db.models.canned_message import CannedMessage
from app.db.models.setting import Setting
from app.db.session import session_scope


async def seed_canned() -> None:
    async with session_scope() as session:
        existing = set(
            (await session.execute(select(CannedMessage.key))).scalars().all()
        )
        for key in CANNED_KEYS:
            if key in existing:
                continue
            content = CANNED_DEFAULTS.get(key, "")
            if not content:
                continue
            session.add(CannedMessage(key=key, content_ar=content))


async def seed_settings() -> None:
    async with session_scope() as session:
        existing = set(
            (await session.execute(select(Setting.key))).scalars().all()
        )
        for key, (value, vtype) in SETTING_DEFAULTS.items():
            if key in existing:
                continue
            session.add(Setting(key=key, value=value, value_type=vtype))


async def seed_admin() -> None:
    log = get_logger(__name__)
    settings = get_settings()

    async with session_scope() as session:
        any_admin = (await session.execute(select(Admin).limit(1))).scalar_one_or_none()
        if any_admin is not None:
            log.info("admin_exists_skip_seed", username=any_admin.web_username)
            return

        session.add(
            Admin(
                web_username=settings.admin_initial_username,
                password_hash=hash_password(settings.admin_initial_password),
                role=AdminRole.SUPERADMIN.value,
                is_active=True,
            )
        )
    log.info("admin_seeded", username=settings.admin_initial_username)


async def main() -> None:
    configure_logging("seed")
    await seed_canned()
    await seed_settings()
    await seed_admin()


if __name__ == "__main__":
    asyncio.run(main())
