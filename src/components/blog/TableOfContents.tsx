'use client'

import { useEffect, useState } from 'react'

interface TocHeading {
  id: string
  text: string
  level: 2 | 3
}

interface TableOfContentsProps {
  containerSelector?: string
}

function slugifyArabic(text: string): string {
  return text
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u0600-\u06FF-]/g, '')
    .toLowerCase()
}

export default function TableOfContents({
  containerSelector = '[data-article-content]',
}: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TocHeading[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const container = document.querySelector(containerSelector)
    if (!container) return

    const nodes = Array.from(
      container.querySelectorAll<HTMLHeadingElement>('h2, h3')
    )

    const items: TocHeading[] = nodes.map((node, idx) => {
      if (!node.id) {
        const base = slugifyArabic(node.textContent ?? '')
        node.id = base ? `${base}-${idx}` : `section-${idx}`
      }
      return {
        id: node.id,
        text: node.textContent?.trim() ?? '',
        level: node.tagName === 'H3' ? 3 : 2,
      }
    })

    setHeadings(items)

    if (items.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '0px 0px -70% 0px', threshold: [0, 1] }
    )

    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [containerSelector])

  if (headings.length < 3) return null

  return (
    <nav
      aria-label="جدول المحتويات"
      className="bg-warm-50 border border-warm-200 rounded-xl mb-8 lg:sticky lg:top-24"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-3 font-semibold text-navy-800 lg:pointer-events-none"
        aria-expanded={open}
      >
        <span>جدول المحتويات</span>
        <span
          aria-hidden="true"
          className={'transition-transform lg:hidden ' + (open ? 'rotate-180' : '')}
        >
          ▼
        </span>
      </button>
      <ol
        className={
          'px-5 pb-4 space-y-2 text-sm max-h-96 overflow-y-auto ' +
          (open ? 'block' : 'hidden lg:block')
        }
      >
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? 'mr-4' : ''}>
            <a
              href={`#${h.id}`}
              onClick={() => setOpen(false)}
              className={
                'block border-r-2 pr-3 py-1 transition-colors ' +
                (activeId === h.id
                  ? 'border-primary-600 text-primary-700 font-medium'
                  : 'border-transparent text-stone-700 hover:text-primary-600 hover:border-warm-300')
              }
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
