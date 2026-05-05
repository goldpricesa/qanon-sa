'use client'

import { cn } from '@/lib/utils'
import { useConsent } from '@/components/consent/ConsentProvider'

interface ConsentSettingsButtonProps {
  className?: string
}

export default function ConsentSettingsButton({
  className,
}: ConsentSettingsButtonProps) {
  const { openPreferences } = useConsent()

  return (
    <button
      type="button"
      onClick={openPreferences}
      className={cn(
        'text-sm font-medium text-primary-600 transition-colors hover:text-primary-700',
        className
      )}
    >
      إعدادات التتبع
    </button>
  )
}
