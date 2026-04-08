import SearchBar from '@/components/ui/SearchBar'
import CategoryList from './CategoryList'
import RecentPosts from './RecentPosts'

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

      {/* Newsletter CTA */}
      <div className="bg-primary-50 rounded-xl p-5 border border-primary-100">
        <h3 className="text-sm font-bold text-navy-800 mb-2">ابقَ على اطلاع</h3>
        <p className="text-xs text-stone-500 mb-4 leading-relaxed">
          اشترك لتصلك أحدث المقالات القانونية السعودية مباشرةً إلى بريدك.
        </p>
        <div className="flex flex-col gap-2">
          <input
            type="email"
            placeholder="بريدك الإلكتروني"
            className="w-full px-3 py-2 text-sm rounded-lg border border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-300 bg-white"
            aria-label="البريد الإلكتروني"
          />
          <button
            type="button"
            className="w-full bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium py-2 rounded-lg transition-colors"
          >
            اشتراك
          </button>
        </div>
      </div>
    </aside>
  )
}
