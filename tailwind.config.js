/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    // Add other paths if needed
  ],
  theme: {
    extend: {
      backgroundColor: {
        'custom-gray': '#F4F4F4',
      },
    },
  },
  plugins: [],
}
