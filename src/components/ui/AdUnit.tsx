'use client'

import { useEffect } from 'react'

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

// Reserve vertical space per format so the inserted iframe doesn't
// shift surrounding content (CLS). Heights match AdSense recommended
// responsive ranges for each format.
const RESERVED_HEIGHT: Record<NonNullable<AdUnitProps['format']>, number> = {
  rectangle: 280,
  horizontal: 100,
  auto: 250,
}

export default function AdUnit({ slot, format = 'auto', className = '' }: AdUnitProps) {
  useEffect(() => {
    let cancelled = false
    const tryPush = () => {
      if (cancelled) return
      try {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch {}
    }
    if (document.readyState === 'complete') {
      tryPush()
    } else {
      window.addEventListener('load', tryPush, { once: true })
    }
    return () => {
      cancelled = true
      window.removeEventListener('load', tryPush)
    }
  }, [])

  const minHeight = RESERVED_HEIGHT[format]

  return (
    <div className={className} style={{ minHeight }} aria-label="إعلان">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minHeight }}
        data-ad-client="ca-pub-3611815443789107"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}
