'use client'

import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'

// ─── Helpers ──────────────────────────────────────────────────────────────────

const arabicNumberFormatter = new Intl.NumberFormat('ar-EG', {
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
})

function formatArabic(amount: number): string {
  return arabicNumberFormatter.format(Math.round(amount))
}

// ─── Types ────────────────────────────────────────────────────────────────────

type EosReason =
  | 'legit_74'
  | 'legit_80'
  | 'legit_81'
  | 'resign'
  | 'wrongful'

type ContractType = 'fixed' | 'indefinite'

const REASON_OPTIONS: { id: EosReason; label: string }[] = [
  { id: 'resign', label: 'استقالة (م. 85)' },
  { id: 'legit_74', label: 'إنهاء مشروع للطرفين (م. 74)' },
  { id: 'legit_80', label: 'إنهاء مشروع لصاحب العمل — خطأ العامل (م. 80)' },
  { id: 'legit_81', label: 'إنهاء مشروع للعامل — خطأ صاحب العمل (م. 81)' },
  { id: 'wrongful', label: 'إنهاء غير مشروع / فصل تعسفي (م. 77)' },
]

// ─── Stepper Input ────────────────────────────────────────────────────────────

function Stepper({
  id,
  label,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
}: {
  id: string
  label: string
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
  step?: number
}) {
  const dec = () => onChange(Math.max(min, value - step))
  const inc = () => onChange(max != null ? Math.min(max, value + step) : value + step)

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      <div className="flex items-stretch rounded-xl bg-white border border-line overflow-hidden focus-within:ring-2 focus-within:ring-primary-300 focus-within:border-primary-400 transition-shadow">
        <button
          type="button"
          onClick={inc}
          aria-label={`زيادة ${label}`}
          className="px-4 text-lg font-medium text-ink-3 hover:bg-paper-2 transition-colors select-none"
        >
          +
        </button>
        <input
          id={id}
          type="number"
          inputMode="numeric"
          value={Number.isFinite(value) ? value : 0}
          onChange={(e) => {
            const raw = e.target.value
            if (raw === '') {
              onChange(min)
              return
            }
            const n = Number(raw)
            if (!Number.isNaN(n)) onChange(n)
          }}
          min={min}
          max={max}
          step={step}
          className="flex-1 min-w-0 text-center bg-transparent border-0 outline-none text-base font-semibold text-ink py-3"
          dir="ltr"
        />
        <button
          type="button"
          onClick={dec}
          aria-label={`تقليل ${label}`}
          className="px-4 text-lg font-medium text-ink-3 hover:bg-paper-2 transition-colors select-none"
        >
          −
        </button>
      </div>
    </div>
  )
}

// ─── Reason Select ────────────────────────────────────────────────────────────

