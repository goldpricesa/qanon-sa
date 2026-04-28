import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import type { Category } from '@/types'

const siteLinks = [
  { href: '/blog', label: 'المدونة' },
  { href: '/calculator', label: 'الحاسبة القانونية' },
  { href: '/about', label: 'من نحن' },
  { href: '/contact', label: 'تواصل معنا' },
  { href: '/privacy', label: 'سياسة الخصوصية' },
  { href: '/terms', label: 'الشروط والأحكام' },
]

interface FooterProps {
  categories: Category[]
}

export default function Footer({ categories }: FooterProps) {
  return (
    <footer className="mt-20 text-stone-300" style={{ background: '#0A1628' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-12">
          <div>
            <Logo invert />
            <p className="text-sm leading-relaxed mt-5 max-w-xs" style={{ color: '#B9C2D4' }}>
              مدونة قانونية متخصصة في الشأن السعودي. نقدم مقالات موثوقة وشاملة يكتبها محامون مرخصون من وزارة العدل.
            </p>
            <div className="flex items-center gap-2 mt-6">
              {[
                { name: 'twitter', href: 'https://twitter.com/qanon_sa' },
                { name: 'linkedin', href: 'https://linkedin.com' },
                { name: 'rss', href: '/feed.xml' },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target={s.name === 'rss' ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-stone-300 transition-colors"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  {s.name === 'twitter' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  )}
                  {s.name === 'linkedin' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                    </svg>
                  )}
                  {s.name === 'rss' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="6" cy="18" r="2.5" />
                      <path d="M3 9.5a10.5 10.5 0 0 1 10.5 10.5h-3A7.5 7.5 0 0 0 3 12.5zM3 3a17 17 0 0 1 17 17h-3A14 14 0 0 0 3 6z" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-xs uppercase tracking-[0.18em]" style={{ color: '#E4CE9E' }}>
              التصنيفات
            </h3>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/category/${cat.slug}`} className="text-sm flex items-center gap-2 hover:text-white transition-colors" style={{ color: '#B9C2D4' }}>
                    <span style={{ color: '#E4CE9E' }}>›</span>
                    قانون {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-xs uppercase tracking-[0.18em]" style={{ color: '#E4CE9E' }}>
              روابط
            </h3>
            <ul className="space-y-3">
              {siteLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm flex items-center gap-2 hover:text-white transition-colors" style={{ color: '#B9C2D4' }}>
                    <span style={{ color: '#E4CE9E' }}>›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-xs uppercase tracking-[0.18em]" style={{ color: '#E4CE9E' }}>
              إخلاء المسؤولية
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#B9C2D4' }}>
              المعلومات الواردة في هذه المدونة لأغراض تثقيفية عامة فقط، ولا تُعدّ استشارة قانونية. يُنصح بالتواصل مع محامٍ مرخص للحصول على مشورة قانونية متخصصة.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 flex flex-wrap justify-between gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-xs m-0" style={{ color: '#A0AABE' }}>
            © {new Date().getFullYear()} نظرة قانونية. جميع الحقوق محفوظة.
          </p>
          <p className="text-xs m-0" style={{ color: '#A0AABE' }}>
            صُنع بعناية في المملكة العربية السعودية
          </p>
        </div>
      </div>
    </footer>
  )
}
