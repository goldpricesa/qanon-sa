import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-6xl font-bold text-navy-800 mb-4">404</h1>
      <p className="text-lg text-stone-700 mb-8">
        الصفحة المطلوبة غير موجودة أو تم نقلها.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium text-sm transition-colors"
      >
        العودة للرئيسية
        <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </Link>
    </div>
  )
}
