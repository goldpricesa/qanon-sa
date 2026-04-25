'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const navLinks = [
  { href: '/', label: 'المقالات' },
  { href: '/category/عمالي', label: 'عمالي' },
  { href: '/category/جنائي', label: 'جنائي' },
  { href: '/category/عقاري', label: 'عقاري' },
  { href: '/category/تجاري', label: 'تجاري' },
  { href: '/category/رقمي', label: 'رقمي' },
  { href: '/category/مدني', label: 'مدني' },
  { href: '/calculator', label: 'الحاسبة' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = searchQuery.trim()
    setSearchOpen(false)
    setMenuOpen(false)
    router.push(q ? `/?q=${encodeURIComponent(q)}` : '/')
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-warm-200 shadow-sm">
      {/* Gold accent bar */}
      <div aria-hidden="true" className="h-1 bg-gradient-to-l from-gold-400 via-gold-500 to-gold-400" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0" aria-label="الانتقال إلى الصفحة الرئيسية">
            <Image
              src="/logo.png.jpeg"
              alt="شعار نظرة قانونية"
              width={220}
              height={88}
              priority
              className="h-12 w-auto md:h-14"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-stone-700 hover:text-primary-700 hover:bg-primary-50 rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-1">
            {/* Search toggle (desktop) */}
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              className="hidden md:inline-flex p-2 rounded-md text-stone-700 hover:text-primary-700 hover:bg-primary-50 transition-colors"
              aria-label="بحث"
              aria-expanded={searchOpen}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md text-stone-700 hover:text-primary-700 hover:bg-primary-50"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="فتح القائمة"
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Inline desktop search */}
        {searchOpen && (
          <form onSubmit={submitSearch} className="hidden md:block py-3 border-t border-warm-100" role="search">
            <div className="relative">
              <input
                autoFocus
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن مادة قانونية، حق، أو إجراء..."
                className="w-full pr-4 pl-10 py-2.5 text-sm rounded-lg border border-warm-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 transition-colors"
                aria-label="بحث في المقالات"
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-700 hover:text-primary-600 transition-colors"
                aria-label="بحث"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>
        )}

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 pt-2 border-t border-warm-100">
            <form onSubmit={submitSearch} role="search" className="px-1 pb-3">
              <div className="relative">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث في المقالات..."
                  className="w-full pr-4 pl-10 py-2.5 text-sm rounded-lg border border-warm-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 transition-colors"
                  aria-label="بحث في المقالات"
                />
                <button
                  type="submit"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-700"
                  aria-label="بحث"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>
            <nav>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 text-sm font-medium text-stone-700 hover:text-primary-700 hover:bg-primary-50 rounded-md transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
