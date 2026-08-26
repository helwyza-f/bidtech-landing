/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Palet diambil langsung dari PDF Figma (figma/Landing page Restaurant.pdf).
      // Catatan: JANGAN menamai token `white`/`black` — itu menimpa util bawaan Tailwind.
      colors: {
        ink: '#141b2b',      // navy nyaris hitam - heading & footer
        cocoa: '#59413c',    // cokelat hangat - body text
        ember: {
          DEFAULT: '#aa3015', // terracotta - aksi utama
          dark: '#a42d18',    // state hover
          soft: '#fff7ed',    // tint background
        },
        gold: '#ffcf4b',      // aksen sekunder
        blush: '#e1bfb8',     // garis & border lembut
        cream: '#fff6e9',     // background halaman
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        eyebrow: '0.22em',
      },
      maxWidth: {
        shell: '1200px',
      },
      transitionTimingFunction: {
        // Satu kurva yang dipakai di CSS maupun JS supaya gerakannya konsisten.
        smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
