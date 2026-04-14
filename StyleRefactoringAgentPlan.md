You are refactoring a React + Tailwind + shadcn-style component codebase to make all components theme-interchangeable, semantically token-driven, and contrast-safe.

Your job is to update components so they depend only on semantic theme tokens and approved state patterns, while preserving the existing design intent, layout, spacing, animation, shadows, and border-radius controls already defined in the theme. The aim is to get to a place where we can mag signficant changes to how the site looks without there being any specfic issues when it comes to contrast.

PRIMARY GOAL
Refactor all components so they:
1. Use semantic tokens only.
2. Remain visually consistent across interchangeable themes.
3. Never rely on hard-coded brand colors or one-off color logic.
4. Avoid contrast failures for text, icons, borders, inputs, placeholders, focus rings, badges, cards, buttons, popovers, menus, and overlays.
5. Preserve the current theme architecture, including shadows, border radius, motion, metrics, patterns, and layout controls.

ASSUME THE THEME API ALREADY EXISTS
Use only the existing semantic contract and extend it only when necessary in the same semantic style.

Approved semantic tokens include concepts like:
- background / foreground
- card / cardForeground
- popover / popoverForeground
- primary / primaryForeground
- secondary / secondaryForeground
- accent / accentForeground
- muted / mutedForeground
- border
- input
- ring
- destructive / destructiveForeground

GLOBAL RULES
- Do not hard-code colors like slate, zinc, blue, navy, gold, white, black, gray, hex values, rgb(), or hsl() inside components.
- Do not use brand-specific token names in components.
- Do not infer text color from whether a background “looks dark” or “looks light”.
- Do not leave components using generic text-white, text-black, text-gray-*, bg-slate-*, border-zinc-*, ring-blue-*, etc.
- Do not use opacity modifiers as a substitute for semantic state design if they create ambiguous contrast.
- Do not change spacing, size, layout, animation timing, border radius, shadow style, or component hierarchy unless required for accessibility or correctness.
- Preserve intent and visual hierarchy.
- Prefer semantic pairings such as bg-primary + text-primaryForeground, bg-card + text-cardForeground, bg-muted + text-mutedForeground.
- Every filled surface must use its matching foreground token.
- Every interactive element must have visible hover, focus, disabled, and active states using semantic tokens.
- All focus states must be keyboard-visible and use a clear ring/outline treatment that is visually distinct.
- Inputs, selects, and textareas must have semantic background, foreground, border, placeholder, and focus tokens.
- Dropdowns, popovers, sheets, dialogs, and menus must use popover/card semantic pairs, not inherited page text colors.

ACCESSIBILITY RULES
Apply these requirements when refactoring:
- Normal text must meet at least 4.5:1 contrast.
- Large text must meet at least 3:1 contrast.
- UI component boundaries, icons essential to understanding, and focus indicators must meet at least 3:1 contrast.
- Focus indicators must be clearly visible against both the adjacent background and the component state.
- Placeholder text cannot be the only way information is communicated.
- Disabled states must still remain legible and distinct without appearing broken.
- If a semantic token pairing appears unsafe, use the correct semantic foreground pair or recommend a token adjustment instead of hard-coding a color.

SEMANTIC MAPPING RULES
Use these patterns unless a component has a documented exception:
- Page section: bg-background text-foreground
- Card/panel/form shell: bg-card text-cardForeground border-border
- Popover/menu/dialog content: bg-popover text-popoverForeground border-border
- Primary button: bg-primary text-primaryForeground hover/active derived from primary token usage only
- Secondary button or subdued panel: bg-secondary text-secondaryForeground
- Muted container/helper area: bg-muted text-mutedForeground
- Accent highlight chip or decorative emphasis: bg-accent text-accentForeground
- Destructive action: bg-destructive text-destructiveForeground
- Inputs/select triggers/textareas: bg-background or bg-card, text-foreground or text-cardForeground, border-input, focus-visible ring-ring
- Hairlines/dividers: border-border
- Supporting text inside a card should usually use cardForeground or mutedForeground based on the container, not global foreground by default.

STATE RULES
For every interactive component:
- Define resting state.
- Define hover state.
- Define focus-visible state.
- Define active/pressed state.
- Define disabled state.
- Define loading state if applicable.
- Ensure text/icon contrast remains valid in every state.
- Avoid state changes that switch to a token pair not intended for that surface.

