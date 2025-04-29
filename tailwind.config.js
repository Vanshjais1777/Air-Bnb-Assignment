/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'airbnb-red': '#FF5A5F',
        'airbnb-pink': '#FF385C',
        'airbnb-dark-gray': '#222222',
        'airbnb-light-gray': '#717171',
        'airbnb-border': '#DDDDDD'
      },
      fontFamily: {
        sans: ['Circular', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif']
      },
      boxShadow: {
        'airbnb': '0px 6px 16px rgba(0, 0, 0, 0.12)',
        'airbnb-hover': '0px 6px 20px rgba(0, 0, 0, 0.2)'
      }
    },
  },
  plugins: [],
};