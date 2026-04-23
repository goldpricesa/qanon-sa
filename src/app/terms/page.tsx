import type { Metadata } from 'next'
import Link from 'next/link'

const url = 'https://qanon-sa.com/terms'
const title = 'الشروط والأحكام'
const description =
  'الشروط والأحكام الخاصة باستخدام موقع نظرة قانونية — حقوق الملكية الفكرية، إخلاء المسؤولية القانونية، وضوابط الاستخدام.'

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
      { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: 'https://qanon-sa.com' },
      { '@type': 'ListItem', position: 2, name: 'الشروط والأحكام', item: url },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="flex items-center gap-2 text-sm text-stone-700 mb-6" aria-label="مسار التنقل">
          <Link href="/" className="hover:text-primary-600 transition-colors">الرئيسية</Link>
          <span>‹</span>
          <span className="text-stone-600">الشروط والأحكام</span>
        </nav>

        <h1 className="font-display text-3xl font-bold text-navy-800 mb-4">الشروط والأحكام</h1>
        <p className="text-sm text-stone-600 mb-8">آخر تحديث: 17 أبريل 2026</p>

        <div className="prose prose-lg max-w-none text-stone-800 leading-relaxed">
          <p>
            باستخدامكم موقع <strong>نظرة قانونية</strong> فإنكم توافقون على الشروط والأحكام المبيّنة أدناه.
            إذا كنتم لا توافقون على أيٍّ منها، يرجى عدم استخدام الموقع.
          </p>

          <h2>١. طبيعة المحتوى — إخلاء مسؤولية</h2>
          <p>
            <strong>جميع المحتويات المنشورة على الموقع لأغراض التوعية العامة فقط، ولا تُعدّ استشارة
            قانونية شخصية.</strong> كل حالة قانونية لها ظروفها وملابساتها، وقد تختلف النتيجة تبعاً لتفاصيل
            دقيقة لا يمكن تغطيتها في مقال عام. عند وجود نزاع أو إجراء رسمي، يجب استشارة محامٍ مرخّص من
            وزارة العدل في المملكة العربية السعودية.
          </p>
          <p>
            لا يتحمّل الموقع ولا القائمون عليه أي مسؤولية قانونية عن قرارات أو تصرفات تُتَّخذ بناءً على
            المحتوى المنشور.
          </p>

          <h2>٢. الملكية الفكرية</h2>
          <p>
            جميع المقالات، النصوص، الصور، والتصاميم المنشورة على الموقع مملوكة لـ "نظرة قانونية"
            ومحمية بموجب أنظمة حقوق المؤلف في المملكة العربية السعودية والاتفاقيات الدولية ذات الصلة.
          </p>
          <p>يُسمح بما يلي:</p>
          <ul>
            <li>القراءة والمشاركة عبر روابط مباشرة إلى الموقع.</li>
            <li>الاقتباس المحدود (فقرة قصيرة) مع الإشارة إلى المصدر ورابط المقال الأصلي.</li>
          </ul>
          <p>لا يُسمح بما يلي دون إذن كتابي مسبق:</p>
          <ul>
            <li>إعادة النشر الكامل أو شبه الكامل لأي مقال.</li>
            <li>الاستخدام التجاري للمحتوى.</li>
            <li>تدريب نماذج الذكاء الاصطناعي على محتوى الموقع.</li>
          </ul>

          <h2>٣. الاستخدام المسموح</h2>
          <p>بتصفّحكم الموقع، توافقون على:</p>
          <ul>
            <li>عدم محاولة اختراق الموقع أو الإضرار بخدماته.</li>
            <li>عدم استخدام برامج كشط آلية (scraping) أو حمل زائد على الخوادم.</li>
            <li>احترام قوانين المملكة العربية السعودية في التعامل مع المحتوى.</li>
          </ul>

          <h2>٤. الروابط والمحتوى الخارجي</h2>
          <p>
            قد يحتوي الموقع على روابط أو مراجع لمواقع خارجية (مثل منصات حكومية أو أنظمة رسمية).
            توفَّر هذه الروابط لراحة القارئ، ولا يتحمّل الموقع مسؤولية محتواها أو سياسات خصوصيتها.
          </p>

          <h2>٥. الإعلانات</h2>
          <p>
            يعرض الموقع إعلانات Google AdSense لتمويل المحتوى. الإعلانات مستقلة عن محتوى الموقع،
            ولا نتحمّل مسؤولية منتجات أو خدمات المعلنين. للمزيد راجع <Link href="/privacy" className="text-primary-600 hover:underline">سياسة الخصوصية</Link>.
          </p>

          <h2>٦. تعديل الشروط</h2>
          <p>
            نحتفظ بحق تعديل هذه الشروط في أي وقت. استمرار استخدامكم للموقع بعد نشر التعديلات
            يُعدّ موافقة ضمنية على الشروط الجديدة.
          </p>

          <h2>٧. القانون الحاكم</h2>
          <p>
            تخضع هذه الشروط وتُفسَّر وفقاً لأنظمة المملكة العربية السعودية، وتختص المحاكم السعودية
            بالنظر في أي نزاع ينشأ عنها.
          </p>

          <h2>٨. تواصل معنا</h2>
          <p>
            للاستفسار حول هذه الشروط يُرجى زيارة <Link href="/contact" className="text-primary-600 hover:underline">صفحة التواصل</Link>.
          </p>
        </div>
      </div>
    </>
  )
}
