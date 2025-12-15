import { useState } from "react";
import { Slider } from "../../../src/components/slider";
import { PreviewCard as SharedPreviewCard } from "../components/PreviewCard";

interface PropDefinition {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
}

const propDefinitions: PropDefinition[] = [
  { name: "min", type: "number", defaultValue: "0", description: "Minimum value of the slider." },
  { name: "max", type: "number", defaultValue: "100", description: "Maximum value of the slider." },
  { name: "step", type: "number", defaultValue: "1", description: "Step increment for value changes. Use decimal values for precise control." },
  { name: "value", type: "number", defaultValue: "-", description: "Current value for controlled mode. Use with onChange." },
  { name: "defaultValue", type: "number", defaultValue: "min", description: "Default value for uncontrolled mode." },
  { name: "onChange", type: "(value: number) => void", defaultValue: "-", description: "Callback fired when value changes." },
  { name: "onChangeStart", type: "(value: number) => void", defaultValue: "-", description: "Callback fired when dragging starts." },
  { name: "onChangeEnd", type: "(value: number) => void", defaultValue: "-", description: "Callback fired when dragging ends." },
  { name: "disabled", type: "boolean", defaultValue: "false", description: "When true, disables the slider and prevents interaction." },
  { name: "readOnly", type: "boolean", defaultValue: "false", description: "When true, makes the slider read-only but still focusable." },
  { name: "orientation", type: "'horizontal' | 'vertical'", defaultValue: "'horizontal'", description: "Orientation of the slider." },
  { name: "variant", type: "'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'dark'", defaultValue: "'primary'", description: "Color variant for the slider appearance." },
  { name: "size", type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: "Size of the slider." },
  { name: "showTooltip", type: "boolean", defaultValue: "false", description: "When true, always shows tooltip with current value." },
  { name: "showTooltipOnDrag", type: "boolean", defaultValue: "false", description: "When true, shows tooltip only while dragging." },
  { name: "tooltipPosition", type: "'top' | 'bottom' | 'left' | 'right'", defaultValue: "'top'", description: "Position of the tooltip." },
  { name: "tooltipFormat", type: "(value: number) => string", defaultValue: "-", description: "Custom formatter function for tooltip text." },
  { name: "label", type: "string", defaultValue: "-", description: "Label text displayed above the slider." },
  { name: "required", type: "boolean", defaultValue: "false", description: "When true, displays a required indicator (*) next to the label." },
  { name: "description", type: "string", defaultValue: "-", description: "Description text displayed below the slider." },
  { name: "helperText", type: "string", defaultValue: "-", description: "Helper text displayed below the slider (hidden when error is shown)." },
  { name: "error", type: "boolean", defaultValue: "false", description: "When true, displays the slider in error state." },
  { name: "errorMessage", type: "string", defaultValue: "-", description: "Error message displayed below the slider when error is true." },
  { name: "showSteps", type: "boolean", defaultValue: "false", description: "When true, shows step markers on the track." },
  { name: "marks", type: "SliderMark[]", defaultValue: "-", description: "Custom marks to display on the track. Overrides showSteps." },
  { name: "showValueLabels", type: "boolean", defaultValue: "false", description: "When true, shows min/max and current value labels." },
  { name: "range", type: "boolean", defaultValue: "false", description: "When true, enables range selection with two thumbs." },
  { name: "valueStart", type: "number", defaultValue: "-", description: "Start value for range slider in controlled mode." },
  { name: "valueEnd", type: "number", defaultValue: "-", description: "End value for range slider in controlled mode." },
  { name: "onRangeChange", type: "(start: number, end: number) => void", defaultValue: "-", description: "Callback fired when range values change." },
  { name: "inverted", type: "boolean", defaultValue: "false", description: "When true, inverts the slider direction." },
  { name: "trackWidth", type: "number | string", defaultValue: "400", description: "Width of the slider track in pixels or CSS value." },
  { name: "trackHeight", type: "number | string", defaultValue: "320", description: "Height of the slider track (for vertical orientation)." },
  { name: "className", type: "string", defaultValue: "-", description: "Custom class name for the container." },
  { name: "trackClassName", type: "string", defaultValue: "-", description: "Custom class name for the track element." },
  { name: "thumbClassName", type: "string", defaultValue: "-", description: "Custom class name for the thumb element(s)." },
  { name: "fillClassName", type: "string", defaultValue: "-", description: "Custom class name for the filled track portion." },
  { name: "labelClassName", type: "string", defaultValue: "-", description: "Custom class name for the label element." },
  { name: "tooltipClassName", type: "string", defaultValue: "-", description: "Custom class name for the tooltip element." },
  { name: "descriptionClassName", type: "string", defaultValue: "-", description: "Custom class name for the description/helper text." },
  { name: "stepClassName", type: "string", defaultValue: "-", description: "Custom class name for step markers." },
  { name: "id", type: "string", defaultValue: "-", description: "ID attribute for the slider." },
  { name: "name", type: "string", defaultValue: "-", description: "Name attribute for form submission." },
  { name: "aria-label", type: "string", defaultValue: "-", description: "Accessible label when no visible label is provided." },
  { name: "aria-labelledby", type: "string", defaultValue: "-", description: "ID of an element that labels the slider." },
  { name: "aria-describedby", type: "string", defaultValue: "-", description: "ID of an element that describes the slider." },
  { name: "aria-valuetext", type: "string", defaultValue: "-", description: "Accessible text announcing value changes (for screen readers)." },
];

