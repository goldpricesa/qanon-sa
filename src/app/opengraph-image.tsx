import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'نظرة قانونية — مدونة قانونية سعودية متخصصة'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage:
            'linear-gradient(135deg, #0f766e 0%, #134e4a 50%, #0c1e3c 100%)',
          padding: 80,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: 'white',
          }}
        >
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              marginBottom: 24,
              letterSpacing: -2,
            }}
          >
            نظرة قانونية
          </div>
          <div
            style={{
              fontSize: 42,
              fontWeight: 400,
              opacity: 0.95,
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            مدونة قانونية سعودية متخصصة
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 400,
              opacity: 0.8,
              marginTop: 40,
              maxWidth: 900,
            }}
          >
            نظام العمل · العقارات · الشركات · القانون الرقمي · الأحوال الشخصية
          </div>
          <div
            style={{
              fontSize: 24,
              marginTop: 60,
              padding: '12px 32px',
              borderRadius: 9999,
              backgroundColor: 'rgba(255,255,255,0.15)',
              border: '2px solid rgba(255,255,255,0.3)',
            }}
          >
            qanon-sa.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
