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
    <article className="group rounded-2xl overflow-hidden border border-line bg-paper-2 hover:shadow-editorial-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
        <div className="relative h-48 w-full bg-paper-3">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            loading="lazy"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3.5 right-3.5">
            <CategoryBadge category={post.category} label={post.categoryLabel} size="sm" asLink={false} />
          </div>
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <Link href={`/blog/${post.slug}`}>
          <h2 className="font-display text-[17px] font-bold text-ink-2 group-hover:text-primary-700 transition-colors line-clamp-2 mb-2.5 leading-relaxed">
            {post.title}
          </h2>
        </Link>

        <p className="text-[13.5px] leading-[1.85] line-clamp-3 flex-1" style={{ color: 'var(--muted)' }}>
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-line">
          <time dateTime={post.date} className="text-[11.5px] tabular-nums" style={{ color: 'var(--muted-2)' }}>
            {formatDate(post.date)}
          </time>
          <span className="text-[11.5px] flex items-center gap-1.5" style={{ color: 'var(--muted-2)' }}>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
            {formatReadingTime(post.readingTime)}
          </span>
        </div>
      </div>
    </article>
  )
}
