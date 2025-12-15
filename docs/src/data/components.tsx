import { useState } from "react";
import type { ReactNode } from "react";
import {
  Badge,
  Accordion,
  Dialog,
  Drawer,
  Dropdown,
  Input,
  Textarea,
  MultiSelect,
  Tabs,
  Breadcrumb,
  Button,
  Chip,
  DatePicker,
  FileUpload,
  Grid,
  ImageCarousel,
  Pagination,
  ParentToggleSwitch,
  ProgressBar,
  RadioButton,
  RadioGroup,
  RatingStar,
  Skeleton,
  SkeletonLines,
  SkeletonGroup,
  Slider,
  Stack,
  StatCard,
  Table,
  ToggleButton,
  ToggleButtonGroup,
  ToggleSwitch,
  AspectRatio,
} from "@/components";

import { ButtonPreview } from "../preview/ButtonPreview";
import { CheckboxPreview } from "../preview/CheckboxPreview";
import { ClipboardPreview } from "../preview/ClipboardPreview";
import ChipPreview from "../preview/ChipPreview";
import DatePickerPreview from "../preview/DatePickerPreview";
import { RadioPreview } from "../preview/RadioPreview";
import { SwitchPreview } from "../preview/SwitchPreview";
import { SliderPreview } from "../preview/SliderPreview";
import { ToggleButtonPreview } from "../preview/ToggleButtonPreview";
import { SnackbarPreview } from "../preview/SnackbarPreview";
import { DialogPreview } from "../preview/DialogPreview";
import { DrawerPreview } from "../preview/DrawerPreview";
import { DropdownPreview } from "../preview/DropdownPreview";
import { InputPreview } from "../preview/InputPreview";
import AutocompletePreview from "../preview/AutocompletePreview";
import { TextareaPreview } from "../preview/TextareaPreview";
import { RatingPreview } from "../preview/RatingPreview";
import { AccordionPreview, FileUploadPreview } from "../preview";
import { AspectRatioPreview } from "../preview/AspectRatioPreview";
import SkeletonPreview from "../preview/SkeletonPreview";

export type ComponentStatus = "stable" | "beta" | "new";

export interface ComponentPropRow {
  name: string;
  type: string;
  description: string;
  defaultValue?: string;
  required?: boolean;
}

export type ComponentCategoryId =
  | "feedback"
  | "forms"
  | "layout"
  | "data-display"
  | "navigation"
  | "interaction";

export interface ComponentCategory {
  id: ComponentCategoryId;
  label: string;
  description: string;
}

export interface ComponentDoc {
  id: string;
  title: string;
  caption: string;
  description: string;
  category: ComponentCategoryId;
  status?: ComponentStatus;
  keywords: string[];
  usage: string;
  render: () => ReactNode;
  props?: ComponentPropRow[];
  tags?: string[];
  componentName?: string; // Actual component name for imports
  githubUrl?: string;
}

const statusLabelMap: Record<ComponentStatus, string> = {
  stable: "Stable",
  beta: "Beta",
  new: "New",
};

export const getStatusLabel = (status: ComponentStatus = "stable") => statusLabelMap[status];

export const componentCategories: ComponentCategory[] = [
  {
    id: "feedback",
    label: "Feedback",
    description: "Communicate system state and contextual actions.",
  },
  {
    id: "forms",
    label: "Forms",
    description: "Collect input with consistent, accessible controls.",
  },
  {
    id: "interaction",
    label: "Interactions",
    description: "Toggle, scrub, and switch between immediate states.",
  },
  {
    id: "navigation",
    label: "Navigation",
    description: "Guide people through screens, pages, and steps.",
  },
  {
    id: "layout",
    label: "Layout",
    description: "Arrange content with predictable structure and spacing.",
  },
  {
    id: "data-display",
    label: "Data display",
    description: "Present information and status at a glance.",
  },
];

export interface SimpleDoc {
  id: string;
  title: string;
  caption: string;
  description: string;
  category: ComponentCategoryId;
  status?: ComponentStatus;
  keywords?: string[];
  usage: string;
  render: () => ReactNode;
  props?: ComponentPropRow[];
  tags?: string[];
  componentName?: string; // Actual component name for imports
  additionalComponents?: {
    name: string;
    description?: string;
    props: ComponentPropRow[];
  }[];
  types?: {
    name: string;
    definition: string;
    description: string;
  }[];
  githubUrl?: string;
}

