/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './slices/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          100: '#EBF1F5',
          200: '#D9E3EA',
          300: '#C5D2DC',
          400: '#9BA9B4',
          500: '#707D86',
          600: '#55595F',
          700: '#33363A',
          800: '#25282C',
          900: '#151719',
        },
        purple: {
          100: '#fff1f1',
          200: '#ffdfdf',
          300: '#ffc5c5',
          400: '#ff9d9d',
          500: '#ff6464',
          600: '#ff4040',
          700: '#ed1515',
          800: '#c80d0d',
          900: '#a50f0f',
        },
      },
      spacing: {
        '9/16': '56.25%',
        '3/4': '75%',
        '1/1': '100%',
      },
      fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif'],
        'architects-daughter': ['var(--font-architects-daughter)', 'sans-serif'],
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
        '5xl': '3.25rem',
        '6xl': '4rem',
      },
      inset: {
        full: '100%',
      },
      letterSpacing: {
        tighter: '-0.02em',
        tight: '-0.01em',
        normal: '0',
        wide: '0.01em',
        wider: '0.02em',
        widest: '0.4em',
      },
      minWidth: {
        10: '2.5rem',
      },
      scale: {
        98: '.98',
      },
      //override class for website width to make it general
      maxWidth: {
        '6xl': '90rem',
        '3xl': '80rem' 
      }
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
