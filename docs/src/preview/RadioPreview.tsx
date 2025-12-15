import { useState } from "react";
import { RadioGroup, RadioButton } from "../../../src/components/radio";

interface PropDefinition {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
}

const propDefinitions: PropDefinition[] = [
  { name: "name", type: "string", defaultValue: "-", description: "The name attribute for the radio group (required for form submission)." },
  { name: "options", type: "RadioOption[]", defaultValue: "[]", description: "Array of options. RadioOption: { value: string; label: string; disabled?: boolean; description?: string; helperText?: string }" },
  { name: "value", type: "string", defaultValue: "-", description: "The controlled selected value. Use with onChange for controlled component behavior." },
  { name: "defaultValue", type: "string", defaultValue: "-", description: "The default selected value for uncontrolled usage." },
  { name: "label", type: "string", defaultValue: "-", description: "Label text displayed above the radio group." },
  { name: "labelClassName", type: "string", defaultValue: "-", description: "Custom class name for the group label element." },
  { name: "onChange", type: "(value: string) => void", defaultValue: "-", description: "Callback fired when the selected value changes." },
  { name: "onBlur", type: "(value: string) => void", defaultValue: "-", description: "Callback fired when focus leaves a radio button." },
  { name: "onFocus", type: "(value: string) => void", defaultValue: "-", description: "Callback fired when a radio button receives focus." },
  { name: "size", type: "'small' | 'medium' | 'large'", defaultValue: "'medium'", description: "Size of all radio buttons in the group. 'small' = 16px, 'medium' = 20px, 'large' = 24px." },
  { name: "variant", type: "'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'", defaultValue: "'default'", description: "Color variant for the radio buttons. 'default' = gray, 'primary' = #FFCB00, 'success' = green, 'warning' = amber, 'error' = red, 'info' = blue." },
  { name: "labelPosition", type: "'left' | 'right' | 'top' | 'bottom'", defaultValue: "'right'", description: "Position of labels relative to the radio buttons." },
  { name: "direction", type: "'row' | 'column'", defaultValue: "'column'", description: "Layout direction of the radio buttons. 'row' = horizontal, 'column' = vertical." },
  { name: "gap", type: "number | string", defaultValue: "12", description: "Gap between radio options. Number is treated as pixels, string allows custom units." },
  { name: "required", type: "boolean", defaultValue: "false", description: "When true, displays a required indicator (*) next to the group label." },
  { name: "disabled", type: "boolean", defaultValue: "false", description: "When true, disables all radio buttons in the group." },
  { name: "readOnly", type: "boolean", defaultValue: "false", description: "When true, prevents value changes but keeps the group focusable." },
  { name: "error", type: "boolean", defaultValue: "false", description: "When true, displays the group in an error state with error styling." },
  { name: "errorMessage", type: "string", defaultValue: "-", description: "Error message displayed below the group when error is true." },
  { name: "helperText", type: "string", defaultValue: "-", description: "Helper text displayed below the group (hidden when error message is shown)." },
  { name: "showRipple", type: "boolean", defaultValue: "true", description: "When true, shows a ripple effect on radio button click." },
  { name: "className", type: "string", defaultValue: "-", description: "Custom class name for the radio group container." },
  { name: "inputClassName", type: "string", defaultValue: "-", description: "Custom class name applied to each radio input element." },
  { name: "optionClassName", type: "string", defaultValue: "-", description: "Custom class name applied to each option wrapper." },
  { name: "renderOption", type: "(option: RadioOption, isSelected: boolean, radioElement: ReactNode) => ReactNode", defaultValue: "-", description: "Custom render function for each option. Receives the option data, selection state, and the default radio element." },
  { name: "id", type: "string", defaultValue: "-", description: "ID attribute for the radio group container." },
  { name: "aria-label", type: "string", defaultValue: "-", description: "Accessible label for the radio group when no visible label is provided." },
  { name: "aria-labelledby", type: "string", defaultValue: "-", description: "ID of an element that labels the radio group." },
  { name: "aria-describedby", type: "string", defaultValue: "-", description: "ID of an element that describes the radio group." },
];

/**
 * RadioPreview Component
 * Displays all radio group variants showcasing comprehensive customization options
 */
