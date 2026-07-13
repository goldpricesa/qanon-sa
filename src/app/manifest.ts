import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'نظرة قانونية | مدونة قانونية سعودية متخصصة',
    short_name: 'نظرة قانونية',
    description:
      'مدونة قانونية سعودية متخصصة — شروحات نظام العمل، الأحوال الشخصية، العقود، الإيجار، الجرائم المعلوماتية، تأسيس الشركات.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fdfaf4',
    theme_color: '#0f766e',
    lang: 'ar',
    dir: 'rtl',
    orientation: 'portrait',
    categories: ['news', 'education', 'legal', 'reference'],
    icons: [
      {
        src: '/icon-192',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-maskable',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
