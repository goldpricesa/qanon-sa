import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts, getFeaturedPost, searchPosts } from '@/lib/posts'
import FeaturedPost from '@/components/blog/FeaturedPost'
import BlogGrid from '@/components/blog/BlogGrid'
import Sidebar from '@/components/sidebar/Sidebar'
import CategoryGrid from '@/components/home/CategoryGrid'
import { SITE_URL } from '@/lib/site'

interface HomePageProps {
  searchParams?: Promise<{
    q?: string | string[]
  }>
}

export async function generateMetadata({ searchParams }: HomePageProps): Promise<Metadata> {
  const resolvedSearchParams = (await searchParams) ?? {}
  const queryValue = Array.isArray(resolvedSearchParams.q)
    ? resolvedSearchParams.q[0]
    : resolvedSearchParams.q
  const query = queryValue?.trim() ?? ''

  return {
    title: query ? `نتائج البحث عن "${query}"` : 'الرئيسية',
    description:
      'مدونة قانونية متخصصة في الشأن السعودي، مع شروحات قانونية موثقة ومحتوى تحريري يراجع دورياً.',
    alternates: { canonical: SITE_URL },
    ...(query && {
      robots: {
        index: false,
        follow: true,
        googleBot: {
          index: false,
          follow: true,
        },
      },
    }),
  }
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedSearchParams = (await searchParams) ?? {}
  const queryValue = Array.isArray(resolvedSearchParams.q)
    ? resolvedSearchParams.q[0]
    : resolvedSearchParams.q
  const query = queryValue?.trim() ?? ''
  const featured = getFeaturedPost()
  const allPosts = searchPosts(query)
  const visiblePosts = query
    ? allPosts
    : allPosts.filter((post) => post.slug !== featured.slug)

  const counts: Record<string, number> = {}
  for (const post of getAllPosts()) {
    counts[post.category] = (counts[post.category] ?? 0) + 1
  }

  return (
    <>
      {!query && <FeaturedPost post={featured} />}
      {!query && <CategoryGrid counts={counts} />}

      <div className="max-w-7xl mx-auto px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row">
          <div className="flex-1 min-w-0">
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                {query ? (
                  <h1 className="font-display text-2xl font-black tracking-tight text-ink-2">نتائج البحث</h1>
                ) : (
                  <h2 className="font-display text-[26px] font-black tracking-tight text-ink-2">
                    أحدث المقالات
                  </h2>
                )}
                {query && (
                  <p className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>
                    عرض النتائج المطابقة لعبارة &quot;{query}&quot;
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--muted)' }}>
                <span>{visiblePosts.length} مقال</span>
                {query && (
                  <Link href="/" className="font-medium text-primary-700 transition-colors hover:text-primary-800">
                    مسح البحث
                  </Link>
                )}
              </div>
            </div>
            <BlogGrid posts={visiblePosts} />
          </div>

          <div className="lg:w-80 shrink-0">
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  )
}
