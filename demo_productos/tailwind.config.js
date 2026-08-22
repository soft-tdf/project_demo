/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        odoo: {
          purple: '#714B67',
          'purple-dark': '#55364D',
          teal: '#00A09D',
          'teal-dark': '#008481',
          bg: '#F8F9FA',
          'bg-dark': '#111827',
          panel: '#FFFFFF',
          'panel-dark': '#1F2937',
          border: '#E5E7EB',
          'border-dark': '#374151',
        }
      }
    },
  },
  plugins: [],
}
