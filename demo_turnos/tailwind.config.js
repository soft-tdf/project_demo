/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        odoo: {
          purple: '#714B67',
          darkPurple: '#54374D',
          lightPurple: '#8f6284',
          accent: '#00A09D',
          amber: '#F0AD4E',
          teal: '#017E84',
        }
      }
    },
  },
  plugins: [],
}
