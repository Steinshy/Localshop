/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    // "./node_modules/@nextui-org/theme/dist/components/button.js", 
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
}