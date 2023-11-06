/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  // These paths are just examples, customize them to match your project structure
  content: ["./public/**/*.{js,css}", "./src/views/**/*.{ejs,html}"],
  theme: {
    fontFamily: {
      nunito: ["nunito", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
