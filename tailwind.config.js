/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { extend: {
    colors: { ink: "#0b1020", panel: "#111a2d" },
    boxShadow: { panel: "0 18px 50px rgba(0,0,0,.18)", glow: "0 0 25px rgba(103,232,249,.18)" },
    fontFamily: { sans: ["DM Sans", "ui-sans-serif", "system-ui"] }
  }},
  plugins: []
};