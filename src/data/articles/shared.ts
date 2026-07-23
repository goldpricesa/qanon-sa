import type { BlogPost } from '@/types'

export const PUBLISH_DATE = '2026-05-04'

export const NEW_PUBLISH_DATE = '2026-05-29'

/** تاريخ آخر مراجعة وتحديث شامل للمحتوى */
export const CONTENT_UPDATE_DATE = '2026-07-15'

export const legalAuthor = {
  slug: 'abdulrhman-almutlaq',
  name: 'عبدالرحمن المطلق',
  title: 'محامٍ مرخص ومراجع محتوى قانوني سعودي',
  credential: 'محامٍ مرخص — وزارة العدل السعودية',
  expertise: ['الأنظمة السعودية', 'القضاء العمالي', 'الأحوال الشخصية', 'المعاملات المدنية', 'الأنظمة التجارية'],
} satisfies BlogPost['author']

export const legalDisclaimer =
  '<p><em>تنبيه: هذه المادة تثقيفية عامة وفق الأنظمة السعودية ولا تُعد استشارة قانونية أو وعدًا بنتيجة قضائية. عند وجود نزاع أو إجراء رسمي، راجع محاميًا مرخصًا أو الجهة المختصة.</em></p>'
