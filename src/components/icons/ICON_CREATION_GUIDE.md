# Icon Component Creation Guide

This guide will help you add the remaining 190+ icons systematically.

## Current Progress

✅ **Completed (30+ icons):**
- Arrows: AArrowDown, AArrowUp, ArrowBigDown, ArrowBigDownDash
- Calendar: CalendarCheck, CalendarCheck2, CalendarArrowUp, CalendarCog, CalendarClock
- Files: Archive, ArchiveX, BookUp, BookUp2, BookType, BookText, BookUser
- General: AudioWaveform, Award, Axe, Armchair, Beer, BeerOff, ALargeSmall, Accessibility, Activity, Baby
- Interface: BellDot, BellElectric, BellMinus
- Charts: BarChart, LineChart, PieChart

## Remaining Icons by Category

### Arrows (add to `/arrows/` folder):
- More arrow variations from your list

### Files (add to `/files/` folder):
- File management, document types, storage icons

### General (add to `/general/` folder):
- Tools, objects, miscellaneous icons

### Interface (add to `/interface/` folder):
- UI elements, navigation, controls

### Calendar (add to `/calendar/` folder):
- Date, time, scheduling icons

### Charts (add to `/charts/` folder):
- Data visualization, analytics icons

## Template for New Icon Component

```tsx
import React from 'react';
import { IconProps } from '../types';

export const IconName: React.FC<IconProps> = ({
  size = 18,
  color = 'currentColor',
  className,
  strokeWidth = 2,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Replace with actual SVG path data */}
      <path
        d="YOUR_SVG_PATH_HERE"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
```

## Steps to Add New Icons

1. **Get Figma design context** for each icon ID
2. **Create SVG path** based on the visual design
3. **Add to appropriate category folder**
4. **Update category index.ts** file
5. **Update main index.ts** if needed

## Icon Naming Convention

- Use PascalCase for component names
- Use descriptive names based on Figma node names
- Group related icons in the same file when appropriate

## SVG Guidelines

- Use `viewBox="0 0 18 18"` for consistency
- Use `strokeWidth={strokeWidth}` for consistent line weights
- Use `color` prop for fill and stroke colors
- Add `strokeLinecap="round"` and `strokeLinejoin="round"` for smooth edges
- Keep paths clean and optimized

## Folder Structure

```
src/components/icons/
├── types.ts                 # Icon interfaces
├── index.ts                 # Main export file
├── arrows/
│   ├── index.ts            # Arrow icon exports
│   └── ArrowDown.tsx       # Arrow components
├── calendar/
│   ├── index.ts            # Calendar icon exports
│   └── Calendar.tsx        # Calendar components
├── charts/
│   ├── index.ts            # Chart icon exports
│   └── Charts.tsx          # Chart components
├── files/
│   ├── index.ts            # File icon exports
│   ├── Archive.tsx         # Archive components
│   └── Book.tsx            # Book components
├── general/
│   ├── index.ts            # General icon exports
│   ├── AudioVisual.tsx     # Audio/visual components
│   └── Beverage.tsx        # Beverage/lifestyle components
└── interface/
    ├── index.ts            # Interface icon exports
    └── Bell.tsx            # Notification components
```

## Usage Example

```tsx
import { AArrowDown, CalendarCheck, Award } from '@/components/icons';

// In your component
<AArrowDown size={24} color="#ffcb00" className="my-icon" strokeWidth={2} />
<CalendarCheck size={18} />
<Award color="currentColor" />
```

## Next Steps

1. Continue with the remaining 170+ icons from your Figma list
2. Use the Figma MCP tools to get design context for each icon
3. Create SVG paths based on the visual design
4. Group similar icons in the same component files
5. Update index files as you add new components

The foundation is set up, and you can now systematically process the remaining icons using the established patterns and structure.