import { useState } from "react";
import { Dropdown } from "../../../src/components/dropdown/Dropdown";
import { PreviewCard } from "../components/PreviewCard";

/**
 * PropDefinition Interface for Props Reference
 */
interface PropDefinition {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
}

/**
 * Comprehensive Dropdown Props Definition
 * Organized by category for better readability
 */
const propDefinitions: PropDefinition[] = [
  // Core Props
  { name: "data", type: "DropdownOption[]", defaultValue: "-", description: "Array of dropdown options (legacy prop)." },
  { name: "options", type: "DropdownOption[]", defaultValue: "-", description: "Array of dropdown options." },
  { name: "value", type: "string | number | string[] | number[] | null", defaultValue: "-", description: "Controlled value of the dropdown." },
  { name: "onChange", type: "(value: any) => void", defaultValue: "-", description: "Callback fired when selection changes." },
  { name: "defaultValue", type: "string | number | string[] | number[] | null", defaultValue: "-", description: "Default uncontrolled value." },
  { name: "placeholder", type: "string", defaultValue: '"Select an option"', description: "Placeholder text when no value is selected." },
  { name: "multiple", type: "boolean", defaultValue: "false", description: "Allow multiple selections." },
  { name: "disabled", type: "boolean", defaultValue: "false", description: "Disable the dropdown." },
  { name: "readOnly", type: "boolean", defaultValue: "false", description: "Make dropdown read-only (value displayed but not editable)." },
  { name: "clearable", type: "boolean", defaultValue: "false", description: "Show clear button to reset selection." },
  { name: "name", type: "string", defaultValue: "-", description: "Name attribute for form submission." },
  { name: "required", type: "boolean", defaultValue: "false", description: "Mark field as required." },
  
  // Opening & Closing
  { name: "openingDirection", type: '"up" | "down" | "auto"', defaultValue: '"down"', description: "Direction in which menu opens." },
  { name: "closeOnSelect", type: "boolean", defaultValue: "true", description: "Auto-close menu after selection." },
  { name: "open", type: "boolean", defaultValue: "-", description: "Controlled open state." },
  { name: "defaultOpen", type: "boolean", defaultValue: "false", description: "Default open state for uncontrolled mode." },
  { name: "onOpen", type: "() => void", defaultValue: "-", description: "Callback fired when menu opens." },
  { name: "onClose", type: "() => void", defaultValue: "-", description: "Callback fired when menu closes." },
  { name: "openOnFocus", type: "boolean", defaultValue: "false", description: "Open menu when dropdown receives focus." },
  
  // Search & Filter
  { name: "searchable", type: "boolean", defaultValue: "false", description: "Enable search/filter functionality." },
  { name: "searchValue", type: "string", defaultValue: "-", description: "Controlled search value." },
  { name: "defaultSearchValue", type: "string", defaultValue: '""', description: "Default search value." },
  { name: "filterOption", type: "(option: DropdownOption, search: string) => boolean", defaultValue: "-", description: "Custom filter function." },
  { name: "debounceTime", type: "number", defaultValue: "300", description: "Debounce delay for search in ms." },
  { name: "minSearchLength", type: "number", defaultValue: "0", description: "Minimum characters before filtering." },
  { name: "highlightSearch", type: "boolean", defaultValue: "false", description: "Highlight search matches in options." },
  { name: "caseSensitiveSearch", type: "boolean", defaultValue: "false", description: "Make search case-sensitive." },
  { name: "onInputChange", type: "(value: string) => void", defaultValue: "-", description: "Callback fired when search input changes." },
  { name: "onSearch", type: "(search: string) => void", defaultValue: "-", description: "Callback fired when user searches." },
  
  // Option Structure
  { name: "labelKey", type: "string", defaultValue: '"label"', description: "Object key to use for option label." },
  { name: "valueKey", type: "string", defaultValue: '"value"', description: "Object key to use for option value." },
  { name: "groupBy", type: "string", defaultValue: "-", description: "Group options by this field." },
  { name: "groupLabel", type: "(groupName: string) => React.ReactNode", defaultValue: "-", description: "Custom group label renderer." },
  { name: "optionDisabled", type: "(option: DropdownOption) => boolean", defaultValue: "-", description: "Function to determine if option is disabled." },
  { name: "isOptionSelected", type: "(option: DropdownOption) => boolean", defaultValue: "-", description: "Custom function to check if option is selected." },
  { name: "isOptionEqualToValue", type: "(option: DropdownOption, value: any) => boolean", defaultValue: "-", description: "Custom equality check for options." },
  
  // Async / Remote Data
  { name: "async", type: "boolean", defaultValue: "false", description: "Enable async data loading." },
  { name: "loadOptions", type: "(search: string) => Promise<DropdownOption[]>", defaultValue: "-", description: "Function to load options asynchronously." },
  { name: "loadOnMount", type: "boolean", defaultValue: "false", description: "Load options when component mounts." },
  { name: "loadOnSearch", type: "boolean", defaultValue: "false", description: "Load options when user types." },
  { name: "loading", type: "boolean", defaultValue: "false", description: "Show loading state." },
  { name: "loadingText", type: "string", defaultValue: '"Loading..."', description: "Text to display while loading." },
  { name: "noOptionsText", type: "string", defaultValue: '"No options available"', description: "Text when no options available." },
  { name: "fetchDelay", type: "number", defaultValue: "0", description: "Delay before fetching in ms." },
  { name: "serverSearch", type: "boolean", defaultValue: "false", description: "Perform search on server instead of client." },
  
  // Multi-Select
  { name: "maxSelected", type: "number", defaultValue: "-", description: "Maximum number of selections allowed." },
  { name: "hideSelectedOptions", type: "boolean", defaultValue: "false", description: "Hide selected options from list." },
  { name: "deselectOnBackspace", type: "boolean", defaultValue: "true", description: "Remove last selection on backspace." },
  { name: "selectAll", type: "boolean", defaultValue: "false", description: "Show 'Select All' option." },
  { name: "selectAllLabel", type: "string", defaultValue: '"Select All"', description: "Label for select all option." },
  { name: "showCheckboxes", type: "boolean", defaultValue: "false", description: "Show checkboxes for multi-select." },
  { name: "chipVariant", type: '"filled" | "outlined"', defaultValue: '"filled"', description: "Style of chips for selected items." },
  { name: "renderTag", type: "(option: DropdownOption) => React.ReactNode", defaultValue: "-", description: "Custom renderer for selected tags." },
  { name: "tagLimit", type: "number", defaultValue: "-", description: "Maximum number of tags to display." },
  { name: "tagEllipsisText", type: "string", defaultValue: '"..."', description: "Text to show when tags are truncated." },
  
  // Creatable
  { name: "creatable", type: "boolean", defaultValue: "false", description: "Allow creating new options." },
  { name: "isValidNewOption", type: "(input: string) => boolean", defaultValue: "(input) => input.trim().length > 0", description: "Validate new option before creating." },
  { name: "newOptionLabel", type: "(input: string) => string", defaultValue: '(input) => `Create "${input}"`', description: "Format label for new option." },
  { name: "onCreateOption", type: "(input: string) => void", defaultValue: "-", description: "Callback when new option is created." },
  { name: "createOnBlur", type: "boolean", defaultValue: "false", description: "Create option when focus is lost." },
  
  // Base Styling
  { name: "className", type: "string", defaultValue: '""', description: "Custom CSS class for root element." },
  { name: "style", type: "React.CSSProperties", defaultValue: "-", description: "Inline styles for root element." },
  { name: "dropdownClassName", type: "string", defaultValue: "-", description: "Custom CSS class for dropdown menu." },
  { name: "optionClassName", type: "string", defaultValue: "-", description: "Custom CSS class for options." },
  { name: "controlClassName", type: "string", defaultValue: "-", description: "Custom CSS class for control element." },
  { name: "valueClassName", type: "string", defaultValue: "-", description: "Custom CSS class for displayed value." },
  { name: "placeholderClassName", type: "string", defaultValue: "-", description: "Custom CSS class for placeholder." },
  { name: "iconClassName", type: "string", defaultValue: "-", description: "Custom CSS class for icons." },
  { name: "variant", type: '"outlined" | "filled" | "standard" | "error" | "success" | "warning"', defaultValue: '"outlined"', description: "Visual style variant." },
  { name: "color", type: '"primary" | "secondary" | "success" | "error" | "warning" | "info"', defaultValue: '"primary"', description: "Color theme." },
  { name: "size", type: '"small" | "medium" | "large"', defaultValue: '"medium"', description: "Size variant." },
  { name: "shape", type: '"round" | "square" | "rounded"', defaultValue: '"rounded"', description: "Border radius style." },
  { name: "fullWidth", type: "boolean", defaultValue: "false", description: "Expand to full width of container." },
  { name: "width", type: "number | string", defaultValue: "-", description: "Custom width for dropdown." },
  { name: "menuWidth", type: "number | string", defaultValue: "-", description: "Custom width for menu." },
  { name: "menuHeight", type: "number | string", defaultValue: '"240px"', description: "Maximum height for menu." },
  { name: "elevation", type: "number", defaultValue: "2", description: "Shadow elevation level." },
  
  // Advanced Styling
  { name: "triggerStyle", type: "React.CSSProperties", defaultValue: "-", description: "Custom inline styles for trigger/control element." },
  { name: "menuStyle", type: "React.CSSProperties", defaultValue: "-", description: "Custom inline styles for dropdown menu." },
  { name: "valueStyle", type: "React.CSSProperties", defaultValue: "-", description: "Custom inline styles for selected value text." },
  { name: "placeholderStyle", type: "React.CSSProperties", defaultValue: "-", description: "Custom inline styles for placeholder text." },
  { name: "optionStyle", type: "React.CSSProperties", defaultValue: "-", description: "Custom inline styles for all options." },
  { name: "selectedOptionStyle", type: "React.CSSProperties", defaultValue: "-", description: "Custom inline styles for selected options." },
  { name: "selectedOptionClassName", type: "string", defaultValue: "-", description: "Custom CSS class for selected options." },
  { name: "focusedOptionStyle", type: "React.CSSProperties", defaultValue: "-", description: "Custom inline styles for focused/highlighted options." },
  { name: "focusedOptionClassName", type: "string", defaultValue: "-", description: "Custom CSS class for focused/highlighted options." },
  
  // Icons
  { name: "icon", type: "React.ReactNode", defaultValue: "-", description: "Leading icon element." },
  { name: "dropdownIcon", type: "React.ReactNode", defaultValue: "-", description: "Custom dropdown arrow icon." },
  { name: "clearIcon", type: "React.ReactNode", defaultValue: "-", description: "Custom clear button icon." },
  { name: "loadingIcon", type: "React.ReactNode", defaultValue: "-", description: "Custom loading spinner icon." },
  { name: "selectedIcon", type: "React.ReactNode", defaultValue: "-", description: "Icon shown for selected options." },
  { name: "expandIconPosition", type: '"left" | "right"', defaultValue: '"right"', description: "Position of expand icon." },
  
  // Custom Renderers
  { name: "renderOption", type: "(option: DropdownOption, state: any) => React.ReactNode", defaultValue: "-", description: "Custom option renderer." },
  { name: "renderGroup", type: "(groupLabel: string, options: DropdownOption[]) => React.ReactNode", defaultValue: "-", description: "Custom group renderer." },
  { name: "renderValue", type: "(selected: any) => React.ReactNode", defaultValue: "-", description: "Custom selected value renderer." },
  { name: "renderPlaceholder", type: "() => React.ReactNode", defaultValue: "-", description: "Custom placeholder renderer." },
  { name: "renderMenu", type: "(children: React.ReactNode) => React.ReactNode", defaultValue: "-", description: "Custom menu container renderer." },
  { name: "renderFooter", type: "() => React.ReactNode", defaultValue: "-", description: "Custom footer renderer for menu." },
  { name: "renderEmpty", type: "() => React.ReactNode", defaultValue: "-", description: "Custom empty state renderer." },
  
  // Keyboard Navigation
  { name: "keyboardNavigation", type: "boolean", defaultValue: "true", description: "Enable keyboard navigation." },
  { name: "pageSize", type: "number", defaultValue: "10", description: "Number of items to jump on page up/down." },
  { name: "homeEndNavigation", type: "boolean", defaultValue: "true", description: "Enable Home/End key navigation." },
  { name: "arrowScrollBehavior", type: '"smooth" | "auto"', defaultValue: '"smooth"', description: "Scroll behavior for arrow keys." },
  { name: "autoFocus", type: "boolean", defaultValue: "false", description: "Auto-focus on mount." },
  { name: "autoHighlight", type: "boolean", defaultValue: "false", description: "Auto-highlight first option." },
  { name: "tabIndex", type: "number", defaultValue: "0", description: "Tab index for focus order." },
  
  // Portal & Layering
  { name: "portal", type: "boolean", defaultValue: "false", description: "Render menu in portal." },
  { name: "portalContainer", type: "HTMLElement", defaultValue: "-", description: "Container element for portal." },
  { name: "zIndex", type: "number", defaultValue: "1000", description: "Z-index for menu." },
  { name: "disablePortal", type: "boolean", defaultValue: "false", description: "Disable portal rendering." },
  
  // Animation
  { name: "animation", type: '"fade" | "slide" | "scale" | "none"', defaultValue: '"fade"', description: "Menu open/close animation." },
  { name: "animationDuration", type: "number", defaultValue: "200", description: "Animation duration in ms." },
  
  // Accessibility
  { name: "ariaLabel", type: "string", defaultValue: "-", description: "ARIA label for dropdown." },
  { name: "ariaDescribedBy", type: "string", defaultValue: "-", description: "ID of element describing dropdown." },
  { name: "ariaInvalid", type: "boolean", defaultValue: "-", description: "ARIA invalid state." },
  { name: "ariaDisabled", type: "boolean", defaultValue: "-", description: "ARIA disabled state." },
  { name: "role", type: "string", defaultValue: '"combobox"', description: "ARIA role." },
  { name: "optionRole", type: "string", defaultValue: '"option"', description: "ARIA role for options." },
  { name: "id", type: "string", defaultValue: "-", description: "HTML id attribute." },
  
  // Events
  { name: "onSelect", type: "(option: DropdownOption) => void", defaultValue: "-", description: "Callback when option is selected." },
  { name: "onDeselect", type: "(option: DropdownOption) => void", defaultValue: "-", description: "Callback when option is deselected." },
  { name: "onMenuOpen", type: "() => void", defaultValue: "-", description: "Callback when menu opens." },
  { name: "onMenuClose", type: "() => void", defaultValue: "-", description: "Callback when menu closes." },
  { name: "onFocus", type: "(event: React.FocusEvent) => void", defaultValue: "-", description: "Callback when dropdown receives focus." },
  { name: "onBlur", type: "(event: React.FocusEvent) => void", defaultValue: "-", description: "Callback when dropdown loses focus." },
  { name: "onHighlight", type: "(option: DropdownOption) => void", defaultValue: "-", description: "Callback when option is highlighted." },
  { name: "onScroll", type: "(event: React.UIEvent) => void", defaultValue: "-", description: "Callback when menu is scrolled." },
  { name: "onClear", type: "() => void", defaultValue: "-", description: "Callback when clear button is clicked." },
  
  // Virtualization
  { name: "virtualized", type: "boolean", defaultValue: "false", description: "Enable virtualization for large lists." },
  { name: "itemHeight", type: "number", defaultValue: "40", description: "Height of each item for virtualization." },
  { name: "overscan", type: "number", defaultValue: "5", description: "Number of items to render outside viewport." },
  
  // Labels & Helpers
  { name: "label", type: "string", defaultValue: "-", description: "Label text above dropdown." },
  { name: "helperText", type: "string", defaultValue: "-", description: "Helper text below dropdown." },
  
  // Utility
  { name: "optionProps", type: "(option: DropdownOption) => object", defaultValue: "-", description: "Get props for each option." },
  { name: "valueProps", type: "(value: any) => object", defaultValue: "-", description: "Get props for value element." },
  { name: "data-testid", type: "string", defaultValue: "-", description: "Test ID for testing libraries." },
  { name: "debug", type: "boolean", defaultValue: "false", description: "Enable debug mode." },
];

