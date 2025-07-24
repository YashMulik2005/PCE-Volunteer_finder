/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          lighter: "#FFFDF6",
          light: "#FAF6E9",
          lightest: "#FFFEFA",
        },
        greenish: {
          light: "#DDEB9D",
          base: "#A0C878",
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
