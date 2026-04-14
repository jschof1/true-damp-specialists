import type { ThemeConfig } from "@/types/config";

/**
 * Total Wraps and Tints Ltd Theme
 *
 * Atmosphere: Premium, sophisticated, professional reliability.
 * Base: Deep Navy
 * Accents: Refined Metallic Neutral + Controlled Gold
 * Style: Seamless, fluid, authority, minimal mess, swift precision.
 */
export const totalWrapsAndTintsTheme: ThemeConfig = {
  colors: {
    primary: {
      DEFAULT: "hsl(45 88% 52%)",
      50: "hsl(45 100% 96%)",
      100: "hsl(45 96% 91%)",
      200: "hsl(45 93% 82%)",
      300: "hsl(45 91% 72%)",
      400: "hsl(45 89% 60%)",
      500: "hsl(45 88% 52%)",
      600: "hsl(43 86% 44%)",
      700: "hsl(41 82% 36%)",
      800: "hsl(39 78% 28%)",
      900: "hsl(37 72% 20%)",
    },
    secondary: {
      DEFAULT: "hsl(222 24% 20%)",
      50: "hsl(220 20% 96%)",
      100: "hsl(220 16% 92%)",
      200: "hsl(220 14% 84%)",
      300: "hsl(221 13% 72%)",
      400: "hsl(222 12% 58%)",
      500: "hsl(222 16% 42%)",
      600: "hsl(222 20% 30%)",
      700: "hsl(222 22% 24%)",
      800: "hsl(222 24% 20%)",
      900: "hsl(222 30% 14%)",
    },
    accent: {
      DEFAULT: "hsl(210 10% 92%)",
      50: "hsl(210 14% 98%)",
      100: "hsl(210 12% 96%)",
      200: "hsl(210 10% 92%)",
      300: "hsl(210 9% 86%)",
      400: "hsl(210 8% 76%)",
      500: "hsl(210 8% 64%)",
      600: "hsl(210 9% 50%)",
      700: "hsl(210 10% 38%)",
      800: "hsl(210 12% 26%)",
      900: "hsl(210 14% 16%)",
    },
    neutral: {
      DEFAULT: "hsl(222 18% 26%)",
      50: "hsl(210 20% 98%)",
      100: "hsl(210 16% 95%)",
      200: "hsl(210 12% 88%)",
      300: "hsl(210 10% 78%)",
      400: "hsl(210 10% 64%)",
      500: "hsl(210 10% 48%)",
      600: "hsl(215 14% 36%)",
      700: "hsl(220 18% 28%)",
      800: "hsl(222 22% 20%)",
      900: "hsl(222 30% 12%)",
    },
  },

  borderRadius: {
    sm: "0.125rem",
    DEFAULT: "0.25rem",
    lg: "0.5rem",
    xl: "0.75rem",
    full: "9999px",
  },

  fontFamily: {
    heading: "'Plus Jakarta Sans', sans-serif",
    body: "'Inter', sans-serif",
  },

  typography: {
    fontFamily: {
      display: "'Plus Jakarta Sans', sans-serif",
      body: "'Inter', sans-serif",
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
      "5xl": "3.5rem",
      "6xl": "4.5rem",
      "7xl": "6rem",
      "8xl": "8rem",
      "9xl": "10rem",
    },
    tracking: {
      tighter: "-0.05em",
      tight: "-0.025em",
      normal: "0em",
      wide: "0.05em",
      widest: "0.1em",
    },
    leading: {
      none: "1",
      tight: "1.1",
      snug: "1.3",
      normal: "1.5",
      relaxed: "1.625",
      loose: "1.8",
    },
  },

  layout: {
    container: {
      maxWidth: "72rem",
      maxWidthSm: "64rem",
      maxWidthLg: "87.5rem",
      paddingX: { base: "1.5rem", md: "2rem", lg: "3rem" },
    },
    section: {
      paddingY: { base: "6rem", md: "8rem", lg: "10rem" },
      dividerThickness: "1px",
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
    background: "hsl(222 47% 11%)",
    foreground: "hsl(0 0% 100%)",

    overlay: "hsl(222 47% 9% / 0.82)",

    card: "hsl(222 28% 16%)",
    cardForeground: "hsl(0 0% 100%)",

    popover: "hsl(222 26% 15%)",
    popoverForeground: "hsl(0 0% 100%)",

    primary: "hsl(45 88% 52%)",
    primaryForeground: "hsl(222 47% 11%)",

    secondary: "hsl(222 24% 20%)",
    secondaryForeground: "hsl(0 0% 100%)",

    accent: "hsl(210 10% 92%)",
    accentForeground: "hsl(222 47% 11%)",

    muted: "hsl(222 18% 22%)",
    mutedForeground: "hsl(210 10% 74%)",

    border: "hsl(222 18% 26%)",
    input: "hsl(222 18% 26%)",
    ring: "hsl(217 91% 60%)",

    destructive: "hsl(0 72% 52%)",
    destructiveForeground: "hsl(0 0% 100%)",

    accentTextOnLight: "hsl(43 86% 44%)",
  },

  effects: {
    shadows: {
      sharp: "0 1px 2px 0 rgb(0 0 0 / 0.18)",
      sharpLg: "0 6px 12px -2px rgb(0 0 0 / 0.22), 0 3px 6px -3px rgb(0 0 0 / 0.22)",
      line: "0 1px 0 0 hsl(var(--border))",
      lineAccent: "0 2px 0 0 hsl(var(--primary))",
      md: "0 8px 16px -6px rgb(0 0 0 / 0.28)",
      lg: "0 14px 28px -8px rgb(0 0 0 / 0.32)",
      xl: "0 24px 48px -12px rgb(0 0 0 / 0.4)",
      accent: "0 4px 12px -4px hsl(var(--primary) / 0.35)",
      accentGlow: "0 0 24px -6px hsl(var(--primary) / 0.28)",
      glowSm: "0 0 18px hsl(var(--primary) / 0.18)",
      glowLg: "0 0 36px hsl(var(--primary) / 0.24)",
      glowNavy: "0 0 30px hsl(222 47% 11% / 0.28)",
    },
    glass: {
      bg: "hsl(222 20% 18% / 0.72)",
      border: "hsl(210 10% 92% / 0.14)",
      blur: "16px",
    },
  },

  patterns: {
    grid: { size: "32px", opacity: "0.05" },
    gridAccent: { size: "48px", opacity: "0.08" },
    noise: {
      dataUrl:
        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
      opacity: "0.015",
    },
    lines: {
      css: "repeating-linear-gradient(0deg, transparent, transparent 1px, hsl(var(--foreground)) 1px, hsl(var(--foreground)) 2px)",
      opacity: "0.012",
    },
    diagonal: {
      css: "repeating-linear-gradient(45deg, transparent, transparent 40px, hsl(var(--foreground) / 0.03) 40px, hsl(var(--foreground) / 0.03) 42px)",
      opacity: "0.008",
    },
  },

  motion: {
    duration: { instant: "0ms", fast: "150ms", base: "350ms", slow: "500ms" },
    easing: {
      standard: "cubic-bezier(0.4, 0, 0.2, 1)",
      sharp: "cubic-bezier(0.2, 0, 0, 1)",
      pop: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    },
    animations: {
      shimmer: "2.5s",
      float: "5s",
      pulseRing: "2.5s",
      revealLeft: "1s",
      numberTick: "0.8s",
      accentLine: "0.6s",
      borderDraw: "0.8s",
    },
  },

  metrics: {
    hover: {
      nudgeSm: "1px",
      nudgeMd: "2px",
      liftSm: "2px",
      liftMd: "4px",
      liftLg: "8px",
    },
    corners: {
      accentSize: "16px",
      accentOffset: "1px",
      bracketSize: "20px",
      bracketOffset: "2px",
      bracketTranslate: "2px",
    },
    clip: { diagonalCut: "16px" },
    accents: {
      barOffsetX: "0.75rem",
      barWidth: "0.125rem",
      iconCornerSize: "0.5rem",
      iconCornerOffset: "0.125rem",
    },
  },

  brand: {
    navy: "hsl(222 47% 11%)",
    navyDark: "hsl(222 47% 8%)",
    yellow: "hsl(45 88% 52%)",
    yellowDark: "hsl(43 86% 44%)",
    cobalt: "hsl(217 91% 60%)",
    cobaltLight: "hsl(217 91% 70%)",
  },
} as const;

export default totalWrapsAndTintsTheme;
