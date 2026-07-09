/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  media: false, // or 'media' or 'class'
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
    extend: {
      animation: {
        blink: 'blink 1s steps(1, start) infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { backgroundColor: 'transparent', color: '#ffffff' },
          '50%': { backgroundColor: '#ffffff', color: '#000000' }, // Change to your color
        },
      },
    },
  },
  plugins: ['prettier-plugin-tailwindcss'],
}
