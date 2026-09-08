/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './constants/**/*.{js,ts,jsx,tsx}',
    './styles/**/*.{css,js,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-plus-jakarta)', '"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        hkti: {
          forest: '#115E41',
          dark: '#0B3525',
          surface: '#166534',
          gold: '#BF8E3D',
          goldDark: '#8C6424',
          goldLight: '#E8DFCE',
          mint: '#F0FDF4',
          mintDark: '#DCFCE7',
          surfaceAlt: '#F0F5FA',
          surfaceCard: '#F0F7FF',
          slate: '#0F172A',
          muted: '#475569',
        },
      },
      boxShadow: {
        'card-hover': '0 12px 30px -10px rgba(17, 94, 65, 0.12)',
        'subtle': '0 2px 8px -2px rgba(15, 23, 42, 0.06)',
      },
    },
  },
  plugins: [],
};
