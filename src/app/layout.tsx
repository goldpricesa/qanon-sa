import type { Metadata } from 'next'
import { Tajawal } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BackToTop from '@/components/ui/BackToTop'

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  variable: '--font-tajawal',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://qanon-sa.com'),
  verification: {
    google: 'v8ablWgD-CRVtO_toxgDNiaW3UQUXPY8lNL0I4zcNTY',
  },
  icons: {
    icon: '/logo.png.jpeg',
    shortcut: '/logo.png.jpeg',
    apple: '/logo.png.jpeg',
  },
  title: {
    default: 'نظرة قانونية | مدونة قانونية سعودية متخصصة',
    template: '%s | نظرة قانونية',
  },
  description:
    'مدونة قانونية سعودية متخصصة — شروحات نظام العمل، الأحوال الشخصية، العقود، الإيجار، الجرائم المعلوماتية، تأسيس الشركات. مقالات يكتبها محامون مرخصون من وزارة العدل.',
  keywords: [
    'قانون سعودي',
    'محامي سعودي',
    'محامي الرياض',
    'استشارة قانونية مجانية',
    'استشارات قانونية',
    'نظام العمل السعودي',
    'الفصل التعسفي',
    'مكافأة نهاية الخدمة',
    'نظام الأحوال الشخصية',
    'الحضانة في السعودية',
    'دعوى الخلع',
    'منصة إيجار',
    'تأسيس شركة',
    'الشرط الجزائي',
    'صحيفة الدعوى',
    'دعوى التعويض',
    'الجرائم المعلوماتية',
    'صك حصر الورثة',
    'توزيع التركة',
    'محكمة عمالية',
    'محكمة تجارية',
  ],
  category: 'law',
  authors: [{ name: 'نظرة قانونية', url: 'https://qanon-sa.com' }],
  creator: 'نظرة قانونية',
  publisher: 'نظرة قانونية',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    url: 'https://qanon-sa.com',
    siteName: 'نظرة قانونية',
    title: 'نظرة قانونية | مدونة قانونية سعودية متخصصة',
    description:
      'مدونة قانونية سعودية متخصصة — نظام العمل، الأحوال الشخصية، العقود، الإيجار، الجرائم المعلوماتية. يكتبها محامون مرخصون.',
    images: [
      {
        url: '/logo.png.jpeg',
        width: 1200,
        height: 630,
        alt: 'شعار نظرة قانونية',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'نظرة قانونية | مدونة قانونية سعودية متخصصة',
    description:
      'محتوى قانوني سعودي موثوق يكتبه محامون مرخصون من وزارة العدل.',
    creator: '@qanon_sa',
    images: ['/logo.png.jpeg'],
  },
  alternates: {
    canonical: 'https://qanon-sa.com',
    languages: { 'ar-SA': 'https://qanon-sa.com' },
  },
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'نظرة قانونية',
  url: 'https://qanon-sa.com',
  inLanguage: 'ar-SA',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://qanon-sa.com/?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: 'نظرة قانونية',
  url: 'https://qanon-sa.com',
  logo: 'https://qanon-sa.com/logo.png.jpeg',
  description:
    'مدونة قانونية سعودية متخصصة في الشأن السعودي يكتبها محامون مرخصون من وزارة العدل.',
  areaServed: {
    '@type': 'Country',
    name: 'المملكة العربية السعودية',
  },
  knowsLanguage: ['ar', 'en'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className={tajawal.variable}>
      <body className={`${tajawal.className} min-h-screen flex flex-col bg-warm-50 font-arabic`}>
        <Script
          id="website-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Script
          id="org-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <BackToTop />
        <GoogleAnalytics gaId="G-84090DMG89" />
        <Script
          strategy="lazyOnload"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3611815443789107"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  )
}
