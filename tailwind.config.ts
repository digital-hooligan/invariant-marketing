import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}", "./content/**/*.{mdx,md}"],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
