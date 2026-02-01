import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-cormorant)', 'serif'],
        sans: ['var(--font-noto)', 'sans-serif'],
      },
      colors: {
        joie: {
          bg: '#FDFCF8',
          text: '#4A4A4A',
          accent: '#A69B95',
        }
      },
    },
  },
  plugins: [],
};
export default config;