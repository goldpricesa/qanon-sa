'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import Logo from '@/components/ui/Logo'

const navLinks = [
  { href: '/', label: 'المقالات' },
  { href: '/category/عمالي', label: 'عمالي' },
  { href: '/category/جنائي', label: 'جنائي' },
  { href: '/category/عقاري', label: 'عقاري' },
  { href: '/category/تجاري', label: 'تجاري' },
  { href: '/category/مدني', label: 'مدني' },
  { href: '/category/أحوال-شخصية', label: 'أحوال شخصية' },
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
        <div className="flex items-center justify-between h-[72px] gap-4">
          <Link href="/" className="flex items-center shrink-0" aria-label="الانتقال إلى الصفحة الرئيسية">
            <Logo />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 text-sm font-medium text-ink-3 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2.5 bg-paper-2 border border-line rounded-lg px-3 py-1.5 min-w-[220px]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B6577" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="ابحث في المقالات…"
              className="bg-transparent border-0 outline-none w-full text-sm text-ink"
            />
          </div>

          <button
            className="lg:hidden p-2 rounded-md text-ink-3 hover:text-primary-700 hover:bg-primary-50"
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
          <nav className="lg:hidden pb-4 pt-2 border-t border-line">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-sm font-medium text-ink-3 hover:text-primary-700 hover:bg-primary-50 rounded-md transition-colors"
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
