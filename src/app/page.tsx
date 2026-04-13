import type { Metadata } from 'next'
import Link from 'next/link'
import { getFeaturedPost, searchPosts } from '@/lib/posts'
import FeaturedPost from '@/components/blog/FeaturedPost'
import BlogGrid from '@/components/blog/BlogGrid'
import Sidebar from '@/components/sidebar/Sidebar'

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
      {!query && <FeaturedPost post={featured} />}

      {/* Calculator Banner */}
      {!query && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Link
            href="/calculator"
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-primary-500 hover:bg-primary-600 transition-colors text-white rounded-2xl px-6 py-5"
          >
            <div className="flex items-center gap-4">
              <div className="bg-white/20 rounded-xl p-3 shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 13h.01M13 13h.01M13 17h.01M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-base">حاسبة المستحقات العمالية</p>
                <p className="text-primary-100 text-sm mt-0.5">احسب مكافأة نهاية الخدمة ورصيد إجازاتك وفق نظام العمل السعودي</p>
              </div>
            </div>
            <span className="shrink-0 bg-white text-primary-600 font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-primary-50 transition-colors self-start sm:self-auto">
              احسب الآن
            </span>
          </Link>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col gap-3 mb-8 md:flex-row md:items-end md:justify-between">
              <div>
                {query ? (
                  <h1 className="text-2xl font-bold text-navy-800">نتائج البحث</h1>
                ) : (
                  <h2 className="text-xl font-bold text-navy-800">أحدث المقالات</h2>
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
