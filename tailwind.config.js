/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
        fontFamily: {
          sans: ["Poppins", "sans-serif"],
          poppins: ["Poppins", "sans-serif"],
          roboto: ["Roboto", "sans-serif"],
        },
        colors: {
          primary: "#45EA69",
          black: "#1D1D1F",
          black_1: "#313133",
          black_2: "#3D3C3F",
          black_3: "#8C8A93",
          white: "#FFFFFF", // typo fixed
        },
      },
    },
    plugins: [],
  };
  