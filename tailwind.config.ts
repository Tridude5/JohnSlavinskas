import type { Config } from 'tailwindcss'

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: { center: true, padding: "1rem" },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', 'Inter', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'Apple Color Emoji', 'Segoe UI Emoji'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace']
      },
      colors: {
        brand: {
          50:"#ecfdf5", 100:"#d1fae5", 200:"#a7f3d0", 300:"#6ee7b7",
          400:"#34d399", 500:"#10b981", 600:"#059669", 700:"#047857",
          800:"#065f46", 900:"#064e3b"
        }
      }
    },
  },
  darkMode: "media",
  plugins: [],
} satisfies Config