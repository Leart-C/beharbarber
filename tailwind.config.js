/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],

  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        "surface-secondary": "var(--color-surface-secondary)",

        foreground: "var(--color-foreground)",
        "foreground-secondary":
          "var(--color-foreground-secondary)",

        border: "var(--color-border)",

        primary: "var(--color-primary)",
        "primary-pressed": "var(--color-primary-pressed)",

        danger: "var(--color-danger)",
      },

      fontFamily: {
        "inter-medium": ["Inter_500Medium"],
        "inter-semibold": ["Inter_600SemiBold"],
        "inter-bold": ["Inter_700Bold"],
        "inter-extrabold": ["Inter_800ExtraBold"],
      },
    },
  },

  plugins: [],
};