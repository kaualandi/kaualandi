/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'primary-bg': 'var(--primary-bg)',
        paragraph: 'var(--paragraph-color)',
        title: 'var(--title-color)',
        primary: {
          0: '#000000',
          10: '#180065',
          20: '#2b009e',
          25: '#360ab7',
          30: '#4223c1',
          35: '#4e34cd',
          40: '#5a43da',
          50: '#745ff4',
          60: '#8f7fff',
          70: '#ab9fff',
          80: '#c7bfff',
          90: '#e5deff',
          95: '#f3eeff',
          98: '#fcf8ff',
          99: '#fffbff',
          100: '#ffffff',
        },
      },
      backgroundImage: {
        'hero-pattern': "url('/images/hero-pattern.png')",
      },
    },
  },
  plugins: [],
};
