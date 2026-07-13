import { ImageResponse } from 'next/og'
import { getOgFonts } from '@/lib/og-fonts'

export const runtime = 'nodejs'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default async function AppleIcon() {
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
          fontSize: 110,
          fontWeight: 700,
          borderRadius: 36,
        }}
      >
        ق
      </div>
    ),
    { ...size, fonts: await getOgFonts() }
  )
}
