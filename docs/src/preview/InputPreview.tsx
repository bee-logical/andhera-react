import { useState, type ReactNode, type CSSProperties, type ChangeEvent } from "react";
import Input from "../../../src/components/input/BeeInput";
import { Search, Lock, CheckCircle, AlertCircle } from "../../../src/components/icons";
import { PropertiesTable, type PropertyItem } from "../components/PropertiesTable";

const containerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "48px",
  width: "100%",
};

const previewContentStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "24px",
  justifyContent: "center",
  alignItems: "flex-start",
  width: "100%",
  padding: "16px",
};

const singleInputStyle: CSSProperties = {
  width: "min(100%, 360px)",
};

const twoColumnGridStyle: CSSProperties = {
  display: "grid",
  gap: "24px",
  width: "100%",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  maxWidth: "800px",
};

const threeColumnGridStyle: CSSProperties = {
  display: "grid",
  gap: "24px",
  width: "100%",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  maxWidth: "900px",
};

const iconColor = "#8A8F9B";
const iconStrokeWidth = 1.5;
const iconSize = 20;

const labelCode = `import { Input } from "andhera-react";

export function Example() {
  return (
    <Input
      label="Project name"
      labelSecondary="Internal"
      supportingText="Visible to collaborators"
      placeholder="Market intelligence"
      fullWidth
    />
  );
}`;

const typeShowcaseCode = `import { Input } from "andhera-react";

export function Example() {
  return (
    <div style={{ display: "grid", gap: 18 }}>
      <Input
        label="Workspace title"
        type="text"
        placeholder="Market Intel"
        supportingText='type="text"'
        fullWidth
      />
      <Input
        label="Owner email"
        labelSecondary="Required"
        type="email"
        placeholder="team@andhera.com"
        supportingText='type="email"'
        fullWidth
      />
      <Input
        label="Seats"
        type="number"
        defaultValue={12}
        supportingText='type="number"'
        fullWidth
      />
      <Input
        label="Search anything"
        type="search"
        placeholder='Try "billing"'
        supportingText='type="search"'
        fullWidth
      />
      <Input
        label="Generate password"
        type="password"
        defaultValue="Team@2025!"
        supportingText='type="password"'
        fullWidth
      />
    </div>
  );
}`;

const variantCode = `import { Input } from "andhera-react";

export function Example() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Input label="Outlined variant" placeholder="Default look" variant="outlined" fullWidth />
      <Input label="Filled variant" placeholder="Soft contrast" variant="filled" fullWidth />
    </div>
  );
}`;

const sizeShowcaseCode = `import { Input } from "andhera-react";

export function Example() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Input label="Compact" placeholder="Short inputs" size="sm" fullWidth />
      <Input label="Default" placeholder="Most flows" size="md" fullWidth />
      <Input label="Comfort" placeholder="Better tap targets" size="lg" fullWidth />
    </div>
  );
}`;

const labelPlacementCode = `import { Input } from "andhera-react";

export function Example() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Input
        label="Project name"
        supportingText="Default stacked label"
        placeholder="Market intelligence"
        fullWidth
      />
      <Input
        label="Workspace slug"
        labelPlacement="inner"
        placeholder="studio-alpha"
        supportingText="Inner label sits inside the field"
        fullWidth
      />
      <Input
        label="Billing ID"
        labelPlacement="border"
        placeholder="INV-2045"
        supportingText="Border label floats over the outline"
        fullWidth
      />
    </div>
  );
}`;

const iconPlacementCode = `import { useState } from "react";
import { Input } from "andhera-react";
import { Search, CheckCircle } from "andhera/icons";

export function Example() {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Input
        label="Workspace search"
        placeholder='Try "billing"'
        startIcon={<Search size={20} color="#8A8F9B" strokeWidth={1.5} />}
        supportingText="Start icon keeps the field contextual"
        fullWidth
      />
      <Input
        label="Invite teammate"
        placeholder="name@company.com"
        startIcon={<Search size={20} color="#8A8F9B" strokeWidth={1.5} />}
        endIcon={<CheckCircle size={20} color="#00C951" strokeWidth={1.5} />}
        onEndIconClick={() => setConfirmed((prev) => !prev)}
        supportingText={confirmed ? "Invite sent" : "Tap check to confirm"}
        fullWidth
      />
    </div>
  );
}`;