function PropsReference() {
  return (
    <div className="w-full bg-white/[0.04] border border-[#364153] rounded-2xl p-6 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="font-manrope text-xl font-semibold m-0 text-white">
          Slider Props
        </h3>
        <p className="m-0 text-[#AEB6C4] text-sm leading-relaxed">
          Slider is a flexible input component for selecting values from a range.
          It supports single value, range selection, vertical orientation, and extensive customization options.
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
 * SliderPreview Component
 * Displays all slider variants showcasing comprehensive customization options
 */
export function SliderPreview() {
  const [basicValue, setBasicValue] = useState(50);
  const [controlledValue, setControlledValue] = useState(30);
  const [sizeValues, setSizeValues] = useState({ sm: 25, md: 50, lg: 75 });
  const [variantValues, setVariantValues] = useState({
    default: 20,
    primary: 40,
    secondary: 50,
    success: 60,
    warning: 70,
    danger: 80,
    info: 35,
    dark: 45
  });
  const [rangeValues, setRangeValues] = useState({ start: 25, end: 75 });
  const [verticalValue, setVerticalValue] = useState(60);
  const [verticalRange, setVerticalRange] = useState({ start: 30, end: 80 });
  const [tooltipAlwaysValue, setTooltipAlwaysValue] = useState(65);
  const [tooltipDragValue, setTooltipDragValue] = useState(40);
  const [stepsValue, setStepsValue] = useState(50);
  const [marksValue, setMarksValue] = useState(50);
  const [invertedValue, setInvertedValue] = useState(40);
  const [errorValue, setErrorValue] = useState(10);
  const [volumeValue, setVolumeValue] = useState(60);
  const [brightnessValue, setBrightnessValue] = useState(65);
  const [skillValue, setSkillValue] = useState(5);
  const [shortSliderValue, setShortSliderValue] = useState(50);
  const [fullWidthValue, setFullWidthValue] = useState(50);
  const [accessibilityValue, setAccessibilityValue] = useState(60);
  const [customStyleValue, setCustomStyleValue] = useState(60);

  return (
    <div className="flex flex-col gap-11 w-full">
      {/* 1. Basic Slider */}
      <SharedPreviewCard
        title="Basic Slider"
        description="The basic slider allows users to select a single value from a range. Perfect for adjusting settings like volume, brightness, or any numerical input within defined bounds."
        code={`import { useState } from "react";
import { Slider } from "andhera-react";

export function Example() {
  const [value, setValue] = useState(50);
  return (
    <Slider
      min={0}
      max={100}
      value={value}
      onChange={setValue}
      label="Volume"
    />
  );
}`}
      >
        <div className="w-[300px] mx-auto">
          <Slider
            min={0}
            max={100}
            value={basicValue}
            onChange={setBasicValue}
            label="Volume"
          />
        </div>
      </SharedPreviewCard>

      {/* 2. Size Variants */}
      <SharedPreviewCard
        title="Size Variants"
        description="Sliders come in three sizes: 'sm' (small - 3px track, 28x18px thumb), 'md' (medium - 4px track, 32x20px thumb), and 'lg' (large - 6px track, 38x24px thumb)."
        code={`import { Slider } from "andhera-react";

// Small - compact interfaces
<Slider size="sm" value={25} label="Small" />

// Medium (default) - standard use
<Slider size="md" value={50} label="Medium" />

// Large - accessibility/emphasis
<Slider size="lg" value={75} label="Large" />`}
      >
        <div className="flex flex-col gap-6 w-[300px] mx-auto">
          <Slider
            size="sm"
            min={0}
            max={100}
            value={sizeValues.sm}
            onChange={(val) => setSizeValues(prev => ({ ...prev, sm: val }))}
            label="Small"
          />
          <Slider
            size="md"
            min={0}
            max={100}
            value={sizeValues.md}
            onChange={(val) => setSizeValues(prev => ({ ...prev, md: val }))}
            label="Medium (Default)"
          />
          <Slider
            size="lg"
            min={0}
            max={100}
            value={sizeValues.lg}
            onChange={(val) => setSizeValues(prev => ({ ...prev, lg: val }))}
            label="Large"
          />
        </div>
      </SharedPreviewCard>

      {/* 3. Color Variants */}
      <SharedPreviewCard
        title="Color Variants"
        description="Eight color variants to match your design system: 'default' (gray), 'primary' (#FFCB00), 'secondary' (gray-600), 'success' (green), 'warning' (yellow), 'danger' (red), 'info' (cyan), 'dark' (gray-900)."
        code={`import { Slider } from "andhera-react";

<Slider variant="primary" value={40} label="Primary" />
<Slider variant="success" value={60} label="Success" />
<Slider variant="warning" value={70} label="Warning" />
<Slider variant="danger" value={80} label="Danger" />
<Slider variant="info" value={35} label="Info" />`}
      >
        <div className="grid grid-cols-2 gap-x-12 gap-y-6 mx-auto w-fit">
          <div className="w-[250px]">
            <Slider
              variant="default"
              min={0}
              max={100}
              value={variantValues.default}
              onChange={(val) => setVariantValues(prev => ({ ...prev, default: val }))}
              label="Default"
              trackWidth={220}
            />
          </div>
          <div className="w-[250px]">
            <Slider
              variant="primary"
              min={0}
              max={100}
              value={variantValues.primary}
              onChange={(val) => setVariantValues(prev => ({ ...prev, primary: val }))}
              label="Primary"
              trackWidth={220}
            />
          </div>
          <div className="w-[250px]">
            <Slider
              variant="success"
              min={0}
              max={100}
              value={variantValues.success}
              onChange={(val) => setVariantValues(prev => ({ ...prev, success: val }))}
              label="Success"
              trackWidth={220}
            />
          </div>
          <div className="w-[250px]">
            <Slider
              variant="warning"
              min={0}
              max={100}
              value={variantValues.warning}
              onChange={(val) => setVariantValues(prev => ({ ...prev, warning: val }))}
              label="Warning"
              trackWidth={220}
            />
          </div>
          <div className="w-[250px]">
            <Slider
              variant="danger"
              min={0}
              max={100}
              value={variantValues.danger}
              onChange={(val) => setVariantValues(prev => ({ ...prev, danger: val }))}
              label="Danger"
              trackWidth={220}
            />
          </div>
          <div className="w-[250px]">
            <Slider
              variant="info"
              min={0}
              max={100}
              value={variantValues.info}
              onChange={(val) => setVariantValues(prev => ({ ...prev, info: val }))}
              label="Info"
              trackWidth={220}
            />
          </div>
        </div>
      </SharedPreviewCard>

      {/* 4. Range Slider */}
      <SharedPreviewCard
        title="Range Slider"
        description="Enable range mode to select a range between two values. Perfect for price filters, date ranges, or defining min/max bounds. Use valueStart, valueEnd, and onRangeChange props."
        code={`import { useState } from "react";
import { Slider } from "andhera-react";

export function Example() {
  const [range, setRange] = useState({ start: 25, end: 75 });
  return (
    <Slider
      range
      min={0}
      max={100}
      valueStart={range.start}
      valueEnd={range.end}
      onRangeChange={(start, end) => setRange({ start, end })}
      label="Price Range"
    />
  );
}`}
      >
        <div className="w-[350px] mx-auto">
          <Slider
            range
            min={0}
            max={100}
            valueStart={rangeValues.start}
            valueEnd={rangeValues.end}
            onRangeChange={(start, end) => setRangeValues({ start, end })}
            label="Price Range"
          />
          <p className="text-sm text-gray-400 mt-4">
            Selected: ${rangeValues.start} - ${rangeValues.end}
          </p>
        </div>
      </SharedPreviewCard>

      {/* 5. Vertical Orientation */}
      <SharedPreviewCard
        title="Vertical Orientation"
        description="Set orientation='vertical' for vertical sliders. Ideal for audio mixers, EQ controls, or interfaces where vertical interaction makes more sense. Use trackHeight to customize height."
        code={`import { Slider } from "andhera-react";

// Single value vertical
<Slider
  orientation="vertical"
  value={60}
  onChange={setValue}
  label="Volume"
  trackHeight={200}
/>

// Range vertical
<Slider
  orientation="vertical"
  range
  valueStart={30}
  valueEnd={80}
  onRangeChange={handleRange}
  variant="success"
/>`}
      >
        <div className="flex gap-16 items-end justify-center h-[260px] mx-auto w-fit">
          <div className="flex flex-col items-center">
            <Slider
              orientation="vertical"
              min={0}
              max={100}
              value={verticalValue}
              onChange={setVerticalValue}
              label="Volume"
              trackHeight={200}
            />
          </div>
          <div className="flex flex-col items-center">
            <Slider
              orientation="vertical"
              range
              min={0}
              max={100}
              valueStart={verticalRange.start}
              valueEnd={verticalRange.end}
              onRangeChange={(start, end) => setVerticalRange({ start, end })}
              variant="success"
              trackHeight={200}
            />
          </div>
        </div>
      </SharedPreviewCard>

      {/* 6. Tooltip Display */}
      <SharedPreviewCard
        title="Tooltip Display"
        description="Show value tooltips with showTooltip (always visible) or showTooltipOnDrag (only while dragging). Use tooltipFormat to customize the display format and tooltipPosition for placement."
        code={`import { Slider } from "andhera-react";

// Always show tooltip
<Slider
  showTooltip
  tooltipFormat={(val) => \`\${val}%\`}
  tooltipPosition="top"
  value={65}
/>

// Show tooltip only on drag
<Slider
  showTooltipOnDrag
  tooltipFormat={(val) => \`$\${val}\`}
  tooltipPosition="bottom"
/>`}
      >
        <div className="flex flex-col gap-8 w-[350px]">
          <Slider
            min={0}
            max={100}
            value={tooltipAlwaysValue}
            onChange={setTooltipAlwaysValue}
            showTooltip
            tooltipFormat={(val) => `${val}%`}
            tooltipPosition="top"
            label="Always Show Tooltip"
          />
          <Slider
            min={0}
            max={100}
            value={tooltipDragValue}
            onChange={setTooltipDragValue}
            showTooltipOnDrag
            tooltipFormat={(val) => `$${val}`}
            tooltipPosition="bottom"
            label="Tooltip on Drag Only"
          />
        </div>
      </SharedPreviewCard>

      {/* 7. Step Markers */}
      <SharedPreviewCard
        title="Step Markers"
        description="Show step markers on the track with showSteps. Markers appear at each step interval. For custom step values, adjust the step prop (e.g., step={10} for 10-unit increments)."
        code={`import { Slider } from "andhera-react";

<Slider
  min={0}
  max={100}
  step={10}
  showSteps
  showTooltip
  tooltipFormat={(val) => \`\${val}%\`}
  label="With Step Markers"
/>`}
      >
        <div className="w-[350px] mx-auto">
          <Slider
            min={0}
            max={100}
            step={10}
            value={stepsValue}
            onChange={setStepsValue}
            showSteps
            showTooltip
            tooltipFormat={(val) => `${val}%`}
            label="With Step Markers (step=10)"
            description="Values snap to 10-unit increments"
          />
        </div>
      </SharedPreviewCard>

      {/* 8. Custom Marks */}
      <SharedPreviewCard
        title="Custom Marks"
        description="Use the marks prop to define custom labeled markers at specific values. Each mark can have a value and optional label. Useful for temperature scales, ratings, or any labeled range."
        code={`import { Slider, SliderMark } from "andhera-react";

const marks: SliderMark[] = [
  { value: 0, label: "Cold" },
  { value: 25, label: "Cool" },
  { value: 50, label: "Warm" },
  { value: 75, label: "Hot" },
  { value: 100, label: "Max" },
];

<Slider
  min={0}
  max={100}
  marks={marks}
  label="Temperature"
/>`}
      >
        <div className="w-[400px] mx-auto">
          <Slider
            min={0}
            max={100}
            value={marksValue}
            onChange={setMarksValue}
            marks={[
              { value: 0, label: "Cold" },
              { value: 25, label: "Cool" },
              { value: 50, label: "Warm" },
              { value: 75, label: "Hot" },
              { value: 100, label: "Max" },
            ]}
            label="Temperature"
            showTooltip
            tooltipFormat={(val) => `${val}°`}
          />
        </div>
      </SharedPreviewCard>

      {/* 9. Inverted Direction */}
      <SharedPreviewCard
        title="Inverted Direction"
        description="Set inverted={true} to reverse the slider direction. Horizontal sliders go right-to-left, vertical sliders go top-to-bottom. Useful for RTL layouts or specific UI requirements."
        code={`import { Slider } from "andhera-react";

<Slider
  inverted
  value={40}
  showTooltip
  label="Inverted Slider"
/>`}
      >
        <div className="w-[350px] mx-auto">
          <Slider
            min={0}
            max={100}
            value={invertedValue}
            onChange={setInvertedValue}
            inverted
            showTooltip
            tooltipFormat={(val) => `${val}%`}
            label="Inverted Slider"
            description="Values increase from right to left"
          />
        </div>
      </SharedPreviewCard>

      {/* 10. Disabled & Read-Only States */}
      <SharedPreviewCard
        title="Disabled & Read-Only States"
        description="Set disabled={true} for non-interactive sliders (grayed out, not focusable). Set readOnly={true} for sliders that can be focused but not changed - useful for displaying values."
        code={`import { Slider } from "andhera-react";

// Disabled - not interactive
<Slider disabled value={40} label="Disabled" />

// Read-only - focusable but unchangeable
<Slider readOnly value={60} label="Read Only" />`}
      >
        <div className="flex flex-col gap-6 w-[300px] mx-auto">
          <Slider
            min={0}
            max={100}
            value={40}
            disabled
            label="Disabled Slider"
          />
          <Slider
            min={0}
            max={100}
            value={60}
            readOnly
            label="Read-Only Slider"
          />
          <Slider
            range
            min={0}
            max={100}
            valueStart={25}
            valueEnd={75}
            disabled
            label="Disabled Range"
            variant="success"
          />
        </div>
      </SharedPreviewCard>

      {/* 11. Error State */}
      <SharedPreviewCard
        title="Error State"
        description="Set error={true} to display the slider in an error state with red styling. Use errorMessage to show validation feedback below the slider."
        code={`import { Slider } from "andhera-react";

<Slider
  error
  errorMessage="Value must be at least 20"
  value={10}
  label="Budget"
  required
/>`}
      >
        <div className="w-[350px] mx-auto">
          <Slider
            min={0}
            max={100}
            value={errorValue}
            onChange={setErrorValue}
            error={errorValue < 20}
            errorMessage={errorValue < 20 ? "Value must be at least 20" : undefined}
            label="Minimum Budget"
            required
            showTooltip
            tooltipFormat={(val) => `$${val}`}
          />
        </div>
      </SharedPreviewCard>

      {/* 12. Helper Text & Description */}
      <SharedPreviewCard
        title="Helper Text & Description"
        description="Use description or helperText to provide additional context below the slider. Helper text is hidden when an error message is displayed."
        code={`import { Slider } from "andhera-react";

<Slider
  label="Volume"
  description="Adjust the master volume level"
  helperText="Recommended: 50-70%"
  value={60}
/>`}
      >
        <div className="flex flex-col gap-6 w-[350px] mx-auto">
          <Slider
            min={0}
            max={100}
            value={volumeValue}
            onChange={setVolumeValue}
            label="Volume"
            description="Adjust the master volume level"
          />
          <Slider
            min={0}
            max={100}
            value={brightnessValue}
            onChange={setBrightnessValue}
            label="Brightness"
            helperText="Recommended: 50-70% for eye comfort"
          />
        </div>
      </SharedPreviewCard>

      {/* 13. Required Field */}
      <SharedPreviewCard
        title="Required Field"
        description="Set required={true} to display a red asterisk (*) next to the label, indicating the field is mandatory. Combine with form validation for complete form handling."
        code={`import { Slider } from "andhera-react";

<Slider
  required
  label="Skill Level"
  name="skillLevel"
  min={1}
  max={10}
/>`}
      >
        <div className="w-[350px] mx-auto">
          <Slider
            min={1}
            max={10}
            step={1}
            value={skillValue}
            onChange={setSkillValue}
            required
            label="Skill Level"
            name="skillLevel"
            showTooltip
            tooltipFormat={(val) => `Level ${val}`}
          />
        </div>
      </SharedPreviewCard>

      {/* 14. Custom Track Dimensions */}
      <SharedPreviewCard
        title="Custom Track Dimensions"
        description="Customize slider dimensions with trackWidth and trackHeight props. Accept numbers (pixels) or CSS strings. Useful for fitting sliders into specific layout requirements."
        code={`import { Slider } from "andhera-react";

// Short horizontal slider
<Slider trackWidth={200} label="Short" />

// Wide horizontal slider
<Slider trackWidth="100%" label="Full Width" />

// Tall vertical slider
<Slider
  orientation="vertical"
  trackHeight={300}
  label="Tall"
/>`}
      >
        <div className="flex flex-col gap-6 w-full max-w-[500px] mx-auto">
          <Slider
            min={0}
            max={100}
            value={shortSliderValue}
            onChange={setShortSliderValue}
            trackWidth={200}
            label="Short Slider (200px)"
          />
          <Slider
            min={0}
            max={100}
            value={fullWidthValue}
            onChange={setFullWidthValue}
            trackWidth="100%"
            label="Full Width Slider"
          />
        </div>
      </SharedPreviewCard>

      {/* 15. Controlled Component */}
      <SharedPreviewCard
        title="Controlled Component"
        description="Use value and onChange for controlled mode. The component also supports onChangeStart (fired when dragging begins) and onChangeEnd (fired when dragging ends) for additional control."
        code={`import { useState } from "react";
import { Slider } from "andhera-react";

export function Example() {
  const [value, setValue] = useState(30);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <Slider
      value={value}
      onChange={setValue}
      onChangeStart={() => setIsDragging(true)}
      onChangeEnd={() => setIsDragging(false)}
      label={\`Value: \${value} \${isDragging ? "(dragging...)" : ""}\`}
    />
  );
}`}
      >
        <div className="w-[350px] mx-auto">
          <Slider
            min={0}
            max={100}
            value={controlledValue}
            onChange={setControlledValue}
            onChangeStart={(val) => console.log("Started at:", val)}
            onChangeEnd={(val) => console.log("Ended at:", val)}
            label={`Controlled Value: ${controlledValue}`}
            showTooltip
          />
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setControlledValue(0)}
              className="px-3 py-1 text-sm bg-gray-700 rounded hover:bg-gray-600"
            >
              Min
            </button>
            <button
              onClick={() => setControlledValue(50)}
              className="px-3 py-1 text-sm bg-gray-700 rounded hover:bg-gray-600"
            >
              50%
            </button>
            <button
              onClick={() => setControlledValue(100)}
              className="px-3 py-1 text-sm bg-gray-700 rounded hover:bg-gray-600"
            >
              Max
            </button>
          </div>
        </div>
      </SharedPreviewCard>

      {/* 16. Custom Styling */}
      <SharedPreviewCard
        title="Custom Styling"
        description="Apply custom styles using className props: className (container), trackClassName (track), thumbClassName (thumb), fillClassName (filled portion), labelClassName (label), tooltipClassName (tooltip)."
        code={`import { Slider } from "andhera-react";

<Slider
  className="my-4"
  trackClassName="bg-purple-900"
  fillClassName="bg-gradient-to-r from-purple-500 to-pink-500"
  thumbClassName="ring-2 ring-purple-500"
  labelClassName="text-purple-400"
  label="Custom Styled"
/>`}
      >
        <div className="w-[350px] mx-auto">
          <Slider
            min={0}
            max={100}
            value={customStyleValue}
            onChange={setCustomStyleValue}
            className="my-4"
            trackClassName="bg-purple-900/50"
            fillClassName="bg-gradient-to-r from-purple-500 to-pink-500"
            thumbClassName="ring-2 ring-purple-400"
            labelClassName="text-purple-400"
            tooltipClassName="bg-purple-800"
            showTooltip
            label="Custom Styled Slider"
          />
        </div>
      </SharedPreviewCard>

      {/* 17. Accessibility Features */}
      <SharedPreviewCard
        title="Accessibility Features"
        description="Full ARIA support with aria-label, aria-labelledby, aria-describedby, and aria-valuetext. Keyboard navigation: Arrow keys for step changes, Home/End for min/max, PageUp/PageDown for 10x step."
        code={`import { Slider } from "andhera-react";

<Slider
  aria-label="Volume control"
  aria-valuetext="60 percent"
  aria-describedby="volume-help"
  value={60}
/>

{/* Keyboard Navigation */}
// Arrow Left/Down: Decrease by step
// Arrow Right/Up: Increase by step
// Home: Jump to minimum
// End: Jump to maximum
// PageUp: Increase by 10x step
// PageDown: Decrease by 10x step`}
      >
        <div className="w-[350px] mx-auto">
          <Slider
            min={0}
            max={100}
            value={accessibilityValue}
            onChange={setAccessibilityValue}
            aria-label="Volume control"
            id="accessible-slider"
            label="Accessible Slider"
            description="Use arrow keys to adjust, Home/End for min/max, PageUp/PageDown for large steps"
            showTooltip
            tooltipFormat={(val) => `${val} percent`}
          />
        </div>
      </SharedPreviewCard>

      {/* Props Reference */}
      <PropsReference />
    </div>
  );
}
