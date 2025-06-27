/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       colors: {
         'brand-primary': '#4f46e5',
         'brand-secondary': '#7c3aed',
         'base-100': '#1f2937',
         'base-200': '#374151',
         'base-300': '#4b5563',
         'content-100': '#d1d5db',
         'content-200': '#9ca3af',
       },
    },
  },
  plugins: [],
}
