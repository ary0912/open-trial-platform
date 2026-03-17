/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        oxfordBlue: "#002147",
        oxfordLight: "#f4f7fb",
        oxfordAccent: "#2d6cdf",
      },
    },
  },
  plugins: [],
}