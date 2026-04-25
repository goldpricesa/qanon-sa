import Link from 'next/link'
import { cn } from '@/lib/utils'

const colorMap: Record<string, { color: string; bg: string; border: string }> = {
  'عمالي':       { color: '#0D8075', bg: 'rgba(13, 128, 117, 0.12)',  border: 'rgba(13, 128, 117, 0.24)' },
  'جنائي':       { color: '#B45A3C', bg: 'rgba(180, 90, 60, 0.12)',   border: 'rgba(180, 90, 60, 0.24)' },
  'عقاري':       { color: '#8A6A2E', bg: 'rgba(138, 106, 46, 0.12)',  border: 'rgba(138, 106, 46, 0.24)' },
  'تجاري':       { color: '#2E5F8A', bg: 'rgba(46, 95, 138, 0.12)',   border: 'rgba(46, 95, 138, 0.24)' },
  'مدني':        { color: '#3A6B5C', bg: 'rgba(58, 107, 92, 0.12)',   border: 'rgba(58, 107, 92, 0.24)' },
  'أحوال شخصية': { color: '#5E3A8A', bg: 'rgba(94, 58, 138, 0.12)',   border: 'rgba(94, 58, 138, 0.24)' },
  'أحوال-شخصية': { color: '#5E3A8A', bg: 'rgba(94, 58, 138, 0.12)',   border: 'rgba(94, 58, 138, 0.24)' },
}

interface CategoryBadgeProps {
  category: string
  label: string
  size?: 'sm' | 'md'
  asLink?: boolean
}

export default function CategoryBadge({
  category,
  label,
  size = 'md',
  asLink = true,
}: CategoryBadgeProps) {
  const c = colorMap[category] ?? { color: '#0D8075', bg: 'rgba(13, 128, 117, 0.12)', border: 'rgba(13, 128, 117, 0.24)' }

  const classes = cn(
    'inline-flex items-center gap-1.5 rounded-full font-semibold transition-colors tracking-wide',
    size === 'sm' ? 'px-2.5 py-0.5 text-[11.5px]' : 'px-3 py-1 text-xs'
  )

  const inner = (
    <>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.color }} />
      {label}
    </>
  )

  const style = {
    color: c.color,
    backgroundColor: c.bg,
    borderColor: c.border,
    border: '1px solid',
  }

  if (asLink) {
    return (
      <Link href={`/category/${category}`} className={classes} style={style}>
        {inner}
      </Link>
    )
  }

  return <span className={classes} style={style}>{inner}</span>
}
