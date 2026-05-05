import Link from 'next/link'
import ConsentSettingsButton from '@/components/consent/ConsentSettingsButton'
import Logo from '@/components/ui/Logo'
import { SITE_SOCIALS } from '@/lib/site'

const categories = [
  { href: '/category/عمالي', label: 'قانون عمالي' },
  { href: '/category/جنائي', label: 'قانون جنائي' },
  { href: '/category/عقاري', label: 'قانون عقاري' },
  { href: '/category/تجاري', label: 'قانون تجاري' },
  { href: '/category/رقمي', label: 'قانون رقمي' },
  { href: '/category/مدني', label: 'قانون مدني' },
]

const siteLinks = [
  { href: '/blog', label: 'المدونة' },
  { href: '/calculator', label: 'الحاسبة القانونية' },
  { href: '/author', label: 'الكتّاب' },
  { href: '/about', label: 'من نحن' },
  { href: '/contact', label: 'تواصل معنا' },
  { href: '/privacy', label: 'سياسة الخصوصية' },
  { href: '/terms', label: 'الشروط والأحكام' },
]

export default function Footer() {
  return (
    <footer className="mt-20 text-stone-300" style={{ background: '#0A1628' }}>
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo invert />
            <p className="mt-5 max-w-xs text-sm leading-relaxed" style={{ color: '#9AA5BA' }}>
              مدونة قانونية متخصصة في الشأن السعودي. نقدم مقالات موثوقة وشاملة يكتبها محامون مرخصون
              من وزارة العدل.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <a
                href={SITE_SOCIALS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="twitter"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-stone-300 transition-colors"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="/feed.xml"
                aria-label="rss"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-stone-300 transition-colors"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="6" cy="18" r="2.5" />
                  <path d="M3 9.5a10.5 10.5 0 0 1 10.5 10.5h-3A7.5 7.5 0 0 0 3 12.5zM3 3a17 17 0 0 1 17 17h-3A14 14 0 0 0 3 6z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: '#E4CE9E' }}>
              التصنيفات
            </h3>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.href}>
                  <Link
                    href={category.href}
                    className="flex items-center gap-2 text-sm transition-colors hover:text-white"
                    style={{ color: '#B9C2D4' }}
                  >
                    <span style={{ color: '#E4CE9E' }}>›</span>
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: '#E4CE9E' }}>
              روابط
            </h3>
            <ul className="space-y-3">
              {siteLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm transition-colors hover:text-white"
                    style={{ color: '#B9C2D4' }}
                  >
                    <span style={{ color: '#E4CE9E' }}>›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <ConsentSettingsButton className="text-sm text-[#E4CE9E] hover:text-white" />
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: '#E4CE9E' }}>
              إخلاء المسؤولية
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#9AA5BA' }}>
              المعلومات الواردة في هذه المدونة لأغراض تثقيفية عامة فقط، ولا تُعدّ استشارة
              قانونية. يُنصح بالتواصل مع محامٍ مرخص للحصول على مشورة قانونية متخصصة.
            </p>
          </div>
        </div>

        <div
          className="mt-12 flex flex-wrap justify-between gap-3 pt-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <p className="m-0 text-xs" style={{ color: '#6F7A8E' }}>
            © {new Date().getFullYear()} نظرة قانونية. جميع الحقوق محفوظة.
          </p>
          <p className="m-0 text-xs" style={{ color: '#6F7A8E' }}>
            صُنع بعناية في المملكة العربية السعودية
          </p>
        </div>
      </div>
    </footer>
  )
}
