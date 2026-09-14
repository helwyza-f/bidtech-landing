/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-playfair)', 'Playfair Display', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'JetBrains Mono', 'monospace'],
      },
      colors: {
        brand: {
          lime: '#D8F242',
          black: '#0E0E10',
          charcoal: '#18181B',
          dark: '#27272A',
          paper: '#F6F6F2',
          cream: '#EDEDE8',
          border: '#E2E2DC',
          text: '#121214',
          muted: '#71717A',
          red: '#E11D48',
          blue: '#2563EB',
          amber: '#EAB308',
        },
      },
    },
  },
  plugins: [],
};
