'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

// ─── Utility ──────────────────────────────────────────────────────────────────

function formatSAR(amount: number): string {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: 'SAR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

function round2(n: number): number {
  return Math.round(n * 100) / 100
}

// ─── Types ────────────────────────────────────────────────────────────────────

type TabId = 'eos' | 'vacation' | 'salary' | 'tickets'
type EosReason = 'terminate' | 'resign' | 'forcemajeure' | 'female'

interface EosResult {
  yearsDisplay: string
  grossBenefit: number
  factor: number
  finalBenefit: number
  breakdown: { label: string; value: string }[]
}

interface VacationResult {
  annualEntitlement: number
  dailyRate: number
  totalAmount: number
}

interface SalaryResult {
  daysWorked: number
  dailyRate: number
  amount: number
}

interface TicketResult {
  totalAmount: number
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function InputField({
  id,
  label,
  type = 'number',
  value,
  onChange,
  placeholder,
  error,
  min,
  step,
}: {
  id: string
  label: string
  type?: 'number' | 'date'
  value: string
  onChange: (v: string) => void
  placeholder?: string
  error?: string
  min?: string
  step?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-navy-800">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        min={min ?? '0'}
        step={step}
        dir={type === 'date' ? 'ltr' : undefined}
        className="w-full px-4 py-2.5 text-sm rounded-lg border border-warm-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 transition-colors"
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

function ResultCard({ items, total, totalLabel }: {
  items: { label: string; value: string }[]
  total: string
  totalLabel: string
}) {
  return (
    <div className="mt-6 bg-primary-50 border border-primary-100 rounded-xl p-6">
      <h3 className="text-base font-bold text-navy-800 mb-4 flex items-center gap-2">
        <span className="inline-flex w-6 h-6 bg-primary-500 text-white rounded-full items-center justify-center text-xs">✓</span>
        نتيجة الحساب
      </h3>
      <dl className="space-y-2">
        {items.map((item) => (
          <div key={item.label} className="flex justify-between items-center py-2 border-b border-primary-100 last:border-0">
            <dt className="text-sm text-stone-600">{item.label}</dt>
            <dd className="text-sm font-semibold text-navy-800">{item.value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-4 p-4 bg-primary-500 text-white rounded-lg flex justify-between items-center">
        <span className="text-sm font-medium">{totalLabel}</span>
        <span className="text-lg font-bold">{total}</span>
      </div>
    </div>
  )
}

function ActionButtons({ onCalculate, onReset }: { onCalculate: () => void; onReset: () => void }) {
  return (
    <div className="mt-6 flex flex-col gap-2">
      <button
        type="button"
        onClick={onCalculate}
        className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium text-sm transition-colors"
      >
        احسب الآن
      </button>
      <button
        type="button"
        onClick={onReset}
        className="w-full bg-white border border-warm-200 hover:bg-warm-50 text-stone-700 py-2.5 rounded-lg font-medium text-sm transition-colors"
      >
        مسح البيانات
      </button>
    </div>
  )
}

// ─── EOS Calculator ───────────────────────────────────────────────────────────

function EosCalculator() {
  const [salary, setSalary] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [reason, setReason] = useState<EosReason>('terminate')
  const [result, setResult] = useState<EosResult | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function handleCalculate() {
    const errs: Record<string, string> = {}
    const sal = parseFloat(salary)
    if (!salary || isNaN(sal) || sal <= 0) errs.salary = 'يرجى إدخال راتب صحيح'
    if (!startDate) errs.startDate = 'يرجى تحديد تاريخ بدء الخدمة'
    if (!endDate) errs.endDate = 'يرجى تحديد تاريخ انهاء الخدمة'
    if (startDate && endDate && new Date(startDate) >= new Date(endDate))
      errs.endDate = 'تاريخ الانتهاء يجب أن يكون بعد تاريخ البدء'
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    const start = new Date(startDate)
    const end = new Date(endDate)
    const totalDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    const totalYears = totalDays / 365.25

    const wholeYears = Math.floor(totalYears)
    const remainderMonths = Math.round((totalYears - wholeYears) * 12)
    const yearsDisplay =
      remainderMonths > 0
        ? `${wholeYears} سنة و${remainderMonths} شهر`
        : `${wholeYears} سنة`

    // Gross benefit (المادة 84)
    let grossBenefit: number
    if (totalYears <= 5) {
      grossBenefit = sal * 0.5 * totalYears
    } else {
      grossBenefit = sal * 0.5 * 5 + sal * 1.0 * (totalYears - 5)
    }
    grossBenefit = round2(grossBenefit)

    // Factor (المادة 85 + 87)
    let factor = 1
    let factorLabel = '100٪ (كامل المكافأة)'
    if (reason === 'resign') {
      if (totalYears < 2) {
        factor = 0
        factorLabel = '0٪ — أقل من سنتين لا يستحق مكافأة'
      } else if (totalYears < 5) {
        factor = 1 / 3
        factorLabel = '٪33.33 — الثلث (استقالة بعد 2–5 سنوات)'
      } else if (totalYears < 10) {
        factor = 2 / 3
        factorLabel = '٪66.67 — الثلثان (استقالة بعد 5–10 سنوات)'
      } else {
        factor = 1
        factorLabel = '100٪ — كامل المكافأة (استقالة بعد 10 سنوات فأكثر)'
      }
    } else if (reason === 'terminate') {
      factorLabel = '100٪ — كامل المكافأة (فصل من صاحب العمل)'
    } else if (reason === 'forcemajeure') {
      factorLabel = '100٪ — كامل المكافأة (قوة قاهرة — م.87)'
    } else if (reason === 'female') {
      factorLabel = '100٪ — كامل المكافأة (زواج/وضع — م.87)'
    }

    const finalBenefit = round2(grossBenefit * factor)

    const breakdown: { label: string; value: string }[] = [
      { label: 'مدة الخدمة', value: yearsDisplay },
      { label: 'الاستحقاق عن الخمس سنوات الأولى', value: formatSAR(round2(sal * 0.5 * Math.min(totalYears, 5))) },
    ]
    if (totalYears > 5) {
      breakdown.push({ label: 'الاستحقاق عن السنوات التالية', value: formatSAR(round2(sal * (totalYears - 5))) })
    }
    breakdown.push(
      { label: 'إجمالي الاستحقاق (قبل سبب الإنهاء)', value: formatSAR(grossBenefit) },
      { label: 'نسبة الاستحقاق', value: factorLabel },
    )

    setResult({ yearsDisplay, grossBenefit, factor, finalBenefit, breakdown })
  }

  function handleReset() {
    setSalary(''); setStartDate(''); setEndDate(''); setReason('terminate')
    setResult(null); setErrors({})
  }

  return (
    <div>
      <p className="text-sm text-stone-600 mb-6 leading-relaxed">
        تحسب وفق <strong>المادة 84 و85 و87</strong> من نظام العمل السعودي — نصف شهر عن كل سنة من الخمس الأولى، وشهر كامل عن كل سنة تالية.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField id="eos-salary" label="الراتب الأساسي الشهري (ريال)" value={salary} onChange={setSalary} placeholder="مثال: 5000" error={errors.salary} />
        <div className="flex flex-col gap-1.5">
          <label htmlFor="eos-reason" className="text-sm font-medium text-navy-800">سبب إنهاء الخدمة</label>
          <select
            id="eos-reason"
            value={reason}
            onChange={(e) => setReason(e.target.value as EosReason)}
            className="w-full px-4 py-2.5 text-sm rounded-lg border border-warm-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 transition-colors"
          >
            <option value="terminate">فصل من قِبَل صاحب العمل</option>
            <option value="resign">استقالة</option>
            <option value="forcemajeure">قوة قاهرة (م.87)</option>
            <option value="female">إنهاء عقد بسبب الزواج أو الوضع (م.87)</option>
          </select>
        </div>
        <InputField id="eos-start" label="تاريخ بدء الخدمة" type="date" value={startDate} onChange={setStartDate} error={errors.startDate} />
        <InputField id="eos-end" label="تاريخ انتهاء الخدمة" type="date" value={endDate} onChange={setEndDate} error={errors.endDate} />
      </div>
      <ActionButtons onCalculate={handleCalculate} onReset={handleReset} />
      {result && (
        <ResultCard
          items={result.breakdown}
          total={formatSAR(result.finalBenefit)}
          totalLabel="صافي مكافأة نهاية الخدمة"
        />
      )}
    </div>
  )
}

// ─── Vacation Calculator ──────────────────────────────────────────────────────

function VacationCalculator() {
  const [salary, setSalary] = useState('')
  const [years, setYears] = useState('')
  const [days, setDays] = useState('')
  const [result, setResult] = useState<VacationResult | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function handleCalculate() {
    const errs: Record<string, string> = {}
    const sal = parseFloat(salary)
    const yrs = parseFloat(years)
    const d = parseFloat(days)
    if (!salary || isNaN(sal) || sal <= 0) errs.salary = 'يرجى إدخال راتب صحيح'
    if (!years || isNaN(yrs) || yrs < 0) errs.years = 'يرجى إدخال سنوات الخدمة'
    if (!days || isNaN(d) || d < 0) errs.days = 'يرجى إدخال رصيد الإجازات'
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    const annualEntitlement = yrs >= 5 ? 30 : 21
    const dailyRate = round2(sal / 30)
    const totalAmount = round2(d * dailyRate)
    setResult({ annualEntitlement, dailyRate, totalAmount })
  }

  function handleReset() {
    setSalary(''); setYears(''); setDays('')
    setResult(null); setErrors({})
  }

  return (
    <div>
      <p className="text-sm text-stone-600 mb-6 leading-relaxed">
        الإجازة السنوية: <strong>21 يوماً</strong> لمن خدمته أقل من 5 سنوات، و<strong>30 يوماً</strong> لمن خدمته 5 سنوات فأكثر. الأجر اليومي = الراتب ÷ 30.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField id="vac-salary" label="الراتب الشهري (ريال)" value={salary} onChange={setSalary} placeholder="مثال: 5000" error={errors.salary} />
        <InputField id="vac-years" label="سنوات الخدمة" value={years} onChange={setYears} placeholder="مثال: 3" error={errors.years} step="0.5" />
        <InputField id="vac-days" label="رصيد الإجازات المتبقي (أيام)" value={days} onChange={setDays} placeholder="مثال: 25" error={errors.days} />
      </div>
      <ActionButtons onCalculate={handleCalculate} onReset={handleReset} />
      {result && (
        <ResultCard
          items={[
            { label: 'الإجازة السنوية المستحقة', value: `${result.annualEntitlement} يوماً في السنة` },
            { label: 'الأجر اليومي', value: formatSAR(result.dailyRate) },
            { label: 'رصيد الإجازات المتبقي', value: `${days} يوم` },
          ]}
          total={formatSAR(result.totalAmount)}
          totalLabel="إجمالي بدل رصيد الإجازات"
        />
      )}
    </div>
  )
}

// ─── Salary Calculator ────────────────────────────────────────────────────────

function SalaryCalculator() {
  const [salary, setSalary] = useState('')
  const [monthStart, setMonthStart] = useState('')
  const [lastDay, setLastDay] = useState('')
  const [result, setResult] = useState<SalaryResult | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function handleCalculate() {
    const errs: Record<string, string> = {}
    const sal = parseFloat(salary)
    if (!salary || isNaN(sal) || sal <= 0) errs.salary = 'يرجى إدخال راتب صحيح'
    if (!monthStart) errs.monthStart = 'يرجى تحديد تاريخ بداية الشهر'
    if (!lastDay) errs.lastDay = 'يرجى تحديد آخر يوم عمل'
    if (monthStart && lastDay && new Date(lastDay) < new Date(monthStart))
      errs.lastDay = 'آخر يوم عمل يجب أن يكون بعد بداية الشهر'
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    const start = new Date(monthStart)
    const end = new Date(lastDay)
    const daysWorked = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
    const dailyRate = round2(sal / 30)
    const amount = round2(daysWorked * dailyRate)
    setResult({ daysWorked, dailyRate, amount })
  }

  function handleReset() {
    setSalary(''); setMonthStart(''); setLastDay('')
    setResult(null); setErrors({})
  }

  return (
    <div>
      <p className="text-sm text-stone-600 mb-6 leading-relaxed">
        يُحسب الأجر اليومي بقسمة الراتب على <strong>30 يوماً</strong> وفق نظام العمل السعودي، بصرف النظر عن عدد أيام الشهر الفعلية.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField id="sal-salary" label="الراتب الشهري (ريال)" value={salary} onChange={setSalary} placeholder="مثال: 5000" error={errors.salary} />
        <InputField id="sal-start" label="تاريخ بداية الراتب (أول الشهر)" type="date" value={monthStart} onChange={setMonthStart} error={errors.monthStart} />
        <InputField id="sal-end" label="آخر يوم عمل" type="date" value={lastDay} onChange={setLastDay} error={errors.lastDay} />
      </div>
      <ActionButtons onCalculate={handleCalculate} onReset={handleReset} />
      {result && (
        <ResultCard
          items={[
            { label: 'عدد أيام العمل', value: `${result.daysWorked} يوم` },
            { label: 'الأجر اليومي', value: formatSAR(result.dailyRate) },
          ]}
          total={formatSAR(result.amount)}
          totalLabel="الراتب المستحق عن الفترة"
        />
      )}
    </div>
  )
}

// ─── Tickets Calculator ───────────────────────────────────────────────────────

function TicketsCalculator() {
  const [ticketValue, setTicketValue] = useState('')
  const [members, setMembers] = useState('')
  const [yearsStr, setYearsStr] = useState('')
  const [result, setResult] = useState<TicketResult | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function handleCalculate() {
    const errs: Record<string, string> = {}
    const tv = parseFloat(ticketValue)
    const m = parseInt(members)
    const y = Math.floor(parseFloat(yearsStr))
    if (!ticketValue || isNaN(tv) || tv <= 0) errs.ticketValue = 'يرجى إدخال قيمة التذكرة'
    if (!members || isNaN(m) || m < 1) errs.members = 'العدد يجب أن يكون 1 على الأقل'
    if (!yearsStr || isNaN(y) || y < 0) errs.years = 'يرجى إدخال عدد السنوات'
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    const totalAmount = round2(tv * m * y)
    setResult({ totalAmount })
  }

  function handleReset() {
    setTicketValue(''); setMembers(''); setYearsStr('')
    setResult(null); setErrors({})
  }

  const wholeYears = Math.floor(parseFloat(yearsStr) || 0)

  return (
    <div>
      <p className="text-sm text-stone-600 mb-6 leading-relaxed">
        يُحسب بدل تذاكر السفر بضرب قيمة التذكرة في عدد الأفراد المشمولين وعدد السنوات المستحقة. تُحتسب <strong>السنوات الكاملة فقط</strong>.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField id="tkt-value" label="قيمة تذكرة السفر للفرد (ريال)" value={ticketValue} onChange={setTicketValue} placeholder="مثال: 1500" error={errors.ticketValue} />
        <InputField id="tkt-members" label="عدد الأفراد المشمولين (يشمل الموظف)" value={members} onChange={setMembers} placeholder="مثال: 3" min="1" error={errors.members} />
        <div className="flex flex-col gap-1.5">
          <InputField id="tkt-years" label="عدد السنوات منذ آخر استخدام للتذكرة" value={yearsStr} onChange={setYearsStr} placeholder="مثال: 2" step="0.5" error={errors.years} />
          {yearsStr && parseFloat(yearsStr) !== wholeYears && (
            <p className="text-xs text-amber-600">سيُحتسب {wholeYears} سنة كاملة فقط</p>
          )}
        </div>
      </div>
      <ActionButtons onCalculate={handleCalculate} onReset={handleReset} />
      {result && (
        <ResultCard
          items={[
            { label: 'قيمة التذكرة للفرد', value: formatSAR(parseFloat(ticketValue)) },
            { label: 'عدد الأفراد', value: `${members} أفراد` },
            { label: 'عدد السنوات المستحقة', value: `${wholeYears} سنة` },
          ]}
          total={formatSAR(result.totalAmount)}
          totalLabel="إجمالي بدل تذاكر السفر"
        />
      )}
    </div>
  )
}

// ─── Disclaimer ───────────────────────────────────────────────────────────────

function Disclaimer() {
  return (
    <div className="mt-10 p-5 bg-amber-50 border border-amber-200 rounded-xl">
      <div className="flex gap-3">
        <svg className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
        <div>
          <h4 className="text-sm font-bold text-amber-800 mb-1">تنبيه قانوني هام</h4>
          <p className="text-sm text-amber-700 leading-relaxed">
            هذه الحاسبة توفر تقديرات تقريبية استرشادية وفق نظام العمل السعودي. قد تتأثر النتائج الفعلية بشروط العقد الفردي ولوائح الجهة المختصة والمستجدات التشريعية. لا تُعدّ هذه النتائج استشارة قانونية. يُنصح بمراجعة محامٍ مرخص أو مستشار قانوني عمالي للحصول على رأي متخصص.
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

const TABS: { id: TabId; label: string }[] = [
  { id: 'eos', label: 'مكافأة نهاية الخدمة' },
  { id: 'vacation', label: 'رصيد الإجازات' },
  { id: 'salary', label: 'الراتب المتبقي' },
  { id: 'tickets', label: 'تذاكر السفر' },
]

export default function EndOfServiceCalculator() {
  const [activeTab, setActiveTab] = useState<TabId>('eos')

  return (
    <div>
      {/* Tab bar */}
      <div className="flex overflow-x-auto border-b border-warm-200 mb-8 gap-1" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
              activeTab === tab.id
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-stone-600 hover:text-primary-500 hover:border-primary-200'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Calculator panels */}
      <div className="bg-white rounded-xl border border-warm-200 shadow-sm p-6">
        {activeTab === 'eos' && <EosCalculator />}
        {activeTab === 'vacation' && <VacationCalculator />}
        {activeTab === 'salary' && <SalaryCalculator />}
        {activeTab === 'tickets' && <TicketsCalculator />}
      </div>

      <Disclaimer />
    </div>
  )
}
