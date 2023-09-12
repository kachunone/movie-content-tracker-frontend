/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        myBlueDark: "#1F2532",
        myBlueLight: "#354057",
        myBlueDarker: "#081426",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