const sampleOptions = [
  { id: 1, label: "React", value: "react" },
  { id: 2, label: "Vue", value: "vue" },
  { id: 3, label: "Angular", value: "angular" },
  { id: 4, label: "Svelte", value: "svelte" },
  { id: 5, label: "Next.js", value: "nextjs" },
];

const countries = [
  { id: 1, label: "United States", value: "us", group: "North America" },
  { id: 2, label: "Canada", value: "ca", group: "North America" },
  { id: 3, label: "Mexico", value: "mx", group: "North America" },
  { id: 4, label: "United Kingdom", value: "uk", group: "Europe" },
  { id: 5, label: "Germany", value: "de", group: "Europe" },
  { id: 6, label: "France", value: "fr", group: "Europe" },
  { id: 7, label: "Japan", value: "jp", group: "Asia" },
  { id: 8, label: "China", value: "cn", group: "Asia" },
  { id: 9, label: "India", value: "in", group: "Asia" },
];

const users = [
  { id: 1, label: "John Doe", value: "john", disabled: false },
  { id: 2, label: "Jane Smith", value: "jane", disabled: false },
  { id: 3, label: "Bob Wilson", value: "bob", disabled: true },
  { id: 4, label: "Alice Johnson", value: "alice", disabled: false },
  { id: 5, label: "Charlie Brown", value: "charlie", disabled: false },
];

/**
 * DropdownPreview Component
 * Displays all dropdown variants in separate cards
 */
