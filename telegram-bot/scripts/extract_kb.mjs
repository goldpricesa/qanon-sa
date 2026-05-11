#!/usr/bin/env node
/**
 * Extract Saudi-law posts from src/data/*.ts into kb/posts.json.
 *
 * Runs with: npx tsx --tsconfig ../tsconfig.json scripts/extract_kb.mjs
 * Or: node --experimental-loader tsx scripts/extract_kb.mjs
 *
 * Reads the existing Next.js TS data files via the project's tsconfig path aliases.
 * Strips HTML using `sanitize-html` (already a project dep).
 */

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'

import sanitizeHtml from 'sanitize-html'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')               // telegram-bot/
const SITE_ROOT = path.resolve(ROOT, '..')               // qanon-sa/
const OUTPUT = path.join(ROOT, 'kb', 'posts.json')

// Allow either telegram-bot/scripts or repo root invocation.
const POSTS_TS = path.join(SITE_ROOT, 'src', 'data', 'posts.ts')
const SAUDI_TS = path.join(SITE_ROOT, 'src', 'data', 'saudi-law-posts.ts')

const SITE_CAT_TO_ENUM = {
  'عمالي': 'labor',
  'تجاري': 'commercial',
  'جنائي': 'criminal',
  'أحوال-شخصية': 'personal_status',
  'عقاري': 'contracts',
  'مدني': 'civil_rights',
}

function toPlainText(html) {
  if (!html) return ''
  const stripped = sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} })
  return stripped
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

async function loadPosts() {
  // Use dynamic import via tsx — the loader maps `@/...` aliases through tsconfig.
  const saudi = await import(SAUDI_TS)
  const main = await import(POSTS_TS)

  const arrays = []
  for (const mod of [saudi, main]) {
    for (const key of Object.keys(mod)) {
      const v = mod[key]
      if (Array.isArray(v) && v.length && v[0] && typeof v[0] === 'object' && 'slug' in v[0] && 'content' in v[0]) {
        arrays.push(v)
      }
    }
  }
  if (!arrays.length) {
    throw new Error('No post arrays detected in src/data TS modules.')
  }
  return arrays
}

function mergeDedupe(arrays) {
  const bySlug = new Map()
  for (const arr of arrays) {
    for (const p of arr) {
      if (!p?.slug) continue
      if (!bySlug.has(p.slug)) bySlug.set(p.slug, p)
    }
  }
  return [...bySlug.values()]
}

function buildRecord(post) {
  const text = toPlainText(post.content || '')
  const cat = SITE_CAT_TO_ENUM[post.category] || 'general'
  return {
    slug: post.slug,
    title: post.title,
    category: cat,
    category_label_ar: post.categoryLabel || post.category || '',
    tags: post.tags || [],
    content_text: text,
    source_urls: (post.sources || []).map((s) => ({ title: s.title, url: s.url })),
    reviewed_at: post.reviewedAt || post.date || null,
  }
}

async function main() {
  const arrays = await loadPosts()
  const all = mergeDedupe(arrays)
  const records = all
    .map(buildRecord)
    .filter((r) => r.content_text && r.content_text.length > 50)

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true })
  fs.writeFileSync(OUTPUT, JSON.stringify({ count: records.length, posts: records }, null, 2), 'utf-8')
  console.log(`[extract_kb] wrote ${records.length} posts to ${path.relative(ROOT, OUTPUT)}`)
}

main().catch((err) => {
  console.error('[extract_kb] FAILED:', err)
  process.exit(1)
})
