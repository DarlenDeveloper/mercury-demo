import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#eef0f4",
        card: "#ffffff",
        ink: "#1c2433",
        muted: "#8b93a4",
        line: "#eceef2",
        accent: {
          DEFAULT: "#1f5fd9",
          soft: "#eaf1fe",
        },
        navy: "#1f2a3c",
        slate2: "#2f3c52",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(20,28,46,0.04), 0 6px 24px rgba(20,28,46,0.05)",
        pop: "0 8px 30px rgba(20,28,46,0.12)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
