import type { Metadata } from 'next'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import {
  SITE_NAME,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
  SITE_URL,
  SITE_WHATSAPP_URL,
  STATIC_PAGE_LAST_MODIFIED,
  getAbsoluteUrl,
} from '@/lib/site'

const url = getAbsoluteUrl('/contact')
const title = 'تواصل معنا'
const description =
  'تواصل مع فريق نظرة قانونية عبر الجوال أو واتساب لطلبات التصحيح التحريري، الملاحظات على المحتوى، واقتراح الموضوعات أو طلبات الخصوصية.'

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
      name: SITE_NAME,
      url: SITE_URL,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        telephone: SITE_PHONE_DISPLAY,
        availableLanguage: ['Arabic'],
        areaServed: 'SA',
      },
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: title, item: url },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="mb-6 flex items-center gap-2 text-sm text-stone-700" aria-label="مسار التنقل">
          <Link href="/" className="transition-colors hover:text-primary-600">الرئيسية</Link>
          <span>‹</span>
          <span className="text-stone-600">{title}</span>
        </nav>

        <h1 className="font-display text-3xl font-bold text-navy-800 mb-4">{title}</h1>
        <p className="mb-8 text-sm text-stone-600">
          آخر تحديث: {formatDate(STATIC_PAGE_LAST_MODIFIED.contact)}
        </p>

        <div className="space-y-6">
          <section className="rounded-xl border border-warm-200 bg-white p-6">
            <h2 className="text-lg font-bold text-navy-800 mb-3">رقم الجوال وواتساب</h2>
            <p className="text-stone-700">
              <a href={`tel:${SITE_PHONE_TEL}`} className="font-medium text-primary-600 hover:underline">
                {SITE_PHONE_DISPLAY}
              </a>
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={SITE_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
              >
                تواصل واتساب
              </a>
              <a
                href={`tel:${SITE_PHONE_TEL}`}
                className="rounded-lg border border-primary-200 bg-white px-4 py-2 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-50"
              >
                اتصال مباشر
              </a>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-stone-600">
              نستخدم هذا الرقم للملاحظات التحريرية، طلبات التصحيح، الاقتراحات، وطلبات
              الخصوصية المتعلقة بالموقع.
            </p>
          </section>

          <section className="rounded-xl border border-warm-200 bg-white p-6">
            <h2 className="text-lg font-bold text-navy-800 mb-3">طلبات الخصوصية والبيانات الشخصية</h2>
            <p className="text-sm leading-relaxed text-stone-700">
              إذا كان طلبك متعلقًا بالخصوصية أو البيانات الشخصية، أرسل رسالة واتساب إلى{' '}
              <a
                href={SITE_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary-600 hover:underline"
              >
                {SITE_PHONE_DISPLAY}
              </a>{' '}
              مع بداية واضحة مثل: <strong>طلب خصوصية</strong> أو <strong>طلب حذف بيانات</strong>.
            </p>
          </section>

          <section className="rounded-xl border border-warm-200 bg-white p-6">
            <h2 className="text-lg font-bold text-navy-800 mb-3">متى نرد؟</h2>
            <p className="text-sm leading-relaxed text-stone-700">
              نسعى للرد على الرسائل التحريرية وطلبات الخصوصية خلال 3-5 أيام عمل بحسب طبيعة
              الطلب واكتمال المعلومات اللازمة لمعالجته.
            </p>
          </section>

          <section className="rounded-xl border border-primary-100 bg-primary-50 p-6">
            <h2 className="text-lg font-bold text-navy-800 mb-3">تنبيه مهم</h2>
            <p className="text-sm leading-relaxed text-stone-700">
              الموقع لا يقدم استشارات قانونية شخصية ولا يستقبل عبر قنوات التواصل ملخصات قضايا بهدف
              إصدار رأي قانوني فردي. إذا كانت لديك قضية أو إجراء رسمي، راجع محاميًا مرخصًا
              عبر{' '}
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
          </section>
        </div>
      </div>
    </>
  )
}
