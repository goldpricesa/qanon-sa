import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BackToTop from '@/components/ui/BackToTop'

const thmanyahSans = localFont({
  src: [
    { path: '../../public/fonts/thmanyah/thmanyahsans-Light.woff2', weight: '300', style: 'normal' },
    { path: '../../public/fonts/thmanyah/thmanyahsans-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/thmanyah/thmanyahsans-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/thmanyah/thmanyahsans-Bold.woff2', weight: '700', style: 'normal' },
    { path: '../../public/fonts/thmanyah/thmanyahsans-Black.woff2', weight: '900', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-thmanyah-sans',
})

const thmanyahDisplay = localFont({
  src: [
    { path: '../../public/fonts/thmanyah/thmanyahserifdisplay-Bold.woff2', weight: '700', style: 'normal' },
    { path: '../../public/fonts/thmanyah/thmanyahserifdisplay-Black.woff2', weight: '900', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-thmanyah-display',
})

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0f766e' },
    { media: '(prefers-color-scheme: dark)', color: '#0c1e3c' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://qanon-sa.com'),
  applicationName: 'نظرة قانونية',
  referrer: 'origin-when-cross-origin',
  formatDetection: { telephone: false, address: false, email: false },
  verification: {
    google: 'v8ablWgD-CRVtO_toxgDNiaW3UQUXPY8lNL0I4zcNTY',
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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'نظرة قانونية | مدونة قانونية سعودية متخصصة',
    description:
      'محتوى قانوني سعودي موثوق يكتبه محامون مرخصون من وزارة العدل.',
    creator: '@qanon_sa',
    site: '@qanon_sa',
  },
  alternates: {
    canonical: 'https://qanon-sa.com',
    languages: { 'ar-SA': 'https://qanon-sa.com' },
  },
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://qanon-sa.com/#website',
  name: 'نظرة قانونية',
  alternateName: 'Qanon SA',
  url: 'https://qanon-sa.com',
  description:
    'مدونة قانونية سعودية متخصصة — نظام العمل، الأحوال الشخصية، العقود، الإيجار، الجرائم المعلوماتية.',
  inLanguage: 'ar-SA',
  publisher: { '@id': 'https://qanon-sa.com/#organization' },
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
  '@type': 'Organization',
  '@id': 'https://qanon-sa.com/#organization',
  name: 'نظرة قانونية',
  alternateName: 'Qanon SA',
  url: 'https://qanon-sa.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://qanon-sa.com/logo.png',
    width: 560,
    height: 150,
  },
  image: 'https://qanon-sa.com/logo.png',
  description:
    'مدونة قانونية سعودية متخصصة في الشأن السعودي يكتبها محامون مرخصون من وزارة العدل.',
  areaServed: {
    '@type': 'Country',
    name: 'المملكة العربية السعودية',
  },
  knowsLanguage: ['ar'],
  knowsAbout: [
    'نظام العمل السعودي',
    'الأحوال الشخصية',
    'القانون العقاري',
    'القانون التجاري',
    'الجرائم المعلوماتية',
    'القانون المدني',
  ],
  sameAs: ['https://twitter.com/qanon_sa'],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'contact@qanon-sa.com',
    availableLanguage: 'Arabic',
    areaServed: 'SA',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className={`${thmanyahSans.variable} ${thmanyahDisplay.variable}`}>
      <head>
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="نظرة قانونية — آخر المقالات"
          href="/feed.xml"
        />
      </head>
      <body className={`${thmanyahSans.className} min-h-screen flex flex-col bg-warm-50 font-arabic`}>
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
          id="plausible-analytics"
          strategy="lazyOnload"
          defer
          data-domain="qanon-sa.com"
          src="https://plausible.io/js/script.js"
        />
        <Script
          strategy="lazyOnload"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3611815443789107"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  )
}
