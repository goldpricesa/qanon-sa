import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllAuthors } from '@/data/authors'
import { getAllPosts } from '@/lib/posts'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { SITE_NAME, getAbsoluteUrl } from '@/lib/site'

const url = getAbsoluteUrl('/author')
const title = 'الكتّاب'
const description = 'تعرف على الكتّاب والمراجعين التحريريين المشاركين في محتوى نظرة قانونية.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    type: 'website',
    url,
    title,
    description,
    locale: 'ar_SA',
  },
}

export default function AuthorsPage() {
  const authors = getAllAuthors().filter((author) => author.slug)
  const posts = getAllPosts()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${SITE_NAME} — ${title}`,
    description,
    url,
    inLanguage: 'ar-SA',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs
          className="mb-6"
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: title },
          ]}
        />

        <h1 className="font-display text-3xl font-bold text-navy-800">{title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone-700">
          صفحة تعريفية بالكتّاب والمراجعين التحريريين المشاركين في نشر ومراجعة المحتوى
          القانوني على الموقع.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {authors.map((author) => {
            const postsCount = posts.filter((post) => post.author.slug === author.slug).length

            return (
              <article
                key={author.slug}
                className="rounded-2xl border border-warm-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xl font-bold text-primary-700">
                    {author.name
                      .split(' ')
                      .slice(0, 2)
                      .map((word) => word.charAt(0))
                      .join('')}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-navy-800">{author.name}</h2>
                    <p className="mt-1 text-sm text-stone-700">{author.title}</p>
                    {author.credential && (
                      <p className="mt-2 inline-flex rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
                        {author.credential}
                      </p>
                    )}
                  </div>
                </div>

                {author.bio && (
                  <p className="mt-4 text-sm leading-relaxed text-stone-700">{author.bio}</p>
                )}

                {author.expertise && author.expertise.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {author.expertise.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-warm-200 bg-warm-50 px-3 py-1 text-xs text-stone-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm text-stone-600">{postsCount} مقال</span>
                  <Link
                    href={`/author/${author.slug}`}
                    className="text-sm font-medium text-primary-600 transition-colors hover:text-primary-700"
                  >
                    عرض الصفحة الشخصية ←
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </>
  )
}
