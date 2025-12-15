import { useState } from "react";
import { Chip, ChipGroup, Avatar } from "../../../src/components";
import { PreviewCard } from "../components/PreviewCard";
// Import icons from the library's icons folder
import { Star, Heart, User, Ticket, Trash, CheckCircle } from "../../../src/components/icons";

interface PropDefinition {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
}

const propDefinitions: PropDefinition[] = [
  { name: "label", type: "string", defaultValue: "-", description: "Text content of the chip." },
  { name: "size", type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", defaultValue: "'md'", description: "Size of the chip." },
  { name: "variant", type: "'filled' | 'outlined' | 'soft' | 'ghost'", defaultValue: "'filled'", description: "Visual style variant." },
  { name: "color", type: "'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'", defaultValue: "'default'", description: "Predefined color scheme." },
  { name: "radius", type: "'none' | 'sm' | 'md' | 'lg' | 'full'", defaultValue: "'full'", description: "Border radius style." },
  { name: "removable", type: "boolean", defaultValue: "false", description: "Whether to show a remove/close button." },
  { name: "onRemove", type: "(event: MouseEvent) => void", defaultValue: "-", description: "Callback fired when the remove button is clicked." },
  { name: "selectable", type: "boolean", defaultValue: "false", description: "Whether the chip can be selected/toggled." },
  { name: "selected", type: "boolean", defaultValue: "-", description: "Controlled selected state." },
  { name: "defaultSelected", type: "boolean", defaultValue: "false", description: "Default selected state for uncontrolled mode." },
  { name: "onSelectionChange", type: "(selected: boolean) => void", defaultValue: "-", description: "Callback fired when selection state changes." },
  { name: "clickable", type: "boolean", defaultValue: "false", description: "Whether the chip responds to clicks." },
  { name: "onClick", type: "(event: MouseEvent) => void", defaultValue: "-", description: "Callback fired when the chip is clicked." },
  { name: "disabled", type: "boolean", defaultValue: "false", description: "Whether the chip is disabled." },
  { name: "loading", type: "boolean", defaultValue: "false", description: "Whether to show a loading spinner." },
  { name: "loadingText", type: "string", defaultValue: "-", description: "Text to display when loading." },
  { name: "animated", type: "boolean", defaultValue: "true", description: "Whether to show hover and transition animations." },
  { name: "avatar", type: "ReactNode", defaultValue: "-", description: "Avatar element to display at the start." },
  { name: "icon", type: "ReactNode", defaultValue: "-", description: "Icon element to display at the start." },
  { name: "endIcon", type: "ReactNode", defaultValue: "-", description: "Icon element to display at the end." },
  { name: "removeIcon", type: "ReactNode", defaultValue: "-", description: "Custom remove icon to replace default." },
  { name: "checkmarkIcon", type: "ReactNode", defaultValue: "-", description: "Custom checkmark icon when selected." },
  { name: "showCheckmark", type: "boolean", defaultValue: "true", description: "Whether to show checkmark when selected." },
  { name: "backgroundColor", type: "string", defaultValue: "-", description: "Custom background color (CSS value)." },
  { name: "textColor", type: "string", defaultValue: "-", description: "Custom text color (CSS value)." },
  { name: "borderColor", type: "string", defaultValue: "-", description: "Custom border color (CSS value)." },
  { name: "hoverBackgroundColor", type: "string", defaultValue: "-", description: "Custom background color on hover." },
  { name: "selectedBackgroundColor", type: "string", defaultValue: "-", description: "Custom background color when selected." },
  { name: "selectedTextColor", type: "string", defaultValue: "-", description: "Custom text color when selected." },
  { name: "className", type: "string", defaultValue: "-", description: "Additional CSS class names." },
  { name: "style", type: "React.CSSProperties", defaultValue: "-", description: "Inline styles for the chip container." },
  { name: "aria-label", type: "string", defaultValue: "-", description: "Accessible label for the chip." },
  { name: "data-testid", type: "string", defaultValue: "-", description: "Test ID for testing frameworks." },
];

const chipGroupPropDefinitions: PropDefinition[] = [
  { name: "spacing", type: "'xs' | 'sm' | 'md' | 'lg'", defaultValue: "'sm'", description: "Spacing between chips." },
  { name: "direction", type: "'row' | 'column'", defaultValue: "'row'", description: "Direction of chip arrangement." },
  { name: "wrap", type: "boolean", defaultValue: "true", description: "Whether to wrap chips to the next line." },
  { name: "aria-label", type: "string", defaultValue: "-", description: "Accessible label for the chip group." },
];

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

// Small check icon for filter chips
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

// ============================================================================
// CHIP PREVIEW COMPONENT
// ============================================================================

export function ChipPreview() {
  // State for interactive demos
  const [selected1, setSelected1] = useState(false);
  const [selected2, setSelected2] = useState(true);
  const [selected3, setSelected3] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>(['react', 'typescript']);
  const [chips, setChips] = useState(['React', 'TypeScript', 'Tailwind', 'Node.js']);
  const [loading1, setLoading1] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['All']);
  const [selectedSizes, setSelectedSizes] = useState<string[]>(['M']);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const handleRemoveChip = (chip: string) => {
    setChips(chips.filter(c => c !== chip));
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const toggleFilter = (filter: string) => {
    if (filter === 'All') {
      setSelectedFilters(['All']);
    } else {
      const newFilters = selectedFilters.includes(filter)
        ? selectedFilters.filter(f => f !== filter)
        : [...selectedFilters.filter(f => f !== 'All'), filter];
      setSelectedFilters(newFilters.length ? newFilters : ['All']);
    }
  };

  const handleLoadingDemo = () => {
    setLoading1(true);
    setTimeout(() => setLoading1(false), 2000);
  };

  return (
    <div className="flex flex-col gap-8 w-full md:gap-11">
      {/* 1. Basic Chip */}
      <PreviewCard
        title="Basic Chip"
        description={`The simplest chip with just a label.

label: string (required)`}
        code={`<Chip label="Default Chip" />
<Chip label="Simple Tag" />
<Chip label="Label" />`}
      >
        <div className="flex gap-4 items-center justify-center flex-wrap md:gap-6">
          <Chip label="Default Chip" />
          <Chip label="Simple Tag" />
          <Chip label="Label" />
        </div>
      </PreviewCard>

      {/* 2. Chip Sizes */}
      <PreviewCard
        title="Chip Sizes"
        description={`Five size options from extra small to extra large.

ChipSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl'`}
        code={`<Chip label="Extra Small" size="xs" />
<Chip label="Small" size="sm" />
<Chip label="Medium" size="md" />
<Chip label="Large" size="lg" />
<Chip label="Extra Large" size="xl" />`}
      >
        <div className="flex gap-4 items-center justify-center flex-wrap md:gap-6">
          <Chip label="Extra Small" size="xs" />
          <Chip label="Small" size="sm" />
          <Chip label="Medium" size="md" />
          <Chip label="Large" size="lg" />
          <Chip label="Extra Large" size="xl" />
        </div>
      </PreviewCard>

      {/* 3. Chip Variants */}
      <PreviewCard
        title="Chip Variants"
        description={`Four visual variants: filled (solid), outlined (border only), soft (light background), and ghost (transparent).

ChipVariant: 'filled' | 'outlined' | 'soft' | 'ghost'`}
        code={`<Chip label="Filled" variant="filled" color="primary" />
<Chip label="Outlined" variant="outlined" color="primary" />
<Chip label="Soft" variant="soft" color="primary" />
<Chip label="Ghost" variant="ghost" color="primary" />`}
      >
        <div className="flex gap-4 items-center justify-center flex-wrap md:gap-6">
          <Chip label="Filled" variant="filled" color="primary" />
          <Chip label="Outlined" variant="outlined" color="primary" />
          <Chip label="Soft" variant="soft" color="primary" />
          <Chip label="Ghost" variant="ghost" color="primary" />
        </div>
      </PreviewCard>

      {/* 4. Chip Colors - Filled */}
      <PreviewCard
        title="Chip Colors (Filled)"
        description={`Seven predefined color schemes for different contexts.

ChipColor: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'`}
        code={`<Chip label="Default" color="default" />
<Chip label="Primary" color="primary" />
<Chip label="Secondary" color="secondary" />
<Chip label="Success" color="success" />
<Chip label="Warning" color="warning" />
<Chip label="Error" color="error" />
<Chip label="Info" color="info" />`}
      >
        <div className="flex gap-4 items-center justify-center flex-wrap md:gap-6">
          <Chip label="Default" color="default" />
          <Chip label="Primary" color="primary" />
          <Chip label="Secondary" color="secondary" />
          <Chip label="Success" color="success" />
          <Chip label="Warning" color="warning" />
          <Chip label="Error" color="error" />
          <Chip label="Info" color="info" />
        </div>
      </PreviewCard>

      {/* 5. Chip Colors - Outlined */}
      <PreviewCard
        title="Chip Colors (Outlined)"
        description={`All colors with the outlined variant for a lighter appearance.

variant="outlined" + color`}
        code={`<Chip label="Default" color="default" variant="outlined" />
<Chip label="Primary" color="primary" variant="outlined" />
<Chip label="Secondary" color="secondary" variant="outlined" />
<Chip label="Success" color="success" variant="outlined" />
<Chip label="Warning" color="warning" variant="outlined" />
<Chip label="Error" color="error" variant="outlined" />
<Chip label="Info" color="info" variant="outlined" />`}
      >
        <div className="flex gap-4 items-center justify-center flex-wrap md:gap-6">
          <Chip label="Default" color="default" variant="outlined" />
          <Chip label="Primary" color="primary" variant="outlined" />
          <Chip label="Secondary" color="secondary" variant="outlined" />
          <Chip label="Success" color="success" variant="outlined" />
          <Chip label="Warning" color="warning" variant="outlined" />
          <Chip label="Error" color="error" variant="outlined" />
          <Chip label="Info" color="info" variant="outlined" />
        </div>
      </PreviewCard>

      {/* 6. Chip Colors - Soft */}
      <PreviewCard
        title="Chip Colors (Soft)"
        description={`All colors with the soft variant for subtle backgrounds.

variant="soft" + color`}
        code={`<Chip label="Default" color="default" variant="soft" />
<Chip label="Primary" color="primary" variant="soft" />
<Chip label="Secondary" color="secondary" variant="soft" />
<Chip label="Success" color="success" variant="soft" />
<Chip label="Warning" color="warning" variant="soft" />
<Chip label="Error" color="error" variant="soft" />
<Chip label="Info" color="info" variant="soft" />`}
      >
        <div className="flex gap-4 items-center justify-center flex-wrap md:gap-6">
          <Chip label="Default" color="default" variant="soft" />
          <Chip label="Primary" color="primary" variant="soft" />
          <Chip label="Secondary" color="secondary" variant="soft" />
          <Chip label="Success" color="success" variant="soft" />
          <Chip label="Warning" color="warning" variant="soft" />
          <Chip label="Error" color="error" variant="soft" />
          <Chip label="Info" color="info" variant="soft" />
        </div>
      </PreviewCard>

      {/* 7. Border Radius */}
      <PreviewCard
        title="Border Radius"
        description={`Five radius options from none to full (pill shape).

ChipRadius: 'none' | 'sm' | 'md' | 'lg' | 'full'`}
        code={`<Chip label="None" radius="none" color="primary" />
<Chip label="Small" radius="sm" color="primary" />
<Chip label="Medium" radius="md" color="primary" />
<Chip label="Large" radius="lg" color="primary" />
<Chip label="Full" radius="full" color="primary" />`}
      >
        <div className="flex gap-4 items-center justify-center flex-wrap md:gap-6">
          <Chip label="None" radius="none" color="primary" />
          <Chip label="Small" radius="sm" color="primary" />
          <Chip label="Medium" radius="md" color="primary" />
          <Chip label="Large" radius="lg" color="primary" />
          <Chip label="Full" radius="full" color="primary" />
        </div>
      </PreviewCard>

      {/* 8. Chips with Icons */}
      <PreviewCard
        title="Chips with Icons"
        description={`Add icons at the start or end of the chip. Icons can be imported from "andhera-react/icons".

icon?: ReactNode - Icon at the start
endIcon?: ReactNode - Icon at the end`}
        code={`import { Star, Heart, User, Ticket, CheckCircle } from "andhera-react/icons";

<Chip label="Star" icon={<Star size={16} />} color="warning" />
<Chip label="Favorite" icon={<Heart size={16} />} color="error" />
<Chip label="User" icon={<User size={16} />} color="primary" />
<Chip label="Tagged" icon={<Ticket size={16} />} color="secondary" variant="outlined" />
<Chip label="Verified" endIcon={<CheckCircle size={14} />} color="success" />`}
      >
        <div className="flex gap-4 items-center justify-center flex-wrap md:gap-6">
          <Chip label="Star" icon={<Star size={16} />} color="warning" />
          <Chip label="Favorite" icon={<Heart size={16} />} color="error" />
          <Chip label="User" icon={<User size={16} />} color="primary" />
          <Chip label="Tagged" icon={<Ticket size={16} />} color="secondary" variant="outlined" />
          <Chip label="Verified" endIcon={<CheckCircle size={14} />} color="success" />
        </div>
      </PreviewCard>

      {/* 9. Chips with Avatar */}
      <PreviewCard
        title="Chips with Avatar"
        description={`Display avatars for user or entity representation. Import the Avatar component from "andhera-react".

avatar?: ReactNode`}
        code={`import { Chip, Avatar } from "andhera-react";

<Chip 
  label="John Doe" 
  avatar={<Avatar initials="JD" bgColor="#3b82f6" size="xs" />} 
  variant="soft" 
  color="primary" 
/>
<Chip 
  label="Jane Smith" 
  avatar={<Avatar initials="JS" bgColor="#8b5cf6" size="xs" />} 
  variant="soft" 
  color="secondary" 
/>
<Chip 
  label="Bob Wilson" 
  avatar={<Avatar initials="BW" bgColor="#22c55e" size="xs" />} 
  variant="outlined" 
  color="success" 
/>`}
      >
        <div className="flex gap-4 items-center justify-center flex-wrap md:gap-6">
          <Chip label="John Doe" avatar={<Avatar initials="JD" bgColor="#3b82f6" size="xs" />} variant="soft" color="primary" />
          <Chip label="Jane Smith" avatar={<Avatar initials="JS" bgColor="#8b5cf6" size="xs" />} variant="soft" color="secondary" />
          <Chip label="Bob Wilson" avatar={<Avatar initials="BW" bgColor="#22c55e" size="xs" />} variant="outlined" color="success" />
        </div>
      </PreviewCard>

      {/* 10. Removable Chips */}
      <PreviewCard
        title="Removable Chips"
        description={`Chips that can be removed with a close button.

removable?: boolean
onRemove?: (event: MouseEvent) => void`}
        code={`const [chips, setChips] = useState(['React', 'TypeScript', 'Tailwind', 'Node.js']);

{chips.map(chip => (
  <Chip
    key={chip}
    label={chip}
    removable
    onRemove={() => setChips(chips.filter(c => c !== chip))}
    color="primary"
    variant="soft"
  />
))}`}
      >
        <div className="flex gap-4 items-center justify-center flex-wrap md:gap-6">
          {chips.map(chip => (
            <Chip
              key={chip}
              label={chip}
              removable
              onRemove={() => handleRemoveChip(chip)}
              color="primary"
              variant="soft"
            />
          ))}
          {chips.length === 0 && (
            <button
              onClick={() => setChips(['React', 'TypeScript', 'Tailwind', 'Node.js'])}
              className="text-sm text-blue-500 hover:underline"
            >
              Reset chips
            </button>
          )}
        </div>
      </PreviewCard>

      {/* 11. Selectable Chips */}
      <PreviewCard
        title="Selectable Chips"
        description={`Chips that can be selected/deselected with visual feedback.

selectable?: boolean
selected?: boolean
onSelectionChange?: (selected: boolean) => void`}
        code={`const [selected, setSelected] = useState(false);

<Chip
  label="Click to Select"
  selectable
  selected={selected}
  onSelectionChange={setSelected}
  color="primary"
/>`}
      >
        <div className="flex gap-4 items-center justify-center flex-wrap md:gap-6">
          <Chip
            label="Click to Select"
            selectable
            selected={selected1}
            onSelectionChange={setSelected1}
            color="primary"
          />
          <Chip
            label="Pre-selected"
            selectable
            selected={selected2}
            onSelectionChange={setSelected2}
            color="success"
          />
          <Chip
            label="Outlined Selectable"
            selectable
            selected={selected3}
            onSelectionChange={setSelected3}
            color="secondary"
            variant="outlined"
          />
        </div>
      </PreviewCard>

      {/* 12. Clickable Chips */}
      <PreviewCard
        title="Clickable Chips"
        description={`Non-selectable chips that respond to clicks (e.g., for navigation).

clickable?: boolean
onClick?: (event: MouseEvent) => void`}
        code={`<Chip
  label="Click Me"
  clickable
  onClick={() => alert('Chip clicked!')}
  color="info"
/>
<Chip
  label="Navigate"
  clickable
  onClick={() => console.log('Navigation')}
  color="primary"
  variant="outlined"
/>`}
      >
        <div className="flex gap-4 items-center justify-center flex-wrap md:gap-6">
          <Chip
            label="Click Me"
            clickable
            onClick={() => alert('Chip clicked!')}
            color="info"
          />
          <Chip
            label="Navigate"
            clickable
            onClick={() => console.log('Navigation chip clicked')}
            color="primary"
            variant="outlined"
          />
        </div>
      </PreviewCard>

      {/* 13. Loading State */}
      <PreviewCard
        title="Loading State"
        description={`Show a loading spinner for async operations.

loading?: boolean
loadingText?: string`}
        code={`<Chip label="Loading..." loading color="primary" />
<Chip label="Saving" loading loadingText="Saving..." color="success" />
<Chip
  label="Click to Load"
  loading={isLoading}
  loadingText="Processing..."
  clickable
  onClick={handleLoad}
  color="info"
/>`}
      >
        <div className="flex gap-4 items-center justify-center flex-wrap md:gap-6">
          <Chip label="Loading..." loading color="primary" />
          <Chip label="Saving" loading loadingText="Saving..." color="success" />
          <Chip
            label={loading1 ? 'Processing' : 'Click to Load'}
            loading={loading1}
            loadingText="Processing..."
            clickable
            onClick={handleLoadingDemo}
            color="info"
          />
        </div>
      </PreviewCard>

      {/* 14. Disabled State */}
      <PreviewCard
        title="Disabled State"
        description={`Disabled chips with reduced opacity and no interactions.

disabled?: boolean`}
        code={`<Chip label="Disabled Filled" disabled color="primary" />
<Chip label="Disabled Outlined" disabled variant="outlined" color="primary" />
<Chip label="Disabled Soft" disabled variant="soft" color="success" />
<Chip label="Disabled Removable" disabled removable color="error" />`}
      >
        <div className="flex gap-4 items-center justify-center flex-wrap md:gap-6">
          <Chip label="Disabled Filled" disabled color="primary" />
          <Chip label="Disabled Outlined" disabled variant="outlined" color="primary" />
          <Chip label="Disabled Soft" disabled variant="soft" color="success" />
          <Chip label="Disabled Removable" disabled removable color="error" />
        </div>
      </PreviewCard>

      {/* 15. Custom Colors */}
      <PreviewCard
        title="Custom Colors"
        description={`Use any custom colors for complete flexibility.

backgroundColor?: string
textColor?: string
borderColor?: string`}
        code={`<Chip
  label="Custom Pink"
  backgroundColor="#ec4899"
  textColor="#ffffff"
/>
<Chip
  label="Custom Teal"
  backgroundColor="#14b8a6"
  textColor="#ffffff"
/>
<Chip
  label="Custom Border"
  variant="outlined"
  textColor="#f97316"
  borderColor="#f97316"
/>`}
      >
        <div className="flex gap-4 items-center justify-center flex-wrap md:gap-6">
          <Chip
            label="Custom Pink"
            backgroundColor="#ec4899"
            textColor="#ffffff"
          />
          <Chip
            label="Custom Teal"
            backgroundColor="#14b8a6"
            textColor="#ffffff"
          />
          <Chip
            label="Gradient-like"
            backgroundColor="#7c3aed"
            textColor="#fef3c7"
          />
          <Chip
            label="Custom Border"
            variant="outlined"
            textColor="#f97316"
            borderColor="#f97316"
          />
        </div>
      </PreviewCard>

      {/* 16. Selected Custom Colors */}
      <PreviewCard
        title="Selected State Custom Colors"
        description={`Different colors for selected and unselected states.

selectedBackgroundColor?: string
selectedTextColor?: string`}
        code={`<Chip
  label="Red"
  selectable
  selected={selectedColors.includes('Red')}
  onSelectionChange={(sel) => toggleColor('Red', sel)}
  backgroundColor="#e5e7eb"
  textColor="#374151"
  selectedBackgroundColor="#ef4444"
  selectedTextColor="#ffffff"
/>`}
      >
        <div className="flex gap-4 items-center justify-center flex-wrap md:gap-6">
          {['Red', 'Green', 'Blue'].map(color => (
            <Chip
              key={color}
              label={color}
              selectable
              selected={selectedColors.includes(color)}
              onSelectionChange={(sel) => {
                setSelectedColors(prev => 
                  sel ? [...prev, color] : prev.filter(c => c !== color)
                );
              }}
              backgroundColor="#e5e7eb"
              textColor="#374151"
              selectedBackgroundColor={
                color === 'Red' ? '#ef4444' : 
                color === 'Green' ? '#22c55e' : '#3b82f6'
              }
              selectedTextColor="#ffffff"
            />
          ))}
        </div>
      </PreviewCard>

      {/* 17. Animation Control */}
      <PreviewCard
        title="Animation Control"
        description={`Disable hover and transition animations for a static appearance.

animated?: boolean (default: true)`}
        code={`<Chip label="Animated (default)" clickable color="primary" />
<Chip label="Not Animated" clickable animated={false} color="primary" />`}
      >
        <div className="flex gap-4 items-center justify-center flex-wrap md:gap-6">
          <Chip label="Animated (default)" clickable color="primary" />
          <Chip label="Not Animated" clickable animated={false} color="primary" />
        </div>
      </PreviewCard>

      {/* 18. Custom Checkmark */}
      <PreviewCard
        title="Custom Checkmark"
        description={`Customize or hide the checkmark shown when selected.

showCheckmark?: boolean (default: true)
checkmarkIcon?: ReactNode`}
        code={`<Chip label="With Checkmark" selectable selected showCheckmark color="success" />
<Chip label="No Checkmark" selectable selected showCheckmark={false} color="success" />
<Chip label="Custom ✓" selectable selected checkmarkIcon={<span>✓</span>} color="primary" />`}
      >
        <div className="flex gap-4 items-center justify-center flex-wrap md:gap-6">
          <Chip label="With Checkmark" selectable selected showCheckmark color="success" />
          <Chip label="No Checkmark" selectable selected showCheckmark={false} color="success" />
          <Chip label="Custom ✓" selectable selected checkmarkIcon={<span className="text-xs">✓</span>} color="primary" />
        </div>
      </PreviewCard>

      {/* 19. Custom Remove Icon */}
      <PreviewCard
        title="Custom Remove Icon"
        description={`Replace the default close icon with a custom one. You can use icons from "andhera-react/icons".

removeIcon?: ReactNode`}
        code={`import { Trash } from "andhera-react/icons";

<Chip label="Default Icon" removable onRemove={() => {}} color="error" />
<Chip 
  label="Custom ×" 
  removable 
  removeIcon={<span className="text-xs font-bold">×</span>} 
  onRemove={() => {}} 
  color="error" 
/>
<Chip 
  label="Trash Icon" 
  removable 
  removeIcon={<Trash size={12} />} 
  onRemove={() => {}} 
  color="error" 
  variant="soft" 
/>`}
      >
        <div className="flex gap-4 items-center justify-center flex-wrap md:gap-6">
          <Chip label="Default Icon" removable onRemove={() => {}} color="error" />
          <Chip
            label="Custom ×"
            removable
            removeIcon={<span className="text-xs font-bold">×</span>}
            onRemove={() => {}}
            color="error"
          />
          <Chip
            label="Trash Icon"
            removable
            removeIcon={<Trash size={12} />}
            onRemove={() => {}}
            color="error"
            variant="soft"
          />
        </div>
      </PreviewCard>

      {/* 20. ChipGroup Component */}
      <PreviewCard
        title="ChipGroup Component"
        description={`Container for organizing multiple chips with consistent spacing.

spacing?: 'xs' | 'sm' | 'md' | 'lg'
direction?: 'row' | 'column'
wrap?: boolean`}
        code={`<ChipGroup spacing="xs">
  <Chip label="Tag 1" color="primary" size="sm" />
  <Chip label="Tag 2" color="secondary" size="sm" />
  <Chip label="Tag 3" color="success" size="sm" />
</ChipGroup>

<ChipGroup spacing="lg">
  <Chip label="Tag 1" color="primary" />
  <Chip label="Tag 2" color="secondary" />
</ChipGroup>

<ChipGroup direction="column" spacing="sm">
  <Chip label="Vertical 1" color="info" />
  <Chip label="Vertical 2" color="warning" />
</ChipGroup>`}
      >
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-2">spacing="xs"</p>
            <ChipGroup spacing="xs">
              <Chip label="Tag 1" color="primary" size="sm" />
              <Chip label="Tag 2" color="secondary" size="sm" />
              <Chip label="Tag 3" color="success" size="sm" />
            </ChipGroup>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-2">spacing="lg"</p>
            <ChipGroup spacing="lg">
              <Chip label="Tag 1" color="primary" />
              <Chip label="Tag 2" color="secondary" />
              <Chip label="Tag 3" color="success" />
            </ChipGroup>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-2">direction="column"</p>
            <ChipGroup direction="column" spacing="sm">
              <Chip label="Vertical 1" color="info" />
              <Chip label="Vertical 2" color="warning" />
              <Chip label="Vertical 3" color="error" />
            </ChipGroup>
          </div>
        </div>
      </PreviewCard>

      {/* 21. Tag Selection (Multi-select) */}
      <PreviewCard
        title="Tag Selection (Multi-select)"
        description={`Select multiple tags from a group. Common use case for technology stack selectors.

Example: Technology stack selector`}
        code={`const [selectedTags, setSelectedTags] = useState(['react', 'typescript']);

const toggleTag = (tag) => {
  setSelectedTags(prev => 
    prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
  );
};

{tags.map(tag => (
  <Chip
    key={tag}
    label={tag}
    selectable
    selected={selectedTags.includes(tag)}
    onSelectionChange={() => toggleTag(tag)}
    color="primary"
    variant={selectedTags.includes(tag) ? 'filled' : 'outlined'}
  />
))}`}
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2 justify-center">
            {['react', 'typescript', 'javascript', 'nodejs', 'python', 'go'].map(tag => (
              <Chip
                key={tag}
                label={tag}
                selectable
                selected={selectedTags.includes(tag)}
                onSelectionChange={() => toggleTag(tag)}
                color="primary"
                variant={selectedTags.includes(tag) ? 'filled' : 'outlined'}
              />
            ))}
          </div>
          <p className="text-xs text-gray-500 text-center">
            Selected: {selectedTags.join(', ') || 'None'}
          </p>
        </div>
      </PreviewCard>

      {/* 22. Filter Chips */}
      <PreviewCard
        title="Filter Chips"
        description={`Filter-style chips for data filtering UI with "All" option reset.

Example: Category filter with "All" option`}
        code={`const [selectedFilters, setSelectedFilters] = useState(['All']);

const toggleFilter = (filter) => {
  if (filter === 'All') {
    setSelectedFilters(['All']);
  } else {
    const newFilters = selectedFilters.includes(filter)
      ? selectedFilters.filter(f => f !== filter)
      : [...selectedFilters.filter(f => f !== 'All'), filter];
    setSelectedFilters(newFilters.length ? newFilters : ['All']);
  }
};`}
      >
        <div className="flex flex-wrap gap-2 justify-center">
          {['All', 'Electronics', 'Clothing', 'Books', 'Sports'].map(filter => (
            <Chip
              key={filter}
              label={filter}
              selectable
              selected={selectedFilters.includes(filter)}
              onSelectionChange={() => toggleFilter(filter)}
              color={selectedFilters.includes(filter) ? 'primary' : 'default'}
              variant="soft"
              icon={selectedFilters.includes(filter) ? <CheckIcon /> : undefined}
              showCheckmark={false}
            />
          ))}
        </div>
      </PreviewCard>

      {/* 23. Size Selector */}
      <PreviewCard
        title="Size Selector"
        description={`Product size selector pattern with single selection.

Example: Clothing size selection`}
        code={`const [selectedSize, setSelectedSize] = useState('M');

{sizes.map(size => (
  <Chip
    key={size}
    label={size}
    selectable
    selected={selectedSize === size}
    onSelectionChange={(sel) => sel && setSelectedSize(size)}
    color={selectedSize === size ? 'primary' : 'default'}
    variant={selectedSize === size ? 'filled' : 'outlined'}
    radius="md"
    size="lg"
  />
))}`}
      >
        <div className="flex flex-wrap gap-2 justify-center">
          {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
            <Chip
              key={size}
              label={size}
              selectable
              selected={selectedSizes.includes(size)}
              onSelectionChange={(sel) => {
                setSelectedSizes(sel ? [size] : []);
              }}
              color={selectedSizes.includes(size) ? 'primary' : 'default'}
              variant={selectedSizes.includes(size) ? 'filled' : 'outlined'}
              radius="md"
              size="lg"
            />
          ))}
        </div>
      </PreviewCard>

      {/* 24. Status Badges */}
      <PreviewCard
        title="Status Badges"
        description={`Display status indicators with appropriate colors.

Example: Order/task status indicators`}
        code={`<Chip label="Pending" color="warning" variant="soft" size="sm" />
<Chip label="In Progress" color="info" variant="soft" size="sm" />
<Chip label="Completed" color="success" variant="soft" size="sm" />
<Chip label="Cancelled" color="error" variant="soft" size="sm" />
<Chip label="On Hold" color="default" variant="soft" size="sm" />`}
      >
        <div className="flex flex-wrap gap-3 justify-center">
          <Chip label="Pending" color="warning" variant="soft" size="sm" />
          <Chip label="In Progress" color="info" variant="soft" size="sm" />
          <Chip label="Completed" color="success" variant="soft" size="sm" />
          <Chip label="Cancelled" color="error" variant="soft" size="sm" />
          <Chip label="On Hold" color="default" variant="soft" size="sm" />
        </div>
      </PreviewCard>

      {/* 25. User Mentions */}
      <PreviewCard
        title="User Mentions"
        description={`Mention users with avatars and remove capability.

Example: Team member mentions in comments`}
        code={`import { Chip, Avatar } from "andhera-react";

<Chip
  label="@johndoe"
  avatar={<Avatar initials="JD" bgColor="#3b82f6" size="xs" />}
  removable
  variant="soft"
  color="primary"
  onRemove={() => {}}
/>
<Chip
  label="@janesmith"
  avatar={<Avatar initials="JS" bgColor="#8b5cf6" size="xs" />}
  removable
  variant="soft"
  color="secondary"
  onRemove={() => {}}
/>`}
      >
        <div className="flex flex-wrap gap-2 justify-center">
          <Chip
            label="@johndoe"
            avatar={<Avatar initials="JD" bgColor="#3b82f6" size="xs" />}
            removable
            variant="soft"
            color="primary"
            onRemove={() => {}}
          />
          <Chip
            label="@janesmith"
            avatar={<Avatar initials="JS" bgColor="#8b5cf6" size="xs" />}
            removable
            variant="soft"
            color="secondary"
            onRemove={() => {}}
          />
          <Chip
            label="@bobwilson"
            avatar={<Avatar initials="BW" bgColor="#22c55e" size="xs" />}
            removable
            variant="soft"
            color="success"
            onRemove={() => {}}
          />
        </div>
      </PreviewCard>

      {/* 26. Accessibility */}
      <PreviewCard
        title="Accessibility"
        description={`Chips with proper ARIA attributes for screen readers. Keyboard navigable with Tab, Space/Enter to interact.

aria-label?: string
data-testid?: string
role: 'checkbox' | 'button' | 'status' (automatic)`}
        code={`<Chip
  label="Accessible Chip"
  aria-label="Status: Active"
  data-testid="status-chip"
  color="success"
/>
<Chip
  label="Keyboard Navigable"
  selectable
  aria-label="Select this option"
  data-testid="selectable-chip"
  color="primary"
/>`}
      >
        <div className="flex flex-wrap gap-3 justify-center">
          <Chip
            label="Accessible Chip"
            aria-label="Status: Active"
            data-testid="status-chip"
            color="success"
          />
          <Chip
            label="Keyboard Navigable"
            selectable
            aria-label="Select this option"
            data-testid="selectable-chip"
            color="primary"
          />
          <Chip
            label="Screen Reader Friendly"
            removable
            aria-label="Remove this tag"
            data-testid="removable-chip"
            color="info"
            onRemove={() => {}}
          />
        </div>
      </PreviewCard>

      {/* Props Reference */}
      <PropsReference />
    </div>
  );
}

