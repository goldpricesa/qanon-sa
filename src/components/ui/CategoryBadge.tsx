import Link from 'next/link'
import { cn } from '@/lib/utils'

const colorMap: Record<string, string> = {
  emali: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
  aqari: 'bg-green-100 text-green-700 hover:bg-green-200',
  tijari: 'bg-amber-100 text-amber-700 hover:bg-amber-200',
  raqami: 'bg-purple-100 text-purple-700 hover:bg-purple-200',
  madani: 'bg-rose-100 text-rose-700 hover:bg-rose-200',
  ahwal: 'bg-pink-100 text-pink-700 hover:bg-pink-200',
  jinai: 'bg-red-100 text-red-700 hover:bg-red-200',
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
  const classes = cn(
    'inline-flex items-center rounded-full font-medium transition-colors',
    size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm',
    colorMap[category] ?? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
  )

  if (asLink) {
    return (
      <Link href={`/category/${category}`} className={classes}>
        {label}
      </Link>
    )
  }

  return <span className={classes}>{label}</span>
}
