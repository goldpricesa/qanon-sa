import Link from 'next/link'
import type { BlogPost } from '@/types'

interface PostNavigationProps {
  previous?: BlogPost
  next?: BlogPost
}

export default function PostNavigation({ previous, next }: PostNavigationProps) {
  if (!previous && !next) return null

  return (
    <nav
      aria-label="التنقل بين المقالات"
      className="mt-12 pt-8 border-t border-warm-200 grid grid-cols-1 md:grid-cols-2 gap-4 print:hidden"
    >
      {previous ? (
        <Link
          href={`/blog/${previous.slug}`}
          className="group flex flex-col gap-1.5 rounded-2xl border border-warm-200 bg-white p-5 transition-all hover:border-primary-300 hover:shadow-md"
        >
          <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
            <svg
              aria-hidden="true"
              className="w-3.5 h-3.5 rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
            المقال السابق
          </span>
          <span className="text-sm font-bold text-navy-800 leading-relaxed line-clamp-2 group-hover:text-primary-700 transition-colors">
            {previous.title}
          </span>
        </Link>
      ) : (
        <span aria-hidden="true" className="hidden md:block" />
      )}

      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="group flex flex-col gap-1.5 rounded-2xl border border-warm-200 bg-white p-5 text-left transition-all hover:border-primary-300 hover:shadow-md md:items-end md:text-right"
        >
          <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
            المقال التالي
            <svg
              aria-hidden="true"
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </span>
          <span className="text-sm font-bold text-navy-800 leading-relaxed line-clamp-2 group-hover:text-primary-700 transition-colors">
            {next.title}
          </span>
        </Link>
      ) : (
        <span aria-hidden="true" className="hidden md:block" />
      )}
    </nav>
  )
}
