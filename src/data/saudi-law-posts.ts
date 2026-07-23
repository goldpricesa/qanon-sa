import type { BlogPost } from '@/types'
import { civilPosts } from './articles/civil'
import { commercialPosts } from './articles/commercial'
import { criminalPosts } from './articles/criminal'
import { laborPosts } from './articles/labor'
import { personalStatusPosts } from './articles/personal-status'
import { realEstatePosts } from './articles/real-estate'

/**
 * تجميع مقالات الأنظمة السعودية من ملفات التصنيفات.
 * الترتيب حسب المعرّف الرقمي للحفاظ على الترتيب الأصلي للنشر.
 */
export const saudiLawPosts: BlogPost[] = [
  ...laborPosts,
  ...personalStatusPosts,
  ...realEstatePosts,
  ...civilPosts,
  ...criminalPosts,
  ...commercialPosts,
].sort((a, b) => Number(a.id) - Number(b.id))
