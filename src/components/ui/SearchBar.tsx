'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function SearchBarInner() {
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
    <form onSubmit={handleSubmit} className="relative" role="search">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="ابحث في المقالات..."
        className="w-full pr-4 pl-10 py-2.5 text-sm rounded-lg border border-warm-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 transition-colors"
        aria-label="بحث في المقالات"
      />
      <button
        type="submit"
        className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-700 hover:text-primary-500 transition-colors"
        aria-label="بحث"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </form>
  )
}

export default function SearchBar() {
  return (
    <Suspense fallback={
      <div className="relative">
        <input
          type="search"
          placeholder="ابحث في المقالات..."
          className="w-full pr-4 pl-10 py-2.5 text-sm rounded-lg border border-warm-200 bg-white"
          disabled
        />
      </div>
    }>
      <SearchBarInner />
    </Suspense>
  )
}
