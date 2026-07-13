import { ImageResponse } from 'next/og'
import { getOgFonts } from '@/lib/og-fonts'
import { RtlText } from '@/lib/og-rtl'
import { getPostBySlug } from '@/lib/posts'

export const runtime = 'nodejs'
export const alt = 'نظرة قانونية'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function OGImage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(decodeURIComponent(slug))
  const title = post?.title ?? 'نظرة قانونية'
  const category = post?.categoryLabel ?? 'مدونة قانونية'

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
            text={category}
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

        <RtlText
          text={title}
          style={{
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.3,
            maxWidth: 1040,
            letterSpacing: -1,
            alignSelf: 'flex-end',
          }}
        />

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
          <div style={{ fontSize: 26, fontWeight: 600 }}>www.qanon-sa.com</div>
        </div>
      </div>
    ),
    { ...size, fonts: await getOgFonts() }
  )
}
