import type { Author } from '@/types'

export const allAuthors: Record<string, Author> = {
  'abdulrhman-almutlaq': {
    slug: 'abdulrhman-almutlaq',
    name: 'عبدالرحمن المطلق',
    title: 'محامي مرخص — ترافع في العديد من القضايا التجارية',
    credential: 'محامي مرخص — وزارة العدل السعودية',
    expertise: [
      'القضايا التجارية',
      'نظام العمل السعودي',
      'القضايا العمالية',
      'القضايا الجزائية',
      'الجرائم المعلوماتية',
      'الاستشارات والمرافعات',
      'الحوكمة والامتثال (GRC)',
    ],
    bio: 'محامي مرخص من وزارة العدل السعودية، ترافع في العديد من القضايا التجارية، ومدير إدارة قانونية. له خبرة في القضايا العمالية والجزائية والجرائم المعلوماتية، إلى جانب الحوكمة والامتثال والمخاطر (GRC). حاصل على بكالوريوس في الشريعة والقانون.',
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