const adornmentCode = `import { Input } from "andhera-react";

export function Example() {
  return (
    <Input
      label="Budget"
      prefix={<strong>USD</strong>}
      suffix={<span style={{ opacity: 0.7 }}>/month</span>}
      defaultValue="12,500"
      supportingText="Auto converts in approvals"
      fullWidth
    />
  );
}`;

const characterCountCode = `import { useState } from "react";
import { Input } from "andhera-react";

export function Example() {
  const [value, setValue] = useState("ops-handoff");
  const limit = 24;

  const handleChange = (event) => {
    const nextValue = event.target.value.slice(0, limit);
    setValue(nextValue);
  };

  return (
    <Input
      label="Channel slug"
      prefix={<span style={{ fontWeight: 600 }}>#</span>}
      value={value}
      onChange={handleChange}
      supportingText={value.length + "/" + limit + " characters"}
      fullWidth
    />
  );
}`;

const passwordCode = `import { Input } from "andhera-react";
import { Lock } from "andhera/icons";

export function Example() {
  return (
    <Input
      label="Passphrase"
      type="password"
      startIcon={<Lock size={20} color="#8A8F9B" strokeWidth={1.5} />}
      showPasswordToggle
      status="error"
      defaultValue="Team@2025!"
      supportingText="Keep credentials complex"
      fullWidth
    />
  );
}`;

const statusCode = `import { Input } from "andhera-react";
import { CheckCircle, AlertCircle } from "andhera/icons";

export function Example() {
  return (
    <div style={{ display: "grid", gap: "16px" }}>
      <Input
        label="Provisioning key"
        startIcon={<CheckCircle size={20} color="#00C951" strokeWidth={1.5} />}
        defaultValue="Ready for deploy"
        supportingText="Certificate verified successfully"
        status="success"
        fullWidth
      />
      <Input
        label="Usage alert"
        startIcon={<AlertCircle size={20} color="#FF6900" strokeWidth={1.5} />}
        defaultValue="85% usage"
        supportingText="85% of monthly quota consumed"
        status="warning"
        fullWidth
      />
      <Input
        label="Billing failure"
        startIcon={<AlertCircle size={20} color="#FB2C36" strokeWidth={1.5} />}
        defaultValue="Card declined"
        supportingText="Update payment method"
        status="error"
        fullWidth
      />
    </div>
  );
}`;

const disabledCode = `import { Input } from "andhera-react";

export function Example() {
  return (
    <Input
      label="Billing contact"
      defaultValue="finance@andhera.com"
      supportingText="Managed by finance"
      disabled
      fullWidth
    />
  );
}`;

const requiredFieldCode = `import { Input } from "andhera-react";

export function Example() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Input
        label="Full Name"
        placeholder="John Doe"
        required
        supportingText="This field is required"
        fullWidth
      />
      <Input
        label="Email Address"
        type="email"
        placeholder="john@example.com"
        required
        status="error"
        errorMessage="Please enter a valid email address"
        fullWidth
      />
    </div>
  );
}`;

const readOnlyCode = `import { Input } from "andhera-react";

export function Example() {
  return (
    <Input
      label="Account ID"
      defaultValue="ACC-2024-XYZW"
      readOnly
      supportingText="This value cannot be modified"
      fullWidth
    />
  );
}`;

const clearButtonCode = `import { useState } from "react";
import { Input } from "andhera-react";

export function Example() {
  const [value, setValue] = useState("Clear me!");

  return (
    <Input
      label="Search"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onClear={() => setValue("")}
      showClearButton
      placeholder="Type something..."
      supportingText="Click the X to clear"
      fullWidth
    />
  );
}`;

