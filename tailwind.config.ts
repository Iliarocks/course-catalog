import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        first: "#1B263B",
        second: "#415A77",
        third: "#778DA9",
        fourth: "#E0E1DD",
      },
      spacing: {
        xs: "5px",
        sm: "10px",
        md: "20px",
        lg: "30px",
      },
    },
  },
  plugins: [],
} satisfies Config;
