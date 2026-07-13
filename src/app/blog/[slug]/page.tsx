import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound, redirect } from 'next/navigation'
import { getAuthorBySlug } from '@/data/authors'
import {
  getAdjacentPosts,
  getAllPosts,
  getPostByAnySlug,
  getPostBySlug,
  getRelatedPosts,
} from '@/lib/posts'
import {
  formatDate,
  formatReadingTime,
  sanitizeArticleHtml,
  stripHtml,
} from '@/lib/utils'
import AdUnit from '@/components/ads/AdUnit'
import { AD_SLOTS } from '@/components/ads/slots'
import BlogCard from '@/components/blog/BlogCard'
import AuthorCard from '@/components/blog/AuthorCard'
import Faq from '@/components/blog/Faq'
import PostNavigation from '@/components/blog/PostNavigation'
import ReadingProgressBar from '@/components/blog/ReadingProgressBar'
import ShareButtons from '@/components/blog/ShareButtons'
import TableOfContents from '@/components/blog/TableOfContents'
import EditorialNote from '@/components/content/EditorialNote'
import Sidebar from '@/components/sidebar/Sidebar'
import CategoryBadge from '@/components/ui/CategoryBadge'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import {
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
  SITE_URL,
  SITE_WHATSAPP_URL,
  getAbsoluteUrl,
} from '@/lib/site'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: rawSlug } = await params
  const slug = decodeURIComponent(rawSlug)
  const post = getPostBySlug(slug)
  if (!post) {
    return {}
  }

  // نفس الترميز المستخدم في sitemap وfeed حتى تتطابق روابط canonical معها.
  const url = getAbsoluteUrl(`/blog/${encodeURI(post.slug)}`)
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
      modifiedTime: post.dateModified ?? post.reviewedAt ?? post.date,
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

