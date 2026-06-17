from __future__ import annotations

import time

from sqlalchemy import select

from app.db.models.setting import Setting
from app.db.session import session_scope

_CACHE: dict[str, tuple[float, str, str]] = {}
_TTL = 30.0


class SettingsService:
    async def _get_raw(self, key: str, default: str | None = None) -> tuple[str | None, str]:
        now = time.monotonic()
        cached = _CACHE.get(key)
        if cached and (now - cached[0]) < _TTL:
            return cached[1], cached[2]

        async with session_scope() as session:
            row = (await session.execute(select(Setting).where(Setting.key == key))).scalar_one_or_none()
        if row is None:
            return default, "str"
        _CACHE[key] = (now, row.value, row.value_type)
        return row.value, row.value_type

    async def get_int(self, key: str, default: int) -> int:
        value, _ = await self._get_raw(key, str(default))
        try:
            return int(value) if value is not None else default
        except ValueError:
            return default

    async def get_float(self, key: str, default: float) -> float:
        value, _ = await self._get_raw(key, str(default))
        try:
            return float(value) if value is not None else default
        except ValueError:
            return default

    async def get_bool(self, key: str, default: bool) -> bool:
        value, _ = await self._get_raw(key, "true" if default else "false")
        if value is None:
            return default
        return value.strip().lower() in {"1", "true", "yes", "on"}

    async def get_str(self, key: str, default: str = "") -> str:
        value, _ = await self._get_raw(key, default)
        return value if value is not None else default

    async def set_value(self, key: str, value: str, value_type: str = "str") -> None:
        async with session_scope() as session:
            row = (await session.execute(select(Setting).where(Setting.key == key))).scalar_one_or_none()
            if row is None:
                session.add(Setting(key=key, value=value, value_type=value_type))
            else:
                row.value = value
                row.value_type = value_type
        _CACHE.pop(key, None)


def invalidate_settings_cache() -> None:
    _CACHE.clear()
