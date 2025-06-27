/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       colors: {
         'brand-primary': '#4f46e5', // Indigo 600
         'brand-secondary': '#7c3aed', // Violet 600
         'accent': '#d946ef', // Fuchsia 500
         'base-100': '#f3f4f6', // Gray 100 (main bg)
         'base-200': '#ffffff', // White (card bg)
         'base-300': '#e5e7eb', // Gray 200 (borders)
         'content-100': '#111827', // Gray 900 (primary text)
         'content-200': '#4b5563', // Gray 600 (secondary text)
       },
       animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
       },
       keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
       }
    },
  },
  plugins: [],
}