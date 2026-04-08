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
      },
      fontFamily: {
        arabic: ['Tajawal', 'Cairo', 'sans-serif'],
      },
      typography: () => ({
        DEFAULT: {
          css: {
            fontFamily: 'Tajawal, Cairo, sans-serif',
            fontSize: '1.0625rem',
            lineHeight: '1.875',
            direction: 'rtl',
            textAlign: 'right',
            'h1, h2, h3, h4': {
              fontFamily: 'Tajawal, Cairo, sans-serif',
              fontWeight: '700',
            },
            blockquote: {
              borderRight: '4px solid #14b8a6',
              borderLeft: 'none',
              paddingRight: '1rem',
              paddingLeft: '0',
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
