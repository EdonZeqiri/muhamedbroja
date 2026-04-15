import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1D1D1F",
        secondary: "#616162",
        accent: "#c29464",
        border: "#E4E4E4",
        "layout-bg": "#faf9f6",
        "site-bg": "#FFFFFF",
      },
      fontFamily: {
        base: ["Inter", "sans-serif"],
        headings: ["Inter", "sans-serif"],
        serif: ["Recia", "serif"],
        display: ["Gambarino", "serif"],
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [],
};
export default config;
