export interface ColorScale {
  50?: string;
  100?: string;
  200?: string;
  300?: string;
  400?: string;
  500?: string;
  600?: string;
  700?: string;
  800?: string;
  900?: string;
  DEFAULT: string;
}

export interface ThemeColors {
  primary: ColorScale;
  secondary: ColorScale;
  accent: ColorScale;
  neutral: ColorScale;
}

export interface ThemeTypographyConfig {
  fontFamily: {
    display: string;
    body: string;
    mono: string;
  };
  scale: Record<
    | "xs"
    | "sm"
    | "base"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "8xl"
    | "9xl",
    string
  >;
  tracking: {
    tighter: string;
    tight: string;
    normal: string;
    wide: string;
    widest: string;
  };
  leading: {
    none: string;
    tight: string;
    snug: string;
    normal: string;
    relaxed: string;
    loose: string;
  };
}

export interface ThemeLayoutConfig {
  container: {
    maxWidth: string;
    maxWidthSm: string;
    maxWidthLg: string;
    paddingX: {
      base: string;
      md: string;
      lg: string;
    };
  };
  section: {
    paddingY: {
      base: string;
      md: string;
      lg: string;
    };
    dividerThickness: string;
  };
}

export interface ThemeBordersConfig {
  width: {
    hairline: string;
    thin: string;
    medium: string;
    thick: string;
    ultra: string;
  };
  focus: {
    outlineWidth: string;
    outlineOffset: string;
    inputFocusBorderWidth: string;
  };
}

export interface ThemeSurfacesConfig {
  background: string;
  foreground: string;
  overlay: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  border: string;
  input: string;
  mutedForeground: string;
  primaryForeground: string;
  secondaryForeground: string;
  accentForeground: string;
  accentTextOnLight: string;
  // New semantic roles for hardening
  sectionSubtle: string;
  sectionDark: string;
  sectionAlt: string;
  textOnDark: string;
  textOnDarkMuted: string;
  imageScrim: string;
  // Expanded semantic ladder
  canvas: string;
  elevated: string;
  inverse: string;
  textStrong: string;
  textMuted: string;
  textOnPrimaryMuted: string;
  textOnDarkSubtle: string;
  imageScrimSoft: string;
  imageScrimStrong: string;
  glassSoft: string;
  glassStrong: string;
  accentSurface: string;
  accentInkOnLight: string;
  accentInkOnDark: string;
}

export interface ThemeEffectsConfig {
  shadows: {
    sharp: string;
    sharpLg: string;
    line: string;
    lineAccent: string;
    md: string;
    lg: string;
    xl: string;
    accent: string;
    accentGlow: string;
    glowSm: string;
    glowLg: string;
    glowNavy: string;
  };
  glass: {
    bg: string;
    border: string;
    blur: string;
  };
}

export interface ThemePatternsConfig {
  grid: { size: string; opacity: string };
  gridAccent: { size: string; opacity: string };
  noise: { dataUrl: string; opacity: string };
  lines: { css: string; opacity: string };
  diagonal: { css: string; opacity: string };
}

export interface ThemeMotionConfig {
  duration: {
    instant: string;
    fast: string;
    base: string;
    slow: string;
  };
  easing: {
    standard: string;
    sharp: string;
    pop: string;
  };
  animations: {
    shimmer: string;
    float: string;
    pulseRing: string;
    revealLeft: string;
    numberTick: string;
    accentLine: string;
    borderDraw: string;
  };
}

export interface ThemeMetricsConfig {
  hover: {
    nudgeSm: string;
    nudgeMd: string;
    liftSm: string;
    liftMd: string;
    liftLg: string;
  };
  corners: {
    accentSize: string;
    accentOffset: string;
    bracketSize: string;
    bracketOffset: string;
    bracketTranslate: string;
  };
  clip: { diagonalCut: string };
  accents: {
    barOffsetX: string;
    barWidth: string;
    iconCornerSize: string;
    iconCornerOffset: string;
  };
}

/** Optional brand aliases for templates that use navy/yellow/cobalt etc. */
export interface ThemeBrandAliases {
  navy?: string;
  navyDark?: string;
  yellow?: string;
  yellowDark?: string;
  /** CSS linear-gradient string for gold accent surfaces (e.g. buttons, bars) */
  goldGradient?: string;
  cobalt?: string;
  cobaltLight?: string;
}

export interface ThemeConfig {
  colors: ThemeColors;
  borderRadius: {
    sm: string;
    DEFAULT: string;
    lg: string;
    xl: string;
    full: string;
  };
  fontFamily: {
    heading: string;
    body: string;
  };
  typography: ThemeTypographyConfig;
  layout: ThemeLayoutConfig;
  borders: ThemeBordersConfig;
  surfaces: ThemeSurfacesConfig;
  effects: ThemeEffectsConfig;
  patterns: ThemePatternsConfig;
  motion: ThemeMotionConfig;
  metrics: ThemeMetricsConfig;
  /** Optional brand color aliases for Tailwind (navy, yellow, cobalt) */
  brand?: ThemeBrandAliases;
}
