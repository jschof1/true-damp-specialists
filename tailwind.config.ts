import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        russo: ["Russo One", "sans-serif"],
        body: "var(--font-body)",
        mono: "var(--font-mono)",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        overlay: "hsl(var(--overlay))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          "text-on-light": "hsl(var(--accent-text-on-light))",
          dark: "hsl(var(--yellow-dark))",
        },
        "section-subtle": "hsl(var(--section-subtle))",
        "section-dark": "hsl(var(--section-dark))",
        "section-alt": "hsl(var(--section-alt))",
        "text-on-dark": {
          DEFAULT: "hsl(var(--text-on-dark))",
          muted: "hsl(var(--text-on-dark-muted))",
        },
        "image-scrim": "hsl(var(--image-scrim))",
        canvas: "hsl(var(--canvas))",
        elevated: "hsl(var(--elevated))",
        inverse: "hsl(var(--inverse))",
        "text-strong": "hsl(var(--text-strong))",
        "text-muted": "hsl(var(--text-muted))",
        "text-on-primary-muted": "hsl(var(--text-on-primary-muted))",
        "text-on-dark-subtle": "hsl(var(--text-on-dark-subtle))",
        "image-scrim-soft": "hsl(var(--image-scrim-soft))",
        "image-scrim-strong": "hsl(var(--image-scrim-strong))",
        "glass-soft": "hsl(var(--glass-soft))",
        "glass-strong": "hsl(var(--glass-strong))",
        "accent-surface": "hsl(var(--accent-surface))",
        "accent-ink-on-light": "hsl(var(--accent-ink-on-light))",
        "accent-ink-on-dark": "hsl(var(--accent-ink-on-dark))",
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        navy: {
          DEFAULT: "hsl(var(--navy))",
          dark: "hsl(var(--navy-dark))",
        },
        cobalt: {
          DEFAULT: "hsl(var(--cobalt))",
          light: "hsl(var(--cobalt-light))",
        },
        yellow: {
          DEFAULT: "hsl(var(--yellow))",
          dark: "hsl(var(--yellow-dark))",
          foreground: "hsl(var(--yellow-foreground))",
        },
        trust: "hsl(var(--trust-green))",
        warning: "hsl(var(--warning-orange))",
      },
      borderRadius: {
        none: "0",
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius)",
        md: "var(--radius)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-xl)",
        full: "var(--radius-full)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-in-right": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-in-left": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-in-top": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scroll": {
          to: { transform: "translate(calc(-50% - 0.5rem))" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.05)" },
        },
        "hero-title-line-1": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "hero-title-line-2": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "hero-fire-pop": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "hero-cta-entrance": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      backgroundImage: {
        "accent-gradient": "var(--accent-gradient)",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "slide-in-right": "slide-in-right 0.5s ease-out forwards",
        "slide-in-left": "slide-in-left 0.5s ease-out forwards",
        "slide-in-top": "slide-in-top 0.5s ease-out forwards",
        "scroll": "scroll 80s linear infinite",
        "pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
        "hero-title-line-1": "hero-title-line-1 0.6s ease-out forwards",
        "hero-title-line-2": "hero-title-line-2 0.7s ease-out 0.15s forwards",
        "hero-fire-pop": "hero-fire-pop 0.5s ease-out 0.35s forwards",
        "hero-cta-entrance": "hero-cta-entrance 0.5s ease-out 0.5s forwards",
      },
    },
  },
  plugins: [tailwindcssAnimate, typography],
} satisfies Config;
