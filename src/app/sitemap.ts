import type { MetadataRoute } from 'next'
import { getAllPosts, getAllCategories, getPostsByCategory } from '@/lib/posts'
import { getAllAuthors } from '@/data/authors'
import type { BlogPost } from '@/types'

// Fixed revision date for legal/static pages. Bump manually when these
// pages are meaningfully edited so search engines see a real change.
const STATIC_PAGE_LAST_MODIFIED = new Date('2025-01-01T00:00:00.000Z')

function postLastModified(post: BlogPost): Date {
  return new Date(post.dateModified ?? post.date)
}

function latestDate(posts: BlogPost[], fallback: Date): Date {
  if (posts.length === 0) return fallback
  return posts.reduce<Date>((max, p) => {
    const d = postLastModified(p)
    return d > max ? d : max
  }, new Date(0))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://qanon-sa.com'
  const posts = getAllPosts()
  const categories = getAllCategories()
  const authors = getAllAuthors().filter((a) => a.slug)

  const latestPostDate = latestDate(posts, STATIC_PAGE_LAST_MODIFIED)

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${encodeURI(post.slug)}`,
    lastModified: postLastModified(post),
    changeFrequency: 'monthly',
    priority: post.featured ? 0.9 : 0.8,
  }))

  const categoryEntries: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/category/${encodeURI(cat.slug)}`,
    lastModified: latestDate(getPostsByCategory(cat.slug), STATIC_PAGE_LAST_MODIFIED),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  const authorEntries: MetadataRoute.Sitemap = authors.map((a) => ({
    url: `${baseUrl}/author/${a.slug}`,
    lastModified: latestDate(
      posts.filter((p) => p.author.slug === a.slug),
      STATIC_PAGE_LAST_MODIFIED
    ),
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: latestPostDate,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: latestPostDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calculator`,
      lastModified: STATIC_PAGE_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: STATIC_PAGE_LAST_MODIFIED,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: STATIC_PAGE_LAST_MODIFIED,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: STATIC_PAGE_LAST_MODIFIED,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: STATIC_PAGE_LAST_MODIFIED,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  return [...staticEntries, ...postEntries, ...categoryEntries, ...authorEntries]
}
