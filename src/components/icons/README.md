# Icon System Usage Guide

## Overview
Your Figma icons have been organized into a comprehensive React TypeScript component system. All icons are SVG-based, fully customizable, and optimized for your Next.js project.

## Quick Start

```tsx
import { 
  AArrowDown, 
  ArrowBigLeft, 
  ChartGantt, 
  ChartColumn, 
  ChartLine,
  CalendarCheck,
  Archive,
  Award 
} from '@/components/icons';

function MyComponent() {
  return (
    <div className="flex gap-4">
      {/* Basic usage */}
      <AArrowDown />
      
      {/* Custom size */}
      <ArrowBigLeft size={24} />
      
      {/* Custom color */}
      <ChartGantt color="#ffcb00" />
      
      {/* Custom stroke width */}
      <ChartColumn strokeWidth={1.5} />
      
      {/* With CSS class */}
      <ChartLine className="text-blue-500 hover:text-blue-700" />
      
      {/* All custom props */}
      <CalendarCheck 
        size={32} 
        color="currentColor" 
        strokeWidth={2}
        className="cursor-pointer"
      />
    </div>
  );
}
```

## Available Icons

### Arrows (6 icons)
- `AArrowDown`, `AArrowUp`
- `ArrowBigDown`, `ArrowBigDownDash`  
- `ArrowBigLeft`, `ArrowBigRight`

### Charts (6 icons)
- `BarChart`, `LineChart`, `PieChart`
- `ChartGantt`, `ChartColumn`, `ChartLine`

### Calendar (5 icons)
- `CalendarCheck`, `CalendarCheck2`
- `CalendarArrowUp`, `CalendarCog`, `CalendarClock`

### Files (7 icons)  
- `Archive`, `ArchiveX`
- `BookUp`, `BookUp2`, `BookType`, `BookText`, `BookUser`

### General (10 icons)
- `AudioWaveform`, `Award`, `Axe`, `Armchair`
- `Beer`, `BeerOff`, `ALargeSmall`, `Accessibility`
- `Activity`, `Baby`

### Interface (3 icons)
- `BellDot`, `BellElectric`, `BellMinus`

## Icon Properties

All icons accept these props:

```tsx
interface IconProps {
  size?: number;        // Default: 18
  color?: string;       // Default: 'currentColor' 
  strokeWidth?: number; // Default: 2
  className?: string;   // CSS classes
  ...props              // All standard SVG props
}
```

## Usage Examples

### Navigation Icons
```tsx
import { ArrowBigLeft, ArrowBigRight } from '@/components/icons';

<button className="flex items-center gap-2">
  <ArrowBigLeft size={16} />
  Previous
</button>

<button className="flex items-center gap-2">
  Next
  <ArrowBigRight size={16} />
</button>
```

### Dashboard Charts
```tsx
import { ChartColumn, ChartLine, ChartGantt } from '@/components/icons';

const chartTypes = [
  { icon: ChartColumn, label: 'Bar Chart' },
  { icon: ChartLine, label: 'Line Chart' },
  { icon: ChartGantt, label: 'Gantt Chart' }
];

{chartTypes.map(({ icon: Icon, label }) => (
  <div key={label} className="flex items-center gap-2">
    <Icon size={20} color="#666" />
    <span>{label}</span>
  </div>
))}
```

### Status Indicators
```tsx
import { Archive, Award, Activity } from '@/components/icons';

<div className="status-indicators">
  <Archive className="text-gray-500" />
  <Award className="text-yellow-500" />  
  <Activity className="text-green-500" />
</div>
```

### Responsive Icons
```tsx
import { CalendarCheck } from '@/components/icons';

<CalendarCheck 
  size={16}  // Mobile
  className="md:w-5 md:h-5 lg:w-6 lg:h-6"  // Responsive
  color="currentColor"
/>
```

## Next Steps

To add more icons from your Figma selection (170+ remaining):

1. Use the Figma MCP to get design context for each icon ID
2. Create clean React components following the established pattern
3. Organize by category in appropriate folders
4. Update index files for exports
5. Add to the main icon exports

The foundation is fully set up for systematic scaling!

## Folder Structure
```
src/components/icons/
├── types.ts              # TypeScript interfaces
├── index.ts              # Main exports
├── arrows/               # Arrow icons
├── calendar/             # Calendar icons  
├── charts/               # Chart icons
├── files/                # File icons
├── general/              # General purpose icons
└── interface/            # UI interface icons
```