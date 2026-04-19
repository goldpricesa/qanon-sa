/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'source.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
  },

  async redirects() {
    return [
      // Blog post slug migration (transliterated -> Arabic)
      {
        source: '/blog/alfasl-altasawwuri-fi-nizaam-alaamal',
        destination: '/blog/الفصل-التعسفي-في-نظام-العمل',
        permanent: true,
      },
      {
        source: '/blog/huquq-almuwaddaf-fi-alqitaa-alkhass',
        destination: '/blog/حقوق-الموظف-في-القطاع-الخاص',
        permanent: true,
      },
      {
        source: '/blog/uqubat-alsab-walshatm-fi-alsaudia',
        destination: '/blog/عقوبة-السب-والشتم-في-السعودية',
        permanent: true,
      },
      {
        source: '/blog/uqubat-altahdid-fi-alsaudia',
        destination: '/blog/عقوبة-التهديد-في-السعودية',
        permanent: true,
      },
      // Category slug migration
      { source: '/category/emali', destination: '/category/عمالي', permanent: true },
      { source: '/category/jinai', destination: '/category/جنائي', permanent: true },
      { source: '/category/aqari', destination: '/category/عقاري', permanent: true },
      { source: '/category/tijari', destination: '/category/تجاري', permanent: true },
      { source: '/category/raqami', destination: '/category/رقمي', permanent: true },
      { source: '/category/madani', destination: '/category/مدني', permanent: true },
      { source: '/category/ahwal', destination: '/category/أحوال-شخصية', permanent: true },
    ]
  },
}

module.exports = nextConfig
