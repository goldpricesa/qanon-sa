import type { Metadata } from 'next'
import { getAllPosts, getAllCategories } from '@/lib/posts'
import BlogGrid from '@/components/blog/BlogGrid'
import Sidebar from '@/components/sidebar/Sidebar'
import CategoryBadge from '@/components/ui/CategoryBadge'
import Link from 'next/link'

const url = 'https://qanon-sa.com/blog'
const title = 'المدونة القانونية'
const description =
  'جميع مقالات نظرة قانونية — فهرس شامل يغطي نظام العمل، الأحوال الشخصية، العقارات، القانون التجاري، الجرائم المعلوماتية، والقانون المدني في المملكة العربية السعودية.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    type: 'website',
    url,
    title,
    description,
    locale: 'ar_SA',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
}

export default function BlogIndexPage() {
  const posts = getAllPosts()
  const categories = getAllCategories()

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'نظرة قانونية — المدونة',
    description,
    url,
    inLanguage: 'ar-SA',
    publisher: {
      '@type': 'Organization',
      name: 'نظرة قانونية',
      url: 'https://qanon-sa.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://qanon-sa.com/logo.png',
      },
    },
    blogPost: posts.slice(0, 20).map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      url: `https://qanon-sa.com/blog/${post.slug}`,
      datePublished: post.date,
      dateModified: post.dateModified ?? post.date,
      author: {
        '@type': 'Person',
        name: post.author.name,
      },
    })),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'الرئيسية',
        item: 'https://qanon-sa.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'المدونة',
        item: url,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="bg-white border-b border-warm-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <nav className="flex items-center gap-2 text-sm text-stone-700 mb-4" aria-label="مسار التنقل">
            <Link href="/" className="hover:text-primary-600 transition-colors">الرئيسية</Link>
            <span>‹</span>
            <span className="text-stone-600">المدونة</span>
          </nav>
          <h1 className="text-2xl md:text-3xl font-bold text-navy-800 mb-3">
            المدونة القانونية
          </h1>
          <p className="text-stone-700 text-sm md:text-base leading-relaxed max-w-3xl">
            {description}
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            {categories.map((cat) => (
              <CategoryBadge key={cat.slug} category={cat.slug} label={`${cat.label} (${cat.count})`} />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1 min-w-0">
            <div className="flex items-end justify-between mb-8">
              <h2 className="text-xl font-bold text-navy-800">جميع المقالات</h2>
              <span className="text-sm text-stone-700">{posts.length} مقال</span>
            </div>
            <BlogGrid posts={posts} />
          </div>
          <div className="lg:w-80 shrink-0">
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  )
}
