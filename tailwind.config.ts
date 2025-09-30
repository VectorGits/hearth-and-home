// tailwind.config.ts

import type { Config } from "tailwindcss";

const config: Config = {
  // The content array is still very important!
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  // The theme object can be removed entirely in v4
  plugins: [],
};

export default config;