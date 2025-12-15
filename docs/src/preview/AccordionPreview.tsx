import { useState } from "react";
import { Accordion } from "../../../src/components/accordion";
import { Button } from "../../../src/components/button";
import { BeeSnackbar as Snackbar } from "../../../src/components/snackbar/BeeSnackbar";
import { 
  MinusIcon, 
  PlusIcon, 
  ChevronDownIcon, 
  ChevronRightIcon,
  CheckCircleIcon,
  InfoIcon,
} from "../../../src/utils/icons";
import { PreviewCard } from "../components/PreviewCard";

// Shorter sample data for better preview fit
const shortItems = [
  {
    value: "item-1",
    label: "What is AndheraUI?",
    children: <p>A React component library for modern, accessible UIs.</p>,
  },
  {
    value: "item-2",
    label: "How do I install it?",
    children: <p>Run <code className="bg-gray-700 px-1 rounded">npm install andhera-react</code></p>,
  },
];

const threeItems = [
  {
    value: "item-1",
    label: "Section One",
    children: <p>Content for section one.</p>,
  },
  {
    value: "item-2",
    label: "Section Two",
    children: <p>Content for section two.</p>,
  },
  {
    value: "item-3",
    label: "Section Three",
    children: <p>Content for section three.</p>,
  },
];

const itemsWithSubtitles = [
  {
    value: "pricing",
    label: "Pricing Plans",
    subtitle: "Choose the right plan for you",
    children: <p><strong>Free:</strong> $0 | <strong>Pro:</strong> $19/mo</p>,
  },
  {
    value: "features",
    label: "Features",
    subtitle: "What's included",
    children: <p>TypeScript, Accessibility, Theming</p>,
  },
];

const disabledItems = [
  {
    value: "active-1",
    label: "Active Section",
    children: <p>This section is active.</p>,
  },
  {
    value: "disabled-1",
    label: "Disabled Section",
    disabled: true,
    children: <p>This is disabled.</p>,
  },
];

const customStyledItems = [
  {
    value: "custom-1",
    label: "Purple Styled",
    itemClassName: "border-l-4 border-l-purple-500",
    children: <p>Custom per-item styling with purple accent.</p>,
  },
  {
    value: "custom-2",
    label: "Green Styled",
    itemClassName: "border-l-4 border-l-green-500",
    children: <p>Different styling per item with green accent.</p>,
  },
];

interface PropDefinition {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
}

