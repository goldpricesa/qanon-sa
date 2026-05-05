'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  type ConsentPreferences,
  CONSENT_STORAGE_KEY,
  parseConsentPreferences,
  serializeConsentPreferences,
} from '@/lib/consent'

interface ConsentContextValue {
  preferences: ConsentPreferences | null
  hasStoredPreference: boolean
  isBannerOpen: boolean
  savePreferences: (preferences: Omit<ConsentPreferences, 'updatedAt'>) => void
  openPreferences: () => void
  closePreferences: () => void
}

const ConsentContext = createContext<ConsentContextValue | null>(null)

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<ConsentPreferences | null>(null)
  const [hasStoredPreference, setHasStoredPreference] = useState(false)
  const [isBannerOpen, setIsBannerOpen] = useState(false)

  useEffect(() => {
    const syncFromStorage = () => {
      const stored = parseConsentPreferences(window.localStorage.getItem(CONSENT_STORAGE_KEY))
      setPreferences(stored)
      setHasStoredPreference(Boolean(stored))
      setIsBannerOpen(!stored)
    }

    syncFromStorage()

    const handleStorage = (event: StorageEvent) => {
      if (event.key === CONSENT_STORAGE_KEY) {
        syncFromStorage()
      }
    }

    const handleOpen = () => {
      setIsBannerOpen(true)
    }

    window.addEventListener('storage', handleStorage)
    window.addEventListener('consent:open-preferences', handleOpen)

    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('consent:open-preferences', handleOpen)
    }
  }, [])

  const savePreferences = useCallback(
    (nextPreferences: Omit<ConsentPreferences, 'updatedAt'>) => {
      const normalized = serializeConsentPreferences(nextPreferences)
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(normalized))
      setPreferences(normalized)
      setHasStoredPreference(true)
      setIsBannerOpen(false)
      window.dispatchEvent(new CustomEvent('consent:changed', { detail: normalized }))
    },
    []
  )

  const openPreferences = useCallback(() => {
    setIsBannerOpen(true)
  }, [])

  const closePreferences = useCallback(() => {
    if (hasStoredPreference) {
      setIsBannerOpen(false)
    }
  }, [hasStoredPreference])

  const value = useMemo(
    () => ({
      preferences,
      hasStoredPreference,
      isBannerOpen,
      savePreferences,
      openPreferences,
      closePreferences,
    }),
    [closePreferences, hasStoredPreference, isBannerOpen, openPreferences, preferences, savePreferences]
  )

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
}

export function useConsent() {
  const context = useContext(ConsentContext)
  if (!context) {
    throw new Error('useConsent must be used within ConsentProvider')
  }

  return context
}
