'use client'

import { useEffect, useState } from 'react'
import { useConsent } from '@/components/consent/ConsentProvider'

export default function ConsentBanner() {
  const {
    preferences,
    hasStoredPreference,
    isBannerOpen,
    savePreferences,
    closePreferences,
  } = useConsent()
  const [analytics, setAnalytics] = useState(preferences?.analytics ?? false)
  const [ads, setAds] = useState(preferences?.ads ?? false)

  useEffect(() => {
    setAnalytics(preferences?.analytics ?? false)
    setAds(preferences?.ads ?? false)
  }, [preferences, isBannerOpen])

  if (!isBannerOpen) {
    return null
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-2xl border border-warm-200 bg-white p-6 shadow-2xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-xl font-bold text-navy-800">
              إعدادات القياس
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-700">
              نستخدم ملفات تعريف ارتباط وتقنيات مشابهة لقياس الأداء عبر Google Analytics
              وPlausible، وعرض إعلانات Google AdSense. عند رفض الخيارات غير الضرورية تبقى
              الإعلانات غير مخصصة ولا تُستخدم ملفات ارتباط إعلانية، ويبقى الموقع قابلاً
              للتصفح بالكامل.
            </p>
          </div>

          {hasStoredPreference && (
            <button
              type="button"
              onClick={closePreferences}
              className="self-start rounded-lg border border-warm-200 px-3 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-warm-50"
            >
              إغلاق
            </button>
          )}
        </div>

        <div className="mt-6 space-y-3">
          <label className="flex items-start gap-3 rounded-xl border border-warm-200 p-4">
            <input
              type="checkbox"
              checked={analytics}
              onChange={(event) => setAnalytics(event.target.checked)}
              className="mt-1 h-4 w-4 rounded border-warm-300 text-primary-600 focus:ring-primary-500"
            />
            <span>
              <span className="block text-sm font-semibold text-navy-800">تحليلات الاستخدام</span>
              <span className="mt-1 block text-sm leading-relaxed text-stone-600">
                تفعيل Google Analytics وPlausible لمعرفة الصفحات المقروءة وتحسين المحتوى.
              </span>
            </span>
          </label>
          <label className="flex items-start gap-3 rounded-xl border border-warm-200 p-4">
            <input
              type="checkbox"
              checked={ads}
              onChange={(event) => setAds(event.target.checked)}
              className="mt-1 h-4 w-4 rounded border-warm-300 text-primary-600 focus:ring-primary-500"
            />
            <span>
              <span className="block text-sm font-semibold text-navy-800">إعلانات مخصصة</span>
              <span className="mt-1 block text-sm leading-relaxed text-stone-600">
                السماح لـ Google AdSense باستخدام ملفات الارتباط لعرض إعلانات أكثر ملاءمة.
                عند الرفض تظهر إعلانات غير مخصصة فقط.
              </span>
            </span>
          </label>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={() => savePreferences({ analytics: true, ads: true })}
            className="rounded-xl bg-primary-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
          >
            قبول الكل
          </button>
          <button
            type="button"
            onClick={() => savePreferences({ analytics, ads })}
            className="rounded-xl border border-warm-200 px-5 py-3 text-sm font-semibold text-navy-800 transition-colors hover:bg-warm-50"
          >
            حفظ الاختيارات
          </button>
          <button
            type="button"
            onClick={() => savePreferences({ analytics: false, ads: false })}
            className="rounded-xl border border-warm-200 px-5 py-3 text-sm font-semibold text-stone-700 transition-colors hover:bg-warm-50"
          >
            رفض غير الضروري
          </button>
        </div>
      </div>
    </div>
  )
}
