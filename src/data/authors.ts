import type { Author } from '@/types'

export const allAuthors: Record<string, Author> = {
  'abdulrhman-almutlaq': {
    slug: 'abdulrhman-almutlaq',
    name: 'أ. عبدالرحمن المطلق',
    title: 'محامي استشارات ومرافعات — مدير إدارة قانونية',
    credential: 'محامي مرخص — وزارة العدل السعودية',
    expertise: [
      'نظام العمل السعودي',
      'القضايا العمالية',
      'القضايا الجزائية',
      'الجرائم المعلوماتية',
      'الاستشارات والمرافعات',
      'الحوكمة والامتثال (GRC)',
    ],
    bio: 'محامي استشارات ومرافعات مرخص من وزارة العدل السعودية، ومدير إدارة قانونية. متخصص في القضايا العمالية، الجزائية، والجرائم المعلوماتية، مع خبرة في الحوكمة والامتثال والمخاطر (GRC). حاصل على مؤهلات في الشريعة والقانون.',
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
