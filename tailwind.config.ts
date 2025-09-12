import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        'cream': '#f0e4d7',
        'charcoal': '#161616',
      },
      fontFamily: {
        sans: ['Geist Sans', 'sans-serif'],
        serif: ['var(--font-lora)'],
        raleway: ['var(--font-raleway)'],
      },
    },
  },
  plugins: [],
};

export default config;
