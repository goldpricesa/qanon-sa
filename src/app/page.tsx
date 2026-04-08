import type { Metadata } from 'next'
import { getAllPosts, getFeaturedPost } from '@/lib/posts'
import FeaturedPost from '@/components/blog/FeaturedPost'
import BlogGrid from '@/components/blog/BlogGrid'
import Sidebar from '@/components/sidebar/Sidebar'

export const metadata: Metadata = {
  title: 'قانون | مدونة قانونية سعودية',
  description:
    'مدونة قانونية متخصصة في الشأن السعودي — نظام العمل، العقارات، الشركات، والقانون الرقمي. مقالات موثوقة يكتبها محامون معتمدون.',
  alternates: { canonical: 'https://qanon-sa.com' },
}

export default function HomePage() {
  const featured = getFeaturedPost()
  const allPosts = getAllPosts().filter((p) => p.slug !== featured.slug)

  return (
    <>
      <FeaturedPost post={featured} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-navy-800">أحدث المقالات</h2>
              <span className="text-sm text-stone-400">{allPosts.length} مقال</span>
            </div>
            <BlogGrid posts={allPosts} />
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
