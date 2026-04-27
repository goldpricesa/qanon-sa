import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllCategories, getPostsByCategory } from '@/lib/posts'
import BlogGrid from '@/components/blog/BlogGrid'
import CategoryBadge from '@/components/ui/CategoryBadge'
import Breadcrumbs from '@/components/ui/Breadcrumbs'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return getAllCategories().map((cat) => ({ slug: cat.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = decodeURIComponent(params.slug)
  const categories = getAllCategories()
  const cat = categories.find((c) => c.slug === slug)
  if (!cat) return {}

  const url = `https://qanon-sa.com/category/${cat.slug}`
  const title = `مقالات ${cat.label}`
  const description = `تصفح جميع المقالات في تصنيف ${cat.label} على مدونة نظرة قانونية — ${cat.count} مقال متخصص في القانون السعودي.`

  const ogImageUrl = `${url}/opengraph-image`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      locale: 'ar_SA',
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  }
}

export default function CategoryPage({ params }: Props) {
  const slug = decodeURIComponent(params.slug)
  const categories = getAllCategories()
  const cat = categories.find((c) => c.slug === slug)
  if (!cat) notFound()

  const posts = getPostsByCategory(slug)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `مقالات ${cat.label}`,
    description: `جميع المقالات في تصنيف ${cat.label}`,
    url: `https://qanon-sa.com/category/${encodeURI(cat.slug)}`,
    inLanguage: 'ar',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Category Header */}
      <div className="bg-white border-b border-warm-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumbs
            className="mb-4"
            items={[
              { label: 'الرئيسية', href: '/' },
              { label: cat.label },
            ]}
          />
          <div className="flex items-center gap-3 mb-3">
            <CategoryBadge category={cat.slug} label={cat.label} asLink={false} />
            <span className="text-sm text-stone-700">{cat.count} مقال</span>
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-navy-800">
            مقالات {cat.label}
          </h1>
          <p className="text-stone-700 mt-2 text-sm">
            مقالات متخصصة في {cat.label} وفق الأنظمة واللوائح السعودية المعتمدة.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <BlogGrid posts={posts} />
      </div>
    </>
  )
}
