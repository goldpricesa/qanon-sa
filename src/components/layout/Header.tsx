'use client'

import Link from 'next/link'
import { useState } from 'react'

const navLinks = [
  { href: '/', label: 'المقالات' },
  { href: '/category/emali', label: 'عمالي' },
  { href: '/category/aqari', label: 'عقاري' },
  { href: '/category/tijari', label: 'تجاري' },
  { href: '/category/raqami', label: 'رقمي' },
  { href: '/category/madani', label: 'مدني' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-warm-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <svg
              className="w-8 h-8 text-primary-500"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M16 3L4 9v2h2l4 10H8l-2 4h20l-2-4h-2L26 11h2V9L16 3z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <line x1="16" y1="3" x2="16" y2="28" stroke="currentColor" strokeWidth="1.5" />
              <line x1="10" y1="28" x2="22" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <circle cx="10" cy="17" r="3" fill="currentColor" opacity="0.3" />
              <circle cx="22" cy="17" r="3" fill="currentColor" opacity="0.3" />
            </svg>
            <span className="text-xl font-bold text-navy-800">
              قا<span className="text-primary-500">نون</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-stone-600 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-stone-600 hover:text-primary-600 hover:bg-primary-50"
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

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="md:hidden pb-4 pt-2 border-t border-warm-100">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-sm font-medium text-stone-700 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors"
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
