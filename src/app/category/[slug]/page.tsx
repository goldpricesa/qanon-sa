import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllCategories, getPostsByCategory } from '@/lib/posts'
import BlogGrid from '@/components/blog/BlogGrid'
import CategoryBadge from '@/components/ui/CategoryBadge'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { getAbsoluteUrl } from '@/lib/site'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllCategories().map((category) => ({ slug: category.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: rawSlug } = await params
  const slug = decodeURIComponent(rawSlug)
  const category = getAllCategories().find((item) => item.slug === slug)
  if (!category) {
    return {}
  }

  const url = getAbsoluteUrl(`/category/${category.slug}`)
  const title = `مقالات ${category.label}`
  const description = `تصفح جميع المقالات في تصنيف ${category.label} على مدونة نظرة قانونية — ${category.count} مقال متخصص في القانون السعودي.`

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
    },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug: rawSlug } = await params
  const slug = decodeURIComponent(rawSlug)
  const category = getAllCategories().find((item) => item.slug === slug)
  if (!category) {
    notFound()
  }

  const posts = getPostsByCategory(slug)
  const url = getAbsoluteUrl(`/category/${encodeURI(category.slug)}`)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `مقالات ${category.label}`,
    description: `جميع المقالات في تصنيف ${category.label}`,
    url,
    inLanguage: 'ar',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="bg-white border-b border-warm-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumbs
            className="mb-4"
            items={[
              { label: 'الرئيسية', href: '/' },
              { label: category.label },
            ]}
          />
          <div className="mb-3 flex items-center gap-3">
            <CategoryBadge category={category.slug} label={category.label} asLink={false} />
            <span className="text-sm text-stone-700">{category.count} مقال</span>
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-navy-800">
            مقالات {category.label}
          </h1>
          <p className="mt-2 text-sm text-stone-700">
            مقالات متخصصة في {category.label} وفق الأنظمة واللوائح السعودية المعتمدة.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <BlogGrid posts={posts} />
      </div>
    </>
  )
}
