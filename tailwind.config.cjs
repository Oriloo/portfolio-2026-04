/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        bg:     '#fafaf7',
        ink:    '#0a0a0a',
        muted:  '#595959',
        dim:    '#8a8a8a',
        paper:  '#ffffff',
        accent: '#ff3b1f',
      },
      fontFamily: {
        serif: ['"Instrument Serif"', '"Times New Roman"', 'serif'],
        sans:  ['Geist', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono:  ['"JetBrains Mono"', 'ui-monospace', '"Cascadia Code"', 'monospace'],
      },
      letterSpacing: {
        wider:   '0.14em',
        widest:  '0.2em',
        display: '-0.04em',
        heading: '-0.03em',
        title:   '-0.02em',
      },
      lineHeight: {
        tighter: '0.9',
        tight:   '0.95',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({ '.text-pretty': { 'text-wrap': 'pretty' } })
    },
  ],
}
