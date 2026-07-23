'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

type TabId = 'eos' | 'vacation' | 'overtime' | 'salary'
type EosReason = 'terminate' | 'resign' | 'forceMajeure' | 'marriage' | 'childbirth'

interface EosResult {
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

interface OvertimeResult {
  hourlyRate: number
  overtimeHourRate: number
  totalAmount: number
}

function formatSAR(amount: number): string {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: 'SAR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

function round2(value: number): number {
  return Math.round(value * 100) / 100
}

function formatServiceDuration(totalYears: number) {
  const wholeYears = Math.floor(totalYears)
  const remainderMonths = Math.round((totalYears - wholeYears) * 12)

  if (remainderMonths > 0) {
    return `${wholeYears} سنة و${remainderMonths} شهر`
  }

  return `${wholeYears} سنة`
}

function getEventWindowDays(reason: EosReason) {
  if (reason === 'marriage') {
    return 183
  }

  if (reason === 'childbirth') {
    return 92
  }

  return null
}

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
  onChange: (value: string) => void
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
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        min={min ?? '0'}
        step={step}
        dir={type === 'date' ? 'ltr' : undefined}
        className="w-full rounded-lg border border-warm-200 bg-white px-4 py-2.5 text-sm transition-colors focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-300"
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

function ResultCard({
  items,
  total,
  totalLabel,
}: {
  items: { label: string; value: string }[]
  total: string
  totalLabel: string
}) {
  return (
    <div className="mt-6 rounded-xl border border-primary-100 bg-primary-50 p-6">
      <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-navy-800">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary-500 text-xs text-white">
          ✓
        </span>
        نتيجة الحساب
      </h3>
      <dl className="space-y-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between border-b border-primary-100 py-2 last:border-0"
          >
            <dt className="text-sm text-stone-600">{item.label}</dt>
            <dd className="text-sm font-semibold text-navy-800">{item.value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-4 flex items-center justify-between rounded-lg bg-primary-500 p-4 text-white">
        <span className="text-sm font-medium">{totalLabel}</span>
        <span className="text-lg font-bold">{total}</span>
      </div>
    </div>
  )
}

function ActionButtons({
  onCalculate,
  onReset,
}: {
  onCalculate: () => void
  onReset: () => void
}) {
  return (
    <div className="mt-6 flex flex-col gap-2">
      <button
        type="button"
        onClick={onCalculate}
        className="w-full rounded-lg bg-primary-500 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-600"
      >
        احسب الآن
      </button>
      <button
        type="button"
        onClick={onReset}
        className="w-full rounded-lg border border-warm-200 bg-white py-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-warm-50"
      >
        مسح البيانات
      </button>
    </div>
  )
}

function AssumptionBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 rounded-xl border border-warm-200 bg-warm-50 p-4 text-sm leading-relaxed text-stone-700">
      {children}
    </div>
  )
}

function EosCalculator() {
  const [salary, setSalary] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [reason, setReason] = useState<EosReason>('terminate')
  const [result, setResult] = useState<EosResult | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const eventWindowDays = getEventWindowDays(reason)
  const requiresEventDate = eventWindowDays !== null

  function handleCalculate() {
    const nextErrors: Record<string, string> = {}
    const parsedSalary = parseFloat(salary)

    if (!salary || Number.isNaN(parsedSalary) || parsedSalary <= 0) {
      nextErrors.salary = 'يرجى إدخال راتب صحيح'
    }
    if (!startDate) {
      nextErrors.startDate = 'يرجى تحديد تاريخ بدء الخدمة'
    }
    if (!endDate) {
      nextErrors.endDate = 'يرجى تحديد تاريخ انتهاء الخدمة'
    }
    if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
      nextErrors.endDate = 'تاريخ الانتهاء يجب أن يكون بعد تاريخ البدء'
    }
    if (requiresEventDate && !eventDate) {
      nextErrors.eventDate = 'يرجى إدخال تاريخ الواقعة للتحقق من المهلة النظامية'
    }

    if (requiresEventDate && eventDate && endDate) {
      const diffInDays =
        (new Date(endDate).getTime() - new Date(eventDate).getTime()) / (1000 * 60 * 60 * 24)

      if (diffInDays < 0) {
        nextErrors.eventDate = 'يجب أن يكون تاريخ الواقعة قبل أو في تاريخ إنهاء الخدمة'
      } else if (eventWindowDays !== null && diffInDays > eventWindowDays) {
        nextErrors.eventDate =
          reason === 'marriage'
            ? 'يشترط أن يكون إنهاء العقد خلال 6 أشهر من تاريخ الزواج'
            : 'يشترط أن يكون إنهاء العقد خلال 3 أشهر من تاريخ الوضع'
      }
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      return
    }

    const start = new Date(startDate)
    const end = new Date(endDate)
    const totalDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    const totalYears = totalDays / 365.25
    const grossBenefit =
      totalYears <= 5
        ? round2(parsedSalary * 0.5 * totalYears)
        : round2(parsedSalary * 0.5 * 5 + parsedSalary * (totalYears - 5))

    let factor = 1
    let factorLabel = 'كامل المكافأة'

    if (reason === 'resign') {
      if (totalYears < 2) {
        factor = 0
        factorLabel = 'لا يستحق مكافأة عند الاستقالة قبل سنتين'
      } else if (totalYears < 5) {
        factor = 1 / 3
        factorLabel = 'ثلث المكافأة (استقالة بعد سنتين وحتى أقل من خمس سنوات)'
      } else if (totalYears < 10) {
        factor = 2 / 3
        factorLabel = 'ثلثا المكافأة (استقالة بعد خمس سنوات وحتى أقل من عشر سنوات)'
      } else {
        factor = 1
        factorLabel = 'كامل المكافأة (استقالة بعد عشر سنوات فأكثر)'
      }
    } else if (reason === 'forceMajeure') {
      factorLabel = 'كامل المكافأة بسبب قوة قاهرة وفق المادة 87'
    } else if (reason === 'marriage') {
      factorLabel = 'كامل المكافأة عند إنهاء العاملة العقد خلال 6 أشهر من الزواج'
    } else if (reason === 'childbirth') {
      factorLabel = 'كامل المكافأة عند إنهاء العاملة العقد خلال 3 أشهر من الوضع'
    } else {
      factorLabel = 'كامل المكافأة'
    }

    const finalBenefit = round2(grossBenefit * factor)
    const breakdown = [
      { label: 'مدة الخدمة', value: formatServiceDuration(totalYears) },
      {
        label: 'استحقاق الخمس سنوات الأولى',
        value: formatSAR(round2(parsedSalary * 0.5 * Math.min(totalYears, 5))),
      },
      ...(totalYears > 5
        ? [
            {
              label: 'استحقاق السنوات التالية',
              value: formatSAR(round2(parsedSalary * (totalYears - 5))),
            },
          ]
        : []),
      { label: 'إجمالي الاستحقاق قبل سبب الإنهاء', value: formatSAR(grossBenefit) },
      { label: 'سبب الاستحقاق', value: factorLabel },
    ]

    setResult({ finalBenefit, breakdown })
  }

