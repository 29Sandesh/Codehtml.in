/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#000000",
        "on-primary": "#ffffff",
        "secondary": "#ffffff",
        "on-secondary": "#000000",
        "surface": "#ffffff",
        "on-surface": "#000000",
        "surface-variant": "#f1f1f1",
        "on-surface-variant": "#4c4546",
        "background": "#ffffff",
        "on-background": "#000000",
        "outline": "#000000",
        "outline-variant": "#cfc4c5",
        "error": "#ba1a1a",
        "on-error": "#ffffff",
        "vintage-orange": "#f97316",
        "vintage-gold": "#2563eb",
        "vintage-red": "#ef4444"
      },
      fontFamily: {
        "headline": ["Outfit", "sans-serif"],
        "elegant": ["Cormorant Garamond", "serif"],
        "body": ["Inter", "sans-serif"],
        "label": ["Inter", "sans-serif"],
        "jakarta": ["Plus Jakarta Sans", "sans-serif"],
        "newsreader": ["Newsreader", "serif"]
      },

      boxShadow: {
        "neo": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        "neo-large": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      },
      animation: {
        "marquee": "marquee 20s linear infinite",
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
