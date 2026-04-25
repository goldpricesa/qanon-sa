import type { Metadata } from 'next'
import Link from 'next/link'
import { getFeaturedPost, searchPosts } from '@/lib/posts'
import FeaturedPost from '@/components/blog/FeaturedPost'
import BlogGrid from '@/components/blog/BlogGrid'
import Sidebar from '@/components/sidebar/Sidebar'
import TrustStrip from '@/components/blog/TrustStrip'

export const metadata: Metadata = {
  title: 'الرئيسية',
  description:
    'مدونة قانونية متخصصة في الشأن السعودي — نظام العمل، العقارات، الشركات، والقانون الرقمي. مقالات موثوقة يكتبها محامون معتمدون.',
  alternates: { canonical: 'https://qanon-sa.com' },
}

interface HomePageProps {
  searchParams?: {
    q?: string
  }
}

export default function HomePage({ searchParams }: HomePageProps) {
  const query = searchParams?.q?.trim() ?? ''
  const featured = getFeaturedPost()
  const allPosts = searchPosts(query)
  const visiblePosts = query
    ? allPosts
    : allPosts.filter((post) => post.slug !== featured.slug)

  return (
    <>
      {!query && (
        <>
          <FeaturedPost post={featured} />
          <TrustStrip />
        </>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col gap-3 mb-8 md:flex-row md:items-end md:justify-between">
              <div>
                {query ? (
                  <h1 className="font-display text-2xl font-bold text-navy-800">نتائج البحث</h1>
                ) : (
                  <div className="flex items-center gap-3">
                    <span aria-hidden="true" className="block w-1 h-7 rounded-full bg-gold-500" />
                    <h2 className="font-display text-2xl font-bold text-navy-800">أحدث المقالات</h2>
                  </div>
                )}
                {query && (
                  <p className="text-sm text-stone-700 mt-1">
                    عرض النتائج المطابقة لعبارة &quot;{query}&quot;
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 text-sm text-stone-700">
                <span>{visiblePosts.length} مقال</span>
                {query && (
                  <Link
                    href="/"
                    className="font-medium text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    مسح البحث
                  </Link>
                )}
              </div>
            </div>
            <BlogGrid posts={visiblePosts} />
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 shrink-0">
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  )
}
