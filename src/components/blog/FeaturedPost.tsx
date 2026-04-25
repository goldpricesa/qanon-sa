import Link from 'next/link'
import Image from 'next/image'
import type { BlogPost } from '@/types'
import CategoryBadge from '@/components/ui/CategoryBadge'
import { formatDate, formatReadingTime } from '@/lib/utils'

interface FeaturedPostProps {
  post: BlogPost
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <section className="relative bg-navy-900 overflow-hidden" aria-label="المقال المميز">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover opacity-20"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-navy-900 via-navy-900/80 to-navy-900/40" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <CategoryBadge
              category={post.category}
              label={post.categoryLabel}
              asLink={false}
            />
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gold-200 bg-gold-900/40 ring-1 ring-gold-500/30 rounded-full px-3 py-1">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              مقال مميز
            </span>
          </div>

          <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-relaxed mb-4">
            <Link href={`/blog/${post.slug}`} className="hover:text-gold-300 transition-colors">
              {post.title}
            </Link>
          </h1>

          <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6 line-clamp-3">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-navy-900 px-5 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-md shadow-gold-900/20"
            >
              اقرأ المقال كاملاً
              <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>

            <div className="flex items-center gap-3 text-sm text-gray-400">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>·</span>
              <span>{formatReadingTime(post.readingTime)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
