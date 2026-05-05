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
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-paper-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-editorial-lg">
      <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
        <div className="relative h-48 w-full bg-paper-3">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute right-3.5 top-3.5">
            <CategoryBadge category={post.category} label={post.categoryLabel} size="sm" asLink={false} />
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link href={`/blog/${post.slug}`}>
          <h2 className="mb-2.5 line-clamp-2 font-display text-[17px] font-bold leading-relaxed text-ink-2 transition-colors group-hover:text-primary-700">
            {post.title}
          </h2>
        </Link>

        <p className="flex-1 line-clamp-3 text-[13.5px] leading-[1.85]" style={{ color: 'var(--muted)' }}>
          {post.excerpt}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
          <time dateTime={post.date} className="text-[11.5px] tabular-nums" style={{ color: 'var(--muted-2)' }}>
            {formatDate(post.date)}
          </time>
          <span className="flex items-center gap-1.5 text-[11.5px]" style={{ color: 'var(--muted-2)' }}>
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
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
