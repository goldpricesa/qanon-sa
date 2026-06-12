export type ConsentPreferences = {
  analytics: boolean
  ads: boolean
  updatedAt: string
}

export const CONSENT_STORAGE_KEY = 'qanon-sa-consent'

export function isConsentPreferences(value: unknown): value is ConsentPreferences {
  if (!value || typeof value !== 'object') {
    return false
  }

  const candidate = value as Record<string, unknown>
  return (
    typeof candidate.analytics === 'boolean' &&
    typeof candidate.ads === 'boolean' &&
    typeof candidate.updatedAt === 'string'
  )
}

export function parseConsentPreferences(raw: string | null): ConsentPreferences | null {
  if (!raw) {
    return null
  }

  try {
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') {
      return null
    }

    // Records stored before the ads category existed only carry `analytics`;
    // keep them valid and treat the missing ads choice as declined.
    const candidate = parsed as Record<string, unknown>
    if (typeof candidate.ads !== 'boolean') {
      candidate.ads = false
    }

    return isConsentPreferences(candidate) ? candidate : null
  } catch {
    return null
  }
}

export function serializeConsentPreferences(
  preferences: Omit<ConsentPreferences, 'updatedAt'>
): ConsentPreferences {
  return {
    ...preferences,
    updatedAt: new Date().toISOString(),
  }
}
