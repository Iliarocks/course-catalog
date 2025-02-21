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
      boxShadow: {
        custom:
          "2px 4px 4px hsl(214deg 23% 35% / 0.025), 4px 8px 8px hsl(214deg 23% 35% / 0.025), 8px 16px 16px hsl(214deg 23% 35% / 0.025)",
      },
    },
  },
  plugins: [],
} satisfies Config;
