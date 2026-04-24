import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090b',
        'background-secondary': '#0f0f11',
        'background-card': '#111113',
        border: '#1f1f23',
        'border-strong': '#2a2a2e',
        foreground: '#fafafa',
        'foreground-muted': '#a1a1aa',
        accent: '#6366f1',
        'accent-hover': '#4f46e5',
        'accent-muted': 'rgba(99,102,241,0.12)',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'gradient-shift': 'gradient-shift 6s ease infinite',
        'fade-in': 'fade-in 0.5s ease forwards',
        'slide-up': 'slide-up 0.5s ease forwards',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
