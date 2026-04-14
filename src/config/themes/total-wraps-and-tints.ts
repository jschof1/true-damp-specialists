import type { ThemeConfig } from "@/types/config";

/**
 * Total Wraps and Tints Ltd Theme
 *
 * Atmosphere: Premium, sophisticated, professional reliability.
 * Base: Deep Navy (Grounding)
 * Accents: Sleek Silver (Guide), Striking Gold (Action/Booking)
 * Style: Seamless, fluid, authority, minimal mess, swift precision.
 */
export const totalWrapsAndTintsTheme: ThemeConfig = {
  colors: {
    primary: {
      DEFAULT: "hsl(222 47% 11%)",
      50: "hsl(222 40% 96%)",
      100: "hsl(222 34% 91%)",
      200: "hsl(222 28% 82%)",
      300: "hsl(222 24% 68%)",
      400: "hsl(222 30% 42%)",
      500: "hsl(222 47% 11%)",
      600: "hsl(222 47% 9%)",
      700: "hsl(222 47% 7%)",
      800: "hsl(222 47% 5%)",
      900: "hsl(222 47% 3%)",
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
      DEFAULT: "hsl(43 88% 50%)",
      50: "hsl(48 90% 96%)",
      100: "hsl(46 88% 90%)",
      200: "hsl(44 90% 78%)",
      300: "hsl(43 92% 65%)",
      400: "hsl(42 90% 55%)",
      500: "hsl(43 88% 50%)",
      600: "hsl(40 85% 42%)",
      700: "hsl(38 82% 34%)",
      800: "hsl(36 78% 26%)",
      900: "hsl(34 72% 18%)",
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
    overlay: "hsl(222 47% 8% / 0.84)",

    card: "hsl(222 28% 16%)",
    cardForeground: "hsl(0 0% 100%)",

    popover: "hsl(222 26% 15%)",
    popoverForeground: "hsl(0 0% 100%)",

    border: "hsl(222 18% 26%)",
    input: "hsl(222 18% 26%)",

    muted: "hsl(222 18% 22%)",
    mutedForeground: "hsl(210 10% 74%)",

    primary: "hsl(222 47% 11%)",
    primaryForeground: "hsl(0 0% 100%)",

    secondary: "hsl(222 24% 20%)",
    secondaryForeground: "hsl(0 0% 100%)",

    accent: "hsl(43 88% 50%)",
    accentForeground: "hsl(222 47% 11%)",
    accentTextOnLight: "hsl(40 85% 42%)",

    ring: "hsl(217 91% 60%)",
    destructive: "hsl(0 72% 52%)",
    destructiveForeground: "hsl(0 0% 100%)",

    sectionSubtle: "hsl(222 30% 14%)",
    sectionDark: "hsl(222 47% 6%)",
    sectionAlt: "hsl(222 24% 18%)",
    textOnDark: "hsl(0 0% 100%)",
    textOnDarkMuted: "hsl(210 10% 80%)",

    imageScrim: "hsl(222 47% 6% / 0.85)",
    canvas: "hsl(222 47% 11%)",
    elevated: "hsl(222 22% 24%)",
    inverse: "hsl(0 0% 100%)",

    textStrong: "hsl(0 0% 100%)",
    textMuted: "hsl(210 10% 75%)",
    textOnPrimaryMuted: "hsl(210 10% 78%)",
    textOnDarkSubtle: "hsl(210 10% 70%)",

    imageScrimSoft: "hsl(222 47% 6% / 0.5)",
    imageScrimStrong: "hsl(222 47% 6% / 0.9)",

    glassSoft: "hsl(0 0% 100% / 0.12)",
    glassStrong: "hsl(0 0% 100% / 0.22)",

    accentSurface: "hsl(43 88% 50%)",
    accentInkOnLight: "hsl(40 85% 42%)",
    accentInkOnDark: "hsl(43 88% 50%)",
  },

  effects: {
    shadows: {
      sharp: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      sharpLg: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      line: "0 1px 0 0 hsl(var(--border))",
      lineAccent: "0 2px 0 0 hsl(var(--accent))",
      md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
      xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
      accent: "0 4px 0 0 hsl(var(--accent) / 0.2)",
      accentGlow: "0 0 20px -5px hsl(var(--accent) / 0.3)",
      glowSm: "0 0 20px hsl(var(--accent) / 0.2)",
      glowLg: "0 0 40px hsl(var(--accent) / 0.3)",
      glowNavy: "0 0 30px hsl(222 47% 11% / 0.2)",
    },
    glass: {
      bg: "hsl(0 0% 100% / 0.7)",
      border: "hsl(210 10% 90% / 0.5)",
      blur: "16px",
    },
  },

  patterns: {
    grid: { size: "32px", opacity: "0.03" },
    gridAccent: { size: "48px", opacity: "0.05" },
    noise: {
      dataUrl:
        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
      opacity: "0.015",
    },
    lines: {
      css: "repeating-linear-gradient(0deg, transparent, transparent 1px, hsl(var(--foreground)) 1px, hsl(var(--foreground)) 2px)",
      opacity: "0.01",
    },
    diagonal: {
      css: "repeating-linear-gradient(45deg, transparent, transparent 40px, hsl(var(--foreground) / 0.03) 40px, hsl(var(--foreground) / 0.03) 42px)",
      opacity: "0.005",
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
    yellow: "hsl(43 88% 50%)",
    yellowDark: "hsl(40 85% 42%)",
    goldGradient:
      "linear-gradient(135deg, hsl(48 92% 75%) 0%, hsl(44 90% 58%) 25%, hsl(42 88% 48%) 50%, hsl(38 85% 38%) 75%, hsl(34 80% 28%) 100%)",
    cobalt: "hsl(217 91% 60%)",
    cobaltLight: "hsl(217 91% 70%)",
  },
} as const;

export default totalWrapsAndTintsTheme;
