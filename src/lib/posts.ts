import { allPosts } from '@/data/posts'
import type { BlogPost, Category } from '@/types'
import { stripHtml } from '@/lib/utils'

const sortedPosts = [...allPosts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
)

const strippedContentCache = new Map<string, string>()
function getStrippedContent(post: BlogPost): string {
  if (!strippedContentCache.has(post.id)) {
    strippedContentCache.set(post.id, stripHtml(post.content))
  }
  return strippedContentCache.get(post.id)!
}

export function getAllPosts(): BlogPost[] {
  return sortedPosts
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find((p) => p.slug === slug)
}

export function getPostByAnySlug(slug: string): BlogPost | undefined {
  return allPosts.find(
    (p) => p.slug === slug || p.legacySlugs?.includes(slug)
  )
}

export function getFeaturedPost(): BlogPost {
  return allPosts.find((p) => p.featured) ?? getAllPosts()[0]
}

export function getPostsByCategory(categorySlug: string): BlogPost[] {
  return getAllPosts().filter((p) => p.category === categorySlug)
}

export function getRecentPosts(count = 4): BlogPost[] {
  return getAllPosts().slice(0, count)
}

interface CategoryMeta {
  label: string
  color: string
}

const CATEGORY_META: Record<string, CategoryMeta> = {
  'عمالي': { label: 'عمالي', color: 'blue' },
  'عقاري': { label: 'عقاري', color: 'green' },
  'تجاري': { label: 'تجاري', color: 'amber' },
  'مدني': { label: 'مدني', color: 'rose' },
  'أحوال-شخصية': { label: 'أحوال شخصية', color: 'purple' },
  'جنائي': { label: 'جنائي', color: 'red' },
}

// Canonical display order, used for nav/footer/grid.
const CATEGORY_ORDER = ['عمالي', 'جنائي', 'عقاري', 'تجاري', 'مدني', 'أحوال-شخصية']

export function getCategoryMeta(slug: string): CategoryMeta {
  return CATEGORY_META[slug] ?? { label: slug, color: 'gray' }
}

const categoryCounts: Record<string, number> = (() => {
  const counts: Record<string, number> = {}
  for (const post of allPosts) {
    counts[post.category] = (counts[post.category] ?? 0) + 1
  }
  return counts
})()

const allCategories: Category[] = CATEGORY_ORDER
  .filter((slug) => (categoryCounts[slug] ?? 0) > 0)
  .map((slug) => {
    const meta = getCategoryMeta(slug)
    return {
      slug,
      label: meta.label,
      count: categoryCounts[slug] ?? 0,
      color: meta.color,
    }
  })

export function getAllCategories(): Category[] {
  return allCategories
}

export function getCategoryCounts(): Record<string, number> {
  return categoryCounts
}

export function getRelatedPosts(post: BlogPost, count = 6): BlogPost[] {
  return getAllPosts()
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, count)
}

export function getAdjacentPosts(post: BlogPost): {
  previous?: BlogPost
  next?: BlogPost
} {
  const posts = getAllPosts()
  const idx = posts.findIndex((p) => p.slug === post.slug)
  if (idx === -1) return {}
  // posts are sorted newest-first, so:
  //   "next"     (newer) is at idx-1
  //   "previous" (older) is at idx+1
  return {
    next: idx > 0 ? posts[idx - 1] : undefined,
    previous: idx < posts.length - 1 ? posts[idx + 1] : undefined,
  }
}

// Pre-built search index: lowercased haystack per post, content stripped once.
const searchIndex: Array<{ post: BlogPost; haystack: string }> = sortedPosts.map(
  (post) => ({
    post,
    haystack: [
      post.title,
      post.excerpt,
      post.categoryLabel,
      post.author.name,
      post.author.title,
      getStrippedContent(post),
      post.tags.join(' '),
    ]
      .join(' ')
      .toLowerCase(),
  })
)

export function searchPosts(query: string): BlogPost[] {
  const normalizedQuery = query.trim().toLowerCase()

  if (!normalizedQuery) {
    return getAllPosts()
  }

  return searchIndex
    .filter((entry) => entry.haystack.includes(normalizedQuery))
    .map((entry) => entry.post)
}
