# Pagination Component

A fully dynamic, customizable, and accessible pagination component for Next.js applications built with TypeScript and Tailwind CSS.

## Features

- ✅ **Dynamic Page Calculation** - Automatically calculates total pages based on data
- ✅ **Customizable Variants** - Multiple style variants (default, primary, secondary, outlined, ghost)
- ✅ **Shape Options** - Choose from rounded, square, or pill shapes
- ✅ **Size Options** - Small, medium, and large sizes
- ✅ **Color Themes** - Blue, gray, red, green, purple, and orange color options
- ✅ **First/Last Buttons** - Optional navigation to first and last pages
- ✅ **Page Size Selector** - Allow users to change items per page
- ✅ **Jump to Page** - Direct page navigation input
- ✅ **Page Info Display** - Shows current page and total pages
- ✅ **Responsive Design** - Works seamlessly on mobile and desktop
- ✅ **Compact Mode** - Icon-only mode for mobile devices
- ✅ **Accessibility** - Full keyboard navigation and ARIA labels
- ✅ **Dark Mode Support** - Automatically adapts to dark/light themes
- ✅ **Ellipsis for Large Ranges** - Shows "..." when there are many pages

## Installation

The component is already set up in your project at:
```
src/app/(components)/pagination/Pagination.tsx
```

## Basic Usage

```tsx
import Pagination from '@/app/(components)/pagination/Pagination';

function MyComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  
  return (
    <Pagination
      totalItems={250}
      itemsPerPage={10}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `totalItems` | `number` | **Required** | Total number of items in your dataset |
| `itemsPerPage` | `number` | **Required** | Number of items to display per page |
| `currentPage` | `number` | **Required** | Current active page (1-indexed) |
| `onPageChange` | `(page: number) => void` | **Required** | Callback when page changes |
| `showFirstLastButtons` | `boolean` | `false` | Show "First" and "Last" buttons |
| `showPageSizeSelector` | `boolean` | `false` | Show dropdown to change page size |
| `pageSizeOptions` | `number[]` | `[5, 10, 25, 50]` | Options for page size selector |
| `showJumpToPage` | `boolean` | `false` | Show input to jump to specific page |
| `maxVisiblePages` | `number` | `7` | Maximum page buttons to display |
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'outlined' \| 'ghost'` | `'default'` | Visual style variant |
| `shape` | `'rounded' \| 'square' \| 'pill'` | `'rounded'` | Button shape |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `color` | `'blue' \| 'gray' \| 'red' \| 'green' \| 'purple' \| 'orange'` | `'blue'` | Color theme |
| `prevLabel` | `string \| ReactNode` | `'←'` | Label for previous button |
| `nextLabel` | `string \| ReactNode` | `'→'` | Label for next button |
| `firstLabel` | `string \| ReactNode` | `'«'` | Label for first button |
| `lastLabel` | `string \| ReactNode` | `'»'` | Label for last button |
| `className` | `string` | `''` | Additional CSS classes for wrapper |
| `buttonClassName` | `string` | `''` | Additional CSS classes for buttons |
| `disabled` | `boolean` | `false` | Disable all interactions |
| `compact` | `boolean` | `false` | Show compact version (icons only) |
| `align` | `'left' \| 'center' \| 'right'` | `'center'` | Alignment of pagination |
| `showPageInfo` | `boolean` | `false` | Show "Page X of Y" text |
| `onPageSizeChange` | `(newSize: number) => void` | `undefined` | Callback when page size changes |

## Examples

### Basic Pagination

```tsx
<Pagination
  totalItems={100}
  itemsPerPage={10}
  currentPage={currentPage}
  onPageChange={setCurrentPage}
/>
```

### With First/Last Buttons

```tsx
<Pagination
  totalItems={500}
  itemsPerPage={10}
  currentPage={currentPage}
  onPageChange={setCurrentPage}
  showFirstLastButtons
  variant="primary"
  color="blue"
/>
```

### With Page Size Selector

```tsx
<Pagination
  totalItems={350}
  itemsPerPage={itemsPerPage}
  currentPage={currentPage}
  onPageChange={setCurrentPage}
  showPageSizeSelector
  onPageSizeChange={(newSize) => {
    setItemsPerPage(newSize);
    setCurrentPage(1); // Reset to first page
  }}
  pageSizeOptions={[5, 10, 25, 50, 100]}
/>
```

### Full Featured

```tsx
<Pagination
  totalItems={500}
  itemsPerPage={25}
  currentPage={currentPage}
  onPageChange={setCurrentPage}
  showFirstLastButtons
  showPageSizeSelector
  showJumpToPage
  showPageInfo
  maxVisiblePages={5}
  variant="primary"
  shape="pill"
  size="md"
  color="blue"
  align="center"
  onPageSizeChange={handlePageSizeChange}
/>
```

### Compact Mode (Mobile)

```tsx
<Pagination
  totalItems={200}
  itemsPerPage={10}
  currentPage={currentPage}
  onPageChange={setCurrentPage}
  compact
  variant="primary"
  color="blue"
/>
```

### Different Variants

```tsx
// Default
<Pagination variant="default" ... />

// Primary (colored)
<Pagination variant="primary" color="blue" ... />

// Outlined
<Pagination variant="outlined" color="green" ... />

// Ghost (transparent)
<Pagination variant="ghost" ... />
```

### Different Shapes

```tsx
// Rounded corners
<Pagination shape="rounded" ... />

// Square (no rounding)
<Pagination shape="square" ... />

// Pill (fully rounded)
<Pagination shape="pill" ... />
```

### Different Sizes

```tsx
// Small
<Pagination size="sm" ... />

// Medium (default)
<Pagination size="md" ... />

// Large
<Pagination size="lg" ... />
```

## Accessibility

The component follows WAI-ARIA best practices:

- Uses `<nav>` with `aria-label="Pagination Navigation"`
- Active page has `aria-current="page"`
- All buttons have descriptive `aria-label` attributes
- Disabled buttons use `aria-disabled="true"`
- Full keyboard navigation support (Tab, Enter)
- Focus indicators for keyboard users

## Keyboard Navigation

- **Tab** - Navigate between buttons
- **Enter/Space** - Activate button
- **Type number + Enter** - Jump to page (when `showJumpToPage` is enabled)

## Responsive Behavior

- On mobile screens (<640px), pagination automatically adapts
- Use `compact` prop for mobile-specific icon-only mode
- Page numbers automatically reduce on smaller screens
- Flex wrap ensures proper layout on all screen sizes

## Customization

### Custom Labels/Icons

```tsx
<Pagination
  prevLabel={<ChevronLeft />}
  nextLabel={<ChevronRight />}
  firstLabel={<ChevronsLeft />}
  lastLabel={<ChevronsRight />}
  ...
/>
```

### Custom Styling

```tsx
<Pagination
  className="my-custom-wrapper"
  buttonClassName="my-custom-button-class"
  ...
/>
```

## Demo

View the full demo with all features at:
```
src/app/(components)/pagination/PaginationDemo.tsx
```

Or navigate to the Component Demo page in your application and select "Pagination" from the menu.

## Dark Mode

The component automatically supports dark mode using Tailwind's `dark:` classes. It will adapt based on your app's theme settings.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
