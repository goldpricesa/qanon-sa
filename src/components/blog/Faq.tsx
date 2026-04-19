import type { FaqItem } from '@/types'

interface FaqProps {
  items: FaqItem[]
  title?: string
  className?: string
}

export default function Faq({ items, title = 'الأسئلة الشائعة', className }: FaqProps) {
  if (!items || items.length === 0) return null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <section className={'mt-12 pt-8 border-t border-warm-200 ' + (className ?? '')}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h2 className="text-2xl font-bold text-navy-800 mb-6">{title}</h2>
      <div className="space-y-4">
        {items.map((item, idx) => (
          <details
            key={idx}
            className="group bg-warm-50 rounded-xl p-5 border border-warm-200"
          >
            <summary className="font-semibold text-navy-800 cursor-pointer flex items-center justify-between gap-4">
              <span>{item.question}</span>
              <span
                aria-hidden="true"
                className="text-primary-600 group-open:rotate-180 transition-transform shrink-0"
              >
                ▼
              </span>
            </summary>
            <p className="mt-3 text-stone-700 leading-relaxed">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
