import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllAuthors, getAuthorBySlug } from '@/data/authors'
import { getAllPosts } from '@/lib/posts'
import BlogCard from '@/components/blog/BlogCard'
import AuthorCard from '@/components/blog/AuthorCard'
import Breadcrumbs from '@/components/ui/Breadcrumbs'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return getAllAuthors()
    .filter((a) => a.slug)
    .map((a) => ({ slug: a.slug! }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const author = getAuthorBySlug(params.slug)
  if (!author) return {}

  const url = `https://qanon-sa.com/author/${author.slug}`
  const title = `${author.name} — ${author.title}`
  const description = author.bio ?? `مقالات الكاتب ${author.name} — ${author.title} على مدونة نظرة قانونية.`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'profile',
      url,
      title,
      description,
      locale: 'ar_SA',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  }
}

export default function AuthorPage({ params }: Props) {
  const author = getAuthorBySlug(params.slug)
  if (!author) notFound()

  const posts = getAllPosts().filter((p) => p.author.slug === author.slug)
  const url = `https://qanon-sa.com/author/${author.slug}`

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${url}#person`,
    name: author.name,
    jobTitle: author.title,
    ...(author.bio && { description: author.bio }),
    ...(author.alumniOf && {
      alumniOf: { '@type': 'EducationalOrganization', name: author.alumniOf },
    }),
    ...(author.expertise && { knowsAbout: author.expertise }),
    ...(author.email && { email: author.email }),
    ...(author.telephone && { telephone: author.telephone }),
    ...(author.sameAs && author.sameAs.length > 0 && { sameAs: author.sameAs }),
    url,
    worksFor: { '@id': 'https://qanon-sa.com/#organization' },
    inLanguage: 'ar',
  }

  const profilePageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: { '@id': `${url}#person` },
    url,
    inLanguage: 'ar',
    name: `${author.name} — ${author.title}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          className="mb-8"
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'الكتّاب', href: '/author' },
            { label: author.name },
          ]}
        />

        <AuthorCard author={author} variant="full" />

        {(author.email || author.telephone) && (
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            {author.telephone && (
              <a
                href={`tel:${author.telephone}`}
                className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                📞 {author.telephone}
              </a>
            )}
            {author.email && (
              <a
                href={`mailto:${author.email}`}
                className="inline-flex items-center gap-2 bg-white text-navy-800 px-4 py-2 rounded-lg border border-warm-200 hover:bg-warm-100 transition-colors"
              >
                ✉️ {author.email}
              </a>
            )}
          </div>
        )}

        <section className="mt-12">
          <h2 className="text-xl font-bold text-navy-800 mb-6">
            مقالات الكاتب ({posts.length})
          </h2>
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          ) : (
            <div className="bg-warm-50 border border-warm-200 rounded-xl p-8 text-center text-stone-700">
              لا توجد مقالات منشورة حالياً لهذا الكاتب.
              <div className="mt-3">
                <Link href="/" className="text-primary-600 hover:text-primary-700 font-medium">
                  العودة إلى الرئيسية ←
                </Link>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  )
}
