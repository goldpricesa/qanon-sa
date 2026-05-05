import type { Metadata } from 'next'
import Link from 'next/link'
import ConsentSettingsButton from '@/components/consent/ConsentSettingsButton'
import EditorialNote from '@/components/content/EditorialNote'
import { formatDate } from '@/lib/utils'
import {
  PDPL_SOURCES,
  SITE_PHONE_DISPLAY,
  SITE_WHATSAPP_URL,
  SITE_URL,
  STATIC_PAGE_LAST_MODIFIED,
  getAbsoluteUrl,
} from '@/lib/site'

const url = getAbsoluteUrl('/privacy')
const title = 'سياسة الخصوصية'
const description =
  'سياسة خصوصية موقع نظرة قانونية، وتشمل ملفات الارتباط، أدوات التحليل، الإعلانات، وحقوق صاحب البيانات وفق نظام حماية البيانات الشخصية.'

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
          آخر تحديث: {formatDate(STATIC_PAGE_LAST_MODIFIED.privacy)}
        </p>

        <div className="space-y-6">
          <EditorialNote
            reviewedAt={STATIC_PAGE_LAST_MODIFIED.privacy}
            sources={PDPL_SOURCES}
            note="تعكس هذه الصفحة السلوك الفعلي للموقع بعد تفعيل طبقة الموافقة المسبقة: لا يتم تحميل أدوات التحليل أو الإعلانات قبل اختيار المستخدم."
          />

          <div className="prose prose-lg max-w-none text-stone-800 leading-relaxed">
            <p>
              نحترم خصوصية زوار <strong>نظرة قانونية</strong> ونلتزم بأن يكون جمع البيانات
              في أضيق الحدود اللازمة لتشغيل الموقع وتحسينه، وبما يتوافق مع نظام حماية
              البيانات الشخصية في المملكة العربية السعودية.
            </p>

            <h2>1. ما الذي نجمعه؟</h2>
            <ul>
              <li>بيانات تقنية أساسية لازمة لأمن الموقع وتشغيله مثل سجلات الطلبات والأخطاء.</li>
              <li>تفضيلات الموافقة التي تحفظ محليًا في متصفحك لتذكر اختيارك بين التحليلات والإعلانات.</li>
              <li>بيانات تحليلية من Google Analytics وPlausible فقط إذا وافقت على فئة التحليلات.</li>
              <li>بيانات مرتبطة بعرض الإعلانات عبر Google AdSense فقط إذا وافقت على فئة الإعلانات.</li>
              <li>البيانات التي ترسلها إلينا بنفسك عبر رقم التواصل أو واتساب عند طلب تصحيح أو استفسار أو طلب خصوصية.</li>
            </ul>

            <h2>2. أغراض المعالجة</h2>
            <ul>
              <li>تشغيل الموقع، حماية بنيته التقنية، وتشخيص الأعطال.</li>
              <li>قياس أداء المحتوى وتحسينه بناءً على بيانات مجمعة أو إحصائية بعد الموافقة.</li>
              <li>عرض الإعلانات لتمويل تشغيل المحتوى بعد الموافقة الصريحة على فئة الإعلانات.</li>
              <li>معالجة الرسائل الواردة عبر رقم التواصل والرد على الطلبات المرتبطة بالمحتوى أو الخصوصية.</li>
            </ul>

            <h2>3. الأطراف الثالثة التي قد تتلقى بيانات</h2>
            <ul>
              <li><strong>Google Analytics</strong> لقياس الاستخدام عند قبول التحليلات.</li>
              <li><strong>Plausible Analytics</strong> لقياس أداء الصفحات عند قبول التحليلات.</li>
              <li><strong>Google AdSense</strong> لتحميل الإعلانات ووحداتها عند قبول الإعلانات.</li>
            </ul>
            <p>
              لا يتم تحميل هذه الخدمات قبل القبول المناسب، وتظل الحالة الافتراضية
              <strong> رفضًا </strong>
              للخيارات غير الضرورية.
            </p>

            <h2>4. ملفات الارتباط والتقنيات المشابهة</h2>
            <p>
              قد تستخدم خدمات التحليل والإعلانات ملفات تعريف ارتباط أو تقنيات مشابهة بعد
              القبول. يمكنك إدارة اختيارك في أي وقت عبر{' '}
              <ConsentSettingsButton className="inline text-base font-medium" />.
            </p>

            <h2>5. مدة الاحتفاظ والإتلاف</h2>
            <ul>
              <li>تفضيلات الموافقة تبقى في متصفحك إلى أن تغيّرها أو تحذف بيانات المتصفح.</li>
              <li>الرسائل التي ترسلها إلينا تحفظ بقدر الحاجة لمعالجة الطلب أو المتابعة ثم تحذف أو تؤرشف وفق الحاجة النظامية والتشغيلية.</li>
              <li>البيانات التي تعالجها خدمات الأطراف الثالثة تخضع لسياسات الاحتفاظ الخاصة بتلك الجهات.</li>
              <li>إذا لم تعد البيانات ضرورية للغرض الذي جمعت من أجله، نسعى إلى حذفها أو إتلافها أو إزالة ما يعرّف صاحبها متى كان ذلك ممكنًا ومشروعًا.</li>
            </ul>

            <h2>6. حقوقك</h2>
            <p>بحسب ما ينطبق من نظام حماية البيانات الشخصية، يمكنك طلب:</p>
            <ul>
              <li>العلم بالأساس النظامي والغرض من جمع بياناتك.</li>
              <li>الوصول إلى بياناتك الشخصية التي نحتفظ بها أو طلب تزويدك بها بصيغة واضحة.</li>
              <li>تصحيح بياناتك أو تحديثها أو استكمالها عند الحاجة.</li>
              <li>طلب إتلاف بياناتك عندما لا تعود لازمة للغرض الذي جمعت من أجله.</li>
              <li>سحب الموافقة على التحليلات أو الإعلانات في أي وقت من إعدادات التتبع.</li>
            </ul>

            <h2>7. كيف ترسل طلب خصوصية؟</h2>
            <p>
              أرسل رسالتك عبر واتساب إلى{' '}
              <a
                href={SITE_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                {SITE_PHONE_DISPLAY}
              </a>{' '}
              مع عنوان يوضح نوع الطلب مثل: <strong>طلب خصوصية</strong> أو{' '}
              <strong>طلب حذف بيانات</strong>. ويمكنك أيضًا الرجوع إلى{' '}
              <Link href="/contact" className="text-primary-600 hover:underline">
                صفحة التواصل
              </Link>
              .
            </p>

            <h2>8. التعديلات على هذه السياسة</h2>
            <p>
              قد نحدث هذه السياسة عند تغير أدوات القياس أو الإعلانات أو أسلوب معالجة الطلبات
              أو عند وجود متطلبات تنظيمية جديدة. يظهر تاريخ آخر تحديث في أعلى الصفحة.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
