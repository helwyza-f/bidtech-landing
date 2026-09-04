import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        foreground: "var(--foreground)",
        background: "var(--background)",
        surface: "var(--surface)",
        muted: {
          DEFAULT: "var(--muted)",
          soft: "var(--muted-soft)",
        },
        brand: {
          DEFAULT: "var(--primary)",
          dark: "var(--primary-dark)",
          soft: "var(--primary-soft)",
        },
        signal: "var(--signal)",
        line: "var(--border)",
      },

      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },

      fontSize: {
        "display-xl": [
          "clamp(2.75rem,6vw,4.5rem)",
          { lineHeight: "0.98", letterSpacing: "-0.045em" },
        ],
        "display-lg": [
          "clamp(2.25rem,4.4vw,3.5rem)",
          { lineHeight: "1.04", letterSpacing: "-0.04em" },
        ],
        "display-md": [
          "clamp(1.75rem,3vw,2.5rem)",
          { lineHeight: "1.12", letterSpacing: "-0.03em" },
        ],
        title: ["1.5rem", { lineHeight: "1.25", letterSpacing: "-0.025em" }],
        "body-lg": ["1.0625rem", { lineHeight: "1.75" }],
        body: ["0.9375rem", { lineHeight: "1.7" }],
        meta: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.01em" }],
      },

      borderRadius: {
        pill: "999px",
        card: "24px",
        panel: "32px",
        media: "16px",
      },

      boxShadow: {
        float: "0 18px 55px rgba(31,50,112,.13)",
        lift: "0 24px 70px rgba(31,50,112,.10)",
        soft: "0 8px 24px rgba(31,50,112,.06)",
      },

      maxWidth: {
        shell: "1240px",
        prose: "62ch",
      },

      transitionTimingFunction: {
        brand: "cubic-bezier(0.22, 1, 0.36, 1)",
      },

      transitionDuration: {
        micro: "180ms",
        ui: "320ms",
        enter: "700ms",
      },

      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "marquee-slow": "marquee 34s linear infinite",
        "marquee-reverse": "marquee-reverse 32s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;