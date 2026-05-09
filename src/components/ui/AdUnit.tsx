'use client'

import { useEffect } from 'react'
import { useConsent } from '@/components/consent/ConsentProvider'
import { ADSENSE_CLIENT } from '@/lib/site'

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

interface AdUnitProps {
  slot: string
  format?: 'auto' | 'rectangle' | 'horizontal'
  className?: string
}

export default function AdUnit({ slot, format = 'auto', className = '' }: AdUnitProps) {
  const { preferences } = useConsent()

  useEffect(() => {
    if (!preferences?.ads) {
      return
    }

    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {}
  }, [preferences?.ads])

  if (!preferences?.ads) {
    return null
  }

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}
