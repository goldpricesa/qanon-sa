import Link from 'next/link'
import { getAllCategories } from '@/lib/posts'

const colorMap: Record<string, string> = {
  emali: 'bg-blue-100 text-blue-600',
  aqari: 'bg-green-100 text-green-600',
  tijari: 'bg-amber-100 text-amber-600',
  raqami: 'bg-purple-100 text-purple-600',
  madani: 'bg-rose-100 text-rose-600',
}

export default function CategoryList() {
  const categories = getAllCategories()

  return (
    <div>
      <h3 className="text-sm font-bold text-navy-800 uppercase tracking-wider mb-4 pb-2 border-b border-warm-200">
        التصنيفات
      </h3>
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat.slug}>
            <Link
              href={`/category/${cat.slug}`}
              className="flex items-center justify-between p-2.5 rounded-lg hover:bg-warm-100 transition-colors group"
            >
              <span className="text-sm text-stone-700 group-hover:text-primary-600 transition-colors font-medium">
                {cat.label}
              </span>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full ${colorMap[cat.slug] ?? 'bg-gray-100 text-gray-600'}`}
              >
                {cat.count}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