function PropsReference() {
  return (
    <div className="w-full flex flex-col gap-8">
      {/* Chip Props */}
      <div className="w-full bg-white/[0.04] border border-[#364153] rounded-2xl p-6 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="font-manrope text-xl font-semibold m-0 text-white">
            Chip Props
          </h3>
          <p className="m-0 text-[#AEB6C4] text-sm leading-relaxed">
            Chip is a versatile tag component with support for multiple sizes, variants, colors, icons, avatars, 
            loading states, selection, and removal. Perfect for filters, tags, user mentions, and status indicators.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[640px] font-manrope text-sm text-[#E3E6F2]">
            <thead>
              <tr>
                {[
                  { label: "PROP", width: "18%" },
                  { label: "TYPE", width: "24%" },
                  { label: "DEFAULT", width: "12%" },
                  { label: "DESCRIPTION", width: "46%" },
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

      {/* ChipGroup Props */}
      <div className="w-full bg-white/[0.04] border border-[#364153] rounded-2xl p-6 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="font-manrope text-xl font-semibold m-0 text-white">
            ChipGroup Props
          </h3>
          <p className="m-0 text-[#AEB6C4] text-sm leading-relaxed">
            ChipGroup is a container component for organizing multiple chips with consistent spacing and layout.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[640px] font-manrope text-sm text-[#E3E6F2]">
            <thead>
              <tr>
                {[
                  { label: "PROP", width: "18%" },
                  { label: "TYPE", width: "24%" },
                  { label: "DEFAULT", width: "12%" },
                  { label: "DESCRIPTION", width: "46%" },
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
              {chipGroupPropDefinitions.map((prop) => (
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
    </div>
  );
}

export default ChipPreview;
