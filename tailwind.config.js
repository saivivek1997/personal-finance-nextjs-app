/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        customBoxShadow: "0 4px 24px 0 rgba(0, 0, 0, 0.25)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        beige: {
          500: "#98908b",
          100: "#f8f4f0",
        },
        grey: {
          100: "#f2f2f2",
          300: "#b3b3b3",
          500: "#696868",
          900: "#201f24",
        },
        customGreen: "#277C78",
        sidebarColor: "#464646",
        customRed: "#C94736",
      },
    },
  },
  plugins: [],
};
