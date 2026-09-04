/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['var(--font-nunito)', '"Nunito"', 'sans-serif'],
      },
      colors: {
        brand: {
          orange: '#F97316',
          'orange-hover': '#EA580C',
          'orange-light': '#FFEDD5',
          blue: '#0284C7',
          'blue-light': '#38BDF8',
          'blue-cta': '#BAE6FD',
          yellow: '#FBBF24',
          'yellow-light': '#FEF3C7',
          navy: '#1E293B',
          muted: '#64748B',
          cream: '#FDF8EE',
          sky: '#F0F9FF',
          green: '#10B981',
          'green-light': '#D1FAE5',
          purple: '#8B5CF6',
          'purple-light': '#EDE9FE',
          pink: '#EC4899',
          'pink-light': '#FCE7F3',
        },
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
        '5xl': '2.75rem',
      },
      boxShadow: {
        soft: '0 8px 30px rgba(0, 0, 0, 0.04)',
        float: '0 16px 36px -8px rgba(0, 0, 0, 0.08)',
        'orange-glow': '0 10px 24px -3px rgba(249, 115, 22, 0.35)',
        'blue-glow': '0 10px 24px -3px rgba(2, 132, 199, 0.30)',
      },
    },
  },
  plugins: [],
};
