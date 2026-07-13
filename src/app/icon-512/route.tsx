import { ImageResponse } from 'next/og'
import { getOgFonts } from '@/lib/og-fonts'

export const runtime = 'nodejs'

const SIZE = 512

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f766e 0%, #0c1e3c 100%)',
          color: 'white',
          fontSize: 340,
          fontWeight: 700,
        }}
      >
        ق
      </div>
    ),
    { width: SIZE, height: SIZE, fonts: await getOgFonts() }
  )
}
