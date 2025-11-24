/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#D4AF37", // dourado principal
          light: "#E3C769",   // opcional, tom mais claro
          dark: "#B9962F",    // opcional, tom mais escuro
        },
      },
    },
  },
  plugins: [],
};