const docs: SimpleDoc[] = [
  {
    id: "accordion",
    title: "Accordion",
    componentName: "Accordion",
    caption: "Toggle sections inline",
    description: "Accordion organizes related content into expandable sections with single-panel focus by default. Fully customizable with variants, colors, sizes, and animations.",
    category: "data-display",
    status: "stable",
    keywords: ["accordion", "collapse", "panel", "expandable"],
    usage: `import { useState } from "react";
import { Accordion } from "andhera-react";

const items = [
  { value: "overview", label: "Overview", children: <p>High-level summary</p> },
  { value: "details", label: "Details", children: <p>Extended description</p> },
];

export function Example() {
  const [expanded, setExpanded] = useState<string | null>("overview");
  return <Accordion items={items} value={expanded} onChange={setExpanded} />;
}`,
    render: () => <AccordionPreview />,
    tags: ["Collapsible", "Content grouping", "FAQ"],
  },
  {
    id: "snackbar",
    title: "Snackbar",
    componentName: "Snackbar",
    caption: "Highly configurable toasts",
    description:
      "Snackbar delivers transient feedback with rich customization: variants, actions, progress, stacking, portal rendering, and full accessibility controls.",
    category: "feedback",
    status: "stable",
    keywords: ["snackbar", "notification", "toast"],
    usage: `import { Snackbar, SnackbarProvider, useSnackbar, createSnackbarHelpers } from "andhera-react";

// Inline usage
<Snackbar
  type="success"
  variant="filled"
  position="bottom-right"
  message="Profile updated"
  duration={4000}
  action={{ label: "Undo", onClick: () => console.log("undo") }}
/>

// With provider + hook
function Demo() {
  const snackbar = useSnackbar();
  const helpers = createSnackbarHelpers(snackbar.show);

  return (
    <div style={{ display: "flex", gap: 12 }}>
      <button onClick={() => helpers.success("Saved", { duration: 3000 })}>Success</button>
      <button
        onClick={() =>
          snackbar.show({
            type: "warning",
            title: "Connection lost",
            message: "Trying to reconnect",
            position: "top-center",
            actions: [
              { label: "Retry", onClick: () => console.log("retry"), variant: "filled" },
              { label: "Dismiss", onClick: () => snackbar.closeAll(), variant: "text" },
            ],
          })
        }
      >
        Custom
      </button>
    </div>
  );
}

export function Example() {
  return (
    <SnackbarProvider defaultPosition="bottom-right" maxSnackbars={4}>
      <Demo />
    </SnackbarProvider>
  );
}`,
    render: () => <SnackbarPreview />,
    tags: ["Status", "Dismissible", "Toast", "Portal"],
  },
  {
    id: "badge",
    title: "Badge",
    componentName: "Badge",
    caption: "Highlight counts and statuses",
    description: "Badge wraps any child element, layering counts, dots, or custom content to spotlight attention.",
    category: "data-display",
    keywords: ["badge", "indicator", "count"],
    usage: `import { Badge } from "andhera-react";

export function Example() {
  return (
    <Badge count={5}>
      <div style={{ padding: "0.75rem 1rem", borderRadius: "0.75rem", background: "#374151", color: "white" }}>
        Inbox
      </div>
    </Badge>
  );
}`,
    render: () => <BadgePreview />,
    tags: ["Notification", "Indicator"],
  },
  {
    id: "breadcrumb",
    title: "Breadcrumb",
    componentName: "Breadcrumb",
    caption: "Reinforce location",
    description: "Breadcrumb shows hierarchical navigation context with configurable separators and variants.",
    category: "navigation",
    keywords: ["breadcrumb", "navigation"],
    usage: `import { Breadcrumb } from "andhera-react";

const items = [
  { label: "Projects", href: "/projects" },
  { label: "Andhera UI", href: "/projects/andhera" },
  { label: "Components", isActive: true },
];

export function Example() {
  return <Breadcrumb items={items} />;
}`,
    render: () => <BreadcrumbPreview />,
    tags: ["Hierarchy", "Navigation"],
  },
  {
    id: "button",
    title: "Button",
    componentName: "Button",
    caption: "Trigger actions with confidence",
    description: "Button component with comprehensive variants, sizes, and states following AnderaUI design system. Supports icons, loading states, link rendering, custom colors, and full accessibility.",
    category: "interaction",
    status: "stable",
    keywords: ["button", "action", "cta", "primary", "secondary", "destructive", "ghost", "link"],
    usage: `import { 
  Button, 
  PlusIcon, 
  ChevronRightIcon,
  // Types
  type ButtonProps,
  type ButtonVariant,    // 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'secondary-destructive' | 'ghost' | 'link'
  type ButtonSize,       // 'xs' | 'small' | 'default' | 'large' | 'extra-large'
  type IconPosition,     // 'none' | 'leading' | 'trailing' | 'icon-only'
  type ButtonType,       // 'button' | 'submit' | 'reset'
  type LoadingPosition   // 'start' | 'end' | 'center'
} from "andhera-react";

export function Example() {
  return (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
      {/* Primary button */}
      <Button variant="primary" size="default">Primary</Button>
      
      {/* Secondary button */}
      <Button variant="secondary" size="default">Secondary</Button>
      
      {/* Ghost button */}
      <Button variant="ghost">Ghost</Button>
      
      {/* Link variant */}
      <Button variant="link">Link Button</Button>
      
      {/* With leading icon */}
      <Button 
        variant="primary" 
        iconPosition="leading" 
        leadingIcon={<PlusIcon />}
      >
        Add Item
      </Button>
      
      {/* With trailing icon */}
      <Button 
        variant="secondary" 
        iconPosition="trailing" 
        trailingIcon={<ChevronRightIcon />}
      >
        Next
      </Button>
      
      {/* Icon only */}
      <Button 
        variant="primary" 
        iconPosition="icon-only" 
        leadingIcon={<PlusIcon />}
      />
      
      {/* Pill/rounded button */}
      <Button variant="primary" rounded>Pill Button</Button>
      
      {/* Loading state */}
      <Button variant="primary" loading loadingText="Processing...">
        Submit
      </Button>
      
      {/* Custom colors */}
      <Button backgroundColor="#8B5CF6" textColor="#FFFFFF">
        Custom Color
      </Button>
      
      {/* Link button (renders as anchor) */}
      <Button href="https://example.com" target="_blank" variant="primary">
        Visit Site
      </Button>
      
      {/* Compact mode */}
      <Button variant="primary" compact>Compact</Button>
      
      {/* With shadow */}
      <Button variant="primary" shadow="lg">Elevated</Button>
      
      {/* Disabled state */}
      <Button variant="primary" disabled>Disabled</Button>
    </div>
  );
}`,
    render: () => <ButtonPreview />,
    tags: ["Primary", "Secondary", "Ghost", "Link", "Destructive", "Icons", "Loading", "Rounded"],
    props: [
      {
        name: "variant",
        type: "'primary' | 'secondary' | 'tertiary' | 'destructive' | 'secondary-destructive' | 'ghost' | 'link'",
        description: "Visual style variant of the button",
        defaultValue: "'primary'"
      },
      {
        name: "size",
        type: "'xs' | 'small' | 'default' | 'large' | 'extra-large'",
        description: "Size of the button (28px, 32px, 38px, 44px, 48px height)",
        defaultValue: "'default'"
      },
      {
        name: "type",
        type: "'button' | 'submit' | 'reset'",
        description: "HTML button type attribute",
        defaultValue: "'button'"
      },
      {
        name: "iconPosition",
        type: "'none' | 'leading' | 'trailing' | 'icon-only'",
        description: "Position of the icon relative to text",
        defaultValue: "'none'"
      },
      {
        name: "leadingIcon",
        type: "ReactNode",
        description: "Icon element to display before the text"
      },
      {
        name: "trailingIcon",
        type: "ReactNode",
        description: "Icon element to display after the text"
      },
      {
        name: "leftSection",
        type: "ReactNode",
        description: "Custom content to render on the left side (independent of icon system)"
      },
      {
        name: "rightSection",
        type: "ReactNode",
        description: "Custom content to render on the right side (independent of icon system)"
      },
      {
        name: "disabled",
        type: "boolean",
        description: "Disables the button and prevents interaction",
        defaultValue: "false"
      },
      {
        name: "loading",
        type: "boolean",
        description: "Shows loading spinner and disables interaction",
        defaultValue: "false"
      },
      {
        name: "loadingText",
        type: "string",
        description: "Custom text to display when loading"
      },
      {
        name: "loadingPosition",
        type: "'start' | 'end' | 'center'",
        description: "Position of the loading spinner relative to text",
        defaultValue: "'center'"
      },
      {
        name: "fullWidth",
        type: "boolean",
        description: "Makes the button take full width of container",
        defaultValue: "false"
      },
      {
        name: "href",
        type: "string",
        description: "If provided, renders the button as an anchor element"
      },
      {
        name: "target",
        type: "'_blank' | '_self' | '_parent' | '_top'",
        description: "Target attribute for link buttons"
      },
      {
        name: "rel",
        type: "string",
        description: "Rel attribute for link buttons (auto-sets 'noopener noreferrer' for _blank)"
      },
      {
        name: "rounded",
        type: "boolean",
        description: "Makes the button pill-shaped with fully rounded corners",
        defaultValue: "false"
      },
      {
        name: "borderRadius",
        type: "string",
        description: "Custom border radius (e.g., '4px', '12px', 'full')",
        defaultValue: "'8px'"
      },
      {
        name: "compact",
        type: "boolean",
        description: "Reduces padding for dense UIs",
        defaultValue: "false"
      },
      {
        name: "uppercase",
        type: "boolean",
        description: "Transforms text to uppercase",
        defaultValue: "false"
      },
      {
        name: "shadow",
        type: "boolean | 'sm' | 'md' | 'lg'",
        description: "Adds box shadow for elevation effect",
        defaultValue: "false"
      },
      {
        name: "animated",
        type: "boolean",
        description: "Enables/disables hover and focus animations",
        defaultValue: "true"
      },
      {
        name: "active",
        type: "boolean",
        description: "Shows the button in pressed/active state",
        defaultValue: "false"
      },
      {
        name: "tooltip",
        type: "string",
        description: "Native tooltip text shown on hover"
      },
      {
        name: "backgroundColor",
        type: "string",
        description: "Custom background color override"
      },
      {
        name: "textColor",
        type: "string",
        description: "Custom text color override"
      },
      {
        name: "borderColor",
        type: "string",
        description: "Custom border color override"
      },
      {
        name: "onClick",
        type: "(e: React.MouseEvent<HTMLButtonElement>) => void",
        description: "Click event handler"
      },
      {
        name: "children",
        type: "ReactNode",
        description: "Button text content"
      },
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes for the button"
      },
      {
        name: "containerClassName",
        type: "string",
        description: "Additional CSS classes for the container wrapper"
      },
      {
        name: "aria-label",
        type: "string",
        description: "Accessibility label for screen readers"
      },
      {
        name: "aria-describedby",
        type: "string",
        description: "ID of element describing the button"
      }
    ],
  },
  {
    id: "checkbox",
    title: "Checkbox",
    componentName: "Checkbox, CheckboxGroup",
    caption: "Binary choices made simple",
    description: "Enterprise-level checkbox component with comprehensive variants, sizes, and states. Supports indeterminate state, descriptions, error validation, and flexible label positioning for complex form requirements.",
    category: "forms",
    status: "stable",
    keywords: ["checkbox", "form", "input", "selection", "toggle", "boolean"],
    usage: `import { Checkbox, CheckboxGroup } from "andhera-react";

export function Example() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Basic checkbox */}
      <Checkbox label="Enable notifications" defaultChecked />
      
      {/* With description */}
      <Checkbox
        label="Two-factor authentication"
        description="Add an extra layer of security to your account"
        variant="primary"
      />
      
      {/* Indeterminate state */}
      <Checkbox
        label="Select all items"
        indeterminate
        variant="primary"
      />
      
      {/* With error */}
      <Checkbox
        label="I agree to the Terms and Conditions"
        variant="error"
        error="You must accept the terms to continue"
        required
      />
      
      {/* Checkbox group */}
      <CheckboxGroup
        label="Notification preferences"
        options={[
          { label: "Email", value: "email" },
          { label: "SMS", value: "sms" },
          { label: "Push", value: "push" },
        ]}
        defaultValue={["email", "push"]}
      />
    </div>
  );
}`,
    render: () => <CheckboxPreview />,
    tags: ["Boolean", "Form", "Multi-select", "Validation"],
    props: [],
  },
  {
    id: "clipboard",
    title: "Clipboard",
    componentName: "Clipboard",
    caption: "Copy to clipboard with style and ease",
    description: "A versatile clipboard component with 8+ variants, multiple sizes, tones, and color schemes. Features input integration, custom icons, states management, and accessibility. Perfect for code snippets, API keys, share URLs, and any copyable content.",
    category: "interaction",
    status: "stable",
    keywords: ["clipboard", "copy", "paste", "share", "code", "api", "url", "input"],
    usage: `import { Clipboard } from "andhera-react";

export function Example() {
  return (
    <div className="space-y-4">
      {/* Simple icon button */}
      <Clipboard textToCopy="Hello, World!" variant="icon" />
      
      {/* With text label */}
      <Clipboard 
        textToCopy="npm install andhera-react"
        variant="withText"
        copyText="Copy command"
        copiedText="Copied!"
      />
      
      {/* Input with copy button */}
      <Clipboard 
        textToCopy="https://andhera-ui.com/docs"
        variant="input"
        copyText="https://andhera-ui.com/docs"
      />
      
      {/* Inline link style */}
      <p>
        Your order ID:{" "}
        <Clipboard 
          textToCopy="ORD-2024-12345"
          variant="inline"
          copyText="ORD-2024-12345"
        />
      </p>
    </div>
  );
}`,
    render: () => <ClipboardPreview />,
    tags: ["Copy", "Paste", "Share", "Code", "Input", "Utility"],
    props: [],
  },
  {
    id: "chip",
    title: "Chip",
    componentName: "Chip, ChipGroup",
    caption: "Versatile tag/badge component for selections, filters, and labels",
    description: "Chip is a fully customizable tag component with support for multiple sizes, variants, colors, icons, avatars, loading states, selection, and removal. Perfect for filters, tags, user mentions, and status indicators.",
    category: "data-display",
    keywords: ["chip", "pill", "tag", "badge", "filter", "label"],
    usage: `import { useState } from "react";
import { Chip, ChipGroup } from "andhera-react";

export function Example() {
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
      
      {/* Custom colored chip */}
      <Chip 
        label="Custom" 
        backgroundColor="#ec4899" 
        textColor="#fff"
      />
    </ChipGroup>
  );
}`,    
    render: () => <ChipPreview />,
    tags: ["Tag", "Filter", "Badge", "Selection", "Avatar", "Icon"]
  },
  {
    id: "date-picker",
    title: "Date picker",
    componentName: "DatePicker",
    caption: "Pick single dates or ranges",
    description:
      "DatePicker combines manual typing, calendar selection, and validation so people can pick single dates or multi-day ranges with confidence.",
    category: "forms",
    keywords: ["date", "range", "calendar", "picker"],
    usage: `import { useState } from "react";
import { DatePicker } from "andhera-react";

// Single date selection example.
export function SingleDatePickerExample() {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <DatePicker
      value={value}
      onChange={(next) => setValue(Array.isArray(next) ? next[0] ?? null : next)}
      placeholder="Select a date"
    />
  );
}

// Range selection example.
export function RangeDatePickerExample() {
  const [value, setValue] = useState<[Date, Date] | null>(null);

  return (
    <DatePicker
      mode="range"
      value={value}
      onChange={(next) => {
        if (Array.isArray(next)) {
          setValue(next);
        } else if (next instanceof Date) {
          setValue([next, next]);
        } else {
          setValue(null);
        }
      }}
      placeholder="Select a date range"
      disablePastDates
    />
  );
}`,
    render: () => <DatePickerPreview />,
    tags: ["Calendar", "Single select", "Range", "Validation"],
  },
  {
    id: "dialog",
    title: "Dialog",
    componentName: "Dialog",
    caption: "Focus critical decisions",
    description: "Enterprise-level dialog component with comprehensive customization. Supports multiple sizes, animations, positions, and built-in accessibility features including focus trapping, Escape key handling, and ARIA attributes.",
    category: "feedback",
    keywords: ["dialog", "modal", "popup", "overlay"],
    usage: `import { useState } from "react";
import { Button, Dialog } from "andhera-react";

export function Example() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Invite teammates"
        description="Add team members to your project"
        size="medium"
        animation="scale"
        actions={
          <>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Send Invite</Button>
          </>
        }
      >
        <p>Use dialogs for focused tasks and confirmations.</p>
      </Dialog>
    </>
  );
}`,
    render: () => <DialogPreview />,
    tags: ["Modal", "Overlay", "Confirmation", "Form"]
  },
  {
    id: "drawer",
    title: "Drawer",
    componentName: "Drawer",
    caption: "Slide in contextual menus",
    description: "Drawer anchors menus to any edge, supporting nested navigation and escape dismissal.",
    category: "feedback",
    keywords: ["drawer", "sidebar"],
    usage: `import { useState } from "react";
import { Button, Drawer } from "andhera-react";

const items = [
  { name: "Dashboard", link: "#" },
  { name: "Projects", link: "#" },
];

export function Example() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open drawer</Button>
      <Drawer position="left" isOpen={open} onClose={() => setOpen(false)} items={items} />
    </>
  );
}`,
    render: () => <DrawerPreview />,
    tags: ["Overlay", "Navigation"],
    props: [
      {
        name: "position",
        type: "'left' | 'right' | 'top' | 'bottom'",
        description: "Position of the drawer slide-in animation and placement"
      },
      {
        name: "isOpen",
        type: "boolean",
        description: "Controls whether the drawer is open or closed"
      },
      {
        name: "onOpen",
        type: "() => void",
        description: "Callback function called when drawer should open"
      },
      {
        name: "onClose",
        type: "() => void",
        description: "Callback function called when drawer should close"
      },
      {
        name: "items",
        type: "DrawerItem[]",
        description: "Array of navigation items with optional nested children"
      },
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes for custom styling",
        defaultValue: "''"
      }
    ],
  },
  {
    id: "dropdown",
    title: "Dropdown",
    componentName: "Dropdown",
    caption: "Pick a single option",
    description: "Dropdown offers keyboard navigation, clear action, and status variants for inline selection.",
    category: "forms",
    keywords: ["dropdown", "select"],
    usage: `import { useState } from "react";
import { Dropdown } from "andhera-react";

const options = [
  { id: "eng", label: "Engineering" },
  { id: "design", label: "Design" },
  { id: "ops", label: "Operations" },
];

export function Example() {
  const [value, setValue] = useState<string | number | null>("eng");
  return <Dropdown data={options} value={value} onChange={setValue} label="Team" />;
}`,
    render: () => <DropdownPreview />,
    tags: ["Form", "Single select"]
  },
  {
    id: "file-upload",
    title: "File upload",
    componentName: "FileUpload",
    caption: "Support drag and browse flows",
    description: "FileUpload validates type and size, surfaces previews, and exposes progress hooks.",
    category: "forms",
    keywords: ["file", "upload", "drag and drop"],
    usage: `import { FileUpload } from "andhera-react";

export function Example() {
  return (
    <FileUpload
      label="Assets"
      accept={["image/png", "image/jpeg"]}
      placeholder="Click or drag files"
      onChange={(files) => console.log(files)}
    />
  );
}`,
    render: () => <FileUploadPreview />,
    tags: ["Drag & drop", "Validation"]
  },
  {
    id: "input",
    title: "Input",
    componentName: "Input",
    caption: "Collect typed information",
    description: "Input handles helper text, adornments, and password reveal with robust focus styling.",
    category: "forms",
    keywords: ["input", "text field"],
    usage: `import { Input } from "andhera-react";
import { Mail, Search, Lock, CheckCircle, AlertCircle } from "andhera/icons";

const shortcutBadge = {
  fontSize: "12px",
  letterSpacing: "0.08em",
  color: "#C7CBD7",
  border: "1px solid rgba(255, 255, 255, 0.25)",
  borderRadius: "8px",
  padding: "2px 8px",
};

export function Example() {
  return (
    <div style={{ display: "grid", gap: "18px", maxWidth: 360 }}>
      <Input
        label="Project name"
        placeholder="Market intelligence"
        supportingText="Visible to collaborators"
        fullWidth
      />

      <Input
        label="Owner email"
        labelSecondary="Required"
        type="email"
        startIcon={<Mail size={20} color="#8A8F9B" strokeWidth={1.5} />}
        supportingText="Status updates go to this inbox"
        defaultValue="team@andhera.com"
        fullWidth
      />

      <Input
        label="Budget"
        prefix={<strong>USD</strong>}
        suffix={<span style={{ opacity: 0.7 }}>/month</span>}
        supportingText="Auto converts in approvals"
        defaultValue="12,500"
        fullWidth
      />

      <Input
        label="Search workspace"
        placeholder="Try \"billing\""
        startIcon={<Search size={20} color="#8A8F9B" strokeWidth={1.5} />}
        suffix={<span style={shortcutBadge}>/</span>}
        supportingText="Tap / to focus"
        fullWidth
      />

      <Input
        label="Passphrase"
        type="password"
        startIcon={<Lock size={20} color="#8A8F9B" strokeWidth={1.5} />}
        showPasswordToggle
        status="error"
        errorMessage="Use at least 1 symbol"
        defaultValue="Team@2025!"
        supportingText="Keep credentials complex"
        fullWidth
      />

      <Input
        label="Provisioning key"
        startIcon={<CheckCircle size={20} color="#00C951" strokeWidth={1.5} />}
        supportingText="Certificate verified successfully"
        defaultValue="Ready for deploy"
        status="success"
        fullWidth
      />

      <Input
        label="Usage alert"
        startIcon={<AlertCircle size={20} color="#FF6900" strokeWidth={1.5} />}
        supportingText="85% of monthly quota consumed"
        defaultValue="85% usage"
        status="warning"
        fullWidth
      />

      <Input
        label="Billing contact"
        supportingText="Managed by finance"
        defaultValue="finance@andhera.com"
        disabled
        fullWidth
      />

      <Input
        label="Secure handle"
        variant="filled"
        prefix={<span style={{ fontWeight: 600 }}>#</span>}
        supportingText="Prefixed for chat channels"
        defaultValue="ops-andhera"
        fullWidth
      />
    </div>
  );
}`,
    render: () => <InputPreview />,
    tags: ["Text", "Password", "Form", "Validation"],
  },
  {
    id: "textarea",
    title: "Textarea",
    componentName: "Textarea",
    caption: "Capture long-form thinking",
    description: "Textarea keeps labels, helper text, counters, and auto-grow behavior consistent so product teams can log context without leaving the flow.",
    category: "forms",
    status: "beta",
    keywords: ["textarea", "notes", "multiline"],
    usage: `import { Textarea } from "andhera-react";

export function Example() {
  return (
    <Textarea
      label="Project recap"
      supportingText="Visible to owners and finance"
      placeholder="Summarize learnings and next bets"
      autoGrow
      fullWidth
      maxLength={240}
      showCharacterCount
    />
  );
}`,
    render: () => <TextareaPreview />,
    tags: ["Form", "Multiline", "Notes"],
  },
  {
    id: "multiselect",
    title: "Multi-select",
    componentName: "MultiSelect",
    caption: "Pick multiple choices",
    description: "MultiSelect combines tags, keyboard shortcuts, and optional checkboxes for bulk selection.",
    category: "forms",
    keywords: ["multi-select", "combobox"],
    usage: `import { useState } from "react";
import { MultiSelect } from "andhera-react";

const options = [
  { id: 1, label: "Bug" },
  { id: 2, label: "Feature" },
  { id: 3, label: "Operations" },
];

export function Example() {
  const [value, setValue] = useState<Array<string | number>>([1]);
  return <MultiSelect data={options} value={value} onChange={setValue} label="Labels" />;
}`,
    render: () => <MultiSelectPreview />,
    tags: ["Tags", "Form"],
  },
  {
    id: "pagination",
    title: "Pagination",
    componentName: "Pagination",
    caption: "Navigate result pages",
    description: "Pagination offers page info, jump-to, and page-size controls for data-heavy collections.",
    category: "navigation",
    keywords: ["pagination", "pages"],
    usage: `import { useState } from "react";
import { Pagination } from "andhera-react";

export function Example() {
  const [page, setPage] = useState(1);
  return (
    <Pagination
      totalItems={120}
      itemsPerPage={10}
      currentPage={page}
      onPageChange={setPage}
      showPageInfo
    />
  );
}`,
    render: () => <PaginationPreview />,
    tags: ["Navigation", "Lists"],
  },
  {
    id: "progress-bar",
    title: "Progress bar",
    componentName: "ProgressBar",
    caption: "Visualize completion",
    description: "ProgressBar supports gradients, striping, and percentage placement for process feedback.",
    category: "data-display",
    keywords: ["progress", "status"],
    usage: `import { ProgressBar } from "andhera-react";

export function Example() {
  return (
    <ProgressBar value={72} label="Deployment" percentagePosition="outside" />
  );
}`,
    render: () => <ProgressBarPreview />,
    tags: ["Status", "Feedback"],
  },
  {
    id: "radio-group",
    title: "Radio group",
    componentName: "RadioGroup",
    caption: "Choose a single option",
    description: "RadioGroup arranges radio buttons with consistent spacing, labels, and keyboard navigation. Supports sizes, color variants, descriptions, and full accessibility.",
    category: "forms",
    keywords: ["radio", "form", "RadioGroup", "RadioButton"],
    usage: `import { RadioGroup } from "andhera-react";

export function Example() {
  return (
    <RadioGroup
      name="example"
      label="Select an option"
      options={[
        { value: "one", label: "Option One" },
        { value: "two", label: "Option Two" },
        { value: "three", label: "Option Three" },
      ]}
      defaultValue="one"
    />
  );
}`,
    render: () => <RadioPreview />,
    tags: ["Single select", "Form"],
  },
  {
    id: "rating-star",
    title: "Rating",
    componentName: "Rating",
    caption: "Capture fractional feedback",
    description: "RatingStar supports hover feedback, custom icons, and precision control for reviews.",
    category: "data-display",
    keywords: ["rating", "stars"],
    usage: ` import { Rating } from "andhera-react"  `,
    render: () => <RatingPreview />,
    tags: ["Feedback", "Half steps"],
  },
  {
    id: "skeleton",
    title: "Skeleton",
    componentName: "Skeleton, SkeletonLines, SkeletonGroup",
    caption: "Placeholder loading UI",
    description: "Skeleton renders shimmering placeholders that respect text, rectangular, and circular shapes.",
    category: "data-display",
    status: "stable",
    keywords: ["skeleton", "loading"],
    usage: `import { Skeleton, SkeletonLines, SkeletonGroup } from "andhera-react";

export function Example() {
  return (
    <div style={{ display: "grid", gap: "0.75rem", maxWidth: 280 }}>
      <Skeleton width="60%" />
      <Skeleton variant="rect" height={80} />
      <Skeleton variant="circle" width={48} height={48} />
    </div>
  );
}`,
    render: () => <SkeletonPreview />,
    tags: ["Loading", "Placeholder"],
    props: [],
  },
  {
    id: "slider",
    title: "Slider",
    componentName: "Slider",
    caption: "Adjust values continuously",
    description: "Slider supports horizontal and vertical orientations, tooltips, range selection, custom marks, and full accessibility with keyboard navigation.",
    category: "interaction",
    keywords: ["slider", "range", "input"],
    usage: `import { useState } from "react";
import { Slider } from "andhera-react";

export function Example() {
  const [value, setValue] = useState(42);
  return <Slider value={value} onChange={setValue} showTooltip label="Volume" />;
}`,
    render: () => <SliderPreview />,
    tags: ["Adjust", "Interactive"],
  },
  {
    id: "stat-card",
    title: "Stat card",
    componentName: "StatCard",
    caption: "Summarize key metrics",
    description: "StatCard combines headline numbers with trending badges and iconography for dashboards.",
    category: "data-display",
    keywords: ["stats", "card", "dashboard"],
    usage: `import { StatCard } from "andhera-react";

const data = {
  title: "Revenue",
  value: "$84.2K",
  change: "+12%",
  changeType: "positive",
  color: "#2563eb",
  icon: "TrendingUp",
};

export function Example() {
  return <StatCard data={data} />;
}`,
    render: () => <StatCardPreview />,
    tags: ["KPIs", "Dashboard"],
  },
  {
    id: "table",
    title: "Table",
    componentName: "Table",
    caption: "Render structured datasets",
    description: "Table offers sorting, pagination, search, and custom cell rendering for configurable grids.",
    category: "data-display",
    keywords: ["table", "data grid"],
    usage: `import { Table } from "andhera-react";

const data = [
  { id: 1, name: "Andhera", status: "Active" },
  { id: 2, name: "Nimbus", status: "Draft" },
];

const columns = [
  { key: "name", header: "Project", sortable: true },
  { key: "status", header: "Status" },
];

export function Example() {
  return <Table data={data} columns={columns} caption="Projects" />;
}`,
    render: () => <TablePreview />,
    tags: ["Data", "List"],
  },
  {
    id: "tabs",
    title: "Tabs",
    componentName: "Tabs",
    caption: "Switch between views",
    description: "Tabs provides keyboard navigable tablists with style overrides for active/inactive states.",
    category: "navigation",
    keywords: ["tabs", "navigation"],
    usage: `import { useState } from "react";
import { Tabs } from "andhera-react";

const tabs = [
  { value: "overview", label: "Overview" },
  { value: "members", label: "Members" },
  { value: "activity", label: "Activity" },
];

export function Example() {
  const [value, setValue] = useState("overview");
  return <Tabs tabs={tabs} value={value} onChange={setValue} />;
}`,
    render: () => <TabsPreview />,
    tags: ["Navigation", "Switcher"],
  },
  {
    id: "toggle-button",
    title: "Toggle button",
    componentName: "ToggleButton",
    caption: "Cluster mutually exclusive choices",
    description: "ToggleButton and ToggleButtonGroup provide fully customizable segmented controls for mode switching, view selection, and option grouping. Supports single and multiple selection modes, icons, custom styling, accessibility, and responsive sizing.",
    category: "interaction",
    status: "stable",
    keywords: ["toggle", "button", "segmented", "group", "selection", "mode", "switch", "toolbar"],
    usage: `import { useState } from "react";
import { 
  ToggleButton, 
  ToggleButtonGroup,
  // Types
  type ToggleButtonProps,
  type ToggleButtonGroupProps,
  type ToggleButtonVariant,    // 'primary' | 'secondary' | 'light' | 'outline' | 'ghost'
  type ToggleButtonSize,       // 'xs' | 'small' | 'medium' | 'large' | 'xl'
  type ToggleButtonAlignment,  // 'horizontal' | 'vertical'
  type ToggleButtonRadius,     // 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  type ToggleButtonSelectionMode, // 'single' | 'multiple'
  type ToggleButtonSpacing     // 'none' | 'xs' | 'sm' | 'md' | 'lg'
} from "andhera-react";

// Basic usage
function BasicExample() {
  const [view, setView] = useState("list");
  return (
    <ToggleButtonGroup value={view} onChange={setView} size="large">
      <ToggleButton value="list">List</ToggleButton>
      <ToggleButton value="grid">Grid</ToggleButton>
      <ToggleButton value="calendar">Calendar</ToggleButton>
    </ToggleButtonGroup>
  );
}

// With icons
function IconExample() {
  const [format, setFormat] = useState("bold");
  return (
    <ToggleButtonGroup value={format} onChange={setFormat}>
      <ToggleButton value="bold" startIcon={<BoldIcon />} iconOnly />
      <ToggleButton value="italic" startIcon={<ItalicIcon />} iconOnly />
      <ToggleButton value="underline" startIcon={<UnderlineIcon />} iconOnly />
    </ToggleButtonGroup>
  );
}

// Multiple selection
function MultiSelectExample() {
  const [selected, setSelected] = useState<string[]>(["bold"]);
  return (
    <ToggleButtonGroup 
      value={selected} 
      onChange={setSelected}
      selectionMode="multiple"
    >
      <ToggleButton value="bold">Bold</ToggleButton>
      <ToggleButton value="italic">Italic</ToggleButton>
    </ToggleButtonGroup>
  );
}

// Custom styling
function CustomExample() {
  return (
    <ToggleButtonGroup value="a" onChange={() => {}} spacing="sm" radius="full">
      <ToggleButton 
        value="a"
        activeBackgroundColor="#8B5CF6"
        activeTextColor="#FFFFFF"
      >
        Purple
      </ToggleButton>
      <ToggleButton 
        value="b"
        activeBackgroundColor="#10B981"
        activeTextColor="#FFFFFF"
      >
        Green
      </ToggleButton>
    </ToggleButtonGroup>
  );
}`,
    render: () => <ToggleButtonPreview />,
    tags: ["Mode switch", "Segmented", "Toolbar", "Icons", "Multi-select"],
  },
  {
    id: "toggle-switch",
    title: "Toggle switch",
    componentName: "ToggleSwitch",
    caption: "Flip binary preferences",
    description: "ToggleSwitch delivers accessible switch styling with multiple sizes, variants, custom colors, icons, loading states, helper text, error states, and full ARIA support. Perfect for settings, preferences, and form inputs.",
    category: "forms",
    keywords: ["toggle", "switch", "boolean", "on", "off", "settings", "preferences"],
    usage: `import { ToggleSwitch, ParentToggleSwitch } from "andhera-react";
import type { ToggleSwitchProps, ToggleSwitchSize, ToggleSwitchVariant } from "andhera-react";
import { useState } from "react";

// Controlled usage
export function ControlledExample() {
  const [enabled, setEnabled] = useState(false);
  
  return (
    <ToggleSwitch
      checked={enabled}
      onChange={setEnabled}
      label="Enable notifications"
      size="md"
      variant="default"
    />
  );
}

// Uncontrolled usage
export function UncontrolledExample() {
  return (
    <ParentToggleSwitch
      initialChecked={true}
      onToggle={(checked) => console.log('Toggled:', checked)}
      label="Auto-save drafts"
      helperText="Automatically save your work every 30 seconds"
    />
  );
}`,
    render: () => <SwitchPreview />,
    tags: ["Boolean", "Form", "Settings", "Input"],
  },
  {
    id: "image-carousel",
    title: "Image carousel",
    componentName: "ImageCarousel",
    caption: "Showcase visual content",
    description: "ImageCarousel includes fade, slide, and card variants with autoplay, thumbnails, and counters.",
    category: "data-display",
    keywords: ["carousel", "media"],
    usage: `import { ImageCarousel } from "andhera-react";

const images = [
  { src: "https://picsum.photos/id/1043/600/340", caption: "Mountain escape" },
  { src: "https://picsum.photos/id/1050/600/340", caption: "Desert run" },
  { src: "https://picsum.photos/id/1039/600/340", caption: "City lights" },
];

export function Example() {
  return <ImageCarousel images={images} autoPlay={false} />;
}`,
    render: () => <ImageCarouselPreview />,
    tags: ["Gallery", "Media"],
  },
  {
    id: "grid",
    title: "Grid",
    componentName: "Grid",
    caption: "Create responsive columns",
    description: "Grid uses CSS grid under the hood with min/max helpers for adaptive layouts.",
    category: "layout",
    keywords: ["grid", "layout"],
    usage: `import { Grid } from "andhera-react";

export function Example() {
  return (
    <Grid columns={3} gap="1rem">
      {["Strategy", "Design", "Delivery"].map((item) => (
        <div key={item} style={{ padding: "1rem", borderRadius: "0.75rem", background: "#374151", color: "white" }}>
          {item}
        </div>
      ))}
    </Grid>
  );
}`,
    render: () => <GridPreview />,
    tags: ["Responsive", "Columns"],
  },
  {
    id: "stack",
    title: "Stack",
    componentName: "Stack",
    caption: "Arrange elements on one axis",
    description: "Stack wraps a flex container with shortcut props for direction, alignment, gap, and wrap.",
    category: "layout",
    keywords: ["stack", "layout", "flex"],
    usage: `import { Stack } from "andhera-react";

export function Example() {
  return (
    <Stack direction="horizontal" gap="0.75rem" align="center">
      <span style={{ padding: "0.5rem 0.75rem", background: "#374151", borderRadius: "999px", color: "white" }}>Plan</span>
      <span style={{ padding: "0.5rem 0.75rem", background: "#374151", borderRadius: "999px", color: "white" }}>Build</span>
      <span style={{ padding: "0.5rem 0.75rem", background: "#374151", borderRadius: "999px", color: "white" }}>Ship</span>
    </Stack>
  );
}`,
    render: () => <StackPreview />,
    tags: ["Flex", "Spacing"],
  },
  {
    id: "aspect-ratio",
    title: "Aspect Ratio",
    componentName: "AspectRatio",
    caption: "Maintain consistent proportions",
    description: "AspectRatio ensures content maintains proper proportions across different screen sizes with extensive customization options for styling and behavior.",
    category: "layout",
    status: "new",
    keywords: ["aspect-ratio", "layout", "responsive", "proportions", "media"],
    usage: `import { AspectRatio } from "andhera-react";

export function Example() {
  return (
    <AspectRatio ratio="16:9" variant="image" center>
      <img 
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4" 
        alt="Mountain landscape" 
      />
    </AspectRatio>
  );
}`,
    render: () => <AspectRatioPreview />,
    tags: ["Responsive", "Media", "Containers"],
  },
  {
    id: "autocomplete",
    title: "Autocomplete",
    componentName: "Autocomplete",
    caption: "Smart search and selection",
    description: "Autocomplete combines search input with dropdown selection. Supports multiple selections, custom filtering, keyboard navigation, grouping, and async data loading for powerful user experiences.",
    category: "forms",
    status: "new",
    keywords: ["autocomplete", "search", "select", "dropdown", "combobox", "typeahead", "filter"],
    usage: `import { useState } from "react";
import { Autocomplete, AutocompleteOption } from "andhera-react";

const options: AutocompleteOption[] = [
  { id: 1, label: "React", value: "react" },
  { id: 2, label: "Vue", value: "vue" },
  { id: 3, label: "Angular", value: "angular" },
];

export function Example() {
  const [value, setValue] = useState<AutocompleteOption | null>(null);

  return (
    <Autocomplete
      label="Select Framework"
      options={options}
      value={value}
      onChange={setValue}
      placeholder="Search frameworks..."
    />
  );
}`,
    render: () => <AutocompletePreview />,
    tags: ["Form", "Search", "Selection", "Filter"],
  },
];

