import type { Metadata } from 'next'
import Link from 'next/link'
import EditorialNote from '@/components/content/EditorialNote'
import { formatDate } from '@/lib/utils'
import { SITE_URL, STATIC_PAGE_LAST_MODIFIED, getAbsoluteUrl } from '@/lib/site'

const url = getAbsoluteUrl('/terms')
const title = 'الشروط والأحكام'
const description =
  'الشروط والأحكام الخاصة باستخدام موقع نظرة قانونية، بما في ذلك طبيعة المحتوى، ضوابط الاستخدام، الملكية الفكرية، والاعتماد على أدوات التحليل والإعلانات بعد الموافقة.'

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

export default function TermsPage() {
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="mb-6 flex items-center gap-2 text-sm text-stone-700" aria-label="مسار التنقل">
          <Link href="/" className="transition-colors hover:text-primary-600">الرئيسية</Link>
          <span>‹</span>
          <span className="text-stone-600">{title}</span>
        </nav>

        <h1 className="font-display text-3xl font-bold text-navy-800 mb-4">{title}</h1>
        <p className="mb-8 text-sm text-stone-600">
          آخر تحديث: {formatDate(STATIC_PAGE_LAST_MODIFIED.terms)}
        </p>

        <div className="space-y-6">
          <EditorialNote
            reviewedAt={STATIC_PAGE_LAST_MODIFIED.terms}
            note="تعكس هذه الصفحة آلية الاستخدام الفعلية للموقع بعد فصل التحليلات والإعلانات عن الزيارة الافتراضية، وعدم تحميلها إلا بعد الموافقة."
          />

          <div className="prose prose-lg max-w-none text-stone-800 leading-relaxed">
            <p>
              باستخدامك موقع <strong>نظرة قانونية</strong> فإنك تقر بفهمك لطبيعة المحتوى
              المنشور فيه وبضوابط الاستخدام الآتية.
            </p>

            <h2>1. طبيعة المحتوى</h2>
            <p>
              جميع المواد المنشورة في الموقع ذات طبيعة تثقيفية وتحريرية عامة، ولا تمثل
              استشارة قانونية شخصية أو علاقة تمثيل أو وكالة أو تكليف مهني.
            </p>

            <h2>2. حدود الاعتماد على المحتوى</h2>
            <p>
              يجب عدم الاعتماد على المقالات أو الحاسبات لاتخاذ قرار قانوني فردي دون مراجعة
              الوقائع والمستندات واللوائح الخاصة بحالتك. عند وجود نزاع أو التزام مالي أو
              إجراء رسمي، راجع مختصًا مرخصًا.
            </p>

            <h2>3. الملكية الفكرية</h2>
            <ul>
              <li>المحتوى النصي والتحريري والتصميمي للموقع محمي بحقوق الملكية الفكرية.</li>
              <li>يسمح بالاقتباس المحدود مع نسبة المصدر ووضع رابط واضح للمادة الأصلية.</li>
              <li>لا يسمح بإعادة النشر الكامل أو شبه الكامل للمحتوى دون إذن مسبق.</li>
              <li>لا يسمح باستخدام المحتوى لتدريب نماذج الذكاء الاصطناعي أو جمعه آليًا خلافًا للضوابط المعلنة.</li>
            </ul>

            <h2>4. الاستخدام المقبول</h2>
            <ul>
              <li>عدم محاولة اختراق الموقع أو العبث بخدماته أو بنيته الفنية.</li>
              <li>عدم استخدام أدوات جمع آلي مفرط أو تحميل يضر بأداء الموقع.</li>
              <li>احترام الأنظمة النافذة في المملكة العربية السعودية عند استخدام المحتوى أو إعادة الإشارة إليه.</li>
            </ul>

            <h2>5. الروابط والخدمات الخارجية</h2>
            <p>
              قد يتضمن الموقع روابط إلى مواقع أو منصات حكومية أو تنظيمية أو إلى خدمات أطراف
              ثالثة. ندرج هذه الروابط للتيسير على القارئ، ولا نتحمل مسؤولية سياسات تلك
              الجهات أو أي تغيير يطرأ على محتواها لاحقًا.
            </p>

            <h2>6. التحليلات</h2>
            <p>
              قد يستخدم الموقع أدوات تحليل مثل Google Analytics وPlausible، لكنها لا تُحمّل
              افتراضيًا قبل موافقة المستخدم. راجع{' '}
              <Link href="/privacy" className="text-primary-600 hover:underline">
                سياسة الخصوصية
              </Link>{' '}
              لمزيد من التفاصيل.
            </p>

            <h2>7. تعديل الشروط</h2>
            <p>
              يجوز تحديث هذه الشروط متى دعت الحاجة التشغيلية أو النظامية، ويُعتمد تاريخ آخر
              تحديث الظاهر في أعلى الصفحة.
            </p>

            <h2>8. التواصل</h2>
            <p>
              للاستفسارات المتعلقة بهذه الشروط، تفضل بزيارة{' '}
              <Link href="/contact" className="text-primary-600 hover:underline">
                صفحة التواصل
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
