export interface SourceReference {
  title: string
  url: string
}

export const SITE_NAME = 'نظرة قانونية'
export const SITE_URL = 'https://www.qanon-sa.com'
export const SITE_HOST = 'www.qanon-sa.com'
export const SITE_PHONE_DISPLAY = '0560390004'
export const SITE_PHONE_TEL = '+966560390004'
export const SITE_WHATSAPP_URL = 'https://wa.me/966560390004'
export const SITE_SOCIALS = {
  twitter: 'https://twitter.com/qanon_sa',
}
export const SITE_LOGO_URL = `${SITE_URL}/logo.png`
export const PLAUSIBLE_DOMAIN = 'qanon-sa.com'
export const GA_MEASUREMENT_ID = 'G-84090DMG89'
export const EDITORIAL_REVIEW_DATE = '2026-04-24'

export const STATIC_PAGE_LAST_MODIFIED = {
  home: '2026-04-24',
  blog: '2026-04-24',
  calculator: '2026-04-24',
  about: '2026-04-24',
  contact: '2026-04-24',
  privacy: '2026-04-24',
  terms: '2026-04-24',
  author: '2026-04-24',
} as const

export const LABOR_RELATIONS_SOURCES: SourceReference[] = [
  {
    title:
      'نظام العمل - المواد 77 و80 و81 و84 و85 و87 (وزارة الموارد البشرية والتنمية الاجتماعية)',
    url: 'https://www.hrsd.gov.sa/en/%25D8%25B9%25D9%2584%25D8%25A7%25D9%2582%25D8%25A7%25D8%25AA-%25D8%25A7%25D9%2584%25D8%25B9%25D9%2585%25D9%2584',
  },
  {
    title: 'عقود العمل - المادة 74 (وزارة الموارد البشرية والتنمية الاجتماعية)',
    url: 'https://www.hrsd.gov.sa/en/knowledge-centre/articles/64399',
  },
]

export const LABOR_LEAVE_SOURCES: SourceReference[] = [
  {
    title: 'نظام العمل - المواد 109 و111 (وزارة الموارد البشرية والتنمية الاجتماعية)',
    url: 'https://www.hrsd.gov.sa/en/%D8%B4%D8%B1%D9%88%D8%B7-%D8%A7%D9%84%D8%B9%D9%85%D9%84-%D9%88%D8%B8%D8%B1%D9%88%D9%81%D9%87',
  },
]

export const CIVIL_TRANSACTIONS_SOURCES: SourceReference[] = [
  {
    title: 'نظام المعاملات المدنية (هيئة الخبراء بمجلس الوزراء)',
    url: 'https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/655fdb42-8c96-422b-b8c4-b04f0095c94c/1',
  },
]

export const EVIDENCE_LAW_SOURCES: SourceReference[] = [
  {
    title: 'نظام الإثبات (هيئة الخبراء بمجلس الوزراء)',
    url: 'https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/2716057c-c097-4bad-8e1e-ae1400c678d5/1',
  },
]

export const PERSONAL_STATUS_SOURCES: SourceReference[] = [
  {
    title: 'نظام الأحوال الشخصية (هيئة الخبراء بمجلس الوزراء)',
    url: 'https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/4d72d829-947b-45d5-b9b5-ae5800d6bac2/1',
  },
]

export const ENFORCEMENT_LAW_SOURCES: SourceReference[] = [
  {
    title: 'نظام التنفيذ (هيئة الخبراء بمجلس الوزراء)',
    url: 'https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/c81ba2f1-1bf1-443b-9b1c-a9a700f27110/1',
  },
]

export const REAL_ESTATE_REGISTRATION_SOURCES: SourceReference[] = [
  {
    title: 'نظام التسجيل العيني للعقار (هيئة الخبراء بمجلس الوزراء)',
    url: 'https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/c9756bfb-ff81-4226-a820-ae8200dc074c/1',
  },
]

