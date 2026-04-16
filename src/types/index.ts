export interface Author {
  name: string
  title: string
  avatar?: string
  credential?: string
  expertise?: string[]
  profileUrl?: string
  image?: string
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
