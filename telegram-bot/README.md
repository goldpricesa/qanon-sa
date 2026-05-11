# Qanon-SA — بوت تيليجرام للاستشارات القانونية السعودية

بوت تيليجرام احترافي مخصص للاستشارات القانونية السعودية فقط، يعمل **محليًا بالكامل** عبر LLM محلي (Ollama / Qwen2.5) دون أي خدمات API خارجية. يدعم القروبات والمحادثات الخاصة، ويُطبق فلترة صارمة لكل رسالة مع نظام مخالفات وكتم تلقائي وواجهة إدارة عربية (RTL).

## معمارية النظام

- **Python 3.11 + aiogram v3** للبوت
- **FastAPI + Jinja2 + Tailwind (RTL)** للوحة الإدارة
- **Ollama** يشغّل `qwen2.5:7b-instruct` للتصنيف والإجابة
- **PostgreSQL + pgvector** لتخزين البيانات والتمثيلات الشعاعية (مع fallback إلى SQLite في التطوير)
- **RAG** من مقالات الموقع القانونية المنشورة (`src/data/saudi-law-posts.ts` و `src/data/posts.ts`) — تُستخرج وتُفهرس مرة واحدة
- **Docker Compose** لتشغيل كل الخدمات معًا (db, ollama, bot, admin, nginx)
- **لا شيء يخرج للخارج**: المسار الوحيد المسموح هو `api.telegram.org`

## أوامر البوت

| الأمر | الوظيفة |
|---|---|
| `/start` | رسالة ترحيب (في الخاص فقط) |
| `/help` | قائمة الأوامر ونطاق الاستشارات |
| `/rules` | قواعد المجموعة وآلية الفلترة |
| `/contact` | بيانات التواصل المباشرة |
| `/appeal` | تقديم استئناف على مخالفة (محادثة موجَّهة في الخاص) |

## فلترة الرسائل وآلية اتخاذ القرار

كل رسالة نصية تمر بـ:

1. **Middlewares**: `chat_resolver` → `user_resolver` → `throttle` → `rate_limit`
2. **Prefilter (مزامن، ~1ms):** كلمات محظورة من قاعدة البيانات، أنماط Jailbreak (عربية وإنجليزية)، طلبات برمجية، روابط، نسبة العربية، طول الرسالة.
3. **توازي LLM (`asyncio.gather`):** استدعاء المصنف + استرجاع RAG.
4. **المصنف** يُعيد JSON صارم: `{is_legal, is_saudi_scope, needs_lawyer, is_jailbreak, category, confidence, off_topic_kind}`.
5. **قرار**: ANSWER / ESCALATE_LAWYER / REFUSE / SILENT_DELETE / IGNORE.
6. **التنفيذ**: حذف الرسالة، تسجيل المخالفة، تحذير خاص للأولى، كتم 12 ساعة للثانية. الحوار الخاص لا يحذف ولا يكتم — فقط يرفض بسطر مهذب.

كل القرارات والإجابات تُسجَّل في `violations` و `legal_questions`.

## التشغيل السريع (Docker)

