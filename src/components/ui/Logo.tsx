interface LogoProps {
  size?: number
  invert?: boolean
}

export default function Logo({ size = 40, invert = false }: LogoProps) {
  const fg = invert ? '#F5EEDC' : '#0A1628'
  const accent = invert ? '#2DD4BF' : '#0D8075'
  const eyeBg = invert ? '#0B1524' : '#FAF7F1'

  return (
    <div className="flex items-center gap-2.5">
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <circle cx="24" cy="24" r="22" stroke={accent} strokeWidth="2" fill="none" opacity="0.25" />
        <path
          d="M6 24 C14 14, 34 14, 42 24 C34 34, 14 34, 6 24 Z"
          stroke={accent}
          strokeWidth="2.5"
          fill="none"
          strokeLinejoin="round"
        />
        <circle cx="24" cy="24" r="6.5" fill={accent} />
        <circle cx="26" cy="22" r="2" fill={eyeBg} />
      </svg>
      <div className="flex flex-col gap-0.5 leading-none">
        <span
          className="font-display font-black text-xl tracking-tight"
          style={{ color: fg }}
        >
          نظرة قانونية
        </span>
        <span
          className="text-[10.5px] font-medium tracking-[0.15em]"
          style={{ color: accent }}
        >
          QANON · SA
        </span>
      </div>
    </div>
  )
}
