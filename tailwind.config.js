/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { ...colors.cyan, DEFAULT: colors.cyan[500] },
      },
    },
  },
  plugins: [],
};