export default async function BlogPostPage({ params }: Props) {
  const { slug: rawSlug } = await params
  const slug = decodeURIComponent(rawSlug)
  let post = getPostBySlug(slug)

  if (!post) {
    const legacyMatch = getPostByAnySlug(slug)
    if (legacyMatch && legacyMatch.slug !== slug) {
      redirect(`/blog/${legacyMatch.slug}`)
    }
    notFound()
  }

  const related = getRelatedPosts(post)
  const { previous, next } = getAdjacentPosts(post)
  const safeContent = sanitizeArticleHtml(post.content)
  const canonicalAuthor = (post.author.slug && getAuthorBySlug(post.author.slug)) || post.author
  const articleUrl = getAbsoluteUrl(`/blog/${encodeURI(post.slug)}`)
  const articleImage = post.coverImage.endsWith('.svg')
    ? getAbsoluteUrl(`/blog/${encodeURI(post.slug)}/opengraph-image`)
    : getAbsoluteUrl(post.coverImage)

  const authorJsonLd: Record<string, unknown> = {
    '@type': 'Person',
    name: canonicalAuthor.name,
    jobTitle: canonicalAuthor.title,
  }

  if (canonicalAuthor.slug) {
    authorJsonLd['@id'] = getAbsoluteUrl(`/author/${canonicalAuthor.slug}#person`)
    authorJsonLd.url = getAbsoluteUrl(`/author/${canonicalAuthor.slug}`)
  }

  if (canonicalAuthor.credential) {
    authorJsonLd.description = canonicalAuthor.credential
  }

  if (canonicalAuthor.sameAs && canonicalAuthor.sameAs.length > 0) {
    authorJsonLd.sameAs = canonicalAuthor.sameAs
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LegalArticle',
    headline: post.title,
    description: post.excerpt,
    url: articleUrl,
    datePublished: post.date,
    dateModified: post.dateModified ?? post.reviewedAt ?? post.date,
    image: articleImage,
    inLanguage: 'ar',
    isAccessibleForFree: true,
    author: authorJsonLd,
    publisher: { '@id': `${SITE_URL}/#organization` },
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@type': 'Thing', name: post.categoryLabel },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.article-excerpt'],
    },
    ...(post.sources && post.sources.length > 0 && {
      citation: post.sources.map((source) => source.url),
    }),
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
        step: post.howToSteps.map((step, index) => ({
          '@type': 'HowToStep',
          position: index + 1,
          name: step.name,
          text: step.text,
        })),
      }
    : null

  return (
    <>
      <ReadingProgressBar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      {howToJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
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

        <div className="flex flex-col gap-10 lg:flex-row">
          <article className="flex-1 min-w-0">
            <div className="relative mb-8 h-64 overflow-hidden rounded-2xl md:h-80">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 70vw"
              />
            </div>

            <div className="mb-4 flex flex-wrap items-center gap-3">
              <CategoryBadge category={post.category} label={post.categoryLabel} />
              {post.tags.slice(0, 4).map((tag) => (
                <span key={tag} className="rounded-full bg-warm-100 px-2 py-1 text-xs text-stone-700">
                  #{tag}
                </span>
              ))}
            </div>

            <h1 className="font-display text-2xl md:text-3xl font-bold text-navy-800 leading-relaxed mb-5">
              {post.title}
            </h1>

            <div className="mb-6 flex flex-wrap items-center gap-4 border-b border-warm-200 pb-6">
              <time dateTime={post.date} className="text-sm text-stone-700">
                {formatDate(post.date)}
              </time>
              {(post.dateModified || post.reviewedAt) && (
                <span className="text-xs text-stone-600">
                  (آخر مراجعة: {formatDate(post.reviewedAt ?? post.dateModified ?? post.date)})
                </span>
              )}
              <span className="text-stone-600">|</span>
              <span className="flex items-center gap-1 text-sm text-stone-700">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {formatReadingTime(post.readingTime)}
              </span>
            </div>

            <ShareButtons url={articleUrl} title={post.title} />

            {(post.reviewedAt || (post.sources && post.sources.length > 0)) && (
              <div className="mt-6">
                <EditorialNote
                  reviewedAt={post.reviewedAt ?? post.dateModified}
                  sources={post.sources}
                  note="روابط هذه البطاقة تشير إلى المراجع الرسمية التي استند إليها التحديث التحريري لهذه المادة. لا تغني المادة عن الاستشارة القانونية المتخصصة عند وجود نزاع أو إجراء رسمي."
                />
              </div>
            )}

            <div className="mt-6">
              <TableOfContents />
            </div>

            <AdUnit slot={AD_SLOTS.articleTop} className="my-6 print:hidden" />

            <div
              data-article-content
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: safeContent }}
            />

            <AdUnit slot={AD_SLOTS.articleBottom} className="mt-8 print:hidden" />

            <section className="mt-8 rounded-xl border border-primary-100 bg-primary-50 p-5 print:hidden">
              <h2 className="text-base font-bold text-navy-800">للتواصل وطلبات التصحيح</h2>
              <p className="mt-2 text-sm leading-relaxed text-stone-700">
                للتواصل التحريري أو طلبات الخصوصية أو تصحيح معلومة في المقال، استخدم الرقم:
                {' '}
                <a href={`tel:${SITE_PHONE_TEL}`} className="font-semibold text-primary-700 hover:underline">
                  {SITE_PHONE_DISPLAY}
                </a>
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={SITE_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
                >
                  تواصل واتساب
                </a>
                <a
                  href={`tel:${SITE_PHONE_TEL}`}
                  className="rounded-lg border border-primary-200 bg-white px-4 py-2 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-50"
                >
                  اتصال مباشر
                </a>
              </div>
            </section>

            {post.faq && post.faq.length > 0 && <Faq items={post.faq} />}

            <div className="mt-10 border-t border-warm-200 pt-6 print:hidden">
              <h3 className="mb-3 text-sm font-semibold text-stone-700">الوسوم:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="cursor-default rounded-full bg-warm-100 px-3 py-1.5 text-xs text-stone-700 transition-colors hover:bg-warm-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <PostNavigation previous={previous} next={next} />

            <AuthorCard author={canonicalAuthor} />
          </article>

          <div className="lg:w-80 shrink-0 print:hidden">
            <Sidebar />
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16 print:hidden">
            <h2 className="mb-8 text-xl font-bold text-navy-800">مقالات ذات صلة</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((relatedPost) => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
