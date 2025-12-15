# Andhera UI - GitHub Copilot Instructions

Andhera UI is a production-ready, composable React component library built with Tailwind CSS and TypeScript. It provides 25+ fully customizable, accessible, and tree-shakeable components. Package name is `andhera-react`, published to npm at https://www.npmjs.com/package/andhera-react.

## Tech Stack & Build

This project uses TypeScript 5.x, React 18/19, Tailwind CSS 3.x, tsup for bundling (CJS + ESM), and Vite for the docs site. Styles are auto-injected so consumers don't need to import CSS.

Always run `npm install` before building. Build the library with `npm run build` (runs tsup + Tailwind). Use `npm run dev` for watch mode. Run `npm run lint` for type checking. Start docs site with `npm run docs:dev` on port 4400.

## Project Layout

Components live in `src/components/` with each component in its own folder (kebab-case naming). Each folder has a main `.tsx` file and an `index.ts` for exports. Custom hooks are in `src/hooks/`, theme system in `src/theme/`, utilities in `src/utils/`. Main entry is `src/index.ts`. Icons have separate entry at `src/icons.ts`.

Documentation site is in `docs/` with previews in `docs/src/preview/` (named `*Preview.tsx`) and component data in `docs/src/data/components.tsx`. Use `@/` alias for library imports in docs.

## Creating Components

When creating a new component, follow this pattern:

1. Create folder in `src/components/` using kebab-case (e.g., `date-picker`)
2. Create main component file with PascalCase (e.g., `DatePicker.tsx`)
3. Define types at the top using `type` (not `interface`) with JSDoc comments
4. Create utility functions for dynamic Tailwind classes (e.g., `getSizeClasses`)
5. Use `forwardRef` for ref forwarding and set `displayName`
6. Spread `...props` to root element for flexibility
7. Create `index.ts` that exports component and all types
8. Add export to `src/components/index.ts`
9. Create preview in `docs/src/preview/ComponentNamePreview.tsx`
10. Add documentation entry in `docs/src/data/components.tsx`

## Coding Standards

Use strict TypeScript. Export all types alongside components. Use discriminated unions for variants. Use `forwardRef` with `displayName`. Always provide sensible defaults. Use Tailwind utility classes directly. Brand color is Yellow `#FFCB00`. Font family is Manrope. Use `classNames` utility from `src/utils/classNames.ts` for conditional classes.

For accessibility, include ARIA attributes, support keyboard navigation, ensure WCAG compliance, use semantic HTML.

## Preview & Documentation Guidelines

When creating preview pages or documentation examples:

1. **Use library components over native elements**: Always prefer using existing Andhera UI components instead of native browser APIs or HTML elements. For example:
   - Use `Dialog` component instead of `alert()` or `window.confirm()`
   - Use `Snackbar` component instead of `console.log()` for user feedback
   - Use `Button` component instead of native `<button>` elements
   - Use `Input` component instead of native `<input>` elements

2. **Showcase component integration**: When demonstrating interactive features (onClick, onSubmit, etc.), use other library components to handle the result. This demonstrates how components work together and creates a cohesive library experience.

3. **Self-documenting examples**: Each preview should demonstrate the component's integration capabilities with other library components, showing users the full potential of the ecosystem.

4. **Responsive design**: All preview pages must be fully responsive across all screen sizes:
   - Use Tailwind responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`) for breakpoint-specific styles
   - Use `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` patterns for responsive grids
   - Use `gap-4 sm:gap-6` for responsive spacing
   - Use `px-4 sm:px-2` for responsive padding
   - Use `text-sm sm:text-base lg:text-lg` for responsive typography
   - Test layouts on mobile (320px), tablet (768px), and desktop (1024px+) viewports
   - Ensure touch-friendly tap targets (minimum 44x44px) on mobile
   - Use `flex-col sm:flex-row` patterns for stacking on mobile

## Component Categories

- **forms**: Input, Textarea, Checkbox, Radio, Select, DatePicker, Slider, ToggleSwitch
- **feedback**: Dialog, Drawer, Snackbar
- **layout**: Grid, Stack, AspectRatio
- **data-display**: Table, Badge, Chip, Avatar, Card, Skeleton
- **navigation**: Breadcrumb, Tabs, Pagination
- **interaction**: Button, ToggleButton

---

## Component Use-Cases & Code Examples

Below are comprehensive use-case scenarios for each component. When building new components, follow these patterns for props, variants, sizes, and dynamic configurations.

### Button Component

Location: `src/components/button/buttons.tsx`

**Variants:** primary, secondary, tertiary, destructive, secondary-destructive, ghost, link
**Sizes:** xs, small, default, large, extra-large

```tsx
// Basic usage
<Button variant="primary">Click me</Button>

// All sizes
<Button variant="primary" size="xs">XS</Button>
<Button variant="primary" size="small">Small</Button>
<Button variant="primary" size="default">Default</Button>
<Button variant="primary" size="large">Large</Button>
<Button variant="primary" size="extra-large">Extra Large</Button>

