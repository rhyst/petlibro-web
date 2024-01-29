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
        transparent: "transparent",
        success: "#034f22", // green
        fail: "#3d1518", // red
        info1: "#445f5a", // light blue
        info2: "#1c435f", // dark blue
        black: "#111517",
      },
    },
  },
  plugins: [],
};
export default config;
