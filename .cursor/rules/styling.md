# Styling and UI Components Rule

This rule ensures that the project follows a consistent styling implementation using shadcn/ui and Tailwind CSS.

## Principles

1.  **Component-First Styling**: Always prefer using or extending existing shadcn/ui components in `src/components/ui`.
2.  **Tailwind CSS Utility Classes**: Use Tailwind utility classes for all styling. Avoid custom CSS in `.css` files unless absolutely necessary for complex animations or third-party overrides.
3.  **Theme Consistency**: Use the project's design tokens (colors, fonts, etc.) defined in `tailwind.config.ts`.
4.  **No Messy Styles**: Keep component logic and styling together. Use the `cn` utility for conditional classes.

## Guidelines

### 1. Using shadcn/ui Components
- When adding new UI elements, check if a shadcn/ui component exists in `src/components/ui`.
- If a component is missing, install it using `npx shadcn-ui@latest add <component-name>`.
- Import UI components using the `@/components/ui` alias.

### 2. Customizing Components
- Use the `cva` (class-variance-authority) pattern for creating component variants, as seen in `src/components/ui/button.tsx`.
- Use the `cn` utility from `@/lib/utils` to merge Tailwind classes and handle conditional styling.
- Example:
  ```tsx
  import { cn } from "@/lib/utils";

  const MyComponent = ({ className, active }) => (
    <div className={cn("p-4 rounded-lg bg-white", active && "border-blue-500", className)}>
      ...
    </div>
  );
  ```

### 3. Design Tokens (Tailwind Config)
- **Colors**: Use the custom colors defined in the theme:
  - `primary`: Navy blue (`hsl(var(--primary))`)
  - `secondary`: Light blue-gray (`hsl(var(--secondary))`)
  - `accent`: Cobalt blue (`hsl(var(--accent))`)
  - `navy`: Custom navy (`hsl(var(--navy))`)
  - `cobalt`: Custom cobalt (`hsl(var(--cobalt))`)
  - `trust`: Green for trust signals (`hsl(var(--trust-green))`)
  - `warning`: Orange for warnings (`hsl(var(--warning-orange))`)
- **Fonts**:
  - `font-sans`: Inter (body text)
  - `font-display`: Plus Jakarta Sans (headings)

### 4. Icons
- Use `lucide-react` for all icons.
- Maintain consistent sizing for icons (typically `size={20}` or `className="h-5 w-5"`).

### 5. Component Structure
- Keep components small and focused.
- Place feature-specific components in `src/components/`.
- Place general UI primitives in `src/components/ui/`.
- Avoid large, monolithic files.

### 6. CSS Rules
- Do not use inline styles (`style={{...}}`).
- Avoid adding new styles to `src/index.css` or `src/App.css`. Use `@layer base`, `@layer components`, or `@layer utilities` if you must add global styles.
- Delete unused default styles from boilerplate files if they are no longer needed.

## Enforcement
- When creating new components, ensure they use `@/components/ui` for primitives.
- If you find hardcoded hex codes or colors not in the theme, replace them with theme variables.
- Always check `tailwind.config.ts` before adding new color utilities.
- When suggesting changes, always prioritize the `shadcn/ui` way.

