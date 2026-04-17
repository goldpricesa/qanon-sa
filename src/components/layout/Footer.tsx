import Image from 'next/image'
import Link from 'next/link'

const categories = [
  { href: '/category/emali', label: 'قانون عمالي' },
  { href: '/category/aqari', label: 'قانون عقاري' },
  { href: '/category/tijari', label: 'قانون تجاري' },
  { href: '/category/raqami', label: 'قانون رقمي' },
  { href: '/category/madani', label: 'قانون مدني' },
]

const siteLinks = [
  { href: '/blog', label: 'المدونة' },
  { href: '/calculator', label: 'الحاسبة القانونية' },
  { href: '/about', label: 'من نحن' },
  { href: '/contact', label: 'تواصل معنا' },
  { href: '/privacy', label: 'سياسة الخصوصية' },
  { href: '/terms', label: 'الشروط والأحكام' },
]

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center mb-4" aria-label="العودة إلى الرئيسية">
              <Image
                src="/logo.png.jpeg"
                alt="شعار نظرة قانونية"
                width={180}
                height={72}
                loading="lazy"
                className="h-12 w-auto rounded-md bg-white/95 p-1"
              />
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              مدونة قانونية متخصصة في الشأن السعودي. نقدم مقالات موثوقة وشاملة في نظام العمل، العقارات، الشركات، والقانون الرقمي.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://twitter.com/qanon_sa"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-navy-800 hover:bg-primary-600 transition-colors"
                aria-label="تويتر"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-navy-800 hover:bg-primary-600 transition-colors"
                aria-label="لينكدإن"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">التصنيفات</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    className="text-sm text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-2"
                  >
                    <span className="text-primary-500">‹</span>
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Site Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">روابط</h3>
            <ul className="space-y-2">
              {siteLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-2"
                  >
                    <span className="text-primary-500">‹</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">إخلاء المسؤولية</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              المعلومات الواردة في هذه المدونة لأغراض تثقيفية عامة فقط، ولا تُعدّ استشارة قانونية. يُنصح بالتواصل مع محامٍ مرخص للحصول على مشورة قانونية متخصصة.
            </p>
            <p className="text-xs text-gray-500 mt-4">
              © {new Date().getFullYear()} نظرة قانونية. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
