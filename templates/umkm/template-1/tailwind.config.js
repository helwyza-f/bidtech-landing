/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#2D4A27',
          dark: '#1F331A',
          hover: '#22381E',
          light: '#3d6335',
        },
        accent: {
          DEFAULT: '#D49A3D',
          hover: '#be8730',
          light: '#f5e9d3',
        },
        canvas: '#F5F2EB',
        surface: '#EBE6DA',
        card: '#FDFBF7',
        olive: '#5C6B57',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        logo: ['var(--font-logo)', 'Georgia', 'serif'],
        script: ['var(--font-script)', 'cursive'],
        sans: ['var(--font-sans)', 'sans-serif'],
        nav: ['var(--font-nav)', 'sans-serif'],
      },
      boxShadow: {
        'brand-sm': '0 4px 14px rgba(45, 74, 39, 0.12)',
        'brand-md': '0 8px 24px rgba(45, 74, 39, 0.18)',
        'card-soft': '0 10px 30px rgba(45, 74, 39, 0.05)',
      },
    },
  },
  plugins: [],
};
