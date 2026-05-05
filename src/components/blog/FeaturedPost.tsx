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
    <section className="pt-10 pb-5" aria-label="المقال المميز">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-7 flex items-center gap-4">
          <div className="h-px flex-1 bg-line-2" />
          <span className="text-[11.5px] font-semibold tracking-[0.22em] text-primary-700">
            المقال المميز
          </span>
          <div className="h-px w-12 bg-line-2" />
        </div>

        <div
          className="grid overflow-hidden rounded-3xl border gap-0 shadow-editorial-lg lg:grid-cols-[1.3fr_1fr]"
          style={{ background: '#0A1628', borderColor: '#162D4A' }}
        >
          <div className="flex flex-col justify-center gap-5 px-8 py-12 text-warm-50 md:px-12 md:py-14">
            <div className="flex flex-wrap items-center gap-2.5">
              <CategoryBadge category={post.category} label={post.categoryLabel} asLink={false} />
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px]"
                style={{ color: '#E4CE9E', border: '1px solid rgba(200, 164, 92, 0.4)' }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.5 6.5H22l-6 4.5 2.3 7L12 15.8l-6.3 4.2L8 13l-6-4.5h7.5z" />
                </svg>
                مقال مميز
              </span>
            </div>

            <h1 className="font-display text-[clamp(26px,3.2vw,40px)] font-black leading-[1.35] tracking-tight">
              <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-primary-300">
                {post.title}
              </Link>
            </h1>

            <p
              className="line-clamp-3 text-base leading-[1.9] md:text-lg"
              style={{ color: 'rgba(245,238,220,0.78)' }}
            >
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-[15.5px] font-semibold transition-all"
                style={{ background: '#C8A45C', color: '#0A1628' }}
              >
                اقرأ المقال كاملاً
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </Link>

              <div className="flex items-center gap-3 text-sm" style={{ color: 'rgba(245,238,220,0.6)' }}>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span>•</span>
                <span>{formatReadingTime(post.readingTime)}</span>
              </div>
            </div>
          </div>

          <div className="relative order-first min-h-[260px] lg:order-last lg:min-h-[460px]">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to left, rgba(10,22,40,0) 0%, rgba(10,22,40,0) 40%, rgba(10,22,40,0.95) 100%)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
