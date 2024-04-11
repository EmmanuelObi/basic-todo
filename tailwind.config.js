/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      borderWidth: {
        1: "1px",
      },
      colors: {
        primary: "#3556AB",
        lime: "#CDE53D",
        "lime-border": "#9EB031",
        "deep-blue": "#071D55",
        delete: "#AB3535",
        "delete-border": "#720D0D",
        "primary-border": "#0D2972",
        "add-border": "#123EB1",
        dollar: "#F2C94C",
        grey: "#8D8D8D",
        "input-bg": "#FDFDFD",
        "input-border": "#CBCBCB",
      },
    },
  },
  plugins: [],
};
