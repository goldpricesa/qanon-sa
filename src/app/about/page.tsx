import type { Metadata } from 'next'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import {
  SITE_LOGO_URL,
  SITE_NAME,
  SITE_URL,
  STATIC_PAGE_LAST_MODIFIED,
  getAbsoluteUrl,
} from '@/lib/site'

const url = getAbsoluteUrl('/about')
const title = 'من نحن'
const description =
  'نظرة قانونية منصة محتوى قانوني سعودي متخصصة، تشرح الأنظمة السعودية بلغة عملية مع إحالات واضحة إلى المصادر الرسمية في الموضوعات عالية الحساسية.'

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

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: title,
    description,
    url,
    inLanguage: 'ar-SA',
    mainEntity: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: SITE_LOGO_URL,
      description,
      areaServed: { '@type': 'Country', name: 'المملكة العربية السعودية' },
      knowsLanguage: ['ar'],
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
          آخر تحديث: {formatDate(STATIC_PAGE_LAST_MODIFIED.about)}
        </p>

        <div className="prose prose-lg max-w-none text-stone-800 leading-relaxed">
          <p>
            <strong>{SITE_NAME}</strong> منصة محتوى قانوني سعودي متخصصة تهدف إلى تبسيط
            الأنظمة واللوائح السعودية بلغة واضحة وعملية دون أن تدّعي تقديم استشارة قانونية
            شخصية لكل حالة.
          </p>

          <h2>ما الذي ننشره؟</h2>
          <p>
            ننشر مقالات وشروحات عملية عن نظام العمل، الأحوال الشخصية، العقود، العقارات،
            القانون التجاري، والجرائم المعلوماتية. تركيزنا الأساسي هو تمكين القارئ من فهم
            القاعدة النظامية ومسارها العملي، مع إظهار حدود ما يمكن استخلاصه من النص العام.
          </p>

          <h2>كيف نعدّ المحتوى؟</h2>
          <ol>
            <li>نبدأ من النصوص الرسمية والجهات الحكومية والمنصات التنظيمية المعتمدة.</li>
            <li>نعيد صياغة المادة القانونية بلغة عملية مع الاحتفاظ بالمعنى النظامي.</li>
            <li>نضيف بطاقات مراجعة وروابط مصدر في المواد الأعلى حساسية والحاسبة القانونية.</li>
            <li>نراجع المواد دوريًا عند وجود تحديثات تنظيمية أو ملاحظات تصحيح موثقة.</li>
          </ol>

          <h2>ما الذي لا يقدمه الموقع؟</h2>
          <p className="rounded-lg border border-primary-100 bg-primary-50 p-4">
            المحتوى المنشور للتوعية العامة فقط، ولا يُعد استشارة قانونية شخصية أو بديلاً عن
            التقييم المهني لملفك أو مستنداتك أو وقائعك الخاصة.
          </p>

          <h2>الثقة التحريرية</h2>
          <p>
            في المواد النظامية عالية الأثر نعرض تاريخ آخر مراجعة تحريرية وروابط إلى المصادر
            الرسمية المستخدمة في التحديث. كما نتيح استقبال طلبات التصحيح أو التحديث من خلال{' '}
            <Link href="/contact" className="text-primary-600 hover:underline">
              صفحة التواصل
            </Link>
            .
          </p>

          <h2>التواصل</h2>
          <p>
            لاستفسارات التحرير أو طلبات التصحيح أو اقتراح موضوعات جديدة، تفضل بزيارة{' '}
            <Link href="/contact" className="text-primary-600 hover:underline">
              صفحة التواصل
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  )
}
