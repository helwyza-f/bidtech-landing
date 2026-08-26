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
        org: {
          teal: '#0D4D44',
          'teal-dark': '#072E29',
          'teal-light': '#16685D',
          'teal-hover': '#0B423A',
          coral: '#E05A47',
          'coral-hover': '#CF4D3B',
          beige: '#F6F4EE',
          'beige-dark': '#EBE7DD',
        },
      },
    },
  },
  plugins: [],
};
