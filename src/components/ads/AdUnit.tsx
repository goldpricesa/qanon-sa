'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { ADSENSE_PUBLISHER_ID } from '@/lib/site'

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

interface AdUnitProps {
  slot: string
  className?: string
  minHeight?: number
}

export default function AdUnit({ slot, className, minHeight = 280 }: AdUnitProps) {
  const insRef = useRef<HTMLModElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const ins = insRef.current
    if (!ins) {
      return
    }

    // AdSense marks filled elements with data-ad-status; pushing again on the
    // same element (e.g. StrictMode double-effect) throws "already have ads".
    if (ins.getAttribute('data-ad-status') || ins.getAttribute('data-adsbygoogle-status')) {
      return
    }

    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {
      // Loader blocked or not yet available; keep the reserved space silent.
    }
  }, [pathname])

  return (
    <div className={className} style={{ minHeight }}>
      <ins
        key={pathname}
        ref={insRef}
        className="adsbygoogle"
        style={{ display: 'block', minHeight }}
        data-ad-client={ADSENSE_PUBLISHER_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
