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
        display1: ["56px", { lineHeight: "100px", letterSpacing: "-2.24px" }],
        display2: ["46px", { lineHeight: "52px", letterSpacing: "-0.92px" }],
        display3: ["30px", { lineHeight: "36px", letterSpacing: "-0.6px" , fontWeight: "700"}],
        title1: ["24px", { lineHeight: "32px", fontWeight: "700" }], 
        title2: ["20px", { lineHeight: "28px" }],
        title3: ["20px", { lineHeight: "28px" }],
        subtitle1: ["20px", { lineHeight: "28px", fontWeight: "400" }],
        subtitle2: ["16px", { lineHeight: "24px", fontWeight: "400" }],
        bodyBold: ["14px", { lineHeight: "20px", fontWeight: "700" }],
        body: ["14px", { lineHeight: "20px", fontWeight: "400" }],
        signal1: ["14px", { lineHeight: "20px", letterSpacing: "0.84px", fontWeight: "400" }],
        caption: ["12px", { lineHeight: "20px", fontWeight: "400" }],
        signal2: ["10px", { lineHeight: "12px", letterSpacing: "0.5px", fontWeight: "400" }],
      },
    },
  },
  plugins: [],
} satisfies Config;
