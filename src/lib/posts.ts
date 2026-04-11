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

export function getFeaturedPost(): BlogPost {
  return allPosts.find((p) => p.featured) ?? getAllPosts()[0]
}

export function getPostsByCategory(categorySlug: string): BlogPost[] {
  return getAllPosts().filter((p) => p.category === categorySlug)
}

export function getRecentPosts(count = 4): BlogPost[] {
  return getAllPosts().slice(0, count)
}

export function getAllCategories(): Category[] {
  const colorMap: Record<string, string> = {
    emali: 'blue',
    aqari: 'green',
    tijari: 'amber',
    raqami: 'purple',
    madani: 'rose',
  }

  const labelMap: Record<string, string> = {
    emali: 'عمالي',
    aqari: 'عقاري',
    tijari: 'تجاري',
    raqami: 'رقمي',
    madani: 'مدني',
  }

  const counts: Record<string, number> = {}
  for (const post of allPosts) {
    counts[post.category] = (counts[post.category] ?? 0) + 1
  }

  return Object.entries(counts).map(([slug, count]) => ({
    slug,
    label: labelMap[slug] ?? slug,
    count,
    color: colorMap[slug] ?? 'gray',
  }))
}

export function getRelatedPosts(post: BlogPost, count = 3): BlogPost[] {
  return getAllPosts()
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, count)
}

export function searchPosts(query: string): BlogPost[] {
  const normalizedQuery = query.trim().toLowerCase()

  if (!normalizedQuery) {
    return getAllPosts()
  }

  return getAllPosts().filter((post) => {
    const searchableFields = [
      post.title,
      post.excerpt,
      post.categoryLabel,
      post.author.name,
      post.author.title,
      getStrippedContent(post),
      ...post.tags,
    ]

    return searchableFields.some((field) =>
      field.toLowerCase().includes(normalizedQuery)
    )
  })
}