// Filter docs to only include specified components
const filteredComponentIds = [
  "aspect-ratio",
  "autocomplete",
  "button",
  "checkbox",
  "chip",
  "clipboard",
  "date-picker",
  "dialog",
  "input",
  "textarea",
  "radio-group",
  "skeleton",
  "slider",
  "snackbar",
  "textarea",
  "toggle-button",
  "toggle-switch",
  "rating-star", 
  "file-upload",
  "dropdown",
  "accordion"
];

const githubBaseUrl = "https://github.com/bee-logical/andhera-react/tree/main/src/components";

const githubPathMap: Record<string, string> = {
  "aspect-ratio": "aspect-ratio/AspectRatio.tsx",
  "autocomplete": "autocomplete/Autocomplete.tsx",
  button: "button/buttons.tsx",
  checkbox: "checkbox/checkboxs.tsx",
  chip: "chip/Chip.tsx",
  "date-picker": "date-picker/DatePicker.tsx",
  dialog: "dialog/BeeDialog.tsx",
  input: "input/BeeInput.tsx",
  textarea: "textarea/BeeTextarea.tsx",
  "radio-group": "radio/radioGroup.tsx",
  skeleton: "skeleton",
  slider: "slider/Slider.tsx",
  snackbar: "snackbar/BeeSnackbar.tsx",
  "toggle-button": "toggle-button/toggleButton.tsx",
  "toggle-switch": "toggleSwitch/ToggleSwitch.tsx",
};

