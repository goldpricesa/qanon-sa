import type { MetadataRoute } from 'next'
import { getAllAuthors } from '@/data/authors'
import { getAllCategories, getAllPosts, getPostsByCategory } from '@/lib/posts'
import { STATIC_PAGE_LAST_MODIFIED, SITE_URL, getLastUpdatedDate } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const categories = getAllCategories()
  const authors = getAllAuthors().filter((author) => author.slug)

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${encodeURI(post.slug)}`,
    lastModified: new Date(post.dateModified ?? post.reviewedAt ?? post.date),
    changeFrequency: 'monthly',
    priority: post.featured ? 0.9 : 0.8,
  }))

  const categoryEntries: MetadataRoute.Sitemap = categories.map((category) => {
    const lastModified = getLastUpdatedDate(
      ...getPostsByCategory(category.slug).map((post) => post.dateModified ?? post.reviewedAt ?? post.date)
    )

    return {
      url: `${SITE_URL}/category/${encodeURI(category.slug)}`,
      lastModified: new Date(lastModified ?? STATIC_PAGE_LAST_MODIFIED.blog),
      changeFrequency: 'weekly',
      priority: 0.6,
    }
  })

  const authorEntries: MetadataRoute.Sitemap = authors.map((author) => {
    const lastModified = getLastUpdatedDate(
      ...posts
        .filter((post) => post.author.slug === author.slug)
        .map((post) => post.dateModified ?? post.reviewedAt ?? post.date),
      STATIC_PAGE_LAST_MODIFIED.author
    )

    return {
      url: `${SITE_URL}/author/${author.slug}`,
      lastModified: new Date(lastModified),
      changeFrequency: 'monthly',
      priority: 0.5,
    }
  })

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(STATIC_PAGE_LAST_MODIFIED.home),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(STATIC_PAGE_LAST_MODIFIED.blog),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/calculator`,
      lastModified: new Date(STATIC_PAGE_LAST_MODIFIED.calculator),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/author`,
      lastModified: new Date(STATIC_PAGE_LAST_MODIFIED.author),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(STATIC_PAGE_LAST_MODIFIED.about),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(STATIC_PAGE_LAST_MODIFIED.contact),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date(STATIC_PAGE_LAST_MODIFIED.privacy),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date(STATIC_PAGE_LAST_MODIFIED.terms),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/disclaimer`,
      lastModified: new Date(STATIC_PAGE_LAST_MODIFIED.disclaimer),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  return [...staticEntries, ...postEntries, ...categoryEntries, ...authorEntries]
}
