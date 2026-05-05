import { formatDate } from '@/lib/utils'
import type { SourceReference } from '@/lib/site'

interface EditorialNoteProps {
  reviewedAt?: string
  sources?: SourceReference[]
  title?: string
  note?: string
}

export default function EditorialNote({
  reviewedAt,
  sources = [],
  title = 'مراجعة تحريرية ومراجع رسمية',
  note,
}: EditorialNoteProps) {
  if (!reviewedAt && sources.length === 0 && !note) {
    return null
  }

  return (
    <section className="rounded-2xl border border-primary-100 bg-primary-50 p-5">
      <h2 className="text-base font-bold text-navy-800">{title}</h2>
      {reviewedAt && (
        <p className="mt-2 text-sm text-stone-700">
          آخر مراجعة تحريرية: <strong>{formatDate(reviewedAt)}</strong>
        </p>
      )}
      {note && <p className="mt-2 text-sm leading-relaxed text-stone-700">{note}</p>}
      {sources.length > 0 && (
        <ul className="mt-4 space-y-2 text-sm text-stone-700">
          {sources.map((source) => (
            <li key={source.url}>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary-700 underline decoration-primary-200 underline-offset-4 hover:text-primary-800"
              >
                {source.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
