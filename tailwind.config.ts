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
        serif: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-noto)", "sans-serif"],
      },
      colors: {
        "joie-bg": "var(--joie-bg)",
        "joie-text": "var(--joie-text)",
        "joie-accent": "var(--joie-accent)",
        "joie-mist": "var(--joie-mist)",
        "joie-ink": "var(--joie-ink)",
      },
    },
  },
  plugins: [],
};
export default config;
