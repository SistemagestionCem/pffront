import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          100: "#f5acaa",
          200: "#f08380",
          300: "#eb5955",
          400: "#e6302b",
          500: "#e10600",
          600: "#bc0500",
          700: "#960400",
          800: "#710300",
          900: "#4b0200",
        },
        secondary: {
          100: "#b5b5b5",
          200: "#909090",
          300: "#6b6b6b",
          400: "#464646",
          500: "#212121",
          600: "#1c1c1c",
          700: "#161616",
          800: "#111111",
          900: "#0b0b0b",
        },
      },
      fontFamily: {
        rajdhani: ["Rajdhani", "sans-serif"],
      },
      fontSize: {
        display1: ["46px", { lineHeight: "52px", fontWeight: "bold" }],
        display2: ["36px", { lineHeight: "46px", fontWeight: "bold" }],
        display3: ["30px", { lineHeight: "40px", fontWeight: "bold" }],
        title1: ["24px", { lineHeight: "32px", fontWeight: "bold" }],
        title2: ["20px", { lineHeight: "28px", fontWeight: "bold" }],
        title3: ["16px", { lineHeight: "24px", fontWeight: "bold" }],
        subtitle1: ["20px", { lineHeight: "28px", fontWeight: "lighter" }],
        subtitle2: ["16px", { lineHeight: "24px", fontWeight: "lighter" }],
        bodyBold: ["14px", { lineHeight: "20px", fontWeight: "bold" }],
        body: ["14px", { lineHeight: "20px", fontWeight: "lighter" }],
        captionBold: ["12px", { lineHeight: "16px", fontWeight: "bold" }],
        captionStrikethrough: [
          "12px",
          { lineHeight: "16px", fontWeight: "normal" },
        ],
        caption: ["12px", { lineHeight: "16px", fontWeight: "lighter" }],
        signal1: ["14px", { lineHeight: "20px", fontWeight: "lighter" }],
        signal2: ["10px", { lineHeight: "12px", fontWeight: "bold" }],
      },
      screens: {
        lg: "1024px",
      },
    },
  },
  plugins: [
    function({ addUtilities }: { addUtilities: any }) {
      addUtilities({
        ".text-shadow": {
          "text-shadow": "2px 2px 4px rgba(0, 0, 0, 0.2)",
        },
      });
    },
  ],
} satisfies Config;
