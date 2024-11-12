/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    // Add other paths if needed
  ],
  padding: {
    custom: '100px'
  },
  theme: {
    container: {
      padding: {
        DEFAULT: 'px',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1280px',
      xl: '1330px',
    },
    extend: {
      colors: {
        primary: '#242a2b', // Ensure the hex code is correct
        secondary: '#808080',
        accent: {
          DEFAULT: '#1cbccf',
          secondary: '#18abbc',
          tertiary: '#90c6cd',
        },
        gray: '#c8f0f1'
      },
      fontSize: {
        'fs-4': 'calc(1.275rem + 0.3vw)', // Same as your .fs-4 class
      },
      fontFamily: {
        primary: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
         custom1: '0px 2px 40px 0px rgba(8, 70, 78, 0.08)',
         custom2: '0px 0px 30px 0px rgba(8, 73, 81, 0.06)',
      },
      backgroundImage: {
        services: "url('/img/services/bg.svg')",
        testimonials: "url('/img/bg/bg.svg')",
        departments: "url('/img/departments/bg.svg')",
        quoteLeft: "url('/img/bg/quote-left.svg')",
        quoteRight: "url('/img/bg/quote-right.svg')",
      },
    },
  },
  plugins: [],
}