const filteredDocs = docs.filter(doc => filteredComponentIds.includes(doc.id))
  .sort((a, b) => a.title.localeCompare(b.title));

export const componentDocs: ComponentDoc[] = filteredDocs.map((doc) => ({
  ...doc,
  keywords: doc.keywords ?? [doc.title.toLowerCase()],
  props: doc.props ?? [],
  githubUrl: githubPathMap[doc.id] ? `${githubBaseUrl}/${githubPathMap[doc.id]}` : undefined,
}));




function BadgePreview() {
  return (
    <Badge count={3}>
      <div style={{ padding: "0.75rem 1rem", borderRadius: "0.75rem", background: "#374151", color: "white" }}>
        Inbox
      </div>
    </Badge>
  );
}

function BreadcrumbPreview() {
  const items = [
    { label: "Projects", href: "#" },
    { label: "Andhera", href: "#" },
    { label: "Components", isActive: true },
  ];
  return <div style={{ width: "100%", maxWidth: "600px" }}><Breadcrumb items={items} /></div>;
}


function MultiSelectPreview() {
  const [value, setValue] = useState<Array<string | number>>([1]);
  const options = [
    { id: 1, label: "Bug" },
    { id: 2, label: "Feature" },
    { id: 3, label: "Operations" },
  ];
  return <MultiSelect data={options} value={value} onChange={setValue} label="Labels" />;
}

