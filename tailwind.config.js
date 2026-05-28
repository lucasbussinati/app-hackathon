/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sage: {
          50: "#f4f7f4",
          100: "#e6ede5",
          200: "#cddccb",
          300: "#a8c2a4",
          400: "#7ea077",
          500: "#5e8358",
          600: "#496944",
          700: "#3b5538",
          800: "#31452f",
          900: "#293a28",
        },
        sand: {
          50: "#fbf8f3",
          100: "#f5eee0",
          200: "#ead9b8",
          300: "#dec18a",
          400: "#d1a45c",
          500: "#c4893f",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        display: [
          "'DM Serif Display'",
          "Georgia",
          "serif",
        ],
      },
      boxShadow: {
        soft: "0 10px 30px -10px rgba(73, 105, 68, 0.25)",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out both",
        "scale-in": "scaleIn 0.3s ease-out both",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
