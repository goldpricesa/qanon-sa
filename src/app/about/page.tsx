import type { Metadata } from 'next'
import Link from 'next/link'

const url = 'https://qanon-sa.com/about'
const title = 'من نحن'
const description =
  'نظرة قانونية — منصة محتوى قانوني سعودي متخصص. نبسّط الأنظمة واللوائح السعودية ونقدّم شروحات موثوقة يكتبها ويراجعها مختصون في القانون.'

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
      name: 'نظرة قانونية',
      url: 'https://qanon-sa.com',
      logo: 'https://qanon-sa.com/logo.png',
      description,
      areaServed: { '@type': 'Country', name: 'المملكة العربية السعودية' },
      knowsLanguage: ['ar'],
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: 'https://qanon-sa.com' },
      { '@type': 'ListItem', position: 2, name: 'من نحن', item: url },
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
          <span className="text-stone-600">من نحن</span>
        </nav>

        <h1 className="font-display text-3xl font-bold text-navy-800 mb-6">من نحن</h1>

        <div className="prose prose-lg max-w-none text-stone-800 leading-relaxed">
          <p>
            <strong>نظرة قانونية</strong> منصة محتوى قانوني سعودي متخصص، تهدف إلى تبسيط الأنظمة واللوائح
            المعمول بها في المملكة العربية السعودية، وتقديم شروحات دقيقة وموثوقة تساعد الأفراد والشركات
            على فهم حقوقهم والتزاماتهم القانونية.
          </p>

          <h2>رسالتنا</h2>
          <p>
            نؤمن أن الوعي القانوني حق لكل فرد. نسعى إلى ردم الفجوة بين النصوص النظامية المعقدة والمستخدم
            العادي، عبر تقديم مقالات واضحة تستند إلى الأنظمة الرسمية الصادرة من الجهات المختصة في المملكة،
            كوزارة العدل، وزارة الموارد البشرية، هيئة السوق المالية، وهيئة العقار.
          </p>

          <h2>مجالات تغطيتنا</h2>
          <ul>
            <li><strong>القانون العمالي</strong> — نظام العمل، نهاية الخدمة، الفصل التعسفي.</li>
            <li><strong>الأحوال الشخصية</strong> — الزواج، الطلاق، الحضانة، التركات.</li>
            <li><strong>العقارات والإيجار</strong> — منصة إيجار، عقود البيع، التوثيق.</li>
            <li><strong>القانون التجاري</strong> — تأسيس الشركات، العقود التجارية، المنازعات.</li>
            <li><strong>القانون الرقمي</strong> — الجرائم المعلوماتية، حماية البيانات، التجارة الإلكترونية.</li>
            <li><strong>القانون المدني والجنائي</strong> — العقود المدنية، التعويضات، الجرائم.</li>
          </ul>

          <h2>منهجيتنا في إعداد المحتوى</h2>
          <ol>
            <li>البحث في مصادر أولية: الأنظمة الرسمية، اللوائح التنفيذية، قرارات المحاكم.</li>
            <li>الصياغة بلغة مبسّطة مع الحفاظ على الدقة القانونية.</li>
            <li>المراجعة من مختصين قبل النشر.</li>
            <li>التحديث الدوري عند صدور أي تعديل نظامي.</li>
          </ol>

          <h2>تنبيه مهم</h2>
          <p className="bg-primary-50 border border-primary-100 p-4 rounded-lg">
            محتوى الموقع للتوعية العامة فقط، ولا يُعدّ استشارة قانونية شخصية. قد تختلف النتيجة القانونية
            بحسب تفاصيل كل حالة. عند وجود نزاع، التزام مالي، أو إجراء رسمي، ننصح بشدة باستشارة
            محامٍ مرخّص من وزارة العدل قبل اتخاذ أي قرار.
          </p>

          <h2>تواصل معنا</h2>
          <p>
            نرحّب بملاحظاتكم واقتراحاتكم عبر <Link href="/contact" className="text-primary-600 hover:underline">صفحة التواصل</Link>.
          </p>
        </div>
      </div>
    </>
  )
}
