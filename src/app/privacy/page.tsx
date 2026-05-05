import type { Metadata } from 'next'
import Link from 'next/link'

const url = 'https://qanon-sa.com/privacy'
const title = 'سياسة الخصوصية'
const description =
  'سياسة خصوصية موقع نظرة قانونية — كيف نجمع ونستخدم البيانات، وعلاقتنا بخدمات الطرف الثالث مثل Google Analytics و Google AdSense.'

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

export default function PrivacyPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: 'https://qanon-sa.com' },
      { '@type': 'ListItem', position: 2, name: 'سياسة الخصوصية', item: url },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="flex items-center gap-2 text-sm text-stone-700 mb-6" aria-label="مسار التنقل">
          <Link href="/" className="hover:text-primary-600 transition-colors">الرئيسية</Link>
          <span>‹</span>
          <span className="text-stone-600">سياسة الخصوصية</span>
        </nav>

        <h1 className="font-display text-3xl font-bold text-navy-800 mb-4">سياسة الخصوصية</h1>
        <p className="text-sm text-stone-600 mb-8">آخر تحديث: 17 أبريل 2026</p>

        <div className="prose prose-lg max-w-none text-stone-800 leading-relaxed">
          <p>
            نحترم في <strong>نظرة قانونية</strong> خصوصية زوّارنا ونلتزم بحماية أي بيانات قد تُجمع عند
            استخدامكم للموقع. توضّح هذه السياسة نوع البيانات التي نجمعها، كيفية استخدامها، والخيارات
            المتاحة لكم للتحكم فيها.
          </p>

          <h2>١. البيانات التي نجمعها</h2>
          <p>
            الموقع مدوّنة محتوى قانوني ولا يتطلب تسجيلاً أو إنشاء حسابات. البيانات التي قد تُجمع تلقائياً
            عند زيارتكم هي بيانات إحصائية تقنية فقط، مثل:
          </p>
          <ul>
            <li>عنوان IP (بشكل مجهول الهوية).</li>
            <li>نوع المتصفح ونظام التشغيل.</li>
            <li>الصفحات التي تمت زيارتها ووقت البقاء عليها.</li>
            <li>الموقع الجغرافي التقريبي (على مستوى الدولة/المدينة).</li>
          </ul>

          <h2>٢. خدمات الطرف الثالث</h2>

          <h3>Google Analytics</h3>
          <p>
            نستخدم Google Analytics 4 لفهم سلوك الزوار وتحسين المحتوى. يتم تجميع البيانات بشكل
            مجهول الهوية (anonymized). يمكنكم الاطلاع على
            {' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">سياسة خصوصية Google</a>
            {' '}
            أو تفعيل
            {' '}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">إضافة إلغاء التتبع الخاصة بـ Google</a>.
          </p>

          <h3>Google AdSense</h3>
          <p>
            يستخدم الموقع إعلانات Google AdSense لتمويل المحتوى. قد تستخدم Google وشركاؤها ملفات
            تعريف الارتباط (Cookies) لعرض إعلانات مخصصة بناءً على زياراتكم السابقة لهذا الموقع
            ومواقع أخرى. لمزيد من المعلومات وللتحكم في الإعلانات المخصصة، يمكنكم زيارة
            {' '}
            <a href="https://www.google.com/policies/technologies/ads/" target="_blank" rel="noopener noreferrer">سياسة إعلانات Google</a>
            {' '}
            أو
            {' '}
            <a href="https://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer">aboutads.info</a>
            {' '}
            لإلغاء التفعيل.
          </p>

          <h2>٣. ملفات تعريف الارتباط (Cookies)</h2>
          <p>
            نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفح وقياس الأداء ولعرض إعلانات ذات صلة.
            يمكنكم في أي وقت إدارة أو حذف هذه الملفات من إعدادات متصفحكم. تعطيلها قد يؤثر على بعض
            وظائف الموقع.
          </p>

          <h2>٤. حماية البيانات</h2>
          <p>
            لا نبيع ولا نشارك ولا نؤجّر بياناتكم لأي طرف ثالث لأغراض تسويقية. كل البيانات المُجمَّعة
            تُستخدم حصرياً لتحسين تجربة الزوار داخل الموقع.
          </p>

          <h2>٥. الروابط الخارجية</h2>
          <p>
            قد يحتوي الموقع على روابط لمواقع خارجية. نحن غير مسؤولين عن ممارسات الخصوصية في تلك
            المواقع ونوصي بمراجعة سياساتها قبل تقديم أي بيانات.
          </p>

          <h2>٦. حقوقكم</h2>
          <p>
            وفقاً لنظام حماية البيانات الشخصية في المملكة العربية السعودية، يحق لكم معرفة ما يُجمع
            من بياناتكم، طلب تصحيحها أو حذفها، ورفض استخدامها لأغراض تسويقية.
          </p>

          <h2>٧. تعديلات السياسة</h2>
          <p>
            نحتفظ بحق تحديث هذه السياسة في أي وقت. سيظهر تاريخ آخر تحديث أعلى الصفحة. استمرار
            استخدامكم للموقع بعد التحديث يُعدّ موافقة على السياسة المعدّلة.
          </p>

          <h2>٨. تواصل معنا</h2>
          <p>
            لأي استفسار حول الخصوصية، يرجى زيارة <Link href="/contact" className="text-primary-600 hover:underline">صفحة التواصل</Link>.
          </p>
        </div>
      </div>
    </>
  )
}
