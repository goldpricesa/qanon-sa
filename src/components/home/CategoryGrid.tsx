import Link from 'next/link'

interface Category {
  slug: string
  title: string
  count: number
  color: string
  icon: 'briefcase' | 'shield' | 'home' | 'chart' | 'chip' | 'scale' | 'family'
  desc: string
}

const categories: Category[] = [
  { slug: 'عمالي', title: 'قانون عمالي', count: 0, color: '#0D8075', icon: 'briefcase', desc: 'نظام العمل، الأجور، الفصل، الإجازات، نهاية الخدمة' },
  { slug: 'جنائي', title: 'قانون جنائي', count: 0, color: '#B45A3C', icon: 'shield', desc: 'الجرائم، العقوبات، التهديد، السب، الاحتيال' },
  { slug: 'عقاري', title: 'قانون عقاري', count: 0, color: '#8A6A2E', icon: 'home', desc: 'الإيجار، التسجيل العيني، الملكية، النزاعات' },
  { slug: 'تجاري', title: 'قانون تجاري', count: 0, color: '#2E5F8A', icon: 'chart', desc: 'الشركات، العقود، الشرط الجزائي، الإفلاس' },
  { slug: 'مدني', title: 'قانون مدني', count: 0, color: '#3A6B5C', icon: 'scale', desc: 'الالتزامات، العقود، التعويض، المسؤولية المدنية' },
  { slug: 'أحوال-شخصية', title: 'أحوال شخصية', count: 0, color: '#9E2A6B', icon: 'family', desc: 'الزواج، الطلاق، الحضانة، النفقة، الميراث' },
]

function CatIcon({ name, color }: { name: Category['icon']; color: string }) {
  const iconProps = {
    width: 26,
    height: 26,
    stroke: color,
    fill: 'none',
    strokeWidth: 1.75,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  switch (name) {
    case 'briefcase':
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
          <path d="M3 13h18" />
        </svg>
      )
    case 'shield':
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" />
          <path d="M12 9v4" />
          <circle cx="12" cy="16" r=".8" fill={color} />
        </svg>
      )
    case 'home':
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" />
        </svg>
      )
    case 'chart':
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <path d="M4 20V10" />
          <path d="M10 20V4" />
          <path d="M16 20v-8" />
          <path d="M22 20H2" />
        </svg>
      )
    case 'chip':
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <rect x="6" y="6" width="12" height="12" rx="1.5" />
          <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" />
        </svg>
      )
    case 'scale':
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <path d="M12 4v16" />
          <path d="M6 20h12" />
          <path d="M6 8l-3 6a3 3 0 0 0 6 0L6 8z" />
          <path d="M18 8l-3 6a3 3 0 0 0 6 0L18 8z" />
        </svg>
      )
    case 'family':
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20v-1.5A4.5 4.5 0 0 1 7.5 14h3a4.5 4.5 0 0 1 4.5 4.5V20" />
          <circle cx="17" cy="9.5" r="2.3" />
          <path d="M16.5 14.2a3.8 3.8 0 0 1 4.5 3.7V20" />
        </svg>
      )
  }
}

interface CategoryGridProps {
  counts?: Record<string, number>
}

export default function CategoryGrid({ counts = {} }: CategoryGridProps) {
  return (
    <section className="pt-14 pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="font-display text-[26px] font-black tracking-tight text-ink-2">
            تصفّح حسب التخصص
          </h2>
          <p className="mt-1.5 text-sm" style={{ color: 'var(--muted)' }}>
            ستة مجالات قانونية رئيسية، يغطّيها محامون مرخصون
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const count = counts[category.slug] ?? category.count

            return (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="group relative flex items-start gap-4 overflow-hidden rounded-[18px] border border-line bg-paper-2 p-6 transition-all hover:-translate-y-0.5 hover:shadow-editorial-md"
              >
                <div
                  className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[14px]"
                  style={{ background: `${category.color}24`, color: category.color }}
                >
                  <CatIcon name={category.icon} color={category.color} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-display text-[19px] font-bold text-ink-2">
                      {category.title}
                    </h3>
                    <span
                      className="rounded-md px-2 py-0.5 text-xs font-bold tabular-nums"
                      style={{ color: category.color, background: `${category.color}1A` }}
                    >
                      {count} مقال
                    </span>
                  </div>
                  <p className="mt-2 text-[13px] leading-[1.8]" style={{ color: 'var(--muted)' }}>
                    {category.desc}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
