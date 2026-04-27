export interface Author {
  slug?: string
  name: string
  title: string
  credential?: string
  expertise?: string[]
  bio?: string
  alumniOf?: string
  sameAs?: string[]
  email?: string
  telephone?: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface HowToStep {
  name: string
  text: string
}

export interface BlogPost {
  id: string
  slug: string
  legacySlugs?: string[]
  title: string
  excerpt: string
  content: string
  coverImage: string
  date: string
  dateModified?: string
  readingTime: number
  category: string
  categoryLabel: string
  tags: string[]
  author: Author
  featured?: boolean
  seoTitle?: string
  seoDescription?: string
  faq?: FaqItem[]
  howToSteps?: HowToStep[]
}

export interface Category {
  slug: string
  label: string
  count: number
  color: string
}
