'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import Logo from '@/components/ui/Logo'
import SearchBar from '@/components/ui/SearchBar'

const navLinks = [
  { href: '/', label: 'المقالات' },
  { href: '/category/عمالي', label: 'عمالي' },
  { href: '/category/جنائي', label: 'جنائي' },
  { href: '/category/عقاري', label: 'عقاري' },
  { href: '/category/تجاري', label: 'تجاري' },
  { href: '/category/مدني', label: 'مدني' },
  { href: '/calculator', label: 'الحاسبة' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-200"
      style={{
        background: scrolled ? 'rgba(250, 247, 241, 0.88)' : 'rgba(250, 247, 241, 0.6)',
        backdropFilter: 'saturate(150%) blur(12px)',
        WebkitBackdropFilter: 'saturate(150%) blur(12px)',
        borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-[72px] items-center justify-between gap-4">
          <Link href="/" className="flex items-center shrink-0" aria-label="الانتقال إلى الصفحة الرئيسية">
            <Logo />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-3 transition-colors hover:bg-primary-50 hover:text-primary-700"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <SearchBar
            className="hidden min-w-[220px] md:block"
            inputClassName="rounded-lg border border-line bg-paper-2 py-2 pe-3 ps-10 text-sm text-ink placeholder:text-stone-500 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-200/60"
            buttonClassName="text-stone-600 hover:text-primary-700"
          />

          <button
            className="rounded-md p-2 text-ink-3 hover:bg-primary-50 hover:text-primary-700 lg:hidden"
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

        {menuOpen && (
          <nav className="border-t border-line pb-4 pt-2 lg:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-md px-4 py-3 text-sm font-medium text-ink-3 transition-colors hover:bg-primary-50 hover:text-primary-700"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
