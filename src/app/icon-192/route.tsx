import { ImageResponse } from 'next/og'

export const runtime = 'edge'

const SIZE = 192

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
          fontSize: 128,
          fontWeight: 700,
        }}
      >
        ق
      </div>
    ),
    { width: SIZE, height: SIZE }
  )
}
