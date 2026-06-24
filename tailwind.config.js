/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    // Replace, don't extend — we only use semantic tokens.
    colors: {
      transparent: "transparent",
      current: "currentColor",
      bg: "var(--bg)",
      surface: "var(--surface)",
      "surface-sunk": "var(--surface-sunk)",
      border: "var(--border)",
      ink: "var(--ink)",
      "ink-soft": "var(--ink-soft)",
      accent: "var(--accent)",
      "accent-ink": "var(--accent-ink)",
      warn: "var(--warn)",
      "card-red": "var(--card-red)",
      "card-blue": "var(--card-blue)",
      "card-yellow": "var(--card-yellow)",
      "card-green": "var(--card-green)",
    },
    borderRadius: {
      none: "0",
      sm: "var(--radius-sm)",
      card: "var(--radius-card)",
      pill: "var(--radius-pill)",
    },
    fontFamily: {
      display: "var(--font-display)",
      body: "var(--font-body)",
      mono: "var(--font-mono)",
    },
    fontSize: {
      xs: ["var(--text-xs)", { lineHeight: "1.4" }],
      sm: ["var(--text-sm)", { lineHeight: "1.5" }],
      base: ["var(--text-base)", { lineHeight: "1.6" }],
      lg: ["var(--text-lg)", { lineHeight: "1.4" }],
      xl: ["var(--text-xl)", { lineHeight: "1.3" }],
      "2xl": ["var(--text-2xl)", { lineHeight: "1.2" }],
      "3xl": ["var(--text-3xl)", { lineHeight: "1.1" }],
    },
    fontWeight: {
      normal: "var(--weight-normal)",
      medium: "var(--weight-medium)",
      bold: "var(--weight-bold)",
    },
    spacing: {
      0: "0",
      1: "var(--space-1)",
      2: "var(--space-2)",
      3: "var(--space-3)",
      4: "var(--space-4)",
      6: "var(--space-6)",
      8: "var(--space-8)",
      12: "var(--space-12)",
      16: "var(--space-16)",
    },
    boxShadow: {
      1: "var(--shadow-1)",
      none: "none",
    },
    extend: {
      aspectRatio: {
        box: "2 / 3",
      },
    },
  },
  plugins: [],
};
