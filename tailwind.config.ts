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
          50:  '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        navy: {
          700: '#1e3a5f',
          800: '#162d4a',
          900: '#0f1e31',
        },
        warm: {
          50:  '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
        },
        gold: {
          50:  '#fbf8f1',
          100: '#f5ecd2',
          200: '#ead7a4',
          300: '#dec07a',
          400: '#d2a84c',
          500: '#be9a52',
          600: '#a07f38',
          700: '#7d6225',
          800: '#5a4719',
          900: '#3d3010',
        },
      },
      fontFamily: {
        sans: ['var(--font-thmanyah-sans)', 'sans-serif'],
        arabic: ['var(--font-thmanyah-sans)', 'sans-serif'],
        display: ['var(--font-thmanyah-display)', 'var(--font-thmanyah-sans)', 'serif'],
      },
      typography: () => ({
        DEFAULT: {
          css: {
            fontFamily: 'var(--font-thmanyah-sans), sans-serif',
            fontSize: '1.0625rem',
            lineHeight: '1.875',
            direction: 'rtl',
            textAlign: 'right',
            'h1, h2, h3, h4': {
              fontFamily: 'var(--font-thmanyah-sans), sans-serif',
              fontWeight: '700',
            },
            blockquote: {
              borderRight: '4px solid #be9a52',
              borderLeft: 'none',
              paddingRight: '1rem',
              paddingLeft: '0',
              backgroundColor: '#fbf8f1',
              borderRadius: '0.5rem',
              padding: '0.75rem 1rem',
              fontStyle: 'normal',
            },
            'ul, ol': {
              paddingRight: '1.5rem',
              paddingLeft: '0',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