export function RadioPreview() {
  const [selectedPlan, setSelectedPlan] = useState<string | number>("monthly");
  const [selectedSize, setSelectedSize] = useState<string | number>("medium");
  const [selectedVariant, setSelectedVariant] = useState<string | number>("default");
  const [selectedPayment, setSelectedPayment] = useState<string | number>("card");

  return (
    <>
      <style>{`
        .radio-preview-container {
          display: flex;
          flex-direction: column;
          gap: 44px;
          width: 100%;
        }

        .radio-preview-row {
          display: flex;
          gap: 24px;
          align-items: flex-start;
          justify-content: center;
          flex-wrap: wrap;
        }

        .radio-preview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          width: 100%;
          max-width: 700px;
          margin: 0 auto;
        }

        @media (max-width: 640px) {
          .radio-preview-row {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>

      <div className="radio-preview-container">
        {/* 1. Basic Radio Group */}
        <PreviewCard
          title="Basic Radio Group"
          description="Simple radio group with options array. Use name (string) for grouping and onChange ((value) => void) for selection handling."
          code={`import { RadioGroup } from "andhera-react";

const options = [
  { label: "Option A", value: "a" },
  { label: "Option B", value: "b" },
  { label: "Option C", value: "c" },
];

<RadioGroup
  name="basic-group"
  options={options}
  onChange={(value) => console.log(value)}
/>`}
        >
          <div className="radio-preview-row">
            <RadioGroup
              name="basic-demo"
              options={[
                { label: "Option A", value: "a" },
                { label: "Option B", value: "b" },
                { label: "Option C", value: "c" },
              ]}
              onChange={(value) => console.log(value)}
            />
          </div>
        </PreviewCard>

        {/* 2. Default Value */}
        <PreviewCard
          title="Default Value"
          description="Set initial selection with defaultValue prop (string | number). For controlled selection, use value prop instead."
          code={`<RadioGroup
  name="plan"
  options={options}
  defaultValue="monthly"
  onChange={setSelectedPlan}
/>`}
        >
          <div className="radio-preview-row">
            <RadioGroup
              name="default-value-demo"
              options={[
                { label: "Monthly", value: "monthly" },
                { label: "Quarterly", value: "quarterly" },
                { label: "Yearly", value: "yearly" },
              ]}
              defaultValue="monthly"
              onChange={setSelectedPlan}
            />
          </div>
        </PreviewCard>

        {/* 3. Sizes */}
        <PreviewCard
          title="Radio Sizes"
          description="Three size options via the size prop. RadioSize type: 'small' | 'medium' | 'large'. Default is 'medium'."
          code={`<RadioGroup size="small" ... />
<RadioGroup size="medium" ... />  {/* Default */}
<RadioGroup size="large" ... />`}
        >
          <div className="radio-preview-row">
            <div className="flex flex-col gap-4">
              <span className="text-xs text-gray-400 mb-1">Small</span>
              <RadioGroup
                name="size-small"
                size="small"
                options={[
                  { label: "Small A", value: "a" },
                  { label: "Small B", value: "b" },
                ]}
                defaultValue="a"
                onChange={() => {}}
              />
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-xs text-gray-400 mb-1">Medium (Default)</span>
              <RadioGroup
                name="size-medium"
                size="medium"
                options={[
                  { label: "Medium A", value: "a" },
                  { label: "Medium B", value: "b" },
                ]}
                defaultValue="a"
                onChange={() => {}}
              />
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-xs text-gray-400 mb-1">Large</span>
              <RadioGroup
                name="size-large"
                size="large"
                options={[
                  { label: "Large A", value: "a" },
                  { label: "Large B", value: "b" },
                ]}
                defaultValue="a"
                onChange={() => {}}
              />
            </div>
          </div>
        </PreviewCard>

        {/* 4. Color Variants */}
        <PreviewCard
          title="Color Variants"
          description="Six color variants via the variant prop. RadioVariant type: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'. Default is 'default' (yellow)."
          code={`<RadioGroup variant="default" ... />  {/* Yellow - Default */}
<RadioGroup variant="primary" ... />  {/* Blue */}
<RadioGroup variant="success" ... />  {/* Green */}
<RadioGroup variant="warning" ... />  {/* Amber */}
<RadioGroup variant="error" ... />    {/* Red */}
<RadioGroup variant="info" ... />     {/* Cyan */}`}
        >
          <div className="radio-preview-grid">
            <RadioGroup
              name="variant-default"
              variant="default"
              label="Default (Yellow)"
              options={[{ label: "Selected", value: "a" }]}
              defaultValue="a"
              onChange={() => {}}
            />
            <RadioGroup
              name="variant-primary"
              variant="primary"
              label="Primary (Blue)"
              options={[{ label: "Selected", value: "a" }]}
              defaultValue="a"
              onChange={() => {}}
            />
            <RadioGroup
              name="variant-success"
              variant="success"
              label="Success (Green)"
              options={[{ label: "Selected", value: "a" }]}
              defaultValue="a"
              onChange={() => {}}
            />
            <RadioGroup
              name="variant-warning"
              variant="warning"
              label="Warning (Amber)"
              options={[{ label: "Selected", value: "a" }]}
              defaultValue="a"
              onChange={() => {}}
            />
            <RadioGroup
              name="variant-error"
              variant="error"
              label="Error (Red)"
              options={[{ label: "Selected", value: "a" }]}
              defaultValue="a"
              onChange={() => {}}
            />
            <RadioGroup
              name="variant-info"
              variant="info"
              label="Info (Cyan)"
              options={[{ label: "Selected", value: "a" }]}
              defaultValue="a"
              onChange={() => {}}
            />
          </div>
        </PreviewCard>

        {/* 5. Layout Direction */}
        <PreviewCard
          title="Layout Direction"
          description="Control layout with direction prop. RadioGroupDirection type: 'row' | 'column'. Default is 'column'. Use gap prop for custom spacing."
          code={`<RadioGroup direction="column" ... />  {/* Default - Vertical */}
<RadioGroup direction="row" ... />     {/* Horizontal */}
<RadioGroup direction="row" gap="gap-8" ... />  {/* Custom gap */}`}
        >
          <div className="radio-preview-row">
            <div className="flex flex-col gap-2">
              <span className="text-xs text-gray-400">Column (Default)</span>
              <RadioGroup
                name="direction-column"
                direction="column"
                options={[
                  { label: "Option A", value: "a" },
                  { label: "Option B", value: "b" },
                  { label: "Option C", value: "c" },
                ]}
                defaultValue="a"
                onChange={() => {}}
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs text-gray-400">Row (Horizontal)</span>
              <RadioGroup
                name="direction-row"
                direction="row"
                options={[
                  { label: "Option A", value: "a" },
                  { label: "Option B", value: "b" },
                  { label: "Option C", value: "c" },
                ]}
                defaultValue="a"
                onChange={() => {}}
              />
            </div>
          </div>
        </PreviewCard>

        {/* 6. Label Position */}
        <PreviewCard
          title="Label Position"
          description="Position labels with labelPosition prop. RadioLabelPosition type: 'left' | 'right' | 'top' | 'bottom'. Default is 'right'."
          code={`<RadioGroup labelPosition="right" ... />   {/* Default */}
<RadioGroup labelPosition="left" ... />
<RadioGroup labelPosition="top" ... />
<RadioGroup labelPosition="bottom" ... />`}
        >
          <div className="radio-preview-row">
            <div className="flex flex-col gap-2 items-center">
              <span className="text-xs text-gray-400">Right (Default)</span>
              <RadioGroup
                name="label-right"
                labelPosition="right"
                direction="row"
                options={[{ label: "Label Right", value: "a" }]}
                defaultValue="a"
                onChange={() => {}}
              />
            </div>
            <div className="flex flex-col gap-2 items-center">
              <span className="text-xs text-gray-400">Left</span>
              <RadioGroup
                name="label-left"
                labelPosition="left"
                direction="row"
                options={[{ label: "Label Left", value: "a" }]}
                defaultValue="a"
                onChange={() => {}}
              />
            </div>
            <div className="flex flex-col gap-2 items-center">
              <span className="text-xs text-gray-400">Top</span>
              <RadioGroup
                name="label-top"
                labelPosition="top"
                direction="row"
                options={[{ label: "Label Top", value: "a" }]}
                defaultValue="a"
                onChange={() => {}}
              />
            </div>
            <div className="flex flex-col gap-2 items-center">
              <span className="text-xs text-gray-400">Bottom</span>
              <RadioGroup
                name="label-bottom"
                labelPosition="bottom"
                direction="row"
                options={[{ label: "Label Bottom", value: "a" }]}
                defaultValue="a"
                onChange={() => {}}
              />
            </div>
          </div>
        </PreviewCard>

        {/* 7. With Descriptions */}
        <PreviewCard
          title="Options with Descriptions"
          description="Add description text to options for additional context. Each option can have its own description property."
          code={`const options = [
  { label: "Starter", value: "starter", description: "Best for small projects" },
  { label: "Pro", value: "pro", description: "For growing teams" },
  { label: "Enterprise", value: "enterprise", description: "Unlimited everything" },
];

<RadioGroup name="pricing" options={options} ... />`}
        >
          <div className="radio-preview-row">
            <RadioGroup
              name="with-descriptions"
              options={[
                { label: "Starter Plan", value: "starter", description: "Best for small projects and individuals" },
                { label: "Pro Plan", value: "pro", description: "For growing teams and businesses" },
                { label: "Enterprise", value: "enterprise", description: "Unlimited resources and priority support" },
              ]}
              defaultValue="pro"
              onChange={() => {}}
            />
          </div>
        </PreviewCard>

        {/* 8. Disabled States */}
        <PreviewCard
          title="Disabled States"
          description="Disable entire group with disabled prop (boolean), or individual options with option.disabled. Disabled radios cannot be selected."
          code={`// Disable specific options
const options = [
  { label: "Available", value: "a" },
  { label: "Unavailable", value: "b", disabled: true },
];

// Or disable entire group
<RadioGroup disabled options={options} ... />`}
        >
          <div className="radio-preview-row">
            <div className="flex flex-col gap-2">
              <span className="text-xs text-gray-400">Individual Disabled</span>
              <RadioGroup
                name="individual-disabled"
                options={[
                  { label: "Available Option", value: "a" },
                  { label: "Disabled Option", value: "b", disabled: true },
                  { label: "Another Available", value: "c" },
                ]}
                defaultValue="a"
                onChange={() => {}}
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs text-gray-400">Entire Group Disabled</span>
              <RadioGroup
                name="group-disabled"
                disabled
                options={[
                  { label: "Option A", value: "a" },
                  { label: "Option B", value: "b" },
                  { label: "Option C", value: "c" },
                ]}
                defaultValue="b"
                onChange={() => {}}
              />
            </div>
          </div>
        </PreviewCard>

        {/* 9. Error State */}
        <PreviewCard
          title="Error State"
          description="Show validation errors with error (boolean) and errorMessage (string) props. Error state applies red styling to all radios."
          code={`<RadioGroup
  error
  errorMessage="Please select an option"
  options={options}
  ...
/>`}
        >
          <div className="radio-preview-row">
            <RadioGroup
              name="error-demo"
              error
              errorMessage="Please select a payment method to continue"
              label="Payment Method"
              options={[
                { label: "Credit Card", value: "card" },
                { label: "PayPal", value: "paypal" },
                { label: "Bank Transfer", value: "bank" },
              ]}
              onChange={() => {}}
            />
          </div>
        </PreviewCard>

        {/* 10. With Group Label */}
        <PreviewCard
          title="Group Label"
          description="Add a title to the group with label prop (ReactNode). Use required (boolean) to show required indicator. Style with groupLabelClassName."
          code={`<RadioGroup
  label="Subscription Plan"
  required
  options={options}
  ...
/>`}
        >
          <div className="radio-preview-row">
            <RadioGroup
              name="labeled-group"
              label="Select Your Plan"
              required
              options={[
                { label: "Basic - $9/mo", value: "basic" },
                { label: "Standard - $19/mo", value: "standard" },
                { label: "Premium - $39/mo", value: "premium" },
              ]}
              defaultValue="standard"
              onChange={() => {}}
            />
          </div>
        </PreviewCard>

        {/* 11. Helper Text */}
        <PreviewCard
          title="Helper Text"
          description="Add contextual help below the group with helperText prop (string). Automatically hidden when error message is shown."
          code={`<RadioGroup
  label="Notification Preference"
  helperText="You can change this later in settings"
  options={options}
  ...
/>`}
        >
          <div className="radio-preview-row">
            <RadioGroup
              name="helper-text-demo"
              label="Notification Preference"
              helperText="You can change this anytime in your account settings"
              options={[
                { label: "Email notifications", value: "email" },
                { label: "Push notifications", value: "push" },
                { label: "SMS notifications", value: "sms" },
              ]}
              defaultValue="email"
              onChange={() => {}}
            />
          </div>
        </PreviewCard>

        {/* 12. Read-Only State */}
        <PreviewCard
          title="Read-Only State"
          description="Display selection without allowing changes using readOnly prop (boolean). Unlike disabled, read-only maintains normal opacity."
          code={`<RadioGroup
  readOnly
  defaultValue="selected"
  options={options}
  ...
/>`}
        >
          <div className="radio-preview-row">
            <RadioGroup
              name="readonly-demo"
              label="Current Plan (Read-only)"
              readOnly
              options={[
                { label: "Basic", value: "basic" },
                { label: "Standard", value: "standard" },
                { label: "Premium", value: "premium" },
              ]}
              defaultValue="standard"
              onChange={() => {}}
            />
          </div>
        </PreviewCard>

        {/* 13. Without Ripple Effect */}
        <PreviewCard
          title="Ripple Effect"
          description="Control hover/focus ripple with ripple prop (boolean). Default is true. Set to false for a cleaner look."
          code={`<RadioGroup ripple={false} ... />  {/* No ripple */}
<RadioGroup ripple ... />          {/* With ripple (default) */}`}
        >
          <div className="radio-preview-row">
            <div className="flex flex-col gap-2">
              <span className="text-xs text-gray-400">With Ripple (Default)</span>
              <RadioGroup
                name="with-ripple"
                ripple
                options={[
                  { label: "Hover me", value: "a" },
                ]}
                defaultValue="a"
                onChange={() => {}}
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs text-gray-400">Without Ripple</span>
              <RadioGroup
                name="no-ripple"
                ripple={false}
                options={[
                  { label: "Hover me", value: "a" },
                ]}
                defaultValue="a"
                onChange={() => {}}
              />
            </div>
          </div>
        </PreviewCard>

        {/* 14. Standalone RadioButton */}
        <PreviewCard
          title="Standalone RadioButton"
          description="Use RadioButton component directly for custom layouts. Supports all RadioGroup props plus individual control."
          code={`import { RadioButton } from "andhera-react";

<RadioButton
  name="standalone"
  label="Individual Radio"
  value="option"
  checked={selected}
  onChange={(e) => setSelected(e.target.checked)}
  variant="primary"
  size="large"
/>`}
        >
          <div className="radio-preview-row">
            <RadioButton
              name="standalone-demo"
              label="Standalone Radio Option"
              value="standalone"
              defaultChecked
              variant="primary"
              size="large"
              description="This is a standalone RadioButton"
              onChange={() => {}}
            />
          </div>
        </PreviewCard>

        {/* 15. Custom Styling */}
        <PreviewCard
          title="Custom Styling"
          description="Apply custom styles with className, itemClassName, inputClassName, and labelClassName props. Use style prop for inline styles."
          code={`<RadioGroup
  className="bg-gray-800 p-4 rounded-lg"
  itemClassName="hover:bg-gray-700 p-2 rounded"
  labelClassName="font-semibold"
  options={options}
  ...
/>`}
        >
          <div className="radio-preview-row">
            <RadioGroup
              name="custom-styled"
              label="Styled Radio Group"
              className="bg-gray-800/50 p-4 rounded-xl border border-gray-700"
              itemClassName="hover:bg-gray-700/50 p-2 rounded-lg transition-colors"
              labelClassName="font-medium"
              options={[
                { label: "Custom Option A", value: "a" },
                { label: "Custom Option B", value: "b" },
                { label: "Custom Option C", value: "c" },
              ]}
              defaultValue="a"
              onChange={() => {}}
            />
          </div>
        </PreviewCard>

        {/* 16. Controlled Component */}
        <PreviewCard
          title="Controlled Component"
          description="For full control, use value prop instead of defaultValue. The value must be managed externally via state."
          code={`const [value, setValue] = useState("monthly");

<RadioGroup
  name="controlled"
  value={value}
  onChange={setValue}
  options={options}
/>`}
        >
          <div className="radio-preview-row">
            <div className="flex flex-col gap-4 items-center">
              <RadioGroup
                name="controlled-demo"
                value={selectedPayment}
                onChange={setSelectedPayment}
                direction="row"
                options={[
                  { label: "Credit Card", value: "card" },
                  { label: "PayPal", value: "paypal" },
                  { label: "Crypto", value: "crypto" },
                ]}
              />
              <span className="text-sm text-gray-400">
                Selected: <span className="text-[#FFCB00] font-medium">{selectedPayment}</span>
              </span>
            </div>
          </div>
        </PreviewCard>

        {/* 17. Accessibility */}
        <PreviewCard
          title="Accessibility Features"
          description="Built-in a11y: role='radiogroup', ARIA attributes, keyboard navigation (Arrow keys), and focus management. Use aria-label for screen readers."
          code={`<RadioGroup
  aria-label="Payment method selection"
  aria-describedby="payment-help"
  required
  options={options}
  ...
/>

{/* Keyboard: Arrow Up/Down to navigate, Space to select */}`}
        >
          <div className="radio-preview-row">
            <p className="text-gray-400 text-sm text-center m-0 px-4 max-w-md">
              All radio groups include: Arrow key navigation, Space/Enter to select, 
              proper ARIA roles, focus indicators, and screen reader support.
            </p>
          </div>
        </PreviewCard>

        {/* Props Reference */}
        <PropsReference />
      </div>
    </>
  );
}

/**
 * PreviewCard Component
 * Wraps each radio variant section with title, description, and preview area
 */
interface PreviewCardProps {
  title: string;
  description: string;
  code: string;
  children: React.ReactNode;
}

function PreviewCard({ title, description, code, children }: PreviewCardProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
      {/* Header */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <h3 
          style={{ 
            fontFamily: "Manrope, sans-serif",
            fontSize: "20px",
            fontWeight: 600,
            lineHeight: 1.2,
            color: "#FFFFFF",
            margin: 0
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
            whiteSpace: "pre-wrap"
          }}
        >
          {description}
        </p>
      </div>

      {/* Preview Container */}
      <div 
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid #364153",
          borderRadius: "16px",
          padding: "24px",
          minHeight: activeTab === "code" ? "280px" : "120px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Toggle Controls - Top Right */}
        <div 
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            display: "flex",
            gap: "8px",
            alignItems: "center",
            zIndex: 10
          }}
        >
          {/* Copy Button */}
          <button
            onClick={handleCopy}
            style={{
              background: "transparent",
              border: "1px solid #364153",
              borderRadius: "8px",
              padding: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s"
            }}
            title={copied ? "Copied!" : "Copy code"}
          >
            {copied ? (
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                <path d="M15 4.5L6.75 12.75L3 9" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                <rect x="6" y="6" width="9" height="9" rx="1.5" stroke="white" strokeWidth="1.5"/>
                <path d="M3.75 11.25V4.5C3.75 3.67157 4.42157 3 5.25 3H12" stroke="white" strokeWidth="1.5"/>
              </svg>
            )}
          </button>

          {/* Preview/Code Toggle */}
          <div 
            style={{
              border: "1px solid #364153",
              borderRadius: "8px",
              display: "flex",
              overflow: "hidden"
            }}
          >
            <button
              onClick={() => setActiveTab("preview")}
              style={{
                background: activeTab === "preview" ? "#242424" : "transparent",
                border: activeTab === "preview" ? "1px solid #364153" : "none",
                borderRadius: "8px",
                padding: "8px 16px",
                fontFamily: "Manrope, sans-serif",
                fontSize: "13px",
                fontWeight: 500,
                color: activeTab === "preview" ? "#FFFFFF" : "#A1A1A1",
                cursor: "pointer",
                transition: "all 0.2s"
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
                padding: "8px 16px",
                fontFamily: "Manrope, sans-serif",
                fontSize: "13px",
                fontWeight: 500,
                color: activeTab === "code" ? "#FFFFFF" : "#A1A1A1",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              Code
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === "preview" ? (
          <div style={{ zIndex: 1, width: "100%", display: "flex", justifyContent: "center", paddingTop: "32px" }}>
            {children}
          </div>
        ) : (
          <div 
            style={{
              width: "100%",
              padding: "52px 16px 16px 16px",
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              display: "flex",
              flexDirection: "column"
            }}
          >
            <pre
              style={{
                margin: 0,
                padding: "20px",
                background: "#0d0d0d",
                borderRadius: "12px",
                flex: 1,
                overflow: "auto",
                fontFamily: "'Cascadia Code', 'Fira Code', 'JetBrains Mono', monospace",
                fontSize: "13px",
                lineHeight: 1.6,
                color: "#e0e0e0",
                scrollbarWidth: "thin",
                border: "1px solid #262626"
              }}
            >
              <code style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{code}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

function PropsReference() {
  return (
    <div className="w-full bg-white/[0.04] border border-[#364153] rounded-2xl p-6 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="font-manrope text-xl font-semibold m-0 text-white">
          RadioGroup Props
        </h3>
        <p className="m-0 text-[#AEB6C4] text-sm leading-relaxed">
          RadioGroup arranges radio buttons with consistent spacing, labels, and keyboard navigation.
          It supports sizes, color variants, descriptions, and full accessibility.
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
  );
}
