/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        whatsapp: {
          primary: '#00a884',
          secondary: '#008069',
          light: '#d1f4cc',
          dark: '#075e54',
          gray: '#f0f2f5',
          bubble: '#dcf8c6'
        }
      }
    },
  },
  plugins: [],
}