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
        primary: "#404040",
        secondary: "#808080",
        tertiary: "#f5f5f5",
        quaternary: "#fafafa",
      },
    },
  },
  plugins: [],
} satisfies Config;
