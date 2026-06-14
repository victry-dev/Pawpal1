/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#1B5E3B',
          surface: '#E8F5E9',
          orange: '#F4845F',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        app: '430px',
      },
      boxShadow: {
        card: '0 2px 12px rgba(0, 0, 0, 0.06)',
        nav: '0 -2px 16px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
}
