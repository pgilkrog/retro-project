/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  safelist: [
    'bg-yellow-500',
    'bg-red-500',
    'bg-green-500',
    'bg-blue-500',
    'bg-orange-500',
    'bg-indigo-500',
    'text-yellow-500',
    'text-red-500',
    'text-green-500',
    'text-blue-500',
    'text-orange-500',
    'text-indigo-500',
  ],
  theme: {
    extend: {},
  },
  plugins: ['prettier-plugin-tailwindcss'],
}