### المتطلبات
- Docker + Docker Compose v2
- خادم Linux (Ubuntu 22.04+ مُفضّل)
- ذاكرة RAM 16 GB (للنموذج 7B على CPU) أو GPU NVIDIA لتسريع Ollama
- توكن بوت من [@BotFather](https://t.me/BotFather)

### الخطوات

```bash
cd telegram-bot/
cp .env.example .env
# عدّل .env: TELEGRAM_BOT_TOKEN, ADMIN_SECRET_KEY (32+ char), ADMIN_INITIAL_PASSWORD

# استخراج قاعدة المعرفة من مقالات الموقع (Node + tsx):
cd ../
npm install
npx tsx telegram-bot/scripts/extract_kb.mjs

# تشغيل كل الخدمات:
cd telegram-bot/
docker compose up -d --build

# لوحة الإدارة:
#   http://YOUR_SERVER/admin/
#   user: admin (ADMIN_INITIAL_USERNAME)
#   pass: ADMIN_INITIAL_PASSWORD من .env
```

عند أول تشغيل، حاوية Ollama ستسحب موديل `qwen2.5:7b-instruct` (~4.7 GB)، ثم تبدأ حاوية البوت بترحيل قاعدة البيانات (`alembic upgrade head`)، فهرسة قاعدة المعرفة (`scripts/ingest_kb.py --if-empty`)، ثم تشغيل polling.

### رفع البوت كمشرف في القروب

ليعمل الحذف والكتم، **يجب** رفع البوت كمشرف في القروب مع صلاحيتي:
- **Delete Messages**
- **Restrict Members**

البوت يكتشف غياب هذه الصلاحيات تلقائيًا ويُرسل تنبيهًا واحدًا فقط في القروب.

## التشغيل المحلي للتطوير (بدون Docker)

```bash
cd telegram-bot/
python -m venv .venv && source .venv/bin/activate
pip install -e ".[dev]"

# قاعدة بيانات SQLite للتطوير
echo "DATABASE_URL=sqlite+aiosqlite:///./data/dev.db" >> .env

# تشغيل Ollama محليًا (https://ollama.ai)
ollama serve &
ollama pull qwen2.5:7b-instruct

# ترحيلات
alembic upgrade head
python -m scripts.seed_admin
python -m scripts.ingest_kb

# تشغيل البوت
python -m app.main_bot

# في نافذة منفصلة: لوحة الإدارة
uvicorn app.main_admin:app --port 8000
```

## الاختبارات

```bash
pytest -q

# تقييم القرارات الموسّع (يستدعي Ollama الحقيقي):
python -m scripts.eval_moderation

# تحقّق "بدون خدمات خارجية":
python -m scripts.check_no_outbound
```

## بنية المشروع

```
telegram-bot/
├── app/
│   ├── core/           # config, logging, security, i18n, constants
│   ├── db/             # SQLAlchemy models + Alembic migrations
│   ├── llm/            # Ollama client, embeddings, RAG retriever, prompts
│   ├── moderation/     # prefilter + classifier + decision + guardrails
│   ├── bot/            # aiogram handlers + middlewares
│   ├── admin/          # FastAPI panel + Jinja2 RTL templates
│   └── services/       # violation, mute, appeal, stats, settings, canned
├── alembic/            # ترحيلات قاعدة البيانات
├── scripts/            # extract_kb.mjs, ingest_kb.py, seed_admin.py, eval_*
├── nginx/              # admin reverse proxy
├── tests/              # unit + eval (cases_arabic.yaml)
├── docker-compose.yml  # db + ollama + bot + admin + nginx
└── README.md
```

## الإعدادات القابلة للتعديل

- من لوحة الإدارة (`/admin/settings`): `mute_duration_hours, warn_threshold, mute_threshold, rate_limit_per_hour, rag_top_k, classifier_confidence_min, enable_fused_mode`.
- من `.env` (تتطلب إعادة تشغيل): `TELEGRAM_BOT_TOKEN, DATABASE_URL, OLLAMA_*, EMBEDDING_MODEL, BOT_MODE, SITE_*`.
- الردود الجاهزة (`/admin/canned-messages`): كل نصوص البوت قابلة للتعديل بالعربية.
- الكلمات المحظورة (`/admin/banned-words`): إضافة/حذف، تدعم regex، تُطبَّق فورًا بعد 60 ثانية cache.

## الخصوصية والأمن

- لا توجد أي مكالمة لـ OpenAI / Anthropic / Google / DeepSeek / Groq / Together. سكربت `check_no_outbound.py` يُفشل الـ CI إذا اكتُشفت إشارة لأي منها.
- كلمات مرور المشرفين مُجزَّأة بـ `bcrypt` (12 جولة).
- جلسات لوحة الإدارة موقَّعة (`itsdangerous`) مع `httponly + samesite=lax`، و CSRF token لكل نموذج.
- نصوص المخالفات تُخزَّن كـ sha256 مع مقتطف 80 حرف فقط؛ النص الكامل لا يُحفظ.
- `structlog` يحجب توكنات البوت في كل اللوجات تلقائيًا.

## القيود المعروفة

- **زمن الاستجابة** على CPU مع 7B يتراوح 1.5–2.5 ثانية. للوصول لـ <2s p95 استخدم GPU، أو فعّل `LLM_FUSED_MODE=true`، أو غيّر `OLLAMA_CLASSIFIER_MODEL` إلى `qwen2.5:3b-instruct`.
- **دقة المصنف العربي**: ~90% على مجموعة الـ 30 حالة المرفقة. الـ prefilter العقلي يكفي للحالات الواضحة، والـ `classifier_confidence_min` يمنع الحذف العشوائي عند الشك.
- **الاختصاص الجغرافي**: يكتشف القانون غير السعودي ويرفضه برسالة مميزة.
- **SQLite fallback**: للتطوير فقط؛ ليس للإنتاج (لا يدعم pgvector).

## مرجع الملفات الموجودة في المستودع (للاستخدام فقط)

- `src/data/saudi-law-posts.ts` (2151 سطرًا) — مصدر RAG الأساسي.
- `src/data/posts.ts` (880 سطرًا) — مصدر إضافي.
- `src/types/index.ts` — شكل `BlogPost`.
- `src/lib/site.ts` — قيم التواصل التي تم تمريرها إلى `.env` (الجوال، الواتساب، اسم الموقع، الرابط).

البوت **لا يُعدّل** أيًا من ملفات الموقع. يقرأها فقط مرة واحدة عند بناء قاعدة المعرفة.
