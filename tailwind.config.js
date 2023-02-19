/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.{html,jsx,js}"
  ],

  darkMode: 'class',
  
  theme: {
    extend: {
      colors: {
        WALightGreen: 'rgb(37, 211, 102)',
        WATeal: 'rgb(18, 140, 126)',
        WADarkTeal: '#1F2C34',
        WADarkGreen: '#111b21',
        WADarkestGreen: 'hsl(203, 32%, 8%)'
      },
      
      fontFamily: {
        roboto: ['Roboto', 'sans-serif']
      },

      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },

        dropdown: {
          '0%': {top: '-280px'},
          // '50%': {top: '-140px'},
          '100%': {top: '0px'}
        }
      },

      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        dropdown: 'dropdown 0.5s ease-out'
      }
    }
  },

  plugins: [
    require("tailwindcss-animate")
  ],
}
