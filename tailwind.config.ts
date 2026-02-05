import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // PlotArmour Studio - Monochrome palette
                primary: {
                    50: "#ffffff",
                    100: "#e5e5e5",
                    200: "#cccccc",
                    300: "#b3b3b3",
                    400: "#999999",
                    500: "#808080",
                    600: "#666666",
                    700: "#4d4d4d",
                    800: "#333333",
                    900: "#1a1a1a",
                },
                // Dark theme - Pure blacks and grays
                dark: {
                    50: "#ffffff",
                    100: "#e5e5e5",
                    200: "#cccccc",
                    300: "#999999",
                    400: "#666666",
                    500: "#4a4a4a",
                    600: "#333333",
                    700: "#1a1a1a",
                    800: "#111111",
                    900: "#0a0a0a",
                    950: "#080808",
                },
            },
            fontFamily: {
                sans: ["Chakra Petch", "system-ui", "sans-serif"],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-dark": "linear-gradient(to bottom, #080808, #0a0a0a)",
            },
            boxShadow: {
                subtle: "0 1px 3px rgba(0, 0, 0, 0.5)",
                card: "0 4px 20px rgba(0, 0, 0, 0.4)",
            },
            animation: {
                "fade-in": "fadeIn 0.3s ease-out",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0", transform: "translateY(4px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
            },
        },
    },
    plugins: [],
};

export default config;
