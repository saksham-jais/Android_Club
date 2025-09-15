/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        green: {
          400: '#22c55e',
        },
      },
      dropShadow: {
        lg: '0 10px 8px rgba(34, 197, 94, 0.7)',
      },
    },
  },
  plugins: [],
};