const loadingCode = `import { Input } from "andhera-react";

export function Example() {
  return (
    <Input
      label="Validating"
      defaultValue="checking..."
      loading
      supportingText="Please wait while we validate"
      fullWidth
    />
  );
}`;

const characterCounterCode = `import { useState } from "react";
import { Input } from "andhera-react";

export function Example() {
  const [value, setValue] = useState("");

  return (
    <Input
      label="Bio"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      maxLength={100}
      showCharacterCount
      placeholder="Tell us about yourself..."
      supportingText="Keep it brief"
      fullWidth
    />
  );
}`;

const customStylingCode = `import { Input } from "andhera-react";

export function Example() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Input
        label="Rounded corners"
        placeholder="Custom border radius"
        borderRadius="16px"
        fullWidth
      />
      <Input
        label="Pill shape"
        placeholder="Fully rounded"
        borderRadius="full"
        fullWidth
      />
      <Input
        label="Custom classes"
        placeholder="With custom styling"
        inputClassName="font-bold"
        containerClassName="shadow-lg"
        fullWidth
      />
    </div>
  );
}`;

const interactiveAffixCode = `import { useState } from "react";
import { Input } from "andhera-react";

export function Example() {
  const [currency, setCurrency] = useState("USD");
  const [unit, setUnit] = useState("mo");

  return (
    <Input
      label="Budget"
      prefix={<strong>{currency}</strong>}
      suffix={<span>/{unit}</span>}
      onPrefixClick={() => setCurrency((prev) => (prev === "USD" ? "EUR" : "USD"))}
      onSuffixClick={() => setUnit((prev) => (prev === "mo" ? "yr" : "mo"))}
      supportingText="Click prefix or suffix to toggle"
      defaultValue="12,500"
      fullWidth
    />
  );
}`;

function TypeShowcase() {
  return (
    <div style={threeColumnGridStyle}>
      <Input
        label="Workspace title"
        type="text"
        placeholder="Market Intel"
        supportingText='type="text"'
        fullWidth
      />
      <Input
        label="Owner email"
        labelSecondary="Required"
        type="email"
        placeholder="team@andhera.com"
        supportingText='type="email"'
        fullWidth
      />
      <Input
        label="Seats"
        type="number"
        defaultValue={12}
        supportingText='type="number"'
        fullWidth
      />
      <Input
        label="Search anything"
        type="search"
        placeholder='Try "billing"'
        supportingText='type="search"'
        fullWidth
      />
      <Input
        label="Generate password"
        type="password"
        defaultValue="Team@2025!"
        supportingText='type="password"'
        fullWidth
      />
    </div>
  );
}

function VariantShowcase() {
  return (
    <div style={twoColumnGridStyle}>
      <Input label="Outlined variant" placeholder="Default look" variant="outlined" fullWidth />
      <Input label="Filled variant" placeholder="Soft contrast" variant="filled" fullWidth />
    </div>
  );
}

function SizeShowcase() {
  return (
    <div style={threeColumnGridStyle}>
      <Input label="Compact" placeholder="Short inputs" size="sm" fullWidth />
      <Input label="Default" placeholder="Most flows" size="md" fullWidth />
      <Input label="Comfort" placeholder="Better tap targets" size="lg" fullWidth />
    </div>
  );
}

function LabelPlacementShowcase() {
  return (
    <div style={threeColumnGridStyle}>
      <Input
        label="Project name"
        supportingText="Default stacked label"
        placeholder="Market intelligence"
        fullWidth
      />
      <Input
        label="Workspace slug"
        labelPlacement="inner"
        placeholder="studio-alpha"
        supportingText="Inner label sits inside the field"
        fullWidth
      />
      <Input
        label="Billing ID"
        labelPlacement="border"
        placeholder="INV-2045"
        supportingText="Border label floats on the outline"
        fullWidth
      />
    </div>
  );
}

