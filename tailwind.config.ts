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
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      },
      colors: {
        // ── Dashboard / admin (dark indigo) ───────────────────────────
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
        // ── Marketing fintech palette ──────────────────────────────────
        'mkt-base':     '#070C16',
        'mkt-surface':  '#0D1526',
        'mkt-elevated': '#141E33',
        'mkt-border':   '#1E2D4A',
        'mkt-border-subtle': '#162038',
        'brand':        '#4169FF',
        'brand-hover':  '#5578FF',
        'brand-muted':  'rgba(65,105,255,0.12)',
        'txt-primary':  '#FFFFFF',
        'txt-secondary':'#8A97B0',
        'txt-tertiary': '#4F617A',
        'semantic-green': '#00C896',
        'semantic-red':   '#FF4D6A',
        'semantic-yellow':'#F5A623',
      },
      letterSpacing: {
        tightest: '-0.035em',
        tighter: '-0.02em',
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
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'gradient-shift': 'gradient-shift 6s ease infinite',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'slide-up': 'slide-up 0.5s ease-out forwards',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
