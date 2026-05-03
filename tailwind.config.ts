import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      },
      colors: {
        bg: {
          DEFAULT: 'var(--color-bg)',
          subtle: 'var(--color-bg-subtle)',
          elevated: 'var(--color-bg-elevated)',
        },
        brand: {
          DEFAULT: 'var(--color-brand)',
          hover: 'var(--color-brand-hover)',
          muted: 'var(--color-brand-muted)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          body: 'var(--color-text-body)',
          muted: 'var(--color-text-muted)',
          faint: 'var(--color-text-faint)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
          subtle: 'var(--color-border-subtle)',
        },
        positive: 'var(--color-positive)',
        /* Legacy aliases */
        'bg-base':     'var(--bg-base)',
        'bg-surface':  'var(--bg-surface)',
        'bg-elevated': 'var(--bg-elevated)',
        'border-base': 'var(--border-base)',
        accent:        'var(--accent-hex)',
        'text-primary':   'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted':     'var(--text-muted)',
        /* shadcn */
        background:             'hsl(var(--background))',
        foreground:             'hsl(var(--foreground))',
        card:                   'hsl(var(--card))',
        'card-foreground':      'hsl(var(--card-foreground))',
        primary:                'hsl(var(--primary))',
        'primary-foreground':   'hsl(var(--primary-foreground))',
        secondary:              'hsl(var(--secondary))',
        'secondary-foreground': 'hsl(var(--secondary-foreground))',
        muted:                  'hsl(var(--muted))',
        'muted-foreground':     'hsl(var(--muted-foreground))',
        destructive:            'hsl(var(--destructive))',
        'destructive-foreground': 'hsl(var(--destructive-foreground))',
        popover:                'hsl(var(--popover))',
        'popover-foreground':   'hsl(var(--popover-foreground))',
      },
      maxWidth: {
        container: '1200px',
      },
      borderRadius: {
        sm:   'var(--radius-sm)',
        md:   'var(--radius-md)',
        lg:   'var(--radius-lg)',
        xl:   'var(--radius-xl)',
        pill: 'var(--radius-pill)',
      },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up':   { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        marquee:   { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'slide-up':{ '0%': { transform: 'translateY(16px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
      },
      animation: {
        'accordion-down': 'accordion-down 300ms ease',
        'accordion-up':   'accordion-up 300ms ease',
        marquee:          'marquee 24s linear infinite',
        'fade-in':        'fade-in 0.4s ease-out forwards',
        'slide-up':       'slide-up 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