function IconPlacementShowcase() {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div style={twoColumnGridStyle}>
      <Input
        label="Workspace search"
        placeholder='Try "billing"'
        startIcon={<Search size={iconSize} color={iconColor} strokeWidth={iconStrokeWidth} />}
        supportingText="Start icon keeps the field contextual"
        fullWidth
      />
      <Input
        label="Invite teammate"
        placeholder="name@company.com"
        startIcon={<Search size={iconSize} color={iconColor} strokeWidth={iconStrokeWidth} />}
        endIcon={<CheckCircle size={iconSize} color="#00C951" strokeWidth={iconStrokeWidth} />}
        onEndIconClick={() => setConfirmed((prev) => !prev)}
        supportingText={confirmed ? "Invite sent" : "Tap check to confirm"}
        fullWidth
      />
    </div>
  );
}

function InteractiveAffixesExample() {
  const [currency, setCurrency] = useState("USD");
  const [unit, setUnit] = useState("mo");

  return (
    <Input
      label="Budget"
      prefix={<strong>{currency}</strong>}
      suffix={<span>/{unit}</span>}
      onPrefixClick={() => setCurrency((prev) => (prev === "USD" ? "EUR" : "USD"))}
      onSuffixClick={() => setUnit((prev) => (prev === "mo" ? "yr" : "mo"))}
      supportingText="Click prefix or suffix to toggle"
      defaultValue="12,500"
      fullWidth
    />
  );
}

function CharacterCountExample() {
  const [value, setValue] = useState("ops-handoff");
  const limit = 24;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value.slice(0, limit));
  };

  return (
    <Input
      label="Channel slug"
      prefix={<span style={{ fontWeight: 600 }}>#</span>}
      value={value}
      onChange={handleChange}
      supportingText={`${value.length}/${limit} characters`}
      fullWidth
    />
  );
}

function RequiredFieldExample() {
  return (
    <div style={twoColumnGridStyle}>
      <Input
        label="Full Name"
        placeholder="John Doe"
        required
        supportingText="This field is required"
        fullWidth
      />
      <Input
        label="Email Address"
        type="email"
        placeholder="john@example.com"
        required
        status="error"
        errorMessage="Please enter a valid email address"
        fullWidth
      />
    </div>
  );
}

function ReadOnlyExample() {
  return (
    <Input
      label="Account ID"
      defaultValue="ACC-2024-XYZW"
      readOnly
      supportingText="This value cannot be modified"
      fullWidth
    />
  );
}

function ClearButtonExample() {
  const [value, setValue] = useState("Clear me!");

  return (
    <Input
      label="Search"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onClear={() => setValue("")}
      showClearButton
      placeholder="Type something..."
      supportingText="Click the X to clear"
      fullWidth
    />
  );
}

function LoadingExample() {
  return (
    <Input
      label="Validating"
      defaultValue="checking..."
      loading
      supportingText="Please wait while we validate"
      fullWidth
    />
  );
}

function CharacterCounterExample() {
  const [value, setValue] = useState("");

  return (
    <Input
      label="Bio"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      maxLength={100}
      showCharacterCount
      placeholder="Tell us about yourself..."
      supportingText="Keep it brief"
      fullWidth
    />
  );
}

function CustomStylingExample() {
  return (
    <div style={twoColumnGridStyle}>
      <Input
        label="Rounded corners"
        placeholder="Custom border radius"
        borderRadius="16px"
        fullWidth
      />
      <Input
        label="Pill shape"
        placeholder="Fully rounded"
        borderRadius="full"
        fullWidth
      />
    </div>
  );
}

type ExampleSection = {
  title: string;
  description: string;
  highlights?: string[];
  code: string;
  render: () => ReactNode;
  layout?: "single" | "grid" | "full"; // single = centered single input, grid = uses internal grid, full = full width
};

