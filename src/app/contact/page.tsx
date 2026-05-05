import type { Metadata } from 'next'
import Link from 'next/link'

const url = 'https://qanon-sa.com/contact'
const title = 'تواصل معنا'
const description =
  'تواصل مع فريق نظرة قانونية — ملاحظات حول المحتوى، تصحيح معلومة، اقتراح موضوع، أو الاستفسارات التحريرية.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    type: 'website',
    url,
    title,
    description,
    locale: 'ar_SA',
  },
}

export default function ContactPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: title,
    description,
    url,
    inLanguage: 'ar-SA',
    mainEntity: {
      '@type': 'Organization',
      name: 'نظرة قانونية',
      url: 'https://qanon-sa.com',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'contact@qanon-sa.com',
        availableLanguage: ['Arabic'],
        areaServed: 'SA',
      },
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: 'https://qanon-sa.com' },
      { '@type': 'ListItem', position: 2, name: 'تواصل معنا', item: url },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="flex items-center gap-2 text-sm text-stone-700 mb-6" aria-label="مسار التنقل">
          <Link href="/" className="hover:text-primary-600 transition-colors">الرئيسية</Link>
          <span>‹</span>
          <span className="text-stone-600">تواصل معنا</span>
        </nav>

        <h1 className="font-display text-3xl font-bold text-navy-800 mb-4">تواصل معنا</h1>
        <p className="text-stone-700 mb-10 leading-relaxed">
          يسعدنا تلقّي ملاحظاتكم واقتراحاتكم حول المحتوى أو تصحيح معلومة أو اقتراح موضوع جديد.
          نقرأ كل رسالة ونردّ خلال ٣–٥ أيام عمل.
        </p>

        <div className="space-y-6">
          <div className="bg-white border border-warm-200 rounded-xl p-6">
            <h2 className="text-lg font-bold text-navy-800 mb-3">البريد الإلكتروني</h2>
            <p className="text-stone-700">
              <a
                href="mailto:contact@qanon-sa.com"
                className="text-primary-600 hover:underline font-medium"
              >
                contact@qanon-sa.com
              </a>
            </p>
            <p className="text-sm text-stone-600 mt-3">
              للاستفسارات التحريرية، تصحيح المعلومات، اقتراح موضوعات، أو ملاحظات حول المحتوى.
            </p>
          </div>

          <div className="bg-primary-50 border border-primary-100 rounded-xl p-6">
            <h2 className="text-lg font-bold text-navy-800 mb-3">تنبيه مهم</h2>
            <p className="text-stone-700 text-sm leading-relaxed">
              الموقع <strong>لا يقدّم استشارات قانونية شخصية</strong>. لأي قضية، نزاع، أو إجراء قانوني،
              ننصحكم بشدة بالتواصل مع محامٍ مرخّص من وزارة العدل في المملكة العربية السعودية عبر
              {' '}
              <a
                href="https://www.moj.gov.sa/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                بوابة وزارة العدل
              </a>
              .
            </p>
          </div>

          <div className="bg-white border border-warm-200 rounded-xl p-6">
            <h2 className="text-lg font-bold text-navy-800 mb-3">مدة الاستجابة</h2>
            <p className="text-stone-700 text-sm leading-relaxed">
              نسعى للرد على جميع الرسائل خلال ٣–٥ أيام عمل (من الأحد إلى الخميس، عدا الإجازات الرسمية
              في المملكة العربية السعودية).
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
