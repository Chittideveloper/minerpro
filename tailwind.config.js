/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        mine: {
          dark:   '#0a0e1a',
          navy:   '#0f172a',
          steel:  '#1e293b',
          orange: '#f97316',
          amber:  '#fb923c',
          elec:   '#38bdf8',
          violet: '#818cf8',
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        heading: ['Rajdhani', 'sans-serif'],
        body:    ['"DM Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'grad-orange': 'linear-gradient(135deg,#f97316,#ea580c)',
        'grad-blue':   'linear-gradient(135deg,#38bdf8,#818cf8)',
        'grad-hero':   'linear-gradient(135deg,#f97316 0%,#fb923c 40%,#38bdf8 100%)',
      },
      animation: {
        float:       'float 4s ease-in-out infinite',
        'float-d1':  'float 4s ease-in-out 1s infinite',
        'float-d2':  'float 4s ease-in-out 2s infinite',
        'pulse-orn': 'pulseOrange 2s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'border-run':'borderRun 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-12px)' },
        },
        pulseOrange: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(249,115,22,0.4)' },
          '50%':     { boxShadow: '0 0 0 16px rgba(249,115,22,0)' },
        },
        borderRun: {
          '0%':   { backgroundPosition: '0% 50%' },
          '50%':  { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [],
}
