/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0A0A0A',
        secondary: '#171717',
        canvas: {
          light: '#FFFFFF',
          dark: '#0A0A0A',
        },
        surface: {
          light: '#F9FAFB',
          dark: '#171717',
          card: '#1F1F1F',
        },
        ink: {
          primary: '#0A0A0A',
          secondary: '#6B7280',
          dark: '#FFFFFF',
          muted: '#A3A3A3',
        },
        border: {
          light: '#E5E7EB',
          dark: '#262626',
        },
        accent: {
          gold: '#FBBF24',
          amber: '#F59E0B',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['var(--font-playfair)', '"Playfair Display"', 'Georgia', 'serif'],
      },
      borderRadius: {
        'pebble-lg': '60% 40% 70% 30% / 50% 60% 40% 50%',
        'pebble-1': '40% 60% 50% 50% / 60% 40% 60% 40%',
        'pebble-2': '50% 50% 40% 60% / 40% 50% 50% 60%',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'radar': 'radar 2s cubic-bezier(0, 0.2, 0.8, 1) infinite',
      },
      keyframes: {
        radar: {
          '0%': { transform: 'scale(0.95)', opacity: '0.8' },
          '70%': { transform: 'scale(2.2)', opacity: '0' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
