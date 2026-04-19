import Link from 'next/link'
import type { Author } from '@/types'

interface AuthorCardProps {
  author: Author
  variant?: 'compact' | 'full'
}

export default function AuthorCard({ author, variant = 'compact' }: AuthorCardProps) {
  const href = author.slug ? `/author/${author.slug}` : undefined
  const initials = author.name
    .replace(/^أ\.\s*/, '')
    .split(' ')
    .slice(0, 2)
    .map((w) => w.charAt(0))
    .join('')

  return (
    <aside className="mt-12 pt-8 border-t border-warm-200">
      <div className="bg-warm-50 rounded-2xl p-6 border border-warm-200 flex flex-col sm:flex-row gap-5">
        <div className="w-20 h-20 shrink-0 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-2xl font-bold">
          {initials}
        </div>
        <div className="flex-1">
          <div className="flex items-start flex-wrap gap-x-3 gap-y-1">
            {href ? (
              <Link
                href={href}
                className="text-lg font-bold text-navy-800 hover:text-primary-600 transition-colors"
              >
                {author.name}
              </Link>
            ) : (
              <span className="text-lg font-bold text-navy-800">{author.name}</span>
            )}
            {author.credential && (
              <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">
                {author.credential}
              </span>
            )}
          </div>
          <p className="text-sm text-stone-700 mt-1">{author.title}</p>
          {variant === 'full' && author.bio && (
            <p className="text-sm text-stone-700 mt-3 leading-relaxed">{author.bio}</p>
          )}
          {author.expertise && author.expertise.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {author.expertise.slice(0, variant === 'full' ? 12 : 5).map((e) => (
                <span
                  key={e}
                  className="text-xs text-stone-700 bg-white px-2 py-1 rounded-full border border-warm-200"
                >
                  {e}
                </span>
              ))}
            </div>
          )}
          {href && variant === 'compact' && (
            <Link
              href={href}
              className="inline-block mt-4 text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              عرض جميع المقالات ←
            </Link>
          )}
        </div>
      </div>
    </aside>
  )
}
