import Link from 'next/link'

interface Category {
  slug: string
  label: string
  count: number
  color: string
  icon: 'briefcase' | 'shield' | 'home' | 'chart' | 'chip' | 'scale'
  desc: string
}

const categories: Category[] = [
  { slug: 'عمالي', label: 'عمالي', count: 0, color: '#0D8075', icon: 'briefcase', desc: 'نظام العمل، الأجور، الفصل، الإجازات، نهاية الخدمة' },
  { slug: 'جنائي', label: 'جنائي', count: 0, color: '#B45A3C', icon: 'shield',    desc: 'الجرائم، العقوبات، التهديد، السب، الاحتيال' },
  { slug: 'عقاري', label: 'عقاري', count: 0, color: '#8A6A2E', icon: 'home',      desc: 'الإيجار، التسجيل العيني، الملكية، النزاعات' },
  { slug: 'تجاري', label: 'تجاري', count: 0, color: '#2E5F8A', icon: 'chart',     desc: 'الشركات، العقود، الشرط الجزائي، الإفلاس' },
  { slug: 'أحوال-شخصية', label: 'أحوال شخصية', count: 0, color: '#5E3A8A', icon: 'scale', desc: 'الزواج، الطلاق، الحضانة، النفقة، الميراث، الولاية' },
  { slug: 'مدني',  label: 'مدني',  count: 0, color: '#3A6B5C', icon: 'scale',     desc: 'الالتزامات، التعويض، الأحوال الشخصية، الميراث' },
]

function CatIcon({ name, color }: { name: Category['icon']; color: string }) {
  const s = { width: 26, height: 26, stroke: color, fill: 'none', strokeWidth: 1.75, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  switch (name) {
    case 'briefcase': return (<svg viewBox="0 0 24 24" {...s}><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><path d="M3 13h18"/></svg>)
    case 'shield':    return (<svg viewBox="0 0 24 24" {...s}><path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z"/><path d="M12 9v4"/><circle cx="12" cy="16" r=".8" fill={color}/></svg>)
    case 'home':      return (<svg viewBox="0 0 24 24" {...s}><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></svg>)
    case 'chart':     return (<svg viewBox="0 0 24 24" {...s}><path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-8"/><path d="M22 20H2"/></svg>)
    case 'chip':      return (<svg viewBox="0 0 24 24" {...s}><rect x="6" y="6" width="12" height="12" rx="1.5"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/></svg>)
    case 'scale':     return (<svg viewBox="0 0 24 24" {...s}><path d="M12 4v16"/><path d="M6 20h12"/><path d="M6 8l-3 6a3 3 0 0 0 6 0L6 8z"/><path d="M18 8l-3 6a3 3 0 0 0 6 0L18 8z"/></svg>)
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
          <h2 className="font-display text-[26px] font-black text-ink-2 tracking-tight">تصفّح حسب التخصص</h2>
          <p className="text-sm mt-1.5" style={{ color: 'var(--muted)' }}>ستة مجالات قانونية رئيسية، يغطّيها محامون مرخصون</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((c) => {
            const count = counts[c.slug] ?? c.count
            return (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="group relative bg-paper-2 border border-line rounded-[18px] p-6 flex gap-4 items-start transition-all hover:-translate-y-0.5 hover:shadow-editorial-md overflow-hidden"
              >
                <div
                  className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center shrink-0"
                  style={{ background: c.color + '24', color: c.color }}
                >
                  <CatIcon name={c.icon} color={c.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline gap-2">
                    <h3 className="font-display text-[19px] font-bold text-ink-2">قانون {c.label}</h3>
                    <span
                      className="text-xs font-bold tabular-nums px-2 py-0.5 rounded-md"
                      style={{ color: c.color, background: c.color + '1A' }}
                    >
                      {count} مقال
                    </span>
                  </div>
                  <p className="text-[13px] leading-[1.8] mt-2" style={{ color: 'var(--muted)' }}>
                    {c.desc}
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
