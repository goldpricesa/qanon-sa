import Link from 'next/link'
import SearchBar from '@/components/ui/SearchBar'
import CategoryList from './CategoryList'
import RecentPosts from './RecentPosts'
import AdUnit from '@/components/ui/AdUnit'

export default function Sidebar() {
  return (
    <aside className="space-y-8">
      {/* Search */}
      <div>
        <h3 className="text-sm font-bold text-navy-800 uppercase tracking-wider mb-4 pb-2 border-b border-warm-200">
          بحث
        </h3>
        <SearchBar />
      </div>

      {/* Categories */}
      <CategoryList />h

      {/* Recent Posts */}
      <RecentPosts />

      {/* Ad */}
      <AdUnit slot="5398524309" format="rectangle" />

      {/* Calculator Promo */}
      <Link href="/calculator" className="block group">
        <div className="bg-primary-500 hover:bg-primary-600 transition-colors text-white rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 13h.01M13 13h.01M13 17h.01M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
            </svg>
            <h3 className="text-sm font-bold">حاسبة المستحقات العمالية</h3>
          </div>
          <p className="text-xs text-primary-100 leading-relaxed mb-3">
            احسب مكافأة نهاية الخدمة، رصيد إجازاتك، وتذاكر السفر وفق نظام العمل السعودي
          </p>
          <span className="inline-flex items-center gap-1 text-xs font-semibold bg-white text-primary-600 px-3 py-1.5 rounded-full group-hover:bg-primary-50 transition-colors">
            احسب الآن
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </span>
        </div>
      </Link>

      {/* Advisory */}
      <div className="bg-primary-50 rounded-xl p-5 border border-primary-100">
        <h3 className="text-sm font-bold text-navy-800 mb-2">تنبيه مهم</h3>
        <p className="text-sm text-stone-600 leading-relaxed">
          محتوى الموقع للتوعية العامة فقط، وقد تختلف النتيجة القانونية بحسب تفاصيل كل حالة.
          عند وجود نزاع أو التزام مالي أو إجراء رسمي، استشر محاميًا مرخصًا قبل اتخاذ أي خطوة.
        </p>
      </div>
    </aside>
  )
}
