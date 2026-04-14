import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import theme from "../src/config/theme";

function stripHsl(value: string): string {
  const trimmed = value.trim();
  const match = trimmed.match(/^hsl\((.*)\)$/i);
  return match ? match[1].trim() : trimmed;
}

function buildAutogenBlock(): string[] {
  const primary = stripHsl(theme.colors.primary.DEFAULT);
  const secondary = stripHsl(theme.colors.secondary.DEFAULT);
  const accent = stripHsl(theme.colors.accent.DEFAULT);
  const neutral = stripHsl(theme.colors.neutral.DEFAULT);
  const background = stripHsl(theme.surfaces.background);
  const foreground = stripHsl(theme.surfaces.foreground);
  const overlay = stripHsl(theme.surfaces.overlay);
  const card = stripHsl(theme.surfaces.card);
  const cardForeground = stripHsl(theme.surfaces.cardForeground);
  const popover = stripHsl(theme.surfaces.popover);
  const popoverForeground = stripHsl(theme.surfaces.popoverForeground);
  const border = stripHsl(theme.surfaces.border);
  const input = stripHsl(theme.surfaces.input);
  const mutedForeground = stripHsl(theme.surfaces.mutedForeground);
  const primaryForeground = stripHsl(theme.surfaces.primaryForeground);
  const secondaryForeground = stripHsl(theme.surfaces.secondaryForeground);
  const accentForeground = stripHsl(theme.surfaces.accentForeground);
  const accentTextOnLight = stripHsl(theme.surfaces.accentTextOnLight);
  const sectionSubtle = stripHsl(theme.surfaces.sectionSubtle);
  const sectionDark = stripHsl(theme.surfaces.sectionDark);
  const sectionAlt = stripHsl(theme.surfaces.sectionAlt);
  const textOnDark = stripHsl(theme.surfaces.textOnDark);
  const textOnDarkMuted = stripHsl(theme.surfaces.textOnDarkMuted);
  const imageScrim = stripHsl(theme.surfaces.imageScrim);
  const canvas = stripHsl(theme.surfaces.canvas);
  const elevated = stripHsl(theme.surfaces.elevated);
  const inverse = stripHsl(theme.surfaces.inverse);
  const textStrong = stripHsl(theme.surfaces.textStrong);
  const textMuted = stripHsl(theme.surfaces.textMuted);
  const textOnPrimaryMuted = stripHsl(theme.surfaces.textOnPrimaryMuted);
  const textOnDarkSubtle = stripHsl(theme.surfaces.textOnDarkSubtle);
  const imageScrimSoft = stripHsl(theme.surfaces.imageScrimSoft);
  const imageScrimStrong = stripHsl(theme.surfaces.imageScrimStrong);
  const glassSoft = stripHsl(theme.surfaces.glassSoft);
  const glassStrong = stripHsl(theme.surfaces.glassStrong);
  const accentSurface = stripHsl(theme.surfaces.accentSurface);
  const accentInkOnLight = stripHsl(theme.surfaces.accentInkOnLight);
  const accentInkOnDark = stripHsl(theme.surfaces.accentInkOnDark);
  const primaryDark = stripHsl(theme.colors.primary[800] ?? theme.colors.primary.DEFAULT);
  const primaryMedium = stripHsl(theme.colors.primary[400] ?? theme.colors.primary.DEFAULT);
  const primaryLight = stripHsl(theme.colors.primary[200] ?? theme.colors.primary.DEFAULT);
  const accentGlow = stripHsl(theme.colors.accent[600] ?? theme.colors.accent.DEFAULT);
  const accentSoft = stripHsl(theme.colors.accent[200] ?? theme.colors.accent.DEFAULT);

  const lines: string[] = [
    "    /* THEME_AUTOGEN_START",
    "       This block is generated from `src/config/theme.ts` by `npm run sync:theme`.",
    "       Do not edit manually. */",
    `    --theme-primary: ${primary};`,
    `    --theme-secondary: ${secondary};`,
    `    --theme-accent: ${accent};`,
    `    --theme-neutral: ${neutral};`,
    `    --theme-radius-sm: ${theme.borderRadius.sm};`,
    `    --theme-radius: ${theme.borderRadius.DEFAULT};`,
    `    --theme-radius-lg: ${theme.borderRadius.lg};`,
    `    --theme-radius-xl: ${theme.borderRadius.xl};`,
    `    --theme-radius-full: ${theme.borderRadius.full};`,
    `    --theme-font-heading: ${theme.fontFamily.heading};`,
    `    --theme-font-body: ${theme.fontFamily.body};`,
    "",
    "    /* Override key shadcn variables */",
    "    --primary: var(--theme-primary);",
    "    --secondary: var(--theme-secondary);",
    "    --accent: var(--theme-accent);",
    "    --muted: var(--theme-neutral);",
    "    --ring: var(--theme-accent);",
    "    --radius-sm: var(--theme-radius-sm);",
    "    --radius: var(--theme-radius);",
    "    --radius-lg: var(--theme-radius-lg);",
    "    --radius-xl: var(--theme-radius-xl);",
    "    --radius-full: var(--theme-radius-full);",
    "    --background: var(--theme-background);",
    "    --foreground: var(--theme-foreground);",
    "    --card: var(--theme-card);",
    "    --card-foreground: var(--theme-card-foreground);",
    "    --popover: var(--theme-popover);",
    "    --popover-foreground: var(--theme-popover-foreground);",
    "    --border: var(--theme-border);",
    "    --input: var(--theme-input);",
    "    --muted-foreground: var(--theme-muted-foreground);",
    "    --primary-foreground: var(--theme-primary-foreground);",
    "    --secondary-foreground: var(--theme-secondary-foreground);",
    "    --accent-foreground: var(--theme-accent-foreground);",
    "    --accent-text-on-light: var(--theme-accent-text-on-light);",
    "    --section-subtle: var(--theme-section-subtle);",
    "    --section-dark: var(--theme-section-dark);",
    "    --section-alt: var(--theme-section-alt);",
    "    --text-on-dark: var(--theme-text-on-dark);",
    "    --text-on-dark-muted: var(--theme-text-on-dark-muted);",
    "    --image-scrim: var(--theme-image-scrim);",
    "    --canvas: var(--theme-canvas);",
    "    --elevated: var(--theme-elevated);",
    "    --inverse: var(--theme-inverse);",
    "    --text-strong: var(--theme-text-strong);",
    "    --text-muted: var(--theme-text-muted);",
    "    --text-on-primary-muted: var(--theme-text-on-primary-muted);",
    "    --text-on-dark-subtle: var(--theme-text-on-dark-subtle);",
    "    --image-scrim-soft: var(--theme-image-scrim-soft);",
    "    --image-scrim-strong: var(--theme-image-scrim-strong);",
    "    --glass-soft: var(--theme-glass-soft);",
    "    --glass-strong: var(--theme-glass-strong);",
    "    --accent-surface: var(--theme-accent-surface);",
    "    --accent-ink-on-light: var(--theme-accent-ink-on-light);",
    "    --accent-ink-on-dark: var(--theme-accent-ink-on-dark);",
    "    --overlay: var(--theme-overlay);",
    "",
    "    /* Custom brand vars (navy, yellow, cobalt) */",
    `    --navy: ${theme.brand?.navy ? stripHsl(theme.brand.navy) : primary};`,
    `    --navy-dark: ${theme.brand?.navyDark ? stripHsl(theme.brand.navyDark) : primaryDark};`,
    `    --yellow: ${theme.brand?.yellow ? stripHsl(theme.brand.yellow) : accent};`,
    `    --yellow-dark: ${theme.brand?.yellowDark ? stripHsl(theme.brand.yellowDark) : stripHsl(theme.colors.accent[700] ?? theme.colors.accent.DEFAULT)};`,
    `    --yellow-foreground: ${stripHsl(theme.surfaces.accentForeground)};`,
    `    --accent-gradient: ${theme.brand?.goldGradient ?? `linear-gradient(135deg, hsl(var(--accent)), hsl(var(--accent)))`};`,
    `    --cobalt: ${theme.brand?.cobalt ? stripHsl(theme.brand.cobalt) : accent};`,
    `    --cobalt-light: ${theme.brand?.cobaltLight ? stripHsl(theme.brand.cobaltLight) : accentSoft};`,
    "",
    "    /* Design-system tokens (generated) */",
    `    --theme-background: ${background};`,
    `    --theme-foreground: ${foreground};`,
    `    --theme-overlay: ${overlay};`,
    `    --theme-card: ${card};`,
    `    --theme-card-foreground: ${cardForeground};`,
    `    --theme-popover: ${popover};`,
    `    --theme-popover-foreground: ${popoverForeground};`,
    `    --theme-border: ${border};`,
    `    --theme-input: ${input};`,
    `    --theme-muted-foreground: ${mutedForeground};`,
    `    --theme-primary-foreground: ${primaryForeground};`,
    `    --theme-secondary-foreground: ${secondaryForeground};`,
    `    --theme-accent-foreground: ${accentForeground};`,
    `    --theme-accent-text-on-light: ${accentTextOnLight};`,
    `    --theme-section-subtle: ${sectionSubtle};`,
    `    --theme-section-dark: ${sectionDark};`,
    `    --theme-section-alt: ${sectionAlt};`,
    `    --theme-text-on-dark: ${textOnDark};`,
    `    --theme-text-on-dark-muted: ${textOnDarkMuted};`,
    `    --theme-image-scrim: ${imageScrim};`,
    `    --theme-canvas: ${canvas};`,
    `    --theme-elevated: ${elevated};`,
    `    --theme-inverse: ${inverse};`,
    `    --theme-text-strong: ${textStrong};`,
    `    --theme-text-muted: ${textMuted};`,
    `    --theme-text-on-primary-muted: ${textOnPrimaryMuted};`,
    `    --theme-text-on-dark-subtle: ${textOnDarkSubtle};`,
    `    --theme-image-scrim-soft: ${imageScrimSoft};`,
    `    --theme-image-scrim-strong: ${imageScrimStrong};`,
    `    --theme-glass-soft: ${glassSoft};`,
    `    --theme-glass-strong: ${glassStrong};`,
    `    --theme-accent-surface: ${accentSurface};`,
    `    --theme-accent-ink-on-light: ${accentInkOnLight};`,
    `    --theme-accent-ink-on-dark: ${accentInkOnDark};`,
    "",
    `    --ds-container-max: ${theme.layout.container.maxWidth};`,
    `    --ds-container-max-sm: ${theme.layout.container.maxWidthSm};`,
    `    --ds-container-max-lg: ${theme.layout.container.maxWidthLg};`,
    `    --ds-container-px: ${theme.layout.container.paddingX.base};`,
    `    --ds-container-px-md: ${theme.layout.container.paddingX.md};`,
    `    --ds-container-px-lg: ${theme.layout.container.paddingX.lg};`,
    `    --ds-section-py: ${theme.layout.section.paddingY.base};`,
    `    --ds-section-py-md: ${theme.layout.section.paddingY.md};`,
    `    --ds-section-py-lg: ${theme.layout.section.paddingY.lg};`,
    `    --ds-divider-thickness: ${theme.layout.section.dividerThickness};`,
    "",
    `    --ds-border-hairline: ${theme.borders.width.hairline};`,
    `    --ds-border-thin: ${theme.borders.width.thin};`,
    `    --ds-border-medium: ${theme.borders.width.medium};`,
    `    --ds-border-thick: ${theme.borders.width.thick};`,
    `    --ds-border-ultra: ${theme.borders.width.ultra};`,
    "",
    `    --ds-focus-outline-width: ${theme.borders.focus.outlineWidth};`,
    `    --ds-focus-outline-offset: ${theme.borders.focus.outlineOffset};`,
    `    --ds-input-focus-border-width: ${theme.borders.focus.inputFocusBorderWidth};`,
    "",
    `    --ds-motion-instant: ${theme.motion.duration.instant};`,
    `    --ds-motion-fast: ${theme.motion.duration.fast};`,
    `    --ds-motion-base: ${theme.motion.duration.base};`,
    `    --ds-motion-slow: ${theme.motion.duration.slow};`,
    `    --ds-ease-standard: ${theme.motion.easing.standard};`,
    `    --ds-ease-sharp: ${theme.motion.easing.sharp};`,
    `    --ds-ease-pop: ${theme.motion.easing.pop};`,
    "",
    `    --ds-hover-nudge-sm: ${theme.metrics.hover.nudgeSm};`,
    `    --ds-hover-nudge-md: ${theme.metrics.hover.nudgeMd};`,
    `    --ds-hover-lift-sm: ${theme.metrics.hover.liftSm};`,
    `    --ds-hover-lift-md: ${theme.metrics.hover.liftMd};`,
    `    --ds-hover-lift-lg: ${theme.metrics.hover.liftLg};`,
    "",
    `    --ds-type-xs: ${theme.typography.scale.xs};`,
    `    --ds-type-sm: ${theme.typography.scale.sm};`,
    `    --ds-type-base: ${theme.typography.scale.base};`,
    `    --ds-type-lg: ${theme.typography.scale.lg};`,
    `    --ds-type-xl: ${theme.typography.scale.xl};`,
    `    --ds-type-2xl: ${theme.typography.scale["2xl"]};`,
    `    --ds-type-3xl: ${theme.typography.scale["3xl"]};`,
    `    --ds-type-4xl: ${theme.typography.scale["4xl"]};`,
    `    --ds-type-5xl: ${theme.typography.scale["5xl"]};`,
    `    --ds-type-6xl: ${theme.typography.scale["6xl"]};`,
    "",
    `    --shadow-sharp: ${theme.effects.shadows.sharp};`,
    `    --shadow-sharp-lg: ${theme.effects.shadows.sharpLg};`,
    `    --shadow-md: ${theme.effects.shadows.md};`,
    `    --shadow-lg: ${theme.effects.shadows.lg};`,
    `    --shadow-xl: ${theme.effects.shadows.xl};`,
    `    --shadow-line: ${theme.effects.shadows.line};`,
    `    --shadow-line-accent: ${theme.effects.shadows.lineAccent};`,
    `    --shadow-accent: ${theme.effects.shadows.accent};`,
    `    --shadow-accent-glow: ${theme.effects.shadows.accentGlow};`,
    "",
    `    --glass-bg: ${theme.effects.glass.bg};`,
    `    --glass-border: ${theme.effects.glass.border};`,
    `    --glass-blur: ${theme.effects.glass.blur};`,
    "",
    `    --font-display: var(--theme-font-heading);`,
    `    --font-body: var(--theme-font-body);`,
    `    --font-mono: ${theme.typography.fontFamily.mono};`,
    "    /* THEME_AUTOGEN_END */",
  ];

  return lines;
}

function main(): void {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const projectRoot = path.resolve(here, "..");
  const indexCssPath = path.join(projectRoot, "src", "index.css");

  const css = fs.readFileSync(indexCssPath, "utf8");
  const start = "/* THEME_AUTOGEN_START";
  const end = "/* THEME_AUTOGEN_END */";

  const startIdx = css.indexOf(start);
  const endIdx = css.indexOf(end);

  if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) {
    throw new Error(
      `Could not find theme autogen markers in ${indexCssPath}. Expected "${start}" and "${end}".`,
    );
  }

  const before = css.slice(0, startIdx);
  const after = css.slice(endIdx + end.length);
  const next = `${before}${buildAutogenBlock().join("\n")}${after}`;

  fs.writeFileSync(indexCssPath, next, "utf8");
  console.log("Theme CSS variables synced from src/config/theme.ts");
}

main();
