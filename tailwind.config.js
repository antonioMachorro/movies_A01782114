/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bluegray': '#555765',
        'lightgray': '#d9d9e6',
      }
    },
  },
  plugins: [],
}

