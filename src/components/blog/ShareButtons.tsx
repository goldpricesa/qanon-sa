'use client'

import { useState } from 'react'

interface ShareButtonsProps {
  url: string
  title: string
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle')

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopyState('copied')
      setTimeout(() => setCopyState('idle'), 2000)
    } catch {
      setCopyState('error')
      setTimeout(() => setCopyState('idle'), 3000)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const btn =
    'inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors border'

  return (
    <div className="flex flex-wrap gap-2 print:hidden">
      <a
        href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btn} bg-green-600 text-white border-green-600 hover:bg-green-700`}
        aria-label="مشاركة عبر واتساب"
      >
        واتساب
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btn} bg-sky-500 text-white border-sky-500 hover:bg-sky-600`}
        aria-label="مشاركة عبر تويتر"
      >
        تويتر
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btn} bg-blue-700 text-white border-blue-700 hover:bg-blue-800`}
        aria-label="مشاركة عبر لينكدإن"
      >
        لينكدإن
      </a>
      <button
        type="button"
        onClick={handleCopy}
        className={`${btn} bg-white text-navy-800 border-warm-300 hover:bg-warm-100`}
        aria-label="نسخ الرابط"
        aria-live="polite"
      >
        {copyState === 'copied'
          ? 'تم النسخ ✓'
          : copyState === 'error'
            ? 'تعذر النسخ — انسخه يدوياً'
            : 'نسخ الرابط'}
      </button>
      <button
        type="button"
        onClick={handlePrint}
        className={`${btn} bg-white text-navy-800 border-warm-300 hover:bg-warm-100`}
        aria-label="طباعة المقال"
      >
        طباعة
      </button>
    </div>
  )
}
