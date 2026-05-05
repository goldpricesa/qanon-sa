'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'

interface SearchBarProps {
  className?: string
  inputClassName?: string
  buttonClassName?: string
  placeholder?: string
}

function SearchBarInner({
  className,
  inputClassName,
  buttonClassName,
  placeholder = 'ابحث في المقالات...',
}: SearchBarProps) {
  const [query, setQuery] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    setQuery(searchParams.get('q') ?? '')
  }, [searchParams])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const nextQuery = query.trim()
    router.push(nextQuery ? `/?q=${encodeURIComponent(nextQuery)}` : '/')
  }

  return (
    <form onSubmit={handleSubmit} className={cn('relative', className)} role="search">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full rounded-lg border border-warm-200 bg-white py-2.5 pr-4 pl-10 text-sm transition-colors focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-300',
          inputClassName
        )}
        aria-label="بحث في المقالات"
      />
      <button
        type="submit"
        className={cn(
          'absolute left-3 top-1/2 -translate-y-1/2 text-stone-700 transition-colors hover:text-primary-500',
          buttonClassName
        )}
        aria-label="بحث"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </form>
  )
}

export default function SearchBar(props: SearchBarProps) {
  return (
    <Suspense
      fallback={
        <div className={cn('relative', props.className)}>
          <input
            type="search"
            placeholder={props.placeholder ?? 'ابحث في المقالات...'}
            className={cn(
              'w-full rounded-lg border border-warm-200 bg-white py-2.5 pr-4 pl-10 text-sm',
              props.inputClassName
            )}
            disabled
          />
        </div>
      }
    >
      <SearchBarInner {...props} />
    </Suspense>
  )
}
