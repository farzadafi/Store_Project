/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./main.js",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradiant': "linear-gradient(45deg, rgba(255,0,153,1) 0%, rgba(160,0,255,1) 100%);"
      }
    },
    fontFamily: {
      'vazir': ['Vazir', 'sans-serif'],
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}