// With icons
<Button variant="primary" leadingIcon={<PlusIcon />}>Add Item</Button>
<Button variant="primary" trailingIcon={<ChevronRightIcon />}>Next</Button>
<Button variant="primary" iconPosition="icon-only" aria-label="Add"><PlusIcon /></Button>

// Loading state
<Button variant="primary" loading>Processing...</Button>
<Button variant="primary" loading loadingText="Saving...">Save</Button>
<Button variant="primary" loading loadingPosition="start">Submit</Button>

// Disabled state
<Button variant="primary" disabled>Disabled</Button>

// Full width
<Button variant="primary" fullWidth>Full Width Button</Button>

// Custom styling
<Button variant="primary" borderRadius="full" shadow="lg">Pill Button</Button>
<Button variant="primary" compact uppercase>COMPACT</Button>

// As link
<Button variant="link" href="https://example.com" target="_blank">External Link</Button>

// Destructive actions
<Button variant="destructive">Delete</Button>
<Button variant="secondary-destructive">Cancel</Button>

// With sections
<Button variant="primary" leftSection={<Avatar size="xs" />} rightSection={<Badge>3</Badge>}>
  User Actions
</Button>
```

### Checkbox Component

Location: `src/components/checkbox/checkboxs.tsx`

```tsx
// Single checkbox
<Checkbox label="Accept terms" onChange={(checked) => console.log(checked)} />

// Controlled checkbox
<Checkbox checked={isChecked} onChange={setIsChecked} label="Controlled" />

// Disabled states
<Checkbox label="Disabled unchecked" disabled />
<Checkbox label="Disabled checked" disabled checked />

// With description
<Checkbox label="Newsletter" description="Receive weekly updates" />

// Checkbox Group
<CheckboxGroup
  options={[
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3", disabled: true },
  ]}
  value={selectedValues}
  onChange={setSelectedValues}
/>

// Horizontal layout
<CheckboxGroup options={options} layout="horizontal" />

// With select all
<CheckboxGroup options={options} showSelectAll selectAllLabel="Select All" />
```

### Chip Component

Location: `src/components/chip/Chip.tsx`

**Variants:** filled, outlined, soft, ghost
**Colors:** default, primary, secondary, success, warning, error, info
**Sizes:** xs, sm, md, lg, xl
**Radius:** none, sm, md, lg, full

```tsx
// Basic chip
<Chip>Default Chip</Chip>

// Variants
<Chip variant="filled" color="primary">Filled</Chip>
<Chip variant="outlined" color="primary">Outlined</Chip>
<Chip variant="soft" color="primary">Soft</Chip>
<Chip variant="ghost" color="primary">Ghost</Chip>

// Colors
<Chip color="success">Success</Chip>
<Chip color="warning">Warning</Chip>
<Chip color="error">Error</Chip>
<Chip color="info">Info</Chip>

// Sizes
<Chip size="xs">Extra Small</Chip>
<Chip size="sm">Small</Chip>
<Chip size="md">Medium</Chip>
<Chip size="lg">Large</Chip>

// With icons
<Chip startIcon={<CheckIcon />}>Completed</Chip>
<Chip endIcon={<CloseIcon />}>Removable</Chip>

// Deletable
<Chip deletable onDelete={() => console.log('deleted')}>Delete me</Chip>

// Selectable
<Chip selectable selected={isSelected} onSelect={setIsSelected}>Toggle</Chip>

// With avatar
<Chip avatar={<Avatar src="/user.jpg" size="xs" />}>John Doe</Chip>

// Loading state
<Chip loading>Loading...</Chip>

// Custom colors
<Chip customBgColor="#FF5733" customTextColor="#FFFFFF">Custom</Chip>

// Chip Group
<ChipGroup spacing="sm">
  {tags.map(tag => (
    <Chip key={tag} deletable onDelete={() => removeTag(tag)}>{tag}</Chip>
  ))}
</ChipGroup>
```

---

## Theme System

Use `ThemeProvider` to wrap your app. Access theme with `useTheme()` hook and update with `useSetTheme()`. Theme structure includes `fontFamily`, `borderRadius`, `colorScheme` ('light' | 'dark'), and `tokens` (colors, spacing, radii).

Brand primary color is `#FFCB00` (yellow). Design tokens are in `src/theme/tokens.ts`.

---

Trust these instructions. Only search the codebase if information here is incomplete or found to be in error.
const getSizeClasses = (size: ExampleSize): string => {
  const sizes: Record<ExampleSize, string> = {
    sm: 'text-sm px-2 py-1',
    md: 'text-base px-3 py-2',
    lg: 'text-lg px-4 py-3',
  };
  return sizes[size];
};

// Main component (use forwardRef when appropriate)
export const Example = forwardRef<HTMLDivElement, ExampleProps>(
  ({ size = 'md', variant = 'primary', className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`${getSizeClasses(size)} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Example.displayName = 'Example';
```

### Component Index File Pattern

```tsx
// src/components/example/index.ts
export { Example } from './Example';
export type { ExampleProps, ExampleSize, ExampleVariant } from './Example';
```
