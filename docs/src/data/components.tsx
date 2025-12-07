import { useState } from "react";
import type { ReactNode } from "react";
import {
  Badge,
  Accordion,
  Dialog,
  Drawer,
  Dropdown,
  Input,
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
  Slider,
  Stack,
  StatCard,
  Table,
  ToggleButton,
  ToggleButtonGroup,
  ToggleSwitch,
} from "@/components";

import { ButtonPreview } from "../preview/ButtonPreview";
import { CheckboxPreview } from "../preview/CheckboxPreview";
import ChipPreview from "../preview/ChipPreview";
import { RadioPreview } from "../preview/RadioPreview";
import { SwitchPreview } from "../preview/SwitchPreview";
import { SliderPreview } from "../preview/SliderPreview";
import { ToggleButtonPreview } from "../preview/ToggleButtonPreview";
import { SnackbarPreview } from "../preview/SnackbarPreview";
import { DialogPreview } from "../preview/DialogPreview";
import { DrawerPreview } from "../preview/DrawerPreview";
import { InputPreview } from "../preview/InputPreview";

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
}

const docs: SimpleDoc[] = [
  {
    id: "accordion",
    title: "Accordion",
    componentName: "Accordion",
    caption: "Toggle sections inline",
    description: "Accordion organizes related content into expandable sections with single-panel focus by default.",
    category: "data-display",
    status: "stable",
    keywords: ["accordion", "collapse", "panel"],
    usage: `import { useState } from "react";
import { Accordion } from "andhera-react";

const items = [
  { id: "overview", title: "Overview", content: "High-level summary" },
  { id: "details", title: "Details", content: "Extended description" },
];

export function Example() {
  const [expanded, setExpanded] = useState<string | null>("overview");
  return <Accordion items={items} expanded={expanded} onChange={setExpanded} />;
}`,
    render: () => <AccordionPreview />,
    tags: ["Collapsible", "Content grouping"],
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
    props: [
      {
        name: "type",
        type: "'success' | 'warning' | 'info' | 'error' | 'default'",
        description: "Color scheme and icon preset",
        defaultValue: "'default'"
      },
      {
        name: "variant",
        type: "'filled' | 'outline' | 'soft'",
        description: "Visual style",
        defaultValue: "'filled'"
      },
      {
        name: "position",
        type: "'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' | 'center'",
        description: "Screen position"
      },
      {
        name: "size",
        type: "'small' | 'default' | 'large'",
        description: "Padding and font sizing",
        defaultValue: "'default'"
      },
      {
        name: "message",
        type: "string | ReactNode",
        description: "Main snackbar content"
      },
      {
        name: "title",
        type: "string",
        description: "Optional heading"
      },
      {
        name: "duration",
        type: "number",
        description: "Auto-close duration in ms (0 = persistent)",
        defaultValue: "4000"
      },
      {
        name: "progressType",
        type: "'circular' | 'linear' | 'none'",
        description: "Progress indicator style during auto-close",
        defaultValue: "'circular'"
      },
      {
        name: "pauseOnHover",
        type: "boolean",
        description: "Pause auto-close countdown on hover",
        defaultValue: "true"
      },
      {
        name: "closable",
        type: "boolean",
        description: "Show close button",
        defaultValue: "true"
      },
      {
        name: "onClose",
        type: "() => void",
        description: "Called when closed"
      },
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes"
      },
      {
        name: "children",
        type: "ReactNode",
        description: "Custom content to display instead of message prop"
      },
      {
        name: "style",
        type: "React.CSSProperties",
        description: "Inline style overrides"
      },
      {
        name: "icon",
        type: "ReactNode | null",
        description: "Custom icon (null hides icon)"
      },
      {
        name: "showIcon",
        type: "boolean",
        description: "Toggle icon visibility",
        defaultValue: "true"
      },
      {
        name: "action",
        type: "{ label: string; onClick: () => void; variant?: 'text' | 'outlined' | 'filled' }",
        description: "Primary action button"
      },
      {
        name: "actions",
        type: "SnackbarAction[]",
        description: "Multiple action buttons"
      },
      {
        name: "animation",
        type: "'slide' | 'fade' | 'zoom' | 'none'",
        description: "Entry/exit animation",
        defaultValue: "'slide'"
      },
      {
        name: "portal",
        type: "boolean",
        description: "Render into document.body",
        defaultValue: "false"
      },
      {
        name: "ariaLive",
        type: "'polite' | 'assertive' | 'off'",
        description: "ARIA politeness setting",
        defaultValue: "'polite'"
      },
      {
        name: "backgroundColor",
        type: "string",
        description: "Override background color"
      },
      {
        name: "textColor",
        type: "string",
        description: "Override text color"
      },
      {
        name: "borderColor",
        type: "string",
        description: "Override border color"
      },
      {
        name: "iconColor",
        type: "string",
        description: "Override icon color"
      },
      {
        name: "borderRadius",
        type: "string | number",
        description: "Corner radius"
      },
      {
        name: "shadow",
        type: "'none' | 'sm' | 'md' | 'lg' | 'xl'",
        description: "Shadow elevation",
        defaultValue: "'lg'"
      },
      {
        name: "minWidth",
        type: "string | number",
        description: "Minimum width"
      },
      {
        name: "maxWidth",
        type: "string | number",
        description: "Maximum width"
      },
      {
        name: "zIndex",
        type: "number",
        description: "Custom stacking context",
        defaultValue: "9999"
      },
      {
        name: "open",
        type: "boolean",
        description: "Control visibility",
        defaultValue: "true"
      },
      {
        name: "onAnimationEnd",
        type: "(state: 'entered' | 'exited') => void",
        description: "Animation lifecycle callback"
      },
      {
        name: "data-testid",
        type: "string",
        description: "Test id"
      }
    ],
    additionalComponents: [
      {
        name: "SnackbarProvider",
        props: [
          {
            name: "maxSnackbars",
            type: "number",
            description: "Maximum snackbars rendered at once",
            defaultValue: "5"
          },
          {
            name: "defaultPosition",
            type: "SnackbarPosition",
            description: "Default position for stacked snackbars",
            defaultValue: "'bottom-right'"
          },
          {
            name: "spacing",
            type: "number",
            description: "Gap between stacked snackbars (px)",
            defaultValue: "8"
          }
        ]
      },
      {
        name: "useSnackbar",
        props: [
          {
            name: "show",
            type: "(props: Omit<BeeSnackbarProps, 'open'>) => string",
            description: "Render a snackbar and returns its id"
          },
          {
            name: "close",
            type: "(id: string) => void",
            description: "Close snackbar by id"
          },
          {
            name: "closeAll",
            type: "() => void",
            description: "Close all snackbars"
          }
        ]
      },
      {
        name: "createSnackbarHelpers",
        props: [
          {
            name: "success | error | warning | info",
            type: "(message: string, options?: Partial<BeeSnackbarProps>) => string",
            description: "Convenience helpers that call show with presets"
          }
        ]
      }
    ],
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
    componentName: "CheckboxGroup",
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
    props: [
      {
        name: "variant",
        type: "'primary' | 'error' | 'default'",
        description: "Visual style variant of the checkbox. CheckboxVariant type.",
        defaultValue: "'primary'"
      },
      {
        name: "size",
        type: "'small' | 'medium' | 'large'",
        description: "Size of the checkbox (18px, 22px, 26px). CheckboxSize type.",
        defaultValue: "'medium'"
      },
      {
        name: "label",
        type: "string",
        description: "Label text to display with the checkbox"
      },
      {
        name: "description",
        type: "string",
        description: "Helper text displayed below the label"
      },
      {
        name: "error",
        type: "string",
        description: "Error message displayed below the checkbox"
      },
      {
        name: "helperText",
        type: "string",
        description: "Additional helper text displayed below"
      },
      {
        name: "indeterminate",
        type: "boolean",
        description: "Shows indeterminate state (partially checked)",
        defaultValue: "false"
      },
      {
        name: "disabled",
        type: "boolean",
        description: "Disables the checkbox and prevents interaction",
        defaultValue: "false"
      },
      {
        name: "required",
        type: "boolean",
        description: "Marks the checkbox as required with an asterisk indicator",
        defaultValue: "false"
      },
      {
        name: "readOnly",
        type: "boolean",
        description: "Makes the checkbox read-only (visible but not editable)",
        defaultValue: "false"
      },
      {
        name: "labelPosition",
        type: "'left' | 'right' | 'top' | 'bottom'",
        description: "Position of the label relative to the checkbox. CheckboxLabelPosition type.",
        defaultValue: "'right'"
      },
      {
        name: "checked",
        type: "boolean",
        description: "Controlled checked state"
      },
      {
        name: "defaultChecked",
        type: "boolean",
        description: "Uncontrolled default checked state",
        defaultValue: "false"
      },
      {
        name: "onChange",
        type: "(checked: boolean, event: ChangeEvent) => void",
        description: "Callback fired when the checked state changes"
      },
      {
        name: "onFocus",
        type: "(event: FocusEvent) => void",
        description: "Callback fired when checkbox receives focus"
      },
      {
        name: "onBlur",
        type: "(event: FocusEvent) => void",
        description: "Callback fired when checkbox loses focus"
      },
      {
        name: "color",
        type: "string",
        description: "Custom color for checkbox when checked (CSS color value, overrides variant)"
      },
      {
        name: "focusRingColor",
        type: "string",
        description: "Custom focus ring color (CSS color value)"
      },
      {
        name: "focusRingWidth",
        type: "string",
        description: "Width of the focus ring",
        defaultValue: "'1px'"
      },
      {
        name: "showFocusRing",
        type: "boolean",
        description: "Whether to show focus ring on keyboard navigation",
        defaultValue: "true"
      },
      {
        name: "animated",
        type: "boolean",
        description: "Enable or disable transition animations. Useful for reduced motion preferences.",
        defaultValue: "true"
      },
      {
        name: "tooltip",
        type: "string",
        description: "Native HTML tooltip text shown on hover (title attribute)"
      },
      {
        name: "borderRadius",
        type: "'none' | 'sm' | 'md' | 'lg' | 'full'",
        description: "Border radius of the checkbox. CheckboxBorderRadius type.",
        defaultValue: "'md'"
      },
      {
        name: "iconColor",
        type: "string",
        description: "Custom color for the check/indeterminate icon (CSS color value)"
      },
      {
        name: "borderColor",
        type: "string",
        description: "Custom border color when unchecked (CSS color value)"
      },
      {
        name: "hoverBorderColor",
        type: "string",
        description: "Border color on hover when unchecked (CSS color value)"
      },
      {
        name: "autoFocus",
        type: "boolean",
        description: "Automatically focus the checkbox when mounted",
        defaultValue: "false"
      },
      {
        name: "checkboxStyle",
        type: "React.CSSProperties",
        description: "Custom inline styles for the checkbox input element"
      },
      {
        name: "labelStyle",
        type: "React.CSSProperties",
        description: "Custom inline styles for the label element"
      },
      {
        name: "containerClassName",
        type: "string",
        description: "Additional CSS classes for the container element"
      },
      {
        name: "labelClassName",
        type: "string",
        description: "Additional CSS classes for the label element"
      },
      {
        name: "checkboxClassName",
        type: "string",
        description: "Additional CSS classes for the checkbox input element"
      },
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes for the root element"
      },
      {
        name: "checkedIcon",
        type: "ReactNode",
        description: "Custom icon component to display when checked"
      },
      {
        name: "indeterminateIcon",
        type: "ReactNode",
        description: "Custom icon component to display when indeterminate"
      },
      {
        name: "name",
        type: "string",
        description: "Name attribute for form submission"
      },
      {
        name: "value",
        type: "string",
        description: "Value attribute for form submission"
      },
      {
        name: "aria-label",
        type: "string",
        description: "Accessibility label for screen readers"
      },
      {
        name: "aria-describedby",
        type: "string",
        description: "ID of element that describes the checkbox"
      },
      {
        name: "aria-invalid",
        type: "boolean",
        description: "Indicates whether the checkbox value is invalid"
      },
      {
        name: "data-testid",
        type: "string",
        description: "Test ID for automated testing"
      }
    ],
    additionalComponents: [
      {
        name: "CheckboxGroup",
        props: [
      {
        name: "options",
        type: "Array<{label: string; value: string; description?: string; disabled?: boolean; tooltip?: string}>",
        description: "Array of checkbox options to render"
      },
      {
        name: "value",
        type: "string[]",
        description: "Controlled selected values array"
      },
      {
        name: "defaultValue",
        type: "string[]",
        description: "Default selected values for uncontrolled mode"
      },
      {
        name: "onChange",
        type: "(values: string[]) => void",
        description: "Callback fired when selection changes"
      },
      {
        name: "label",
        type: "string",
        description: "Group label displayed above the checkboxes"
      },
      {
        name: "description",
        type: "string",
        description: "Group description text below the label"
      },
      {
        name: "direction",
        type: "'vertical' | 'horizontal'",
        description: "Layout direction for checkboxes",
        defaultValue: "'vertical'"
      },
      {
        name: "size",
        type: "'small' | 'medium' | 'large'",
        description: "Size variant for all checkboxes. CheckboxSize type.",
        defaultValue: "'medium'"
      },
      {
        name: "variant",
        type: "'primary' | 'error' | 'default'",
        description: "Visual variant for all checkboxes. CheckboxVariant type.",
        defaultValue: "'primary'"
      },
      {
        name: "color",
        type: "string",
        description: "Custom color for all checkboxes when checked"
      },
      {
        name: "disabled",
        type: "boolean",
        description: "Disable all checkboxes in the group",
        defaultValue: "false"
      },
      {
        name: "required",
        type: "boolean",
        description: "Mark the group as required",
        defaultValue: "false"
      },
      {
        name: "error",
        type: "string",
        description: "Error message displayed below the group"
      },
      {
        name: "helperText",
        type: "string",
        description: "Helper text displayed below the group"
      },
      {
        name: "name",
        type: "string",
        description: "Name attribute for form submission"
      },
      {
        name: "showSelectAll",
        type: "boolean",
        description: "Show a 'Select All' checkbox above the options",
        defaultValue: "false"
      },
      {
        name: "selectAllLabel",
        type: "string",
        description: "Label for the 'Select All' checkbox",
        defaultValue: "'Select All'"
      },
      {
        name: "minSelections",
        type: "number",
        description: "Minimum number of selections required"
      },
      {
        name: "maxSelections",
        type: "number",
        description: "Maximum number of selections allowed"
      },
      {
        name: "animated",
        type: "boolean",
        description: "Enable transition animations for all checkboxes",
        defaultValue: "true"
      },
      {
        name: "iconColor",
        type: "string",
        description: "Custom icon color for all checkboxes"
      },
      {
        name: "borderColor",
        type: "string",
        description: "Custom border color for all checkboxes when unchecked"
      },
      {
        name: "hoverBorderColor",
        type: "string",
        description: "Border color on hover for all checkboxes"
      },
      {
        name: "borderRadius",
        type: "'none' | 'sm' | 'md' | 'lg' | 'full'",
        description: "Border radius for all checkboxes. CheckboxBorderRadius type.",
        defaultValue: "'md'"
      },
      {
        name: "labelPosition",
        type: "'left' | 'right' | 'top' | 'bottom'",
        description: "Label position for all checkboxes. CheckboxLabelPosition type.",
        defaultValue: "'right'"
      },
      {
        name: "gap",
        type: "string",
        description: "Custom gap between checkboxes (CSS value)"
      },
      {
        name: "focusRingColor",
        type: "string",
        description: "Custom focus ring color for all checkboxes"
      },
      {
        name: "focusRingWidth",
        type: "string",
        description: "Focus ring width for all checkboxes"
      },
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes for the group container"
      }
    ]
      }
    ],
  },
  {
    id: "chip",
    title: "Chip",
    componentName: "Chip",
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
    tags: ["Tag", "Filter", "Badge", "Selection", "Avatar", "Icon"],
    props: [
      {
        name: "label",
        type: "string",
        description: "Text content of the chip.",
      },
      {
        name: "size",
        type: "ChipSize",
        description: "Size of the chip: 'xs' | 'sm' | 'md' | 'lg' | 'xl'.",
        defaultValue: '"md"',
      },
      {
        name: "variant",
        type: "ChipVariant",
        description: "Visual style variant: filled (solid background), outlined (border only), soft (light background), ghost (transparent).",
        defaultValue: '"filled"',
      },
      {
        name: "color",
        type: "ChipColor",
        description: "Predefined color scheme for the chip.",
        defaultValue: '"default"',
      },
      {
        name: "radius",
        type: "ChipRadius",
        description: "Border radius style.",
        defaultValue: '"full"',
      },
      {
        name: "removable",
        type: "boolean",
        description: "Whether to show a remove/close button on the chip.",
        defaultValue: "false",
      },
      {
        name: "onRemove",
        type: "(event: React.MouseEvent<HTMLButtonElement>) => void",
        description: "Callback fired when the remove button is clicked.",
      },
      {
        name: "selectable",
        type: "boolean",
        description: "Whether the chip can be selected/toggled.",
        defaultValue: "false",
      },
      {
        name: "selected",
        type: "boolean",
        description: "Controlled selected state for selectable chips.",
      },
      {
        name: "defaultSelected",
        type: "boolean",
        description: "Default selected state for uncontrolled mode.",
        defaultValue: "false",
      },
      {
        name: "onSelectionChange",
        type: "(selected: boolean) => void",
        description: "Callback fired when the selection state changes.",
      },
      {
        name: "clickable",
        type: "boolean",
        description: "Whether the chip responds to clicks (non-selectable but clickable).",
        defaultValue: "false",
      },
      {
        name: "onClick",
        type: "(event: React.MouseEvent<HTMLDivElement>) => void",
        description: "Callback fired when the chip is clicked.",
      },
      {
        name: "disabled",
        type: "boolean",
        description: "Whether the chip is disabled.",
        defaultValue: "false",
      },
      {
        name: "loading",
        type: "boolean",
        description: "Whether to show a loading spinner.",
        defaultValue: "false",
      },
      {
        name: "loadingText",
        type: "string",
        description: "Text to display when loading.",
      },
      {
        name: "animated",
        type: "boolean",
        description: "Whether to show hover and transition animations.",
        defaultValue: "true",
      },
      {
        name: "avatar",
        type: "ReactNode",
        description: "Avatar element to display at the start of the chip.",
      },
      {
        name: "icon",
        type: "ReactNode",
        description: "Icon element to display at the start of the chip (after avatar if both provided).",
      },
      {
        name: "endIcon",
        type: "ReactNode",
        description: "Icon element to display at the end of the chip (before remove button).",
      },
      {
        name: "removeIcon",
        type: "ReactNode",
        description: "Custom remove icon to replace the default close icon.",
      },
      {
        name: "checkmarkIcon",
        type: "ReactNode",
        description: "Custom checkmark icon shown when chip is selected.",
      },
      {
        name: "showCheckmark",
        type: "boolean",
        description: "Whether to show a checkmark when the chip is selected.",
        defaultValue: "true",
      },
      {
        name: "backgroundColor",
        type: "string",
        description: "Custom background color (CSS color value).",
      },
      {
        name: "textColor",
        type: "string",
        description: "Custom text color (CSS color value).",
      },
      {
        name: "borderColor",
        type: "string",
        description: "Custom border color (CSS color value).",
      },
      {
        name: "hoverBackgroundColor",
        type: "string",
        description: "Custom background color on hover.",
      },
      {
        name: "selectedBackgroundColor",
        type: "string",
        description: "Custom background color when selected.",
      },
      {
        name: "selectedTextColor",
        type: "string",
        description: "Custom text color when selected.",
      },
      {
        name: "className",
        type: "string",
        description: "Additional CSS class names.",
      },
      {
        name: "style",
        type: "React.CSSProperties",
        description: "Inline styles for the chip container.",
      },
      {
        name: "aria-label",
        type: "string",
        description: "Accessible label for the chip.",
      },
      {
        name: "data-testid",
        type: "string",
        description: "Test ID for testing frameworks.",
      },
    ],
    additionalComponents: [
      {
        name: "ChipGroup",
        description: "Container component for organizing multiple chips.",
        props: [
          {
            name: "spacing",
            type: "'xs' | 'sm' | 'md' | 'lg'",
            description: "Spacing between chips.",
            defaultValue: '"sm"',
          },
          {
            name: "direction",
            type: "'row' | 'column'",
            description: "Direction of chip arrangement.",
            defaultValue: '"row"',
          },
          {
            name: "wrap",
            type: "boolean",
            description: "Whether to wrap chips to the next line.",
            defaultValue: "true",
          },
          {
            name: "aria-label",
            type: "string",
            description: "Accessible label for the chip group.",
          },
        ],
      },
    ],
    types: [
      {
        name: "ChipSize",
        definition: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
        description: "Available chip sizes",
      },
      {
        name: "ChipVariant",
        definition: "'filled' | 'outlined' | 'soft' | 'ghost'",
        description: "Visual style variants",
      },
      {
        name: "ChipColor",
        definition: "'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'",
        description: "Predefined color schemes",
      },
      {
        name: "ChipRadius",
        definition: "'none' | 'sm' | 'md' | 'lg' | 'full'",
        description: "Border radius options",
      },
    ],
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
    props: [
      {
        name: "mode",
        type: '"single" | "range"',
        description: "Switch between single date and range selection modes.",
        defaultValue: '"single"',
      },
      {
        name: "value",
        type: "Date | [Date, Date] | null",
        description: "Controlled value for the picker. Provide a tuple when `mode` is `range`.",
      },
      {
        name: "onChange",
        type: "(date: Date | [Date, Date] | null) => void",
        description: "Called whenever the selection changes via typing or calendar clicks.",
      },
      {
        name: "placeholder",
        type: "string",
        description: "Input placeholder shown when no value is selected.",
        defaultValue: '"Select date"',
      },
      {
        name: "disabled",
        type: "boolean",
        description: "Disables the input and hides the calendar trigger.",
        defaultValue: "false",
      },
      {
        name: "error",
        type: "string",
        description: "Displays an error message below the input when provided.",
      },
      {
        name: "disablePastDates",
        type: "boolean",
        description: "Prevents selecting any date prior to today.",
        defaultValue: "false",
      },
      {
        name: "minDate",
        type: "Date",
        description: "Smallest calendar date the user can choose.",
      },
      {
        name: "maxDate",
        type: "Date",
        description: "Largest calendar date the user can choose.",
      },
      {
        name: "validateRange",
        type: "boolean",
        description: "Guards against reversed ranges when typing start and end dates manually.",
        defaultValue: "true",
      },
    ],
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
    tags: ["Modal", "Overlay", "Confirmation", "Form"],
    props: [
      {
        name: "open",
        type: "boolean",
        description: "Controls whether the dialog is visible (required)"
      },
      {
        name: "onClose",
        type: "() => void",
        description: "Callback fired when the dialog should be closed (required)"
      },
      {
        name: "title",
        type: "ReactNode",
        description: "Title displayed in the dialog header"
      },
      {
        name: "description",
        type: "ReactNode",
        description: "Subtitle text displayed below the title"
      },
      {
        name: "children",
        type: "ReactNode",
        description: "Dialog content (required)"
      },
      {
        name: "actions",
        type: "ReactNode",
        description: "Action buttons displayed in the dialog footer"
      },
      {
        name: "size",
        type: "'xs' | 'small' | 'medium' | 'large' | 'xl' | 'full'",
        description: "Size of the dialog. DialogSize type.",
        defaultValue: "'medium'"
      },
      {
        name: "position",
        type: "'center' | 'top' | 'bottom'",
        description: "Position of the dialog on screen. DialogPosition type.",
        defaultValue: "'center'"
      },
      {
        name: "animation",
        type: "'fade' | 'scale' | 'slide-up' | 'slide-down' | 'none'",
        description: "Animation type for entrance/exit. DialogAnimation type.",
        defaultValue: "'scale'"
      },
      {
        name: "animationDuration",
        type: "number",
        description: "Animation duration in milliseconds",
        defaultValue: "300"
      },
      {
        name: "closeOnBackdropClick",
        type: "boolean",
        description: "Whether clicking the backdrop closes the dialog",
        defaultValue: "true"
      },
      {
        name: "closeOnEscape",
        type: "boolean",
        description: "Whether pressing Escape key closes the dialog",
        defaultValue: "true"
      },
      {
        name: "showCloseButton",
        type: "boolean",
        description: "Whether to show the close button in the header",
        defaultValue: "true"
      },
      {
        name: "closeIcon",
        type: "ReactNode",
        description: "Custom icon for the close button"
      },
      {
        name: "icon",
        type: "ReactNode",
        description: "Icon displayed before the title"
      },
      {
        name: "iconColor",
        type: "string",
        description: "Color for the title icon (CSS color value)"
      },
      {
        name: "blurBackdrop",
        type: "boolean",
        description: "Whether to apply blur effect to the backdrop",
        defaultValue: "true"
      },
      {
        name: "backdropColor",
        type: "string",
        description: "Custom backdrop color (CSS color value)"
      },
      {
        name: "backdropClassName",
        type: "string",
        description: "Additional CSS classes for the backdrop"
      },
      {
        name: "preventScroll",
        type: "boolean",
        description: "Whether to prevent body scroll when dialog is open",
        defaultValue: "true"
      },
      {
        name: "scrollable",
        type: "boolean",
        description: "Whether the content area should be scrollable",
        defaultValue: "true"
      },
      {
        name: "maxHeight",
        type: "string",
        description: "Custom max height for the dialog (CSS value)"
      },
      {
        name: "minHeight",
        type: "string",
        description: "Custom min height for the dialog (CSS value)"
      },
      {
        name: "width",
        type: "string",
        description: "Custom width for the dialog (CSS value, overrides size)"
      },
      {
        name: "borderRadius",
        type: "string",
        description: "Custom border radius for the dialog (CSS value)"
      },
      {
        name: "contentPadding",
        type: "string",
        description: "Custom padding for dialog content (CSS value)"
      },
      {
        name: "showHeaderDivider",
        type: "boolean",
        description: "Whether to show a divider between header and content",
        defaultValue: "true"
      },
      {
        name: "showFooterDivider",
        type: "boolean",
        description: "Whether to show a divider between content and footer",
        defaultValue: "true"
      },
      {
        name: "footerAlign",
        type: "'left' | 'center' | 'right' | 'space-between'",
        description: "Alignment of action buttons in the footer",
        defaultValue: "'right'"
      },
      {
        name: "fullscreenOnMobile",
        type: "boolean",
        description: "Whether the dialog should be fullscreen on mobile devices",
        defaultValue: "false"
      },
      {
        name: "zIndex",
        type: "number",
        description: "Z-index for the dialog overlay",
        defaultValue: "9999"
      },
      {
        name: "trapFocus",
        type: "boolean",
        description: "Whether to trap focus within the dialog",
        defaultValue: "true"
      },
      {
        name: "restoreFocus",
        type: "boolean",
        description: "Whether to restore focus to trigger element on close",
        defaultValue: "true"
      },
      {
        name: "initialFocus",
        type: "string",
        description: "CSS selector for the element to focus when dialog opens"
      },
      {
        name: "onAfterOpen",
        type: "() => void",
        description: "Callback fired after the dialog has finished opening animation"
      },
      {
        name: "onAfterClose",
        type: "() => void",
        description: "Callback fired after the dialog has finished closing animation"
      },
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes for the dialog container"
      },
      {
        name: "headerClassName",
        type: "string",
        description: "Additional CSS classes for the header"
      },
      {
        name: "contentClassName",
        type: "string",
        description: "Additional CSS classes for the content area"
      },
      {
        name: "footerClassName",
        type: "string",
        description: "Additional CSS classes for the footer"
      },
      {
        name: "style",
        type: "React.CSSProperties",
        description: "Custom inline styles for the dialog"
      },
      {
        name: "headerStyle",
        type: "React.CSSProperties",
        description: "Custom inline styles for the header"
      },
      {
        name: "contentStyle",
        type: "React.CSSProperties",
        description: "Custom inline styles for the content area"
      },
      {
        name: "footerStyle",
        type: "React.CSSProperties",
        description: "Custom inline styles for the footer"
      },
      {
        name: "aria-label",
        type: "string",
        description: "Accessible label for the dialog"
      },
      {
        name: "aria-describedby",
        type: "string",
        description: "ID of element that describes the dialog"
      },
      {
        name: "data-testid",
        type: "string",
        description: "Test ID for automated testing"
      }
    ],
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
    tags: ["Form", "Single select"],
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
    tags: ["Drag & drop", "Validation"],
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
    props: [
      {
        name: "label",
        type: "string",
        description: "Primary field label rendered above the input",
      },
      {
        name: "labelSecondary",
        type: "string",
        description: "Optional helper text (e.g., Required) displayed next to the label",
      },
      {
        name: "labelPlacement",
        type: "'default' | 'inner' | 'border'",
        description: "Controls whether the label sits above, inside, or floating on the border",
        defaultValue: "'default'",
      },
      {
        name: "labelTooltip",
        type: "ReactNode",
        description: "Info tooltip content shown next to the label",
      },
      {
        name: "labelClassName",
        type: "string",
        description: "Custom CSS classes for the label element",
      },
      {
        name: "supportingText",
        type: "string",
        description: "Helper or validation copy shown beneath the field",
      },
      {
        name: "supportingTextClassName",
        type: "string",
        description: "Custom CSS classes for the supporting text",
      },
      {
        name: "variant",
        type: "'outlined' | 'filled'",
        description: "Visual treatment of the container",
        defaultValue: "'outlined'",
      },
      {
        name: "size",
        type: "'sm' | 'md' | 'lg'",
        description: "Control size for different density layouts",
        defaultValue: "'md'",
      },
      {
        name: "status",
        type: "'default' | 'success' | 'warning' | 'error'",
        description: "Applies success/warning/error border + supporting-text colors",
        defaultValue: "'default'",
      },
      {
        name: "error",
        type: "boolean",
        description: "Legacy flag that maps to status=\"error\" when true",
        defaultValue: "false",
      },
      {
        name: "errorMessage",
        type: "string",
        description: "Overrides supportingText when status is error",
      },
      {
        name: "disabled",
        type: "boolean",
        description: "Disables interaction and dims colors",
        defaultValue: "false",
      },
      {
        name: "readOnly",
        type: "boolean",
        description: "Makes the input read-only (focusable but not editable)",
        defaultValue: "false",
      },
      {
        name: "required",
        type: "boolean",
        description: "Shows asterisk indicator and sets aria-required",
        defaultValue: "false",
      },
      {
        name: "fullWidth",
        type: "boolean",
        description: "Expands the control to fill the container width",
        defaultValue: "false",
      },
      {
        name: "startIcon",
        type: "ReactNode",
        description: "Icon rendered at the leading edge inside the field",
      },
      {
        name: "endIcon",
        type: "ReactNode",
        description: "Icon rendered at the trailing edge inside the field",
      },
      {
        name: "prefix",
        type: "ReactNode",
        description: "Content displayed before the text input (e.g., currency)",
      },
      {
        name: "suffix",
        type: "ReactNode",
        description: "Content displayed after the text input (e.g., per-unit copy)",
      },
      {
        name: "showPasswordToggle",
        type: "boolean",
        description: "Displays the eye icon button to toggle password visibility",
        defaultValue: "false",
      },
      {
        name: "showClearButton",
        type: "boolean",
        description: "Shows a clear button when input has a value",
        defaultValue: "false",
      },
      {
        name: "loading",
        type: "boolean",
        description: "Shows a loading spinner in place of end icons",
        defaultValue: "false",
      },
      {
        name: "maxLength",
        type: "number",
        description: "Maximum character length with native enforcement",
      },
      {
        name: "showCharacterCount",
        type: "boolean",
        description: "Displays character counter when maxLength is set",
        defaultValue: "false",
      },
      {
        name: "borderRadius",
        type: "string",
        description: "Custom border radius (e.g., '4px', '16px', 'full')",
        defaultValue: "'8px'",
      },
      {
        name: "autoFocus",
        type: "boolean",
        description: "Auto-focuses the input on mount",
        defaultValue: "false",
      },
      {
        name: "inputClassName",
        type: "string",
        description: "Custom className merged onto the native input",
      },
      {
        name: "containerClassName",
        type: "string",
        description: "Custom className applied to the outer wrapper",
      },
      {
        name: "onPrefixClick",
        type: "() => void",
        description: "Click handler for interactive prefix content",
      },
      {
        name: "onSuffixClick",
        type: "() => void",
        description: "Click handler for interactive suffix content",
      },
      {
        name: "onEndIconClick",
        type: "() => void",
        description: "Click handler for an optional trailing icon",
      },
      {
        name: "onClear",
        type: "() => void",
        description: "Callback when clear button is clicked",
      },
      {
        name: "type",
        type: "HTMLInputTypeAttribute",
        description: "Native input type (text, email, password, number, etc.)",
        defaultValue: "'text'",
      },
      {
        name: "aria-label",
        type: "string",
        description: "ARIA label for accessibility when no visible label is provided",
      },
      {
        name: "aria-describedby",
        type: "string",
        description: "ARIA described-by ID for custom accessibility descriptions",
      },
    ],
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
    props: [
      {
        name: "name",
        type: "string",
        description: "The name attribute for the radio group (required for form submission).",
        defaultValue: '""',
      },
      {
        name: "options",
        type: "RadioOption[]",
        description: "Array of options. RadioOption: { value: string; label: string; disabled?: boolean; description?: string; helperText?: string }",
        defaultValue: "[]",
      },
      {
        name: "value",
        type: "string",
        description: "The controlled selected value. Use with onChange for controlled component behavior.",
        defaultValue: "undefined",
      },
      {
        name: "defaultValue",
        type: "string",
        description: "The default selected value for uncontrolled usage.",
        defaultValue: '""',
      },
      {
        name: "label",
        type: "string",
        description: "Label text displayed above the radio group.",
        defaultValue: "undefined",
      },
      {
        name: "labelClassName",
        type: "string",
        description: "Custom class name for the group label element.",
        defaultValue: '""',
      },
      {
        name: "onChange",
        type: "(value: string) => void",
        description: "Callback fired when the selected value changes.",
        defaultValue: "undefined",
      },
      {
        name: "onBlur",
        type: "(value: string) => void",
        description: "Callback fired when focus leaves a radio button.",
        defaultValue: "undefined",
      },
      {
        name: "onFocus",
        type: "(value: string) => void",
        description: "Callback fired when a radio button receives focus.",
        defaultValue: "undefined",
      },
      {
        name: "size",
        type: '"small" | "medium" | "large"',
        description: "Size of all radio buttons in the group. 'small' = 16px, 'medium' = 20px, 'large' = 24px.",
        defaultValue: '"medium"',
      },
      {
        name: "variant",
        type: '"default" | "primary" | "success" | "warning" | "error" | "info"',
        description: "Color variant for the radio buttons. 'default' = gray, 'primary' = #FFCB00, 'success' = green, 'warning' = amber, 'error' = red, 'info' = blue.",
        defaultValue: '"default"',
      },
      {
        name: "labelPosition",
        type: '"left" | "right" | "top" | "bottom"',
        description: "Position of labels relative to the radio buttons.",
        defaultValue: '"right"',
      },
      {
        name: "direction",
        type: '"row" | "column"',
        description: "Layout direction of the radio buttons. 'row' = horizontal, 'column' = vertical.",
        defaultValue: '"column"',
      },
      {
        name: "gap",
        type: "number | string",
        description: "Gap between radio options. Number is treated as pixels, string allows custom units.",
        defaultValue: "12",
      },
      {
        name: "required",
        type: "boolean",
        description: "When true, displays a required indicator (*) next to the group label.",
        defaultValue: "false",
      },
      {
        name: "disabled",
        type: "boolean",
        description: "When true, disables all radio buttons in the group.",
        defaultValue: "false",
      },
      {
        name: "readOnly",
        type: "boolean",
        description: "When true, prevents value changes but keeps the group focusable.",
        defaultValue: "false",
      },
      {
        name: "error",
        type: "boolean",
        description: "When true, displays the group in an error state with error styling.",
        defaultValue: "false",
      },
      {
        name: "errorMessage",
        type: "string",
        description: "Error message displayed below the group when error is true.",
        defaultValue: "undefined",
      },
      {
        name: "helperText",
        type: "string",
        description: "Helper text displayed below the group (hidden when error message is shown).",
        defaultValue: "undefined",
      },
      {
        name: "showRipple",
        type: "boolean",
        description: "When true, shows a ripple effect on radio button click.",
        defaultValue: "true",
      },
      {
        name: "className",
        type: "string",
        description: "Custom class name for the radio group container.",
        defaultValue: '""',
      },
      {
        name: "inputClassName",
        type: "string",
        description: "Custom class name applied to each radio input element.",
        defaultValue: '""',
      },
      {
        name: "optionClassName",
        type: "string",
        description: "Custom class name applied to each option wrapper.",
        defaultValue: '""',
      },
      {
        name: "renderOption",
        type: "(option: RadioOption, isSelected: boolean, radioElement: ReactNode) => ReactNode",
        description: "Custom render function for each option. Receives the option data, selection state, and the default radio element.",
        defaultValue: "undefined",
      },
      {
        name: "id",
        type: "string",
        description: "ID attribute for the radio group container.",
        defaultValue: "undefined",
      },
      {
        name: "aria-label",
        type: "string",
        description: "Accessible label for the radio group when no visible label is provided.",
        defaultValue: "undefined",
      },
      {
        name: "aria-labelledby",
        type: "string",
        description: "ID of an element that labels the radio group.",
        defaultValue: "undefined",
      },
      {
        name: "aria-describedby",
        type: "string",
        description: "ID of an element that describes the radio group.",
        defaultValue: "undefined",
      },
    ],
  },
  {
    id: "rating-star",
    title: "Rating star",
    componentName: "RatingStar",
    caption: "Capture fractional feedback",
    description: "RatingStar supports hover feedback, custom icons, and precision control for reviews.",
    category: "data-display",
    keywords: ["rating", "stars"],
    usage: `import { useState } from "react";
import { RatingStar } from "andhera-react";

export function Example() {
  const [value, setValue] = useState<number | null>(3.5);
  return <RatingStar value={value} onChange={(_, next) => setValue(next)} allowHalf showValue />;
}`,
    render: () => <RatingPreview />,
    tags: ["Feedback", "Half steps"],
  },
  {
    id: "skeleton",
    title: "Skeleton",
    componentName: "Skeleton",
    caption: "Placeholder loading UI",
    description: "Skeleton renders shimmering placeholders that respect text, rectangular, and circular shapes.",
    category: "data-display",
    keywords: ["skeleton", "loading"],
    usage: `import { Skeleton } from "andhera-react";

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
    props: [
      {
        name: "min",
        type: "number",
        description: "Minimum value of the slider.",
        defaultValue: "0"
      },
      {
        name: "max",
        type: "number",
        description: "Maximum value of the slider.",
        defaultValue: "100"
      },
      {
        name: "step",
        type: "number",
        description: "Step increment for value changes. Use decimal values for precise control (e.g., 0.1).",
        defaultValue: "1"
      },
      {
        name: "value",
        type: "number",
        description: "Current value for controlled mode. Use with onChange.",
        defaultValue: "undefined"
      },
      {
        name: "defaultValue",
        type: "number",
        description: "Default value for uncontrolled mode.",
        defaultValue: "min"
      },
      {
        name: "onChange",
        type: "(value: number) => void",
        description: "Callback fired when value changes. Receives the new value.",
        defaultValue: "undefined"
      },
      {
        name: "onChangeStart",
        type: "(value: number) => void",
        description: "Callback fired when dragging starts.",
        defaultValue: "undefined"
      },
      {
        name: "onChangeEnd",
        type: "(value: number) => void",
        description: "Callback fired when dragging ends.",
        defaultValue: "undefined"
      },
      {
        name: "disabled",
        type: "boolean",
        description: "When true, disables the slider and prevents interaction.",
        defaultValue: "false"
      },
      {
        name: "readOnly",
        type: "boolean",
        description: "When true, makes the slider read-only but still focusable.",
        defaultValue: "false"
      },
      {
        name: "orientation",
        type: '"horizontal" | "vertical"',
        description: "Orientation of the slider. 'horizontal' = left-to-right, 'vertical' = bottom-to-top.",
        defaultValue: '"horizontal"'
      },
      {
        name: "variant",
        type: '"default" | "primary" | "secondary" | "success" | "warning" | "danger" | "info" | "dark"',
        description: "Color variant. 'default' = gray, 'primary' = #FFCB00, 'success' = green, 'warning' = yellow, 'danger' = red, 'info' = cyan, 'dark' = gray-900.",
        defaultValue: '"primary"'
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        description: "Size of the slider. 'sm' = 3px track/28x18px thumb, 'md' = 4px track/32x20px thumb, 'lg' = 6px track/38x24px thumb.",
        defaultValue: '"md"'
      },
      {
        name: "showTooltip",
        type: "boolean",
        description: "When true, always shows tooltip with current value.",
        defaultValue: "false"
      },
      {
        name: "showTooltipOnDrag",
        type: "boolean",
        description: "When true, shows tooltip only while dragging.",
        defaultValue: "false"
      },
      {
        name: "tooltipPosition",
        type: '"top" | "bottom" | "left" | "right"',
        description: "Position of the tooltip relative to the thumb.",
        defaultValue: '"top"'
      },
      {
        name: "tooltipFormat",
        type: "(value: number) => string",
        description: "Custom formatter function for tooltip text. Receives value, returns display string.",
        defaultValue: "(val) => val.toString()"
      },
      {
        name: "label",
        type: "string",
        description: "Label text displayed above the slider.",
        defaultValue: "undefined"
      },
      {
        name: "required",
        type: "boolean",
        description: "When true, displays a required indicator (*) next to the label.",
        defaultValue: "false"
      },
      {
        name: "description",
        type: "string",
        description: "Description text displayed below the slider.",
        defaultValue: "undefined"
      },
      {
        name: "helperText",
        type: "string",
        description: "Helper text displayed below the slider (hidden when error is shown).",
        defaultValue: "undefined"
      },
      {
        name: "error",
        type: "boolean",
        description: "When true, displays the slider in error state with red styling.",
        defaultValue: "false"
      },
      {
        name: "errorMessage",
        type: "string",
        description: "Error message displayed below the slider when error is true.",
        defaultValue: "undefined"
      },
      {
        name: "showSteps",
        type: "boolean",
        description: "When true, shows step markers on the track at each step interval.",
        defaultValue: "false"
      },
      {
        name: "marks",
        type: "SliderMark[]",
        description: "Custom marks to display on the track. SliderMark: { value: number; label?: string }. Overrides showSteps.",
        defaultValue: "undefined"
      },
      {
        name: "showValueLabels",
        type: "boolean",
        description: "When true, shows min/max and current value labels.",
        defaultValue: "false"
      },
      {
        name: "range",
        type: "boolean",
        description: "When true, enables range selection with two thumbs.",
        defaultValue: "false"
      },
      {
        name: "valueStart",
        type: "number",
        description: "Start value for range slider in controlled mode.",
        defaultValue: "undefined"
      },
      {
        name: "valueEnd",
        type: "number",
        description: "End value for range slider in controlled mode.",
        defaultValue: "undefined"
      },
      {
        name: "onRangeChange",
        type: "(start: number, end: number) => void",
        description: "Callback fired when range values change. Receives (start, end) values.",
        defaultValue: "undefined"
      },
      {
        name: "inverted",
        type: "boolean",
        description: "When true, inverts the slider direction (right-to-left or bottom-to-top).",
        defaultValue: "false"
      },
      {
        name: "trackWidth",
        type: "number | string",
        description: "Width of the slider track in pixels or CSS value.",
        defaultValue: "400 (horizontal)"
      },
      {
        name: "trackHeight",
        type: "number | string",
        description: "Height of the slider track in pixels or CSS value.",
        defaultValue: "320 (vertical)"
      },
      {
        name: "className",
        type: "string",
        description: "Custom class name for the container.",
        defaultValue: '""'
      },
      {
        name: "trackClassName",
        type: "string",
        description: "Custom class name for the track element.",
        defaultValue: '""'
      },
      {
        name: "thumbClassName",
        type: "string",
        description: "Custom class name for the thumb element(s).",
        defaultValue: '""'
      },
      {
        name: "fillClassName",
        type: "string",
        description: "Custom class name for the filled track portion.",
        defaultValue: '""'
      },
      {
        name: "labelClassName",
        type: "string",
        description: "Custom class name for the label element.",
        defaultValue: '""'
      },
      {
        name: "tooltipClassName",
        type: "string",
        description: "Custom class name for the tooltip element.",
        defaultValue: '""'
      },
      {
        name: "descriptionClassName",
        type: "string",
        description: "Custom class name for the description/helper text.",
        defaultValue: '""'
      },
      {
        name: "stepClassName",
        type: "string",
        description: "Custom class name for step markers.",
        defaultValue: '""'
      },
      {
        name: "id",
        type: "string",
        description: "ID attribute for the slider.",
        defaultValue: "undefined"
      },
      {
        name: "name",
        type: "string",
        description: "Name attribute for form submission.",
        defaultValue: "undefined"
      },
      {
        name: "aria-label",
        type: "string",
        description: "Accessible label when no visible label is provided.",
        defaultValue: "undefined"
      },
      {
        name: "aria-labelledby",
        type: "string",
        description: "ID of an element that labels the slider.",
        defaultValue: "undefined"
      },
      {
        name: "aria-describedby",
        type: "string",
        description: "ID of an element that describes the slider.",
        defaultValue: "undefined"
      },
      {
        name: "aria-valuetext",
        type: "string",
        description: "Accessible text announcing value changes (for screen readers).",
        defaultValue: "undefined"
      },
    ],
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
    props: [
      {
        name: "value",
        type: "string | boolean",
        description: "Value associated with this toggle button. Used for selection tracking in groups."
      },
      {
        name: "isActive",
        type: "boolean",
        description: "Whether the button is currently active/selected. Automatically managed when used in ToggleButtonGroup.",
        defaultValue: "false"
      },
      {
        name: "onClick",
        type: "() => void",
        description: "Click handler for the button. Automatically wired when used in ToggleButtonGroup."
      },
      {
        name: "children",
        type: "ReactNode",
        description: "Button content (text, icons, or any valid React node)"
      },
      {
        name: "disabled",
        type: "boolean",
        description: "Disables the button and prevents interaction",
        defaultValue: "false"
      },
      {
        name: "variant",
        type: "'primary' | 'secondary' | 'light' | 'outline' | 'ghost'",
        description: "Visual style variant. Primary for prominent actions, secondary with container, light for bright UIs, outline for minimal, ghost for subtle.",
        defaultValue: "'primary'"
      },
      {
        name: "size",
        type: "'xs' | 'small' | 'medium' | 'large' | 'xl'",
        description: "Size of the button (24px, 32px, 40px, 48px, 56px height respectively)",
        defaultValue: "'medium'"
      },
      {
        name: "radius",
        type: "'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'",
        description: "Border radius style. Use 'full' for pill-shaped buttons.",
        defaultValue: "Auto (based on group position)"
      },
      {
        name: "alignment",
        type: "'horizontal' | 'vertical'",
        description: "Layout direction when used in a group",
        defaultValue: "'horizontal'"
      },
      {
        name: "startIcon",
        type: "ReactNode",
        description: "Icon element to display before the button text"
      },
      {
        name: "endIcon",
        type: "ReactNode",
        description: "Icon element to display after the button text"
      },
      {
        name: "iconOnly",
        type: "boolean",
        description: "If true, only renders the icon (requires startIcon or endIcon)",
        defaultValue: "false"
      },
      {
        name: "fullWidth",
        type: "boolean",
        description: "Makes the button take full width of its container",
        defaultValue: "false"
      },
      {
        name: "tooltip",
        type: "string",
        description: "Tooltip text shown on hover (native title attribute)"
      },
      {
        name: "backgroundColor",
        type: "string",
        description: "Custom background color for inactive state"
      },
      {
        name: "textColor",
        type: "string",
        description: "Custom text color for inactive state"
      },
      {
        name: "borderColor",
        type: "string",
        description: "Custom border color for inactive state"
      },
      {
        name: "activeBackgroundColor",
        type: "string",
        description: "Custom background color when active"
      },
      {
        name: "activeTextColor",
        type: "string",
        description: "Custom text color when active"
      },
      {
        name: "activeBorderColor",
        type: "string",
        description: "Custom border color when active"
      },
      {
        name: "customActiveClassName",
        type: "string",
        description: "Custom CSS classes applied when button is active (overrides default active styles)"
      },
      {
        name: "customInactiveClassName",
        type: "string",
        description: "Custom CSS classes applied when button is inactive"
      },
      {
        name: "disableRipple",
        type: "boolean",
        description: "Disables the subtle press animation effect",
        defaultValue: "false"
      },
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes for the button element"
      },
      {
        name: "inputProps",
        type: "ButtonHTMLAttributes<HTMLButtonElement>",
        description: "Additional HTML attributes to spread on the button element"
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
      },
      {
        name: "aria-pressed",
        type: "boolean",
        description: "Indicates if the button is pressed (auto-set based on isActive)"
      }
    ],
    additionalComponents: [
      {
        name: "ToggleButtonGroup",
        props: [
          {
            name: "value",
            type: "string | string[]",
            description: "Currently selected value(s). String for single mode, string[] for multiple mode."
          },
          {
            name: "onChange",
            type: "(value: string | string[]) => void",
            description: "Callback fired when selection changes"
          },
          {
            name: "selectionMode",
            type: "'single' | 'multiple'",
            description: "Selection mode - single (radio-like) or multiple (checkbox-like)",
            defaultValue: "'single'"
          },
          {
            name: "disabled",
            type: "boolean",
            description: "Disables all buttons in the group",
            defaultValue: "false"
          },
          {
            name: "variant",
            type: "'primary' | 'secondary' | 'light' | 'outline' | 'ghost'",
            description: "Visual style variant applied to all buttons",
            defaultValue: "'primary'"
          },
          {
            name: "size",
            type: "'xs' | 'small' | 'medium' | 'large' | 'xl'",
            description: "Size applied to all buttons",
            defaultValue: "'medium'"
          },
          {
            name: "alignment",
            type: "'horizontal' | 'vertical'",
            description: "Layout direction of the group",
            defaultValue: "'horizontal'"
          },
          {
            name: "spacing",
            type: "'none' | 'xs' | 'sm' | 'md' | 'lg'",
            description: "Gap between buttons. 'none' creates connected buttons.",
            defaultValue: "'none'"
          },
          {
            name: "radius",
            type: "'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'",
            description: "Border radius applied to buttons when using spacing"
          },
          {
            name: "elevated",
            type: "boolean",
            description: "Adds shadow elevation (secondary variant only)",
            defaultValue: "false"
          },
          {
            name: "fullWidth",
            type: "boolean",
            description: "Makes the group span full width of container",
            defaultValue: "false"
          },
          {
            name: "required",
            type: "boolean",
            description: "If true, at least one option must always be selected",
            defaultValue: "false"
          },
          {
            name: "className",
            type: "string",
            description: "Additional CSS classes for the container"
          },
          {
            name: "containerBackgroundColor",
            type: "string",
            description: "Custom background color for the group container"
          },
          {
            name: "containerBorderColor",
            type: "string",
            description: "Custom border color for the group container"
          },
          {
            name: "aria-label",
            type: "string",
            description: "Accessibility label for the group"
          },
          {
            name: "aria-labelledby",
            type: "string",
            description: "ID of element labelling the group"
          },
          {
            name: "id",
            type: "string",
            description: "ID attribute for the group container"
          },
          {
            name: "data-testid",
            type: "string",
            description: "Test ID for testing frameworks"
          }
        ]
      }
    ],
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
    props: [
      {
        name: "checked",
        type: "boolean",
        description: "Controls the on/off state of the toggle switch (controlled mode).",
        required: true,
      },
      {
        name: "onChange",
        type: "(checked: boolean) => void",
        description: "Callback fired when the toggle state changes.",
        required: true,
      },
      {
        name: "id",
        type: "string",
        description: "Unique identifier for the switch. Auto-generated if not provided.",
      },
      {
        name: "name",
        type: "string",
        description: "Name attribute for form integration.",
      },
      {
        name: "label",
        type: "ReactNode",
        description: "Label text or element displayed alongside the switch.",
      },
      {
        name: "helperText",
        type: "string",
        description: "Helper text displayed below the switch for additional context.",
      },
      {
        name: "labelPlacement",
        type: "'top' | 'bottom' | 'left' | 'right'",
        description: "Position of the label relative to the switch.",
        defaultValue: "'right'",
      },
      {
        name: "size",
        type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
        description: "Size variant of the switch. Affects track width, height, and knob size.",
        defaultValue: "'md'",
      },
      {
        name: "variant",
        type: "'default' | 'outlined' | 'filled'",
        description: "Visual style variant. 'outlined' adds a border in off state, 'filled' uses a solid background.",
        defaultValue: "'default'",
      },
      {
        name: "disabled",
        type: "boolean",
        description: "Disables the switch and reduces opacity.",
        defaultValue: "false",
      },
      {
        name: "readOnly",
        type: "boolean",
        description: "Makes the switch read-only (displays state but prevents changes).",
        defaultValue: "false",
      },
      {
        name: "required",
        type: "boolean",
        description: "Marks the field as required and shows an asterisk indicator.",
        defaultValue: "false",
      },
      {
        name: "error",
        type: "boolean",
        description: "Shows error state with red ring indicator.",
        defaultValue: "false",
      },
      {
        name: "loading",
        type: "boolean",
        description: "Shows a loading spinner inside the knob and disables interaction.",
        defaultValue: "false",
      },
      {
        name: "icon",
        type: "ReactNode",
        description: "Icon displayed inside the knob (shown in both states).",
      },
      {
        name: "checkedIcon",
        type: "ReactNode",
        description: "Icon displayed inside the knob when checked.",
      },
      {
        name: "uncheckedIcon",
        type: "ReactNode",
        description: "Icon displayed inside the knob when unchecked.",
      },
      {
        name: "checkedColor",
        type: "string",
        description: "Tailwind CSS class for the track color when checked.",
        defaultValue: "'bg-blue-600'",
      },
      {
        name: "uncheckedColor",
        type: "string",
        description: "Tailwind CSS class for the track color when unchecked.",
        defaultValue: "'bg-gray-600'",
      },
      {
        name: "borderFocusColor",
        type: "string",
        description: "Tailwind CSS ring color class for focus state.",
        defaultValue: "'ring-blue-500'",
      },
      {
        name: "knobColor",
        type: "string",
        description: "Tailwind CSS background class for the knob when unchecked.",
        defaultValue: "'bg-white'",
      },
      {
        name: "activeKnobColor",
        type: "string",
        description: "Tailwind CSS background class for the knob when checked.",
        defaultValue: "'bg-white'",
      },
      {
        name: "className",
        type: "string",
        description: "Custom class name for the outer wrapper container.",
      },
      {
        name: "switchClassName",
        type: "string",
        description: "Custom class name for the switch track element.",
      },
      {
        name: "labelClassName",
        type: "string",
        description: "Custom class name for the label element.",
      },
      {
        name: "knobClassName",
        type: "string",
        description: "Custom class name for the knob element.",
      },
      {
        name: "tooltip",
        type: "string",
        description: "Tooltip text displayed on hover.",
      },
      {
        name: "onBlur",
        type: "(e: FocusEvent) => void",
        description: "Callback fired when the switch loses focus.",
      },
      {
        name: "onFocus",
        type: "(e: FocusEvent) => void",
        description: "Callback fired when the switch gains focus.",
      },
      {
        name: "aria-label",
        type: "string",
        description: "Accessible label for screen readers.",
      },
      {
        name: "aria-describedby",
        type: "string",
        description: "ID of element that describes the switch.",
      },
      {
        name: "aria-labelledby",
        type: "string",
        description: "ID of element that labels the switch.",
      },
      {
        name: "data-testid",
        type: "string",
        description: "Test ID for automated testing frameworks.",
      },
      {
        name: "tabIndex",
        type: "number",
        description: "Tab index for keyboard navigation order.",
      },
      {
        name: "ref",
        type: "React.Ref<HTMLButtonElement>",
        description: "Ref forwarded to the underlying button element.",
      },
    ],
    additionalComponents: [
      {
        name: "ParentToggleSwitch",
        description: "An uncontrolled version of ToggleSwitch that manages its own internal state. Use this when you don't need external state control.",
        props: [
          {
            name: "initialChecked",
            type: "boolean",
            description: "Initial checked state when the component mounts.",
            defaultValue: "false",
          },
          {
            name: "defaultChecked",
            type: "boolean",
            description: "Alias for initialChecked.",
          },
          {
            name: "onToggle",
            type: "(checked: boolean) => void",
            description: "Callback fired when the toggle state changes.",
          },
          {
            name: "onChange",
            type: "(checked: boolean) => void",
            description: "Alias for onToggle callback.",
          },
          {
            name: "...rest",
            type: "Omit<ToggleSwitchProps, 'checked' | 'onChange'>",
            description: "All other ToggleSwitch props are supported (size, variant, label, etc.).",
          },
        ],
      },
    ],
    types: [
      {
        name: "ToggleSwitchSize",
        definition: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
        description: "Available size options for the toggle switch.",
      },
      {
        name: "ToggleSwitchVariant",
        definition: "'default' | 'outlined' | 'filled'",
        description: "Visual style variants for the switch.",
      },
      {
        name: "ToggleSwitchLabelPlacement",
        definition: "'top' | 'bottom' | 'left' | 'right'",
        description: "Label positioning options relative to the switch.",
      },
    ],
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
];

// Filter docs to only include specified components
const filteredComponentIds = [
  "button",
  "checkbox",
  "chip",
  "dialog",
  "input",
  "radio-group",
  "slider",
  "snackbar",
  "toggle-button",
  "toggle-switch"
];

const filteredDocs = docs.filter(doc => filteredComponentIds.includes(doc.id))
  .sort((a, b) => a.title.localeCompare(b.title));

export const componentDocs: ComponentDoc[] = filteredDocs.map((doc) => ({
  ...doc,
  keywords: doc.keywords ?? [doc.title.toLowerCase()],
  props: doc.props ?? [],
}));

function AccordionPreview() {
  const [expanded, setExpanded] = useState<string | null>("overview");
  const items = [
    { id: "overview", title: "Overview", content: <p>High-level summary</p> },
    { id: "details", title: "Details", content: <p>Extended description</p> },
    { id: "handoff", title: "Handoff", content: <p>Share files and notes</p> },
  ];
  return <Accordion items={items} expanded={expanded} onChange={setExpanded} />;
}



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

function DatePickerPreview() {
  const [single, setSingle] = useState<Date | null>(new Date());
  const [range, setRange] = useState<[Date, Date] | null>(null);

  return (
    <div className="docs-date-picker-preview">
      <div className="docs-date-picker-preview__panel">
        <span className="docs-date-picker-preview__label">Single date</span>
        <DatePicker
          value={single}
          onChange={(next: Date | [Date, Date] | null) =>
            setSingle(Array.isArray(next) ? next[0] ?? null : next)
          }
          placeholder="Select a date"
        />
      </div>
      <div className="docs-date-picker-preview__panel">
        <span className="docs-date-picker-preview__label">Date range</span>
        <DatePicker
          mode="range"
          value={range}
          onChange={(next: Date | [Date, Date] | null) => {
            if (Array.isArray(next)) {
              setRange(next as [Date, Date]);
            } else if (next instanceof Date) {
              setRange([next, next]);
            } else {
              setRange(null);
            }
          }}
          placeholder="Select a date range"
          disablePastDates
        />
      </div>
    </div>
  );
}





function DropdownPreview() {
  const [value, setValue] = useState<string | number | null>("eng");
  const options = [
    { id: "eng", label: "Engineering" },
    { id: "design", label: "Design" },
    { id: "ops", label: "Operations" },
  ];
  return <Dropdown data={options} value={value} onChange={setValue} label="Team" placeholder="Select team" />;
}

function FileUploadPreview() {
  return (
    <FileUpload
      label="Assets"
      accept={["image/png", "image/jpeg"]}
      placeholder="Click or drag files"
      onChange={() => undefined}
    />
  );
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

function RatingPreview() {
  const [value, setValue] = useState<number | null>(3.5);
  return <RatingStar value={value} onChange={(_, next) => setValue(next)} allowHalf showValue />;
}

function SkeletonPreview() {
  return (
    <div style={{ display: "grid", gap: "0.75rem", maxWidth: 280 }}>
      <Skeleton width="60%" />
      <Skeleton variant="rect" height={80} />
      <Skeleton variant="circle" width={48} height={48} />
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
