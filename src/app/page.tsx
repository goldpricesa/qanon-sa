import type { Metadata } from 'next'
import Link from 'next/link'
import { getFeaturedPost, searchPosts, getAllPosts } from '@/lib/posts'
import FeaturedPost from '@/components/blog/FeaturedPost'
import BlogGrid from '@/components/blog/BlogGrid'
import Sidebar from '@/components/sidebar/Sidebar'
import CategoryGrid from '@/components/home/CategoryGrid'

export const metadata: Metadata = {
  title: 'الرئيسية',
  description:
    'مدونة قانونية متخصصة في الشأن السعودي — نظام العمل، العقارات، الشركات، والقانون الرقمي. مقالات موثوقة يكتبها محامون معتمدون.',
  alternates: { canonical: 'https://qanon-sa.com' },
}

interface HomePageProps {
  searchParams?: { q?: string }
}

export default function HomePage({ searchParams }: HomePageProps) {
  const query = searchParams?.q?.trim() ?? ''
  const featured = getFeaturedPost()
  const allPosts = searchPosts(query)
  const visiblePosts = query
    ? allPosts
    : allPosts.filter((post) => post.slug !== featured.slug)

  const counts: Record<string, number> = {}
  for (const p of getAllPosts()) {
    counts[p.category] = (counts[p.category] ?? 0) + 1
  }

  return (
    <>
      {!query && <FeaturedPost post={featured} />}
      {!query && <CategoryGrid counts={counts} />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1 min-w-0">
            <div className="flex flex-col gap-3 mb-6 md:flex-row md:items-end md:justify-between">
              <div>
                {query ? (
                  <h1 className="font-display text-2xl font-black text-ink-2 tracking-tight">نتائج البحث</h1>
                ) : (
                  <h2 className="font-display text-[26px] font-black text-ink-2 tracking-tight">أحدث المقالات</h2>
                )}
                {query && (
                  <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
                    عرض النتائج المطابقة لعبارة &quot;{query}&quot;
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--muted)' }}>
                <span>{visiblePosts.length} مقال</span>
                {query && (
                  <Link href="/" className="font-medium text-primary-700 hover:text-primary-800 transition-colors">
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
