import type { Metadata } from 'next'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import {
  SITE_NAME,
  SITE_PHONE_DISPLAY,
  SITE_URL,
  SITE_WHATSAPP_URL,
  STATIC_PAGE_LAST_MODIFIED,
  getAbsoluteUrl,
} from '@/lib/site'

const url = getAbsoluteUrl('/disclaimer')
const title = 'إخلاء المسؤولية'
const description =
  'إخلاء المسؤولية القانونية لموقع نظرة قانونية: طبيعة المحتوى التثقيفية، حدود الاعتماد عليه، سياسة الدقة والمراجعة، والإفصاح الإعلاني.'

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

export default function DisclaimerPage() {
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
          آخر تحديث: {formatDate(STATIC_PAGE_LAST_MODIFIED.disclaimer)}
        </p>

        <div className="prose prose-lg max-w-none text-stone-800 leading-relaxed">
          <h2>1. طبيعة المحتوى</h2>
          <p>
            جميع المواد المنشورة في <strong>{SITE_NAME}</strong> — من مقالات وشروحات وأدوات
            حسابية — معدّة لأغراض <strong>التثقيف القانوني العام</strong> فقط، وتهدف إلى تبسيط
            الأنظمة واللوائح السعودية وإحالة القارئ إلى مصادرها الرسمية. لا يُعدّ أي محتوى في
            الموقع استشارة قانونية، ولا رأيًا قانونيًا في واقعة بعينها، ولا بديلاً عن الرجوع
            إلى محامٍ مرخص.
          </p>

          <h2>2. لا تنشأ علاقة محامٍ وموكل</h2>
          <p>
            تصفح الموقع أو قراءة مقالاته أو التواصل معنا عبر قنوات الموقع لا يُنشئ علاقة
            محامٍ وموكل بين القارئ وبين القائمين على الموقع أو كتّابه. الاستشارة القانونية
            الملزمة تتطلب اتفاقًا صريحًا ومستقلًا مع محامٍ مرخص بعد دراسة تفاصيل الحالة.
          </p>

          <h2>3. حدود الاعتماد على المحتوى</h2>
          <ul>
            <li>
              النتيجة القانونية تختلف باختلاف وقائع كل حالة وظروفها، وما يصح في حالة قد لا
              يصح في غيرها.
            </li>
            <li>
              الأنظمة واللوائح والأحكام القضائية تتغير وتُحدَّث، وقد لا يعكس المقال آخر
              تعديل نظامي بعد تاريخ مراجعته.
            </li>
            <li>
              لا يتحمل الموقع أو كتّابه أي مسؤولية عن قرار أو تصرف أو امتناع اتُّخذ
              استنادًا إلى محتوى الموقع دون استشارة قانونية متخصصة.
            </li>
            <li>
              نتائج الأدوات الحسابية في الموقع تقديرية واسترشادية ولا تُعدّ تحديدًا نهائيًا
              لأي مستحقات.
            </li>
          </ul>

          <h2>4. الدقة والمراجعة</h2>
          <p>
            نبذل عناية معقولة في توثيق المحتوى ومراجعته وربطه بالمصادر الرسمية مثل هيئة
            الخبراء بمجلس الوزراء والجهات الحكومية المختصة، ويظهر تاريخ آخر مراجعة في كل
            مقال. ومع ذلك لا نضمن خلوّ المحتوى من الخطأ أو السهو أو التقادم. إذا لاحظت
            معلومة غير دقيقة فنرحب بتنبيهنا عبر{' '}
            <a
              href={SITE_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:underline"
            >
              واتساب {SITE_PHONE_DISPLAY}
            </a>{' '}
            أو من خلال{' '}
            <Link href="/contact" className="text-primary-600 hover:underline">
              صفحة التواصل
            </Link>
            .
          </p>

          <h2>5. الروابط الخارجية</h2>
          <p>
            يتضمن الموقع روابط إلى مواقع خارجية، وبالأخص المصادر الرسمية للأنظمة. هذه
            الروابط للإحالة فقط، ولا نتحكم في محتوى تلك المواقع ولا نتحمل مسؤولية ما يطرأ
            عليه من تغيير.
          </p>

          <h2>6. الإفصاح الإعلاني</h2>
          <p>
            قد يعرض الموقع إعلانات عبر خدمة <strong>Google AdSense</strong> لدعم استمرارية
            المحتوى المجاني. الإعلانات تُدار من Google ولا تعبّر عن رأي الموقع، وظهور إعلان
            لجهة أو خدمة ما لا يعني توصيتنا بها. تُميَّز المساحات الإعلانية عن المحتوى
            التحريري، ولا يؤثر المعلنون في اختيار الموضوعات أو صياغتها. لمعرفة كيفية تعامل
            الإعلانات مع بياناتك راجع{' '}
            <Link href="/privacy" className="text-primary-600 hover:underline">
              سياسة الخصوصية
            </Link>
            .
          </p>

          <h2>7. مرجعية هذه الصفحة</h2>
          <p>
            تُقرأ هذه الصفحة جنبًا إلى جنب مع{' '}
            <Link href="/terms" className="text-primary-600 hover:underline">
              الشروط والأحكام
            </Link>{' '}
            و{' '}
            <Link href="/privacy" className="text-primary-600 hover:underline">
              سياسة الخصوصية
            </Link>
            . وقد نحدّثها عند الحاجة، ويظهر تاريخ آخر تحديث في أعلى الصفحة.
          </p>
        </div>
      </div>
    </>
  )
}
