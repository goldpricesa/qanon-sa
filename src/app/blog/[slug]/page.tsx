import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/posts'
import CategoryBadge from '@/components/ui/CategoryBadge'
import Sidebar from '@/components/sidebar/Sidebar'
import BlogCard from '@/components/blog/BlogCard'
import { formatDate, formatReadingTime } from '@/lib/utils'

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

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author.name }],
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.excerpt,
      locale: 'ar_SA',
      publishedTime: post.date,
      authors: [post.author.name],
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const related = getRelatedPosts(post)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    image: post.coverImage,
    inLanguage: 'ar',
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.title,
    },
    publisher: {
      '@type': 'Organization',
      name: 'قانون',
      url: 'https://qanon-sa.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://qanon-sa.com/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
    articleSection: post.categoryLabel,
    wordCount: post.content.replace(/<[^>]+>/g, '').split(/\s+/).length,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-stone-400 mb-8" aria-label="مسار التنقل">
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
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs text-stone-400 bg-warm-100 px-2 py-1 rounded-full">
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
              <time dateTime={post.date} className="text-sm text-stone-400">
                {formatDate(post.date)}
              </time>
              <span className="text-stone-300">|</span>
              <span className="text-sm text-stone-400 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {formatReadingTime(post.readingTime)}
              </span>
            </div>

            {/* Content */}
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="mt-10 pt-6 border-t border-warm-200">
              <h3 className="text-sm font-semibold text-stone-500 mb-3">الوسوم:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-stone-500 bg-warm-100 hover:bg-warm-200 px-3 py-1.5 rounded-full transition-colors cursor-default"
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
