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
        industrial: {
          orange: "#f97316",
          darkorange: "#ea580c",
          yellow: "#eab308",
          amber: "#f59e0b",
          dark: "#0f172a",
          darker: "#090d16",
          light: "#f8fafc",
          border: "#e2e8f0",
        },
        "primary-container": "#ea580c",
        "on-primary-container": "#ffffff",
        "secondary-container": "#f1f5f9",
        "on-secondary-fixed": "#0f172a",
        "surface": "#ffffff",
        "surface-container": "#f8fafc",
        "surface-container-high": "#f1f5f9",
        "on-surface": "#0f172a",
        "secondary": "#64748b",
        "outline-variant": "#e2e8f0",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Oswald", "system-ui", "sans-serif"],
        oswald: ["Oswald", "system-ui", "sans-serif"],
        inter: ["Inter", "system-ui", "sans-serif"],
        "headline-lg": ["Oswald", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "body-lg": ["Inter", "sans-serif"],
        "label-caps": ["Oswald", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["4.5rem", { lineHeight: "1", letterSpacing: "-0.02em" }],
        "headline-lg": ["3.5rem", { lineHeight: "1.1", letterSpacing: "0.02em" }],
      },
      boxShadow: {
        soft: "0 4px 24px -2px rgba(0, 0, 0, 0.06), 0 2px 8px -2px rgba(0, 0, 0, 0.04)",
        card: "0 10px 30px -5px rgba(0, 0, 0, 0.08), 0 4px 10px -2px rgba(0, 0, 0, 0.03)",
        glow: "0 0 25px rgba(234, 88, 12, 0.35)",
        dark: "0 20px 40px -15px rgba(0, 0, 0, 0.3)",
      },
      animation: {
        "spin-slow": "spin-slow 90s linear infinite",
        "reverse-spin-slow": "reverse-spin-slow 110s linear infinite",
        "float": "float-subtle 4s ease-in-out infinite",
        "float-delayed": "float-subtle 4s ease-in-out infinite 2s",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
};
