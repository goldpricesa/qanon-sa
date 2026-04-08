import Link from 'next/link'
import Image from 'next/image'
import { getRecentPosts } from '@/lib/posts'
import { formatDate } from '@/lib/utils'

export default function RecentPosts() {
  const posts = getRecentPosts(4)

  return (
    <div>
      <h3 className="text-sm font-bold text-navy-800 uppercase tracking-wider mb-4 pb-2 border-b border-warm-200">
        أحدث المقالات
      </h3>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="flex gap-3 group">
            <Link href={`/blog/${post.slug}`} className="shrink-0">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                  sizes="64px"
                />
              </div>
            </Link>
            <div className="flex-1 min-w-0">
              <Link href={`/blog/${post.slug}`}>
                <p className="text-sm font-medium text-navy-800 group-hover:text-primary-600 transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </p>
              </Link>
              <time dateTime={post.date} className="text-xs text-stone-400 mt-1 block">
                {formatDate(post.date)}
              </time>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
