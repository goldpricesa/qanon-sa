/**
 * SEO Keyword Strategy for نظرة قانونية
 * Comprehensive Arabic keyword research for Saudi legal content
 */

export interface KeywordData {
  keyword: string
  searchVolume: number
  competition: 'low' | 'medium' | 'high'
  priority: 'high' | 'medium' | 'low'
}

// High-Priority Keywords
export const highPriorityKeywords: KeywordData[] = [
  { keyword: 'قانون سعودي', searchVolume: 5000, competition: 'high', priority: 'high' },
  { keyword: 'محامي سعودي', searchVolume: 3000, competition: 'high', priority: 'high' },
  { keyword: 'استشارات قانونية', searchVolume: 2000, competition: 'high', priority: 'high' },
  { keyword: 'نظام العمل', searchVolume: 1500, competition: 'medium', priority: 'high' },
  { keyword: 'مكافأة نهاية الخدمة', searchVolume: 1200, competition: 'medium', priority: 'high' },
  { keyword: 'قانون عقاري', searchVolume: 1000, competition: 'medium', priority: 'high' },
]

// Long-Tail Keywords (Quick Wins)
export const longTailKeywords: KeywordData[] = [
  { keyword: 'الفصل التعسفي في السعودية', searchVolume: 800, competition: 'low', priority: 'high' },
  { keyword: 'كيف احسب مكافأة نهاية الخدمة', searchVolume: 600, competition: 'low', priority: 'high' },
  { keyword: 'حقوق العامل المفصول تعسفيا', searchVolume: 500, competition: 'low', priority: 'high' },
  { keyword: 'عقد العمل السعودي', searchVolume: 450, competition: 'low', priority: 'high' },
  { keyword: 'نظام الشركات السعودي', searchVolume: 380, competition: 'low', priority: 'high' },
]
