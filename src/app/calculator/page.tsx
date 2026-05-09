import type { Metadata } from 'next'
import EndOfServiceCalculator from '@/components/calculator/EndOfServiceCalculator'
import EditorialNote from '@/components/content/EditorialNote'
import {
  EDITORIAL_REVIEW_DATE,
  LABOR_LEAVE_SOURCES,
  LABOR_RELATIONS_SOURCES,
  SITE_URL,
  getAbsoluteUrl,
} from '@/lib/site'

const url = getAbsoluteUrl('/calculator')
const title = 'حاسبة مكافآت ومستحقات نهاية الخدمة'
const description =
  'احسب مكافأة نهاية الخدمة ورصيد الإجازات والراتب المتبقي وفق الضوابط النظامية الأساسية في نظام العمل السعودي، مع إيضاح الفرضيات القانونية المستخدمة.'

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'مكافأة نهاية الخدمة',
    'حاسبة مكافأة',
    'نظام العمل السعودي',
    'رصيد الإجازات',
    'حقوق العامل',
    'الراتب المتبقي',
    'المادة 84',
    'المادة 109',
  ],
  alternates: {
    canonical: url,
  },
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    url,
    title,
    description,
  },
}

export default function CalculatorPage() {
  const sources = [...LABOR_RELATIONS_SOURCES, ...LABOR_LEAVE_SOURCES]
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: title,
    description,
    url,
    inLanguage: 'ar',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    isBasedOn: sources.map((source) => ({
      '@type': 'CreativeWork',
      name: source.title,
      url: source.url,
    })),
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

      <div className="bg-white border-b border-warm-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="mb-3 flex items-center gap-2 text-sm text-stone-500">
            <span>نظرة قانونية</span>
            <span>/</span>
            <span className="font-medium text-primary-600">الحاسبة</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-navy-800 mb-3">
            {title}
          </h1>
          <p className="max-w-2xl leading-relaxed text-stone-600">
            احسب مستحقاتك العمالية الأساسية وفق النصوص النظامية المعتمدة، مع توضيح الفرضيات
            التي تعتمدها كل أداة حساب داخل الصفحة.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <EditorialNote
          reviewedAt={EDITORIAL_REVIEW_DATE}
          sources={sources}
          note="تعتمد هذه الصفحة على المواد 84 و85 و87 الخاصة بمكافأة نهاية الخدمة، وعلى المواد 109 و111 الخاصة بالإجازة السنوية ورصيدها. لا تغطي الحاسبة الشروط التعاقدية الخاصة أو البدلات غير المعيارية إلا إذا نص النظام عليها صراحة."
        />
        <EndOfServiceCalculator />
      </div>
    </>
  )
}
