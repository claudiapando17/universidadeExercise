/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'blue': '#2c2b40',
      'blue-medium': '#535269',
      'blue-light': '#e6f1fc',
      'red': '#f01818',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'yellow-light': '#fcfbe6',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
      'black': '#000000',
      'white': '#FFFFFF',
    },
    fontFamily: {
      sans: ['Oswald', 'sans-serif'],
    },

    extend: {
      textShadow: {
        '3d': '4px 4px 8px rgba(0, 0, 0, 0.5), -4px -4px 8px rgba(255, 255, 255, 0.2)',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
    plugins: [
      require('tailwindcss-textshadow'),
      require('@tailwindcss/aspect-ratio'),
      require('@tailwindcss/forms'),
    ],
  }
}