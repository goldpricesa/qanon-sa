import Link from 'next/link'
import Image from 'next/image'
import type { BlogPost } from '@/types'
import CategoryBadge from '@/components/ui/CategoryBadge'
import { formatDate, formatReadingTime } from '@/lib/utils'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-warm-200 hover:border-gold-300 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col">
      <Link
        href={`/blog/${post.slug}`}
        className="block overflow-hidden relative"
      >
        <div className="relative h-48 w-full">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            loading="lazy"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-navy-900/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"
          />
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <CategoryBadge
            category={post.category}
            label={post.categoryLabel}
            size="sm"
          />
          <time
            dateTime={post.date}
            className="text-xs text-stone-600"
          >
            {formatDate(post.date)}
          </time>
        </div>

        <Link href={`/blog/${post.slug}`}>
          <h2 className="font-display text-base font-bold text-navy-800 group-hover:text-primary-700 transition-colors line-clamp-2 mb-2 leading-relaxed">
            {post.title}
          </h2>
        </Link>

        <p className="text-sm text-stone-700 line-clamp-3 leading-relaxed flex-1">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-warm-100">
          <span className="text-xs text-stone-700 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {formatReadingTime(post.readingTime)}
          </span>
          <span className="text-xs font-semibold text-primary-700 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            اقرأ المقال
            <svg className="w-3 h-3 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </div>
      </div>
    </article>
  )
}
