import { getAllPosts } from '@/lib/posts'
import { stripHtml } from '@/lib/utils'
import { SITE_NAME, SITE_URL, getLastUpdatedDate } from '@/lib/site'

const SITE_DESCRIPTION =
  'مدونة قانونية سعودية متخصصة في نظام العمل، الأحوال الشخصية، العقود، الإيجار، والجرائم المعلوماتية.'

function escapeXml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export function GET() {
  const posts = getAllPosts().slice(0, 20)
  const lastBuildDate = new Date(
    getLastUpdatedDate(...posts.map((post) => post.dateModified ?? post.reviewedAt ?? post.date)) ?? posts[0]?.date ?? new Date().toISOString()
  ).toUTCString()

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${encodeURI(post.slug)}`
      const pubDate = new Date(post.date).toUTCString()
      const description = escapeXml(stripHtml(post.excerpt).slice(0, 500))
      const title = escapeXml(post.title)
      const category = escapeXml(post.categoryLabel)
      const author = escapeXml(post.author.name)

      return `    <item>
      <title>${title}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${description}</description>
      <category>${category}</category>
      <dc:creator>${author}</dc:creator>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>ar-SA</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
