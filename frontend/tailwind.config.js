/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
      primary: '#1da1f2',
      secondary: '#14171a',
      accent: '#657786',
      background: '#f5f8fa',
      border: '#e1e8ed',
      light: '#aab8c2',
      dark: '#0f1419',
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
    },
  },
  },
  plugins: [
    '@tailwindcss/typography',
  ],
}

