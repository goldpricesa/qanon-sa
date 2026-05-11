from __future__ import annotations

from datetime import datetime, timedelta, timezone

from aiogram import Bot
from aiogram.exceptions import TelegramBadRequest, TelegramForbiddenError
from aiogram.types import ChatPermissions

from app.core.logging import get_logger

log = get_logger(__name__)

NO_PERMISSIONS = ChatPermissions(
    can_send_messages=False,
    can_send_audios=False,
    can_send_documents=False,
    can_send_photos=False,
    can_send_videos=False,
    can_send_video_notes=False,
    can_send_voice_notes=False,
    can_send_polls=False,
    can_send_other_messages=False,
    can_add_web_page_previews=False,
    can_change_info=False,
    can_invite_users=False,
    can_pin_messages=False,
)


class MuteService:
    def __init__(self, bot: Bot):
        self.bot = bot

    async def mute(self, chat_id: int, user_id: int, hours: int) -> bool:
        until = datetime.now(timezone.utc) + timedelta(hours=hours)
        try:
            await self.bot.restrict_chat_member(
                chat_id=chat_id,
                user_id=user_id,
                permissions=NO_PERMISSIONS,
                until_date=until,
            )
            log.info("muted", chat_id=chat_id, user_id=user_id, hours=hours)
            return True
        except (TelegramBadRequest, TelegramForbiddenError) as exc:
            log.warning("mute_failed", chat_id=chat_id, user_id=user_id, error=str(exc))
            return False

    async def unmute(self, chat_id: int, user_id: int) -> bool:
        perms = ChatPermissions(
            can_send_messages=True,
            can_send_audios=True,
            can_send_documents=True,
            can_send_photos=True,
            can_send_videos=True,
            can_send_voice_notes=True,
            can_send_polls=True,
            can_send_other_messages=True,
            can_add_web_page_previews=True,
        )
        try:
            await self.bot.restrict_chat_member(chat_id=chat_id, user_id=user_id, permissions=perms)
            return True
        except (TelegramBadRequest, TelegramForbiddenError) as exc:
            log.warning("unmute_failed", chat_id=chat_id, user_id=user_id, error=str(exc))
            return False
