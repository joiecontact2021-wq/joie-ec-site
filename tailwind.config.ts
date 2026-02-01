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
        serif: ['var(--font-cormorant)', 'serif'], // 英語のおしゃれフォント
        sans: ['var(--font-noto)', 'sans-serif'], // 日本語のきれいなフォント
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