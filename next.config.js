/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,

  images: {
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
      // Category slug migration. Categories without published content yet
      // redirect to /blog so users land on a populated page rather than 404.
      { source: '/category/emali', destination: '/category/عمالي', permanent: true },
      { source: '/category/jinai', destination: '/category/جنائي', permanent: true },
      { source: '/category/aqari', destination: '/blog', permanent: false },
      { source: '/category/tijari', destination: '/blog', permanent: false },
      { source: '/category/raqami', destination: '/category/جنائي', permanent: true },
      { source: '/category/madani', destination: '/blog', permanent: false },
      { source: '/category/ahwal', destination: '/blog', permanent: false },
    ]
  },
}

module.exports = nextConfig
