/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkText: "#f8f8f2",
      },
      backgroundColor: {
        darkBg: "#282A36",
      },
    },
  },
  plugins: [],
};