function PaginationPreview() {
  const [page, setPage] = useState(1);
  return (
    <Pagination
      totalItems={120}
      itemsPerPage={10}
      currentPage={page}
      onPageChange={setPage}
      showPageInfo
      showFirstLastButtons
    />
  );
}

function ProgressBarPreview() {
  return (
    <div style={{ display: "grid", gap: "0.75rem", width: "100%", maxWidth: 320 }}>
      <ProgressBar value={72} label="Deployment" percentagePosition="outside" />
      <ProgressBar value={45} gradient="purpleToPink" label="Video encoding" />
    </div>
  );
}

function StatCardPreview() {
  const data = {
    title: "Revenue",
    value: "$84.2K",
    change: "+12%",
    changeType: "positive" as const,
    color: "#2563eb",
    icon: "TrendingUp" as const,
  };
  return <StatCard data={data} />;
}

function TablePreview() {
  const data = [
    { id: 1, project: "Andhera", status: "Active" },
    { id: 2, project: "Nimbus", status: "Draft" },
  ];
  const columns = [
    { key: "project", header: "Project", sortable: true },
    { key: "status", header: "Status" },
  ];
  return <Table data={data} columns={columns} caption="Projects" />;
}

function TabsPreview() {
  const [value, setValue] = useState("overview");
  const tabs = [
    { value: "overview", label: "Overview" },
    { value: "members", label: "Members" },
    { value: "activity", label: "Activity" },
  ];
  return <Tabs tabs={tabs} value={value} onChange={setValue} />;
}


function ImageCarouselPreview() {
  const images = [
    { src: "https://picsum.photos/id/1043/600/340", caption: "Mountain escape" },
    { src: "https://picsum.photos/id/1050/600/340", caption: "Desert run" },
    { src: "https://picsum.photos/id/1039/600/340", caption: "City lights" },
  ];
  return <ImageCarousel images={images} autoPlay={false} />;
}

function GridPreview() {
  return (
    <Grid columns={3} gap="1rem">
      {["Strategy", "Design", "Delivery"].map((item) => (
        <div key={item} style={{ padding: "1rem", borderRadius: "0.75rem", background: "#374151", color: "white" }}>
          {item}
        </div>
      ))}
    </Grid>
  );
}

function StackPreview() {
  return (
    <Stack direction="horizontal" gap="0.75rem" align="center">
      <span style={{ padding: "0.5rem 0.75rem", background: "#374151", borderRadius: "999px", color: "white" }}>Plan</span>
      <span style={{ padding: "0.5rem 0.75rem", background: "#374151", borderRadius: "999px", color: "white" }}>Build</span>
      <span style={{ padding: "0.5rem 0.75rem", background: "#374151", borderRadius: "999px", color: "white" }}>Ship</span>
    </Stack>
  );
}
