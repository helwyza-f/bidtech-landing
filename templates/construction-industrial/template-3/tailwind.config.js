/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#0F0F0F',
          carbon: '#171717',
          surface: '#FFFFFF',
          surfaceMuted: '#F6F5F0',
          border: '#E5E4DE',
          borderDark: '#D8D6CE',
          sandLight: '#F7E7C0',
          sandDark: '#E8CE94',
          gold: '#B88E28',
          goldDark: '#936E17',
          red: '#E54D42',
          bgPaper: '#FBFBFA',
          stone: '#F1EFEA'
        }
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace']
      },
      letterSpacing: {
        tighter: '-0.03em',
        tight: '-0.02em',
        wide: '0.02em'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}
