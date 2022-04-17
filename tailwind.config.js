/* eslint-disable no-undef */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'sm': '600px',
        // => @media (min-width: 992px) { ... }
      },
    },
    screens: {
      'xs': '476px',
      ...defaultTheme.screens,
    },
  },
  plugins: [],
};
