import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Riviera Palette
        softRed: "#FF8B8B",
        deepRed: "#9C2525",
        deepYellow: "##FDC96B",
        deepOrange: "#FFB74D",
        darkOrange: "#FF5925",
        lightCream: "#F9F8E6",
        // Swan Dive Palette
        paleYellow: "#F9F7E8",
        teal: "#62BFAD",
        // Additional colors
        background: "#F7F5F2",
        foreground: "#2D2D2D",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
