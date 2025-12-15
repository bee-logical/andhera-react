import { ToggleSwitch, ParentToggleSwitch } from "@/components";
import { PreviewCard } from "../components/PreviewCard";
import { useState } from "react";

interface PropDefinition {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
}

const propDefinitions: PropDefinition[] = [
  { name: "checked", type: "boolean", defaultValue: "false", description: "Whether the switch is currently on/checked." },
  { name: "onChange", type: "(checked: boolean) => void", defaultValue: "-", description: "Callback fired when the switch state changes." },
  { name: "id", type: "string", defaultValue: "-", description: "Unique identifier for the switch input element." },
  { name: "name", type: "string", defaultValue: "-", description: "Name attribute for form submission." },
  { name: "label", type: "ReactNode", defaultValue: "-", description: "Label text or element displayed next to the switch." },
  { name: "helperText", type: "string", defaultValue: "-", description: "Helper text displayed below the switch." },
  { name: "labelPlacement", type: "'start' | 'end' | 'top' | 'bottom'", defaultValue: "'end'", description: "Position of the label relative to the switch." },
  { name: "size", type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", defaultValue: "'md'", description: "Size of the switch (affects track and knob dimensions)." },
  { name: "variant", type: "'default' | 'outlined' | 'filled' | 'minimal'", defaultValue: "'default'", description: "Visual style variant of the switch." },
  { name: "disabled", type: "boolean", defaultValue: "false", description: "Disables the switch and prevents interaction." },
  { name: "readOnly", type: "boolean", defaultValue: "false", description: "Makes the switch read-only (visible but not changeable)." },
  { name: "required", type: "boolean", defaultValue: "false", description: "Marks the switch as required for form validation." },
  { name: "error", type: "string | boolean", defaultValue: "-", description: "Error state. If string, displays as error message." },
  { name: "loading", type: "boolean", defaultValue: "false", description: "Shows loading spinner in the switch knob." },
  { name: "icon", type: "ReactNode | string", defaultValue: "-", description: "Icon displayed in the knob for both states." },
  { name: "checkedIcon", type: "ReactNode | string", defaultValue: "-", description: "Icon displayed in the knob when checked." },
  { name: "uncheckedIcon", type: "ReactNode | string", defaultValue: "-", description: "Icon displayed in the knob when unchecked." },
  { name: "checkedColor", type: "string", defaultValue: "-", description: "Custom background color when checked (Tailwind class or CSS value)." },
  { name: "uncheckedColor", type: "string", defaultValue: "-", description: "Custom background color when unchecked." },
  { name: "borderFocusColor", type: "string", defaultValue: "-", description: "Custom border/ring color on focus." },
  { name: "knobColor", type: "string", defaultValue: "-", description: "Custom knob color when unchecked." },
  { name: "activeKnobColor", type: "string", defaultValue: "-", description: "Custom knob color when checked." },
  { name: "className", type: "string", defaultValue: "-", description: "Additional CSS classes for the wrapper element." },
  { name: "switchClassName", type: "string", defaultValue: "-", description: "Additional CSS classes for the switch track." },
  { name: "labelClassName", type: "string", defaultValue: "-", description: "Additional CSS classes for the label." },
  { name: "knobClassName", type: "string", defaultValue: "-", description: "Additional CSS classes for the knob." },
  { name: "tooltip", type: "string", defaultValue: "-", description: "Tooltip text shown on hover." },
  { name: "onBlur", type: "(e: FocusEvent) => void", defaultValue: "-", description: "Callback fired when switch loses focus." },
  { name: "onFocus", type: "(e: FocusEvent) => void", defaultValue: "-", description: "Callback fired when switch gains focus." },
  { name: "aria-label", type: "string", defaultValue: "-", description: "Accessibility label for screen readers." },
  { name: "aria-describedby", type: "string", defaultValue: "-", description: "ID of element describing the switch." },
  { name: "aria-labelledby", type: "string", defaultValue: "-", description: "ID of element labelling the switch." },
  { name: "data-testid", type: "string", defaultValue: "-", description: "Test ID for testing frameworks." },
  { name: "tabIndex", type: "number", defaultValue: "0", description: "Tab index for keyboard navigation." },
  { name: "ref", type: "Ref<HTMLInputElement>", defaultValue: "-", description: "Ref forwarded to the underlying input element." },
];

const parentPropDefinitions: PropDefinition[] = [
  { name: "label", type: "string", defaultValue: "-", description: "Label for the parent switch that controls all children." },
  { name: "children", type: "ReactNode", defaultValue: "-", description: "Child ToggleSwitch components to be controlled." },
  { name: "variant", type: "'default' | 'outlined' | 'filled' | 'minimal'", defaultValue: "'default'", description: "Visual style variant applied to parent and children." },
  { name: "size", type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", defaultValue: "'md'", description: "Size applied to parent and child switches." },
  { name: "indeterminate", type: "boolean", defaultValue: "-", description: "Shows indeterminate state when some but not all children are checked." },
];

const typeDefinitions = [
  { name: "ToggleSwitchSize", definition: "'xs' | 'sm' | 'md' | 'lg' | 'xl'" },
  { name: "ToggleSwitchVariant", definition: "'default' | 'outlined' | 'filled' | 'minimal'" },
  { name: "LabelPlacement", definition: "'start' | 'end' | 'top' | 'bottom'" },
];

export function SwitchPreview() {
  const [checked, setChecked] = useState(true);
  const [checked2, setChecked2] = useState(false);

  return (
    <div className="flex flex-col gap-11 w-full">
      {/* 1. Basic Switch Section */}
      <PreviewCard
        title="Basic Switch"
        description="The fundamental toggle switch for binary on/off states. Perfect for settings, preferences, and feature toggles."
        code={`import { ToggleSwitch } from "andhera-react";
import { useState } from "react";

export function Example() {
  const [checked, setChecked] = useState(false);
  
  return (
    <ToggleSwitch
      checked={checked}
      onChange={setChecked}
      label="Enable notifications"
    />
  );
}`}
      >
        <div className="flex gap-10 items-center justify-center">
          <ToggleSwitch 
            label="Simple Toggle" 
            checked={checked} 
            onChange={setChecked} 
          />
          <ToggleSwitch 
            label="Unchecked" 
            checked={checked2} 
            onChange={setChecked2} 
          />
        </div>
      </PreviewCard>

      {/* 2. Switch Sizes Section */}
      <PreviewCard
        title="Switch Sizes"
        description="Five size variants to fit different UI contexts. Use smaller sizes for compact UIs and larger sizes for touch-friendly interfaces.

ToggleSwitchSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl'"
        code={`import { ToggleSwitch } from "andhera-react";

export function Example() {
  const [checked, setChecked] = useState(true);
  
  return (
    <div className="flex flex-col gap-4">
      <ToggleSwitch checked={checked} onChange={setChecked} size="xs" label="Extra Small" />
      <ToggleSwitch checked={checked} onChange={setChecked} size="sm" label="Small" />
      <ToggleSwitch checked={checked} onChange={setChecked} size="md" label="Medium (default)" />
      <ToggleSwitch checked={checked} onChange={setChecked} size="lg" label="Large" />
      <ToggleSwitch checked={checked} onChange={setChecked} size="xl" label="Extra Large" />
    </div>
  );
}`}
      >
        <div className="flex flex-col gap-6 items-start">
          <ToggleSwitch checked={checked} onChange={setChecked} size="xs" label="Extra Small" />
          <ToggleSwitch checked={checked} onChange={setChecked} size="sm" label="Small" />
          <ToggleSwitch checked={checked} onChange={setChecked} size="md" label="Medium (default)" />
          <ToggleSwitch checked={checked} onChange={setChecked} size="lg" label="Large" />
          <ToggleSwitch checked={checked} onChange={setChecked} size="xl" label="Extra Large" />
        </div>
      </PreviewCard>

      {/* 3. Switch Variants Section */}
      <PreviewCard
        title="Switch Variants"
        description="Three visual variants to match your design system. The outlined variant adds a subtle border in the off state.

ToggleSwitchVariant: 'default' | 'outlined' | 'filled'"
        code={`import { ToggleSwitch } from "andhera-react";

export function Example() {
  const [checked, setChecked] = useState(true);
  
  return (
    <div className="flex gap-8">
      <ToggleSwitch checked={checked} onChange={setChecked} variant="default" label="Default" />
      <ToggleSwitch checked={checked} onChange={setChecked} variant="outlined" label="Outlined" />
      <ToggleSwitch checked={checked} onChange={setChecked} variant="filled" label="Filled" />
    </div>
  );
}`}
      >
        <div className="flex gap-8 items-center justify-center flex-wrap">
          <ToggleSwitch checked={checked} onChange={setChecked} variant="default" label="Default" />
          <ToggleSwitch checked={checked} onChange={setChecked} variant="outlined" label="Outlined" />
          <ToggleSwitch checked={checked} onChange={setChecked} variant="filled" label="Filled" />
        </div>
      </PreviewCard>

      {/* 4. Custom Colors Section */}
      <PreviewCard
        title="Custom Colors"
        description="Fully customizable colors for both checked and unchecked states. Match your brand colors or use semantic colors for different purposes.

Color Props: checkedColor, uncheckedColor, borderFocusColor (Tailwind classes)"
        code={`import { ToggleSwitch } from "andhera-react";

export function Example() {
  const [checked, setChecked] = useState(true);
  
  return (
    <div className="flex gap-6">
      <ToggleSwitch
        checked={checked}
        onChange={setChecked}
        label="Red Theme"
        checkedColor="bg-red-500"
        borderFocusColor="ring-red-400"
      />
      <ToggleSwitch
        checked={checked}
        onChange={setChecked}
        label="Green Theme"
        checkedColor="bg-green-500"
        borderFocusColor="ring-green-400"
      />
      <ToggleSwitch
        checked={checked}
        onChange={setChecked}
        label="Purple Theme"
        checkedColor="bg-purple-500"
        borderFocusColor="ring-purple-400"
      />
    </div>
  );
}`}
      >
        <div className="flex gap-8 items-center justify-center flex-wrap">
          <ToggleSwitch
            checked={checked}
            onChange={setChecked}
            label="Red Theme"
            checkedColor="bg-red-500"
            borderFocusColor="ring-red-400"
          />
          <ToggleSwitch
            checked={checked}
            onChange={setChecked}
            label="Green Theme"
            checkedColor="bg-green-500"
            borderFocusColor="ring-green-400"
          />
          <ToggleSwitch
            checked={checked}
            onChange={setChecked}
            label="Purple Theme"
            checkedColor="bg-purple-500"
            borderFocusColor="ring-purple-400"
          />
          <ToggleSwitch
            checked={checked}
            onChange={setChecked}
            label="Amber Theme"
            checkedColor="bg-amber-500"
            borderFocusColor="ring-amber-400"
          />
        </div>
      </PreviewCard>

      {/* 5. Custom Knob Colors Section */}
      <PreviewCard
        title="Custom Knob Colors"
        description="Customize the knob (toggle circle) color for both inactive and active states. Perfect for creating unique visual feedback.

Knob Props: knobColor, activeKnobColor (Tailwind classes)"
        code={`import { ToggleSwitch } from "andhera-react";

export function Example() {
  const [checked, setChecked] = useState(true);
  
  return (
    <div className="flex gap-6">
      <ToggleSwitch
        checked={checked}
        onChange={setChecked}
        label="Yellow Knob"
        knobColor="bg-yellow-400"
        activeKnobColor="bg-yellow-300"
      />
      <ToggleSwitch
        checked={checked}
        onChange={setChecked}
        label="Pink Knob"
        checkedColor="bg-pink-500"
        knobColor="bg-pink-200"
        activeKnobColor="bg-white"
      />
    </div>
  );
}`}
      >
        <div className="flex gap-8 items-center justify-center flex-wrap">
          <ToggleSwitch
            checked={checked}
            onChange={setChecked}
            label="Yellow Knob"
            knobColor="bg-yellow-400"
            activeKnobColor="bg-yellow-300"
          />
          <ToggleSwitch
            checked={checked}
            onChange={setChecked}
            label="Pink Theme"
            checkedColor="bg-pink-500"
            knobColor="bg-pink-200"
            activeKnobColor="bg-white"
          />
          <ToggleSwitch
            checked={checked}
            onChange={setChecked}
            label="Cyan Theme"
            checkedColor="bg-cyan-500"
            knobColor="bg-cyan-200"
            activeKnobColor="bg-cyan-100"
          />
        </div>
      </PreviewCard>

      {/* 6. Icons in Switch Section */}
      <PreviewCard
        title="Icons in Switch"
        description="Add icons inside the knob for visual feedback. You can use a single icon, or different icons for checked and unchecked states.

Icon Props: icon, checkedIcon, uncheckedIcon (ReactNode | string)"
        code={`import { ToggleSwitch } from "andhera-react";

export function Example() {
  const [checked, setChecked] = useState(true);
  
  // SVG Icons
  const CheckIcon = (
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
  
  const XIcon = (
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );
  
  return (
    <ToggleSwitch
      checked={checked}
      onChange={setChecked}
      label="With Icons"
      checkedIcon={CheckIcon}
      uncheckedIcon={XIcon}
      size="lg"
    />
  );
}`}
      >
        <div className="flex gap-8 items-center justify-center flex-wrap">
          <ToggleSwitch
            checked={checked}
            onChange={setChecked}
            label="Emoji Icon"
            icon="😊"
            size="lg"
          />
          <ToggleSwitch
            checked={checked}
            onChange={setChecked}
            label="Check/X Icons"
            size="lg"
            checkedIcon={
              <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            }
            uncheckedIcon={
              <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            }
          />
          <ToggleSwitch
            checked={checked}
            onChange={setChecked}
            label="Sun/Moon"
            size="xl"
            checkedIcon="🌙"
            uncheckedIcon="☀️"
            checkedColor="bg-indigo-600"
          />
        </div>
      </PreviewCard>

      {/* 7. Label Placement Section */}
      <PreviewCard
        title="Label Placement"
        description="Position the label on any side of the switch. Useful for different layout requirements and RTL support.

LabelPlacement: 'left' | 'right' | 'top' | 'bottom'"
        code={`import { ToggleSwitch } from "andhera-react";

export function Example() {
  const [checked, setChecked] = useState(true);
  
  return (
    <div className="flex gap-8">
      <ToggleSwitch checked={checked} onChange={setChecked} label="Left" labelPlacement="left" />
      <ToggleSwitch checked={checked} onChange={setChecked} label="Right" labelPlacement="right" />
      <ToggleSwitch checked={checked} onChange={setChecked} label="Top" labelPlacement="top" />
      <ToggleSwitch checked={checked} onChange={setChecked} label="Bottom" labelPlacement="bottom" />
    </div>
  );
}`}
      >
        <div className="flex gap-10 items-center justify-center flex-wrap">
          <ToggleSwitch checked={checked} onChange={setChecked} label="Left" labelPlacement="left" />
          <ToggleSwitch checked={checked} onChange={setChecked} label="Right" labelPlacement="right" />
          <ToggleSwitch checked={checked} onChange={setChecked} label="Top" labelPlacement="top" />
          <ToggleSwitch checked={checked} onChange={setChecked} label="Bottom" labelPlacement="bottom" />
        </div>
      </PreviewCard>

      {/* 8. Helper Text Section */}
      <PreviewCard
        title="Helper Text"
        description="Add descriptive helper text below the switch to provide additional context or instructions to users.

helperText: string | ReactNode"
        code={`import { ToggleSwitch } from "andhera-react";

export function Example() {
  const [checked, setChecked] = useState(true);
  
  return (
    <ToggleSwitch
      checked={checked}
      onChange={setChecked}
      label="Marketing emails"
      helperText="Receive occasional updates about new features and promotions."
    />
  );
}`}
      >
        <div className="flex flex-col gap-6 items-start">
          <ToggleSwitch
            checked={checked}
            onChange={setChecked}
            label="Marketing emails"
            helperText="Receive occasional updates about new features and promotions."
          />
          <ToggleSwitch
            checked={checked2}
            onChange={setChecked2}
            label="Two-factor authentication"
            helperText="Adds an extra layer of security to your account."
          />
        </div>
      </PreviewCard>

      {/* 9. Error State Section */}
      <PreviewCard
        title="Error State"
        description="Display an error state with a red ring indicator. Combine with helper text to show error messages.

error: boolean (default: false)"
        code={`import { ToggleSwitch } from "andhera-react";

export function Example() {
  const [accepted, setAccepted] = useState(false);
  
  return (
    <ToggleSwitch
      checked={accepted}
      onChange={setAccepted}
      label="Accept terms"
      error={!accepted}
      helperText={!accepted ? "You must accept the terms to continue" : "Terms accepted"}
      required
    />
  );
}`}
      >
        <div className="flex flex-col gap-6 items-start">
          <ToggleSwitch
            checked={checked2}
            onChange={setChecked2}
            label="Accept terms"
            error={!checked2 ? "You must accept the terms to continue" : undefined}
            helperText={checked2 ? "Terms accepted ✓" : undefined}
            required
          />
          <ToggleSwitch
            checked={false}
            onChange={() => {}}
            label="Required field"
            error="This field is required"
          />
        </div>
      </PreviewCard>

      {/* 10. Loading State Section */}
      <PreviewCard
        title="Loading State"
        description="Display a loading spinner inside the knob while an async operation is in progress. The switch is disabled during loading.

loading: boolean (default: false)"
        code={`import { ToggleSwitch } from "andhera-react";

export function Example() {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleChange = async (value: boolean) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setChecked(value);
    setLoading(false);
  };
  
  return (
    <ToggleSwitch
      checked={checked}
      onChange={handleChange}
      label="Sync settings"
      loading={loading}
      size="lg"
    />
  );
}`}
      >
        <div className="flex gap-8 items-center justify-center flex-wrap">
          <ToggleSwitch
            checked={checked}
            onChange={setChecked}
            label="Loading (sm)"
            loading={true}
            size="sm"
          />
          <ToggleSwitch
            checked={checked}
            onChange={setChecked}
            label="Loading (md)"
            loading={true}
            size="md"
          />
          <ToggleSwitch
            checked={checked}
            onChange={setChecked}
            label="Loading (lg)"
            loading={true}
            size="lg"
          />
        </div>
      </PreviewCard>

      {/* 11. Disabled State Section */}
      <PreviewCard
        title="Disabled State"
        description="Disable the switch to prevent user interaction. Useful for permission-based UI or when a feature is temporarily unavailable.

disabled: boolean (default: false)"
        code={`import { ToggleSwitch } from "andhera-react";

export function Example() {
  return (
    <div className="flex gap-6">
      <ToggleSwitch checked={true} onChange={() => {}} label="Disabled On" disabled />
      <ToggleSwitch checked={false} onChange={() => {}} label="Disabled Off" disabled />
    </div>
  );
}`}
      >
        <div className="flex gap-8 items-center justify-center flex-wrap">
          <ToggleSwitch checked={true} onChange={() => {}} label="Disabled On" disabled />
          <ToggleSwitch checked={false} onChange={() => {}} label="Disabled Off" disabled />
          <ToggleSwitch checked={true} onChange={() => {}} label="Disabled Large" disabled size="lg" />
        </div>
      </PreviewCard>

      {/* 12. Read Only State Section */}
      <PreviewCard
        title="Read Only State"
        description="Make the switch read-only to display state without allowing changes. Unlike disabled, it doesn't change visual opacity.

readOnly: boolean (default: false)"
        code={`import { ToggleSwitch } from "andhera-react";

export function Example() {
  return (
    <div className="flex gap-6">
      <ToggleSwitch checked={true} onChange={() => {}} label="Read Only On" readOnly />
      <ToggleSwitch checked={false} onChange={() => {}} label="Read Only Off" readOnly />
    </div>
  );
}`}
      >
        <div className="flex gap-8 items-center justify-center flex-wrap">
          <ToggleSwitch checked={true} onChange={() => {}} label="Read Only On" readOnly />
          <ToggleSwitch checked={false} onChange={() => {}} label="Read Only Off" readOnly />
        </div>
      </PreviewCard>

      {/* 13. Required Field Section */}
      <PreviewCard
        title="Required Field"
        description="Mark the switch as required with a visual asterisk indicator. Useful for form validation and accessibility."
        code={`import { ToggleSwitch } from "andhera-react";

export function Example() {
  const [checked, setChecked] = useState(false);
  
  return (
    <ToggleSwitch
      checked={checked}
      onChange={setChecked}
      label="Accept privacy policy"
      required
      helperText="Required to create an account"
    />
  );
}`}
      >
        <div className="flex gap-8 items-center justify-center flex-wrap">
          <ToggleSwitch
            checked={checked}
            onChange={setChecked}
            label="Accept terms"
            required
          />
          <ToggleSwitch
            checked={checked2}
            onChange={setChecked2}
            label="Subscribe to newsletter"
            required
            helperText="Required field"
          />
        </div>
      </PreviewCard>

      {/* 14. Uncontrolled with ParentToggleSwitch Section */}
      <PreviewCard
        title="Uncontrolled Switch"
        description="Use ParentToggleSwitch for an uncontrolled component that manages its own state. Perfect for simple forms where you only need the final value."
        code={`import { ParentToggleSwitch } from "andhera-react";

export function Example() {
  return (
    <ParentToggleSwitch
      initialChecked={true}
      onToggle={(checked) => console.log('Toggled:', checked)}
      label="Auto-save drafts"
      helperText="Automatically save your work every 30 seconds"
      size="lg"
    />
  );
}`}
      >
        <div className="flex flex-col gap-6 items-start">
          <ParentToggleSwitch
            initialChecked={true}
            onToggle={(checked) => console.log('Toggled:', checked)}
            label="Auto-save drafts"
            helperText="Automatically save your work every 30 seconds"
          />
          <ParentToggleSwitch
            initialChecked={false}
            onToggle={(checked) => console.log('Dark mode:', checked)}
            label="Dark mode"
            size="lg"
            checkedColor="bg-slate-700"
          />
        </div>
      </PreviewCard>

      {/* 15. Custom Styling Section */}
      <PreviewCard
        title="Custom Styling"
        description="Apply custom classes to the container, switch track, label, and knob for complete visual customization.

Styling Props: className, switchClassName, labelClassName, knobClassName"
        code={`import { ToggleSwitch } from "andhera-react";

export function Example() {
  const [checked, setChecked] = useState(true);
  
  return (
    <div className="flex flex-col gap-4">
      <ToggleSwitch
        checked={checked}
        onChange={setChecked}
        label="Card Style"
        className="bg-slate-800 p-4 rounded-xl border border-slate-700"
        labelClassName="text-white font-semibold"
      />
      <ToggleSwitch
        checked={checked}
        onChange={setChecked}
        label="Gradient Theme"
        checkedColor="bg-gradient-to-r from-purple-500 to-pink-500"
        className="p-3 rounded-lg"
      />
    </div>
  );
}`}
      >
        <div className="flex gap-6 items-center justify-center flex-wrap">
          <ToggleSwitch
            checked={checked}
            onChange={setChecked}
            label="Card Style"
            className="bg-slate-800 p-4 rounded-xl border border-slate-700"
            labelClassName="text-white font-semibold"
          />
          <ToggleSwitch
            checked={checked}
            onChange={setChecked}
            label="Yellow Theme"
            checkedColor="bg-[#FFCB00]"
            className="bg-slate-900 p-4 rounded-xl"
            labelClassName="text-[#FFCB00] font-medium"
            knobColor="bg-slate-900"
            activeKnobColor="bg-slate-800"
          />
          <ToggleSwitch
            checked={checked}
            onChange={setChecked}
            label="Outlined Box"
            className="p-4 border-2 border-dashed border-blue-500 rounded-lg"
            labelClassName="text-blue-400"
            checkedColor="bg-blue-500"
          />
        </div>
      </PreviewCard>

      {/* 16. Accessibility Section */}
      <PreviewCard
        title="Accessibility"
        description="Full accessibility support with ARIA attributes, keyboard navigation, and proper labeling for screen readers.

A11y Props: aria-label, aria-describedby, data-testid, tooltip, name, id"
        code={`import { ToggleSwitch } from "andhera-react";

export function Example() {
  const [checked, setChecked] = useState(false);
  
  return (
    <ToggleSwitch
      checked={checked}
      onChange={setChecked}
      label="Enable screen reader announcements"
      aria-label="Toggle screen reader announcements"
      aria-describedby="sr-description"
      data-testid="accessibility-toggle"
      tooltip="Toggle to enable/disable announcements"
    />
  );
}`}
      >
        <div className="flex flex-col gap-6 items-start">
          <ToggleSwitch
            checked={checked}
            onChange={setChecked}
            label="Screen reader support"
            aria-label="Toggle screen reader support"
            data-testid="accessibility-toggle"
          />
          <ToggleSwitch
            checked={checked2}
            onChange={setChecked2}
            label="High contrast mode"
            aria-describedby="contrast-help"
            helperText="Increases visual contrast for better visibility"
          />
        </div>
      </PreviewCard>

      {/* 17. Form Integration Section */}
      <PreviewCard
        title="Form Integration"
        description="Seamlessly integrate with forms using the name prop and event handlers. Works with both controlled and uncontrolled form patterns."
        code={`import { ToggleSwitch } from "andhera-react";

export function Example() {
  const [settings, setSettings] = useState({
    notifications: true,
    marketing: false,
    analytics: true,
  });
  
  const handleChange = (key: string) => (value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <ToggleSwitch
        name="notifications"
        checked={settings.notifications}
        onChange={handleChange('notifications')}
        label="Push notifications"
      />
      <ToggleSwitch
        name="marketing"
        checked={settings.marketing}
        onChange={handleChange('marketing')}
        label="Marketing emails"
      />
      <ToggleSwitch
        name="analytics"
        checked={settings.analytics}
        onChange={handleChange('analytics')}
        label="Usage analytics"
      />
      <button type="submit">Save Settings</button>
    </form>
  );
}`}
      >
        <div className="flex flex-col gap-4 items-start">
          <ToggleSwitch
            name="notifications"
            checked={checked}
            onChange={setChecked}
            label="Push notifications"
            helperText="Receive push notifications on your device"
          />
          <ToggleSwitch
            name="marketing"
            checked={checked2}
            onChange={setChecked2}
            label="Marketing emails"
            helperText="Occasional updates about new features"
          />
          <div className="mt-2 text-sm text-gray-400">
            Form values: notifications={checked.toString()}, marketing={checked2.toString()}
          </div>
        </div>
      </PreviewCard>

      {/* 18. Size Comparison Section */}
      <PreviewCard
        title="All Sizes with Features"
        description="Comprehensive view of all sizes combined with various features like icons, colors, and states."
        code={`import { ToggleSwitch } from "andhera-react";

export function Example() {
  const [checked, setChecked] = useState(true);
  
  return (
    <div className="grid grid-cols-2 gap-4">
      <ToggleSwitch size="xs" checked={checked} onChange={setChecked} label="Extra Small" icon="✓" />
      <ToggleSwitch size="sm" checked={checked} onChange={setChecked} label="Small" checkedColor="bg-blue-500" />
      <ToggleSwitch size="md" checked={checked} onChange={setChecked} label="Medium" variant="outlined" />
      <ToggleSwitch size="lg" checked={checked} onChange={setChecked} label="Large" loading />
      <ToggleSwitch size="xl" checked={checked} onChange={setChecked} label="Extra Large" disabled />
    </div>
  );
}`}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 items-center">
          <ToggleSwitch size="xs" checked={checked} onChange={setChecked} label="XS + Icon" icon="✓" />
          <ToggleSwitch size="sm" checked={checked} onChange={setChecked} label="SM + Color" checkedColor="bg-blue-500" />
          <ToggleSwitch size="md" checked={checked} onChange={setChecked} label="MD + Outlined" variant="outlined" />
          <ToggleSwitch size="lg" checked={true} onChange={() => {}} label="LG + Loading" loading />
          <ToggleSwitch size="xl" checked={checked} onChange={setChecked} label="XL + Error" error="Error state" />
          <ToggleSwitch size="lg" checked={true} onChange={() => {}} label="LG + Disabled" disabled />
        </div>
      </PreviewCard>

      {/* Props Reference */}
      <PropsReference />
    </div>
  );
}

function PropsReference() {
  return (
    <div className="flex flex-col gap-8">
      {/* ToggleSwitch Props */}
      <div className="w-full bg-white/[0.04] border border-[#364153] rounded-2xl p-6 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="font-manrope text-xl font-semibold m-0 text-white">
            ToggleSwitch Props
          </h3>
          <p className="m-0 text-[#AEB6C4] text-sm leading-relaxed">
            ToggleSwitch provides a customizable on/off toggle with support for icons, loading states, and various visual styles.
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

      {/* ParentToggleSwitch Props */}
      <div className="w-full bg-white/[0.04] border border-[#364153] rounded-2xl p-6 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="font-manrope text-xl font-semibold m-0 text-white">
            ParentToggleSwitch Props
          </h3>
          <p className="m-0 text-[#AEB6C4] text-sm leading-relaxed">
            ParentToggleSwitch controls multiple child switches with support for indeterminate state.
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
              {parentPropDefinitions.map((prop) => (
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

      {/* Types */}
      <div className="w-full bg-white/[0.04] border border-[#364153] rounded-2xl p-6 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="font-manrope text-xl font-semibold m-0 text-white">
            Types
          </h3>
          <p className="m-0 text-[#AEB6C4] text-sm leading-relaxed">
            TypeScript types exported for use with ToggleSwitch components.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[640px] font-manrope text-sm text-[#E3E6F2]">
            <thead>
              <tr>
                {[
                  { label: "TYPE NAME", width: "30%" },
                  { label: "DEFINITION", width: "70%" },
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
              {typeDefinitions.map((type) => (
                <tr key={type.name}>
                  <td className="p-3 border-b border-[#2B3546] font-medium text-white">
                    {type.name}
                  </td>
                  <td className="p-3 border-b border-[#2B3546]">
                    <code className="text-xs bg-gray-800/50 px-2 py-1 rounded">{type.definition}</code>
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