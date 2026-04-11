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
    <article className="group bg-white rounded-xl overflow-hidden border border-warm-200 hover:shadow-lg transition-all duration-200 flex flex-col">
      <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
        <div className="relative h-48 w-full">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
            className="text-xs text-stone-700"
          >
            {formatDate(post.date)}
          </time>
        </div>

        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-base font-bold text-navy-800 group-hover:text-primary-600 transition-colors line-clamp-2 mb-2 leading-relaxed">
            {post.title}
          </h2>
        </Link>

        <p className="text-sm text-stone-700 line-clamp-3 leading-relaxed flex-1">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-end mt-4 pt-4 border-t border-warm-100">
          <span className="text-xs text-stone-700 flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {formatReadingTime(post.readingTime)}
          </span>
        </div>
      </div>
    </article>
  )
}
