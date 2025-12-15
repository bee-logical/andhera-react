import { useState, useCallback } from "react";
import { Autocomplete, AutocompleteOption } from "@/components/autocomplete";
import { Chip } from "@/components/chip";
import { Snackbar } from "@/components/snackbar";
import { PreviewCard } from "../components/PreviewCard";
// Import icons from the library
import { 
  Search, 
  MapPin, 
  User, 
  Globe, 
  Star, 
  Briefcase 
} from "../../../src/components/icons";

// ============================================================================
// PROP DEFINITIONS
// ============================================================================

interface PropDefinition {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
}

const propDefinitions: PropDefinition[] = [
  // Core Props
  { name: "options", type: "AutocompleteOption[]", defaultValue: "[]", description: "Array of options to display in the dropdown." },
  { name: "value", type: "AutocompleteOption | AutocompleteOption[] | null", defaultValue: "null", description: "Currently selected value(s)." },
  { name: "onChange", type: "(value: AutocompleteOption | AutocompleteOption[] | null) => void", defaultValue: "-", description: "Callback when selection changes." },
  { name: "onInputChange", type: "(value: string) => void", defaultValue: "-", description: "Callback when input value changes." },
  
  // Labels & Text
  { name: "label", type: "string", defaultValue: "-", description: "Primary field label." },
  { name: "labelSecondary", type: "string", defaultValue: "-", description: "Secondary label text." },
  { name: "supportingText", type: "string", defaultValue: "-", description: "Helper text shown below the input." },
  { name: "errorMessage", type: "string", defaultValue: "-", description: "Error message to display." },
  { name: "placeholder", type: "string", defaultValue: "-", description: "Placeholder text for the input." },
  { name: "noOptionsText", type: "string", defaultValue: "'No options'", description: "Message shown when no options match." },
  { name: "loadingText", type: "string", defaultValue: "'Loading...'", description: "Text shown during async loading." },
  { name: "createOptionLabel", type: "(inputValue: string) => string", defaultValue: "-", description: "Function to generate create option label." },
  
  // Validation & Status
  { name: "status", type: "'default' | 'success' | 'warning' | 'error'", defaultValue: "'default'", description: "Validation status affecting visual styling." },
  { name: "required", type: "boolean", defaultValue: "false", description: "Makes the field required." },
  
  // Sizing & Layout
  { name: "size", type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: "Size of the input field." },
  { name: "fullWidth", type: "boolean", defaultValue: "false", description: "Whether the input takes full container width." },
  { name: "width", type: "string | number", defaultValue: "-", description: "Custom width for the input." },
  { name: "height", type: "string | number", defaultValue: "-", description: "Custom height for the input." },
  
  // Variants & Styling
  { name: "variant", type: "'outlined' | 'filled' | 'standard'", defaultValue: "'outlined'", description: "Visual variant of the input." },
  { name: "shape", type: "'square' | 'rounded' | 'pill'", defaultValue: "'rounded'", description: "Border shape of the input." },
  { name: "borderRadius", type: "string", defaultValue: "-", description: "Custom border radius override." },
  { name: "animation", type: "'fade' | 'slide' | 'scale' | 'none'", defaultValue: "'fade'", description: "Animation type for the dropdown." },
  { name: "animationDuration", type: "number", defaultValue: "200", description: "Animation duration in milliseconds." },
  
  // Selection Behavior
  { name: "multiple", type: "boolean", defaultValue: "false", description: "Allow multiple selections." },
  { name: "freeSolo", type: "boolean", defaultValue: "false", description: "Allow free text input not in options." },
  { name: "creatable", type: "boolean", defaultValue: "false", description: "Allow creating new options." },
  { name: "onCreateOption", type: "(inputValue: string) => void", defaultValue: "-", description: "Callback when creating a new option." },
  { name: "isValidNewOption", type: "(inputValue: string) => boolean", defaultValue: "-", description: "Validate new option input." },
  
  // Filter & Search
  { name: "filterMode", type: "'startsWith' | 'contains' | 'custom'", defaultValue: "'contains'", description: "Filter mode for matching options." },
  { name: "customFilter", type: "(option: AutocompleteOption, inputValue: string) => boolean", defaultValue: "-", description: "Custom filter function." },
  { name: "caseSensitive", type: "boolean", defaultValue: "false", description: "Case sensitive filtering." },
  { name: "minChars", type: "number", defaultValue: "0", description: "Minimum characters to trigger dropdown." },
  { name: "maxDropdownItems", type: "number", defaultValue: "-", description: "Maximum items to display in dropdown." },
  { name: "debounceTime", type: "number", defaultValue: "300", description: "Debounce time for search in milliseconds." },
  { name: "highlightMatch", type: "boolean", defaultValue: "true", description: "Highlight matching text in options." },
  
  // Async Loading
  { name: "loading", type: "boolean", defaultValue: "false", description: "Shows loading state." },
  { name: "loadOptions", type: "(inputValue: string) => Promise<AutocompleteOption[]>", defaultValue: "-", description: "Load options asynchronously." },
  { name: "loadOnMount", type: "boolean", defaultValue: "false", description: "Load options on component mount." },
  { name: "asyncMinChars", type: "number", defaultValue: "0", description: "Minimum chars for async search." },
  
  // Interaction
  { name: "disabled", type: "boolean", defaultValue: "false", description: "Disables the autocomplete." },
  { name: "readOnly", type: "boolean", defaultValue: "false", description: "Makes the input read-only." },
  { name: "autoFocus", type: "boolean", defaultValue: "false", description: "Auto-focus on mount." },
  { name: "autoHighlight", type: "boolean", defaultValue: "false", description: "Automatically highlight first option." },
  { name: "openOnFocus", type: "boolean", defaultValue: "false", description: "Open dropdown on focus." },
  { name: "closeOnSelect", type: "boolean", defaultValue: "true", description: "Close dropdown on select (single mode)." },
  { name: "clearOnBlur", type: "boolean", defaultValue: "false", description: "Clear input on blur." },
  { name: "selectOnBlur", type: "boolean", defaultValue: "false", description: "Select highlighted option on blur." },
  
  // UI Features
  { name: "showClearButton", type: "boolean", defaultValue: "true", description: "Show clear button when has value." },
  { name: "showDropdownButton", type: "boolean", defaultValue: "true", description: "Show dropdown toggle button." },
  { name: "showCheckmarks", type: "boolean", defaultValue: "true", description: "Show checkmarks for selected items." },
  { name: "groupBy", type: "string", defaultValue: "-", description: "Group options by property name." },
  
  // Multi-Select Options
  { name: "maxSelected", type: "number", defaultValue: "-", description: "Maximum selected items (multiple mode)." },
  { name: "chipVariant", type: "'filled' | 'outlined' | 'soft' | 'ghost'", defaultValue: "'filled'", description: "Chip variant for selected tags." },
  { name: "chipColor", type: "'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'", defaultValue: "'default'", description: "Chip color for selected tags." },
  { name: "chipSize", type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", defaultValue: "'sm'", description: "Chip size for selected tags." },
  { name: "maxChips", type: "number", defaultValue: "-", description: "Max chips to display before collapsing." },
  { name: "moreChipsText", type: "(count: number) => string", defaultValue: "-", description: "Text for collapsed chips count." },
  { name: "removeOnBackspace", type: "boolean", defaultValue: "true", description: "Allow removing chips with backspace." },
  
  // Icons
  { name: "startIcon", type: "ReactNode", defaultValue: "-", description: "Icon to display at start of input." },
  { name: "endIcon", type: "ReactNode", defaultValue: "-", description: "Icon to display at end of input." },
  { name: "dropdownIcon", type: "ReactNode", defaultValue: "<ChevronDown />", description: "Custom dropdown toggle icon." },
  { name: "clearIcon", type: "ReactNode", defaultValue: "<X />", description: "Custom clear button icon." },
  { name: "loadingIcon", type: "ReactNode", defaultValue: "-", description: "Custom loading spinner icon." },
  { name: "checkIcon", type: "ReactNode", defaultValue: "<CheckCircle />", description: "Custom check icon for selected items." },
  
  // Portal & Positioning
  { name: "portal", type: "boolean", defaultValue: "true", description: "Use portal for dropdown rendering." },
  { name: "portalContainer", type: "HTMLElement", defaultValue: "document.body", description: "Portal container element." },
  { name: "zIndex", type: "number", defaultValue: "1000", description: "Dropdown z-index." },
  { name: "openingDirection", type: "'up' | 'down' | 'auto'", defaultValue: "'auto'", description: "Dropdown opening direction." },
  { name: "dropdownMaxHeight", type: "string | number", defaultValue: "300", description: "Maximum height of dropdown." },
  { name: "dropdownMinWidth", type: "string | number", defaultValue: "-", description: "Minimum width of dropdown." },
  
  // Events
  { name: "onOpen", type: "() => void", defaultValue: "-", description: "Callback when dropdown opens." },
  { name: "onClose", type: "() => void", defaultValue: "-", description: "Callback when dropdown closes." },
  { name: "onHighlight", type: "(option: AutocompleteOption | null) => void", defaultValue: "-", description: "Callback when option is highlighted." },
  { name: "onFocus", type: "(event: FocusEvent) => void", defaultValue: "-", description: "Callback on input focus." },
  { name: "onBlur", type: "(event: FocusEvent) => void", defaultValue: "-", description: "Callback on input blur." },
  { name: "onScroll", type: "(event: UIEvent) => void", defaultValue: "-", description: "Callback when scrolling dropdown." },
  
  // Styling Classes
  { name: "className", type: "string", defaultValue: "-", description: "Additional classes for container." },
  { name: "containerClassName", type: "string", defaultValue: "-", description: "Classes for outer container." },
  { name: "inputWrapperClassName", type: "string", defaultValue: "-", description: "Classes for input wrapper." },
  { name: "inputClassName", type: "string", defaultValue: "-", description: "Classes for input element." },
  { name: "labelClassName", type: "string", defaultValue: "-", description: "Classes for label element." },
  { name: "dropdownClassName", type: "string", defaultValue: "-", description: "Classes for dropdown menu." },
  { name: "optionClassName", type: "string", defaultValue: "-", description: "Classes for dropdown option." },
  
  // Color Customization
  { name: "backgroundColor", type: "string", defaultValue: "-", description: "Background color override." },
  { name: "textColor", type: "string", defaultValue: "-", description: "Text color override." },
  { name: "borderColor", type: "string", defaultValue: "-", description: "Border color override." },
  { name: "focusBorderColor", type: "string", defaultValue: "-", description: "Focus border color override." },
  { name: "dropdownBgColor", type: "string", defaultValue: "-", description: "Dropdown background color." },
  { name: "optionHoverColor", type: "string", defaultValue: "-", description: "Option hover color." },
  { name: "selectedOptionColor", type: "string", defaultValue: "-", description: "Selected option color." },
];

// ============================================================================
// SAMPLE DATA
// ============================================================================

const countries: AutocompleteOption[] = [
  { id: 1, label: "United States", value: "US", icon: <Globe size={16} /> },
  { id: 2, label: "United Kingdom", value: "GB", icon: <Globe size={16} /> },
  { id: 3, label: "Canada", value: "CA", icon: <Globe size={16} /> },
  { id: 4, label: "Australia", value: "AU", icon: <Globe size={16} /> },
  { id: 5, label: "Germany", value: "DE", icon: <Globe size={16} /> },
  { id: 6, label: "France", value: "FR", icon: <Globe size={16} /> },
  { id: 7, label: "Japan", value: "JP", icon: <Globe size={16} /> },
  { id: 8, label: "Brazil", value: "BR", icon: <Globe size={16} /> },
  { id: 9, label: "India", value: "IN", icon: <Globe size={16} /> },
  { id: 10, label: "China", value: "CN", icon: <Globe size={16} /> },
];

const programmingLanguages: AutocompleteOption[] = [
  { id: 1, label: "JavaScript", description: "Dynamic scripting language for web", group: "Web", icon: <Briefcase size={16} /> },
  { id: 2, label: "TypeScript", description: "Typed superset of JavaScript", group: "Web", icon: <Briefcase size={16} /> },
  { id: 3, label: "Python", description: "High-level programming language", group: "General Purpose", icon: <Briefcase size={16} /> },
  { id: 4, label: "Java", description: "Object-oriented enterprise language", group: "General Purpose", icon: <Briefcase size={16} /> },
  { id: 5, label: "C++", description: "Systems and application programming", group: "Systems", icon: <Briefcase size={16} /> },
  { id: 6, label: "Rust", description: "Memory-safe systems language", group: "Systems", icon: <Briefcase size={16} /> },
  { id: 7, label: "Go", description: "Fast and simple by Google", group: "Systems", icon: <Briefcase size={16} /> },
  { id: 8, label: "PHP", description: "Server-side web scripting", group: "Web", icon: <Briefcase size={16} /> },
  { id: 9, label: "Ruby", description: "Dynamic, object-oriented scripting", group: "Web", icon: <Briefcase size={16} /> },
  { id: 10, label: "Swift", description: "Apple ecosystem development", group: "Mobile", icon: <Briefcase size={16} /> },
  { id: 11, label: "Kotlin", description: "Modern JVM language for Android", group: "Mobile", icon: <Briefcase size={16} /> },
];

const fruits: AutocompleteOption[] = [
  { id: 1, label: "Apple" },
  { id: 2, label: "Banana" },
  { id: 3, label: "Cherry" },
  { id: 4, label: "Date" },
  { id: 5, label: "Elderberry" },
  { id: 6, label: "Fig" },
  { id: 7, label: "Grape" },
  { id: 8, label: "Honeydew" },
  { id: 9, label: "Kiwi" },
  { id: 10, label: "Lemon" },
];

const users: AutocompleteOption[] = [
  { id: 1, label: "John Doe", description: "john@example.com", icon: <User size={16} /> },
  { id: 2, label: "Jane Smith", description: "jane@example.com", icon: <User size={16} /> },
  { id: 3, label: "Bob Johnson", description: "bob@example.com", icon: <User size={16} /> },
  { id: 4, label: "Alice Williams", description: "alice@example.com", icon: <User size={16} /> },
  { id: 5, label: "Charlie Brown", description: "charlie@example.com", icon: <User size={16} /> },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function AutocompletePreview() {
  // State for various examples
  const [basicValue, setBasicValue] = useState<AutocompleteOption | null>(null);
  const [multiValue, setMultiValue] = useState<AutocompleteOption[] | null>(null);
  const [groupedValue, setGroupedValue] = useState<AutocompleteOption | null>(null);
  const [validationValue, setValidationValue] = useState<AutocompleteOption | null>(null);
  const [asyncValue, setAsyncValue] = useState<AutocompleteOption | null>(null);
  const [creatableValue, setCreatableValue] = useState<AutocompleteOption | null>(null);
  const [customOptions, setCustomOptions] = useState<AutocompleteOption[]>(fruits);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({ open: false, message: "" });

  // Simulate async loading
  const loadOptionsAsync = useCallback(async (inputValue: string): Promise<AutocompleteOption[]> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return countries.filter(c => 
      c.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, []);

  // Handle creating new option
  const handleCreateOption = useCallback((input: string) => {
    const newOption: AutocompleteOption = {
      id: Date.now(),
      label: input,
    };
    setCustomOptions(prev => [...prev, newOption]);
    setCreatableValue(newOption);
    setSnackbar({ open: true, message: `Created new option: "${input}"` });
  }, []);

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        duration={3000}
        type="success"
      />

      {/* Introduction */}
      <div className="p-6 bg-gradient-to-r from-[#1A1D26] to-[#2B2F3C] rounded-xl border border-[#FACC15]/20">
        <h2 className="text-2xl font-bold text-white mb-3">Autocomplete Component</h2>
        <p className="text-gray-300 mb-4">
          A powerful, fully customizable autocomplete component built with React. It supports single/multiple selection, 
          async loading, custom rendering, and extensive styling options.
        </p>
        <div className="mb-4 p-4 bg-[#151821] rounded-lg border border-[#FACC15]/10">
          <h3 className="text-sm font-semibold text-[#FACC15] mb-2">🔗 Component Composition</h3>
          <p className="text-sm text-gray-400 mb-2">
            This component demonstrates library composition - it internally uses:
          </p>
          <ul className="text-sm text-gray-400 list-disc list-inside space-y-1">
            <li><code className="text-[#60A5FA]">Chip</code> component for multi-select tags</li>
            <li><code className="text-[#60A5FA]">Dropdown</code> CSS for consistent animations (fade, slide, scale)</li>
            <li><code className="text-[#60A5FA]">Icons</code> from the library icon system</li>
          </ul>
        </div>
        <div className="flex flex-wrap gap-2">
          <Chip label="Fully Customizable" variant="soft" color="primary" size="sm" />
          <Chip label="Async Support" variant="soft" color="success" size="sm" />
          <Chip label="Multi-Select" variant="soft" color="info" size="sm" />
          <Chip label="Accessible" variant="soft" color="warning" size="sm" />
          <Chip label="Uses Dropdown Animations" variant="outlined" color="secondary" size="sm" />
        </div>
      </div>

      {/* Basic Autocomplete */}
      <PreviewCard
        title="Basic Autocomplete"
        description="Simple autocomplete with search and selection functionality. Uses library's Chip component internally for tags."
        code={`import { useState } from "react";
import { Autocomplete, AutocompleteOption } from "andhera-react";

const options: AutocompleteOption[] = [
  { id: 1, label: "Apple" },
  { id: 2, label: "Banana" },
  { id: 3, label: "Cherry" },
];

export function BasicExample() {
  const [value, setValue] = useState<AutocompleteOption | null>(null);

  return (
    <Autocomplete
      label="Select Fruit"
      options={options}
      value={value}
      onChange={setValue}
      placeholder="Search fruits..."
    />
  );
}`}
      >
        <div className="flex justify-center w-full">
          <div className="flex flex-col gap-4 w-full max-w-md">
            <Autocomplete
              label="Select Fruit"
              options={fruits}
              value={basicValue}
              onChange={(val) => setBasicValue(val as AutocompleteOption | null)}
              placeholder="Search fruits..."
            />
            {basicValue && (
              <p className="text-sm text-gray-400">Selected: {basicValue.label}</p>
            )}
          </div>
        </div>
      </PreviewCard>

      {/* Variants */}
      <PreviewCard
        title="Variants & Shapes"
        description="Choose between outlined, filled, and standard variants. Combine with different shapes for unique looks."
        code={`import { Autocomplete } from "andhera-react";

export function VariantsExample() {
  return (
    <div className="grid gap-4">
      {/* Variants */}
      <Autocomplete variant="outlined" label="Outlined" options={options} />
      <Autocomplete variant="filled" label="Filled" options={options} />
      <Autocomplete variant="standard" label="Standard" options={options} />
      
      {/* Shapes */}
      <Autocomplete shape="square" label="Square" options={options} />
      <Autocomplete shape="rounded" label="Rounded" options={options} />
      <Autocomplete shape="pill" label="Pill" options={options} />
      
      {/* Custom Border Radius */}
      <Autocomplete borderRadius="20px" label="Custom Radius" options={options} />
    </div>
  );
}`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          <Autocomplete variant="outlined" label="Outlined" options={fruits} placeholder="Search..." fullWidth />
          <Autocomplete variant="filled" label="Filled" options={fruits} placeholder="Search..." fullWidth />
          <Autocomplete variant="standard" label="Standard" options={fruits} placeholder="Search..." fullWidth />
          <Autocomplete shape="square" label="Square Shape" options={fruits} placeholder="Search..." fullWidth />
          <Autocomplete shape="rounded" label="Rounded Shape" options={fruits} placeholder="Search..." fullWidth />
          <Autocomplete shape="pill" label="Pill Shape" options={fruits} placeholder="Search..." fullWidth />
        </div>
      </PreviewCard>

      {/* Sizes */}
      <PreviewCard
        title="Sizes"
        description="Three sizes available: small, medium, and large. Adapts icons and padding automatically."
        code={`import { Autocomplete } from "andhera-react";

export function SizesExample() {
  return (
    <div className="flex flex-col gap-4">
      <Autocomplete size="sm" label="Small" options={options} placeholder="Small size..." />
      <Autocomplete size="md" label="Medium (default)" options={options} placeholder="Medium size..." />
      <Autocomplete size="lg" label="Large" options={options} placeholder="Large size..." />
    </div>
  );
}`}
      >
        <div className="flex justify-center w-full">
          <div className="flex flex-col gap-4 w-full max-w-md">
            <Autocomplete size="sm" label="Small" options={fruits} placeholder="Small size..." />
            <Autocomplete size="md" label="Medium (default)" options={fruits} placeholder="Medium size..." />
            <Autocomplete size="lg" label="Large" options={fruits} placeholder="Large size..." />
          </div>
        </div>
      </PreviewCard>

      {/* Multiple Selection with Chips */}
      <PreviewCard
        title="Multiple Selection with Chips"
        description="Enable multiple selections using our Chip component for tags. This demonstrates library component composition - Autocomplete internally uses Chip for the multi-select UI. All Chip props are exposed for full customization."
        code={`import { useState } from "react";
import { Autocomplete, AutocompleteOption } from "andhera-react";

// Autocomplete uses the Chip component internally for multi-select tags
// This is an example of library component composition

export function MultipleExample() {
  const [value, setValue] = useState<AutocompleteOption[] | null>(null);

  return (
    <Autocomplete
      label="Select Countries"
      options={countries}
      value={value}
      onChange={setValue}
      multiple
      placeholder="Search and select..."
      chipVariant="soft"      // 'filled' | 'outlined' | 'soft' | 'ghost'
      chipColor="primary"     // 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
      chipSize="sm"           // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
      maxChips={3}            // Show max 3 chips, collapse rest
      maxSelected={5}         // Limit to 5 selections
      removeOnBackspace       // Remove last chip on backspace
    />
  );
}`}
      >
        <div className="flex flex-col gap-6 w-full items-center">
          <div className="max-w-md w-full">
            <Autocomplete
              label="Select Countries"
              options={countries}
              value={multiValue}
              onChange={(val) => setMultiValue(val as AutocompleteOption[] | null)}
              multiple
              placeholder="Search and select..."
              chipVariant="soft"
              chipColor="primary"
              chipSize="sm"
              maxChips={3}
              maxSelected={5}
              supportingText="Select up to 5 countries. Backspace removes last selection."
            />
          </div>
          {multiValue && multiValue.length > 0 && (
            <div className="p-3 bg-[#151821] rounded-lg">
              <p className="text-sm text-gray-400 mb-2">Selected ({multiValue.length}):</p>
              <div className="flex flex-wrap gap-2">
                {multiValue.map(item => (
                  <Chip key={item.id} label={item.label} variant="outlined" color="success" size="sm" />
                ))}
              </div>
            </div>
          )}
        </div>
      </PreviewCard>

      {/* Grouped Options */}
      <PreviewCard
        title="Grouped Options"
        description="Organize options into groups for better categorization. Groups are sticky headers in the dropdown."
        code={`import { Autocomplete, AutocompleteOption } from "andhera-react";

const languages: AutocompleteOption[] = [
  { id: 1, label: "JavaScript", group: "Web", description: "Dynamic scripting" },
  { id: 2, label: "Python", group: "General Purpose", description: "High-level" },
  { id: 3, label: "Rust", group: "Systems", description: "Memory-safe" },
];

export function GroupedExample() {
  return (
    <Autocomplete
      label="Programming Language"
      options={languages}
      groupBy="group"
      placeholder="Select language..."
      showCheckmarks
    />
  );
}`}
      >
        <div className="flex justify-center w-full">
          <div className="flex flex-col gap-4 w-full max-w-md">
            <Autocomplete
              label="Programming Language"
              options={programmingLanguages}
              value={groupedValue}
              onChange={(val) => setGroupedValue(val as AutocompleteOption | null)}
              groupBy="group"
              placeholder="Select language..."
              showCheckmarks
            />
          </div>
        </div>
      </PreviewCard>

      {/* With Icons and Descriptions */}
      <PreviewCard
        title="Icons & Descriptions"
        description="Options can include icons and descriptions for richer display. Start and end icons for the input are also supported."
        code={`import { Autocomplete, AutocompleteOption } from "andhera-react";
import { Search, MapPin } from "lucide-react";

const users: AutocompleteOption[] = [
  { id: 1, label: "John Doe", description: "john@example.com", icon: <User /> },
  { id: 2, label: "Jane Smith", description: "jane@example.com", icon: <User /> },
];

export function IconsExample() {
  return (
    <Autocomplete
      label="Select User"
      options={users}
      startIcon={<Search size={18} />}
      placeholder="Search users..."
    />
  );
}`}
      >
        <div className="flex justify-center w-full">
          <div className="flex flex-col gap-4 w-full max-w-md">
            <Autocomplete
              label="Select User"
              options={users}
              startIcon={<Search size={18} />}
              placeholder="Search users..."
              supportingText="Options include icons and email descriptions"
            />
            <Autocomplete
              label="Location"
              options={countries}
              startIcon={<MapPin size={18} />}
              endIcon={<Globe size={18} />}
              placeholder="Search location..."
            />
          </div>
        </div>
      </PreviewCard>

      {/* Filter Modes */}
      <PreviewCard
        title="Filter Modes"
        description="Control how options are filtered: startsWith, contains, or provide a custom filter function."
        code={`import { Autocomplete, AutocompleteOption } from "andhera-react";

// Custom filter: match label OR description
const customFilter = (option: AutocompleteOption, input: string) => {
  const search = input.toLowerCase();
  return option.label.toLowerCase().includes(search) ||
    (option.description?.toLowerCase().includes(search) ?? false);
};

export function FilterExample() {
  return (
    <div className="flex flex-col gap-4">
      <Autocomplete
        label="Starts With"
        options={options}
        filterMode="startsWith"
        placeholder="Type 'Ap' for Apple..."
      />
      <Autocomplete
        label="Contains"
        options={options}
        filterMode="contains"
        highlightMatch  // Highlight matching text
        placeholder="Type 'ana' for Banana..."
      />
      <Autocomplete
        label="Custom Filter"
        options={options}
        filterMode="custom"
        customFilter={customFilter}
        placeholder="Search label or description..."
      />
    </div>
  );
}`}
      >
        <div className="flex justify-center w-full">
          <div className="flex flex-col gap-4 w-full max-w-md">
            <Autocomplete
              label="Starts With"
              options={fruits}
              filterMode="startsWith"
              placeholder="Type 'Ap' for Apple..."
            />
            <Autocomplete
              label="Contains (with highlight)"
              options={fruits}
              filterMode="contains"
              highlightMatch
              placeholder="Type 'ana' for Banana..."
            />
          </div>
        </div>
      </PreviewCard>

      {/* Validation States */}
      <PreviewCard
        title="Validation States"
        description="Visual feedback for success, warning, and error states with supporting text or error messages."
        code={`import { Autocomplete } from "andhera-react";

export function ValidationExample() {
  return (
    <div className="flex flex-col gap-4">
      <Autocomplete
        label="Success"
        options={options}
        status="success"
        supportingText="Great choice!"
      />
      <Autocomplete
        label="Warning"
        options={options}
        status="warning"
        supportingText="Please review your selection"
      />
      <Autocomplete
        label="Error"
        options={options}
        status="error"
        errorMessage="This field is required"
        required
      />
    </div>
  );
}`}
      >
        <div className="flex justify-center w-full">
          <div className="flex flex-col gap-4 w-full max-w-md">
            <Autocomplete
              label="Success"
              options={fruits}
              value={fruits[0]}
              status="success"
              supportingText="Great choice!"
              readOnly
            />
            <Autocomplete
              label="Warning"
              options={fruits}
              status="warning"
              supportingText="Please review your selection"
            />
            <Autocomplete
              label="Error"
              options={fruits}
              value={validationValue}
              onChange={(val) => setValidationValue(val as AutocompleteOption | null)}
              status="error"
              errorMessage="This field is required"
              required
            />
          </div>
        </div>
      </PreviewCard>

      {/* Async Loading */}
      <PreviewCard
        title="Async Loading"
        description="Load options asynchronously from an API or database. Supports debouncing and minimum character triggers."
        code={`import { useState, useCallback } from "react";
import { Autocomplete, AutocompleteOption } from "andhera-react";

export function AsyncExample() {
  const [value, setValue] = useState<AutocompleteOption | null>(null);

  // Simulated API call
  const loadOptions = useCallback(async (input: string): Promise<AutocompleteOption[]> => {
    const response = await fetch(\`/api/search?q=\${input}\`);
    return response.json();
  }, []);

  return (
    <Autocomplete
      label="Search Countries"
      value={value}
      onChange={setValue}
      loadOptions={loadOptions}
      asyncMinChars={2}           // Start searching after 2 chars
      debounceTime={500}          // Wait 500ms after typing
      loadOnMount={false}         // Don't load on initial render
      loadingText="Searching..."
      noOptionsText="No countries found"
      placeholder="Type to search..."
    />
  );
}`}
      >
        <div className="flex justify-center w-full">
          <div className="flex flex-col gap-4 w-full max-w-md">
            <Autocomplete
              label="Search Countries (Async)"
              options={[]}
              value={asyncValue}
              onChange={(val) => setAsyncValue(val as AutocompleteOption | null)}
              loadOptions={loadOptionsAsync}
              asyncMinChars={1}
              debounceTime={500}
              loadingText="Searching countries..."
              noOptionsText="No countries found"
              placeholder="Type to search..."
              supportingText="Start typing to search (1 sec simulated delay)"
            />
          </div>
        </div>
      </PreviewCard>

      {/* Creatable */}
      <PreviewCard
        title="Creatable Mode"
        description="Allow users to create new options that don't exist in the list. Great for tag inputs or adding new items."
        code={`import { useState, useCallback } from "react";
import { Autocomplete, AutocompleteOption, Snackbar } from "andhera-react";

export function CreatableExample() {
  const [value, setValue] = useState<AutocompleteOption | null>(null);
  const [options, setOptions] = useState<AutocompleteOption[]>(initialOptions);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const handleCreate = useCallback((input: string) => {
    const newOption = { id: Date.now(), label: input };
    setOptions(prev => [...prev, newOption]);
    setValue(newOption);
    setSnackbar({ open: true, message: \`Created: "\${input}"\` });
  }, []);

  return (
    <>
      <Autocomplete
        label="Tags"
        options={options}
        value={value}
        onChange={setValue}
        creatable
        onCreateOption={handleCreate}
        createOptionLabel={(input) => \`+ Create "\${input}"\`}
        isValidNewOption={(input) => input.trim().length >= 2}
        placeholder="Type to add tags..."
      />
      <Snackbar open={snackbar.open} message={snackbar.message} onClose={() => setSnackbar({...snackbar, open: false})} />
    </>
  );
}`}
      >
        <div className="flex justify-center w-full">
          <div className="flex flex-col gap-4 w-full max-w-md">
            <Autocomplete
              label="Tags (Creatable)"
              options={customOptions}
              value={creatableValue}
              onChange={(val) => setCreatableValue(val as AutocompleteOption | null)}
              creatable
              onCreateOption={handleCreateOption}
              createOptionLabel={(input) => `+ Create "${input}"`}
              isValidNewOption={(input) => input.trim().length >= 2}
              placeholder="Type to add tags..."
              supportingText="Type a new value and press Enter to create"
            />
          </div>
        </div>
      </PreviewCard>

      {/* Disabled & Read-only */}
      <PreviewCard
        title="Disabled & Read-only States"
        description="Control interaction states for different scenarios."
        code={`import { Autocomplete } from "andhera-react";

export function StatesExample() {
  return (
    <div className="flex flex-col gap-4">
      <Autocomplete
        label="Disabled"
        options={options}
        value={options[0]}
        disabled
        supportingText="Cannot be modified"
      />
      <Autocomplete
        label="Read-only"
        options={options}
        value={options[1]}
        readOnly
        supportingText="View only mode"
      />
    </div>
  );
}`}
      >
        <div className="flex justify-center w-full">
          <div className="flex flex-col gap-4 w-full max-w-md">
            <Autocomplete
              label="Disabled"
              options={fruits}
              value={fruits[0]}
              disabled
              supportingText="Cannot be modified"
            />
            <Autocomplete
              label="Read-only"
              options={fruits}
              value={fruits[1]}
              readOnly
              supportingText="View only mode"
            />
          </div>
        </div>
      </PreviewCard>

      {/* Dropdown Animations (Shared with Dropdown Component) */}
      <PreviewCard
        title="Dropdown Animations"
        description="Uses the same animation system as our Dropdown component for visual consistency across the library. Choose between fade, slide, scale, or no animation."
        code={`import { Autocomplete } from "andhera-react";

// Autocomplete uses Dropdown's shared CSS animations internally
// This ensures consistent dropdown behavior across all library components

export function AnimationsExample() {
  return (
    <div className="grid gap-4">
      {/* Fade animation (default) */}
      <Autocomplete
        label="Fade Animation"
        options={options}
        animation="fade"
        animationDuration={200}
      />
      
      {/* Slide animation */}
      <Autocomplete
        label="Slide Animation"
        options={options}
        animation="slide"
        animationDuration={250}
      />
      
      {/* Scale animation */}
      <Autocomplete
        label="Scale Animation"
        options={options}
        animation="scale"
        animationDuration={200}
      />
      
      {/* No animation */}
      <Autocomplete
        label="No Animation"
        options={options}
        animation="none"
      />
    </div>
  );
}`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <Autocomplete
            label="Fade Animation (default)"
            options={fruits}
            animation="fade"
            animationDuration={200}
            placeholder="Click to see animation..."
            fullWidth
          />
          <Autocomplete
            label="Slide Animation"
            options={fruits}
            animation="slide"
            animationDuration={250}
            placeholder="Click to see animation..."
            fullWidth
          />
          <Autocomplete
            label="Scale Animation"
            options={fruits}
            animation="scale"
            animationDuration={200}
            placeholder="Click to see animation..."
            fullWidth
          />
          <Autocomplete
            label="No Animation"
            options={fruits}
            animation="none"
            placeholder="Click to see - no animation"
            fullWidth
          />
        </div>
        <div className="mt-4 p-3 bg-[#151821] rounded-lg">
          <p className="text-xs text-gray-400">
            <span className="text-[#FACC15] font-medium">Note:</span> These animations are shared with the <code className="text-[#60A5FA]">Dropdown</code> component 
            via <code className="text-[#60A5FA]">Dropdown.css</code>. This ensures a consistent user experience across all dropdown-style components in the library.
          </p>
        </div>
      </PreviewCard>

      {/* Custom Rendering */}
      <PreviewCard
        title="Custom Rendering"
        description="Fully customize how options, tags, and other elements are rendered using render props."
        code={`import { Autocomplete, AutocompleteOption, Chip } from "andhera-react";

export function CustomRenderExample() {
  return (
    <Autocomplete
      label="Custom Options"
      options={users}
      multiple
      // Custom option render
      renderOption={(option, { selected, highlighted }) => (
        <div className={\`p-3 flex items-center gap-3 \${highlighted ? 'bg-blue-900/50' : ''}\`}>
          <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
            {option.label.charAt(0)}
          </div>
          <div>
            <div className="font-medium">{option.label}</div>
            <div className="text-xs text-gray-400">{option.description}</div>
          </div>
          {selected && <span className="ml-auto">✓</span>}
        </div>
      )}
      // Custom tags render
      renderTags={(values, onRemove) => (
        <div className="flex flex-wrap gap-1">
          {values.map(v => (
            <Chip
              key={v.id}
              label={v.label}
              variant="filled"
              color="secondary"
              removable
              onRemove={() => onRemove(v)}
            />
          ))}
        </div>
      )}
      // Custom empty state
      renderEmpty={() => (
        <div className="p-6 text-center">
          <span className="text-4xl">🔍</span>
          <p className="mt-2 text-gray-400">No users found</p>
        </div>
      )}
    />
  );
}`}
      >
        <div className="flex flex-col gap-4 w-full max-w-lg">
          <Autocomplete
            label="Custom Rendered Options"
            options={users}
            renderOption={(option, { selected, highlighted }) => (
              <div className={`p-3 flex items-center gap-3 cursor-pointer transition-colors ${highlighted ? 'bg-[#FACC15]/20' : ''} ${selected ? 'bg-[#FACC15]/30' : ''}`}>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FACC15] to-[#F59E0B] flex items-center justify-center text-black font-bold">
                  {option.label.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-white">{option.label}</div>
                  <div className="text-xs text-gray-400">{option.description}</div>
                </div>
                {selected && <Star className="text-[#FACC15]" size={18} fill="currentColor" />}
              </div>
            )}
            renderEmpty={() => (
              <div className="p-8 text-center">
                <div className="text-5xl mb-3">🔍</div>
                <p className="text-gray-400">No users found</p>
                <p className="text-xs text-gray-500 mt-1">Try a different search term</p>
              </div>
            )}
            placeholder="Search users..."
          />
        </div>
      </PreviewCard>

      {/* Styling Customization */}
      <PreviewCard
        title="Custom Styling"
        description="Extensive styling options through className props, style overrides, and custom colors."
        code={`import { Autocomplete } from "andhera-react";

export function StylingExample() {
  return (
    <Autocomplete
      label="Custom Styled"
      options={options}
      // Color customization
      backgroundColor="#0F172A"
      textColor="#E2E8F0"
      borderColor="#3B82F6"
      focusBorderColor="#22D3EE"
      dropdownBgColor="#1E293B"
      optionHoverColor="#334155"
      selectedOptionColor="#3B82F6"
      
      // Class customization
      containerClassName="my-4"
      inputWrapperClassName="shadow-lg"
      dropdownClassName="border-2 border-cyan-500"
      optionClassName="px-4 py-3"
      
      // Style overrides
      containerStyle={{ maxWidth: '400px' }}
      dropdownStyle={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
      
      // UI options
      portal={true}             // Render dropdown in portal
      zIndex={9999}             // Dropdown z-index
      openingDirection="auto"   // Auto-detect best direction
      dropdownMaxHeight={250}   // Max dropdown height
    />
  );
}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <Autocomplete
            label="Blue Theme"
            options={fruits}
            backgroundColor="#0F172A"
            textColor="#E2E8F0"
            borderColor="#3B82F6"
            focusBorderColor="#22D3EE"
            dropdownBgColor="#1E293B"
            selectedOptionColor="rgba(59, 130, 246, 0.3)"
            placeholder="Custom blue theme..."
            fullWidth
          />
          <Autocomplete
            label="Purple Theme"
            options={fruits}
            backgroundColor="#1E1B4B"
            textColor="#E9D5FF"
            borderColor="#8B5CF6"
            focusBorderColor="#A78BFA"
            dropdownBgColor="#312E81"
            selectedOptionColor="rgba(139, 92, 246, 0.3)"
            placeholder="Custom purple theme..."
            fullWidth
          />
        </div>
      </PreviewCard>

      {/* Portal & Positioning */}
      <PreviewCard
        title="Portal & Positioning"
        description="Control dropdown rendering with portal mode and opening direction for edge cases."
        code={`import { Autocomplete } from "andhera-react";

export function PortalExample() {
  return (
    <div className="flex flex-col gap-4">
      <Autocomplete
        label="Portal Mode (default)"
        options={options}
        portal={true}               // Render in document body
        zIndex={9999}               // High z-index
        openingDirection="auto"     // Auto-detect direction
      />
      <Autocomplete
        label="Opens Upward"
        options={options}
        openingDirection="up"
        dropdownMaxHeight={200}
      />
      <Autocomplete
        label="Non-Portal (inline)"
        options={options}
        portal={false}              // Render inline
      />
    </div>
  );
}`}
      >
        <div className="flex justify-center w-full">
          <div className="flex flex-col gap-4 w-full max-w-md">
            <Autocomplete
              label="Auto Direction (Portal)"
              options={fruits}
              openingDirection="auto"
              placeholder="Dropdown auto-positions..."
            />
            <Autocomplete
              label="Opens Upward"
              options={fruits}
              openingDirection="up"
              placeholder="Opens above..."
            />
          </div>
        </div>
      </PreviewCard>

      {/* Behavior Options */}
      <PreviewCard
        title="Interaction Behavior"
        description="Fine-tune interaction behavior with various boolean options."
        code={`import { Autocomplete } from "andhera-react";

export function BehaviorExample() {
  return (
    <Autocomplete
      label="Configured Behavior"
      options={options}
      
      // Focus behavior
      autoFocus={false}         // Auto-focus on mount
      openOnFocus={true}        // Open dropdown on focus
      
      // Selection behavior
      closeOnSelect={true}      // Close after selection
      autoHighlight={true}      // Highlight first option
      selectOnBlur={false}      // Select highlighted on blur
      clearOnBlur={false}       // Clear input on blur
      
      // Search behavior
      minChars={0}              // Min chars to show dropdown
      maxDropdownItems={10}     // Max items in dropdown
      caseSensitive={false}     // Case-insensitive search
      
      // UI controls
      showClearButton={true}    // Show clear X button
      showDropdownButton={true} // Show dropdown toggle
      showCheckmarks={true}     // Show checkmarks on selected
    />
  );
}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <Autocomplete
            label="Open on Focus"
            options={fruits}
            openOnFocus
            autoHighlight
            placeholder="Click to see all..."
            supportingText="Dropdown opens immediately on focus"
            fullWidth
          />
          <Autocomplete
            label="Min 2 Characters"
            options={fruits}
            minChars={2}
            placeholder="Type 2+ chars..."
            supportingText="Dropdown requires minimum input"
            fullWidth
          />
        </div>
      </PreviewCard>

      {/* ================================================================== */}
      {/* PROPS REFERENCE TABLE                                             */}
      {/* ================================================================== */}
      <div className="bg-[#1A2332] border border-[#364153] rounded-2xl p-4 sm:p-6 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="font-manrope text-xl font-semibold m-0 text-white">
            Autocomplete Props
          </h3>
          <p className="m-0 text-[#AEB6C4] text-sm leading-relaxed">
            Autocomplete is a powerful search input with dropdown suggestions, supporting single/multi-select, 
            async loading, creatable options, and extensive customization. Uses DropdownMenu and Chip components internally.
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
    </div>
  );
}
