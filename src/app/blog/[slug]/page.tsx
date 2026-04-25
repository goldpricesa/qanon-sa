import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import Image from 'next/image'
import {
  getAllPosts,
  getPostBySlug,
  getPostByAnySlug,
  getRelatedPosts,
  getAdjacentPosts,
} from '@/lib/posts'
import { getAuthorBySlug } from '@/data/authors'
import CategoryBadge from '@/components/ui/CategoryBadge'
import Sidebar from '@/components/sidebar/Sidebar'
import BlogCard from '@/components/blog/BlogCard'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import Faq from '@/components/blog/Faq'
import TableOfContents from '@/components/blog/TableOfContents'
import ReadingProgressBar from '@/components/blog/ReadingProgressBar'
import ShareButtons from '@/components/blog/ShareButtons'
import AuthorCard from '@/components/blog/AuthorCard'
import PostNavigation from '@/components/blog/PostNavigation'
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
  const slug = decodeURIComponent(params.slug)
  const post = getPostBySlug(slug)
  if (!post) return {}

  const url = `https://qanon-sa.com/blog/${post.slug}`
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
      section: post.categoryLabel,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
    },
  }
}

export default function BlogPostPage({ params }: Props) {
  const slug = decodeURIComponent(params.slug)
  let post = getPostBySlug(slug)
  if (!post) {
    const legacyMatch = getPostByAnySlug(slug)
    if (legacyMatch && legacyMatch.slug !== slug) {
      redirect(`/blog/${legacyMatch.slug}`)
    }
    notFound()
  }

  const related = getRelatedPosts(post)
  const adjacent = getAdjacentPosts(post)
  const safeContent = sanitizeArticleHtml(post.content)
  const canonicalAuthor =
    (post.author.slug && getAuthorBySlug(post.author.slug)) || post.author
  const articleUrl = `https://qanon-sa.com/blog/${post.slug}`

  const articleImage = post.coverImage.endsWith('.svg')
    ? `https://qanon-sa.com/blog/${post.slug}/opengraph-image`
    : `https://qanon-sa.com${post.coverImage}`

  const authorJsonLd: Record<string, unknown> = {
    '@type': 'Person',
    name: canonicalAuthor.name,
    jobTitle: canonicalAuthor.title,
  }
  if (canonicalAuthor.slug) {
    authorJsonLd['@id'] = `https://qanon-sa.com/author/${canonicalAuthor.slug}#person`
    authorJsonLd.url = `https://qanon-sa.com/author/${canonicalAuthor.slug}`
  }
  if (canonicalAuthor.credential) {
    authorJsonLd.description = canonicalAuthor.credential
  }
  if (canonicalAuthor.sameAs && canonicalAuthor.sameAs.length > 0) {
    authorJsonLd.sameAs = canonicalAuthor.sameAs
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.dateModified ?? post.date,
    image: articleImage,
    inLanguage: 'ar',
    author: authorJsonLd,
    publisher: { '@id': 'https://qanon-sa.com/#organization' },
    isPartOf: { '@id': 'https://qanon-sa.com/#website' },
    about: { '@type': 'Thing', name: post.categoryLabel },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    keywords: post.tags.join(', '),
    articleSection: post.categoryLabel,
    wordCount: stripHtml(safeContent).split(/\s+/).filter(Boolean).length,
    timeRequired: `PT${post.readingTime}M`,
  }

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
      <ReadingProgressBar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {howToJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          className="mb-8"
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: post.categoryLabel, href: `/category/${post.category}` },
            { label: post.title },
          ]}
        />

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
            <h1 className="font-display text-2xl md:text-3xl font-bold text-navy-800 leading-relaxed mb-5">
              {post.title}
            </h1>

            {/* Date & reading time row */}
            <div className="flex items-center gap-4 pb-6 mb-6 border-b border-warm-200 flex-wrap">
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

            {/* Share */}
            <ShareButtons url={articleUrl} title={post.title} />

            {/* Table of Contents */}
            <div className="mt-6">
              <TableOfContents />
            </div>

            {/* Ad — above content */}
            <AdUnit slot="1459279297" format="horizontal" className="mb-6" />

            {/* Content */}
            <div
              data-article-content
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: safeContent }}
            />

            {/* FAQ Section */}
            {post.faq && post.faq.length > 0 && <Faq items={post.faq} />}

            {/* Tags */}
            <div className="mt-10 pt-6 border-t border-warm-200 print:hidden">
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

            {/* Author Card */}
            <AuthorCard author={canonicalAuthor} />

            {/* Prev / Next */}
            <PostNavigation previous={adjacent.previous} next={adjacent.next} />
          </article>

          {/* Sidebar */}
          <div className="lg:w-80 shrink-0 print:hidden">
            <Sidebar />
          </div>
        </div>

        {/* Ad — below article */}
        <AdUnit slot="9202037944" format="auto" className="mt-10" />

        {/* Related Posts */}
        {related.length > 0 && (
          <section className="mt-16 print:hidden">
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