const exampleSections: ExampleSection[] = [
  {
    title: "Input Types",
    description: "Map the native type prop to collect text, email, numbers, passwords, or custom searches in one component.",
    highlights: ["Props: type='text' | 'email' | 'number' | 'search' | 'password'"],
    code: typeShowcaseCode,
    render: () => <TypeShowcase />,
    layout: "full",
  },
  {
    title: "Label & Helper Text",
    description: "Start with a descriptive label, optional metadata, and helper text so users always know the expectation.",
    highlights: ["Props: label, labelSecondary, supportingText, placeholder, fullWidth"],
    code: labelCode,
    render: () => (
      <div style={singleInputStyle}>
        <Input
          label="Project name"
          labelSecondary="Internal"
          placeholder="Market intelligence"
          supportingText="Visible to collaborators"
          fullWidth
      />
      </div>
    ),
    layout: "single",
  },
  {
    title: "Label Placement",
    description: "Pick default stacked labels, inline labels inside the field, or floating labels that rest on the border.",
    highlights: ["Props: labelPlacement='default' | 'inner' | 'border'"],
    code: labelPlacementCode,
    render: () => <LabelPlacementShowcase />,
    layout: "full",
  },
  {
    title: "Variant Styles",
    description: "Swap between outlined and filled shells to match the surface contrast of the host screen.",
    highlights: ["Props: variant='outlined' | 'filled'"],
    code: variantCode,
    render: () => <VariantShowcase />,
    layout: "full",
  },
  {
    title: "Size Options",
    description: "Choose the touch target that fits the density of the layout without writing custom CSS.",
    highlights: ["Props: size='sm' | 'md' | 'lg'"],
    code: sizeShowcaseCode,
    render: () => <SizeShowcase />,
    layout: "full",
  },
  {
    title: "Icon Placement",
    description: "Use startIcon for context and endIcon for confirm or clear actions, wiring onEndIconClick for intent.",
    highlights: ["Props: startIcon, endIcon, onEndIconClick"],
    code: iconPlacementCode,
    render: () => <IconPlacementShowcase />,
    layout: "full",
  },
  {
    title: "Prefix & Suffix",
    description: "Adornments keep currency, units, or identifiers aligned without extra layout hacks.",
    highlights: ["Props: prefix, suffix"],
    code: adornmentCode,
    render: () => (
      <div style={singleInputStyle}>
        <Input
          label="Budget"
          prefix={<strong>USD</strong>}
          suffix={<span style={{ opacity: 0.7 }}>/month</span>}
          supportingText="Auto converts in approvals"
          defaultValue="12,500"
          fullWidth
        />
      </div>
    ),
    layout: "single",
  },
  {
    title: "Interactive Adornments",
    description: "Attach click handlers to prefix and suffix elements for quick toggles like currency or cadence.",
    highlights: ["Props: onPrefixClick, onSuffixClick, supportingText"],
    code: interactiveAffixCode,
    render: () => (
      <div style={singleInputStyle}>
        <InteractiveAffixesExample />
      </div>
    ),
    layout: "single",
  },
  {
    title: "Controlled Value",
    description: "Use value and onChange to enforce limits, show live counts, or plug into form state.",
    highlights: ["Props: value, onChange, prefix, supportingText"],
    code: characterCountCode,
    render: () => (
      <div style={singleInputStyle}>
        <CharacterCountExample />
      </div>
    ),
    layout: "single",
  },
  {
    title: "Password Visibility",
    description: "The password toggle keeps credentials secure while letting users confirm what they typed.",
    highlights: ["Props: type='password', showPasswordToggle, error, status='error', errorMessage"],
    code: passwordCode,
    render: () => (
      <div style={singleInputStyle}>
        <Input
          label="Passphrase"
          type="password"
          startIcon={<Lock size={iconSize} color={iconColor} strokeWidth={iconStrokeWidth} />}
          showPasswordToggle
          defaultValue="Team@2025!"
          supportingText="Keep credentials complex"
          fullWidth
        />
      </div>
    ),
    layout: "single",
  },
  {
    title: "Status Feedback",
    description: "Surface success, warning, or error state inline so users never lose context.",
    highlights: ["Props: status='success' | 'warning' | 'error', startIcon"],
    code: statusCode,
    render: () => (
      <div style={threeColumnGridStyle}>
        <Input
          label="Provisioning key"
          startIcon={<CheckCircle size={iconSize} color="#00C951" strokeWidth={iconStrokeWidth} />}
          supportingText="Certificate verified successfully"
          defaultValue="Ready for deploy"
          status="success"
          fullWidth
        />
        <Input
          label="Usage alert"
          startIcon={<AlertCircle size={iconSize} color="#FF6900" strokeWidth={iconStrokeWidth} />}
          supportingText="85% of monthly quota consumed"
          defaultValue="85% usage"
          status="warning"
          fullWidth
        />
        <Input
          label="Billing failure"
          startIcon={<AlertCircle size={iconSize} color="#FB2C36" strokeWidth={iconStrokeWidth} />}
          supportingText="Update payment method"
          defaultValue="Card declined"
          status="error"
          fullWidth
        />
      </div>
    ),
    layout: "full",
  },
  {
    title: "Disabled Field",
    description: "Use disabled for read-only ownership or when prerequisites aren't met yet.",
    highlights: ["Props: disabled"],
    code: disabledCode,
    render: () => (
      <div style={singleInputStyle}>
        <Input
          label="Billing contact"
          supportingText="Managed by finance"
          defaultValue="finance@andhera.com"
          disabled
          fullWidth
        />
      </div>
    ),
    layout: "single",
  },
  {
    title: "Required Field",
    description: "Mark fields as required with an asterisk indicator that clearly communicates mandatory input.",
    highlights: ["Props: required"],
    code: requiredFieldCode,
    render: () => <RequiredFieldExample />,
    layout: "full",
  },
  {
    title: "Read-Only State",
    description: "Use readOnly for values that should be visible and selectable but not editable, unlike disabled which prevents focus.",
    highlights: ["Props: readOnly"],
    code: readOnlyCode,
    render: () => (
      <div style={singleInputStyle}>
        <ReadOnlyExample />
      </div>
    ),
    layout: "single",
  },
  {
    title: "Clear Button",
    description: "Add a clear button that appears when the input has a value, making it easy to reset the field.",
    highlights: ["Props: showClearButton, onClear"],
    code: clearButtonCode,
    render: () => (
      <div style={singleInputStyle}>
        <ClearButtonExample />
      </div>
    ),
    layout: "single",
  },
  {
    title: "Loading State",
    description: "Display a loading spinner to indicate async validation or data fetching in progress.",
    highlights: ["Props: loading"],
    code: loadingCode,
    render: () => (
      <div style={singleInputStyle}>
        <LoadingExample />
      </div>
    ),
    layout: "single",
  },
  {
    title: "Character Counter",
    description: "Built-in character counting with maxLength enforcement and visual feedback when approaching the limit.",
    highlights: ["Props: maxLength, showCharacterCount"],
    code: characterCounterCode,
    render: () => (
      <div style={singleInputStyle}>
        <CharacterCounterExample />
      </div>
    ),
    layout: "single",
  },
  {
    title: "Custom Styling",
    description: "Override border radius and apply custom CSS classes to match specific design requirements.",
    highlights: ["Props: borderRadius, inputClassName, containerClassName, labelClassName"],
    code: customStylingCode,
    render: () => <CustomStylingExample />,
    layout: "full",
  },
];

