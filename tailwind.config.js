/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.{html,jsx,js}"
  ],

  darkMode: 'class',
  
  theme: {
    extend: {
      colors: {
        WATeal: 'rgb(18, 140, 126)',
        WADarkTeal: '#1F2C34',
        WALightGreen: 'rgb(37, 211, 102)'
      }
    },
  },
  plugins: [],
}
