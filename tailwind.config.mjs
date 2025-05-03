/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  darkMode: "media",
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "var(--background)",
        },
        foreground: {
          DEFAULT: "var(--foreground)",
        },
      },
    },
  },

  plugins: [require("daisyui")],
};
