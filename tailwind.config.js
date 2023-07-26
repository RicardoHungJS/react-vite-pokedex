/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        
        'wobble-ver-left': {
          '0%': {
            transform: 'translateY(0) rotate(0) scale(1.25)',
            'transform-origin': '50% 50%',
          },
          '15%': {
            transform: 'translateY(-20px) rotate(-6deg) scale(1.25)',
          },
          '30%': {
            transform: 'translateY(5px) rotate(6deg) scale(1.25)',
          },
          '45%': {
            transform: 'translateY(-5px) rotate(-3.6deg) scale(1.25)',
          },
          '60%': {
            transform: 'translateY(-1px) rotate(2.4deg) scale(1.25)',
          },
          '75%': {
            transform: 'translateY(-6px) rotate(-1.2deg) scale(1.25)',
          },
          '100%': {
            transform: 'translateY(0) rotate(0) scale(1.25)',
            'transform-origin': '50% 50%',
          },
        },
      },
      animation: {
        'wobble-ver-left': 'wobble-ver-left 1s ease',
      },
    },
  },
  plugins: [],
};