function ReasonSelect({
  value,
  onChange,
}: {
  value: EosReason
  onChange: (v: EosReason) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="reason" className="text-sm font-medium text-ink">
        سبب إنهاء الخدمة
      </label>
      <div className="relative">
        <select
          id="reason"
          value={value}
          onChange={(e) => onChange(e.target.value as EosReason)}
          className="w-full px-4 py-3 pl-10 rounded-xl bg-white border border-line text-sm font-medium text-ink focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 transition-shadow appearance-none cursor-pointer"
        >
          {REASON_OPTIONS.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-3 pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}

// ─── Mini Toggle (generic 2-option pill) ──────────────────────────────────────

function MiniToggle<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: T
  onChange: (v: T) => void
  options: { id: T; label: string }[]
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-ink">{label}</span>
      <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-white border border-line">
        {options.map((opt) => {
          const active = value === opt.id
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              className={cn(
                'py-2.5 rounded-lg text-sm font-medium transition-all',
                active
                  ? 'bg-primary-50 text-primary-700 ring-1 ring-primary-300 shadow-sm'
                  : 'text-ink-3 hover:bg-paper-2'
              )}
              aria-pressed={active}
            >
              {opt.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Section Card ─────────────────────────────────────────────────────────────

function SectionCard({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl bg-paper-2 border border-line p-5 sm:p-6">
      <h3 className="text-base font-bold text-ink mb-5">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
    </div>
  )
}

// ─── Result Row ───────────────────────────────────────────────────────────────

function ResultRow({
  label,
  value,
  emphasized = false,
  separator = false,
}: {
  label: string
  value: string
  emphasized?: boolean
  separator?: boolean
}) {
  return (
    <div
      className={cn(
        'flex items-center justify-between py-3',
        separator && 'border-t border-line-2 mt-1 pt-4'
      )}
    >
      <span
        className={cn(
          'text-sm',
          emphasized ? 'font-bold text-ink' : 'text-ink-3'
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          'text-sm tabular-nums',
          emphasized ? 'font-bold text-primary-700' : 'font-semibold text-primary-700'
        )}
      >
        {value} ريال
      </span>
    </div>
  )
}

// ─── Main Calculator ──────────────────────────────────────────────────────────

export default function EndOfServiceCalculator() {
  const [salary, setSalary] = useState(0)
  const [years, setYears] = useState(0)
  const [extraMonths, setExtraMonths] = useState(0)
  const [reason, setReason] = useState<EosReason>('resign')
  const [vacationDays, setVacationDays] = useState(0)
  const [remainingSalary, setRemainingSalary] = useState(0)
  const [ticketAllowance, setTicketAllowance] = useState(0)

  // فصل تعسفي — حقول إضافية
  const [hasPenaltyClause, setHasPenaltyClause] = useState(false)
  const [penaltyAmount, setPenaltyAmount] = useState(0)
  const [contractType, setContractType] = useState<ContractType>('indefinite')
  const [remainingMonths, setRemainingMonths] = useState(0)

  const calc = useMemo(() => {
    const safeSalary = Math.max(0, salary)
    const safeYears = Math.max(0, years)
    const safeMonths = Math.max(0, Math.min(11, extraMonths))
    const totalYears = safeYears + safeMonths / 12

    // المادة 84: نصف شهر للخمس سنوات الأولى، شهر كامل لما بعدها
    let gross: number
    if (totalYears <= 5) {
      gross = safeSalary * 0.5 * totalYears
    } else {
      gross = safeSalary * 0.5 * 5 + safeSalary * 1.0 * (totalYears - 5)
    }

    // معامل المكافأة:
    // - م. 80 (خطأ العامل) → صفر، لا مكافأة
    // - م. 85 (استقالة) → متدرّج 0/⅓/⅔/كامل حسب السنوات
    // - م. 74 / 81 / 77 (غير مشروع) → كامل
    let factor = 1
    if (reason === 'legit_80') {
      factor = 0
    } else if (reason === 'resign') {
      if (totalYears < 2) factor = 0
      else if (totalYears < 5) factor = 1 / 3
      else if (totalYears < 10) factor = 2 / 3
      else factor = 1
    }

    const eos = gross * factor
    const dailyRate = safeSalary / 30
    const vacationValue = Math.max(0, vacationDays) * dailyRate
    const remaining = Math.max(0, remainingSalary)
    const ticket = Math.max(0, ticketAllowance)

    // المادة 77: تعويض الفصل التعسفي مع حد أدنى = أجر شهرَين
    let wrongfulComp = 0
    if (reason === 'wrongful') {
      const base = hasPenaltyClause
        ? Math.max(0, penaltyAmount)
        : contractType === 'fixed'
        ? Math.max(0, remainingMonths) * safeSalary
        : 15 * dailyRate * totalYears
      const minimum = 2 * safeSalary
      wrongfulComp = Math.max(base, minimum)
    }

    const total = eos + vacationValue + remaining + ticket + wrongfulComp

    return {
      eos: Math.round(eos),
      vacationValue: Math.round(vacationValue),
      remaining: Math.round(remaining),
      ticket: Math.round(ticket),
      wrongfulComp: Math.round(wrongfulComp),
      total: Math.round(total),
    }
  }, [
    salary,
    years,
    extraMonths,
    reason,
    vacationDays,
    remainingSalary,
    ticketAllowance,
    hasPenaltyClause,
    penaltyAmount,
    contractType,
    remainingMonths,
  ])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      {/* ── Inputs (right side in RTL) ────────────────────────────── */}
      <div className="flex flex-col gap-5 order-2 lg:order-1">
        <SectionCard title="بيانات الخدمة">
          <div className="sm:col-span-2">
            <Stepper
              id="salary"
              label="الراتب الإجمالي (ريال / شهرياً)"
              value={salary}
              onChange={setSalary}
              min={0}
              step={100}
            />
            <p className="mt-1.5 text-xs text-stone-500">
              الأجر الشامل = الراتب الأساسي + البدلات الثابتة (سكن، نقل…) — وفق المادة 2 من نظام العمل.
            </p>
          </div>
          <Stepper id="years" label="سنوات الخدمة" value={years} onChange={setYears} min={0} max={60} />
          <Stepper id="months" label="أشهر إضافية" value={extraMonths} onChange={setExtraMonths} min={0} max={11} />
          <div className="sm:col-span-2">
            <ReasonSelect value={reason} onChange={setReason} />
          </div>

          {reason === 'wrongful' && (
            <div className="sm:col-span-2 rounded-xl bg-paper-3/40 border border-line p-4 flex flex-col gap-4">
              <p className="text-xs leading-relaxed text-ink-3">
                التعويض وفق <strong className="text-ink">المادة 77</strong> من نظام العمل، بحدّ أدنى أجر شهرَين.
              </p>

              <MiniToggle<'yes' | 'no'>
                label="هل يوجد شرط جزائي في العقد؟"
                value={hasPenaltyClause ? 'yes' : 'no'}
                onChange={(v) => setHasPenaltyClause(v === 'yes')}
                options={[
                  { id: 'no', label: 'لا' },
                  { id: 'yes', label: 'نعم' },
                ]}
              />

              {hasPenaltyClause ? (
                <Stepper
                  id="penalty"
                  label="قيمة الشرط الجزائي (ريال)"
                  value={penaltyAmount}
                  onChange={setPenaltyAmount}
                  min={0}
                  step={500}
                />
              ) : (
                <>
                  <MiniToggle<ContractType>
                    label="نوع العقد"
                    value={contractType}
                    onChange={setContractType}
                    options={[
                      { id: 'indefinite', label: 'غير محدد المدة' },
                      { id: 'fixed', label: 'محدد المدة' },
                    ]}
                  />
                  {contractType === 'fixed' && (
                    <Stepper
                      id="remaining-months"
                      label="الأشهر المتبقية في العقد"
                      value={remainingMonths}
                      onChange={setRemainingMonths}
                      min={0}
                    />
                  )}
                </>
              )}
            </div>
          )}
        </SectionCard>

        <SectionCard title="مستحقات إضافية">
          <Stepper
            id="vacation"
            label="رصيد إجازات (بالأيام)"
            value={vacationDays}
            onChange={setVacationDays}
            min={0}
          />
          <Stepper
            id="remaining"
            label="راتب متبقٍّ (ريال)"
            value={remainingSalary}
            onChange={setRemainingSalary}
            min={0}
            step={100}
          />
          <div className="sm:col-span-2">
            <Stepper
              id="ticket"
              label="بدل تذكرة سفر (ريال)"
              value={ticketAllowance}
              onChange={setTicketAllowance}
              min={0}
              step={100}
            />
          </div>
        </SectionCard>
      </div>

      {/* ── Results (left side in RTL) ────────────────────────────── */}
      <div className="flex flex-col gap-5 order-1 lg:order-2">
        {/* Hero total card */}
        <div
          className="rounded-2xl p-7 text-center shadow-editorial-md"
          style={{
            background: 'linear-gradient(165deg, #0A1628 0%, #162D4A 100%)',
          }}
        >
          <p className="text-sm font-medium" style={{ color: '#E4CE9E' }}>
            إجمالي مستحقاتك
          </p>
          <p className="mt-3 flex items-baseline justify-center gap-2 text-white">
            <span className="font-display font-black text-5xl sm:text-6xl tabular-nums tracking-tight">
              {formatArabic(calc.total)}
            </span>
            <span className="text-lg" style={{ color: '#9AA5BA' }}>
              ريال
            </span>
          </p>
          <p className="mt-3 text-xs leading-relaxed" style={{ color: '#9AA5BA' }}>
            تقدير مبدئي وفق المواد 74، 77، 80، 81، 84، 85 من نظام العمل.
          </p>
        </div>

        {/* Breakdown card */}
        <div className="rounded-2xl bg-paper-2 border border-line p-5 sm:p-6">
          <ResultRow label="مكافأة نهاية الخدمة" value={formatArabic(calc.eos)} />
          <ResultRow label="قيمة الإجازات غير المستخدمة" value={formatArabic(calc.vacationValue)} />
          <ResultRow label="الراتب المتبقي" value={formatArabic(calc.remaining)} />
          <ResultRow label="بدل تذكرة السفر" value={formatArabic(calc.ticket)} />
          {calc.wrongfulComp > 0 && (
            <ResultRow label="تعويض الفصل التعسفي (م. 77)" value={formatArabic(calc.wrongfulComp)} />
          )}
          <ResultRow label="الإجمالي" value={formatArabic(calc.total)} emphasized separator />
        </div>

        {/* Disclaimer */}
        <div className="rounded-2xl bg-amber-50 border border-amber-200 p-5">
          <p className="text-xs leading-relaxed text-amber-800">
            <strong className="font-bold">تنبيه:</strong> هذه الحاسبة للاسترشاد العام. قد تؤثر بنود العقد الفردية وشروط العمل
            الإضافية على المبلغ النهائي.
          </p>
        </div>
      </div>
    </div>
  )
}
