import type { BlogPost } from '@/types'
import { allPosts } from '@/data/posts'

/**
 * Linking Strategy Utility
 * Helps identify relevant internal links for articles based on topic clusters
 */

// Define topical clusters for better linking strategy.
// Category slugs match the canonical Arabic slugs used in URLs.
const TOPICAL_CLUSTERS = {
  labour: {
    name: 'نظام العمل',
    keywords: ['عمالي', 'عقد عمل', 'فصل تعسفي', 'مكافأة', 'حقوق عامل', 'إجازات', 'استقالة'],
    category: 'عمالي',
  },
  realEstate: {
    name: 'القانون العقاري',
    keywords: ['عقاري', 'عقار', 'ملكية', 'توثيق', 'سجل عقاري', 'إيجار', 'منصة إيجار', 'إخلاء'],
    category: 'عقاري',
  },
  commercial: {
    name: 'القانون التجاري',
    keywords: ['تجاري', 'استثمار', 'شركات', 'عقود تجارية', 'شرط جزائي', 'تأسيس شركة'],
    category: 'تجاري',
  },
  digital: {
    name: 'القانون الرقمي',
    keywords: ['رقمي', 'بيانات', 'إلكترونية', 'خصوصية', 'تجارة إلكترونية', 'جرائم معلوماتية'],
    category: 'رقمي',
  },
  civil: {
    name: 'القانون المدني والمرافعات',
    keywords: ['مدني', 'حقوق', 'مسؤولية', 'عقود', 'صحيفة دعوى', 'تعويض', 'نقض'],
    category: 'مدني',
  },
  personalStatus: {
    name: 'الأحوال الشخصية',
    keywords: ['أحوال شخصية', 'حضانة', 'خلع', 'ولاية', 'تركة', 'حصر ورثة', 'نفقة'],
    category: 'أحوال-شخصية',
  },
  criminal: {
    name: 'القانون الجنائي',
    keywords: ['جنائي', 'عقوبة', 'سرقة', 'سب وقذف', 'جرائم معلوماتية', 'عنف أسري'],
    category: 'جنائي',
  },
}

/**
 * Get relevant internal link suggestions for a specific article
 * Returns an array of posts that would be good to link to
 */
export function getInternalLinkSuggestions(post: BlogPost, limit = 5): Array<{
  post: BlogPost
  relevanceScore: number
  linkText: string
}> {
  const suggestions: Array<{
    post: BlogPost
    relevanceScore: number
    linkText: string
  }> = []

  const postContent = `${post.title} ${post.excerpt} ${post.tags.join(' ')}`

  for (const candidate of allPosts) {
    if (candidate.slug === post.slug) continue

    const candidateContent = `${candidate.title} ${candidate.excerpt} ${candidate.tags.join(' ')}`

    // Calculate relevance score based on:
    // 1. Same category (high score)
    // 2. Tag overlap (medium score)
    // 3. Content similarity (low score)

    let relevanceScore = 0

    // Same category boost
    if (post.category === candidate.category) {
      relevanceScore += 30
    }

    // Tag overlap
    const commonTags = post.tags.filter((tag) =>
      candidate.tags.some((cTag) => cTag.includes(tag) || tag.includes(cTag))
    )
    relevanceScore += commonTags.length * 10

    // Content keyword overlap (simple check)
    const postWords = postContent.split(/\s+/)
    const candidateWords = candidateContent.split(/\s+/)
    const commonWords = postWords.filter((word) =>
      candidateWords.some((cWord) => cWord === word && word.length > 3)
    )
    relevanceScore += commonWords.length * 2

    if (relevanceScore > 0) {
      suggestions.push({
        post: candidate,
        relevanceScore,
        linkText: candidate.title,
      })
    }
  }

  // Sort by relevance and return top suggestions
  return suggestions
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, limit)
}

/**
 * Get hub article for a topic cluster
 * Hub articles are comprehensive guides that link to related articles
 */
export function getClusterHub(category: string): BlogPost | undefined {
  // For now, return the first (featured or longest) article in the category
  const categoryPosts = allPosts
    .filter((p) => p.category === category)
    .sort(
      (a, b) =>
        (b.featured ? 1 : 0) - (a.featured ? 1 : 0) ||
        b.content.length - a.content.length
    )

  return categoryPosts[0]
}

/**
 * Get spoke articles (related articles that should link back to a hub)
 */
export function getClusterSpokes(
  hubPost: BlogPost,
  limit = 5
): BlogPost[] {
  return allPosts
    .filter((p) => p.slug !== hubPost.slug && p.category === hubPost.category)
    .slice(0, limit)
}

/**
 * Get all clusters information
 */
export function getAllClusters() {
  return TOPICAL_CLUSTERS
}

/**
 * Get cluster by category slug
 */
export function getClusterByCategory(category: string) {
  return Object.values(TOPICAL_CLUSTERS).find((c) => c.category === category)
}
