/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{js,css}", "./src/views/**/*.{pug,html}"],
  theme: {
    fontFamily: {
      nunito: ["nunito", "sans-serif"],
    },
    extend: {
      container: (theme) => {
        return {
          center: true,
          padding: {
            DEFAULT: "1rem",
            sm: "1.5rem",
            md: "2rem",
            lg: "2.5rem",
          },
          screens: {
            ...theme("screens"),
            lg: "1152px",
          },
        };
      },
    },
  },
  plugins: [],
};
