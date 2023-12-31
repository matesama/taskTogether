
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'hero': `url("./src/components/home/img/hero.png")`
      },
      flex: {
        '5.5': '5.5 5.5 0%'
      }
  },
  plugins: [],
}
}

