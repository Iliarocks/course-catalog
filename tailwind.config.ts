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
        first: "#274C77",
        second: "#6096BA",
        third: "#A3CEF1",
        fourth: "#8B8C89",
        fifth: "#E7ECEF",
      },
      boxShadow: {
        custom: "0 1px 4px 0 rgba(0,0,0,.1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
