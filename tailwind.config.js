/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Poppins", "sans-serif"], // Default font (Poppins)
                poppins: ["Poppins", "sans-serif"],
                roboto: ["Roboto", "sans-serif"], // Added Roboto
            },
            colors: {
                primary: "#45EA69",
                black: "#1D1D1F",
                black_1: "#313133",
                black_2: "#3D3C3F",
                black_3: "#8C8A93",
                whtie: "#FFFFFF",
            },
        },
    },
    plugins: [],
};
