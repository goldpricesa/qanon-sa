import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts, getAllCategories } from '@/lib/posts'
import BlogGrid from '@/components/blog/BlogGrid'
import Sidebar from '@/components/sidebar/Sidebar'
import CategoryBadge from '@/components/ui/CategoryBadge'
import { SITE_LOGO_URL, SITE_NAME, SITE_URL, getAbsoluteUrl } from '@/lib/site'

const url = getAbsoluteUrl('/blog')
const title = 'المدونة القانونية'
const description =
  'جميع مقالات نظرة قانونية في فهرس واحد يغطي نظام العمل، الأحوال الشخصية، العقارات، القانون التجاري، والجرائم المعلوماتية في المملكة العربية السعودية.'

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
    name: `${SITE_NAME} — المدونة`,
    description,
    url,
    inLanguage: 'ar-SA',
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: SITE_LOGO_URL,
      },
    },
    blogPost: posts.slice(0, 20).map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      url: getAbsoluteUrl(`/blog/${encodeURI(post.slug)}`),
      datePublished: post.date,
      dateModified: post.dateModified ?? post.reviewedAt ?? post.date,
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
        item: SITE_URL,
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
            <Link href="/" className="transition-colors hover:text-primary-600">الرئيسية</Link>
            <span>‹</span>
            <span className="text-stone-600">المدونة</span>
          </nav>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-navy-800 mb-3">
            {title}
          </h1>
          <p className="max-w-3xl text-sm leading-relaxed text-stone-700 md:text-base">
            {description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {categories.map((category) => (
              <CategoryBadge
                key={category.slug}
                category={category.slug}
                label={`${category.label} (${category.count})`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col gap-10 lg:flex-row">
          <div className="flex-1 min-w-0">
            <div className="mb-8 flex items-end justify-between">
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