export const COMPANIES_LAW_SOURCES: SourceReference[] = [
  {
    title: 'نظام الشركات (هيئة الخبراء بمجلس الوزراء)',
    url: 'https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/a8376aea-1bc3-49d4-9027-aed900b555af/1',
  },
]

export const ECOMMERCE_LAW_SOURCES: SourceReference[] = [
  {
    title: 'نظام التجارة الإلكترونية (هيئة الخبراء بمجلس الوزراء)',
    url: 'https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/360de590-0286-4fa5-a243-aa9100c31979/1',
  },
]

export const ELECTRONIC_TRANSACTIONS_SOURCES: SourceReference[] = [
  {
    title: 'نظام التعاملات الإلكترونية (هيئة الخبراء بمجلس الوزراء)',
    url: 'https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/6f509360-2c39-4358-ae2a-a9a700f2ed16/1',
  },
]

export const FRANCHISE_LAW_SOURCES: SourceReference[] = [
  {
    title: 'نظام الامتياز التجاري (هيئة الخبراء بمجلس الوزراء)',
    url: 'https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/af2a6b93-51dd-4f16-b781-aafd00d9fbbc/1',
  },
]

export const PDPL_SOURCES: SourceReference[] = [
  {
    title: 'نظام حماية البيانات الشخصية (SDAIA)',
    url: 'https://dgp.sdaia.gov.sa/wps/portal/pdp/knowledgecenter/details/PDPL/%21ut/p/z1/04_Sj9CPykssy0xPLMnMz0vMAfIjo8ziPR1dzTwMgw2MDMOcTA3MjH39TE29jY0MQsz1w9EUhIZZAhUEGvl6OXoaGwQY60cRo98AB3A0IKTfi5ACoA-MinydfdP1owoSSzJ0M_PS8vUjAlwCfIB2R-HVbWGMoQDTe2AFeNwfnFikX5AbGlHlkxbsqeuoCAACaaGo/dz/d5/L0lHSkovd0RNQU5rQUVnQSEhLzROVkUvZW4%21/',
  },
  {
    title: 'دليل الحقوق الأساسية لصاحب البيانات الشخصية (SDAIA)',
    url: 'https://dgp.sdaia.gov.sa/wps/portal/pdp/knowledgecenter/details/GPDPL/%21ut/p/z1/04_Sj9CPykssy0xPLMnMz0vMAfIjo8ziPR1dzTwMgw2MDMOcTA3MjH39TE29jY0MQsz1w9EUhIZZAhUEGvl6OXoaGwQY60cRo98AB3A0IKTfi5ACoA-MinydfdP1owoSSzJ0M_PS8vUj3ANcAnyAlkfh1W5hjKEA039gBXg8UJAbGlHlkxbsmaoCAA0_1Mj/dz/d5/L0lDUmlTUSEhL3dHa0FKRnNBLzROV3FpQSEhL2Vu/',
  },
]

export const CYBER_CRIME_SOURCES: SourceReference[] = [
  {
    title: 'نظام مكافحة جرائم المعلوماتية',
    url: 'https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/25df73d6-0f49-4dc5-b010-a9a700f2ec1d/1',
  },
  {
    title: 'نظام الحماية من الإيذاء',
    url: 'https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/83f450eb-7985-461f-b053-a9a700f2ba08/1',
  },
]

export const CRIMINAL_LAW_SOURCES: SourceReference[] = [
  ...CYBER_CRIME_SOURCES,
  {
    title: 'نظام مكافحة التحرش',
    url: 'https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/f9de1b7f-7526-4c44-b9f3-a9f8015cf5b6/1',
  },
  {
    title: 'نظام مكافحة جرائم الإرهاب وتمويله',
    url: 'https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/57694209-3eed-46c7-a5d8-a9ed012761d4/1',
  },
]

export function getAbsoluteUrl(path = ''): string {
  if (!path || path === '/') {
    return SITE_URL
  }

  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export function getLastUpdatedDate(...values: Array<string | undefined>): string {
  return values
    .filter((value): value is string => Boolean(value))
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0]
}
