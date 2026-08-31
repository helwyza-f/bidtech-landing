/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        "surface-soft": "var(--surface-soft)",
        gold: {
          50: "var(--gold-50)",
          100: "var(--gold-100)",
          200: "var(--gold-200)",
          300: "var(--gold-300)",
          400: "var(--gold-400)",
          500: "var(--gold-500)",
          600: "var(--gold-600)",
          700: "var(--gold-700)",
          800: "var(--gold-800)",
        },
        ink: {
          900: "var(--ink-900)",
          800: "var(--ink-800)",
          700: "var(--ink-700)",
        },
        txt: {
          600: "var(--text-600)",
          500: "var(--text-500)",
          400: "var(--text-400)",
          disabled: "var(--text-disabled)",
        },
        border: "var(--border)",
        "border-strong": "var(--border-strong)",
        "dark-border": "var(--dark-border)",
        success: "var(--success)",
        "success-soft": "var(--success-soft)",
        whatsapp: "var(--whatsapp)",
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'sans-serif'],
      },
      borderRadius: {
        lg: "18px",
        md: "12px",
        sm: "8px",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(17, 24, 39, 0.06)",
        "soft-hover": "0 16px 40px rgba(17, 24, 39, 0.10)",
      }
    },
  },
  plugins: [],
}
