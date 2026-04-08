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
          <Link href="/" className="flex items-center gap-3 shrink-0">
            {/* Icon: Scales of Justice with Eye */}
            <svg width="52" height="52" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs>
                <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#12b8b0"/>
                  <stop offset="100%" stopColor="#0a3d5c"/>
                </linearGradient>
              </defs>
              {/* Outer eye shape */}
              <path d="M 6 55 Q 55 10 104 55 Q 55 100 6 55 Z" stroke="url(#lg)" strokeWidth="3" fill="none"/>
              {/* Scale beam */}
              <line x1="55" y1="32" x2="22" y2="42" stroke="url(#lg)" strokeWidth="3" strokeLinecap="round"/>
              <line x1="55" y1="32" x2="88" y2="42" stroke="url(#lg)" strokeWidth="3" strokeLinecap="round"/>
              {/* Vertical pole */}
              <line x1="55" y1="22" x2="55" y2="88" stroke="url(#lg)" strokeWidth="3.5" strokeLinecap="round"/>
              {/* Top knob */}
              <circle cx="55" cy="22" r="4" fill="url(#lg)"/>
              {/* Base */}
              <line x1="40" y1="88" x2="70" y2="88" stroke="#0a3d5c" strokeWidth="4.5" strokeLinecap="round"/>
              {/* Left arm + pan */}
              <line x1="22" y1="42" x2="22" y2="62" stroke="url(#lg)" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M 10 62 Q 22 73 34 62" stroke="url(#lg)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              {/* Right arm + pan */}
              <line x1="88" y1="42" x2="88" y2="62" stroke="url(#lg)" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M 76 62 Q 88 73 100 62" stroke="url(#lg)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              {/* Eye iris */}
              <circle cx="55" cy="55" r="17" stroke="url(#lg)" strokeWidth="3" fill="none"/>
              {/* Pupil */}
              <circle cx="55" cy="55" r="8" fill="url(#lg)"/>
              <circle cx="55" cy="55" r="4" fill="#0a3d5c"/>
              {/* Shine */}
              <circle cx="60" cy="50" r="2.5" fill="white" opacity="0.65"/>
            </svg>
            {/* Text */}
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-bold" style={{ color: '#0a3d5c' }}>نظرة</span>
              <span className="text-base font-medium" style={{ color: '#0ea5a0' }}>قانونية</span>
            </div>
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
