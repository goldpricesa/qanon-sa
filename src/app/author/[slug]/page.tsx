import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllAuthors, getAuthorBySlug } from '@/data/authors'
import { getAllPosts } from '@/lib/posts'
import BlogCard from '@/components/blog/BlogCard'
import AuthorCard from '@/components/blog/AuthorCard'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { SITE_PHONE_DISPLAY, SITE_PHONE_TEL, SITE_URL, SITE_WHATSAPP_URL, getAbsoluteUrl } from '@/lib/site'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllAuthors()
    .filter((author) => author.slug)
    .map((author) => ({ slug: author.slug! }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const author = getAuthorBySlug(slug)
  if (!author) {
    return {}
  }

  const url = getAbsoluteUrl(`/author/${author.slug}`)
  const title = `${author.name} — ${author.title}`
  const description =
    author.bio ?? `مقالات الكاتب ${author.name} — ${author.title} على مدونة نظرة قانونية.`

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

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params
  const author = getAuthorBySlug(slug)
  if (!author) {
    notFound()
  }

  const posts = getAllPosts().filter((post) => post.author.slug === author.slug)
  const url = getAbsoluteUrl(`/author/${author.slug}`)

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
    ...(author.sameAs && author.sameAs.length > 0 && { sameAs: author.sameAs }),
    url,
    worksFor: { '@id': `${SITE_URL}/#organization` },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }} />

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

        <div className="mt-6 rounded-2xl border border-warm-200 bg-white p-5">
          <h2 className="text-base font-bold text-navy-800">قناة التواصل التحريري</h2>
          <p className="mt-2 text-sm leading-relaxed text-stone-700">
            لا ننشر وسائل اتصال شخصية للكتّاب في الصفحة العامة. للملاحظات التحريرية أو طلبات
            التصحيح أو الاستفسارات العامة، تواصل عبر{' '}
            <a href={`tel:${SITE_PHONE_TEL}`} className="font-medium text-primary-600 hover:underline">
              {SITE_PHONE_DISPLAY}
            </a>{' '}
            أو عبر{' '}
            <a
              href={SITE_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary-600 hover:underline"
            >
              واتساب
            </a>{' '}
            أو من خلال{' '}
            <Link href="/contact" className="font-medium text-primary-600 hover:underline">
              صفحة التواصل
            </Link>
            .
          </p>
        </div>

        <section className="mt-12">
          <h2 className="mb-6 text-xl font-bold text-navy-800">مقالات الكاتب ({posts.length})</h2>
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-warm-200 bg-warm-50 p-8 text-center text-stone-700">
              لا توجد مقالات منشورة حاليًا لهذا الكاتب.
              <div className="mt-3">
                <Link href="/" className="font-medium text-primary-600 hover:text-primary-700">
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
