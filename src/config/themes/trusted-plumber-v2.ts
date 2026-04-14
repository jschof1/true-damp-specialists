import type { ThemeConfig } from "@/types/config";

/**
 * Total Wraps & Tints theme
 * Vibe: powerful yet calm, warm and trustworthy, sharp and efficient.
 * Palette: deep charcoal/slate + clean greys + warm amber/burnt-orange accent.
 *
 * Important: this template uses `text-accent` on dark `bg-primary` sections,
 * and also uses `accent` as a button surface — so `accent` must be LIGHT
 * and `accentForeground` must be DARK.
 */
export const trustedPlumberThemeV2: ThemeConfig = {
  colors: {
    primary: {
      DEFAULT: "hsl(220 20% 13%)", // deep charcoal
      50: "hsl(220 16% 97%)",
      100: "hsl(220 14% 93%)",
      200: "hsl(220 14% 85%)",
      300: "hsl(220 12% 70%)",
      // Used as `--slate-medium` (button hover bg). Keep it dark for white text contrast.
      400: "hsl(220 16% 22%)",
      500: "hsl(220 18% 17%)",
      600: "hsl(220 20% 13%)",
      700: "hsl(220 22% 10%)",
      800: "hsl(220 24% 7%)",
      900: "hsl(220 26% 4%)",
    },
    secondary: {
      DEFAULT: "hsl(216 14% 91%)", // clean cool slate
      50: "hsl(216 18% 98%)",
      100: "hsl(216 16% 96%)",
      200: "hsl(216 14% 91%)",
      300: "hsl(216 12% 84%)",
      400: "hsl(216 10% 74%)",
      500: "hsl(216 10% 62%)",
      600: "hsl(216 10% 50%)",
      700: "hsl(216 12% 38%)",
      800: "hsl(216 16% 24%)",
      900: "hsl(216 20% 14%)",
    },
    accent: {
      // Warm amber/burnt-orange — the flame. Reads on dark charcoal sections.
      DEFAULT: "hsl(30 92% 56%)",
      50: "hsl(34 94% 97%)",
      100: "hsl(34 92% 93%)",
      200: "hsl(33 90% 85%)",
      300: "hsl(32 90% 74%)",
      400: "hsl(31 92% 65%)",
      500: "hsl(30 92% 56%)",
      600: "hsl(26 86% 48%)",
      700: "hsl(22 80% 40%)",
      800: "hsl(18 74% 32%)",
      900: "hsl(14 68% 24%)",
    },
    neutral: {
      DEFAULT: "hsl(218 12% 90%)",
      50: "hsl(218 16% 99%)",
      100: "hsl(218 14% 96%)",
      200: "hsl(218 12% 90%)",
      300: "hsl(218 10% 83%)",
      400: "hsl(218 10% 72%)",
      500: "hsl(218 8% 58%)",
      600: "hsl(218 8% 44%)",
      700: "hsl(218 10% 32%)",
      800: "hsl(218 14% 20%)",
      900: "hsl(218 18% 12%)",
    },
  },
  borderRadius: {
    sm: "0.375rem",
    DEFAULT: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    full: "9999px",
  },
  fontFamily: {
    heading:
      "'Plus Jakarta Sans', sans-serif",
    body: "'Inter', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'",
  },
  typography: {
    fontFamily: {
      display:
        "'Plus Jakarta Sans', sans-serif",
      body: "'Inter', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'",
      mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    },
    scale: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "2rem",
      "4xl": "2.5rem",
      "5xl": "3.25rem",
      "6xl": "4.25rem",
      "7xl": "5.5rem",
      "8xl": "7rem",
      "9xl": "9rem",
    },
    tracking: {
      tighter: "-0.04em",
      tight: "-0.02em",
      normal: "0em",
      wide: "0.04em",
      widest: "0.08em",
    },
    leading: {
      none: "1",
      tight: "1.1",
      snug: "1.3",
      normal: "1.55",
      relaxed: "1.7",
      loose: "1.85",
    },
  },
  layout: {
    container: {
      maxWidth: "80rem",
      maxWidthSm: "72rem",
      maxWidthLg: "120rem",
      paddingX: {
        base: "1.5rem",
        md: "2.5rem",
        lg: "1rem",
      },
    },
    section: {
      paddingY: {
        base: "6rem",
        md: "8rem",
        lg: "10rem",
      },
      dividerThickness: "2px",
    },
  },
  borders: {
    width: {
      hairline: "1px",
      thin: "1px",
      medium: "2px",
      thick: "4px",
      ultra: "8px",
    },
    focus: {
      outlineWidth: "2px",
      outlineOffset: "2px",
      inputFocusBorderWidth: "2px",
    },
  },
  surfaces: {
    background: "hsl(30 8% 97%)",
    foreground: "hsl(220 20% 12%)",
    overlay: "hsl(0 0% 0%)",
    card: "hsl(0 0% 100%)",
    cardForeground: "hsl(220 20% 12%)",
    popover: "hsl(0 0% 100%)",
    popoverForeground: "hsl(220 20% 12%)",
    border: "hsl(218 12% 85%)",
    input: "hsl(218 12% 85%)",
    mutedForeground: "hsl(218 10% 42%)",
    primaryForeground: "hsl(0 0% 100%)",
    secondaryForeground: "hsl(220 20% 12%)",
    // Accent is a warm amber surface → ink should be dark.
    accentForeground: "hsl(220 24% 8%)",
    // Accent ink on light surfaces — deep burnt orange for punchy readability.
    accentTextOnLight: "hsl(22 80% 38%)",
    sectionSubtle: "hsl(30 8% 94%)",
    sectionDark: "hsl(220 20% 10%)",
    sectionAlt: "hsl(30 10% 90%)",
    textOnDark: "hsl(0 0% 100%)",
    textOnDarkMuted: "hsl(218 10% 70%)",
    imageScrim: "hsl(220 20% 10% / 0.75)",
    // Expanded semantic ladder
    canvas: "hsl(30 8% 97%)",
    elevated: "hsl(0 0% 100%)",
    inverse: "hsl(220 20% 12%)",
    textStrong: "hsl(220 20% 12%)",
    textMuted: "hsl(218 10% 42%)",
    textOnPrimaryMuted: "hsl(218 10% 70%)",
    textOnDarkSubtle: "hsl(218 10% 60%)",
    imageScrimSoft: "hsl(220 20% 10% / 0.35)",
    imageScrimStrong: "hsl(220 20% 10% / 0.75)",
    glassSoft: "hsl(0 0% 100% / 0.4)",
    glassStrong: "hsl(0 0% 100% / 0.9)",
    accentSurface: "hsl(30 92% 56%)",
    accentInkOnLight: "hsl(30 92% 56%)",
    accentInkOnDark: "hsl(30 92% 56%)",
  },
  effects: {
    shadows: {
      sharp: "0 10px 28px -14px hsl(var(--foreground) / 0.45)",
      sharpLg: "0 16px 40px -18px hsl(var(--foreground) / 0.5)",
      line: "0 2px 0 0 hsl(var(--border))",
      lineAccent: "0 4px 0 0 hsl(var(--accent))",
      md: "0 10px 24px -16px hsl(var(--foreground) / 0.2)",
      lg: "0 18px 40px -22px hsl(var(--foreground) / 0.24)",
      xl: "0 28px 60px -30px hsl(var(--foreground) / 0.28)",
      accent: "0 10px 24px -18px hsl(var(--accent) / 0.45)",
      accentGlow: "0 0 28px -8px hsl(var(--accent) / 0.5)",
      glowSm: "0 0 24px hsl(var(--accent) / 0.2)",
      glowLg: "0 0 44px hsl(var(--accent) / 0.25)",
      glowNavy: "0 0 30px hsl(var(--slate-medium) / 0.2)",
    },
    glass: {
      bg: "hsl(0 0% 100% / 0.9)",
      border: "hsl(218 12% 85% / 0.9)",
      blur: "16px",
    },
  },
  patterns: {
    grid: {
      size: "48px",
      opacity: "0.03",
    },
    gridAccent: {
      size: "72px",
      opacity: "0.05",
    },
    noise: {
      dataUrl:
        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
      opacity: "0.018",
    },
    lines: {
      css: "repeating-linear-gradient(0deg, transparent, transparent 1px, hsl(var(--foreground)) 1px, hsl(var(--foreground)) 2px)",
      opacity: "0.01",
    },
    diagonal: {
      css: "repeating-linear-gradient(45deg, transparent, transparent 40px, hsl(var(--foreground) / 0.03) 40px, hsl(var(--foreground) / 0.03) 42px)",
      opacity: "0.006",
    },
  },
  motion: {
    duration: {
      instant: "0ms",
      fast: "100ms",
      base: "250ms",
      slow: "400ms",
    },
    easing: {
      standard: "cubic-bezier(0.4, 0, 0.2, 1)",
      sharp: "cubic-bezier(0.2, 0, 0, 1)",
      pop: "cubic-bezier(0.2, 1.15, 0.2, 1)",
    },
    animations: {
      shimmer: "3s",
      float: "4.5s",
      pulseRing: "2.2s",
      revealLeft: "0.7s",
      numberTick: "0.5s",
      accentLine: "0.45s",
      borderDraw: "0.55s",
    },
  },
  metrics: {
    hover: {
      nudgeSm: "2px",
      nudgeMd: "3px",
      liftSm: "3px",
      liftMd: "5px",
      liftLg: "8px",
    },
    corners: {
      accentSize: "16px",
      accentOffset: "1px",
      bracketSize: "20px",
      bracketOffset: "2px",
      bracketTranslate: "3px",
    },
    clip: {
      diagonalCut: "16px",
    },
    accents: {
      barOffsetX: "1rem",
      barWidth: "0.25rem",
      iconCornerSize: "0.625rem",
      iconCornerOffset: "0.25rem",
    },
  },
} as const;

export default trustedPlumberThemeV2;