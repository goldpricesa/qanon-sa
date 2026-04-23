import type { Author } from '@/types'

export const allAuthors: Record<string, Author> = {
  'abdulrhman-almutlaq': {
    slug: 'abdulrhman-almutlaq',
    name: 'عبدالرحمن المطلق',
    title: 'محامي مرخص — ترافع في العديد من القضايا',
    credential: 'محامي مرخص — وزارة العدل السعودية',
    expertise: [
      'نظام العمل السعودي',
      'القضايا العمالية',
      'القضايا الجزائية',
      'الجرائم المعلوماتية',
      'الاستشارات والمرافعات',
      'الحوكمة والامتثال (GRC)',
    ],
    bio: 'محامي مرخص من وزارة العدل السعودية، ترافع في العديد من القضايا. حاصل على الاعتماد المهني السعودي للقانونيين (SASL) من الهيئة السعودية للمحامين، وشهادة الحوكمة والامتثال والمخاطر (GRC) من الهيئة السعودية للمراجعين الداخليين.',
    alumniOf: 'كلية الشريعة والقانون',
    email: 'amaalmotlaq1@gmail.com',
    telephone: '+966560390004',
    sameAs: ['https://twitter.com/qanon_sa'],
  },
}

export function getAuthorBySlug(slug: string): Author | undefined {
  return allAuthors[slug]
}

export function getAllAuthors(): Author[] {
  return Object.values(allAuthors)
}
