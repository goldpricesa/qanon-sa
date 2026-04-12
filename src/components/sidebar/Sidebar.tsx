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
      <CategoryList />

      {/* Recent Posts */}
      <RecentPosts />

      {/* Ad */}
      <AdUnit slot="REPLACE_WITH_SLOT_ID" format="rectangle" />

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
