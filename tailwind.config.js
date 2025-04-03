/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"], // Default font (Poppins)
        poppins: ["Poppins", "sans-serif"], 
        roboto: ["Roboto", "sans-serif"],  // Added Roboto
      },
    },
  },
  plugins: [],
};