export function DropdownPreview() {
  // State for all dropdowns to properly show selections
  // Section 1: Basic Dropdown
  const [basicSmall, setBasicSmall] = useState<string | null>(null);
  const [basicMedium, setBasicMedium] = useState<string | null>(null);
  const [basicLarge, setBasicLarge] = useState<string | null>(null);
  
  // Section 2: Variants
  const [variantOutlined, setVariantOutlined] = useState<string | null>(null);
  const [variantFilled, setVariantFilled] = useState<string | null>(null);
  const [variantStandard, setVariantStandard] = useState<string | null>(null);
  const [variantError, setVariantError] = useState<string | null>(null);
  const [variantSuccess, setVariantSuccess] = useState<string | null>(null);
  const [variantWarning, setVariantWarning] = useState<string | null>(null);
  
  // Section 3: Colors
  const [colorPrimary, setColorPrimary] = useState<string | null>(null);
  const [colorSecondary, setColorSecondary] = useState<string | null>(null);
  const [colorSuccess, setColorSuccess] = useState<string | null>(null);
  const [colorError, setColorError] = useState<string | null>(null);
  
  // Section 4: Shapes
  const [shapeSquare, setShapeSquare] = useState<string | null>(null);
  const [shapeRounded, setShapeRounded] = useState<string | null>(null);
  const [shapeRound, setShapeRound] = useState<string | null>(null);
  
  // Section 5: Labels & Helper Text
  const [labelFramework, setLabelFramework] = useState<string | null>(null);
  const [labelTech, setLabelTech] = useState<string | null>(null);
  
  // Section 6: Clearable
  const [clearable1, setClearable1] = useState<string | null>('react');
  const [clearable2, setClearable2] = useState<string | null>('vue');
  
  // Section 7: Searchable
  const [searchableCountry, setSearchableCountry] = useState<string | null>(null);
  const [searchableGrouped, setSearchableGrouped] = useState<string | null>(null);
  
  // Section 8: Multi-Select
  const [multiFrameworks, setMultiFrameworks] = useState<string[]>([]);
  const [multiCheckboxes, setMultiCheckboxes] = useState<string[]>([]);
  const [multiLimited, setMultiLimited] = useState<string[]>([]);
  
  // Section 9: Grouped Options
  const [groupedCountry, setGroupedCountry] = useState<string | null>(null);
  const [groupedSearchable, setGroupedSearchable] = useState<string | null>(null);
  
  // Section 10: Disabled Options
  const [disabledUser, setDisabledUser] = useState<string | null>(null);
  const [disabledMulti, setDisabledMulti] = useState<string[]>([]);
  
  // Section 14: Creatable
  const [creatableValue, setCreatableValue] = useState<string | null>(null);
  const [creatableMulti, setCreatableMulti] = useState<string[]>([]);
  
  // Section 15: Full Width
  const [fullWidth1, setFullWidth1] = useState<string | null>(null);
  const [fullWidth2, setFullWidth2] = useState<string | null>(null);
  
  // Section 16: Opening Direction
  const [directionDown, setDirectionDown] = useState<string | null>(null);
  const [directionUp, setDirectionUp] = useState<string | null>(null);
  
  // Section 18: Select All
  const [selectAllFrameworks, setSelectAllFrameworks] = useState<string[]>([]);
  const [selectAllCountries, setSelectAllCountries] = useState<string[]>([]);
  
  // Section 19: Custom Styling
  const [customStyled, setCustomStyled] = useState<string | null>(null);
  const [customWidth, setCustomWidth] = useState<string | null>(null);
  
  // Section 19b: Advanced Styling
  const [advancedBrand, setAdvancedBrand] = useState<string | null>(null);
  const [advancedPurple, setAdvancedPurple] = useState<string | null>(null);
  
  // Section 20: Responsive
  const [responsive1, setResponsive1] = useState<string | null>(null);
  const [responsive2, setResponsive2] = useState<string | null>(null);
  
  // Section 22: Animation
  const [animFade, setAnimFade] = useState<string | null>(null);
  const [animSlide, setAnimSlide] = useState<string | null>(null);
  const [animScale, setAnimScale] = useState<string | null>(null);
  const [animNone, setAnimNone] = useState<string | null>(null);
  
  // Section 25: Menu Configuration
  const [menuWidth, setMenuWidth] = useState<string | null>(null);
  const [menuHeight, setMenuHeight] = useState<string | null>(null);
  const [menuShort, setMenuShort] = useState<string | null>(null);
  
  // Section 26: Search Configuration
  const [searchMin, setSearchMin] = useState<string | null>(null);
  const [searchDebounce, setSearchDebounce] = useState<string | null>(null);
  const [searchCase, setSearchCase] = useState<string | null>(null);
  
  // Section 29: Keyboard Navigation
  const [keyboardNav, setKeyboardNav] = useState<string | null>(null);
  const [autoHighlight, setAutoHighlight] = useState<string | null>(null);
  const [backspaceDeselect, setBackspaceDeselect] = useState<string[]>(['react', 'vue']);
  
  // Section 30: Accessibility
  const [accessibleDropdown, setAccessibleDropdown] = useState<string | null>(null);
  const [requiredField, setRequiredField] = useState<string | null>(null);
  
  // Section 31: Open Behavior
  const [openOnFocus, setOpenOnFocus] = useState<string | null>(null);
  const [keepOpen, setKeepOpen] = useState<string[]>([]);
  
  // Section 33: Hide Selected
  const [hideSelected, setHideSelected] = useState<string[]>([]);
  const [showSelected, setShowSelected] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-8 w-full md:gap-11">
      {/* 1. Basic Dropdown */}
      <PreviewCard
        title="Basic Dropdown"
        description="Simple dropdown with default styling. Shows basic single selection functionality with a clean, modern appearance.

Size: 'small' | 'medium' | 'large'"
        code={`<Dropdown 
  options={sampleOptions} 
  placeholder="Select a framework" 
  value={value}
  onChange={setValue}
  size="small"
/>
<Dropdown 
  options={sampleOptions} 
  placeholder="Select a framework" 
  value={value}
  onChange={setValue}
  size="medium"
/>
<Dropdown 
  options={sampleOptions} 
  placeholder="Select a framework" 
  value={value}
  onChange={setValue}
  size="large"
/>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
          <Dropdown 
            options={sampleOptions} 
            placeholder="Select a framework (Small)" 
            value={basicSmall}
            onChange={setBasicSmall}
            size="small"
            fullWidth
          />
          <Dropdown 
            options={sampleOptions} 
            placeholder="Select a framework (Medium)" 
            value={basicMedium}
            onChange={setBasicMedium}
            size="medium"
            fullWidth
          />
          <div className="sm:col-span-2 flex justify-center">
            <div className="w-full max-w-xs">
              <Dropdown 
                options={sampleOptions} 
                placeholder="Select a framework (Large)" 
                value={basicLarge}
                onChange={setBasicLarge}
                size="large"
                fullWidth
              />
            </div>
          </div>
        </div>
      </PreviewCard>

      {/* 2. Variants */}
      <PreviewCard
        title="Dropdown Variants"
        description="Different visual styles for various use cases. Choose from outlined (default), filled, standard, or status variants like error, success, and warning.

Variant: 'outlined' | 'filled' | 'standard' | 'error' | 'success' | 'warning'"
        code={`<Dropdown 
  options={sampleOptions} 
  placeholder="Outlined (default)" 
  value={value}
  onChange={setValue}
  variant="outlined"
/>
<Dropdown 
  options={sampleOptions} 
  placeholder="Filled variant" 
  value={value}
  onChange={setValue}
  variant="filled"
/>
<Dropdown 
  options={sampleOptions} 
  placeholder="Standard variant" 
  value={value}
  onChange={setValue}
  variant="standard"
/>
<Dropdown 
  options={sampleOptions} 
  placeholder="Error variant" 
  value={value}
  onChange={setValue}
  variant="error"
/>
<Dropdown 
  options={sampleOptions} 
  placeholder="Success variant" 
  value={value}
  onChange={setValue}
  variant="success"
/>
<Dropdown 
  options={sampleOptions} 
  placeholder="Warning variant" 
  value={value}
  onChange={setValue}
  variant="warning"
/>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
          <Dropdown options={sampleOptions} placeholder="Outlined (default)" variant="outlined" value={variantOutlined} onChange={setVariantOutlined} fullWidth />
          <Dropdown options={sampleOptions} placeholder="Filled variant" variant="filled" value={variantFilled} onChange={setVariantFilled} fullWidth />
          <Dropdown options={sampleOptions} placeholder="Standard variant" variant="standard" value={variantStandard} onChange={setVariantStandard} fullWidth />
          <Dropdown options={sampleOptions} placeholder="Error variant" variant="error" value={variantError} onChange={setVariantError} fullWidth />
          <Dropdown options={sampleOptions} placeholder="Success variant" variant="success" value={variantSuccess} onChange={setVariantSuccess} fullWidth />
          <Dropdown options={sampleOptions} placeholder="Warning variant" variant="warning" value={variantWarning} onChange={setVariantWarning} fullWidth />
        </div>
      </PreviewCard>

      {/* 3. Colors */}
      <PreviewCard
        title="Color Themes"
        description="Different color themes to match your design system. Each color provides appropriate hover and focus states.

Color: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'"
        code={`<Dropdown 
  options={sampleOptions} 
  placeholder="Primary color" 
  value={value}
  onChange={setValue}
  color="primary"
/>
<Dropdown 
  options={sampleOptions} 
  placeholder="Secondary color" 
  value={value}
  onChange={setValue}
  color="secondary"
/>
<Dropdown 
  options={sampleOptions} 
  placeholder="Success color" 
  value={value}
  onChange={setValue}
  color="success"
/>
<Dropdown 
  options={sampleOptions} 
  placeholder="Error color" 
  value={value}
  onChange={setValue}
  color="error"
/>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
          <Dropdown options={sampleOptions} placeholder="Primary color" color="primary" value={colorPrimary} onChange={setColorPrimary} fullWidth />
          <Dropdown options={sampleOptions} placeholder="Secondary color" color="secondary" value={colorSecondary} onChange={setColorSecondary} fullWidth />
          <Dropdown options={sampleOptions} placeholder="Success color" color="success" value={colorSuccess} onChange={setColorSuccess} fullWidth />
          <Dropdown options={sampleOptions} placeholder="Error color" color="error" value={colorError} onChange={setColorError} fullWidth />
        </div>
      </PreviewCard>

      {/* 4. Shapes */}
      <PreviewCard
        title="Shape Variants"
        description="Control the border radius and overall shape of the dropdown. Choose from sharp square corners, fully rounded, or the default rounded corners.

Shape: 'square' | 'rounded' | 'round'"
        code={`<Dropdown 
  options={sampleOptions} 
  placeholder="Square shape" 
  value={value}
  onChange={setValue}
  shape="square"
/>
<Dropdown 
  options={sampleOptions} 
  placeholder="Rounded (default)" 
  value={value}
  onChange={setValue}
  shape="rounded"
/>
<Dropdown 
  options={sampleOptions} 
  placeholder="Round shape" 
  value={value}
  onChange={setValue}
  shape="round"
/>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
          <Dropdown options={sampleOptions} placeholder="Square shape" shape="square" value={shapeSquare} onChange={setShapeSquare} fullWidth />
          <Dropdown options={sampleOptions} placeholder="Rounded (default)" shape="rounded" value={shapeRounded} onChange={setShapeRounded} fullWidth />
          <div className="sm:col-span-2 flex justify-center">
            <div className="w-full max-w-xs">
              <Dropdown options={sampleOptions} placeholder="Round shape" shape="round" value={shapeRound} onChange={setShapeRound} fullWidth />
            </div>
          </div>
        </div>
      </PreviewCard>

      {/* 5. With Label & Helper Text */}
      <PreviewCard
        title="Labels & Helper Text"
        description="Add context with labels above the dropdown and helper text below. Helper text can provide instructions or validation messages."
        code={`<Dropdown 
  options={sampleOptions} 
  label="Framework"
  helperText="Choose your preferred frontend framework"
  placeholder="Select a framework"
  value={value}
  onChange={setValue}
  required
/>
<Dropdown 
  options={sampleOptions} 
  label="Technology Stack"
  helperText="This field is required"
  placeholder="Select technology"
  value={value}
  onChange={setValue}
  variant="error"
  required
/>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
          <Dropdown 
            options={sampleOptions} 
            label="Framework"
            helperText="Choose your preferred frontend framework"
            placeholder="Select a framework"
            value={labelFramework}
            onChange={setLabelFramework}
            required
            fullWidth
          />
          <Dropdown 
            options={sampleOptions} 
            label="Technology Stack"
            helperText="This field is required"
            placeholder="Select technology"
            value={labelTech}
            onChange={setLabelTech}
            variant="error"
            required
            fullWidth
          />
        </div>
      </PreviewCard>

      {/* 6. Clearable */}
      <PreviewCard
        title="Clearable Dropdown"
        description="Add a clear button to allow users to reset their selection. Useful for optional fields or when you want to provide an easy way to deselect."
        code={`<Dropdown 
  options={sampleOptions} 
  placeholder="Clearable dropdown" 
  value={value}
  onChange={setValue}
  clearable
  onClear={() => console.log('Cleared!')}
/>
<Dropdown 
  options={sampleOptions} 
  label="Optional Selection"
  helperText="Click the X icon to clear"
  value={value}
  onChange={setValue}
  clearable
/>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
          <Dropdown 
            options={sampleOptions} 
            placeholder="Clearable dropdown" 
            value={clearable1}
            onChange={setClearable1}
            clearable
            onClear={() => console.log('Cleared!')}
            fullWidth
          />
          <Dropdown 
            options={sampleOptions} 
            label="Optional Selection"
            helperText="Click the X icon to clear"
            value={clearable2}
            onChange={setClearable2}
            clearable
            fullWidth
          />
        </div>
      </PreviewCard>

      {/* 7. Searchable */}
      <PreviewCard
        title="Searchable Dropdown"
        description="Enable search functionality to filter through large option lists. Perfect for dropdowns with many options like countries, cities, or product catalogs."
        code={`<Dropdown 
  options={countries} 
  placeholder="Search countries..." 
  value={value}
  onChange={setValue}
  searchable
  label="Country"
/>
<Dropdown 
  options={countries} 
  placeholder="Type to filter..." 
  value={value}
  onChange={setValue}
  searchable
  label="Searchable with Groups"
  groupBy="group"
/>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
          <Dropdown 
            options={countries} 
            placeholder="Search countries..." 
            value={searchableCountry}
            onChange={setSearchableCountry}
            searchable
            label="Country"
            fullWidth
          />
          <Dropdown 
            options={countries} 
            placeholder="Type to filter..." 
            value={searchableGrouped}
            onChange={setSearchableGrouped}
            searchable
            label="Searchable with Groups"
            groupBy="group"
            fullWidth
          />
        </div>
      </PreviewCard>

      {/* 8. Multi-Select */}
      <PreviewCard
        title="Multi-Select Dropdown"
        description="Allow users to select multiple options. Selected items are displayed as comma-separated text or can be customized with chips/tags.

Multiple: boolean"
        code={`<Dropdown 
  options={sampleOptions} 
  placeholder="Select multiple frameworks" 
  multiple
  value={values}
  onChange={setValues}
  label="Frameworks"
/>
<Dropdown 
  options={sampleOptions} 
  placeholder="With checkboxes" 
  multiple
  showCheckboxes
  value={values}
  onChange={setValues}
  label="Select with Checkboxes"
/>
<Dropdown 
  options={sampleOptions} 
  placeholder="Max 2 selections" 
  multiple
  maxSelected={2}
  value={values}
  onChange={setValues}
  label="Limited Selection"
  helperText="You can select up to 2 options"
/>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
          <Dropdown 
            options={sampleOptions} 
            placeholder="Select multiple frameworks" 
            multiple
            value={multiFrameworks}
            onChange={setMultiFrameworks}
            label="Frameworks"
            fullWidth
          />
          <Dropdown 
            options={sampleOptions} 
            placeholder="With checkboxes" 
            multiple
            showCheckboxes
            value={multiCheckboxes}
            onChange={setMultiCheckboxes}
            label="Select with Checkboxes"
            fullWidth
          />
          <div className="sm:col-span-2 flex justify-center">
            <div className="w-full max-w-xs">
              <Dropdown 
                options={sampleOptions} 
                placeholder="Max 2 selections" 
                multiple
                maxSelected={2}
                value={multiLimited}
                onChange={setMultiLimited}
                label="Limited Selection"
                helperText="You can select up to 2 options"
                fullWidth
              />
            </div>
          </div>
        </div>
      </PreviewCard>

      {/* 9. Grouped Options */}
      <PreviewCard
        title="Grouped Options"
        description="Organize options into logical groups for better navigation. Groups are visually separated with headers. Use the groupBy prop to automatically group by a field."
        code={`<Dropdown 
  options={countries} 
  placeholder="Select a country" 
  value={value}
  onChange={setValue}
  groupBy="group"
  label="Country by Region"
/>
<Dropdown 
  options={countries} 
  placeholder="Searchable grouped" 
  value={value}
  onChange={setValue}
  groupBy="group"
  searchable
  label="Searchable Grouped Dropdown"
/>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
          <Dropdown 
            options={countries} 
            placeholder="Select a country" 
            value={groupedCountry}
            onChange={setGroupedCountry}
            groupBy="group"
            label="Country by Region"
            fullWidth
          />
          <Dropdown 
            options={countries} 
            placeholder="Searchable grouped" 
            value={groupedSearchable}
            onChange={setGroupedSearchable}
            groupBy="group"
            searchable
            label="Searchable Grouped Dropdown"
            fullWidth
          />
        </div>
      </PreviewCard>

      {/* 10. Disabled Options */}
      <PreviewCard
        title="Disabled Options"
        description="Mark specific options as disabled to prevent selection while still displaying them. Useful for unavailable or restricted choices."
        code={`<Dropdown 
  options={users} 
  placeholder="Select a user" 
  value={value}
  onChange={setValue}
  label="Team Member"
  helperText="Bob Wilson is currently unavailable"
/>
<Dropdown 
  options={users} 
  placeholder="Multiple with disabled" 
  multiple
  showCheckboxes
  value={values}
  onChange={setValues}
  label="Select Team Members"
/>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
          <Dropdown 
            options={users} 
            placeholder="Select a user" 
            value={disabledUser}
            onChange={setDisabledUser}
            label="Team Member"
            helperText="Bob Wilson is currently unavailable"
            fullWidth
          />
          <Dropdown 
            options={users} 
            placeholder="Multiple with disabled" 
            multiple
            showCheckboxes
            value={disabledMulti}
            onChange={setDisabledMulti}
            label="Select Team Members"
            fullWidth
          />
        </div>
      </PreviewCard>

      {/* 11. Disabled State */}
      <PreviewCard
        title="Disabled Dropdown"
        description="Completely disable the dropdown to prevent any interaction. Useful for form fields that depend on other selections or user permissions."
        code={`<Dropdown 
  options={sampleOptions} 
  placeholder="Disabled dropdown" 
  disabled
  label="Framework"
/>
<Dropdown 
  options={sampleOptions} 
  placeholder="Disabled with value" 
  defaultValue="react"
  disabled
  label="Selected Framework"
/>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
          <Dropdown 
            options={sampleOptions} 
            placeholder="Disabled dropdown" 
            disabled
            label="Framework"
            fullWidth
          />
          <Dropdown 
            options={sampleOptions} 
            placeholder="Disabled with value" 
            defaultValue="react"
            disabled
            label="Selected Framework"
            fullWidth
          />
        </div>
      </PreviewCard>

      {/* 12. Read-Only */}
      <PreviewCard
        title="Read-Only Dropdown"
        description="Display a selected value without allowing changes. Unlike disabled, read-only maintains normal styling and can be focused."
        code={`<Dropdown 
  options={sampleOptions} 
  defaultValue="react"
  readOnly
  label="Current Framework"
/>
<Dropdown 
  options={sampleOptions} 
  defaultValue="vue"
  readOnly
  label="Locked Selection"
  helperText="This value cannot be changed"
/>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
          <Dropdown 
            options={sampleOptions} 
            defaultValue="react"
            readOnly
            label="Current Framework"
            fullWidth
          />
          <Dropdown 
            options={sampleOptions} 
            defaultValue="vue"
            readOnly
            label="Locked Selection"
            helperText="This value cannot be changed"
            fullWidth
          />
        </div>
      </PreviewCard>

      {/* 13. Async Loading */}
      <PreviewCard
        title="Async / Remote Data"
        description="Load options asynchronously from an API or database. Show loading states while fetching data. Perfect for dynamic data that changes frequently."
        code={`// Simulated async function
const loadAsyncOptions = async (search: string) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { id: 1, label: 'Option 1', value: '1' },
    { id: 2, label: 'Option 2', value: '2' },
  ];
};

<Dropdown 
  placeholder="Loading options..." 
  async
  loadOptions={loadAsyncOptions}
  loadOnMount
  label="Async Dropdown"
/>
<Dropdown 
  placeholder="Search to load..." 
  async
  searchable
  loadOptions={loadAsyncOptions}
  loadOnSearch
  label="Search Async"
/>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
          <Dropdown 
            placeholder="Loading options..." 
            loading
            label="Loading State"
            helperText="Fetching data from server..."
            fullWidth
          />
          <Dropdown 
            options={sampleOptions} 
            placeholder="With custom loading icon" 
            loading
            label="Custom Loading"
            fullWidth
          />
        </div>
      </PreviewCard>

      {/* 14. Creatable */}
      <PreviewCard
        title="Creatable Dropdown"
        description="Allow users to create new options on the fly. Great for tags, categories, or when you want to give users flexibility to add custom values."
        code={`<Dropdown 
  options={sampleOptions} 
  placeholder="Type to create new option..." 
  creatable
  searchable
  value={value}
  onChange={setValue}
  label="Tags"
  helperText="Press Enter to create a new tag"
  onCreateOption={(value) => console.log('Create:', value)}
/>
<Dropdown 
  options={sampleOptions} 
  placeholder="Multiple creatable" 
  creatable
  multiple
  searchable
  value={values}
  onChange={setValues}
  label="Custom Tags"
  onCreateOption={(value) => console.log('Create:', value)}
/>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
          <Dropdown 
            options={sampleOptions} 
            placeholder="Type to create new option..." 
            creatable
            searchable
            value={creatableValue}
            onChange={setCreatableValue}
            label="Tags"
            helperText="Press Enter to create a new tag"
            onCreateOption={(value) => console.log('Create:', value)}
            fullWidth
          />
          <Dropdown 
            options={sampleOptions} 
            placeholder="Multiple creatable" 
            creatable
            multiple
            searchable
            value={creatableMulti}
            onChange={setCreatableMulti}
            label="Custom Tags"
            onCreateOption={(value) => console.log('Create:', value)}
            fullWidth
          />
        </div>
      </PreviewCard>

      {/* 15. Full Width */}
      <PreviewCard
        title="Full Width Dropdown"
        description="Make the dropdown span the full width of its container. Useful for mobile-responsive designs and form layouts."
        code={`<Dropdown 
  options={sampleOptions} 
  placeholder="Full width dropdown" 
  fullWidth
  value={value}
  onChange={setValue}
  label="Framework"
/>
<Dropdown 
  options={sampleOptions} 
  placeholder="Full width with search" 
  fullWidth
  searchable
  value={value}
  onChange={setValue}
  label="Searchable Full Width"
/>`}
      >
        <div className="flex flex-col gap-4 items-center justify-center w-full">
          <Dropdown 
            options={sampleOptions} 
            placeholder="Full width dropdown" 
            fullWidth
            value={fullWidth1}
            onChange={setFullWidth1}
            label="Framework"
          />
          <Dropdown 
            options={sampleOptions} 
            placeholder="Full width with search" 
            fullWidth
            searchable
            value={fullWidth2}
            onChange={setFullWidth2}
            label="Searchable Full Width"
          />
        </div>
      </PreviewCard>

      {/* 16. Opening Direction */}
      <PreviewCard
        title="Opening Direction"
        description="Control whether the dropdown menu opens upward or downward. Auto direction automatically chooses based on available space.

OpeningDirection: 'up' | 'down' | 'auto'"
        code={`<Dropdown 
  options={sampleOptions} 
  placeholder="Opens downward (default)" 
  openingDirection="down"
  value={value}
  onChange={setValue}
  label="Default Direction"
/>
<Dropdown 
  options={sampleOptions} 
  placeholder="Opens upward" 
  openingDirection="up"
  value={value}
  onChange={setValue}
  label="Upward Direction"
/>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
          <Dropdown 
            options={sampleOptions} 
            placeholder="Opens downward (default)" 
            openingDirection="down"
            value={directionDown}
            onChange={setDirectionDown}
            label="Default Direction"
            fullWidth
          />
          <div className="mt-0 sm:mt-32">
            <Dropdown 
              options={sampleOptions} 
              placeholder="Opens upward" 
              openingDirection="up"
              value={directionUp}
              onChange={setDirectionUp}
              label="Upward Direction"
              fullWidth
            />
          </div>
        </div>
      </PreviewCard>

      {/* 17. Controlled Dropdown */}
      <PreviewCard
        title="Controlled Dropdown"
        description="Fully control the dropdown state from parent component. Perfect for complex forms with validation or when you need to programmatically control the value."
        code={`const [value, setValue] = useState('react');

<Dropdown 
  options={sampleOptions} 
  value={value}
  onChange={setValue}
  label="Controlled Dropdown"
/>
<button onClick={() => setValue('vue')}>Set to Vue</button>
<button onClick={() => setValue(null)}>Clear</button>`}
      >
        <ControlledDropdownExample />
      </PreviewCard>

      {/* 18. Select All (Multi-Select) */}
      <PreviewCard
        title="Select All Option"
        description="Add a 'Select All' button at the top of multi-select dropdowns for quick selection of all available options."
        code={`<Dropdown 
  options={sampleOptions} 
  placeholder="Select frameworks" 
  multiple
  selectAll
  selectAllLabel="Select All Frameworks"
  value={values}
  onChange={setValues}
  label="Frameworks"
/>
<Dropdown 
  options={countries} 
  placeholder="Select countries" 
  multiple
  selectAll
  showCheckboxes
  groupBy="group"
  value={values}
  onChange={setValues}
  label="Countries"
/>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
          <Dropdown 
            options={sampleOptions} 
            placeholder="Select frameworks" 
            multiple
            selectAll
            selectAllLabel="Select All Frameworks"
            value={selectAllFrameworks}
            onChange={setSelectAllFrameworks}
            label="Frameworks"
            fullWidth
          />
          <Dropdown 
            options={countries} 
            placeholder="Select countries" 
            multiple
            selectAll
            showCheckboxes
            groupBy="group"
            value={selectAllCountries}
            onChange={setSelectAllCountries}
            label="Countries"
            fullWidth
          />
        </div>
      </PreviewCard>

      {/* 19. Custom Styling */}
      <PreviewCard
        title="Custom Styling"
        description="Override default styles with custom class names and inline styles. Customize the control, options, menu, and individual elements."
        code={`<Dropdown 
  options={sampleOptions} 
  placeholder="Custom styled dropdown" 
  className="custom-dropdown"
  controlClassName="custom-control"
  dropdownClassName="custom-menu"
  value={value}
  onChange={setValue}
  label="Custom Styling"
  style={{ borderColor: '#8B5CF6' }}
/>
<Dropdown 
  options={sampleOptions} 
  placeholder="Custom width" 
  width={400}
  value={value}
  onChange={setValue}
  label="Custom Width"
/>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
          <Dropdown 
            options={sampleOptions} 
            placeholder="Custom styled dropdown" 
            value={customStyled}
            onChange={setCustomStyled}
            label="Custom Styling"
            style={{ borderColor: '#8B5CF6' }}
            fullWidth
          />
          <Dropdown 
            options={sampleOptions} 
            placeholder="Custom width" 
            width={400}
            value={customWidth}
            onChange={setCustomWidth}
            label="Custom Width"
            fullWidth
          />
        </div>
      </PreviewCard>

      {/* 19b. Advanced Styling */}
      <PreviewCard
        title="Advanced Styling"
        description="Full control over every visual aspect: trigger background, menu background, fonts, font sizes, colors for selected/unselected states, and more.

Props: triggerStyle, menuStyle, valueStyle, placeholderStyle, optionStyle, selectedOptionStyle, selectedOptionClassName, focusedOptionStyle, focusedOptionClassName"
        code={`// Custom themed dropdown with brand colors
<Dropdown 
  options={sampleOptions} 
  placeholder="Brand themed dropdown"
  triggerStyle={{ 
    backgroundColor: '#1E1E2E', 
    borderColor: '#FFCB00',
    fontFamily: 'Georgia, serif'
  }}
  menuStyle={{ 
    backgroundColor: '#2D2D3D', 
    borderColor: '#FFCB00' 
  }}
  valueStyle={{ 
    color: '#FFCB00', 
    fontWeight: 'bold',
    fontSize: '16px'
  }}
  placeholderStyle={{ 
    color: '#888', 
    fontStyle: 'italic' 
  }}
  optionStyle={{ 
    fontFamily: 'Georgia, serif' 
  }}
  selectedOptionStyle={{ 
    backgroundColor: '#FFCB00', 
    color: '#000',
    fontWeight: 'bold'
  }}
  focusedOptionStyle={{ 
    backgroundColor: '#3D3D4D' 
  }}
/>

// Purple theme with custom fonts
<Dropdown 
  options={sampleOptions}
  triggerStyle={{ 
    backgroundColor: '#2D1B4E',
    borderColor: '#8B5CF6'
  }}
  menuStyle={{ 
    backgroundColor: '#1F1635' 
  }}
  valueStyle={{ 
    color: '#A78BFA',
    fontSize: '18px',
    fontWeight: '600'
  }}
  selectedOptionStyle={{ 
    backgroundColor: '#8B5CF6',
    fontWeight: 'bold'
  }}
/>`}
      >
        <AdvancedStylingExample />
      </PreviewCard>

      {/* 20. Responsive Design */}
      <PreviewCard
        title="Responsive Design"
        description="Dropdowns are fully responsive and work seamlessly on all screen sizes. They adapt their width, height, and touch interactions for mobile devices."
        code={`<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <Dropdown 
    options={sampleOptions} 
    placeholder="Responsive dropdown" 
    fullWidth
    value={value}
    onChange={setValue}
    label="Desktop & Mobile"
  />
  <Dropdown 
    options={countries} 
    placeholder="Select country" 
    fullWidth
    searchable
    value={value}
    onChange={setValue}
    label="Searchable Responsive"
  />
</div>`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <Dropdown 
            options={sampleOptions} 
            placeholder="Responsive dropdown" 
            fullWidth
            value={responsive1}
            onChange={setResponsive1}
            label="Desktop & Mobile"
          />
          <Dropdown 
            options={countries} 
            placeholder="Select country" 
            fullWidth
            searchable
            value={responsive2}
            onChange={setResponsive2}
            label="Searchable Responsive"
          />
        </div>
      </PreviewCard>

      {/* 21. Custom Icons */}
      <PreviewCard
        title="Custom Icons"
        description="Customize all icons used in the dropdown: leading icon, dropdown arrow, clear button, loading spinner, and selected checkmark.

Props: icon, dropdownIcon, clearIcon, loadingIcon, selectedIcon, expandIconPosition"
        code={`// Custom icons
<Dropdown 
  options={sampleOptions} 
  placeholder="With leading icon" 
  icon={<SearchIcon />}
  label="Leading Icon"
/>
<Dropdown 
  options={sampleOptions} 
  placeholder="Custom dropdown icon" 
  dropdownIcon={<ChevronIcon />}
  label="Custom Arrow"
/>
<Dropdown 
  options={sampleOptions} 
  defaultValue="react"
  clearable
  clearIcon={<CustomCloseIcon />}
  label="Custom Clear Icon"
/>
<Dropdown 
  options={sampleOptions} 
  defaultValue="react"
  selectedIcon={<StarIcon />}
  label="Custom Selected Icon"
/>`}
      >
        <CustomIconsExample />
      </PreviewCard>

      {/* 22. Animations */}
      <PreviewCard
        title="Animation Styles"
        description="Choose from different animation styles when opening/closing the dropdown menu.

Animation: 'fade' | 'slide' | 'scale' | 'none'
AnimationDuration: number (ms)"
        code={`<Dropdown 
  options={sampleOptions} 
  placeholder="Fade animation (default)" 
  animation="fade"
  value={value}
  onChange={setValue}
  label="Fade"
/>
<Dropdown 
  options={sampleOptions} 
  placeholder="Slide animation" 
  animation="slide"
  value={value}
  onChange={setValue}
  label="Slide"
/>
<Dropdown 
  options={sampleOptions} 
  placeholder="Scale animation" 
  animation="scale"
  value={value}
  onChange={setValue}
  label="Scale"
/>
<Dropdown 
  options={sampleOptions} 
  placeholder="No animation" 
  animation="none"
  value={value}
  onChange={setValue}
  label="None"
/>
<Dropdown 
  options={sampleOptions} 
  placeholder="Slow animation (500ms)" 
  animation="slide"
  animationDuration={500}
  value={value}
  onChange={setValue}
  label="Custom Duration"
/>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
          <Dropdown 
            options={sampleOptions} 
            placeholder="Fade animation (default)" 
            animation="fade"
            value={animFade}
            onChange={setAnimFade}
            label="Fade"
            fullWidth
          />
          <Dropdown 
            options={sampleOptions} 
            placeholder="Slide animation" 
            animation="slide"
            value={animSlide}
            onChange={setAnimSlide}
            label="Slide"
            fullWidth
          />
          <Dropdown 
            options={sampleOptions} 
            placeholder="Scale animation" 
            animation="scale"
            value={animScale}
            onChange={setAnimScale}
            label="Scale"
            fullWidth
          />
          <Dropdown 
            options={sampleOptions} 
            placeholder="No animation" 
            animation="none"
            value={animNone}
            onChange={setAnimNone}
            label="None"
            fullWidth
          />
        </div>
      </PreviewCard>

      {/* 23. Custom Renderers */}
      <PreviewCard
        title="Custom Renderers"
        description="Full control over rendering with custom render functions for options, values, placeholders, groups, footer, and empty states.

Props: renderOption, renderValue, renderPlaceholder, renderGroup, renderFooter, renderEmpty"
        code={`// Custom option renderer with icons/avatars
<Dropdown 
  options={usersWithAvatars}
  placeholder="Select user"
  renderOption={(option, { selected, focused }) => (
    <div className="flex items-center gap-3 py-2">
      <img src={option.avatar} className="w-8 h-8 rounded-full" />
      <div>
        <div className="font-medium">{option.label}</div>
        <div className="text-sm text-gray-400">{option.email}</div>
      </div>
      {selected && <CheckIcon />}
    </div>
  )}
  label="Custom Options"
/>

// Custom value display
<Dropdown 
  options={sampleOptions}
  defaultValue="react"
  renderValue={(selected) => (
    <span className="flex items-center gap-2">
      <Badge color="primary">{selected}</Badge>
    </span>
  )}
  label="Custom Value"
/>

// Custom empty state
<Dropdown 
  options={[]}
  renderEmpty={() => (
    <div className="py-8 text-center">
      <EmptyIcon className="mx-auto mb-2" />
      <p>No results found</p>
    </div>
  )}
  label="Empty State"
/>`}
      >
        <CustomRenderersExample />
      </PreviewCard>

      {/* 24. Multi-Select with Chips */}
      <PreviewCard
        title="Multi-Select Chips & Tags"
        description="Display multi-select values as chips/tags with customizable variants, limits, and custom renderers.

Props: chipVariant, renderTag, tagLimit, tagEllipsisText"
        code={`<Dropdown 
  options={sampleOptions}
  placeholder="Select frameworks"
  multiple
  defaultValue={['react', 'vue']}
  chipVariant="filled"
  label="Filled Chips"
/>
<Dropdown 
  options={sampleOptions}
  placeholder="Select frameworks"
  multiple
  defaultValue={['react', 'vue']}
  chipVariant="outlined"
  label="Outlined Chips"
/>
<Dropdown 
  options={sampleOptions}
  placeholder="Select frameworks"
  multiple
  defaultValue={['react', 'vue', 'angular', 'svelte']}
  tagLimit={2}
  tagEllipsisText="+2 more"
  label="Tag Limit"
/>
<Dropdown 
  options={sampleOptions}
  placeholder="Select frameworks"
  multiple
  renderTag={(option) => (
    <span key={option.value} className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs">
      {option.label}
    </span>
  )}
  label="Custom Tags"
/>`}
      >
        <MultiSelectChipsExample />
      </PreviewCard>

      {/* 25. Menu Configuration */}
      <PreviewCard
        title="Menu Configuration"
        description="Customize the dropdown menu dimensions, elevation, and z-index for proper layering.

Props: menuWidth, menuHeight, elevation, zIndex"
        code={`<Dropdown 
  options={sampleOptions}
  placeholder="Custom menu width"
  menuWidth={300}
  value={value}
  onChange={setValue}
  label="Fixed Width Menu"
/>
<Dropdown 
  options={countries}
  placeholder="Tall menu (400px)"
  menuHeight="400px"
  value={value}
  onChange={setValue}
  label="Custom Height"
/>
<Dropdown 
  options={sampleOptions}
  placeholder="Auto width"
  menuWidth="auto"
  value={value}
  onChange={setValue}
  label="Auto Width"
/>
<Dropdown 
  options={sampleOptions}
  placeholder="High z-index"
  zIndex={9999}
  value={value}
  onChange={setValue}
  label="Z-Index 9999"
/>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
          <Dropdown 
            options={sampleOptions}
            placeholder="Custom menu width (300px)"
            menuWidth={300}
            value={menuWidth}
            onChange={setMenuWidth}
            label="Fixed Width Menu"
            fullWidth
          />
          <Dropdown 
            options={countries}
            placeholder="Tall menu (400px)"
            menuHeight="400px"
            value={menuHeight}
            onChange={setMenuHeight}
            label="Custom Height"
            fullWidth
          />
          <div className="sm:col-span-2 flex justify-center">
            <div className="w-full max-w-xs">
              <Dropdown 
                options={sampleOptions}
                placeholder="Short menu (120px)"
                menuHeight="120px"
                value={menuShort}
                onChange={setMenuShort}
                label="Short Menu"
                fullWidth
              />
            </div>
          </div>
        </div>
      </PreviewCard>

      {/* 26. Search Configuration */}
      <PreviewCard
        title="Search Configuration"
        description="Fine-tune search behavior with minimum character requirements, debounce timing, case sensitivity, and search highlighting.

Props: minSearchLength, debounceTime, caseSensitiveSearch, highlightSearch"
        code={`<Dropdown 
  options={countries}
  placeholder="Min 2 chars to search"
  searchable
  minSearchLength={2}
  value={value}
  onChange={setValue}
  label="Minimum Characters"
  helperText="Start typing at least 2 characters"
/>
<Dropdown 
  options={countries}
  placeholder="500ms debounce"
  searchable
  debounceTime={500}
  value={value}
  onChange={setValue}
  label="Custom Debounce"
/>
<Dropdown 
  options={countries}
  placeholder="Case sensitive"
  searchable
  caseSensitiveSearch
  value={value}
  onChange={setValue}
  label="Case Sensitive"
/>
<Dropdown 
  options={countries}
  placeholder="Highlight matches"
  searchable
  highlightSearch
  value={value}
  onChange={setValue}
  label="Highlight Search"
/>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
          <Dropdown 
            options={countries}
            placeholder="Min 2 chars to search"
            searchable
            minSearchLength={2}
            value={searchMin}
            onChange={setSearchMin}
            label="Minimum Characters"
            helperText="Start typing at least 2 characters"
            fullWidth
          />
          <Dropdown 
            options={countries}
            placeholder="500ms debounce"
            searchable
            debounceTime={500}
            value={searchDebounce}
            onChange={setSearchDebounce}
            label="Custom Debounce"
            helperText="Waits 500ms before filtering"
            fullWidth
          />
          <div className="sm:col-span-2 flex justify-center">
            <div className="w-full max-w-xs">
              <Dropdown 
                options={countries}
                placeholder="Case sensitive search"
                searchable
                caseSensitiveSearch
                value={searchCase}
                onChange={setSearchCase}
                label="Case Sensitive"
                helperText="Try 'United' vs 'united'"
                fullWidth
              />
            </div>
          </div>
        </div>
      </PreviewCard>

      {/* 27. Custom Option Keys */}
      <PreviewCard
        title="Custom Option Keys"
        description="Use custom property names for label and value when your data structure differs from the default.

Props: labelKey, valueKey"
        code={`// Custom data structure
const products = [
  { productId: 'p1', productName: 'iPhone 15', price: 999 },
  { productId: 'p2', productName: 'Samsung S24', price: 899 },
  { productId: 'p3', productName: 'Pixel 8', price: 699 },
];

<Dropdown 
  options={products}
  placeholder="Select product"
  labelKey="productName"
  valueKey="productId"
  label="Products"
  onChange={(id) => console.log('Selected:', id)}
/>`}
      >
        <CustomKeysExample />
      </PreviewCard>

      {/* 28. Event Handlers */}
      <PreviewCard
        title="Event Handlers"
        description="Comprehensive event system for tracking user interactions, menu state, focus, scroll, and selection changes.

Props: onChange, onSelect, onDeselect, onClear, onOpen, onClose, onMenuOpen, onMenuClose, onFocus, onBlur, onHighlight, onScroll"
        code={`<Dropdown 
  options={sampleOptions}
  placeholder="Select framework"
  onChange={(value) => console.log('Changed:', value)}
  onSelect={(option) => console.log('Selected:', option)}
  onDeselect={(option) => console.log('Deselected:', option)}
  onClear={() => console.log('Cleared')}
  onOpen={() => console.log('Opened')}
  onClose={() => console.log('Closed')}
  onFocus={(e) => console.log('Focused')}
  onBlur={(e) => console.log('Blurred')}
  onHighlight={(option) => console.log('Highlighted:', option)}
  label="Event Demo"
  clearable
  multiple
/>`}
      >
        <EventHandlersExample />
      </PreviewCard>

      {/* 29. Keyboard Navigation */}
      <PreviewCard
        title="Keyboard Navigation"
        description="Built-in keyboard support with customizable behavior for accessible dropdown interaction.

Props: keyboardNavigation, pageSize, homeEndNavigation, autoFocus, autoHighlight, tabIndex"
        code={`<Dropdown 
  options={sampleOptions}
  placeholder="Press Arrow keys"
  keyboardNavigation
  homeEndNavigation
  autoHighlight
  value={value}
  onChange={setValue}
  label="Full Keyboard Support"
  helperText="↑↓ Navigate, Enter Select, Esc Close, Home/End Jump"
/>
<Dropdown 
  options={sampleOptions}
  placeholder="Auto focus on mount"
  autoFocus
  value={value}
  onChange={setValue}
  label="Auto Focus"
/>
<Dropdown 
  options={sampleOptions}
  placeholder="Custom tab index"
  tabIndex={5}
  value={value}
  onChange={setValue}
  label="Tab Index 5"
/>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
          <Dropdown 
            options={sampleOptions}
            placeholder="Press Arrow keys"
            keyboardNavigation
            homeEndNavigation
            autoHighlight
            value={keyboardNav}
            onChange={setKeyboardNav}
            label="Full Keyboard Support"
            helperText="↑↓ Navigate, Enter Select, Esc Close, Home/End Jump"
            fullWidth
          />
          <Dropdown 
            options={sampleOptions}
            placeholder="Auto highlights first option"
            autoHighlight
            value={autoHighlight}
            onChange={setAutoHighlight}
            label="Auto Highlight"
            fullWidth
          />
          <div className="sm:col-span-2 flex justify-center">
            <div className="w-full max-w-xs">
              <Dropdown 
                options={sampleOptions}
                placeholder="Deselect with backspace"
                multiple
                deselectOnBackspace
                value={backspaceDeselect}
                onChange={setBackspaceDeselect}
                label="Backspace Deselect"
                helperText="Press Backspace to remove last selection"
                fullWidth
              />
            </div>
          </div>
        </div>
      </PreviewCard>

      {/* 30. Accessibility */}
      <PreviewCard
        title="Accessibility Features"
        description="Full ARIA support for screen readers and assistive technologies.

Props: ariaLabel, ariaDescribedBy, ariaInvalid, role, optionRole, id"
        code={`<Dropdown 
  options={sampleOptions}
  placeholder="Accessible dropdown"
  ariaLabel="Select your favorite framework"
  ariaDescribedBy="framework-help"
  id="framework-select"
  role="combobox"
  value={value}
  onChange={setValue}
  label="Framework"
/>
<p id="framework-help" className="sr-only">
  Choose a JavaScript framework from the list
</p>

// Invalid state for form validation
<Dropdown 
  options={sampleOptions}
  placeholder="Required field"
  ariaInvalid={true}
  variant="error"
  value={value}
  onChange={setValue}
  label="Required Field"
  helperText="Please select an option"
/>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
          <Dropdown 
            options={sampleOptions}
            placeholder="Accessible dropdown"
            ariaLabel="Select your favorite framework"
            id="framework-select"
            value={accessibleDropdown}
            onChange={setAccessibleDropdown}
            label="Framework"
            helperText="Full ARIA support for screen readers"
            fullWidth
          />
          <Dropdown 
            options={sampleOptions}
            placeholder="Required field"
            ariaInvalid={true}
            variant="error"
            required
            value={requiredField}
            onChange={setRequiredField}
            label="Required Field"
            helperText="Please select an option"
            fullWidth
          />
        </div>
      </PreviewCard>

      {/* 31. Open On Focus */}
      <PreviewCard
        title="Open Behavior"
        description="Control how and when the dropdown opens, including focus-triggered opening and controlled open state.

Props: openOnFocus, open, defaultOpen, closeOnSelect"
        code={`<Dropdown 
  options={sampleOptions}
  placeholder="Opens on focus"
  openOnFocus
  value={value}
  onChange={setValue}
  label="Open on Focus"
  helperText="Click or tab to focus and auto-open"
/>
<Dropdown 
  options={sampleOptions}
  placeholder="Starts open"
  defaultOpen
  value={value}
  onChange={setValue}
  label="Default Open"
/>
<Dropdown 
  options={sampleOptions}
  placeholder="Stays open on select"
  multiple
  closeOnSelect={false}
  value={values}
  onChange={setValues}
  label="Keep Open"
  helperText="Menu stays open after selection"
/>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
          <Dropdown 
            options={sampleOptions}
            placeholder="Opens on focus"
            openOnFocus
            value={openOnFocus}
            onChange={setOpenOnFocus}
            label="Open on Focus"
            helperText="Click or tab to focus and auto-open"
            fullWidth
          />
          <Dropdown 
            options={sampleOptions}
            placeholder="Stays open on select"
            multiple
            closeOnSelect={false}
            showCheckboxes
            value={keepOpen}
            onChange={setKeepOpen}
            label="Keep Open on Select"
            helperText="Menu stays open after selection"
            fullWidth
          />
        </div>
      </PreviewCard>

      {/* 32. Custom Filter Function */}
      <PreviewCard
        title="Custom Filter Function"
        description="Provide a custom filter function for advanced search logic beyond simple label matching.

Props: filterOption"
        code={`const filterByMultipleFields = (option, search) => {
  const searchLower = search.toLowerCase();
  return (
    option.label.toLowerCase().includes(searchLower) ||
    option.value.toLowerCase().includes(searchLower) ||
    option.group?.toLowerCase().includes(searchLower)
  );
};

<Dropdown 
  options={countries}
  placeholder="Search label, value, or group"
  searchable
  filterOption={filterByMultipleFields}
  label="Multi-Field Search"
  helperText="Try 'us', 'united', or 'europe'"
/>`}
      >
        <CustomFilterExample />
      </PreviewCard>

      {/* 33. Hide Selected Options */}
      <PreviewCard
        title="Hide Selected Options"
        description="Remove already selected options from the dropdown list in multi-select mode.

Props: hideSelectedOptions"
        code={`<Dropdown 
  options={sampleOptions}
  placeholder="Select frameworks"
  multiple
  hideSelectedOptions
  value={values}
  onChange={setValues}
  label="Hide Selected"
  helperText="Selected options disappear from the list"
/>
<Dropdown 
  options={sampleOptions}
  placeholder="Show all options"
  multiple
  hideSelectedOptions={false}
  showCheckboxes
  value={values}
  onChange={setValues}
  label="Show Selected"
  helperText="Selected options remain visible with checkmarks"
/>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
          <Dropdown 
            options={sampleOptions}
            placeholder="Select frameworks"
            multiple
            hideSelectedOptions
            value={hideSelected}
            onChange={setHideSelected}
            label="Hide Selected"
            helperText="Selected options disappear from the list"
            fullWidth
          />
          <Dropdown 
            options={sampleOptions}
            placeholder="Show all options"
            multiple
            hideSelectedOptions={false}
            showCheckboxes
            value={showSelected}
            onChange={setShowSelected}
            label="Show Selected"
            helperText="Selected options remain visible with checkmarks"
            fullWidth
          />
        </div>
      </PreviewCard>

      {/* 34. Option Disabled Function */}
      <PreviewCard
        title="Dynamic Option Disabled"
        description="Use a function to dynamically determine which options should be disabled based on custom logic.

Props: optionDisabled"
        code={`// Disable options based on a condition
const disableExpensive = (option) => option.price > 100;

<Dropdown 
  options={products}
  placeholder="Select product"
  optionDisabled={(option) => option.price > 500}
  label="Budget Filter"
  helperText="Options over $500 are disabled"
/>

// Disable based on current selection
<Dropdown 
  options={sampleOptions}
  placeholder="Select framework"
  optionDisabled={(option) => 
    selectedFrameworks.includes(option.value)
  }
  label="Unique Selection"
/>`}
      >
        <DynamicDisabledExample />
      </PreviewCard>

      {/* 35. Custom Group Rendering */}
      <PreviewCard
        title="Custom Group Headers"
        description="Customize how group headers are rendered in grouped dropdowns.

Props: groupLabel, renderGroup"
        code={`<Dropdown 
  options={countries}
  placeholder="Select country"
  groupBy="group"
  groupLabel={(groupName) => (
    <div className="flex items-center gap-2">
      <FlagIcon region={groupName} />
      <span>{groupName} Region</span>
      <Badge>{countByGroup[groupName]}</Badge>
    </div>
  )}
  label="Custom Group Headers"
/>`}
      >
        <CustomGroupExample />
      </PreviewCard>

      {/* 36. Async with Real Example */}
      <PreviewCard
        title="Async Data Loading"
        description="Load options asynchronously from an API with loading states, search-triggered loading, and error handling.

Props: async, loadOptions, loadOnMount, loadOnSearch, fetchDelay, serverSearch"
        code={`// Load on mount
<Dropdown 
  placeholder="Loading..."
  async
  loadOptions={async () => {
    const response = await fetch('/api/options');
    return response.json();
  }}
  loadOnMount
  label="Load on Mount"
/>

// Load on search (server-side filtering)
<Dropdown 
  placeholder="Type to search..."
  async
  searchable
  loadOptions={async (search) => {
    const response = await fetch(\`/api/search?q=\${search}\`);
    return response.json();
  }}
  loadOnSearch
  serverSearch
  label="Server Search"
  helperText="Results are fetched from server"
/>

// With fetch delay (debounce server calls)
<Dropdown 
  placeholder="Debounced API calls"
  async
  searchable
  loadOptions={loadFromAPI}
  loadOnSearch
  fetchDelay={300}
  debounceTime={300}
  label="Debounced Search"
/>`}
      >
        <AsyncLoadingExample />
      </PreviewCard>

      {/* 37. Complete Form Example */}
      <PreviewCard
        title="Complete Form Integration"
        description="A real-world example showing dropdown integration in a complete form with validation, submission, and reset functionality."
        code={`function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    country: null,
    interests: [],
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate and submit
  };

  return (
    <form onSubmit={handleSubmit}>
      <Dropdown 
        options={countries}
        value={formData.country}
        onChange={(value) => setFormData({...formData, country: value})}
        placeholder="Select country"
        required
        name="country"
        label="Country"
      />
      <Dropdown 
        options={interests}
        value={formData.interests}
        onChange={(value) => setFormData({...formData, interests: value})}
        placeholder="Select interests"
        multiple
        showCheckboxes
        selectAll
        name="interests"
        label="Interests"
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}`}
      >
        <FormIntegrationExample />
      </PreviewCard>

      {/* Props Reference Table */}
      <PropsReference />
    </div>
  );
}

/**
 * Advanced Styling Example Component
 * Demonstrates full visual customization of the dropdown
 */
function AdvancedStylingExample() {
  const [brandValue, setBrandValue] = useState<string | null>(null);
  const [purpleValue, setPurpleValue] = useState<string | null>(null);
  const [darkValue, setDarkValue] = useState<string | null>(null);

  const options = [
    { id: 1, label: "React", value: "react" },
    { id: 2, label: "Vue", value: "vue" },
    { id: 3, label: "Angular", value: "angular" },
    { id: 4, label: "Svelte", value: "svelte" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {/* Brand Theme (Gold/Yellow) */}
      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-400 font-medium">Brand Theme (Gold)</span>
        <Dropdown
          options={options}
          placeholder="Select framework..."
          value={brandValue}
          onChange={setBrandValue}
          fullWidth
          triggerStyle={{
            backgroundColor: '#1E1E2E',
            borderColor: '#FFCB00',
            fontFamily: 'Georgia, serif',
          }}
          menuStyle={{
            backgroundColor: '#2D2D3D',
            borderColor: '#FFCB00',
          }}
          valueStyle={{
            color: '#FFCB00',
            fontWeight: 'bold',
            fontSize: '16px',
          }}
          placeholderStyle={{
            color: '#888',
            fontStyle: 'italic',
          }}
          optionStyle={{
            fontFamily: 'Georgia, serif',
          }}
          selectedOptionStyle={{
            backgroundColor: '#FFCB00',
            color: '#000',
            fontWeight: 'bold',
          }}
          focusedOptionStyle={{
            backgroundColor: '#3D3D4D',
          }}
        />
      </div>

      {/* Purple Theme */}
      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-400 font-medium">Purple Theme</span>
        <Dropdown
          options={options}
          placeholder="Choose option..."
          value={purpleValue}
          onChange={setPurpleValue}
          fullWidth
          triggerStyle={{
            backgroundColor: '#2D1B4E',
            borderColor: '#8B5CF6',
            fontFamily: 'system-ui, sans-serif',
          }}
          menuStyle={{
            backgroundColor: '#1F1635',
            borderColor: '#8B5CF6',
          }}
          valueStyle={{
            color: '#A78BFA',
            fontSize: '18px',
            fontWeight: '600',
          }}
          placeholderStyle={{
            color: '#7C3AED',
            opacity: 0.7,
          }}
          selectedOptionStyle={{
            backgroundColor: '#8B5CF6',
            color: '#FFFFFF',
            fontWeight: 'bold',
          }}
          focusedOptionStyle={{
            backgroundColor: '#3D2866',
          }}
        />
      </div>

      {/* Dark Minimal Theme */}
      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-400 font-medium">Dark Minimal</span>
        <Dropdown
          options={options}
          placeholder="Pick one..."
          value={darkValue}
          onChange={setDarkValue}
          fullWidth
          triggerStyle={{
            backgroundColor: '#0D0D0D',
            borderColor: '#333',
            fontFamily: 'Monaco, monospace',
          }}
          menuStyle={{
            backgroundColor: '#0D0D0D',
            borderColor: '#333',
          }}
          valueStyle={{
            color: '#00FF88',
            fontFamily: 'Monaco, monospace',
            fontSize: '14px',
          }}
          placeholderStyle={{
            color: '#555',
            fontFamily: 'Monaco, monospace',
          }}
          optionStyle={{
            fontFamily: 'Monaco, monospace',
            fontSize: '14px',
          }}
          selectedOptionStyle={{
            backgroundColor: '#00FF88',
            color: '#000',
            fontWeight: 'bold',
          }}
          focusedOptionStyle={{
            backgroundColor: '#1A1A1A',
            borderLeft: '2px solid #00FF88',
          }}
        />
      </div>
    </div>
  );
}

/**
 * Controlled Dropdown Example Component
 */
function ControlledDropdownExample() {
  const [value, setValue] = useState<string | null>('react');

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full max-w-md">
      <Dropdown 
        options={sampleOptions} 
        value={value}
        onChange={setValue}
        label="Controlled Dropdown"
        helperText={`Current value: ${value || 'none'}`}
      />
      <div className="flex flex-wrap gap-2">
        <button 
          onClick={() => setValue('vue')}
          className="px-4 py-2 bg-[#FF5733] text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Set to Vue
        </button>
        <button 
          onClick={() => setValue('angular')}
          className="px-4 py-2 bg-[#FFCB00] text-black rounded-lg hover:bg-yellow-400 transition-colors"
        >
          Set to Angular
        </button>
        <button 
          onClick={() => setValue(null)}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

/**
 * Custom Icons Example Component
 */
function CustomIconsExample() {
  const [leadingIcon, setLeadingIcon] = useState<string | null>(null);
  const [customArrow, setCustomArrow] = useState<string | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<string | null>('react');
  const [leftIcon, setLeftIcon] = useState<string | null>(null);

  const SearchIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );

  const StarIcon = () => (
    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  const CustomChevron = () => (
    <svg className="w-5 h-5 text-[#FFCB00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
      <Dropdown 
        options={sampleOptions} 
        placeholder="With search icon" 
        icon={<SearchIcon />}
        value={leadingIcon}
        onChange={setLeadingIcon}
        label="Leading Icon"
        fullWidth
      />
      <Dropdown 
        options={sampleOptions} 
        placeholder="Custom dropdown arrow" 
        dropdownIcon={<CustomChevron />}
        value={customArrow}
        onChange={setCustomArrow}
        label="Custom Arrow"
        fullWidth
      />
      <Dropdown 
        options={sampleOptions} 
        value={selectedIcon}
        onChange={setSelectedIcon}
        selectedIcon={<StarIcon />}
        label="Custom Selected Icon"
        helperText="Selected items show a star"
        fullWidth
      />
      <Dropdown 
        options={sampleOptions} 
        placeholder="Icon on left" 
        icon={<SearchIcon />}
        expandIconPosition="left"
        value={leftIcon}
        onChange={setLeftIcon}
        label="Left Icon Position"
        fullWidth
      />
    </div>
  );
}

/**
 * Custom Renderers Example Component
 */
function CustomRenderersExample() {
  const [customOption, setCustomOption] = useState<string | null>(null);
  const [customValue, setCustomValue] = useState<string | null>('react');
  const [emptyState, setEmptyState] = useState<string | null>(null);
  const [withFooter, setWithFooter] = useState<string | null>(null);

  const usersWithAvatars = [
    { id: 1, label: "John Doe", value: "john", email: "john@example.com", avatar: "JD" },
    { id: 2, label: "Jane Smith", value: "jane", email: "jane@example.com", avatar: "JS" },
    { id: 3, label: "Bob Wilson", value: "bob", email: "bob@example.com", avatar: "BW" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
      <Dropdown 
        options={usersWithAvatars}
        placeholder="Select user"
        value={customOption}
        onChange={setCustomOption}
        renderOption={(option, { selected, focused }) => (
          <div className={`flex items-center gap-3 px-3 py-2 cursor-pointer ${focused ? 'bg-gray-700' : ''} ${selected ? 'bg-blue-600' : ''}`}>
            <div className="w-8 h-8 rounded-full bg-[#FFCB00] text-black flex items-center justify-center text-sm font-bold">
              {option.avatar}
            </div>
            <div className="flex-1">
              <div className="font-medium text-white">{option.label}</div>
              <div className="text-xs text-gray-400">{option.email}</div>
            </div>
            {selected && (
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        )}
        label="Custom Option Renderer"
        helperText="Options show avatar, name, and email"
        fullWidth
      />
      <Dropdown 
        options={sampleOptions}
        value={customValue}
        onChange={setCustomValue}
        renderValue={(selected) => (
          <span className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-[#FFCB00] text-black rounded text-sm font-medium">
              {selected?.toUpperCase()}
            </span>
          </span>
        )}
        label="Custom Value Display"
        helperText="Selected value shown as badge"
        fullWidth
      />
      <Dropdown 
        options={[]}
        searchable
        value={emptyState}
        onChange={setEmptyState}
        renderEmpty={() => (
          <div className="py-8 text-center text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm">No results found</p>
            <p className="text-xs mt-1">Try a different search term</p>
          </div>
        )}
        label="Custom Empty State"
        placeholder="Type to search..."
        fullWidth
      />
      <Dropdown 
        options={sampleOptions}
        placeholder="With footer"
        value={withFooter}
        onChange={setWithFooter}
        renderFooter={() => (
          <div className="px-4 py-3 border-t border-gray-700 bg-gray-900">
            <button className="text-sm text-[#FFCB00] hover:underline">
              + Add new option
            </button>
          </div>
        )}
        label="Custom Footer"
        fullWidth
      />
    </div>
  );
}
/**
 * Multi-Select Chips Example Component
 */
function MultiSelectChipsExample() {
  const [filledChips, setFilledChips] = useState<string[]>(['react', 'vue']);
  const [tagLimit, setTagLimit] = useState<string[]>(['react', 'vue', 'angular', 'svelte']);
  const [customTags, setCustomTags] = useState<string[]>([]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
      <Dropdown 
        options={sampleOptions}
        placeholder="Select frameworks"
        multiple
        value={filledChips}
        onChange={setFilledChips}
        chipVariant="filled"
        label="Filled Chips"
        clearable
        fullWidth
      />
      <Dropdown 
        options={sampleOptions}
        placeholder="Select frameworks"
        multiple
        value={tagLimit}
        onChange={setTagLimit}
        tagLimit={2}
        tagEllipsisText={`+${Math.max(0, tagLimit.length - 2)} more`}
        label="Tag Limit (2)"
        helperText="Shows first 2 selections with count"
        clearable
        fullWidth
      />
      <div className="sm:col-span-2 flex justify-center">
        <div className="w-full max-w-xs">
          <Dropdown 
            options={sampleOptions}
            placeholder="Select frameworks"
            multiple
            value={customTags}
            onChange={setCustomTags}
            renderTag={(option) => (
              <span key={option.value} className="inline-flex items-center px-2 py-1 bg-[#FFCB00]/20 text-[#FFCB00] rounded-full text-xs font-medium mr-1 mb-1">
                {option.label}
              </span>
            )}
            label="Custom Tag Renderer"
            helperText="Tags styled with brand color"
            fullWidth
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Custom Option Keys Example Component
 */
function CustomKeysExample() {
  const products = [
    { productId: 'p1', productName: 'iPhone 15 Pro', price: 999, category: 'Phone' },
    { productId: 'p2', productName: 'Samsung Galaxy S24', price: 899, category: 'Phone' },
    { productId: 'p3', productName: 'Google Pixel 8', price: 699, category: 'Phone' },
    { productId: 'p4', productName: 'MacBook Pro 16"', price: 2499, category: 'Laptop' },
    { productId: 'p5', productName: 'Dell XPS 15', price: 1799, category: 'Laptop' },
  ];

  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
      <Dropdown 
        options={products}
        placeholder="Select product"
        labelKey="productName"
        valueKey="productId"
        value={selectedProduct}
        onChange={setSelectedProduct}
        label="Products"
        helperText={selectedProduct ? `Selected ID: ${selectedProduct}` : 'Custom labelKey & valueKey'}
        fullWidth
      />
      <Dropdown 
        options={products}
        placeholder="Select by category"
        labelKey="productName"
        valueKey="productId"
        groupBy="category"
        label="Grouped by Category"
        fullWidth
      />
    </div>
  );
}

/**
 * Event Handlers Example Component
 */
function EventHandlersExample() {
  const [events, setEvents] = useState<string[]>([]);

  const addEvent = (event: string) => {
    setEvents(prev => [...prev.slice(-4), event]);
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full max-w-md">
      <Dropdown 
        options={sampleOptions}
        placeholder="Interact to see events"
        onChange={(value) => addEvent(`onChange: ${JSON.stringify(value)}`)}
        onSelect={(option) => addEvent(`onSelect: ${option.label}`)}
        onDeselect={(option) => addEvent(`onDeselect: ${option.label}`)}
        onClear={() => addEvent('onClear')}
        onOpen={() => addEvent('onOpen')}
        onClose={() => addEvent('onClose')}
        onFocus={() => addEvent('onFocus')}
        onBlur={() => addEvent('onBlur')}
        onHighlight={(option) => addEvent(`onHighlight: ${option?.label}`)}
        label="Event Demo"
        clearable
        multiple
        showCheckboxes
      />
      <div className="w-full p-3 bg-gray-900 rounded-lg border border-gray-700">
        <div className="text-xs text-gray-400 mb-2">Event Log:</div>
        <div className="space-y-1 h-24 overflow-auto">
          {events.length === 0 ? (
            <div className="text-xs text-gray-500">Interact with the dropdown...</div>
          ) : (
            events.map((event, i) => (
              <div key={i} className="text-xs text-green-400 font-mono">{event}</div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Custom Filter Example Component
 */
function CustomFilterExample() {
  const [filterValue, setFilterValue] = useState<string | null>(null);

  const filterByMultipleFields = (option: any, search: string) => {
    const searchLower = search.toLowerCase();
    return (
      option.label?.toLowerCase().includes(searchLower) ||
      option.value?.toLowerCase().includes(searchLower) ||
      option.group?.toLowerCase().includes(searchLower)
    );
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full max-w-md">
      <Dropdown 
        options={countries}
        placeholder="Search label, value, or group"
        searchable
        filterOption={filterByMultipleFields}
        value={filterValue}
        onChange={setFilterValue}
        label="Multi-Field Search"
        helperText="Try 'us', 'united', or 'europe'"
      />
    </div>
  );
}

/**
 * Dynamic Disabled Example Component
 */
function DynamicDisabledExample() {
  const [budget, setBudget] = useState(1000);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  
  const products = [
    { id: 1, label: 'Basic Plan - $99', value: 'basic', price: 99 },
    { id: 2, label: 'Pro Plan - $299', value: 'pro', price: 299 },
    { id: 3, label: 'Enterprise - $999', value: 'enterprise', price: 999 },
    { id: 4, label: 'Ultimate - $1999', value: 'ultimate', price: 1999 },
  ];

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full max-w-md">
      <div className="w-full">
        <label className="block text-sm text-white mb-2">Budget: ${budget}</label>
        <input 
          type="range" 
          min="0" 
          max="2500" 
          step="100"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="w-full accent-[#FFCB00]"
        />
      </div>
      <Dropdown 
        options={products}
        placeholder="Select a plan"
        optionDisabled={(option) => option.price > budget}
        value={selectedPlan}
        onChange={setSelectedPlan}
        label="Available Plans"
        helperText={`Plans over $${budget} are disabled`}
      />
    </div>
  );
}

/**
 * Custom Group Example Component
 */
function CustomGroupExample() {
  const [groupedValue, setGroupedValue] = useState<string | null>(null);

  const regionIcons: Record<string, string> = {
    'North America': '🌎',
    'Europe': '🌍',
    'Asia': '🌏',
  };

  const countByGroup = countries.reduce((acc, country) => {
    acc[country.group] = (acc[country.group] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full max-w-md">
      <Dropdown 
        options={countries}
        placeholder="Select country"
        groupBy="group"
        value={groupedValue}
        onChange={setGroupedValue}
        groupLabel={(groupName) => (
          <span className="flex items-center gap-2">
            <span>{regionIcons[groupName] || '🌐'}</span>
            <span>{groupName}</span>
            <span className="ml-auto text-xs bg-gray-700 px-2 py-0.5 rounded-full">
              {countByGroup[groupName]}
            </span>
          </span>
        )}
        label="Custom Group Headers"
        helperText="Groups show emoji and count"
      />
    </div>
  );
}

/**
 * Async Loading Example Component
 */
function AsyncLoadingExample() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingDemo, setLoadingDemo] = useState<string | null>(null);
  const [asyncSearch, setAsyncSearch] = useState<string | null>(null);

  const simulateAsyncLoad = async (search: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    
    const filtered = sampleOptions.filter(opt => 
      opt.label.toLowerCase().includes(search.toLowerCase())
    );
    return filtered;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
      <Dropdown 
        placeholder="Simulated loading state"
        loading={isLoading}
        loadingText="Fetching options..."
        options={sampleOptions}
        value={loadingDemo}
        onChange={setLoadingDemo}
        label="Loading State Demo"
        helperText="Shows loading indicator"
        fullWidth
      />
      <Dropdown 
        placeholder="Type to search..."
        async
        searchable
        loadOptions={simulateAsyncLoad}
        loadOnSearch
        value={asyncSearch}
        onChange={setAsyncSearch}
        label="Async Search"
        helperText="Simulates 1.5s API delay"
        fullWidth
      />
      <div className="sm:col-span-2 flex justify-center">
        <div className="w-full max-w-xs">
          <Dropdown 
            placeholder="Custom loading icon"
            loading
            loadingIcon={
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-[#FFCB00] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-[#FFCB00] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-[#FFCB00] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            }
            options={[]}
            label="Custom Loading Icon"
            fullWidth
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Form Integration Example Component
 */
function FormIntegrationExample() {
  const [formData, setFormData] = useState({
    country: null as string | null,
    frameworks: [] as string[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.country) {
      newErrors.country = 'Please select a country';
    }
    if (formData.frameworks.length === 0) {
      newErrors.frameworks = 'Please select at least one framework';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const handleReset = () => {
    setFormData({ country: null, frameworks: [] });
    setErrors({});
    setSubmitted(false);
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Dropdown 
          options={countries}
          value={formData.country}
          onChange={(value) => {
            setFormData({...formData, country: value});
            if (errors.country) setErrors({...errors, country: ''});
          }}
          placeholder="Select country"
          required
          name="country"
          label="Country"
          variant={errors.country ? 'error' : 'outlined'}
          helperText={errors.country || 'Required field'}
          searchable
          groupBy="group"
        />
        <Dropdown 
          options={sampleOptions}
          value={formData.frameworks}
          onChange={(value) => {
            setFormData({...formData, frameworks: value});
            if (errors.frameworks) setErrors({...errors, frameworks: ''});
          }}
          placeholder="Select frameworks"
          multiple
          showCheckboxes
          selectAll
          selectAllLabel="Select All"
          name="frameworks"
          label="Favorite Frameworks"
          variant={errors.frameworks ? 'error' : 'outlined'}
          helperText={errors.frameworks || 'Select one or more'}
          clearable
        />
        <div className="flex gap-2 mt-2">
          <button 
            type="submit"
            className="flex-1 px-4 py-2 bg-[#FFCB00] text-black font-medium rounded-lg hover:bg-yellow-400 transition-colors"
          >
            Submit
          </button>
          <button 
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Reset
          </button>
        </div>
        {submitted && (
          <div className="p-3 bg-green-900/50 border border-green-600 rounded-lg text-green-400 text-sm">
            ✓ Form submitted successfully!
            <pre className="mt-2 text-xs overflow-auto">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
        )}
      </form>
    </div>
  );
}

/**
 * PropsReference Component
 * Displays a comprehensive table of all Dropdown props with styling matching AspectRatio preview
 */
function PropsReference() {
  return (
    <div className="w-full bg-white/[0.04] border border-[#364153] rounded-2xl p-6 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="font-manrope text-xl font-semibold m-0 text-white">
          Dropdown Props
        </h3>
        <p className="m-0 text-[#AEB6C4] text-sm leading-relaxed">
          Dropdown is a versatile component for single and multi-select scenarios with support for search, async data loading, 
          custom styling, and keyboard navigation. It accepts all standard HTML div attributes plus the specialized props below.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[640px] font-manrope text-sm text-[#E3E6F2]">
          <thead>
            <tr>
              {[
                { label: "Prop", width: "18%" },
                { label: "Type", width: "28%" },
                { label: "Default", width: "14%" },
                { label: "Description", width: "40%" },
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
                  <code className="text-xs bg-gray-800/50 px-2 py-1 rounded break-all">{prop.type}</code>
                </td>
                <td className="p-3 border-b border-[#2B3546] text-[#C7CBD7]">
                  <code className="text-xs">{prop.defaultValue}</code>
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
 * PreviewCard Component
 * Wraps each dropdown variant section with title, description, and preview area
 */
interface PreviewCardProps {
  title: string;
  description: string;
  code: string;
  children: React.ReactNode;
}

// function PreviewCard({ title, description, code, children }: PreviewCardProps) {
//   const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
//   const [copied, setCopied] = useState(false);

//   const handleCopy = async () => {
//     try {
//       await navigator.clipboard.writeText(code);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch (err) {
//       console.error("Failed to copy:", err);
//     }
//   };

//   return (
//     <div className="component-preview-container bg-[#0d0d0d] border border-[#1e1e1e] rounded-xl p-6 relative min-h-[400px]
//       max-[768px]:p-4 max-[768px]:min-h-[320px]">
//       {/* Header */}
//       <div className="mb-4">
//         <h2 className="text-xl font-semibold text-white mb-2
//           max-[768px]:text-lg">{title}</h2>
//         <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line
//           max-[768px]:text-xs">{description}</p>
//       </div>

//       {/* Content Container */}
//       <div className="bg-[#242424] rounded-lg relative overflow-hidden border border-[#364153]">
//         {/* Toolbar */}
//         <div className="absolute top-4 right-4 z-10 flex items-center gap-2
//           max-[768px]:top-2 max-[768px]:right-2">
//           {/* Copy Button */}
//           <button
//             onClick={handleCopy}
//             className="bg-transparent border border-[#364153] rounded-lg p-2.5 cursor-pointer flex items-center justify-center transition-all hover:bg-white/5
//               max-[768px]:p-2"
//             title={copied ? "Copied!" : "Copy code"}
//           >
//             {copied ? (
//               <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
//                 <path d="M15 4.5L6.75 12.75L3 9" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//             ) : (
//               <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
//                 <rect x="6" y="6" width="9" height="9" rx="1.5" stroke="white" strokeWidth="1.5"/>
//                 <path d="M3.75 11.25V4.5C3.75 3.67157 4.42157 3 5.25 3H12" stroke="white" strokeWidth="1.5"/>
//               </svg>
//             )}
//           </button>

//           {/* Preview/Code Toggle */}
//           <div className="border border-[#364153] rounded-lg flex overflow-hidden">
//             <button
//               onClick={() => setActiveTab("preview")}
//               className={`bg-transparent border-none rounded-lg px-5 py-2.5 font-sans text-sm font-medium cursor-pointer transition-all
//                 max-[768px]:px-3 max-[768px]:py-2 max-[768px]:text-xs
//                 ${activeTab === "preview" ? "bg-[#242424] border border-[#364153] text-white" : "text-gray-400"}`}
//             >
//               Preview
//             </button>
//             <button
//               onClick={() => setActiveTab("code")}
//               className={`bg-transparent border-none rounded-lg px-5 py-2.5 font-sans text-sm font-medium cursor-pointer transition-all
//                 max-[768px]:px-3 max-[768px]:py-2 max-[768px]:text-xs
//                 ${activeTab === "code" ? "bg-[#242424] border border-[#364153] text-white" : "text-gray-400"}`}
//             >
//               Code
//             </button>
//           </div>
//         </div>

//         {/* Content */}
//         {activeTab === "preview" ? (
//           <div className="z-[1] w-full flex justify-center pt-[50px] p-6
//             max-[768px]:pt-[60px] max-[768px]:p-4">
//             {children}
//           </div>
//         ) : (
//           <div className="w-full pt-[60px] px-3 pb-3 overflow-hidden absolute top-0 left-0 bottom-0 right-0
//             max-[768px]:p-3 max-[768px]:relative">
//             <pre className="m-0 p-4 bg-[#1a1a1a] rounded-lg h-full overflow-auto font-mono text-[13px] leading-normal text-gray-200 scrollbar-none
//               max-[768px]:text-[11px] max-[768px]:p-3">
//               <code>{code}</code>
//             </pre>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
