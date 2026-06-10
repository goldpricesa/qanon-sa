import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BackToTop from '@/components/ui/BackToTop'
import ConsentBanner from '@/components/consent/ConsentBanner'
import { ConsentProvider } from '@/components/consent/ConsentProvider'
import TrackingScripts from '@/components/consent/TrackingScripts'
import { CONSENT_STORAGE_KEY } from '@/lib/consent'
import {
  ADSENSE_PUBLISHER_ID,
  SITE_LOGO_URL,
  SITE_NAME,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
  SITE_SOCIALS,
  SITE_URL,
} from '@/lib/site'

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
    { path: '../../public/fonts/thmanyah/thmanyahserifdisplay-Regular.woff2', weight: '400', style: 'normal' },
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
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  referrer: 'origin-when-cross-origin',
  formatDetection: { telephone: false, address: false, email: false },
  verification: {
    google: 'v8ablWgD-CRVtO_toxgDNiaW3UQUXPY8lNL0I4zcNTY',
  },
  title: {
    default: `${SITE_NAME} | مدونة قانونية سعودية متخصصة`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'مدونة قانونية سعودية متخصصة في الشأن السعودي. شروحات قانونية موثقة عن نظام العمل، الأحوال الشخصية، العقود، الإيجار، الجرائم المعلوماتية، وتأسيس الشركات.',
  keywords: [
    'قانون سعودي',
    'محامي سعودي',
    'محامي الرياض',
    'استشارة قانونية',
    'نظام العمل السعودي',
    'الفصل التعسفي',
    'مكافأة نهاية الخدمة',
    'الأحوال الشخصية',
    'الحضانة في السعودية',
    'منصة إيجار',
    'تأسيس شركة',
    'الجرائم المعلوماتية',
    'محكمة عمالية',
    'محكمة تجارية',
  ],
  category: 'law',
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
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
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | مدونة قانونية سعودية متخصصة`,
    description:
      'مدونة قانونية سعودية متخصصة في نظام العمل، الأحوال الشخصية، العقود، الإيجار، والجرائم المعلوماتية، بمحتوى يراجعه مختصون.',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | مدونة قانونية سعودية متخصصة`,
    description: 'محتوى قانوني سعودي موثق يراجعه مختصون في الأنظمة السعودية.',
    creator: '@qanon_sa',
    site: '@qanon_sa',
  },
  alternates: {
    canonical: SITE_URL,
    languages: { 'ar-SA': SITE_URL },
  },
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  alternateName: 'QANON SA',
  url: SITE_URL,
  description:
    'مدونة قانونية سعودية متخصصة في الشأن السعودي، مع شروحات قانونية وتحليلات عملية وروابط إلى المصادر الرسمية.',
  inLanguage: 'ar-SA',
  publisher: { '@id': `${SITE_URL}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: 'QANON SA',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: SITE_LOGO_URL,
    width: 560,
    height: 150,
  },
  image: SITE_LOGO_URL,
  telephone: SITE_PHONE_TEL,
  description:
    'منصة محتوى قانوني سعودي متخصصة في تبسيط الأنظمة واللوائح السعودية وإحالة القارئ إلى المصادر الرسمية ذات الصلة.',
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
  sameAs: [SITE_SOCIALS.twitter],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    telephone: SITE_PHONE_DISPLAY,
    availableLanguage: 'Arabic',
    areaServed: 'SA',
  },
}

const googleConsentBootstrap = `
  (function () {
    window.dataLayer = window.dataLayer || [];
    function gtag(){ window.dataLayer.push(arguments); }
    window.gtag = window.gtag || gtag;
    gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      functionality_storage: 'granted',
      security_storage: 'granted',
      wait_for_update: 500
    });

    try {
      var raw = window.localStorage.getItem('${CONSENT_STORAGE_KEY}');
      if (!raw) return;

      var parsed = JSON.parse(raw);
      if (typeof parsed.analytics !== 'boolean') {
        return;
      }

      var adsGranted = parsed.ads === true;
      gtag('consent', 'update', {
        analytics_storage: parsed.analytics ? 'granted' : 'denied',
        ad_storage: adsGranted ? 'granted' : 'denied',
        ad_user_data: adsGranted ? 'granted' : 'denied',
        ad_personalization: adsGranted ? 'granted' : 'denied',
      });
    } catch (error) {
      // Ignore malformed stored preferences and keep the secure defaults.
    }
  })();
`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className={`${thmanyahSans.variable} ${thmanyahDisplay.variable}`}>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <script dangerouslySetInnerHTML={{ __html: googleConsentBootstrap }} />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${SITE_NAME} — آخر المقالات`}
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
        {/* يُحمَّل دائمًا حتى يتمكن زاحف مراجعة AdSense من رؤية الكود؛ الإعلانات تبقى
            غير مخصصة ما دام Consent Mode على الوضع الافتراضي (مرفوض). */}
        <Script
          id="adsense-loader"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`}
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <ConsentProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <BackToTop />
          <ConsentBanner />
          <TrackingScripts />
        </ConsentProvider>
      </body>
    </html>
  )
}