type PropDefinition = {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
};

const propDefinitions: PropDefinition[] = [
  { name: "label", type: "string", defaultValue: "-", description: "Primary field title rendered above the control." },
  { name: "labelSecondary", type: "string", defaultValue: "-", description: "Optional badge-style helper placed next to the label for metadata like 'Required'." },
  { name: "labelPlacement", type: "'default' | 'inner' | 'border'", defaultValue: "'default'", description: "Controls whether the label sits above, inside, or floating on the border." },
  { name: "labelTooltip", type: "ReactNode", defaultValue: "-", description: "Info tooltip content shown next to the label for additional context." },
  { name: "labelClassName", type: "string", defaultValue: "''", description: "Custom CSS classes for the label element." },
  { name: "supportingText", type: "string", defaultValue: "-", description: "Helper or hint text shown below the control." },
  { name: "supportingTextClassName", type: "string", defaultValue: "''", description: "Custom CSS classes for the supporting text element." },
  { name: "error", type: "boolean", defaultValue: "false", description: "Legacy flag that forces the input into an error state when true." },
  { name: "errorMessage", type: "string", defaultValue: "-", description: "Message displayed under the field when the state is error." },
  { name: "disabled", type: "boolean", defaultValue: "false", description: "Disables focusing and dims the field for read-only scenarios." },
  { name: "readOnly", type: "boolean", defaultValue: "false", description: "Makes the input read-only (focusable but not editable)." },
  { name: "required", type: "boolean", defaultValue: "false", description: "Shows a required asterisk indicator and sets aria-required." },
  { name: "variant", type: "'outlined' | 'filled'", defaultValue: "'outlined'", description: "Choose the container shell to match dark or light canvases." },
  { name: "size", type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: "Control vertical rhythm and padding without hand-tuning classes." },
  { name: "status", type: "'default' | 'success' | 'warning' | 'error'", defaultValue: "'default'", description: "Applies semantic border and helper colors for inline feedback." },
  { name: "fullWidth", type: "boolean", defaultValue: "false", description: "Forces the component to stretch to the width of its parent." },
  { name: "startIcon", type: "ReactNode", defaultValue: "-", description: "Icon rendered before the input text for context." },
  { name: "endIcon", type: "ReactNode", defaultValue: "-", description: "Icon rendered after the input text; pairs with onEndIconClick for actions." },
  { name: "prefix", type: "ReactNode", defaultValue: "-", description: "Static element rendered before the value, ideal for currency or tags." },
  { name: "suffix", type: "ReactNode", defaultValue: "-", description: "Static element rendered after the value for units or hints." },
  { name: "showPasswordToggle", type: "boolean", defaultValue: "false", description: "Adds an eye icon that toggles password visibility." },
  { name: "showClearButton", type: "boolean", defaultValue: "false", description: "Shows a clear (X) button when the input has a value." },
  { name: "loading", type: "boolean", defaultValue: "false", description: "Shows a loading spinner in place of end icons." },
  { name: "maxLength", type: "number", defaultValue: "-", description: "Maximum character length with native enforcement." },
  { name: "showCharacterCount", type: "boolean", defaultValue: "false", description: "Displays a character counter when maxLength is set." },
  { name: "borderRadius", type: "string", defaultValue: "'8px'", description: "Custom border radius (e.g., '4px', '16px', 'full')." },
  { name: "autoFocus", type: "boolean", defaultValue: "false", description: "Auto-focuses the input on mount." },
  { name: "inputClassName", type: "string", defaultValue: "''", description: "Tailwind classes merged into the native input element." },
  { name: "containerClassName", type: "string", defaultValue: "''", description: "Tailwind classes merged into the outer wrapper for layout tweaks." },
  { name: "onPrefixClick", type: "() => void", defaultValue: "-", description: "Callback invoked when the prefix slot is clicked." },
  { name: "onSuffixClick", type: "() => void", defaultValue: "-", description: "Callback invoked when the suffix slot is clicked." },
  { name: "onEndIconClick", type: "() => void", defaultValue: "-", description: "Callback invoked when the end icon is clicked." },
  { name: "onClear", type: "() => void", defaultValue: "-", description: "Callback invoked when the clear button is clicked." },
  { name: "type", type: "HTMLInputTypeAttribute", defaultValue: "'text'", description: "Native input type forwarded through to the underlying element." },
  { name: "aria-label", type: "string", defaultValue: "-", description: "ARIA label for accessibility when no visible label is provided." },
  { name: "aria-describedby", type: "string", defaultValue: "-", description: "ARIA described-by ID for custom accessibility descriptions." },
];

