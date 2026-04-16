import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/posts'
import CategoryBadge from '@/components/ui/CategoryBadge'
import Sidebar from '@/components/sidebar/Sidebar'
import BlogCard from '@/components/blog/BlogCard'
import {
  formatDate,
  formatReadingTime,
  sanitizeArticleHtml,
  stripHtml,
} from '@/lib/utils'
import AdUnit from '@/components/ui/AdUnit'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}

  const url = `https://qanon-sa.com/blog/${post.slug}`
  const ogImage = post.coverImage.endsWith('.svg')
    ? '/logo.png.jpeg'
    : post.coverImage

  const metaTitle = post.seoTitle || post.title
  const metaDescription = post.seoDescription || post.excerpt

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: post.tags,
    authors: [{ name: post.author.name }],
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: metaTitle,
      description: metaDescription,
      locale: 'ar_SA',
      publishedTime: post.date,
      modifiedTime: post.dateModified ?? post.date,
      authors: [post.author.name],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [ogImage],
    },
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const related = getRelatedPosts(post)
  const safeContent = sanitizeArticleHtml(post.content)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.dateModified ?? post.date,
    image: `https://qanon-sa.com${post.coverImage}`,
    inLanguage: 'ar',
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.title,
      ...(post.author.credential && { description: post.author.credential }),
    },
    publisher: {
      '@type': 'Organization',
      name: 'نظرة قانونية',
      url: 'https://qanon-sa.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://qanon-sa.com/logo.png.jpeg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://qanon-sa.com/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
    articleSection: post.categoryLabel,
    wordCount: stripHtml(safeContent).split(/\s+/).filter(Boolean).length,
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
        name: post.categoryLabel,
        item: `https://qanon-sa.com/category/${post.category}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://qanon-sa.com/blog/${post.slug}`,
      },
    ],
  }

  const faqJsonLd = post.faq && post.faq.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }
    : null

  const howToJsonLd = post.howToSteps && post.howToSteps.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: post.title,
        description: post.excerpt,
        inLanguage: 'ar',
        totalTime: `PT${post.readingTime}M`,
        step: post.howToSteps.map((s, idx) => ({
          '@type': 'HowToStep',
          position: idx + 1,
          name: s.name,
          text: s.text,
        })),
      }
    : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      {howToJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-stone-700 mb-8" aria-label="مسار التنقل">
          <Link href="/" className="hover:text-primary-600 transition-colors">الرئيسية</Link>
          <span>‹</span>
          <Link href={`/category/${post.category}`} className="hover:text-primary-600 transition-colors">
            {post.categoryLabel}
          </Link>
          <span>‹</span>
          <span className="text-stone-600 line-clamp-1">{post.title}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Article */}
          <article className="flex-1 min-w-0">
            {/* Cover Image */}
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 70vw"
              />
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <CategoryBadge category={post.category} label={post.categoryLabel} />
              {post.tags.slice(0, 4).map((tag) => (
                <span key={tag} className="text-xs text-stone-700 bg-warm-100 px-2 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-navy-800 leading-relaxed mb-5">
              {post.title}
            </h1>

            {/* Date & reading time row */}
            <div className="flex items-center gap-4 pb-6 mb-8 border-b border-warm-200">
              <time dateTime={post.date} className="text-sm text-stone-700">
                {formatDate(post.date)}
              </time>
              {post.dateModified && post.dateModified !== post.date && (
                <span className="text-xs text-stone-600">
                  (آخر تحديث: {formatDate(post.dateModified)})
                </span>
              )}
              <span className="text-stone-600">|</span>
              <span className="text-sm text-stone-700 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {formatReadingTime(post.readingTime)}
              </span>
            </div>

            {/* Ad — above content */}
            <AdUnit slot="1459279297" format="horizontal" className="mb-6" />

            {/* Content */}
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: safeContent }}
            />

            {/* FAQ Section */}
            {post.faq && post.faq.length > 0 && (
              <section className="mt-12 pt-8 border-t border-warm-200">
                <h2 className="text-2xl font-bold text-navy-800 mb-6">الأسئلة الشائعة</h2>
                <div className="space-y-4">
                  {post.faq.map((item, idx) => (
                    <details
                      key={idx}
                      className="group bg-warm-50 rounded-xl p-5 border border-warm-200"
                    >
                      <summary className="font-semibold text-navy-800 cursor-pointer flex items-center justify-between">
                        <span>{item.question}</span>
                        <span className="text-primary-600 group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <p className="mt-3 text-stone-700 leading-relaxed">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* Tags */}
            <div className="mt-10 pt-6 border-t border-warm-200">
              <h3 className="text-sm font-semibold text-stone-700 mb-3">الوسوم:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-stone-700 bg-warm-100 hover:bg-warm-200 px-3 py-1.5 rounded-full transition-colors cursor-default"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <div className="lg:w-80 shrink-0">
            <Sidebar />
          </div>
        </div>

        {/* Ad — below article */}
        <AdUnit slot="9202037944" format="auto" className="mt-10" />

        {/* Related Posts */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl font-bold text-navy-800 mb-8">مقالات ذات صلة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((rp) => (
                <BlogCard key={rp.id} post={rp} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
