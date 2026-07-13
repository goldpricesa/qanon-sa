import { ImageResponse } from 'next/og'
import { getOgFonts } from '@/lib/og-fonts'
import { RtlText } from '@/lib/og-rtl'
import { getAuthorBySlug } from '@/data/authors'

export const runtime = 'nodejs'
export const alt = 'نظرة قانونية'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function OGImage({ params }: Props) {
  const { slug } = await params
  const author = getAuthorBySlug(slug)
  const name = author?.name ?? 'كاتب'
  const role = author?.title ?? 'محامي مرخص'

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
            text="الكاتب"
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
            text={name}
            style={{
              fontSize: 84,
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 1.15,
              maxWidth: 1040,
            }}
          />
          <RtlText text={role} style={{ fontSize: 36, opacity: 0.85, maxWidth: 1040 }} />
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
