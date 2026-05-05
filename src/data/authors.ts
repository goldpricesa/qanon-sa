import type { Author } from '@/types'

export const allAuthors: Record<string, Author> = {
  'abdulrhman-almutlaq': {
    slug: 'abdulrhman-almutlaq',
    name: 'عبدالرحمن المطلق',
    title: 'محامٍ مرخص ومراجع محتوى قانوني',
    credential: 'محامٍ مرخص — وزارة العدل السعودية',
    expertise: [
      'نظام العمل السعودي',
      'القضايا العمالية',
      'القضايا الجزائية',
      'الجرائم المعلوماتية',
      'الاستشارات والمرافعات',
      'الحوكمة والامتثال',
    ],
    bio: 'محامٍ مرخص من وزارة العدل السعودية، يشارك في مراجعة وتحرير المحتوى القانوني المنشور على الموقع مع التركيز على دقة الإحالات النظامية وتحديثات الأنظمة السعودية.',
    alumniOf: 'كلية الشريعة والقانون',
    sameAs: ['https://twitter.com/qanon_sa'],
  },
}

export function getAuthorBySlug(slug: string): Author | undefined {
  return allAuthors[slug]
}

export function getAllAuthors(): Author[] {
  return Object.values(allAuthors)
}
