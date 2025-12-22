/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // tiny starter tokens you can expand from Figma later
        primary: "#111827", // dark
        accent: "#ef4444", // red-ish example
      },
    },
  },
  plugins: [],
};
