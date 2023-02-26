
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.{html,jsx,js}",
    "./public/pages/*{html,jsx,js}"
  ],

  darkMode: 'class',
  
  theme: {
    extend: {
      colors: {
        WABrightGreen: 'hsl(142, 70%, 49%)',
        WATeal: 'hsl(173, 77%, 31%)',
        WADarkTeal: 'hsl(203, 25%, 16%)',
        WADarkGreen: 'hsl(203, 32%, 10%)',
        WADarkGreen2: 'hsl(167, 100%, 33%)',
        WADarkestGreen: 'hsl(203, 32%, 8%)',
        WAChatBGLight: 'hsl(37, 29%, 91%)',
        WAChatBGLDark: 'hsl(206, 39%, 7%)'
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
          '100%': {top: '0px'}
        }
      },

      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        dropdown: 'dropdown 0.5s ease-out'
      },

      backgroundImage: {
        'WAChatBGPattern': "url('imgs/bg-pattern.png')"
      }
    }
  },

  plugins: [
    require("tailwindcss-animate")
  ],
}
