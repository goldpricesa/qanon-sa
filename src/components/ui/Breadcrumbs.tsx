import Link from 'next/link'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

const SITE_URL = 'https://qanon-sa.com'

export default function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (!items || items.length === 0) return null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.label,
      ...(item.href && { item: `${SITE_URL}${item.href}` }),
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        className={
          'flex items-center gap-2 text-sm text-stone-700 ' + (className ?? '')
        }
        aria-label="مسار التنقل"
      >
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1
          return (
            <span key={`${item.label}-${idx}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-primary-600 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-stone-600 line-clamp-1">{item.label}</span>
              )}
              {!isLast && <span aria-hidden="true">‹</span>}
            </span>
          )
        })}
      </nav>
    </>
  )
}
