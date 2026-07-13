import { ImageResponse } from 'next/og'
import { getOgFonts } from '@/lib/og-fonts'
import { RtlText } from '@/lib/og-rtl'
import { getAllCategories, getPostsByCategory } from '@/lib/posts'

export const runtime = 'nodejs'
export const alt = 'نظرة قانونية'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function OGImage({ params }: Props) {
  const { slug: rawSlug } = await params
  const slug = decodeURIComponent(rawSlug)
  const cat = getAllCategories().find((c) => c.slug === slug)
  const label = cat?.label ?? slug
  const count = cat ? cat.count : getPostsByCategory(slug).length
  // "قانون أحوال شخصية" صياغة ركيكة؛ التسمية وحدها تكفي لهذا التصنيف.
  const heading = slug === 'أحوال-شخصية' ? label : `قانون ${label}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundImage:
            'linear-gradient(135deg, #0f766e 0%, #134e4a 50%, #0c1e3c 100%)',
          padding: 80,
          color: 'white',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <RtlText
            text="تصنيف"
            style={{
              fontSize: 32,
              fontWeight: 700,
              padding: '8px 24px',
              borderRadius: 9999,
              backgroundColor: 'rgba(255,255,255,0.18)',
              border: '2px solid rgba(255,255,255,0.35)',
            }}
          />
          <RtlText text="نظرة قانونية" style={{ fontSize: 28, opacity: 0.9, fontWeight: 600 }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 20 }}>
          <RtlText
            text={heading}
            style={{
              fontSize: 96,
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 1.1,
            }}
          />
          <RtlText text={`${count} مقال متخصص`} style={{ fontSize: 36, opacity: 0.85 }} />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '2px solid rgba(255,255,255,0.25)',
            paddingTop: 30,
          }}
        >
          <RtlText text="مدونة قانونية سعودية متخصصة" style={{ fontSize: 26, opacity: 0.85 }} />
          <div style={{ fontSize: 26, fontWeight: 600 }}>qanon-sa.com</div>
        </div>
      </div>
    ),
    { ...size, fonts: await getOgFonts() }
  )
}
