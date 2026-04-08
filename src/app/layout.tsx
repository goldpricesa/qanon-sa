import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BackToTop from '@/components/ui/BackToTop'

export const metadata: Metadata = {
  metadataBase: new URL('https://qanon-sa.com'),
  title: {
    default: 'نظرة قانونية | مدونة قانونية سعودية',
    template: '%s | نظرة قانونية',
  },
  description:
    'مدونة قانونية متخصصة في الشأن السعودي — نظام العمل، العقارات، الشركات، والقانون الرقمي. مقالات موثوقة يكتبها محامون معتمدون.',
  keywords: [
    'قانون سعودي',
    'نظام العمل',
    'محامي سعودي',
    'استشارات قانونية',
    'نظام الشركات',
    'قانون عقاري',
  ],
  authors: [{ name: 'نظرة قانونية', url: 'https://qanon-sa.com' }],
  creator: 'نظرة قانونية',
  publisher: 'نظرة قانونية',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    url: 'https://qanon-sa.com',
    siteName: 'نظرة قانونية',
    title: 'نظرة قانونية | مدونة قانونية سعودية',
    description:
      'مدونة قانونية متخصصة في الشأن السعودي — نظام العمل، العقارات، الشركات، والقانون الرقمي.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'نظرة قانونية | مدونة قانونية سعودية',
    description:
      'مدونة قانونية متخصصة في الشأن السعودي — نظام العمل، العقارات، الشركات، والقانون الرقمي.',
    creator: '@qanon_sa',
  },
  alternates: {
    canonical: 'https://qanon-sa.com',
    languages: { 'ar-SA': 'https://qanon-sa.com' },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
        {/* Google AdSense - تحقق من صحة publisher ID قبل النشر */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3611815443789107"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-warm-50 font-arabic">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  )
}