REFRACTORING PROCESS
For each component:
1. Identify the surface role of the outer container.
2. Identify the correct semantic foreground for that surface.
3. Replace all direct color utilities with semantic token utilities.
4. Normalize form controls to semantic input styles.
5. Normalize buttons, badges, alerts, menus, and overlays to approved token pairings.
6. Fix mixed-surface text usage, such as text-cardForeground inside bg-secondary, unless the semantic pairing is explicitly intentional and documented.
7. Audit borders, placeholders, icons, decorative accents, and shadows for theme consistency.
8. Keep decorative elements decorative; they must not carry critical content if contrast is weak.
9. If a component currently uses color in a confusing way, simplify it rather than adding more token complexity.
10. If the existing theme lacks a semantic token needed for a reusable pattern, propose the smallest semantic addition possible.

OUTPUT FORMAT
For each file you update, return:
1. File path.
2. Short explanation of what contrast/theming issues existed.
3. The updated code.
4. A short “semantic reasoning” note listing:
   - container surface token
   - text token
   - interactive tokens
   - focus token
   - any required theme token additions
5. A “risk check” note confirming:
   - no hard-coded colors remain
   - all major text/surface pairings are semantic
   - focus-visible state exists
   - disabled/loading state considered
   - no likely contrast traps remain

STRICT GUARDRAILS
- Never introduce raw colors in components.
- Never use text-white/text-black as shortcuts.
- Never use text-cardForeground on a secondary surface unless the container itself is card.
- Never use text-mutedForeground on top of accent or primary backgrounds.
- Never use border color alone as the only focus signal if it may be too subtle.
- Never leave shadcn primitives unthemed if the surrounding component shell is themed.
- Never preserve an old class just because it existed; preserve intent, not broken implementation.
- If unsure between two semantic pairs, choose the one matching the actual surface role.
- If a contrast-safe result cannot be guaranteed with the current token set, stop and explicitly recommend the semantic token changes needed.

FINAL SUCCESS CRITERIA
The refactor is successful only if:
- Components are more interchangeable across themes.
- Components consume semantic tokens only.
- Foreground/background pairings are explicit and role-based.
- The visual hierarchy is preserved.
- Contrast and focus states are consistently safe.
- No component needs brand-specific overrides to remain readable.
```

## Why this works

This prompt works because it tells the agent to reason from surface role first, then assign foreground and states from semantic pairs. That is the same principle behind shadcn-style theming, where components become portable because they rely on meaning-based tokens instead of color guesses. [perpetualny](https://www.perpetualny.com/blog/accelerating-themeable-design-systems-with-shadcn-ui-a-step-by-step-guide)

It also forces accessibility into the refactor criteria instead of treating it as a nice extra. Design-system guardrails are most effective when contrast, focus visibility, and semantic token usage are required at contribution time rather than fixed later component by component. [makethingsaccessible](https://www.makethingsaccessible.com/guides/contrast-requirements-for-wcag-2-2-level-aa/)


Project-specific constraints:
- Keep the full existing theme structure found in theme.
- Do not remove or simplify controls for shadows, border radius, layout, motion, metrics, or patterns.
- Preserve the current design language and component shapes.
- Use the theme’s semantic tokens as the stable API.
- Do not introduce brand-specific keys into component code.
- Prefer updating the theme tokens and semantic mapping over patching individual components with one-off classes.
- When a component has a decorative accent, ensure critical text and controls do not depend on that decorative layer for readability.

The likely issues are mixed surface semantics and inconsistent text inheritance. The outer shell is `bg-secondary`, but the heading uses `text-card-foreground`, the inputs use `bg-secondary/50`, the select content has only `border-accent` without a clear semantic surface, and the focus styling relies heavily on accent/border styling that may not always maintain visible contrast in every theme state. [w3](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html)

The team of agents should rewrite that component so the form shell has one clear surface role, all child text matches that surface, controls use semantic input tokens, and the button uses a proper semantic filled pair rather than a mix of accent, primary, and opacity-based border tricks. [testparty](https://testparty.ai/blog/accessibility-as-design-system-policy)


Before finishing, run a final self-review and reject your own output if any of these are still present:
- hard-coded color classes
- text token not matched to its container surface
- missing focus-visible styling
- placeholder/input/select content with weak contrast
- decorative accents being used as critical contrast layers
- component states that rely only on opacity reduction without semantic fallback

The best next step is to give you a second prompt specifically for “scan the whole codebase and produce a component-by-component fix plan before editing files,” because that usually makes the final refactor much cleaner.