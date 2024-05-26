/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
      },
      colors: {
        headerTextColor: '#3563E9',
      },
      animation: {
        'bg-move': 'bg-move 15s infinite',
        'ghost-float': 'ghost-float 4s ease-in-out infinite',
        'bat-fly': 'bat-fly 6s linear infinite',
      },
      keyframes: {
        'bg-move': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'ghost-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backgroundImage: theme => ({
        'scary-gradient': 'linear-gradient(to right, #000000, #1a1a1a, #333333, #4d4d4d, #666666)',
      }),
    },
  },
  plugins: [],
}