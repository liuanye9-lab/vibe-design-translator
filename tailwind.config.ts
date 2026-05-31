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
        // Light theme
        light: {
          bg: "#F5F5F7",
          surface: "rgba(255,255,255,0.60)",
          surfaceStrong: "rgba(255,255,255,0.85)",
          textPrimary: "#1C1C1E",
          textSecondary: "#606067",
          border: "rgba(0,0,0,0.05)",
        },
        // Accent colors
        accent: {
          iosBlue: "#007AFF",
          mistBlue: "#8EA7C4",
          softViolet: "#A99BC6",
          silver: "#D8D6D0",
          mutedCyan: "#9CCFD8",
        },
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
      },
      backdropBlur: {
        xl: "24px",
      },
    },
  },
  plugins: [],
};

export default config;