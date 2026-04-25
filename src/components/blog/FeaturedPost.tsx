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
        <div className="flex items-center gap-4 mb-7">
          <div className="h-px flex-1 bg-line-2" />
          <span className="text-[11.5px] tracking-[0.22em] font-semibold text-primary-700">المقال المميز</span>
          <div className="h-px w-12 bg-line-2" />
        </div>

        <div
          className="grid lg:grid-cols-[1.3fr_1fr] gap-0 rounded-3xl overflow-hidden shadow-editorial-lg border"
          style={{ background: '#0A1628', borderColor: '#162D4A' }}
        >
          <div className="px-8 md:px-12 py-12 md:py-14 flex flex-col justify-center gap-5 text-warm-50">
            <div className="flex items-center gap-2.5 flex-wrap">
              <CategoryBadge category={post.category} label={post.categoryLabel} asLink={false} />
              <span
                className="inline-flex items-center gap-1.5 text-[11.5px] py-1 px-2.5 rounded-full"
                style={{ color: '#E4CE9E', border: '1px solid rgba(200, 164, 92, 0.4)' }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.5 6.5H22l-6 4.5 2.3 7L12 15.8l-6.3 4.2L8 13l-6-4.5h7.5z" />
                </svg>
                مقال مميز
              </span>
            </div>

            <h1 className="font-display font-black text-[clamp(26px,3.2vw,40px)] leading-[1.35] tracking-tight">
              <Link href={`/blog/${post.slug}`} className="hover:text-primary-300 transition-colors">
                {post.title}
              </Link>
            </h1>

            <p className="text-base md:text-lg leading-[1.9] line-clamp-3" style={{ color: 'rgba(245,238,220,0.78)' }}>
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-[15.5px] transition-all"
                style={{ background: '#C8A45C', color: '#0A1628' }}
              >
                اقرأ المقال كاملاً
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

          <div className="relative min-h-[260px] lg:min-h-[460px] order-first lg:order-last">
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
              style={{ background: 'linear-gradient(to left, rgba(10,22,40,0) 0%, rgba(10,22,40,0) 40%, rgba(10,22,40,0.95) 100%)' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
