import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        joie: {
          bg: '#Fdfcf8', // 背景のクリーム色
          text: '#5c4b43', // ロゴのようなダークブラウン
          accent: '#8c7b73', // 薄めのブラウン
        }
      },
    },
  },
  plugins: [],
};
export default config;