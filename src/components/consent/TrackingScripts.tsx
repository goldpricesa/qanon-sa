'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { useConsent } from '@/components/consent/ConsentProvider'
import { GA_MEASUREMENT_ID, PLAUSIBLE_DOMAIN } from '@/lib/site'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export default function TrackingScripts() {
  const { preferences } = useConsent()
  const analyticsEnabled = preferences?.analytics ?? false

  useEffect(() => {
    if (typeof window.gtag !== 'function') {
      return
    }

    window.gtag('consent', 'update', {
      analytics_storage: analyticsEnabled ? 'granted' : 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    })
  }, [analyticsEnabled])

  return (
    <>
      {analyticsEnabled && (
        <>
          <Script
            id="ga-loader"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-config" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = window.gtag || gtag;
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                anonymize_ip: true,
                send_page_view: true
              });
            `}
          </Script>
          <Script
            id="plausible-loader"
            strategy="lazyOnload"
            defer
            data-domain={PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
          />
        </>
      )}

    </>
  )
}
