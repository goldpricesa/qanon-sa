import type { Metadata } from 'next'
import EndOfServiceCalculator from '@/components/calculator/EndOfServiceCalculator'

export const metadata: Metadata = {
  title: 'حاسبة مكافآت ومستحقات نهاية الخدمة',
  description:
    'احسب مكافأة نهاية الخدمة ورصيد الإجازات والرواتب المتبقية وبدل تذاكر السفر وفق نظام العمل السعودي — المادة 84 و85 و87.',
  keywords: [
    'مكافأة نهاية الخدمة',
    'حاسبة مكافأة',
    'نظام العمل السعودي',
    'رصيد الإجازات',
    'حقوق العامل',
    'تذاكر السفر',
    'الراتب المتبقي',
    'المادة 84',
  ],
  alternates: {
    canonical: 'https://qanon-sa.com/calculator',
  },
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    url: 'https://qanon-sa.com/calculator',
    title: 'حاسبة مكافآت ومستحقات نهاية الخدمة',
    description:
      'احسب مكافأة نهاية الخدمة ورصيد الإجازات والرواتب المتبقية وبدل تذاكر السفر وفق نظام العمل السعودي.',
  },
}

export default function CalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'حاسبة مكافآت ومستحقات نهاية الخدمة',
    description:
      'احسب مكافأة نهاية الخدمة ورصيد الإجازات والرواتب المتبقية وبدل تذاكر السفر وفق نظام العمل السعودي',
    url: 'https://qanon-sa.com/calculator',
    inLanguage: 'ar',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Page header */}
      <div className="bg-white border-b border-warm-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-2 text-sm text-stone-500 mb-3">
            <span>نظرة قانونية</span>
            <span>/</span>
            <span className="text-primary-600 font-medium">الحاسبة</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-navy-800 mb-3">
            حاسبة مكافآت ومستحقات نهاية الخدمة
          </h1>
          <p className="text-stone-600 leading-relaxed max-w-2xl">
            احسب مستحقاتك العمالية بدقة وفق نظام العمل السعودي — مكافأة نهاية الخدمة، رصيد الإجازات، الراتب المتبقي، وبدل تذاكر السفر.
          </p>
        </div>
      </div>

      {/* Calculator */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <EndOfServiceCalculator />
      </div>
    </>
  )
}
