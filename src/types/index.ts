export interface Author {
  name: string
  title: string
  avatar?: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage: string
  date: string
  readingTime: number
  category: string
  categoryLabel: string
  tags: string[]
  author: Author
  featured?: boolean
}

export interface Category {
  slug: string
  label: string
  count: number
  color: string
}
