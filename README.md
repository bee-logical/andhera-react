# andhera-react

A composable React component library built with Tailwind CSS, designed for product teams that ship fast.

[![npm version](https://img.shields.io/npm/v/andhera-react.svg)](https://www.npmjs.com/package/andhera-react)
[![license](https://img.shields.io/npm/l/andhera-react.svg)](https://github.com/ADesai-07/andhera-react/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

## ✨ Features

- 🎨 **25+ Production-Ready Components** - Buttons, Forms, Dialogs, Tables, and more
- 🔧 **Fully Customizable** - Every component exposes props for complete control
- 📦 **Tree-Shakeable** - Import only what you need
- 🎯 **TypeScript First** - Full type definitions included
- ♿ **Accessible** - WCAG compliant with proper ARIA attributes
- 🎭 **Themeable** - Built-in theme provider with customizable tokens
- 📱 **Responsive** - Mobile-first design approach
- 🚀 **Zero Config** - Styles auto-injected, no CSS imports needed

## Installation

```bash
npm install andhera-react
```

## Quick Start

Just import and use - **styles are automatically applied!**

```tsx
import { Button } from "andhera-react";

function Example() {
  return <Button variant="primary">Click me</Button>;
}
```

> **Note:** No need to import CSS or install Tailwind. All styles are auto-injected when you import the library.

## Components

### Button

```tsx
import { Button } from "andhera-react";

function Example() {
  return (
    <>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Delete</Button>
      <Button size="small">Small</Button>
      <Button size="large">Large</Button>
      <Button disabled>Disabled</Button>
    </>
  );
}
```

### Checkbox

```tsx
import { Checkbox, CheckboxGroup } from "andhera-react";

function Example() {
  return (
    <>
      {/* Single Checkbox */}
      <Checkbox label="Accept terms" onChange={(checked) => console.log(checked)} />

      {/* Checkbox Group */}
      <CheckboxGroup
        options={[
          { label: "Option 1", value: "1" },
          { label: "Option 2", value: "2" },
          { label: "Option 3", value: "3" },
        ]}
        onChange={(values) => console.log(values)}
      />
    </>
  );
}
```

### Chip

Versatile tag/badge component for filters, selections, and labels.

```tsx
import { Chip, ChipGroup, Avatar } from "andhera-react";

function Example() {
  const [selected, setSelected] = useState(false);
  const [tags, setTags] = useState(['React', 'TypeScript', 'Tailwind']);

  return (
    <ChipGroup spacing="sm">
      {/* Selectable chip */}
      <Chip 
        label="Click to select" 
        selectable 
        selected={selected} 
        onSelectionChange={setSelected}
        color="primary"
      />
      
      {/* Removable chips */}
      {tags.map(tag => (
        <Chip 
          key={tag}
          label={tag}
          removable
          onRemove={() => setTags(tags.filter(t => t !== tag))}
          color="secondary"
          variant="soft"
        />
      ))}
      
      {/* Chip with Avatar */}
      <Chip 
        label="John Doe"
        avatar={<Avatar initials="JD" bgColor="#3b82f6" size="xs" />}
        variant="soft"
        color="primary"
      />
      
      {/* Custom colored chip */}
      <Chip 
        label="Custom" 
        backgroundColor="#ec4899" 
        textColor="#fff"
      />
    </ChipGroup>
  );
}
```

**Chip Features:**
- 5 sizes: `xs`, `sm`, `md`, `lg`, `xl`
- 4 variants: `filled`, `outlined`, `soft`, `ghost`
- 7 colors: `default`, `primary`, `secondary`, `success`, `warning`, `error`, `info`
- Selectable, removable, clickable modes
- Loading state with spinner
- Avatar and icon support
- Custom colors support

### Toggle Switch

```tsx
import { ToggleSwitch, ParentToggleSwitch } from "andhera-react";

function Example() {
  const [enabled, setEnabled] = useState(false);

  return (
    <>
      {/* Basic toggle */}
      <ToggleSwitch 
        checked={enabled} 
        onChange={setEnabled}
        label="Enable notifications"
      />
      
      {/* With loading state */}
      <ToggleSwitch 
        checked={enabled} 
        onChange={setEnabled}
        loading
        label="Saving..."
      />
      
      {/* Parent-child toggle */}
      <ParentToggleSwitch
        label="Select all"
        childSwitches={[
          { id: '1', label: 'Option 1', checked: true },
          { id: '2', label: 'Option 2', checked: false },
        ]}
        onChange={(parentChecked, children) => console.log(parentChecked, children)}
      />
    </>
  );
}
```

### Toggle Button

```tsx
import { ToggleButton, ToggleButtonGroup } from "andhera-react";

function Example() {
  const [selected, setSelected] = useState('left');

  return (
    <ToggleButtonGroup 
      value={selected}
      onChange={setSelected}
      selectionMode="single"
    >
      <ToggleButton value="left" icon={<AlignLeft />}>Left</ToggleButton>
      <ToggleButton value="center" icon={<AlignCenter />}>Center</ToggleButton>
      <ToggleButton value="right" icon={<AlignRight />}>Right</ToggleButton>
    </ToggleButtonGroup>
  );
}
```

### Dialog

```tsx
import { Dialog } from "andhera-react";

function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Confirm Action"
        size="md"
        animation="scale"
      >
        <p>Are you sure you want to proceed?</p>
      </Dialog>
    </>
  );
}
```

### Snackbar

```tsx
import { SnackbarProvider, useSnackbar } from "andhera-react";

function App() {
  return (
    <SnackbarProvider>
      <MyComponent />
    </SnackbarProvider>
  );
}

function MyComponent() {
  const { show } = useSnackbar();

  return (
    <Button onClick={() => show({ 
      message: 'Action completed!', 
      type: 'success',
      position: 'bottom-right'
    })}>
      Show Snackbar
    </Button>
  );
}
```

## All Components

| Category | Components |
|----------|------------|
| **Forms** | Button, Input, Checkbox, Radio, Slider, Toggle Switch, Toggle Button, Select, Multi-Select, DatePicker, FileUpload |
| **Feedback** | Dialog, Drawer, Snackbar, Progress Bar |
| **Data Display** | Accordion, Badge, Chip, Card, Table, Tabs, Stat Card, Skeleton |
| **Navigation** | Breadcrumb, Pagination, Dropdown |
| **Layout** | Grid, Stack |

👉 **[View Full Documentation](https://andheraui.com/)**

## TypeScript Support

All components are fully typed. Import types directly:

```tsx
import { 
  Button, 
  type ButtonProps, 
  type ButtonVariant,
  Chip,
  type ChipProps,
  type ChipSize,
  type ChipVariant,
  type ChipColor,
} from "andhera-react";
```

## Icon Library

Andhera UI includes 60+ SVG icons organized by category. Icons are available as a **separate import** to keep your bundle size small through tree-shaking.

### Import Icons

```tsx
import { Search, CheckCircle, User, Heart } from "andhera-react/icons";

function Example() {
  return (
    <div>
      <Search size={24} color="#FFCB00" />
      <CheckCircle size={20} color="#00C951" />
      <User size={24} />
      <Heart size={24} color="#FB2C36" />
    </div>
  );
}
```

### Available Icon Categories

| Category | Icons |
|----------|-------|
| **Navigation** | Search, Home, Globe, Locate, MapPin |
| **Status** | CheckCircle, AlertCircle, XCircle, Info, HelpCircle |
| **Interface** | Menu, X, Plus, Minus, BellDot, BellElectric |
| **Utility** | Copy, Edit, Trash, Share, Calculator, Briefcase, Database, GridIcon, Download, Upload |
| **Communication** | Mail, Phone, MessageCircle |
| **Media** | Play, Pause, Stop, Volume, Webcam |
| **Security** | Lock, LockOpen, LockKeyhole, Shield |
| **General** | User, Users, Settings, Heart, Star, Activity, Clock, Calendar, Target, Rocket, Monitor, Smartphone, Watch |
| **Arrows** | AArrowDown, AArrowUp |
| **Charts** | BarChart, LineChart, PieChart |
| **Files** | Archive, BookText, Folder |
| **Calendar** | CalendarCheck, CalendarClock |

### Icon Props

All icons accept the following props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `24` | Width and height in pixels |
| `color` | `string` | `"currentColor"` | Icon stroke/fill color |
| `className` | `string` | `""` | Additional CSS classes |

## Theming

Use the built-in `ThemeProvider` to customize your application's look:

```tsx
import { ThemeProvider, Button } from "andhera-react";

const customTheme = {
  colors: {
    primary: '#FFCB00',
    secondary: '#6b7280',
    success: '#22c55e',
    error: '#ef4444',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
  },
};

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <Button variant="primary">Themed Button</Button>
    </ThemeProvider>
  );
}
```

## Browser Support

| Browser | Supported |
|---------|-----------|
| Chrome | ✅ Last 2 versions |
| Firefox | ✅ Last 2 versions |
| Safari | ✅ Last 2 versions |
| Edge | ✅ Last 2 versions |

## Contributing

We welcome contributions! Please see our [Contributing Guide](https://github.com/ADesai-07/andhera-react/blob/main/CONTRIBUTING.md) for details.

## Related Packages

- [andhera-angular](https://github.com/ADesai-07/andhera-angular) – Angular version of Andhera UI

## License

MIT © [Andhera Team](https://github.com/ADesai-07)

---

<p align="center">
  Made with ❤️ by the <a href="https://andheraui.com">Andhera</a> team
</p>

