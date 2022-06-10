const path = require("path");

module.exports = {
  content: [path.join(__dirname, "./src/**/*.(js|jsx|ts|tsx)")],
  theme: {
    extend: {
      colors: {
        chartColor: {
          blue: "#0011F6",
          mainBlue: "#3240FF",
          lightBlue: "#3C91FF",
          nautical: "#48E3FF",
          turquoise: "#0BFFDB",
          lightViolet: "#BB9CFF",
          violet: "#8122FF",
          red: "#FD005C",
          lightRed: "#FF8BAA",
        },
        styleColors: {
          mainGray: "#2A3F58",
          darkGray: "#72809D",
          gray: "#CCD2DE",
          lightGray: "#FDF2F5",
          lightBlue: "#F4F7FC",
          greyBlue: "#DBE9FF",
        },
        systemColors: {
          success: "#A7E521",
          info: "#03C3EC",
          alert: "#FFD422",
          error: "#EF3F26",
        },
      },
    },
  },
  plugins: [],
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
};
