import { useState } from "react";
import ToggleButton from "../../../src/components/toggle-button/toggleButton";
import ToggleButtonGroup from "../../../src/components/toggle-button/toggleButtonGroup";
import { PreviewCard as SharedPreviewCard } from "../components/PreviewCard";
// Import icons from the library
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  LayoutList, 
  LayoutGrid, 
  Calendar,
  Sun,
  Moon,
  Monitor,
  Heart,
  Star,
  Bookmark
} from "../../../src/components/icons";

/**
 * ToggleButtonPreview Component
 * Comprehensive documentation for ToggleButton and ToggleButtonGroup
 */
export function ToggleButtonPreview() {
  // State for all interactive examples
  const [singleToggle, setSingleToggle] = useState(false);
  const [basicGroup, setBasicGroup] = useState("center");
  const [viewMode, setViewMode] = useState("list");
  const [themeMode, setThemeMode] = useState("light");
  
  // Variants state
  const [variantGroups, setVariantGroups] = useState({
    primary: "center",
    secondary: "right", 
    light: "left",
    outline: "center",
    ghost: "right"
  });
  
  // Size states
  const [sizeGroups, setSizeGroups] = useState({
    xs: "opt1",
    small: "opt2",
    medium: "opt1",
    large: "opt2",
    xl: "opt1"
  });
  
  // Alignment states
  const [horizontalGroup, setHorizontalGroup] = useState("option2");
  const [verticalGroup, setVerticalGroup] = useState("middle");
  
  // Icon states
  const [textFormat, setTextFormat] = useState("bold");
  const [textAlign, setTextAlign] = useState("left");
  const [actionIcons, setActionIcons] = useState<string[]>(["heart"]);
  
  // Advanced states
  const [multipleSelection, setMultipleSelection] = useState<string[]>(["bold", "italic"]);
  const [spacingDemo, setSpacingDemo] = useState("opt2");
  const [customStyleDemo, setCustomStyleDemo] = useState("custom1");
  const [disabledDemo, setDisabledDemo] = useState("opt1");
  const [fullWidthDemo, setFullWidthDemo] = useState("option1");
  const [radiusDemo, setRadiusDemo] = useState("md");

  return (
    <div className="flex flex-col gap-11 w-full">
      {/* =============== 1. SINGLE TOGGLE BUTTON =============== */}
      <SharedPreviewCard
        title="Single Toggle Button"
        description="Individual toggle buttons work as standalone interactive elements. Perfect for simple on/off states, settings toggles, or any binary choice interface. The button provides visual feedback for active and inactive states.\n\n• isActive: boolean - Controls the active state\n• value: string | number | boolean - The value of the toggle"
        code={`import { useState } from "react";
import { ToggleButton } from "andhera-react";

function Example() {
  const [isActive, setIsActive] = useState(false);
  
  return (
    <ToggleButton
      value="toggle"
      isActive={isActive}
      onClick={() => setIsActive(!isActive)}
      size="large"
    >
      {isActive ? "Active" : "Inactive"}
    </ToggleButton>
  );
}`}
      >
        <div className="flex gap-6 items-center justify-center">
          <ToggleButton
            value={singleToggle}
            isActive={singleToggle}
            onClick={() => setSingleToggle(!singleToggle)}
            size="large"
            radius="lg"
          >
            {singleToggle ? "Active" : "Inactive"}
          </ToggleButton>
          <span className="text-gray-400 text-sm px-3 py-1 bg-gray-800 rounded">
            Status: <span className={singleToggle ? "text-yellow-400" : "text-gray-300"}>{singleToggle ? "ON" : "OFF"}</span>
          </span>
        </div>
      </SharedPreviewCard>

      {/* =============== 2. BASIC TOGGLE BUTTON GROUP =============== */}
      <SharedPreviewCard
        title="Toggle Button Group"
        description="Toggle button groups allow users to select one option from multiple choices. They're perfect for switching between different views, modes, or categories. The group manages selection state and styling automatically.\n\n• value: string | string[] - Currently selected value(s)\n• onChange: (value: string | string[]) => void - Selection change handler"
        code={`import { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "andhera-react";

function Example() {
  const [selected, setSelected] = useState("center");
  
  return (
    <ToggleButtonGroup 
      value={selected} 
      onChange={setSelected}
      size="large"
    >
      <ToggleButton value="left">Left</ToggleButton>
      <ToggleButton value="center">Center</ToggleButton>
      <ToggleButton value="right">Right</ToggleButton>
    </ToggleButtonGroup>
  );
}`}
      >
        <div className="flex flex-col gap-4 items-center justify-center">
          <ToggleButtonGroup value={basicGroup} onChange={(v) => setBasicGroup(v as string)} size="large">
            <ToggleButton value="left">Left</ToggleButton>
            <ToggleButton value="center">Center</ToggleButton>
            <ToggleButton value="right">Right</ToggleButton>
          </ToggleButtonGroup>
          <span className="text-gray-400 text-sm">
            Selected: <span className="text-yellow-400">{basicGroup}</span>
          </span>
        </div>
      </SharedPreviewCard>

      {/* =============== 3. ALL VARIANTS =============== */}
      <SharedPreviewCard
        title="Variant Styles"
        description="Five distinct variants provide visual hierarchy and context. Primary for main actions, secondary with container styling, light for bright UIs, outline for minimal footprint, and ghost for subtle selections.\n\n• ToggleButtonVariant: 'primary' | 'secondary' | 'light' | 'outline' | 'ghost'"
        code={`import { ToggleButton, ToggleButtonGroup } from "andhera-react";

// Primary - Default prominent style
<ToggleButtonGroup variant="primary" value={value} onChange={onChange}>
  <ToggleButton value="a">Option A</ToggleButton>
  <ToggleButton value="b">Option B</ToggleButton>
</ToggleButtonGroup>

// Secondary - With container background  
<ToggleButtonGroup variant="secondary" value={value} onChange={onChange}>
  <ToggleButton value="a">Option A</ToggleButton>
  <ToggleButton value="b">Option B</ToggleButton>
</ToggleButtonGroup>

// Light - For light themes
<ToggleButtonGroup variant="light" value={value} onChange={onChange}>
  <ToggleButton value="a">Option A</ToggleButton>
  <ToggleButton value="b">Option B</ToggleButton>
</ToggleButtonGroup>

// Outline - Minimal border style
<ToggleButtonGroup variant="outline" value={value} onChange={onChange}>
  <ToggleButton value="a">Option A</ToggleButton>
  <ToggleButton value="b">Option B</ToggleButton>
</ToggleButtonGroup>

// Ghost - Transparent background
<ToggleButtonGroup variant="ghost" value={value} onChange={onChange}>
  <ToggleButton value="a">Option A</ToggleButton>
  <ToggleButton value="b">Option B</ToggleButton>
</ToggleButtonGroup>`}
      >
        <div className="flex flex-col gap-6 items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {/* Primary */}
            <div className="flex flex-col gap-2 items-center">
              <label className="text-white text-sm font-medium">Primary</label>
              <ToggleButtonGroup 
                value={variantGroups.primary} 
                onChange={(v) => setVariantGroups(prev => ({ ...prev, primary: v as string }))} 
                variant="primary"
                size="medium"
              >
                <ToggleButton value="left">Left</ToggleButton>
                <ToggleButton value="center">Center</ToggleButton>
                <ToggleButton value="right">Right</ToggleButton>
              </ToggleButtonGroup>
            </div>
            
            {/* Secondary */}
            <div className="flex flex-col gap-2 items-center">
              <label className="text-white text-sm font-medium">Secondary</label>
              <ToggleButtonGroup 
                value={variantGroups.secondary} 
                onChange={(v) => setVariantGroups(prev => ({ ...prev, secondary: v as string }))} 
                variant="secondary"
                size="medium"
              >
                <ToggleButton value="left">Left</ToggleButton>
                <ToggleButton value="center">Center</ToggleButton>
                <ToggleButton value="right">Right</ToggleButton>
              </ToggleButtonGroup>
            </div>
            
            {/* Light */}
            <div className="flex flex-col gap-2 items-center">
              <label className="text-white text-sm font-medium">Light</label>
              <ToggleButtonGroup 
                value={variantGroups.light} 
                onChange={(v) => setVariantGroups(prev => ({ ...prev, light: v as string }))} 
                variant="light"
                size="medium"
              >
                <ToggleButton value="left">Left</ToggleButton>
                <ToggleButton value="center">Center</ToggleButton>
                <ToggleButton value="right">Right</ToggleButton>
              </ToggleButtonGroup>
            </div>
            
            {/* Outline */}
            <div className="flex flex-col gap-2 items-center">
              <label className="text-white text-sm font-medium">Outline</label>
              <ToggleButtonGroup 
                value={variantGroups.outline} 
                onChange={(v) => setVariantGroups(prev => ({ ...prev, outline: v as string }))} 
                variant="outline"
                size="medium"
              >
                <ToggleButton value="left">Left</ToggleButton>
                <ToggleButton value="center">Center</ToggleButton>
                <ToggleButton value="right">Right</ToggleButton>
              </ToggleButtonGroup>
            </div>
            
            {/* Ghost */}
            <div className="flex flex-col gap-2 items-center">
              <label className="text-white text-sm font-medium">Ghost</label>
              <ToggleButtonGroup 
                value={variantGroups.ghost} 
                onChange={(v) => setVariantGroups(prev => ({ ...prev, ghost: v as string }))} 
                variant="ghost"
                size="medium"
              >
                <ToggleButton value="left">Left</ToggleButton>
                <ToggleButton value="center">Center</ToggleButton>
                <ToggleButton value="right">Right</ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>
        </div>
      </SharedPreviewCard>

      {/* =============== 4. ALL SIZES =============== */}
      <SharedPreviewCard
        title="Size Variations"
        description="Five size options to match your design system: xs (24px), small (32px), medium (40px), large (48px), and xl (56px). Sizes affect height, padding, and font size proportionally.\n\n• ToggleButtonSize: 'xs' | 'small' | 'medium' | 'large' | 'xl'"
        code={`import { ToggleButton, ToggleButtonGroup } from "andhera-react";

// Extra Small (24px height)
<ToggleButtonGroup size="xs" value={value} onChange={onChange}>
  <ToggleButton value="a">A</ToggleButton>
  <ToggleButton value="b">B</ToggleButton>
</ToggleButtonGroup>

// Small (32px height)
<ToggleButtonGroup size="small" value={value} onChange={onChange}>
  <ToggleButton value="a">Option A</ToggleButton>
  <ToggleButton value="b">Option B</ToggleButton>
</ToggleButtonGroup>

// Medium (40px height) - Default
<ToggleButtonGroup size="medium" value={value} onChange={onChange}>
  <ToggleButton value="a">Option A</ToggleButton>
  <ToggleButton value="b">Option B</ToggleButton>
</ToggleButtonGroup>

// Large (48px height)
<ToggleButtonGroup size="large" value={value} onChange={onChange}>
  <ToggleButton value="a">Option A</ToggleButton>
  <ToggleButton value="b">Option B</ToggleButton>
</ToggleButtonGroup>

// Extra Large (56px height)
<ToggleButtonGroup size="xl" value={value} onChange={onChange}>
  <ToggleButton value="a">Option A</ToggleButton>
  <ToggleButton value="b">Option B</ToggleButton>
</ToggleButtonGroup>`}
      >
        <div className="flex flex-col gap-6 items-center w-full">
          {/* XS */}
          <div className="flex items-center gap-4 w-full justify-between max-w-md">
            <span className="text-gray-400 text-sm w-24">XS (24px)</span>
            <ToggleButtonGroup 
              size="xs" 
              value={sizeGroups.xs}
              onChange={(v) => setSizeGroups(prev => ({ ...prev, xs: v as string }))}
            >
              <ToggleButton value="opt1">A</ToggleButton>
              <ToggleButton value="opt2">B</ToggleButton>
              <ToggleButton value="opt3">C</ToggleButton>
            </ToggleButtonGroup>
          </div>
          
          {/* Small */}
          <div className="flex items-center gap-4 w-full justify-between max-w-md">
            <span className="text-gray-400 text-sm w-24">Small (32px)</span>
            <ToggleButtonGroup 
              size="small" 
              value={sizeGroups.small}
              onChange={(v) => setSizeGroups(prev => ({ ...prev, small: v as string }))}
            >
              <ToggleButton value="opt1">Option A</ToggleButton>
              <ToggleButton value="opt2">Option B</ToggleButton>
            </ToggleButtonGroup>
          </div>
          
          {/* Medium */}
          <div className="flex items-center gap-4 w-full justify-between max-w-md">
            <span className="text-gray-400 text-sm w-24">Medium (40px)</span>
            <ToggleButtonGroup 
              size="medium" 
              value={sizeGroups.medium}
              onChange={(v) => setSizeGroups(prev => ({ ...prev, medium: v as string }))}
            >
              <ToggleButton value="opt1">Option A</ToggleButton>
              <ToggleButton value="opt2">Option B</ToggleButton>
            </ToggleButtonGroup>
          </div>
          
          {/* Large */}
          <div className="flex items-center gap-4 w-full justify-between max-w-md">
            <span className="text-gray-400 text-sm w-24">Large (48px)</span>
            <ToggleButtonGroup 
              size="large" 
              value={sizeGroups.large}
              onChange={(v) => setSizeGroups(prev => ({ ...prev, large: v as string }))}
            >
              <ToggleButton value="opt1">Option A</ToggleButton>
              <ToggleButton value="opt2">Option B</ToggleButton>
            </ToggleButtonGroup>
          </div>
          
          {/* XL */}
          <div className="flex items-center gap-4 w-full justify-between max-w-md">
            <span className="text-gray-400 text-sm w-24">XL (56px)</span>
            <ToggleButtonGroup 
              size="xl" 
              value={sizeGroups.xl}
              onChange={(v) => setSizeGroups(prev => ({ ...prev, xl: v as string }))}
            >
              <ToggleButton value="opt1">Option A</ToggleButton>
              <ToggleButton value="opt2">Option B</ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
      </SharedPreviewCard>

      {/* =============== 5. WITH ICONS =============== */}
      <SharedPreviewCard
        title="Toggle Buttons with Icons"
        description="Icons enhance visual communication. Use startIcon/endIcon for combined icon-text layouts, or iconOnly for compact icon buttons. Perfect for toolbars, editors, and action panels.\n\n• startIcon: ReactNode - Icon before content\n• endIcon: ReactNode - Icon after content\n• iconOnly: boolean - Hide text, show only icon\n• tooltip: string - Tooltip text for icon-only buttons"
        code={`import { ToggleButton, ToggleButtonGroup } from "andhera-react";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, LayoutList, LayoutGrid, Calendar } from "andhera-react/icons";

// Text formatting with icons only
<ToggleButtonGroup value={format} onChange={setFormat}>
  <ToggleButton value="bold" startIcon={<Bold size={16} />} iconOnly />
  <ToggleButton value="italic" startIcon={<Italic size={16} />} iconOnly />
  <ToggleButton value="underline" startIcon={<Underline size={16} />} iconOnly />
</ToggleButtonGroup>

// Text alignment with icons only
<ToggleButtonGroup value={align} onChange={setAlign}>
  <ToggleButton value="left" startIcon={<AlignLeft size={16} />} iconOnly />
  <ToggleButton value="center" startIcon={<AlignCenter size={16} />} iconOnly />
  <ToggleButton value="right" startIcon={<AlignRight size={16} />} iconOnly />
</ToggleButtonGroup>

// Icons with text
<ToggleButtonGroup value={mode} onChange={setMode}>
  <ToggleButton value="list" startIcon={<LayoutList size={16} />}>List</ToggleButton>
  <ToggleButton value="grid" startIcon={<LayoutGrid size={16} />}>Grid</ToggleButton>
  <ToggleButton value="calendar" startIcon={<Calendar size={16} />}>Calendar</ToggleButton>
</ToggleButtonGroup>`}
      >
        <div className="flex flex-col gap-6 items-center">
          {/* Text Formatting Icons */}
          <div className="flex flex-col gap-2 items-center">
            <span className="text-gray-400 text-xs uppercase tracking-wider">Text Formatting</span>
            <ToggleButtonGroup value={textFormat} onChange={(v) => setTextFormat(v as string)} size="medium">
              <ToggleButton value="bold" startIcon={<Bold size={16} />} iconOnly tooltip="Bold" />
              <ToggleButton value="italic" startIcon={<Italic size={16} />} iconOnly tooltip="Italic" />
              <ToggleButton value="underline" startIcon={<Underline size={16} />} iconOnly tooltip="Underline" />
            </ToggleButtonGroup>
          </div>

          {/* Text Alignment Icons */}
          <div className="flex flex-col gap-2 items-center">
            <span className="text-gray-400 text-xs uppercase tracking-wider">Text Alignment</span>
            <ToggleButtonGroup value={textAlign} onChange={(v) => setTextAlign(v as string)} size="medium">
              <ToggleButton value="left" startIcon={<AlignLeft size={16} />} iconOnly tooltip="Align Left" />
              <ToggleButton value="center" startIcon={<AlignCenter size={16} />} iconOnly tooltip="Align Center" />
              <ToggleButton value="right" startIcon={<AlignRight size={16} />} iconOnly tooltip="Align Right" />
            </ToggleButtonGroup>
          </div>

          {/* Icons with Text */}
          <div className="flex flex-col gap-2 items-center">
            <span className="text-gray-400 text-xs uppercase tracking-wider">View Mode</span>
            <ToggleButtonGroup value={viewMode} onChange={(v) => setViewMode(v as string)} size="large">
              <ToggleButton value="list" startIcon={<LayoutList size={16} />}>List</ToggleButton>
              <ToggleButton value="grid" startIcon={<LayoutGrid size={16} />}>Grid</ToggleButton>
              <ToggleButton value="calendar" startIcon={<Calendar size={16} />}>Calendar</ToggleButton>
            </ToggleButtonGroup>
          </div>

          {/* Theme Selector with Icons */}
          <div className="flex flex-col gap-2 items-center">
            <span className="text-gray-400 text-xs uppercase tracking-wider">Theme Mode</span>
            <ToggleButtonGroup 
              value={themeMode} 
              onChange={(v) => setThemeMode(v as string)} 
              size="medium"
              spacing="sm"
              radius="lg"
            >
              <ToggleButton value="light" startIcon={<Sun size={16} />}>Light</ToggleButton>
              <ToggleButton value="dark" startIcon={<Moon size={16} />}>Dark</ToggleButton>
              <ToggleButton value="system" startIcon={<Monitor size={16} />}>System</ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
      </SharedPreviewCard>

      {/* =============== 6. ALIGNMENT (HORIZONTAL VS VERTICAL) =============== */}
      <SharedPreviewCard
        title="Alignment Options"
        description="Groups can be arranged horizontally (default) or vertically. Vertical alignment is ideal for sidebars, toolbars, or any interface where vertical space is more suitable.\n\n• alignment: 'horizontal' | 'vertical' - Group layout direction"
        code={`import { ToggleButton, ToggleButtonGroup } from "andhera-react";

// Horizontal alignment (default)
<ToggleButtonGroup 
  value={value} 
  onChange={onChange} 
  alignment="horizontal"
>
  <ToggleButton value="a">Option A</ToggleButton>
  <ToggleButton value="b">Option B</ToggleButton>
  <ToggleButton value="c">Option C</ToggleButton>
</ToggleButtonGroup>

// Vertical alignment
<ToggleButtonGroup 
  value={value} 
  onChange={onChange} 
  alignment="vertical"
>
  <ToggleButton value="top">Top</ToggleButton>
  <ToggleButton value="middle">Middle</ToggleButton>
  <ToggleButton value="bottom">Bottom</ToggleButton>
</ToggleButtonGroup>`}
      >
        <div className="flex flex-row gap-12 items-start justify-center flex-wrap">
          {/* Horizontal */}
          <div className="flex flex-col gap-3 items-center">
            <span className="text-gray-400 text-xs uppercase tracking-wider">Horizontal</span>
            <ToggleButtonGroup 
              value={horizontalGroup} 
              onChange={(v) => setHorizontalGroup(v as string)} 
              alignment="horizontal"
              size="large"
            >
              <ToggleButton value="option1">Option 1</ToggleButton>
              <ToggleButton value="option2">Option 2</ToggleButton>
              <ToggleButton value="option3">Option 3</ToggleButton>
            </ToggleButtonGroup>
          </div>

          {/* Vertical */}
          <div className="flex flex-col gap-3 items-center">
            <span className="text-gray-400 text-xs uppercase tracking-wider">Vertical</span>
            <ToggleButtonGroup 
              value={verticalGroup} 
              onChange={(v) => setVerticalGroup(v as string)} 
              alignment="vertical"
              size="large"
            >
              <ToggleButton value="top">Top</ToggleButton>
              <ToggleButton value="middle">Middle</ToggleButton>
              <ToggleButton value="bottom">Bottom</ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
      </SharedPreviewCard>

      {/* =============== 7. MULTIPLE SELECTION =============== */}
      <SharedPreviewCard
        title="Multiple Selection Mode"
        description="Enable multi-select mode for scenarios where users need to select multiple options simultaneously, like text formatting. Works similar to checkboxes within a group context.\n\n• selectionMode: 'single' | 'multiple' - Selection behavior\n• value: string[] - Array of selected values in multiple mode"
        code={`import { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "andhera-react";

function Example() {
  const [selected, setSelected] = useState<string[]>(["bold", "italic"]);
  
  return (
    <ToggleButtonGroup 
      value={selected} 
      onChange={setSelected}
      selectionMode="multiple"
      size="medium"
    >
      <ToggleButton value="bold" startIcon={<Bold size={16} />} iconOnly />
      <ToggleButton value="italic" startIcon={<Italic size={16} />} iconOnly />
      <ToggleButton value="underline" startIcon={<Underline size={16} />} iconOnly />
    </ToggleButtonGroup>
  );
}`}
      >
        <div className="flex flex-col gap-4 items-center">
          <ToggleButtonGroup 
            value={multipleSelection} 
            onChange={(v) => setMultipleSelection(v as string[])}
            selectionMode="multiple"
            size="large"
          >
            <ToggleButton value="bold" startIcon={<Bold size={16} />} iconOnly tooltip="Bold" />
            <ToggleButton value="italic" startIcon={<Italic size={16} />} iconOnly tooltip="Italic" />
            <ToggleButton value="underline" startIcon={<Underline size={16} />} iconOnly tooltip="Underline" />
          </ToggleButtonGroup>
          <span className="text-gray-400 text-sm">
            Selected: <span className="text-yellow-400">{multipleSelection.join(", ") || "none"}</span>
          </span>
          
          {/* Multiple with text */}
          <ToggleButtonGroup 
            value={actionIcons} 
            onChange={(v) => setActionIcons(v as string[])}
            selectionMode="multiple"
            size="medium"
            spacing="sm"
            radius="full"
          >
            <ToggleButton value="heart" startIcon={<Heart size={16} />}>Like</ToggleButton>
            <ToggleButton value="star" startIcon={<Star size={16} />}>Star</ToggleButton>
            <ToggleButton value="bookmark" startIcon={<Bookmark size={16} />}>Save</ToggleButton>
          </ToggleButtonGroup>
        </div>
      </SharedPreviewCard>

      {/* =============== 8. SPACING OPTIONS =============== */}
      <SharedPreviewCard
        title="Button Spacing"
        description="Control the gap between buttons with five spacing options: none (connected), xs, sm, md, and lg. Spacing adds visual separation and allows individual button radius styling.\n\n• ToggleButtonSpacing: 'none' | 'xs' | 'sm' | 'md' | 'lg'"
        code={`import { ToggleButton, ToggleButtonGroup } from "andhera-react";

// No spacing (connected buttons)
<ToggleButtonGroup spacing="none" value={value} onChange={onChange}>
  <ToggleButton value="a">A</ToggleButton>
  <ToggleButton value="b">B</ToggleButton>
</ToggleButtonGroup>

// Small spacing
<ToggleButtonGroup spacing="sm" value={value} onChange={onChange}>
  <ToggleButton value="a">A</ToggleButton>
  <ToggleButton value="b">B</ToggleButton>
</ToggleButtonGroup>

// Medium spacing
<ToggleButtonGroup spacing="md" value={value} onChange={onChange}>
  <ToggleButton value="a">A</ToggleButton>
  <ToggleButton value="b">B</ToggleButton>
</ToggleButtonGroup>

// Large spacing
<ToggleButtonGroup spacing="lg" value={value} onChange={onChange}>
  <ToggleButton value="a">A</ToggleButton>
  <ToggleButton value="b">B</ToggleButton>
</ToggleButtonGroup>`}
      >
        <div className="flex flex-col gap-4 items-center w-full">
          {(["none", "xs", "sm", "md", "lg"] as const).map((space) => (
            <div key={space} className="flex items-center gap-4 w-full justify-between max-w-md">
              <span className="text-gray-400 text-sm w-20 capitalize">{space === "none" ? "None" : space.toUpperCase()}</span>
              <ToggleButtonGroup 
                spacing={space}
                value={spacingDemo}
                onChange={(v) => setSpacingDemo(v as string)}
                size="medium"
                radius="md"
              >
                <ToggleButton value="opt1">Option 1</ToggleButton>
                <ToggleButton value="opt2">Option 2</ToggleButton>
                <ToggleButton value="opt3">Option 3</ToggleButton>
              </ToggleButtonGroup>
            </div>
          ))}
        </div>
      </SharedPreviewCard>

      {/* =============== 9. BORDER RADIUS =============== */}
      <SharedPreviewCard
        title="Border Radius Options"
        description="Customize button corners with six radius options: none, sm, md, lg, xl, and full (pill shape). When using spacing, each button gets individual radius.\n\n• ToggleButtonRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'"
        code={`import { ToggleButton, ToggleButtonGroup } from "andhera-react";

// No radius (sharp corners)
<ToggleButtonGroup radius="none" spacing="sm" value={value} onChange={onChange}>
  <ToggleButton value="a">Option A</ToggleButton>
  <ToggleButton value="b">Option B</ToggleButton>
</ToggleButtonGroup>

// Full radius (pill shape)
<ToggleButtonGroup radius="full" spacing="sm" value={value} onChange={onChange}>
  <ToggleButton value="a">Option A</ToggleButton>
  <ToggleButton value="b">Option B</ToggleButton>
</ToggleButtonGroup>`}
      >
        <div className="flex flex-col gap-4 items-center w-full">
          {(["none", "sm", "md", "lg", "xl", "full"] as const).map((rad) => (
            <div key={rad} className="flex items-center gap-4 w-full justify-between max-w-md">
              <span className="text-gray-400 text-sm w-20 capitalize">{rad}</span>
              <ToggleButtonGroup 
                radius={rad}
                spacing="sm"
                value={radiusDemo}
                onChange={(v) => setRadiusDemo(v as string)}
                size="medium"
              >
                <ToggleButton value="sm">Small</ToggleButton>
                <ToggleButton value="md">Medium</ToggleButton>
                <ToggleButton value="lg">Large</ToggleButton>
              </ToggleButtonGroup>
            </div>
          ))}
        </div>
      </SharedPreviewCard>

      {/* =============== 10. DISABLED STATE =============== */}
      <SharedPreviewCard
        title="Disabled State"
        description="Disable individual buttons or the entire group. Disabled buttons show reduced opacity and prevent interaction while maintaining visual consistency.\n\n• disabled: boolean - Disables the button or entire group"
        code={`import { ToggleButton, ToggleButtonGroup } from "andhera-react";

// Entire group disabled
<ToggleButtonGroup 
  disabled 
  value="opt1" 
  onChange={onChange}
>
  <ToggleButton value="opt1">Option 1</ToggleButton>
  <ToggleButton value="opt2">Option 2</ToggleButton>
  <ToggleButton value="opt3">Option 3</ToggleButton>
</ToggleButtonGroup>

// Individual button disabled
<ToggleButtonGroup value="opt1" onChange={onChange}>
  <ToggleButton value="opt1">Option 1</ToggleButton>
  <ToggleButton value="opt2" disabled>Option 2 (Disabled)</ToggleButton>
  <ToggleButton value="opt3">Option 3</ToggleButton>
</ToggleButtonGroup>`}
      >
        <div className="flex flex-col gap-6 items-start">
          {/* Entire group disabled */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-sm font-medium">Entire Group Disabled</label>
            <ToggleButtonGroup 
              disabled
              value="opt1"
              onChange={() => {}}
              size="medium"
            >
              <ToggleButton value="opt1">Option 1</ToggleButton>
              <ToggleButton value="opt2">Option 2</ToggleButton>
              <ToggleButton value="opt3">Option 3</ToggleButton>
            </ToggleButtonGroup>
            <span className="text-gray-500 text-xs">All buttons are disabled</span>
          </div>

          {/* Individual button disabled */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-sm font-medium">Individual Button Disabled</label>
            <ToggleButtonGroup 
              value={disabledDemo}
              onChange={(v) => setDisabledDemo(v as string)}
              size="medium"
            >
              <ToggleButton value="opt1">Option 1</ToggleButton>
              <ToggleButton value="opt2" disabled>Option 2 (Disabled)</ToggleButton>
              <ToggleButton value="opt3">Option 3</ToggleButton>
            </ToggleButtonGroup>
            <span className="text-gray-500 text-xs">Only the middle button is disabled</span>
          </div>
        </div>
      </SharedPreviewCard>

      {/* =============== 11. FULL WIDTH =============== */}
      <SharedPreviewCard
        title="Full Width"
        description="Make the toggle group span the full width of its container. Each button will grow equally to fill the available space.\n\n• fullWidth: boolean - Expands to fill container width"
        code={`import { ToggleButton, ToggleButtonGroup } from "andhera-react";

<ToggleButtonGroup 
  fullWidth 
  value={value} 
  onChange={onChange}
  size="large"
>
  <ToggleButton value="option1">Option 1</ToggleButton>
  <ToggleButton value="option2">Option 2</ToggleButton>
  <ToggleButton value="option3">Option 3</ToggleButton>
</ToggleButtonGroup>`}
      >
        <div className="w-full max-w-2xl mx-auto">
          <ToggleButtonGroup 
            fullWidth
            value={fullWidthDemo}
            onChange={(v) => setFullWidthDemo(v as string)}
            size="large"
          >
            <ToggleButton value="option1" fullWidth>Option 1</ToggleButton>
            <ToggleButton value="option2" fullWidth>Option 2</ToggleButton>
            <ToggleButton value="option3" fullWidth>Option 3</ToggleButton>
          </ToggleButtonGroup>
        </div>
      </SharedPreviewCard>

      {/* =============== 12. CUSTOM STYLING =============== */}
      <SharedPreviewCard
        title="Custom Styling"
        description="Override default colors with custom props: backgroundColor, textColor, borderColor for inactive state, and activeBackgroundColor, activeTextColor, activeBorderColor for active state. Use customActiveClassName for complete style override.\n\n• backgroundColor: string - Inactive background color\n• textColor: string - Inactive text color\n• borderColor: string - Inactive border color\n• activeBackgroundColor: string - Active background color\n• activeTextColor: string - Active text color\n• activeBorderColor: string - Active border color\n• customActiveClassName: string - Custom class for active state"
        code={`import { ToggleButton, ToggleButtonGroup } from "andhera-react";

// Custom colors via props
<ToggleButtonGroup value={value} onChange={onChange} spacing="sm" radius="lg">
  <ToggleButton 
    value="custom1"
    backgroundColor="#1E293B"
    textColor="#94A3B8"
    borderColor="#334155"
    activeBackgroundColor="#8B5CF6"
    activeTextColor="#FFFFFF"
    activeBorderColor="#A78BFA"
  >
    Purple
  </ToggleButton>
  <ToggleButton 
    value="custom2"
    backgroundColor="#1E293B"
    textColor="#94A3B8"
    borderColor="#334155"
    activeBackgroundColor="#10B981"
    activeTextColor="#FFFFFF"
    activeBorderColor="#34D399"
  >
    Green
  </ToggleButton>
  <ToggleButton 
    value="custom3"
    backgroundColor="#1E293B"
    textColor="#94A3B8"
    borderColor="#334155"
    activeBackgroundColor="#F43F5E"
    activeTextColor="#FFFFFF"
    activeBorderColor="#FB7185"
  >
    Red
  </ToggleButton>
</ToggleButtonGroup>

// Using customActiveClassName
<ToggleButton 
  value="custom"
  customActiveClassName="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent"
>
  Gradient Active
</ToggleButton>`}
      >
        <div className="flex flex-col gap-6 items-center">
          {/* Custom colors */}
          <div className="flex flex-col gap-2 items-center">
            <span className="text-gray-400 text-xs uppercase tracking-wider">Custom Color Props</span>
            <ToggleButtonGroup 
              value={customStyleDemo}
              onChange={(v) => setCustomStyleDemo(v as string)}
              spacing="sm"
              radius="lg"
              size="large"
            >
              <ToggleButton 
                value="custom1"
                backgroundColor="#1E293B"
                textColor="#94A3B8"
                borderColor="#334155"
                activeBackgroundColor="#8B5CF6"
                activeTextColor="#FFFFFF"
                activeBorderColor="#A78BFA"
              >
                Purple
              </ToggleButton>
              <ToggleButton 
                value="custom2"
                backgroundColor="#1E293B"
                textColor="#94A3B8"
                borderColor="#334155"
                activeBackgroundColor="#10B981"
                activeTextColor="#FFFFFF"
                activeBorderColor="#34D399"
              >
                Green
              </ToggleButton>
              <ToggleButton 
                value="custom3"
                backgroundColor="#1E293B"
                textColor="#94A3B8"
                borderColor="#334155"
                activeBackgroundColor="#F43F5E"
                activeTextColor="#FFFFFF"
                activeBorderColor="#FB7185"
              >
                Red
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          
          {/* Custom class overrides */}
          <div className="flex flex-col gap-2 items-center">
            <span className="text-gray-400 text-xs uppercase tracking-wider">Custom Class Overrides</span>
            <div className="flex gap-2">
              <ToggleButton 
                value="gradient"
                isActive={true}
                customActiveClassName="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent hover:from-purple-600 hover:to-pink-600"
                size="large"
                radius="full"
              >
                Gradient Active
              </ToggleButton>
              <ToggleButton 
                value="neon"
                isActive={true}
                customActiveClassName="bg-cyan-500 text-black border-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.5)] hover:bg-cyan-400"
                size="large"
                radius="full"
              >
                Neon Glow
              </ToggleButton>
            </div>
          </div>
        </div>
      </SharedPreviewCard>

      {/* =============== 13. ELEVATED GROUP =============== */}
      <SharedPreviewCard
        title="Elevated Style"
        description="Add subtle elevation shadow to the secondary variant container for a raised appearance. Perfect for floating toolbars or prominent selection groups.\n\n• elevated: boolean - Adds shadow elevation (secondary variant)"
        code={`import { ToggleButton, ToggleButtonGroup } from "andhera-react";

<ToggleButtonGroup 
  variant="secondary"
  elevated
  value={value}
  onChange={onChange}
>
  <ToggleButton value="a">Option A</ToggleButton>
  <ToggleButton value="b">Option B</ToggleButton>
  <ToggleButton value="c">Option C</ToggleButton>
</ToggleButtonGroup>`}
      >
        <div className="flex gap-8 items-center justify-center flex-wrap">
          <div className="flex flex-col gap-2 items-center">
            <span className="text-gray-400 text-xs uppercase tracking-wider">Without Elevation</span>
            <ToggleButtonGroup 
              variant="secondary"
              value="opt1"
              onChange={() => {}}
              size="large"
            >
              <ToggleButton value="opt1">Option A</ToggleButton>
              <ToggleButton value="opt2">Option B</ToggleButton>
              <ToggleButton value="opt3">Option C</ToggleButton>
            </ToggleButtonGroup>
          </div>
          
          <div className="flex flex-col gap-2 items-center">
            <span className="text-gray-400 text-xs uppercase tracking-wider">With Elevation</span>
            <ToggleButtonGroup 
              variant="secondary"
              elevated
              value="opt2"
              onChange={() => {}}
              size="large"
            >
              <ToggleButton value="opt1">Option A</ToggleButton>
              <ToggleButton value="opt2">Option B</ToggleButton>
              <ToggleButton value="opt3">Option C</ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
      </SharedPreviewCard>

      {/* =============== 14. ACCESSIBILITY =============== */}
      <SharedPreviewCard
        title="Accessibility Features"
        description="Built-in accessibility support with proper ARIA attributes. Single selection uses radiogroup role, multiple selection uses group role. Includes keyboard navigation, focus indicators, and aria-pressed states.\n\n• aria-label: string - Accessible label for the group\n• id: string - Unique identifier\n• tooltip: string - Tooltip text for individual buttons"
        code={`import { ToggleButton, ToggleButtonGroup } from "andhera-react";

// Accessible toggle group with labels
<ToggleButtonGroup 
  value={value} 
  onChange={onChange}
  aria-label="View options"
  id="view-toggle"
>
  <ToggleButton 
    value="list" 
    aria-label="List view"
    tooltip="Switch to list view"
  >
    List
  </ToggleButton>
  <ToggleButton 
    value="grid" 
    aria-label="Grid view"
    tooltip="Switch to grid view"
  >
    Grid
  </ToggleButton>
</ToggleButtonGroup>

// The component automatically handles:
// - role="radiogroup" for single selection
// - role="group" for multiple selection  
// - aria-pressed for toggle state
// - aria-disabled for disabled state
// - Keyboard focus indicators
// - Focus trap within group`}
      >
        <div className="flex flex-col gap-4 items-center">
          <ToggleButtonGroup 
            value={viewMode} 
            onChange={(v) => setViewMode(v as string)}
            aria-label="View mode selector"
            id="accessible-toggle"
            size="large"
          >
            <ToggleButton 
              value="list" 
              startIcon={<LayoutList size={16} />}
              aria-label="List view"
              tooltip="Switch to list view"
            >
              List
            </ToggleButton>
            <ToggleButton 
              value="grid" 
              startIcon={<LayoutGrid size={16} />}
              aria-label="Grid view"
              tooltip="Switch to grid view"
            >
              Grid
            </ToggleButton>
            <ToggleButton 
              value="calendar" 
              startIcon={<Calendar size={16} />}
              aria-label="Calendar view"
              tooltip="Switch to calendar view"
            >
              Calendar
            </ToggleButton>
          </ToggleButtonGroup>
          <span className="text-gray-500 text-xs">
            Tab to focus, Arrow keys to navigate, Enter/Space to select
          </span>
        </div>
      </SharedPreviewCard>

      {/* =============== 15. REQUIRED SELECTION =============== */}
      <SharedPreviewCard
        title="Required Selection"
        description="When required is true, at least one option must always be selected. Users cannot deselect the last remaining option. Useful for settings that need a valid value.\n\n• required: boolean - Prevents deselecting the last option"
        code={`import { ToggleButton, ToggleButtonGroup } from "andhera-react";

// Required - cannot deselect last option
<ToggleButtonGroup 
  value={value} 
  onChange={onChange}
  required
>
  <ToggleButton value="a">Option A</ToggleButton>
  <ToggleButton value="b">Option B</ToggleButton>
  <ToggleButton value="c">Option C</ToggleButton>
</ToggleButtonGroup>`}
      >
        <div className="flex flex-col gap-4 items-center">
          <ToggleButtonGroup 
            value={themeMode} 
            onChange={(v) => setThemeMode(v as string)}
            required
            size="large"
            spacing="sm"
            radius="lg"
          >
            <ToggleButton value="light" startIcon={<Sun size={16} />}>Light</ToggleButton>
            <ToggleButton value="dark" startIcon={<Moon size={16} />}>Dark</ToggleButton>
            <ToggleButton value="system" startIcon={<Monitor size={16} />}>System</ToggleButton>
          </ToggleButtonGroup>
          <span className="text-gray-500 text-xs">
            Try clicking the selected option - it cannot be deselected
          </span>
        </div>
      </SharedPreviewCard>
    </div>
  );
}