  function handleReset() {
    setSalary('')
    setStartDate('')
    setEndDate('')
    setEventDate('')
    setReason('terminate')
    setResult(null)
    setErrors({})
  }

  return (
    <div>
      <p className="mb-6 text-sm leading-relaxed text-stone-600">
        تحسب هذه الأداة مكافأة نهاية الخدمة وفق المواد <strong>84 و85 و87</strong> من نظام
        العمل السعودي، مع تطبيق نسب الاستقالة والتحقق من الاستثناءين النظاميين الواردين في
        المادة 87 عند اختيارهما.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InputField
          id="eos-salary"
          label="الراتب الأساسي الشهري (ريال)"
          value={salary}
          onChange={setSalary}
          placeholder="مثال: 5000"
          error={errors.salary}
        />

        <div className="flex flex-col gap-1.5">
          <label htmlFor="eos-reason" className="text-sm font-medium text-navy-800">
            سبب إنهاء الخدمة
          </label>
          <select
            id="eos-reason"
            value={reason}
            onChange={(event) => {
              const nextReason = event.target.value as EosReason
              setReason(nextReason)
              if (!getEventWindowDays(nextReason)) {
                setEventDate('')
              }
            }}
            className="w-full rounded-lg border border-warm-200 bg-white px-4 py-2.5 text-sm transition-colors focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-300"
          >
            <option value="terminate">إنهاء من صاحب العمل أو حالة تستحق كامل المكافأة</option>
            <option value="resign">استقالة</option>
            <option value="forceMajeure">ترك العمل بسبب قوة قاهرة (م.87)</option>
            <option value="marriage">إنهاء العاملة للعقد خلال 6 أشهر من الزواج (م.87)</option>
            <option value="childbirth">إنهاء العاملة للعقد خلال 3 أشهر من الوضع (م.87)</option>
          </select>
        </div>

        <InputField
          id="eos-start"
          label="تاريخ بدء الخدمة"
          type="date"
          value={startDate}
          onChange={setStartDate}
          error={errors.startDate}
        />
        <InputField
          id="eos-end"
          label="تاريخ انتهاء الخدمة"
          type="date"
          value={endDate}
          onChange={setEndDate}
          error={errors.endDate}
        />

        {requiresEventDate && (
          <InputField
            id="eos-event"
            label={reason === 'marriage' ? 'تاريخ الزواج' : 'تاريخ الوضع'}
            type="date"
            value={eventDate}
            onChange={setEventDate}
            error={errors.eventDate}
          />
        )}
      </div>

      <AssumptionBox>
        يفترض هذا الحساب أن الأجر المحتسب هو الراتب الأساسي الشهري، وأنه لا توجد شروط عقدية
        خاصة أو عناصر أجر متغيرة مستبعدة باتفاق صحيح وفق المادة 86.
      </AssumptionBox>

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

function VacationCalculator() {
  const [salary, setSalary] = useState('')
  const [years, setYears] = useState('')
  const [days, setDays] = useState('')
  const [result, setResult] = useState<VacationResult | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function handleCalculate() {
    const nextErrors: Record<string, string> = {}
    const parsedSalary = parseFloat(salary)
    const parsedYears = parseFloat(years)
    const parsedDays = parseFloat(days)

    if (!salary || Number.isNaN(parsedSalary) || parsedSalary <= 0) {
      nextErrors.salary = 'يرجى إدخال راتب صحيح'
    }
    if (!years || Number.isNaN(parsedYears) || parsedYears < 0) {
      nextErrors.years = 'يرجى إدخال سنوات الخدمة'
    }
    if (!days || Number.isNaN(parsedDays) || parsedDays < 0) {
      nextErrors.days = 'يرجى إدخال رصيد الإجازات'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      return
    }

    const annualEntitlement = parsedYears >= 5 ? 30 : 21
    const dailyRate = round2(parsedSalary / 30)
    const totalAmount = round2(parsedDays * dailyRate)
    setResult({ annualEntitlement, dailyRate, totalAmount })
  }

  function handleReset() {
    setSalary('')
    setYears('')
    setDays('')
    setResult(null)
    setErrors({})
  }

  return (
    <div>
      <p className="mb-6 text-sm leading-relaxed text-stone-600">
        تعتمد هذه الأداة على الحد الأدنى للإجازة السنوية في المادة <strong>109</strong>،
        وعلى استحقاق مقابل الرصيد غير المستخدم وفق المادة <strong>111</strong> عند انتهاء
        العلاقة أو الحالة النظامية التي يثبت فيها المقابل النقدي.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InputField
          id="vac-salary"
          label="الراتب الشهري (ريال)"
          value={salary}
          onChange={setSalary}
          placeholder="مثال: 5000"
          error={errors.salary}
        />
        <InputField
          id="vac-years"
          label="سنوات الخدمة"
          value={years}
          onChange={setYears}
          placeholder="مثال: 3"
          error={errors.years}
          step="0.5"
        />
        <InputField
          id="vac-days"
          label="رصيد الإجازات المتبقي (أيام)"
          value={days}
          onChange={setDays}
          placeholder="مثال: 25"
          error={errors.days}
        />
      </div>

      <AssumptionBox>
        تفترض الأداة أن المقابل النقدي يحسب على أساس الأجر الشهري مقسومًا على 30 يومًا، وأن
        الرصيد المدخل صحيح ومثبت ضمن سجلات العلاقة العمالية.
      </AssumptionBox>

      <ActionButtons onCalculate={handleCalculate} onReset={handleReset} />

      {result && (
        <ResultCard
          items={[
            { label: 'الإجازة السنوية المستحقة', value: `${result.annualEntitlement} يومًا في السنة` },
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

function OvertimeCalculator() {
  const [salary, setSalary] = useState('')
  const [dailyHours, setDailyHours] = useState('8')
  const [overtimeHours, setOvertimeHours] = useState('')
  const [result, setResult] = useState<OvertimeResult | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function handleCalculate() {
    const nextErrors: Record<string, string> = {}
    const parsedSalary = parseFloat(salary)
    const parsedDailyHours = parseFloat(dailyHours)
    const parsedOvertime = parseFloat(overtimeHours)

    if (!salary || Number.isNaN(parsedSalary) || parsedSalary <= 0) {
      nextErrors.salary = 'يرجى إدخال راتب أساسي صحيح'
    }
    if (!dailyHours || Number.isNaN(parsedDailyHours) || parsedDailyHours <= 0 || parsedDailyHours > 12) {
      nextErrors.dailyHours = 'يرجى إدخال عدد ساعات العمل اليومية المعتادة (1 إلى 12)'
    }
    if (!overtimeHours || Number.isNaN(parsedOvertime) || parsedOvertime < 0) {
      nextErrors.overtimeHours = 'يرجى إدخال عدد ساعات العمل الإضافية'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      return
    }

    // أجر الساعة الأساسي = الراتب الشهري ÷ 30 يومًا ÷ ساعات العمل اليومية
    const hourlyRate = round2(parsedSalary / 30 / parsedDailyHours)
    // أجر الساعة الإضافية = أجر الساعة + 50% من الأجر الأساسي (المادة 107)
    const overtimeHourRate = round2(hourlyRate * 1.5)
    const totalAmount = round2(overtimeHourRate * parsedOvertime)
    setResult({ hourlyRate, overtimeHourRate, totalAmount })
  }

  function handleReset() {
    setSalary('')
    setDailyHours('8')
    setOvertimeHours('')
    setResult(null)
    setErrors({})
  }

  return (
    <div>
      <p className="mb-6 text-sm leading-relaxed text-stone-600">
        تحسب هذه الأداة أجر العمل الإضافي وفق المادة <strong>107</strong> من نظام العمل
        السعودي، حيث يستحق العامل عن الساعة الإضافية أجر الساعة مضافًا إليه{' '}
        <strong>50% من أجره الأساسي</strong> (أي 150% من أجر الساعة الأساسي).
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InputField
          id="ot-salary"
          label="الأجر الأساسي الشهري (ريال)"
          value={salary}
          onChange={setSalary}
          placeholder="مثال: 6000"
          error={errors.salary}
        />
        <InputField
          id="ot-daily-hours"
          label="ساعات العمل اليومية المعتادة"
          value={dailyHours}
          onChange={setDailyHours}
          placeholder="8"
          error={errors.dailyHours}
          step="0.5"
        />
        <InputField
          id="ot-hours"
          label="عدد ساعات العمل الإضافية"
          value={overtimeHours}
          onChange={setOvertimeHours}
          placeholder="مثال: 20"
          error={errors.overtimeHours}
          step="0.5"
        />
      </div>

      <AssumptionBox>
        يُحسب أجر الساعة الأساسي بقسمة الأجر الشهري على 30 يومًا ثم على عدد ساعات العمل
        اليومية المعتادة. ويُعد عملًا إضافيًا كذلك العمل في أيام الراحة والأعياد. لا تشمل
        الأداة البدلات المتغيرة أو الاتفاقات الخاصة على إجازة تعويضية بدل الأجر الإضافي.
      </AssumptionBox>

      <ActionButtons onCalculate={handleCalculate} onReset={handleReset} />

      {result && (
        <ResultCard
          items={[
            { label: 'أجر الساعة الأساسي', value: formatSAR(result.hourlyRate) },
            { label: 'أجر الساعة الإضافية (150%)', value: formatSAR(result.overtimeHourRate) },
            { label: 'عدد ساعات العمل الإضافية', value: `${overtimeHours} ساعة` },
          ]}
          total={formatSAR(result.totalAmount)}
          totalLabel="إجمالي أجر العمل الإضافي"
        />
      )}
    </div>
  )
}

function SalaryCalculator() {
  const [salary, setSalary] = useState('')
  const [monthStart, setMonthStart] = useState('')
  const [lastDay, setLastDay] = useState('')
  const [result, setResult] = useState<SalaryResult | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function handleCalculate() {
    const nextErrors: Record<string, string> = {}
    const parsedSalary = parseFloat(salary)

    if (!salary || Number.isNaN(parsedSalary) || parsedSalary <= 0) {
      nextErrors.salary = 'يرجى إدخال راتب صحيح'
    }
    if (!monthStart) {
      nextErrors.monthStart = 'يرجى تحديد تاريخ بداية الشهر'
    }
    if (!lastDay) {
      nextErrors.lastDay = 'يرجى تحديد آخر يوم عمل'
    }
    if (monthStart && lastDay && new Date(lastDay) < new Date(monthStart)) {
      nextErrors.lastDay = 'آخر يوم عمل يجب أن يكون بعد بداية الشهر'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      return
    }

    const start = new Date(monthStart)
    const end = new Date(lastDay)
    const daysWorked = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
    const dailyRate = round2(parsedSalary / 30)
    const amount = round2(daysWorked * dailyRate)
    setResult({ daysWorked, dailyRate, amount })
  }

  function handleReset() {
    setSalary('')
    setMonthStart('')
    setLastDay('')
    setResult(null)
    setErrors({})
  }

  return (
    <div>
      <p className="mb-6 text-sm leading-relaxed text-stone-600">
        تحسب هذه الأداة الراتب المتبقي على أساس أن الأجر الشهري يقسم على{' '}
        <strong>30 يومًا</strong>، وهو افتراض عملي شائع في حساب المستحقات العمالية الشهرية.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InputField
          id="sal-salary"
          label="الراتب الشهري (ريال)"
          value={salary}
          onChange={setSalary}
          placeholder="مثال: 5000"
          error={errors.salary}
        />
        <InputField
          id="sal-start"
          label="تاريخ بداية الفترة"
          type="date"
          value={monthStart}
          onChange={setMonthStart}
          error={errors.monthStart}
        />
        <InputField
          id="sal-end"
          label="آخر يوم عمل"
          type="date"
          value={lastDay}
          onChange={setLastDay}
          error={errors.lastDay}
        />
      </div>

      <AssumptionBox>
        لا تتعامل هذه الأداة مع الحسميات التعاقدية الخاصة أو الجزاءات أو البدلات المتغيرة،
        وإنما تعطي تقديرًا استرشاديًا للأجر عن جزء من الشهر.
      </AssumptionBox>

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

function Disclaimer() {
  return (
    <div className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-5">
      <div className="flex gap-3">
        <svg className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
        <div>
          <h4 className="mb-1 text-sm font-bold text-amber-800">تنبيه قانوني مهم</h4>
          <p className="text-sm leading-relaxed text-amber-700">
            هذه الحاسبة توفر تقديرات استرشادية وفق النصوص النظامية العامة. لا تشمل الشروط
            العقدية الخاصة أو اللوائح الداخلية أو الملابسات النزاعية. تمت إزالة حساب تذاكر
            السفر من الإطلاق العام لعدم وجود أساس نظامي عام يكفي لعرضه كاستحقاق افتراضي.
          </p>
        </div>
      </div>
    </div>
  )
}

const TABS: { id: TabId; label: string }[] = [
  { id: 'eos', label: 'مكافأة نهاية الخدمة' },
  { id: 'vacation', label: 'بدل الإجازة السنوية' },
  { id: 'overtime', label: 'أجر العمل الإضافي' },
  { id: 'salary', label: 'الراتب المتبقي' },
]

export default function EndOfServiceCalculator() {
  const [activeTab, setActiveTab] = useState<TabId>('eos')

  return (
    <div>
      <div className="mb-8 flex gap-1 overflow-x-auto border-b border-warm-200" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors',
              activeTab === tab.id
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-stone-600 hover:border-primary-200 hover:text-primary-500'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-warm-200 bg-white p-6 shadow-sm">
        {activeTab === 'eos' && <EosCalculator />}
        {activeTab === 'vacation' && <VacationCalculator />}
        {activeTab === 'overtime' && <OvertimeCalculator />}
        {activeTab === 'salary' && <SalaryCalculator />}
      </div>

      <Disclaimer />
    </div>
  )
}
