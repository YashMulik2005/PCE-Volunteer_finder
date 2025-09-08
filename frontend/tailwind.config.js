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

        main_blue: "#399efc",
        dark_blue: "#1f184a",
        light_blue: "#e1f1ff",
        shadow: "#f1f1f1",
        off_white: "#fafcfe",

        primary_blue_color: "#45849b",
        secondary_blue_color: "#047294",
        primary_white_color: "#fafafa",
        secondary_white_color: "#f6f6f6",
      },
    },
  },
  plugins: [require("daisyui")],
};
