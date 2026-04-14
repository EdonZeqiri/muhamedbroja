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
        primary: "#1D1D1D",
        secondary: "#6E6E6E",
        accent: "#0D6EFF",
        border: "#E4E4E4",
        "layout-bg": "#F1F1F1",
        "site-bg": "#FFFFFF",
      },
      fontFamily: {
        base: ["Satoshi", "sans-serif"],
        headings: ["GeneralSans", "sans-serif"],
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