const propDefinitions: PropDefinition[] = [
  { name: "items", type: "AccordionItem[]", defaultValue: "-", description: "Array of accordion items with value, label, children, and optional styling props." },
  { name: "value", type: "string | string[] | null", defaultValue: "-", description: "Controlled expanded value. Use string for single mode or string[] for multiple mode." },
  { name: "defaultValue", type: "string | string[] | null", defaultValue: "-", description: "Initial expanded value for uncontrolled usage." },
  { name: "onChange", type: "(value: string | string[] | null) => void", defaultValue: "-", description: "Callback fired when the expanded value changes." },
  { name: "multiple", type: "boolean", defaultValue: "false", description: "Allow multiple items to be expanded at once." },
  { name: "expandAll", type: "boolean", defaultValue: "false", description: "Expand all items initially (requires multiple to be true)." },
  { name: "collapsible", type: "boolean", defaultValue: "true", description: "When false, prevents collapsing the last open item in single mode." },
  { name: "disabled", type: "boolean", defaultValue: "false", description: "Disable all interaction for the accordion." },
  { name: "variant", type: "'default' | 'filled' | 'outlined' | 'ghost' | 'separated' | 'flush'", defaultValue: "'default'", description: "Visual style variant for the accordion." },
  { name: "size", type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", defaultValue: "'md'", description: "Adjusts header padding and font size." },
  { name: "radius", type: "'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'", defaultValue: "'lg'", description: "Border radius of accordion items." },
  { name: "gap", type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'", defaultValue: "'md'", description: "Spacing between accordion items." },
  { name: "dividers", type: "boolean", defaultValue: "false", description: "Show dividers between accordion items." },
  { name: "fullWidth", type: "boolean", defaultValue: "false", description: "Make the accordion take the full width of its container." },
  { name: "className", type: "string", defaultValue: "-", description: "CSS class applied to the outer accordion container." },
  { name: "style", type: "React.CSSProperties", defaultValue: "-", description: "Inline styles applied to the accordion container." },
  { name: "itemClassName", type: "string", defaultValue: "-", description: "CSS class applied to each accordion item." },
  { name: "headerClassName", type: "string", defaultValue: "-", description: "CSS class applied to each header element." },
  { name: "contentClassName", type: "string", defaultValue: "-", description: "CSS class applied to the content region of each item." },
  { name: "bgColor", type: "string", defaultValue: "-", description: "Custom background color for accordion items." },
  { name: "expandedBgColor", type: "string", defaultValue: "-", description: "Custom background color when item is expanded." },
  { name: "headerBgColor", type: "string", defaultValue: "-", description: "Custom background color for the header (collapsed state)." },
  { name: "headerExpandedBgColor", type: "string", defaultValue: "-", description: "Custom background color for the header (expanded state)." },
  { name: "headerHoverBgColor", type: "string", defaultValue: "-", description: "Custom background color on header hover." },
  { name: "textColor", type: "string", defaultValue: "-", description: "Custom text color for headers." },
  { name: "expandedTextColor", type: "string", defaultValue: "-", description: "Custom text color when item is expanded." },
  { name: "borderColor", type: "string", defaultValue: "-", description: "Custom border color for items." },
  { name: "expandedBorderColor", type: "string", defaultValue: "-", description: "Custom border color when item is expanded." },
  { name: "accentColor", type: "string", defaultValue: "'#FFCB00'", description: "Accent/highlight color for expanded states." },
  { name: "contentBgColor", type: "string", defaultValue: "-", description: "Custom background color for content area." },
  { name: "contentTextColor", type: "string", defaultValue: "-", description: "Custom text color for content area." },
  { name: "headerAlign", type: "'left' | 'center' | 'right'", defaultValue: "'left'", description: "Alignment of header text." },
  { name: "contentAlign", type: "'left' | 'center' | 'right'", defaultValue: "'left'", description: "Alignment of content text." },
  { name: "contentPadding", type: "string", defaultValue: "-", description: "Custom padding for content area (Tailwind classes)." },
  { name: "icon", type: "ReactNode", defaultValue: "-", description: "Custom icon for both expand and collapse states (used with rotation)." },
  { name: "expandIcon", type: "ReactNode", defaultValue: "-", description: "Icon shown when an item is collapsed (expand affordance)." },
  { name: "collapseIcon", type: "ReactNode", defaultValue: "-", description: "Icon shown when an item is expanded (collapse affordance)." },
  { name: "iconPosition", type: "'left' | 'right'", defaultValue: "'right'", description: "Position of the icon in the header." },
  { name: "hideIcon", type: "boolean", defaultValue: "false", description: "Hide the expand/collapse icon entirely." },
  { name: "rotateIcon", type: "boolean", defaultValue: "true", description: "Animate icon rotation on expand/collapse." },
  { name: "iconRotation", type: "number", defaultValue: "180", description: "Custom rotation degree for the icon when expanded." },
  { name: "transitionDuration", type: "number", defaultValue: "300", description: "Duration (ms) for expand/collapse animations." },
  { name: "transitionEasing", type: "string", defaultValue: "'ease-in-out'", description: "CSS easing function for the expand/collapse transition." },
  { name: "animate", type: "boolean", defaultValue: "true", description: "Enable/disable animations." },
  { name: "ariaLabel", type: "string", defaultValue: "-", description: "ARIA label for the accordion container." },
  { name: "ariaLabelledBy", type: "string", defaultValue: "-", description: "ID of the element that labels the accordion container." },
  { name: "onExpand", type: "(value: string) => void", defaultValue: "-", description: "Callback fired when an item expands." },
  { name: "onCollapse", type: "(value: string) => void", defaultValue: "-", description: "Callback fired when an item collapses." },
  { name: "keepMounted", type: "boolean", defaultValue: "false", description: "Keep content mounted in the DOM when collapsed." },
  { name: "unmountOnExit", type: "boolean", defaultValue: "false", description: "Unmount content from DOM when collapsed." },
];

function PropsReference() {
  return (
    <div className="w-full bg-white/[0.04] border border-[#364153] rounded-2xl p-6 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="font-manrope text-xl font-semibold m-0 text-white">
          Accordion Props
        </h3>
        <p className="m-0 text-[#AEB6C4] text-sm leading-relaxed">
          Accordion is a flexible component for organizing content into expandable sections.
          It supports single or multiple expansion, custom styling, animations, and full accessibility.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[640px] font-manrope text-sm text-[#E3E6F2]">
          <thead>
            <tr>
              {[
                { label: "Prop", width: "18%" },
                { label: "Type", width: "24%" },
                { label: "Default", width: "12%" },
                { label: "Description", width: "46%" },
              ].map((header) => (
                <th
                  key={header.label}
                  className="text-left p-3 text-xs tracking-wider uppercase text-[#99A1AF] border-b border-[#364153]"
                  style={{ width: header.width }}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {propDefinitions.map((prop) => (
              <tr key={prop.name}>
                <td className="p-3 border-b border-[#2B3546] font-medium text-white">
                  {prop.name}
                </td>
                <td className="p-3 border-b border-[#2B3546]">
                  <code className="text-xs bg-gray-800/50 px-2 py-1 rounded">{prop.type}</code>
                </td>
                <td className="p-3 border-b border-[#2B3546] text-[#C7CBD7]">
                  {prop.defaultValue}
                </td>
                <td className="p-3 border-b border-[#2B3546] text-[#C7CBD7] leading-relaxed">
                  {prop.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * AccordionPreview Component
 * Comprehensive demonstration of all Accordion features
 */
export function AccordionPreview() {
  const [controlledValue, setControlledValue] = useState<string | null>("item-1");
  const [multiControlledValue, setMultiControlledValue] = useState<string[]>(["item-1"]);
  const [eventLog, setEventLog] = useState<string[]>([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const logEvent = (action: string, value: string) => {
    const message = `${action}: ${value}`;
    setEventLog(prev => [...prev.slice(-2), message]);
    setSnackbarMessage(message);
    setShowSnackbar(true);
  };

  return (
    <div className="flex flex-col gap-8 w-full md:gap-12">
      {/* Snackbar for event notifications */}
      <Snackbar
        open={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        message={snackbarMessage}
        type="info"
        duration={2000}
        position="bottom-right"
      />

      {/* 1. Basic Accordion */}
      <PreviewCard
        title="Basic Accordion"
        description="A simple accordion with default single-item expansion. Only one item can be open at a time."
        code={`import { Accordion } from "andhera-react";

const items = [
  {
    value: "item-1",
    label: "What is AndheraUI?",
    children: <p>A React component library for modern, accessible UIs.</p>,
  },
  {
    value: "item-2",
    label: "How do I install it?",
    children: <p>Run <code>npm install andhera-react</code></p>,
  },
];

<Accordion
  items={items}
  defaultValue="item-1"
/>`}
      >
        <div className="w-full max-w-lg pt-12">
          <Accordion
            items={shortItems}
            defaultValue="item-1"
            onChange={(value: string | string[] | null) => console.log('Expanded:', value)}
          />
        </div>
      </PreviewCard>

      {/* 2. Variants */}
      <PreviewCard
        title="Accordion Variants"
        description="Different visual styles: default, filled, outlined, ghost, separated, and flush."
        code={`import { Accordion } from "andhera-react";

const items = [
  {
    value: "item-1",
    label: "What is AndheraUI?",
    children: <p>A React component library for modern, accessible UIs.</p>,
  },
];

// Default variant
<Accordion items={items} variant="default" size="sm" />

// Filled variant
<Accordion items={items} variant="filled" size="sm" />

// Outlined variant
<Accordion items={items} variant="outlined" size="sm" />

// Ghost variant
<Accordion items={items} variant="ghost" size="sm" />

// Separated variant
<Accordion items={items} variant="separated" size="sm" />

// Flush variant
<Accordion items={items} variant="flush" size="sm" />`}
      >
        <div className="w-full pt-12 overflow-y-auto max-h-[320px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-2">
            <div>
              <p className="text-xs text-gray-400 mb-1 font-medium">Default</p>
              <Accordion items={shortItems.slice(0, 1)} variant="default" size="sm" />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1 font-medium">Filled</p>
              <Accordion items={shortItems.slice(0, 1)} variant="filled" size="sm" />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1 font-medium">Outlined</p>
              <Accordion items={shortItems.slice(0, 1)} variant="outlined" size="sm" />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1 font-medium">Ghost</p>
              <Accordion items={shortItems.slice(0, 1)} variant="ghost" size="sm" />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1 font-medium">Separated</p>
              <Accordion items={shortItems.slice(0, 1)} variant="separated" size="sm" />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1 font-medium">Flush</p>
              <Accordion items={shortItems.slice(0, 1)} variant="flush" size="sm" />
            </div>
          </div>
        </div>
      </PreviewCard>

      {/* 3. Sizes */}
      <PreviewCard
        title="Accordion Sizes"
        description="Adjust padding and font size with the size prop: xs, sm, md, lg, xl."
        code={`import { Accordion } from "andhera-react";

const items = [
  { value: "demo", label: "XS Size", children: <p>Content</p> },
];

<Accordion items={items} size="xs" />
<Accordion items={items} size="sm" />
<Accordion items={items} size="md" />  {/* default */}
<Accordion items={items} size="lg" />
<Accordion items={items} size="xl" />`}
      >
        <div className="w-full pt-12 overflow-y-auto max-h-[320px]">
          <div className="space-y-3 max-w-md mx-auto px-2">
            {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
              <div key={s}>
                <p className="text-xs text-gray-400 mb-1">Size: {s}</p>
                <Accordion 
                  items={[{ value: "demo", label: `${s.toUpperCase()} Size`, children: <p>Content</p> }]} 
                  size={s} 
                />
              </div>
            ))}
          </div>
        </div>
      </PreviewCard>

      {/* 4. Border Radius */}
      <PreviewCard
        title="Border Radius Options"
        description="Customize corner rounding with radius prop: none, sm, md, lg, xl, full."
        code={`import { Accordion } from "andhera-react";

const items = [
  { value: "demo", label: "none", children: <p>Content</p> },
];

<Accordion items={items} radius="none" size="sm" />
<Accordion items={items} radius="sm" size="sm" />
<Accordion items={items} radius="md" size="sm" />
<Accordion items={items} radius="lg" size="sm" />  {/* default */}
<Accordion items={items} radius="xl" size="sm" />
<Accordion items={items} radius="full" size="sm" />`}
      >
        <div className="w-full pt-12 overflow-y-auto max-h-[320px]">
          <div className="grid grid-cols-2 gap-3 px-2">
            {(['none', 'sm', 'md', 'lg', 'xl', 'full'] as const).map((rad) => (
              <div key={rad}>
                <p className="text-xs text-gray-400 mb-1 capitalize">Radius: {rad}</p>
                <Accordion 
                  items={[{ value: "demo", label: `${rad}`, children: <p>Content</p> }]} 
                  radius={rad}
                  size="sm"
                />
              </div>
            ))}
          </div>
        </div>
      </PreviewCard>

      {/* 5. Multiple Selection */}
      <PreviewCard
        title="Multiple Expanded Items"
        description="Allow multiple accordion items to be open simultaneously using the multiple prop."
        code={`import { Accordion } from "andhera-react";

const items = [
  { value: "item-1", label: "Section One", children: <p>Content for section one.</p> },
  { value: "item-2", label: "Section Two", children: <p>Content for section two.</p> },
  { value: "item-3", label: "Section Three", children: <p>Content for section three.</p> },
];

<Accordion
  items={items}
  multiple
  defaultValue={["item-1", "item-3"]}
  size="sm"
/>`}
      >
        <div className="w-full max-w-lg pt-12">
          <Accordion
            items={threeItems}
            multiple
            defaultValue={["item-1", "item-3"]}
            size="sm"
          />
        </div>
      </PreviewCard>

      {/* 6. Expand All */}
      <PreviewCard
        title="Expand All Initially"
        description="Use expandAll with multiple mode to have all items expanded on initial render."
        code={`import { Accordion } from "andhera-react";

const items = [
  { value: "item-1", label: "What is AndheraUI?", children: <p>A React component library.</p> },
  { value: "item-2", label: "How do I install it?", children: <p>Run npm install andhera-react</p> },
];

<Accordion
  items={items}
  multiple
  expandAll
  size="sm"
/>`}
      >
        <div className="w-full max-w-lg pt-12 overflow-y-auto max-h-[320px]">
          <Accordion
            items={shortItems}
            multiple
            expandAll
            size="sm"
          />
        </div>
      </PreviewCard>

      {/* 7. Collapsible Control */}
      <PreviewCard
        title="Collapsible Behavior"
        description="Set collapsible={false} to always keep one item open."
        code={`import { Accordion } from "andhera-react";

const items = [
  { value: "item-1", label: "What is AndheraUI?", children: <p>A React component library.</p> },
  { value: "item-2", label: "How do I install it?", children: <p>Run npm install andhera-react</p> },
];

// Can close all items (default behavior)
<Accordion items={items} defaultValue="item-1" collapsible={true} size="sm" />

// Must keep at least one item open
<Accordion items={items} defaultValue="item-1" collapsible={false} size="sm" />`}
      >
        <div className="w-full pt-12 overflow-y-auto max-h-[320px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-2">
            <div>
              <p className="text-xs text-gray-400 mb-1">Collapsible (default)</p>
              <Accordion items={shortItems} defaultValue="item-1" collapsible={true} size="sm" />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Non-collapsible</p>
              <Accordion items={shortItems} defaultValue="item-1" collapsible={false} size="sm" />
            </div>
          </div>
        </div>
      </PreviewCard>

      {/* 8. Disabled State */}
      <PreviewCard
        title="Disabled Accordion"
        description="Disable the entire accordion or individual items."
        code={`import { Accordion } from "andhera-react";

// Disable entire accordion
const items = [
  { value: "item-1", label: "What is AndheraUI?", children: <p>A React component library.</p> },
  { value: "item-2", label: "How do I install it?", children: <p>Run npm install andhera-react</p> },
];

<Accordion items={items} disabled size="sm" />

// Disable specific items
const itemsWithDisabled = [
  { value: "active-1", label: "Active Section", children: <p>This section is active.</p> },
  { value: "disabled-1", label: "Disabled Section", disabled: true, children: <p>This is disabled.</p> },
];

<Accordion items={itemsWithDisabled} defaultValue="active-1" size="sm" />`}
      >
        <div className="w-full pt-12 overflow-y-auto max-h-[320px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-2">
            <div>
              <p className="text-xs text-gray-400 mb-1">All disabled</p>
              <Accordion items={shortItems} disabled size="sm" />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Item disabled</p>
              <Accordion items={disabledItems} defaultValue="active-1" size="sm" />
            </div>
          </div>
        </div>
      </PreviewCard>

      {/* 9. Custom Icons */}
      <PreviewCard
        title="Custom Icons"
        description="Use custom expand/collapse icons including your own SVGs, control position, or hide icons entirely."
        code={`import { Accordion } from "andhera-react";
import { PlusIcon, MinusIcon } from "andhera-react/icons";

const items = [
  { value: "item-1", label: "What is AndheraUI?", children: <p>A React component library.</p> },
];

// Plus/Minus icons
<Accordion 
  items={items} 
  expandIcon={<PlusIcon className="w-4 h-4 text-green-400" />}
  collapseIcon={<MinusIcon className="w-4 h-4 text-red-400" />}
  rotateIcon={false}
  size="sm"
/>

// Custom SVG - Arrow icons
<Accordion 
  items={items} 
  expandIcon={
    <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  }
  collapseIcon={
    <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>
  }
  rotateIcon={false}
  size="sm"
/>

// Custom SVG - Circle with plus/minus
<Accordion 
  items={items} 
  expandIcon={
    <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  }
  collapseIcon={
    <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  }
  rotateIcon={false}
  size="sm"
/>

// Custom SVG - Filled caret
<Accordion 
  items={items} 
  expandIcon={
    <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 10l5 5 5-5H7z"/>
    </svg>
  }
  collapseIcon={
    <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 14l5-5 5 5H7z"/>
    </svg>
  }
  rotateIcon={false}
  size="sm"
/>

// Icon on left side
<Accordion items={items} iconPosition="left" size="sm" />

// Hidden icon
<Accordion items={items} hideIcon size="sm" />`}
      >
        <div className="w-full pt-12 overflow-y-auto max-h-[400px]">
          <div className="space-y-3 max-w-md mx-auto px-2">
            <div>
              <p className="text-xs text-gray-400 mb-1">Plus/Minus icons</p>
              <Accordion 
                items={shortItems.slice(0, 1)} 
                expandIcon={<PlusIcon className="w-4 h-4 text-green-400" />}
                collapseIcon={<MinusIcon className="w-4 h-4 text-red-400" />}
                rotateIcon={false}
                size="sm"
              />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Custom SVG - Arrow icons</p>
              <Accordion 
                items={shortItems.slice(0, 1)} 
                expandIcon={
                  <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                }
                collapseIcon={
                  <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                }
                rotateIcon={false}
                size="sm"
              />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Custom SVG - Circle icons</p>
              <Accordion 
                items={shortItems.slice(0, 1)} 
                expandIcon={
                  <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                }
                collapseIcon={
                  <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                }
                rotateIcon={false}
                size="sm"
              />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Custom SVG - Caret filled</p>
              <Accordion 
                items={shortItems.slice(0, 1)} 
                expandIcon={
                  <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 10l5 5 5-5H7z"/>
                  </svg>
                }
                collapseIcon={
                  <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 14l5-5 5 5H7z"/>
                  </svg>
                }
                rotateIcon={false}
                size="sm"
              />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Icon on left</p>
              <Accordion 
                items={shortItems.slice(0, 1)} 
                iconPosition="left"
                size="sm"
              />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Hidden icon</p>
              <Accordion 
                items={shortItems.slice(0, 1)} 
                hideIcon
                size="sm"
              />
            </div>
          </div>
        </div>
      </PreviewCard>

      {/* 10. Item Subtitles */}
      <PreviewCard
        title="Items with Subtitles"
        description="Add subtitle text to accordion items for additional context."
        code={`import { Accordion } from "andhera-react";

const items = [
  {
    value: "pricing",
    label: "Pricing Plans",
    subtitle: "Choose the right plan for you",
    children: <p><strong>Free:</strong> $0 | <strong>Pro:</strong> $19/mo</p>,
  },
  {
    value: "features",
    label: "Features",
    subtitle: "What's included",
    children: <p>TypeScript, Accessibility, Theming</p>,
  },
];

<Accordion items={items} defaultValue="pricing" size="sm" />`}
      >
        <div className="w-full max-w-lg pt-12">
          <Accordion items={itemsWithSubtitles} defaultValue="pricing" size="sm" />
        </div>
      </PreviewCard>

      {/* 11. Custom Colors */}
      <PreviewCard
        title="Custom Color Theming"
        description="Fully customize colors for background, text, borders, and accents."
        code={`import { Accordion } from "andhera-react";

const items = [
  { value: "item-1", label: "What is AndheraUI?", children: <p>A React component library.</p> },
];

// Blue Theme
<Accordion 
  items={items}
  defaultValue="item-1"
  bgColor="#1e3a5f"
  textColor="#e0e7ff"
  expandedTextColor="#60a5fa"
  borderColor="#3b82f6"
  accentColor="#3b82f6"
  size="sm"
/>

// Purple Theme
<Accordion 
  items={items}
  defaultValue="item-1"
  bgColor="#2d1b4e"
  textColor="#e9d5ff"
  expandedTextColor="#c084fc"
  borderColor="#7c3aed"
  accentColor="#a855f7"
  size="sm"
/>

// Green Theme
<Accordion 
  items={items}
  defaultValue="item-1"
  bgColor="#14332a"
  textColor="#bbf7d0"
  expandedTextColor="#4ade80"
  borderColor="#22c55e"
  accentColor="#22c55e"
  size="sm"
/>`}
      >
        <div className="w-full pt-12 overflow-y-auto max-h-[320px]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 px-2">
            <div>
              <p className="text-xs text-gray-400 mb-1">Blue Theme</p>
              <Accordion 
                items={shortItems.slice(0, 1)} 
                defaultValue="item-1"
                bgColor="#1e3a5f"
                textColor="#e0e7ff"
                expandedTextColor="#60a5fa"
                borderColor="#3b82f6"
                accentColor="#3b82f6"
                size="sm"
              />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Purple Theme</p>
              <Accordion 
                items={shortItems.slice(0, 1)} 
                defaultValue="item-1"
                bgColor="#2d1b4e"
                textColor="#e9d5ff"
                expandedTextColor="#c084fc"
                borderColor="#7c3aed"
                accentColor="#a855f7"
                size="sm"
              />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Green Theme</p>
              <Accordion 
                items={shortItems.slice(0, 1)} 
                defaultValue="item-1"
                bgColor="#14332a"
                textColor="#bbf7d0"
                expandedTextColor="#4ade80"
                borderColor="#22c55e"
                accentColor="#22c55e"
                size="sm"
              />
            </div>
          </div>
        </div>
      </PreviewCard>

      {/* 12. Header & Content Background Colors */}
      <PreviewCard
        title="Header & Content Background Colors"
        description="Customize header background (collapsed & expanded states) and content area backgrounds separately."
        code={`import { Accordion } from "andhera-react";

// Global header & content colors
<Accordion 
  items={[
    { value: "demo1", label: "Click to see expanded header color", children: <p>Notice the header color changes when expanded, and the content has a different background.</p> },
    { value: "demo2", label: "Second item with same styling", children: <p>All items share the global header and content background settings.</p> },
  ]} 
  headerBgColor="#1e3a5f"
  headerExpandedBgColor="#2563eb"
  contentBgColor="#0f172a"
  textColor="#e0e7ff"
  expandedTextColor="#ffffff"
  size="sm"
/>

// Per-item custom backgrounds
<Accordion 
  items={[
    { 
      value: "purple", 
      label: "Purple Theme Item",
      headerBgColor: "#4c1d95",
      headerExpandedBgColor: "#7c3aed",
      contentBgColor: "#2e1065",
      children: <p className="text-purple-200">This item has purple header and content backgrounds.</p> 
    },
    { 
      value: "teal", 
      label: "Teal Theme Item",
      headerBgColor: "#134e4a",
      headerExpandedBgColor: "#0d9488",
      contentBgColor: "#042f2e",
      children: <p className="text-teal-200">This item has teal header and content backgrounds.</p> 
    },
    { 
      value: "rose", 
      label: "Rose Theme Item",
      headerBgColor: "#881337",
      headerExpandedBgColor: "#e11d48",
      contentBgColor: "#4c0519",
      children: <p className="text-rose-200">This item has rose header and content backgrounds.</p> 
    },
  ]} 
  multiple
  defaultValue={["purple"]}
  textColor="#ffffff"
  size="sm"
/>`}
      >
        <div className="w-full pt-12 overflow-y-auto max-h-[380px]">
          <div className="space-y-4 max-w-lg mx-auto px-2">
            <div>
              <p className="text-xs text-gray-400 mb-1">Global header & content colors</p>
              <Accordion 
                items={[
                  { value: "demo1", label: "Click to see expanded header color", children: <p>Notice the header color changes when expanded, and the content has a different background.</p> },
                  { value: "demo2", label: "Second item with same styling", children: <p>All items share the global header and content background settings.</p> },
                ]} 
                headerBgColor="#1e3a5f"
                headerExpandedBgColor="#2563eb"
                contentBgColor="#0f172a"
                textColor="#e0e7ff"
                expandedTextColor="#ffffff"
                size="sm"
              />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Per-item custom backgrounds</p>
              <Accordion 
                items={[
                  { 
                    value: "purple", 
                    label: "Purple Theme Item",
                    headerBgColor: "#4c1d95",
                    headerExpandedBgColor: "#7c3aed",
                    contentBgColor: "#2e1065",
                    children: <p className="text-purple-200">This item has purple header and content backgrounds.</p> 
                  },
                  { 
                    value: "teal", 
                    label: "Teal Theme Item",
                    headerBgColor: "#134e4a",
                    headerExpandedBgColor: "#0d9488",
                    contentBgColor: "#042f2e",
                    children: <p className="text-teal-200">This item has teal header and content backgrounds.</p> 
                  },
                  { 
                    value: "rose", 
                    label: "Rose Theme Item",
                    headerBgColor: "#881337",
                    headerExpandedBgColor: "#e11d48",
                    contentBgColor: "#4c0519",
                    children: <p className="text-rose-200">This item has rose header and content backgrounds.</p> 
                  },
                ]} 
                multiple
                defaultValue={["purple"]}
                textColor="#ffffff"
                size="sm"
              />
            </div>
          </div>
        </div>
      </PreviewCard>

      {/* 13. Nested/Sub Accordions */}
      <PreviewCard
        title="Nested Accordions"
        description="Accordions can be nested inside other accordions. The children prop accepts any ReactNode including other Accordion components."
        code={`import { Accordion } from "andhera-react";

<Accordion 
  items={[
    {
      value: "faq",
      label: "📚 Frequently Asked Questions",
      children: (
        <Accordion
          items={[
            { value: "faq-1", label: "What is AndheraUI?", children: <p>AndheraUI is a modern React component library built with Tailwind CSS.</p> },
            { value: "faq-2", label: "Is it free to use?", children: <p>Yes! AndheraUI is open source and free to use in any project.</p> },
            { value: "faq-3", label: "Does it support TypeScript?", children: <p>Absolutely. Full TypeScript support with exported types.</p> },
          ]}
          variant="ghost"
          size="sm"
          gap="xs"
        />
      ),
    },
    {
      value: "categories",
      label: "🗂️ Product Categories",
      children: (
        <Accordion
          items={[
            { 
              value: "electronics", 
              label: "Electronics",
              children: (
                <Accordion
                  items={[
                    { value: "phones", label: "Phones", children: <p>Latest smartphones and accessories.</p> },
                    { value: "laptops", label: "Laptops", children: <p>Notebooks, gaming laptops, workstations.</p> },
                  ]}
                  variant="flush"
                  size="xs"
                />
              ),
            },
            { 
              value: "clothing", 
              label: "Clothing",
              children: (
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Men's wear</li>
                  <li>Women's wear</li>
                  <li>Kids' collection</li>
                </ul>
              ),
            },
          ]}
          variant="outlined"
          size="sm"
        />
      ),
    },
    {
      value: "settings",
      label: "⚙️ Application Settings",
      children: (
        <Accordion
          items={[
            { value: "appearance", label: "Appearance", subtitle: "Theme and display", children: <p>Dark mode, font size, accent color preferences.</p> },
            { value: "notifications", label: "Notifications", subtitle: "Alerts and sounds", children: <p>Email, push, and in-app notification settings.</p> },
            { value: "privacy", label: "Privacy", subtitle: "Data and security", children: <p>Data sharing, cookies, and account privacy settings.</p> },
          ]}
          variant="separated"
          size="sm"
          gap="sm"
        />
      ),
    },
  ]} 
  defaultValue="faq"
  size="md"
/>`}
      >
        <div className="w-full pt-12 overflow-y-auto max-h-[400px]">
          <div className="max-w-lg mx-auto px-2">
            <Accordion 
              items={[
                {
                  value: "faq",
                  label: "📚 Frequently Asked Questions",
                  children: (
                    <Accordion
                      items={[
                        { value: "faq-1", label: "What is AndheraUI?", children: <p>AndheraUI is a modern React component library built with Tailwind CSS.</p> },
                        { value: "faq-2", label: "Is it free to use?", children: <p>Yes! AndheraUI is open source and free to use in any project.</p> },
                        { value: "faq-3", label: "Does it support TypeScript?", children: <p>Absolutely. Full TypeScript support with exported types.</p> },
                      ]}
                      variant="ghost"
                      size="sm"
                      gap="xs"
                    />
                  ),
                },
                {
                  value: "categories",
                  label: "🗂️ Product Categories",
                  children: (
                    <Accordion
                      items={[
                        { 
                          value: "electronics", 
                          label: "Electronics",
                          children: (
                            <Accordion
                              items={[
                                { value: "phones", label: "Phones", children: <p>Latest smartphones and accessories.</p> },
                                { value: "laptops", label: "Laptops", children: <p>Notebooks, gaming laptops, workstations.</p> },
                              ]}
                              variant="flush"
                              size="xs"
                            />
                          ),
                        },
                        { 
                          value: "clothing", 
                          label: "Clothing",
                          children: (
                            <ul className="list-disc list-inside space-y-1 text-sm">
                              <li>Men's wear</li>
                              <li>Women's wear</li>
                              <li>Kids' collection</li>
                            </ul>
                          ),
                        },
                      ]}
                      variant="outlined"
                      size="sm"
                    />
                  ),
                },
                {
                  value: "settings",
                  label: "⚙️ Application Settings",
                  children: (
                    <Accordion
                      items={[
                        { value: "appearance", label: "Appearance", subtitle: "Theme and display", children: <p>Dark mode, font size, accent color preferences.</p> },
                        { value: "notifications", label: "Notifications", subtitle: "Alerts and sounds", children: <p>Email, push, and in-app notification settings.</p> },
                        { value: "privacy", label: "Privacy", subtitle: "Data and security", children: <p>Data sharing, cookies, and account privacy settings.</p> },
                      ]}
                      variant="separated"
                      size="sm"
                      gap="sm"
                    />
                  ),
                },
              ]} 
              defaultValue="faq"
              size="md"
            />
          </div>
        </div>
      </PreviewCard>

      {/* 14. Gap/Spacing Control */}
      <PreviewCard
        title="Item Spacing"
        description="Control the gap between accordion items using the gap prop."
        code={`import { Accordion } from "andhera-react";

const items = [
  { value: "item-1", label: "Item One", children: <p>Content for item 1</p> },
  { value: "item-2", label: "Item Two", children: <p>Content for item 2</p> },
  { value: "item-3", label: "Item Three", children: <p>Content for item 3</p> },
];

<Accordion items={items} gap="none" size="xs" />
<Accordion items={items} gap="sm" size="xs" />
<Accordion items={items} gap="lg" size="xs" />`}
      >
        <div className="w-full pt-12 overflow-y-auto max-h-[320px]">
          <div className="grid grid-cols-3 gap-3 px-2">
            {(['none', 'sm', 'lg'] as const).map((g) => (
              <div key={g}>
                <p className="text-xs text-gray-400 mb-1">Gap: {g}</p>
                <Accordion 
                  items={threeItems} 
                  gap={g}
                  size="xs"
                />
              </div>
            ))}
          </div>
        </div>
      </PreviewCard>

      {/* 15. Dividers */}
      <PreviewCard
        title="Dividers Between Items"
        description="Add dividers between items. Works best with flush variant."
        code={`import { Accordion } from "andhera-react";

const items = [
  { value: "item-1", label: "Item One", children: <p>Content for item 1</p> },
  { value: "item-2", label: "Item Two", children: <p>Content for item 2</p> },
  { value: "item-3", label: "Item Three", children: <p>Content for item 3</p> },
];

<Accordion
  items={items}
  variant="flush"
  dividers
  gap="none"
  defaultValue="item-1"
  size="sm"
/>`}
      >
        <div className="w-full max-w-lg pt-12">
          <Accordion
            items={threeItems}
            variant="flush"
            dividers
            gap="none"
            defaultValue="item-1"
            size="sm"
          />
        </div>
      </PreviewCard>

      {/* 16. Header Alignment */}
      <PreviewCard
        title="Header Alignment"
        description="Align header text to left, center, or right. Can be set globally or per-item."
        code={`import { Accordion } from "andhera-react";

// Global: Center aligned headers
<Accordion 
  items={[
    { value: "item-1", label: "Centered Header Title", children: <p>The header text above is centered.</p> },
    { value: "item-2", label: "Another Centered Header", children: <p>All headers share the global alignment.</p> },
  ]} 
  headerAlign="center"
  defaultValue="item-1"
  size="sm"
/>

// Per-item header alignment
<Accordion 
  items={[
    { value: "left", label: "← Left Aligned Header", headerAlign: "left", children: <p>Header aligned to the left (default).</p> },
    { value: "center", label: "↔ Center Aligned Header", headerAlign: "center", children: <p>Header aligned to the center.</p> },
    { value: "right", label: "Right Aligned Header →", headerAlign: "right", children: <p>Header aligned to the right.</p> },
  ]} 
  multiple
  expandAll
  size="sm"
/>

// Combined: Header center + Content right
<Accordion 
  items={[{ 
    value: "combined", 
    label: "Centered Header with Right Content", 
    headerAlign: "center",
    contentAlign: "right",
    children: <p>Header is centered, but content is right-aligned.</p> 
  }]} 
  defaultValue="combined"
  size="sm"
/>`}
      >
        <div className="w-full pt-12 overflow-y-auto max-h-[350px]">
          <div className="space-y-4 max-w-lg mx-auto px-2">
            <div>
              <p className="text-xs text-gray-400 mb-1">Global: Center aligned headers</p>
              <Accordion 
                items={[
                  { value: "item-1", label: "Centered Header Title", children: <p>The header text above is centered.</p> },
                  { value: "item-2", label: "Another Centered Header", children: <p>All headers share the global alignment.</p> },
                ]} 
                headerAlign="center"
                defaultValue="item-1"
                size="sm"
              />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Per-item header alignment</p>
              <Accordion 
                items={[
                  { value: "left", label: "← Left Aligned Header", headerAlign: "left", children: <p>Header aligned to the left (default).</p> },
                  { value: "center", label: "↔ Center Aligned Header", headerAlign: "center", children: <p>Header aligned to the center.</p> },
                  { value: "right", label: "Right Aligned Header →", headerAlign: "right", children: <p>Header aligned to the right.</p> },
                ]} 
                multiple
                expandAll
                size="sm"
              />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Combined: Header center + Content right</p>
              <Accordion 
                items={[{ 
                  value: "combined", 
                  label: "Centered Header with Right Content", 
                  headerAlign: "center",
                  contentAlign: "right",
                  children: <p>Header is centered, but content is right-aligned.</p> 
                }]} 
                defaultValue="combined"
                size="sm"
              />
            </div>
          </div>
        </div>
      </PreviewCard>

      {/* 17. Content Alignment */}
      <PreviewCard
        title="Content Alignment"
        description="Align content text to left, center, or right. Can be set globally or per-item."
        code={`import { Accordion } from "andhera-react";

// Global: Center aligned
<Accordion 
  items={[{ value: "center-demo", label: "Centered Content", children: <p>This content is centered using the global contentAlign prop.</p> }]} 
  contentAlign="center"
  defaultValue="center-demo"
  size="sm"
/>

// Per-item alignment
<Accordion 
  items={[
    { value: "left", label: "Left Aligned", contentAlign: "left", children: <p>Content aligned to the left (default).</p> },
    { value: "center", label: "Center Aligned", contentAlign: "center", children: <p>Content aligned to the center.</p> },
    { value: "right", label: "Right Aligned", contentAlign: "right", children: <p>Content aligned to the right.</p> },
  ]} 
  multiple
  expandAll
  size="sm"
/>`}
      >
        <div className="w-full pt-12 overflow-y-auto max-h-[320px]">
          <div className="space-y-4 max-w-lg mx-auto px-2">
            <div>
              <p className="text-xs text-gray-400 mb-1">Global: Center aligned</p>
              <Accordion 
                items={[{ value: "center-demo", label: "Centered Content", children: <p>This content is centered using the global contentAlign prop.</p> }]} 
                contentAlign="center"
                defaultValue="center-demo"
                size="sm"
              />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Per-item alignment</p>
              <Accordion 
                items={[
                  { value: "left", label: "Left Aligned", contentAlign: "left", children: <p>Content aligned to the left (default).</p> },
                  { value: "center", label: "Center Aligned", contentAlign: "center", children: <p>Content aligned to the center.</p> },
                  { value: "right", label: "Right Aligned", contentAlign: "right", children: <p>Content aligned to the right.</p> },
                ]} 
                multiple
                expandAll
                size="sm"
              />
            </div>
          </div>
        </div>
      </PreviewCard>

      {/* 18. Content Formats - Bullets, Descriptions, Mixed */}
      <PreviewCard
        title="Content Formats"
        description="Content supports any ReactNode - plain text, bullet lists, rich HTML, or mixed formats."
        code={`import { Accordion } from "andhera-react";

<Accordion 
  items={[
    {
      value: "description",
      label: "Description Text",
      children: (
        <p>
          This is a simple paragraph description. You can write as much text as needed 
          and it will flow naturally within the content area.
        </p>
      ),
    },
    {
      value: "bullets",
      label: "Bullet List",
      children: (
        <ul className="list-disc list-inside space-y-1">
          <li>First bullet point with important info</li>
          <li>Second bullet point explaining features</li>
          <li>Third bullet point with additional details</li>
          <li>Fourth bullet point summarizing benefits</li>
        </ul>
      ),
    },
    {
      value: "numbered",
      label: "Numbered List",
      children: (
        <ol className="list-decimal list-inside space-y-1">
          <li>Step one: Install the package</li>
          <li>Step two: Import the component</li>
          <li>Step three: Add to your JSX</li>
        </ol>
      ),
    },
    {
      value: "mixed",
      label: "Mixed Content",
      children: (
        <div className="space-y-3">
          <p className="font-medium">Overview:</p>
          <p>Here's some introductory text explaining the concept.</p>
          <p className="font-medium mt-2">Key Features:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Feature one with description</li>
            <li>Feature two with benefits</li>
          </ul>
          <div className="bg-gray-700/50 p-2 rounded text-sm mt-2">
            <code>npm install andhera-react</code>
          </div>
        </div>
      ),
    },
    {
      value: "centered-list",
      label: "Centered Bullet List",
      contentAlign: "center",
      children: (
        <ul className="inline-block text-left list-disc list-inside space-y-1">
          <li>Centered container</li>
          <li>Left-aligned bullets inside</li>
          <li>Best of both worlds</li>
        </ul>
      ),
    },
  ]} 
  multiple
  defaultValue={["description", "bullets"]}
  size="sm"
/>`}
      >
        <div className="w-full pt-12 overflow-y-auto max-h-[380px]">
          <div className="max-w-lg mx-auto px-2">
            <Accordion 
              items={[
                {
                  value: "description",
                  label: "Description Text",
                  children: (
                    <p>
                      This is a simple paragraph description. You can write as much text as needed 
                      and it will flow naturally within the content area.
                    </p>
                  ),
                },
                {
                  value: "bullets",
                  label: "Bullet List",
                  children: (
                    <ul className="list-disc list-inside space-y-1">
                      <li>First bullet point with important info</li>
                      <li>Second bullet point explaining features</li>
                      <li>Third bullet point with additional details</li>
                      <li>Fourth bullet point summarizing benefits</li>
                    </ul>
                  ),
                },
                {
                  value: "numbered",
                  label: "Numbered List",
                  children: (
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Step one: Install the package</li>
                      <li>Step two: Import the component</li>
                      <li>Step three: Add to your JSX</li>
                    </ol>
                  ),
                },
                {
                  value: "mixed",
                  label: "Mixed Content",
                  children: (
                    <div className="space-y-3">
                      <p className="font-medium">Overview:</p>
                      <p>Here's some introductory text explaining the concept.</p>
                      <p className="font-medium mt-2">Key Features:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Feature one with description</li>
                        <li>Feature two with benefits</li>
                      </ul>
                      <div className="bg-gray-700/50 p-2 rounded text-sm mt-2">
                        <code>npm install andhera-react</code>
                      </div>
                    </div>
                  ),
                },
                {
                  value: "centered-list",
                  label: "Centered Bullet List",
                  contentAlign: "center",
                  children: (
                    <ul className="inline-block text-left list-disc list-inside space-y-1">
                      <li>Centered container</li>
                      <li>Left-aligned bullets inside</li>
                      <li>Best of both worlds</li>
                    </ul>
                  ),
                },
              ]} 
              multiple
              defaultValue={["description", "bullets"]}
              size="sm"
            />
          </div>
        </div>
      </PreviewCard>

      {/* 19. Custom Content Padding */}
      <PreviewCard
        title="Custom Content Padding"
        description="Override default content padding globally or per-item using Tailwind classes."
        code={`import { Accordion } from "andhera-react";

<Accordion 
  items={[
    { 
      value: "compact", 
      label: "Compact Padding", 
      contentPadding: "px-3 py-2",
      children: <p>This item has minimal padding (px-3 py-2).</p> 
    },
    { 
      value: "default", 
      label: "Default Padding", 
      children: <p>This item uses the default size-based padding.</p> 
    },
    { 
      value: "spacious", 
      label: "Spacious Padding", 
      contentPadding: "px-8 py-6",
      children: <p>This item has generous padding (px-8 py-6) for a more open feel.</p> 
    },
  ]} 
  multiple
  expandAll
  size="sm"
/>`}
      >
        <div className="w-full pt-12 overflow-y-auto max-h-[320px]">
          <div className="max-w-lg mx-auto px-2">
            <Accordion 
              items={[
                { 
                  value: "compact", 
                  label: "Compact Padding", 
                  contentPadding: "px-3 py-2",
                  children: <p>This item has minimal padding (px-3 py-2).</p> 
                },
                { 
                  value: "default", 
                  label: "Default Padding", 
                  children: <p>This item uses the default size-based padding.</p> 
                },
                { 
                  value: "spacious", 
                  label: "Spacious Padding", 
                  contentPadding: "px-8 py-6",
                  children: <p>This item has generous padding (px-8 py-6) for a more open feel.</p> 
                },
              ]} 
              multiple
              expandAll
              size="sm"
            />
          </div>
        </div>
      </PreviewCard>

      {/* 20. Animation Customization */}
      <PreviewCard
        title="Animation Customization"
        description="Control animation duration, easing, or disable animations."
        code={`import { Accordion } from "andhera-react";

const items = [
  { value: "item-1", label: "What is AndheraUI?", children: <p>A React component library.</p> },
];

// Slow bounce animation (600ms)
<Accordion 
  items={items} 
  transitionDuration={600}
  transitionEasing="cubic-bezier(0.68, -0.55, 0.265, 1.55)"
  size="sm"
/>

// No animation
<Accordion 
  items={items} 
  animate={false}
  size="sm"
/>`}
      >
        <div className="w-full pt-12 overflow-y-auto max-h-[320px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-2">
            <div>
              <p className="text-xs text-gray-400 mb-1">Slow bounce (600ms)</p>
              <Accordion 
                items={shortItems.slice(0, 1)} 
                transitionDuration={600}
                transitionEasing="cubic-bezier(0.68, -0.55, 0.265, 1.55)"
                size="sm"
              />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">No animation</p>
              <Accordion 
                items={shortItems.slice(0, 1)} 
                animate={false}
                size="sm"
              />
            </div>
          </div>
        </div>
      </PreviewCard>

      {/* 21. Controlled Accordion */}
      <PreviewCard
        title="Controlled Accordion"
        description="Programmatically control which items are expanded."
        code={`import { useState } from "react";
import { Accordion, Button } from "andhera-react";

const items = [
  { value: "item-1", label: "Item One", children: <p>Content for item 1</p> },
  { value: "item-2", label: "Item Two", children: <p>Content for item 2</p> },
  { value: "item-3", label: "Item Three", children: <p>Content for item 3</p> },
];

const [expanded, setExpanded] = useState<string | null>("item-1");

<Accordion
  items={items}
  value={expanded}
  onChange={(v) => setExpanded(v as string | null)}
  size="sm"
/>

<Button size="xs" variant="secondary" onClick={() => setExpanded("item-1")}>Open 1</Button>
<Button size="xs" variant="secondary" onClick={() => setExpanded("item-2")}>Open 2</Button>
<Button size="xs" variant="secondary" onClick={() => setExpanded("item-3")}>Open 3</Button>
<Button size="xs" variant="ghost" onClick={() => setExpanded(null)}>Close All</Button>`}
      >
        <div className="w-full pt-12 overflow-y-auto max-h-[320px]">
          <div className="space-y-4 max-w-lg mx-auto px-2">
            <Accordion
              items={threeItems}
              value={controlledValue}
              onChange={(v: string | string[] | null) => setControlledValue(v as string | null)}
              size="sm"
            />
            <div className="flex flex-wrap gap-2">
              <Button size="xs" variant="secondary" onClick={() => setControlledValue("item-1")}>
                Open 1
              </Button>
              <Button size="xs" variant="secondary" onClick={() => setControlledValue("item-2")}>
                Open 2
              </Button>
              <Button size="xs" variant="secondary" onClick={() => setControlledValue("item-3")}>
                Open 3
              </Button>
              <Button size="xs" variant="ghost" onClick={() => setControlledValue(null)}>
                Close All
              </Button>
            </div>
          </div>
        </div>
      </PreviewCard>

      {/* 22. Multiple Controlled */}
      <PreviewCard
        title="Multiple Selection Control"
        description="Control multiple expanded items programmatically."
        code={`import { useState } from "react";
import { Accordion, Button } from "andhera-react";

const items = [
  { value: "item-1", label: "Item One", children: <p>Content for item 1</p> },
  { value: "item-2", label: "Item Two", children: <p>Content for item 2</p> },
  { value: "item-3", label: "Item Three", children: <p>Content for item 3</p> },
];

const [expanded, setExpanded] = useState<string[]>(["item-1"]);

<Accordion
  items={items}
  multiple
  value={expanded}
  onChange={(v) => setExpanded(Array.isArray(v) ? v : v ? [v] : [])}
  size="sm"
/>

<Button size="xs" variant="secondary" onClick={() => setExpanded(["item-1", "item-2", "item-3"])}>Open All</Button>
<Button size="xs" variant="secondary" onClick={() => setExpanded(["item-1", "item-3"])}>Open 1 & 3</Button>
<Button size="xs" variant="ghost" onClick={() => setExpanded([])}>Close All</Button>`}
      >
        <div className="w-full pt-12 overflow-y-auto max-h-[320px]">
          <div className="space-y-4 max-w-lg mx-auto px-2">
            <Accordion
              items={threeItems}
              multiple
              value={multiControlledValue}
              onChange={(v: string | string[] | null) => setMultiControlledValue(Array.isArray(v) ? v : v ? [v] : [])}
              size="sm"
            />
            <div className="flex flex-wrap gap-2">
              <Button size="xs" variant="secondary" onClick={() => setMultiControlledValue(["item-1", "item-2", "item-3"])}>
                Open All
              </Button>
              <Button size="xs" variant="secondary" onClick={() => setMultiControlledValue(["item-1", "item-3"])}>
                Open 1 & 3
              </Button>
              <Button size="xs" variant="ghost" onClick={() => setMultiControlledValue([])}>
                Close All
              </Button>
            </div>
          </div>
        </div>
      </PreviewCard>

      {/* 23. Event Callbacks */}
      <PreviewCard
        title="Event Callbacks"
        description="Track expand and collapse events with onExpand and onCollapse."
        code={`import { Accordion } from "andhera-react";

const items = [
  { value: "item-1", label: "Item One", children: <p>Content for item 1</p> },
  { value: "item-2", label: "Item Two", children: <p>Content for item 2</p> },
  { value: "item-3", label: "Item Three", children: <p>Content for item 3</p> },
];

<Accordion
  items={items}
  onExpand={(value) => console.log('Expanded:', value)}
  onCollapse={(value) => console.log('Collapsed:', value)}
  size="sm"
/>`}
      >
        <div className="w-full pt-12 overflow-y-auto max-h-[320px]">
          <div className="space-y-3 max-w-lg mx-auto px-2">
            <Accordion
              items={threeItems}
              onExpand={(value: string) => logEvent('Expanded', value)}
              onCollapse={(value: string) => logEvent('Collapsed', value)}
              size="sm"
            />
            <div className="bg-gray-800 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">Event Log:</p>
              <div className="min-h-[40px]">
                {eventLog.length === 0 ? (
                  <p className="text-gray-500 text-xs">Click items to see events...</p>
                ) : (
                  eventLog.map((log, i) => (
                    <p key={i} className="text-xs text-green-400 font-mono">{log}</p>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </PreviewCard>

      {/* 24. Per-Item Custom Styling */}
      <PreviewCard
        title="Per-Item Custom Styling"
        description="Apply custom classes and use color props for individual styling."
        code={`import { Accordion } from "andhera-react";

// Border accents via itemClassName
const customStyledItems = [
  {
    value: "custom-1",
    label: "Purple Accent",
    itemClassName: "border-l-4 border-l-purple-500",
    children: <p>This item has a purple left border accent.</p>,
  },
  {
    value: "custom-2",
    label: "Green Accent",
    itemClassName: "border-l-4 border-l-green-500",
    children: <p>This item has a green left border accent.</p>,
  },
  {
    value: "custom-3",
    label: "Blue Accent",
    itemClassName: "border-l-4 border-l-blue-500",
    children: <p>This item has a blue left border accent.</p>,
  },
];

<Accordion items={customStyledItems} defaultValue="custom-1" size="sm" />

// Purple theme via color props
<Accordion 
  items={[
    { value: "p1", label: "Purple Item 1", children: <p>Purple themed content</p> },
    { value: "p2", label: "Purple Item 2", children: <p>Consistent theming</p> },
  ]}
  defaultValue="p1"
  size="sm"
  accentColor="#a855f7"
  expandedTextColor="#c084fc"
  expandedBorderColor="#a855f7"
  borderColor="#7c3aed"
/>`}
      >
        <div className="w-full pt-12 overflow-y-auto max-h-[320px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-2">
            <div>
              <p className="text-xs text-gray-400 mb-1">Border accents via itemClassName</p>
              <Accordion items={customStyledItems} defaultValue="custom-1" size="sm" />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Purple theme via color props</p>
              <Accordion 
                items={[
                  { value: "p1", label: "Purple Item 1", children: <p>Purple themed content</p> },
                  { value: "p2", label: "Purple Item 2", children: <p>Consistent theming</p> },
                ]}
                defaultValue="p1"
                size="sm"
                accentColor="#a855f7"
                expandedTextColor="#c084fc"
                expandedBorderColor="#a855f7"
                borderColor="#7c3aed"
              />
            </div>
          </div>
        </div>
      </PreviewCard>

      {/* 25. Keep Mounted / Unmount on Exit */}
      <PreviewCard
        title="Mount Behavior"
        description="Control whether content stays in DOM when collapsed."
        code={`import { Accordion } from "andhera-react";

const items = [
  { value: "item-1", label: "What is AndheraUI?", children: <p>A React component library.</p> },
];

// Keep in DOM (useful for forms)
<Accordion items={items} keepMounted size="sm" />

// Remove from DOM when collapsed (default)
<Accordion items={items} unmountOnExit size="sm" />`}
      >
        <div className="w-full pt-12 overflow-y-auto max-h-[320px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-2">
            <div>
              <p className="text-xs text-gray-400 mb-1">Keep Mounted</p>
              <Accordion items={shortItems} keepMounted size="sm" />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Unmount on Exit</p>
              <Accordion items={shortItems} unmountOnExit size="sm" />
            </div>
          </div>
        </div>
      </PreviewCard>

      {/* 26. Full Width */}
      <PreviewCard
        title="Full Width"
        description="Make the accordion take the full width of its container."
        code={`import { Accordion } from "andhera-react";

const items = [
  { value: "item-1", label: "What is AndheraUI?", children: <p>A React component library.</p> },
];

<Accordion items={items} fullWidth defaultValue="item-1" size="sm" />`}
      >
        <div className="w-full pt-12 px-2">
          <div className="border border-dashed border-gray-600 p-3 rounded-lg">
            <Accordion items={shortItems} fullWidth defaultValue="item-1" size="sm" />
          </div>
        </div>
      </PreviewCard>

      {/* 27. Accessibility */}
      <PreviewCard
        title="Accessibility Features"
        description="Built-in ARIA attributes with customizable labels."
        code={`import { Accordion } from "andhera-react";

const items = [
  { value: "item-1", label: "Item One", children: <p>Content for item 1</p> },
  { value: "item-2", label: "Item Two", children: <p>Content for item 2</p> },
  { value: "item-3", label: "Item Three", children: <p>Content for item 3</p> },
];

// Using ariaLabel
<Accordion
  items={items}
  ariaLabel="FAQ Section"
  defaultValue="item-1"
  size="sm"
/>

// Or reference an element with ariaLabelledBy
<h4 id="faq-heading">FAQ Section</h4>
<Accordion
  items={items}
  ariaLabelledBy="faq-heading"
  defaultValue="item-1"
  size="sm"
/>`}
      >
        <div className="w-full pt-12 overflow-y-auto max-h-[320px]">
          <div className="space-y-3 max-w-lg mx-auto px-2">
            <h4 id="faq-heading" className="text-sm font-semibold text-white flex items-center gap-2">
              <InfoIcon className="w-4 h-4 text-blue-400" />
              FAQ Section
            </h4>
            <Accordion 
              items={threeItems} 
              defaultValue="item-1"
              ariaLabelledBy="faq-heading"
              size="sm"
            />
            <div className="bg-gray-800 rounded p-2 text-xs text-gray-300">
              <p className="font-semibold mb-1">Included:</p>
              <ul className="list-disc pl-4 space-y-0.5">
                <li>ARIA roles & attributes</li>
                <li>Keyboard navigation</li>
                <li>Focus management</li>
              </ul>
            </div>
          </div>
        </div>
      </PreviewCard>

      {/* 28. Custom Header Labels */}
      <PreviewCard
        title="Custom Header Labels"
        description="Use ReactNode for labels to include icons or badges."
        code={`import { Accordion } from "andhera-react";
// Import your preferred icons

<Accordion 
  items={[
    {
      value: "completed",
      label: (
        <div className="flex items-center gap-2">
          <CheckCircleIcon className="w-4 h-4 text-green-400" />
          <span>Completed</span>
          <span className="bg-green-500/20 text-green-400 text-xs px-1.5 py-0.5 rounded-full">3</span>
        </div>
      ),
      children: (
        <ul className="text-sm space-y-1">
          <li className="flex items-center gap-1"><CheckCircleIcon className="w-3 h-3 text-green-400" /> Task 1</li>
          <li className="flex items-center gap-1"><CheckCircleIcon className="w-3 h-3 text-green-400" /> Task 2</li>
          <li className="flex items-center gap-1"><CheckCircleIcon className="w-3 h-3 text-green-400" /> Task 3</li>
        </ul>
      ),
    },
    {
      value: "pending",
      label: (
        <div className="flex items-center gap-2">
          <InfoIcon className="w-4 h-4 text-yellow-400" />
          <span>Pending</span>
          <span className="bg-yellow-500/20 text-yellow-400 text-xs px-1.5 py-0.5 rounded-full">2</span>
        </div>
      ),
      children: (
        <ul className="text-sm space-y-1">
          <li>○ Task 4</li>
          <li>○ Task 5</li>
        </ul>
      ),
    },
  ]} 
  defaultValue="completed"
  size="sm"
/>`}
      >
        <div className="w-full max-w-lg pt-12">
          <Accordion 
            items={[
              {
                value: "completed",
                label: (
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-400" />
                    <span>Completed</span>
                    <span className="bg-green-500/20 text-green-400 text-xs px-1.5 py-0.5 rounded-full">3</span>
                  </div>
                ),
                children: (
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center gap-1"><CheckCircleIcon className="w-3 h-3 text-green-400" /> Task 1</li>
                    <li className="flex items-center gap-1"><CheckCircleIcon className="w-3 h-3 text-green-400" /> Task 2</li>
                    <li className="flex items-center gap-1"><CheckCircleIcon className="w-3 h-3 text-green-400" /> Task 3</li>
                  </ul>
                ),
              },
              {
                value: "pending",
                label: (
                  <div className="flex items-center gap-2">
                    <InfoIcon className="w-4 h-4 text-yellow-400" />
                    <span>Pending</span>
                    <span className="bg-yellow-500/20 text-yellow-400 text-xs px-1.5 py-0.5 rounded-full">2</span>
                  </div>
                ),
                children: (
                  <ul className="text-sm space-y-1">
                    <li>○ Task 4</li>
                    <li>○ Task 5</li>
                  </ul>
                ),
              },
            ]} 
            defaultValue="completed"
            size="sm"
          />
        </div>
      </PreviewCard>

      {/* 29. Inline Styles */}
      <PreviewCard
        title="Inline Styles"
        description="Apply custom inline styles to the accordion container."
        code={`import { Accordion } from "andhera-react";

const items = [
  { value: "item-1", label: "What is AndheraUI?", children: <p>A React component library.</p> },
];

<Accordion 
  items={items} 
  defaultValue="item-1"
  size="sm"
  style={{
    boxShadow: '0 0 20px rgba(255, 203, 0, 0.2)',
    border: '2px solid #FFCB00',
    borderRadius: '1rem',
    padding: '0.5rem',
  }}
/>`}
      >
        <div className="w-full max-w-lg pt-12">
          <Accordion 
            items={shortItems} 
            defaultValue="item-1"
            size="sm"
            style={{
              boxShadow: '0 0 20px rgba(255, 203, 0, 0.2)',
              border: '2px solid #FFCB00',
              borderRadius: '1rem',
              padding: '0.5rem',
            }}
          />
        </div>
      </PreviewCard>

      {/* 30. Icon Rotation */}
      <PreviewCard
        title="Icon Rotation"
        description="Customize icon rotation angle when expanded."
        code={`import { Accordion } from "andhera-react";

const items = [
  { value: "item-1", label: "What is AndheraUI?", children: <p>A React component library.</p> },
];

// Chevron right with 90° rotation
<Accordion 
  items={items} 
  expandIcon={<ChevronRightIcon className="w-4 h-4" />}
  iconRotation={90}
  size="sm"
/>

// Default 180° rotation
<Accordion 
  items={items} 
  iconRotation={180}
  size="sm"
/>`}
      >
        <div className="w-full pt-12 overflow-y-auto max-h-[320px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-2">
            <div>
              <p className="text-xs text-gray-400 mb-1">90° rotation</p>
              <Accordion 
                items={shortItems.slice(0, 1)} 
                expandIcon={<ChevronRightIcon className="w-4 h-4" />}
                iconRotation={90}
                size="sm"
              />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">180° rotation (default)</p>
              <Accordion 
                items={shortItems.slice(0, 1)} 
                iconRotation={180}
                size="sm"
              />
            </div>
          </div>
        </div>
      </PreviewCard>

      {/* Props Reference */}
      <PropsReference />
    </div>
  );
}

export default AccordionPreview;