/**
 * InputPreview Component
 * Shows Input usage grouped by props similar to the Button preview
 */
export function InputPreview() {
  const inputProperties: PropertyItem[] = propDefinitions.map(prop => ({
    name: prop.name,
    type: prop.type,
    defaultValue: prop.defaultValue,
    description: prop.description,
  }));

  return (
    <div style={containerStyle}>
      {exampleSections.map((section, index) => (
        <PreviewCard
          key={`${section.title}-${index}`}
          title={section.title}
          description={section.description}
          code={section.code}
          highlights={section.highlights}
        >
          <div style={previewContentStyle}>
            {section.render()}
          </div>
        </PreviewCard>
      ))}
      <PropertiesTable title="Input Props" properties={inputProperties} />
    </div>
  );
}

interface PreviewCardProps {
  title: string;
  description: string;
  code: string;
  highlights?: string[];
  children: ReactNode;
}

function PreviewCard({ title, description, code, highlights, children }: PreviewCardProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <h3
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: "20px",
            fontWeight: 600,
            lineHeight: 1.2,
            color: "#FFFFFF",
            margin: 0,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: 1.6,
            color: "#D1D5DC",
            margin: 0,
            whiteSpace: "pre-wrap",
          }}
        >
          {description}
        </p>
        {highlights && highlights.length > 0 && (
          <ul
            style={{
              margin: 0,
              paddingLeft: "1.2rem",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              color: "#AEB6C4",
              fontSize: "13px",
              lineHeight: 1.4,
            }}
          >
            {highlights.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        )}
      </div>

      <div
        style={{
          background: "rgba(21, 24, 33, 0.6)",
          border: "1px solid #364153",
          borderRadius: "16px",
          padding: "24px",
          paddingTop: "64px",
          minHeight: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            display: "flex",
            gap: "8px",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <button
            onClick={handleCopy}
            style={{
              background: "transparent",
              border: "1px solid #364153",
              borderRadius: "8px",
              padding: "10px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
            }}
            title={copied ? "Copied!" : "Copy code"}
          >
            {copied ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M15 4.5L6.75 12.75L3 9" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="6" y="6" width="9" height="9" rx="1.5" stroke="white" strokeWidth="1.5" />
                <path d="M3.75 11.25V4.5C3.75 3.67157 4.42157 3 5.25 3H12" stroke="white" strokeWidth="1.5" />
              </svg>
            )}
          </button>

          <div
            style={{
              border: "1px solid #364153",
              borderRadius: "8px",
              display: "flex",
              overflow: "hidden",
            }}
          >
            <button
              onClick={() => setActiveTab("preview")}
              style={{
                background: activeTab === "preview" ? "#242424" : "transparent",
                border: activeTab === "preview" ? "1px solid #364153" : "none",
                borderRadius: "8px",
                padding: "10px 20px",
                fontFamily: "Manrope, sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                color: activeTab === "preview" ? "#FFFFFF" : "#A1A1A1",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              Preview
            </button>
            <button
              onClick={() => setActiveTab("code")}
              style={{
                background: activeTab === "code" ? "#242424" : "transparent",
                border: activeTab === "code" ? "1px solid #364153" : "none",
                borderRadius: "8px",
                padding: "10px 20px",
                fontFamily: "Manrope, sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                color: activeTab === "code" ? "#FFFFFF" : "#A1A1A1",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              Code
            </button>
          </div>
        </div>

        {activeTab === "preview" ? (
          <div style={{ zIndex: 1, width: "100%", display: "flex", justifyContent: "center" }}>{children}</div>
        ) : (
          <div
            style={{
              width: "100%",
              padding: "56px 16px 16px 16px",
              overflow: "hidden",
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
          >
            <pre
              style={{
                margin: 0,
                padding: "16px",
                background: "#0d0d0d",
                borderRadius: "8px",
                height: "100%",
                overflow: "auto",
                fontFamily: "'Cascadia Code', 'Fira Code', monospace",
                fontSize: "13px",
                lineHeight: 1.5,
                color: "#e0e0e0",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
              className="hide-scrollbar"
            >
              <code>{code}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
