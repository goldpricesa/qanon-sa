import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#E6FAF7',
          100: '#CCF5EF',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D8075',
          700: '#0F5C54',
          800: '#0A3B37',
          900: '#072724',
        },
        navy: {
          700: '#1E3A5F',
          800: '#162D4A',
          900: '#0A1628',
        },
        ink: {
          DEFAULT: '#0A1628',
          2: '#162D4A',
          3: '#1E3A5F',
        },
        paper: {
          DEFAULT: '#FAF7F1',
          2: '#F3EEE4',
          3: '#E8E2D4',
        },
        warm: {
          50:  '#FAF7F1',
          100: '#F3EEE4',
          200: '#E8E2D4',
          300: '#D8CFBC',
        },
        line: {
          DEFAULT: '#E5DFD1',
          2: '#D8CFBC',
        },
        gold: {
          DEFAULT: '#C8A45C',
          soft: '#E4CE9E',
          50:  '#FBF6EB',
          100: '#F5EAD0',
          200: '#EAD7A6',
          300: '#DEC179',
          400: '#D3AE60',
          500: '#C8A45C',
          600: '#A8843B',
          700: '#7E632C',
          800: '#54421D',
          900: '#2A210F',
        },
      },
      fontFamily: {
        sans: ['var(--font-thmanyah-sans)', 'sans-serif'],
        arabic: ['var(--font-thmanyah-sans)', 'sans-serif'],
        display: ['var(--font-thmanyah-display)', 'var(--font-thmanyah-sans)', 'serif'],
      },
      boxShadow: {
        'editorial-sm': '0 1px 2px rgba(10, 22, 40, 0.04), 0 1px 3px rgba(10, 22, 40, 0.06)',
        'editorial-md': '0 4px 12px rgba(10, 22, 40, 0.06), 0 2px 6px rgba(10, 22, 40, 0.04)',
        'editorial-lg': '0 20px 48px rgba(10, 22, 40, 0.12), 0 8px 20px rgba(10, 22, 40, 0.08)',
      },
      typography: () => ({
        DEFAULT: {
          css: {
            fontFamily: 'var(--font-thmanyah-sans), sans-serif',
            fontSize: '1.0625rem',
            lineHeight: '2',
            direction: 'rtl',
            textAlign: 'right',
            color: '#162D4A',
            'h1, h2, h3, h4': {
              fontFamily: 'var(--font-thmanyah-display), var(--font-thmanyah-sans), serif',
              fontWeight: '900',
              letterSpacing: '-0.015em',
              color: '#0A1628',
            },
            h2: { marginTop: '2.5rem', marginBottom: '1rem' },
            h3: { color: '#162D4A', marginTop: '1.75rem' },
            blockquote: {
              borderRight: '4px solid #14B8A6',
              borderLeft: 'none',
              paddingRight: '1rem',
              paddingLeft: '0',
              color: '#1E3A5F',
              fontStyle: 'normal',
            },
            'ul, ol': {
              paddingRight: '1.5rem',
              paddingLeft: '0',
            },
            'li::marker': { color: '#0D8075' },
            a: {
              color: '#0D8075',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              '&:hover': { color: '#0F5C54' },
            },
            strong: { color: '#0A1628', fontWeight: '700' },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
