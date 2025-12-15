import { useState } from "react";
import Textarea, { type TextareaOverlayContext } from "../../../src/components/textarea/Textarea";
import { PropertiesTable } from "../components/PropertiesTable";
import { PreviewCard } from "../components/PreviewCard";

// ============================================================================
// Main Preview Component
// ============================================================================

export function TextareaPreview() {
  // State for controlled examples
  const [labelDefaultValue, setLabelDefaultValue] = useState("Default label placement");
  const [labelInnerValue, setLabelInnerValue] = useState("Inner label placement");
  const [labelBorderValue, setLabelBorderValue] = useState("Border label placement");

  const [variantOutlinedValue, setVariantOutlinedValue] = useState("Outlined variant style");
  const [variantFilledValue, setVariantFilledValue] = useState("Filled variant style");

  const [sizeSmValue, setSizeSmValue] = useState("Small size textarea");
  const [sizeMdValue, setSizeMdValue] = useState("Medium size textarea");
  const [sizeLgValue, setSizeLgValue] = useState("Large size textarea");

  const [requiredValue, setRequiredValue] = useState("");
  const [tooltipValue, setTooltipValue] = useState("Hover the info icon to see tooltip");

  const [successValue, setSuccessValue] = useState("This content is approved");
  const [warningValue, setWarningValue] = useState("Please review before proceeding");
  const [errorValue, setErrorValue] = useState("");

  const [characterCountValue, setCharacterCountValue] = useState("Type here to see counter update...");
  const characterLimit = 200;

  const [autoGrowValue, setAutoGrowValue] = useState("Start typing here. As you add more lines, the textarea will grow automatically until it reaches maxRows, then it becomes scrollable.");

  const [readOnlyValue] = useState("This is read-only content. You can select and copy this text, but you cannot modify it. Try clicking inside and selecting text.");

  const [disabledValue] = useState("This textarea is disabled. No interaction possible.");

  const [heightValue, setHeightValue] = useState("Fixed height textarea with scrolling when content exceeds the height.");
  const [rowsValue, setRowsValue] = useState("Textarea with fixed rows count.");

  const [clearableValue, setClearableValue] = useState("Click the Clear button to remove this content.");
  const [clearableBottomValue, setClearableBottomValue] = useState("Clear button positioned at the bottom.");

  const [loadingValue, setLoadingValue] = useState("Processing your request...");
  const [isLoading, setIsLoading] = useState(false);

  const [validationValue, setValidationValue] = useState("Short");
  const validateMinLength = (value: string) => {
    if (value.trim().length < 20) {
      return "Content must be at least 20 characters long.";
    }
    return null;
  };

  const [debounceValue, setDebounceValue] = useState("");
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  const [mentionValue, setMentionValue] = useState("Type @ to see mention suggestions like @design or @ops");
  const mentionOptions = ["ops", "design", "growth", "studio", "billing", "engineering"];
  const renderMentionOverlay = ({ value, selectionStart }: TextareaOverlayContext) => {
    const textBeforeCursor = value.slice(0, selectionStart);
    const match = textBeforeCursor.match(/@(\w*)$/);
    if (!match) return null;
    const query = match[1].toLowerCase();
    const matches = mentionOptions.filter((opt) => opt.startsWith(query));
    if (matches.length === 0) return null;
    return (
      <div className="rounded-xl border border-white/10 bg-[#0C1120] p-3 shadow-lg">
        <p className="text-[10px] uppercase tracking-wider text-white/50 mb-2">Suggestions</p>
        <div className="flex flex-wrap gap-2">
          {matches.map((option) => (
            <span key={option} className="rounded-full bg-white/10 px-2.5 py-1 text-xs text-white/80">
              @{option}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const [resizeNoneValue, setResizeNoneValue] = useState("Cannot resize this textarea");
  const [resizeVerticalValue, setResizeVerticalValue] = useState("Drag bottom edge to resize");
  const [resizeHorizontalValue, setResizeHorizontalValue] = useState("Drag right edge to resize");
  const [resizeBothValue, setResizeBothValue] = useState("Drag any corner to resize");

  const [customRadiusValue, setCustomRadiusValue] = useState("Custom border radius");
  const [customClassValue, setCustomClassValue] = useState("Custom styling with classes");

  const [errorBooleanValue, setErrorBooleanValue] = useState("");
  const [spellCheckValue, setSpellCheckValue] = useState("Teh quikc browm fox jumpz ovr the layz dog");
  const [autoCapitalizeValue, setAutoCapitalizeValue] = useState("");
  const [autoCorrectOffValue, setAutoCorrectOffValue] = useState("Type here - no auto-correct");
  const [autoCorrectOnValue, setAutoCorrectOnValue] = useState("Type here - auto-correct enabled");

  // Advanced customization states
  const [customColorsValue, setCustomColorsValue] = useState("Custom colors and fonts");
  const [customFocusValue, setCustomFocusValue] = useState("Custom focus border color");
  const [customRequiredValue, setCustomRequiredValue] = useState("");

  const handleSimulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  return (
    <div className="flex w-full flex-col gap-12">
      {/* ================================================================== */}
      {/* SECTION: Label Placements */}
      {/* ================================================================== */}
      <PreviewCard
        title="Label Placements"
        description={`Three different label positioning options to match your design needs.

• default: Label stacked above the textarea
• inner: Label floats inside the textarea at the top
• border: Label floats on the border outline`}
        code={`import { useState } from "react";
import { Textarea } from "andhera-react";

export function LabelPlacements() {
  const [defaultVal, setDefaultVal] = useState("");
  const [innerVal, setInnerVal] = useState("");
  const [borderVal, setBorderVal] = useState("");

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Textarea
        label="Default Label"
        labelPlacement="default"
        value={defaultVal}
        onChange={(e) => setDefaultVal(e.target.value)}
        placeholder="Default stacked label"
        supportingText="Label above the field"
        fullWidth
      />
      <Textarea
        label="Inner Label"
        labelPlacement="inner"
        value={innerVal}
        onChange={(e) => setInnerVal(e.target.value)}
        placeholder="Label inside the field"
        supportingText="Label floats at top"
        fullWidth
      />
      <Textarea
        label="Border Label"
        labelPlacement="border"
        value={borderVal}
        onChange={(e) => setBorderVal(e.target.value)}
        placeholder="Label on the border"
        supportingText="Label on outline"
        fullWidth
      />
    </div>
  );
}`}
      >
        <div className="grid w-full gap-6 md:grid-cols-3">
          <Textarea
            label="Default Label"
            labelPlacement="default"
            value={labelDefaultValue}
            onChange={(e) => setLabelDefaultValue(e.target.value)}
            placeholder="Default stacked label"
            supportingText="labelPlacement='default'"
            fullWidth
          />
          <Textarea
            label="Inner Label"
            labelPlacement="inner"
            value={labelInnerValue}
            onChange={(e) => setLabelInnerValue(e.target.value)}
            placeholder="Label inside the field"
            supportingText="labelPlacement='inner'"
            fullWidth
          />
          <Textarea
            label="Border Label"
            labelPlacement="border"
            value={labelBorderValue}
            onChange={(e) => setLabelBorderValue(e.target.value)}
            placeholder="Label on the border"
            supportingText="labelPlacement='border'"
            fullWidth
          />
        </div>
      </PreviewCard>

      {/* ================================================================== */}
      {/* SECTION: Variants */}
      {/* ================================================================== */}
      <PreviewCard
        title="Variants"
        description={`Two visual style variants for different design contexts.

• outlined: Clean border with transparent background
• filled: Solid background with subtle shadow`}
        code={`import { useState } from "react";
import { Textarea } from "andhera-react";

export function Variants() {
  const [outlined, setOutlined] = useState("");
  const [filled, setFilled] = useState("");

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Textarea
        label="Outlined"
        variant="outlined"
        value={outlined}
        onChange={(e) => setOutlined(e.target.value)}
        placeholder="Default outlined style"
        supportingText="Clean border appearance"
        fullWidth
      />
      <Textarea
        label="Filled"
        variant="filled"
        value={filled}
        onChange={(e) => setFilled(e.target.value)}
        placeholder="Filled background style"
        supportingText="Solid background with shadow"
        fullWidth
      />
    </div>
  );
}`}
      >
        <div className="grid w-full gap-6 md:grid-cols-2">
          <Textarea
            label="Outlined"
            variant="outlined"
            value={variantOutlinedValue}
            onChange={(e) => setVariantOutlinedValue(e.target.value)}
            placeholder="Default outlined style"
            supportingText="variant='outlined'"
            fullWidth
          />
          <Textarea
            label="Filled"
            variant="filled"
            value={variantFilledValue}
            onChange={(e) => setVariantFilledValue(e.target.value)}
            placeholder="Filled background style"
            supportingText="variant='filled'"
            fullWidth
          />
        </div>
      </PreviewCard>

      {/* ================================================================== */}
      {/* SECTION: Sizes */}
      {/* ================================================================== */}
      <PreviewCard
        title="Sizes"
        description={`Three size options with different padding and minimum heights.

• sm: Compact 96px min-height, smaller text
• md: Default 128px min-height
• lg: Spacious 168px min-height, larger text`}
        code={`import { useState } from "react";
import { Textarea } from "andhera-react";

export function Sizes() {
  const [sm, setSm] = useState("");
  const [md, setMd] = useState("");
  const [lg, setLg] = useState("");

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Textarea
        label="Small"
        size="sm"
        value={sm}
        onChange={(e) => setSm(e.target.value)}
        placeholder="Compact textarea"
        supportingText="96px min-height"
        fullWidth
      />
      <Textarea
        label="Medium"
        size="md"
        value={md}
        onChange={(e) => setMd(e.target.value)}
        placeholder="Default size"
        supportingText="128px min-height"
        fullWidth
      />
      <Textarea
        label="Large"
        size="lg"
        value={lg}
        onChange={(e) => setLg(e.target.value)}
        placeholder="Spacious textarea"
        supportingText="168px min-height"
        fullWidth
      />
    </div>
  );
}`}
      >
        <div className="grid w-full gap-6 md:grid-cols-3">
          <Textarea
            label="Small"
            size="sm"
            value={sizeSmValue}
            onChange={(e) => setSizeSmValue(e.target.value)}
            placeholder="Compact textarea"
            supportingText="size='sm'"
            fullWidth
          />
          <Textarea
            label="Medium"
            size="md"
            value={sizeMdValue}
            onChange={(e) => setSizeMdValue(e.target.value)}
            placeholder="Default size"
            supportingText="size='md' (default)"
            fullWidth
          />
          <Textarea
            label="Large"
            size="lg"
            value={sizeLgValue}
            onChange={(e) => setSizeLgValue(e.target.value)}
            placeholder="Spacious textarea"
            supportingText="size='lg'"
            fullWidth
          />
        </div>
      </PreviewCard>

      {/* ================================================================== */}
      {/* SECTION: Required & Tooltips */}
      {/* ================================================================== */}
      <PreviewCard
        title="Required Fields & Tooltips"
        description={`Mark required fields with asterisk and add helpful tooltips.

• required: Shows red asterisk next to label
• labelTooltip: Adds info icon with hover tooltip
• labelSecondary: Secondary text next to label`}
        code={`import { useState } from "react";
import { Textarea } from "andhera-react";

export function RequiredAndTooltips() {
  const [required, setRequired] = useState("");
  const [tooltip, setTooltip] = useState("");

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Textarea
        label="Required Field"
        required
        value={required}
        onChange={(e) => setRequired(e.target.value)}
        placeholder="This field is required"
        supportingText="Red asterisk indicates required"
        fullWidth
      />
      <Textarea
        label="With Tooltip"
        labelSecondary="Optional"
        labelTooltip="Provide additional context or instructions here"
        value={tooltip}
        onChange={(e) => setTooltip(e.target.value)}
        placeholder="Hover the info icon"
        supportingText="Info icon shows tooltip on hover"
        fullWidth
      />
    </div>
  );
}`}
      >
        <div className="grid w-full gap-6 md:grid-cols-2">
          <Textarea
            label="Required Field"
            required
            value={requiredValue}
            onChange={(e) => setRequiredValue(e.target.value)}
            placeholder="This field is required"
            supportingText="required={true}"
            fullWidth
          />
          <Textarea
            label="With Tooltip"
            labelSecondary="Optional"
            labelTooltip="Provide additional context or instructions here"
            value={tooltipValue}
            onChange={(e) => setTooltipValue(e.target.value)}
            placeholder="Hover the info icon"
            supportingText="labelTooltip + labelSecondary"
            fullWidth
          />
        </div>
      </PreviewCard>

      {/* ================================================================== */}
      {/* SECTION: Status States */}
      {/* ================================================================== */}
      <PreviewCard
        title="Status States"
        description={`Visual feedback states with colored borders and helper text.

• success: Green border for valid/approved content
• warning: Orange border for cautionary states
• error: Red border with error message display`}
        code={`import { useState } from "react";
import { Textarea } from "andhera-react";

export function StatusStates() {
  const [success, setSuccess] = useState("Content approved");
  const [warning, setWarning] = useState("Review needed");
  const [error, setError] = useState("");

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Textarea
        label="Success"
        status="success"
        value={success}
        onChange={(e) => setSuccess(e.target.value)}
        supportingText="All checks passed"
        fullWidth
      />
      <Textarea
        label="Warning"
        status="warning"
        value={warning}
        onChange={(e) => setWarning(e.target.value)}
        supportingText="Please review before proceeding"
        fullWidth
      />
      <Textarea
        label="Error"
        status="error"
        value={error}
        onChange={(e) => setError(e.target.value)}
        placeholder="Fix the issues"
        errorMessage="This field contains errors"
        fullWidth
      />
    </div>
  );
}`}
      >
        <div className="grid w-full gap-6 md:grid-cols-3">
          <Textarea
            label="Success"
            status="success"
            value={successValue}
            onChange={(e) => setSuccessValue(e.target.value)}
            supportingText="status='success'"
            fullWidth
          />
          <Textarea
            label="Warning"
            status="warning"
            value={warningValue}
            onChange={(e) => setWarningValue(e.target.value)}
            supportingText="status='warning'"
            fullWidth
          />
          <Textarea
            label="Error"
            status="error"
            value={errorValue}
            onChange={(e) => setErrorValue(e.target.value)}
            placeholder="Fix the issues"
            errorMessage="This field is required and contains errors"
            fullWidth
          />
        </div>
      </PreviewCard>

      {/* ================================================================== */}
      {/* SECTION: Character Count */}
      {/* ================================================================== */}
      <PreviewCard
        title="Character Count"
        description={`Display character counter with optional max length enforcement.

• maxLength: Maximum characters allowed
• showCharacterCount: Display current/max counter`}
        code={`import { useState } from "react";
import { Textarea } from "andhera-react";

export function CharacterCount() {
  const [value, setValue] = useState("");
  const limit = 200;

  return (
    <Textarea
      label="Limited Input"
      value={value}
      onChange={(e) => setValue(e.target.value.slice(0, limit))}
      maxLength={limit}
      showCharacterCount
      placeholder="Type to see character counter..."
      supportingText="Counter turns red when limit reached"
      fullWidth
    />
  );
}`}
      >
        <div className="w-full max-w-xl mx-auto">
          <Textarea
            label="Limited Input"
            value={characterCountValue}
            onChange={(e) => setCharacterCountValue(e.target.value.slice(0, characterLimit))}
            maxLength={characterLimit}
            showCharacterCount
            placeholder="Type to see character counter..."
            supportingText="maxLength={200} + showCharacterCount"
            fullWidth
          />
        </div>
      </PreviewCard>

      {/* ================================================================== */}
      {/* SECTION: Auto Grow */}
      {/* ================================================================== */}
      <PreviewCard
        title="Auto Grow"
        description={`Textarea automatically expands with content up to maxRows, then scrolls.

• autoGrow: Enable auto-expansion
• minRows: Minimum visible rows
• maxRows: Maximum rows before scrolling`}
        code={`import { useState } from "react";
import { Textarea } from "andhera-react";

export function AutoGrow() {
  const [value, setValue] = useState("");

  return (
    <Textarea
      label="Auto-expanding"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      autoGrow
      minRows={2}
      maxRows={6}
      resize="none"
      placeholder="Start typing to see it grow..."
      supportingText="Grows from 2 to 6 rows, then scrolls"
      fullWidth
    />
  );
}`}
      >
        <div className="w-full max-w-xl mx-auto">
          <Textarea
            label="Auto-expanding"
            value={autoGrowValue}
            onChange={(e) => setAutoGrowValue(e.target.value)}
            autoGrow
            minRows={2}
            maxRows={6}
            resize="none"
            placeholder="Start typing to see it grow..."
            supportingText="autoGrow + minRows={2} + maxRows={6}"
            fullWidth
          />
        </div>
      </PreviewCard>

      {/* ================================================================== */}
      {/* SECTION: Read Only */}
      {/* ================================================================== */}
      <PreviewCard
        title="Read Only"
        description={`Allow users to view and copy content without editing.

• readOnly: Users can focus, select, and copy but cannot edit
• Caret is hidden in read-only mode`}
        code={`import { Textarea } from "andhera-react";

export function ReadOnly() {
  return (
    <Textarea
      label="Read Only Content"
      defaultValue="This content is read-only. You can click inside, select text with your mouse or keyboard, and copy it to clipboard. However, you cannot modify or delete any content."
      readOnly
      supportingText="Try selecting and copying this text"
      fullWidth
    />
  );
}`}
      >
        <div className="w-full max-w-xl mx-auto">
          <Textarea
            label="Read Only Content"
            value={readOnlyValue}
            readOnly
            supportingText="readOnly={true} - Select and copy, but can't edit"
            fullWidth
          />
        </div>
      </PreviewCard>

      {/* ================================================================== */}
      {/* SECTION: Disabled */}
      {/* ================================================================== */}
      <PreviewCard
        title="Disabled"
        description={`Completely disable all interactions with the textarea.

• disabled: No focus, selection, or interaction allowed
• Visual styling indicates disabled state`}
        code={`import { Textarea } from "andhera-react";

export function Disabled() {
  return (
    <Textarea
      label="Disabled Field"
      defaultValue="This textarea is completely disabled"
      disabled
      supportingText="No interaction possible"
      fullWidth
    />
  );
}`}
      >
        <div className="w-full max-w-xl mx-auto">
          <Textarea
            label="Disabled Field"
            value={disabledValue}
            disabled
            supportingText="disabled={true} - No interaction possible"
            fullWidth
          />
        </div>
      </PreviewCard>

      {/* ================================================================== */}
      {/* SECTION: Fixed Height & Rows */}
      {/* ================================================================== */}
      <PreviewCard
        title="Fixed Height & Rows"
        description={`Set explicit dimensions for the textarea.

• height: Fixed pixel or CSS height value
• rows: Number of visible text rows
• minHeight/maxHeight: Height constraints`}
        code={`import { useState } from "react";
import { Textarea } from "andhera-react";

export function FixedDimensions() {
  const [heightVal, setHeightVal] = useState("");
  const [rowsVal, setRowsVal] = useState("");

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Textarea
        label="Fixed Height (180px)"
        height={180}
        resize="none"
        value={heightVal}
        onChange={(e) => setHeightVal(e.target.value)}
        placeholder="Fixed 180px height"
        supportingText="Scrolls when content exceeds"
        fullWidth
      />
      <Textarea
        label="Fixed Rows (5)"
        rows={5}
        resize="none"
        value={rowsVal}
        onChange={(e) => setRowsVal(e.target.value)}
        placeholder="Exactly 5 rows visible"
        supportingText="Native rows attribute"
        fullWidth
      />
    </div>
  );
}`}
      >
        <div className="grid w-full gap-6 md:grid-cols-2">
          <Textarea
            label="Fixed Height (180px)"
            height={180}
            resize="none"
            value={heightValue}
            onChange={(e) => setHeightValue(e.target.value)}
            placeholder="Fixed 180px height"
            supportingText="height={180}"
            fullWidth
          />
          <Textarea
            label="Fixed Rows (5)"
            rows={5}
            resize="none"
            value={rowsValue}
            onChange={(e) => setRowsValue(e.target.value)}
            placeholder="Exactly 5 rows visible"
            supportingText="rows={5}"
            fullWidth
          />
        </div>
      </PreviewCard>

      {/* ================================================================== */}
      {/* SECTION: Clear Button */}
      {/* ================================================================== */}
      <PreviewCard
        title="Clear Button"
        description={`Add a clear button to quickly empty the textarea.

• showClearButton: Show/hide clear button
• clearButtonPosition: 'top-right' or 'bottom-right'
• onClear: Callback when cleared`}
        code={`import { useState } from "react";
import { Textarea } from "andhera-react";

export function ClearButton() {
  const [topValue, setTopValue] = useState("Clear me!");
  const [bottomValue, setBottomValue] = useState("Clear me!");

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Textarea
        label="Clear Button (Top)"
        value={topValue}
        onChange={(e) => setTopValue(e.target.value)}
        showClearButton
        clearButtonPosition="top-right"
        onClear={() => setTopValue("")}
        supportingText="Button on label line"
        fullWidth
      />
      <Textarea
        label="Clear Button (Bottom)"
        value={bottomValue}
        onChange={(e) => setBottomValue(e.target.value)}
        showClearButton
        clearButtonPosition="bottom-right"
        onClear={() => setBottomValue("")}
        supportingText="Button below textarea"
        fullWidth
      />
    </div>
  );
}`}
      >
        <div className="grid w-full gap-6 md:grid-cols-2">
          <Textarea
            label="Clear Button (Top)"
            value={clearableValue}
            onChange={(e) => setClearableValue(e.target.value)}
            showClearButton
            clearButtonPosition="top-right"
            onClear={() => setClearableValue("")}
            supportingText="clearButtonPosition='top-right'"
            fullWidth
          />
          <Textarea
            label="Clear Button (Bottom)"
            value={clearableBottomValue}
            onChange={(e) => setClearableBottomValue(e.target.value)}
            showClearButton
            clearButtonPosition="bottom-right"
            onClear={() => setClearableBottomValue("")}
            supportingText="clearButtonPosition='bottom-right'"
            fullWidth
          />
        </div>
      </PreviewCard>

      {/* ================================================================== */}
      {/* SECTION: Loading State */}
      {/* ================================================================== */}
      <PreviewCard
        title="Loading State"
        description={`Show loading spinner overlay during async operations.

• loading: Display centered spinner overlay
• Textarea is disabled while loading`}
        code={`import { useState } from "react";
import { Textarea } from "andhera-react";

export function LoadingState() {
  const [value, setValue] = useState("Processing...");
  const [isLoading, setIsLoading] = useState(false);

  const simulate = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  return (
    <div className="flex flex-col gap-4">
      <Textarea
        label="Async Operation"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        loading={isLoading}
        supportingText={isLoading ? "Loading..." : "Ready"}
        fullWidth
      />
      <button onClick={simulate} disabled={isLoading}>
        {isLoading ? "Loading..." : "Simulate (3s)"}
      </button>
    </div>
  );
}`}
      >
        <div className="w-full max-w-xl mx-auto flex flex-col gap-4">
          <Textarea
            label="Async Operation"
            value={loadingValue}
            onChange={(e) => setLoadingValue(e.target.value)}
            loading={isLoading}
            supportingText={isLoading ? "loading={true}" : "Click button to simulate loading"}
            fullWidth
          />
          <button
            type="button"
            onClick={handleSimulateLoading}
            disabled={isLoading}
            className="self-start px-4 py-2 text-sm font-semibold rounded-lg border border-[#FFCB00]/30 bg-[#FFCB00]/10 text-[#FFCB00] hover:bg-[#FFCB00]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? "Loading..." : "Simulate Loading (3s)"}
          </button>
        </div>
      </PreviewCard>

      {/* ================================================================== */}
      {/* SECTION: Validation */}
      {/* ================================================================== */}
      <PreviewCard
        title="Real-time Validation"
        description={`Add custom validation that runs on change or blur.

• validate: Function returning error message or null
• validationMode: 'change' (real-time) or 'blur'
• onValidationChange: Callback when validation state changes`}
        code={`import { useState } from "react";
import { Textarea } from "andhera-react";

export function Validation() {
  const [value, setValue] = useState("Short");

  const validate = (val: string) => {
    if (val.trim().length < 20) {
      return "Content must be at least 20 characters.";
    }
    return null;
  };

  return (
    <Textarea
      label="Validated Input"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      validate={validate}
      validationMode="change"
      placeholder="Type at least 20 characters..."
      supportingText="Real-time validation on every keystroke"
      fullWidth
    />
  );
}`}
      >
        <div className="w-full max-w-xl mx-auto">
          <Textarea
            label="Validated Input"
            value={validationValue}
            onChange={(e) => setValidationValue(e.target.value)}
            validate={validateMinLength}
            validationMode="change"
            placeholder="Type at least 20 characters..."
            supportingText="validate + validationMode='change'"
            fullWidth
          />
        </div>
      </PreviewCard>

      {/* ================================================================== */}
      {/* SECTION: Debounced Autosave */}
      {/* ================================================================== */}
      <PreviewCard
        title="Debounced Autosave"
        description={`Trigger callbacks after user stops typing.

• onDebouncedChange: Fires after delay when typing stops
• debounceDelay: Delay in milliseconds (default 320ms)`}
        code={`import { useState } from "react";
import { Textarea } from "andhera-react";

export function DebouncedAutosave() {
  const [value, setValue] = useState("");
  const [saved, setSaved] = useState<string | null>(null);

  const handleAutosave = (text: string) => {
    setSaved(new Date().toLocaleTimeString());
    console.log("Autosaved:", text);
  };

  return (
    <Textarea
      label="Autosave Notes"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onDebouncedChange={handleAutosave}
      debounceDelay={500}
      placeholder="Type something..."
      supportingText={saved ? \`Last saved: \${saved}\` : "Autosaves 500ms after you stop typing"}
      fullWidth
    />
  );
}`}
      >
        <div className="w-full max-w-xl mx-auto">
          <Textarea
            label="Autosave Notes"
            value={debounceValue}
            onChange={(e) => setDebounceValue(e.target.value)}
            onDebouncedChange={() => setLastSaved(new Date().toLocaleTimeString())}
            debounceDelay={500}
            placeholder="Type something..."
            supportingText={lastSaved ? `✓ Last saved: ${lastSaved}` : "Saves 500ms after you stop typing"}
            fullWidth
          />
        </div>
      </PreviewCard>

      {/* ================================================================== */}
      {/* SECTION: Custom Overlay */}
      {/* ================================================================== */}
      <PreviewCard
        title="Custom Overlay (Mentions)"
        description={`Render custom overlays based on content and cursor position.

• renderOverlay: Function receiving context with value, cursor position
• onCaretChange: Track cursor position changes
• Great for autocomplete, mentions, hashtags`}
        code={`import { useState } from "react";
import { Textarea, type TextareaOverlayContext } from "andhera-react";

const teams = ["ops", "design", "growth", "studio", "billing"];

export function MentionOverlay() {
  const [value, setValue] = useState("");

  const renderOverlay = ({ value, selectionStart }: TextareaOverlayContext) => {
    const before = value.slice(0, selectionStart);
    const match = before.match(/@(\\w*)$/);
    if (!match) return null;

    const query = match[1].toLowerCase();
    const matches = teams.filter((t) => t.startsWith(query));
    if (!matches.length) return null;

    return (
      <div className="bg-slate-900 border border-white/10 rounded-lg p-2">
        <div className="text-xs text-white/50 mb-1">Suggestions</div>
        <div className="flex gap-1 flex-wrap">
          {matches.map((t) => (
            <span key={t} className="bg-white/10 px-2 py-0.5 rounded text-xs">
              @{t}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Textarea
      label="Team Mentions"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      renderOverlay={renderOverlay}
      placeholder="Type @ to see suggestions..."
      supportingText="Try: @ops, @design, @growth"
      fullWidth
    />
  );
}`}
      >
        <div className="w-full max-w-xl mx-auto">
          <Textarea
            label="Team Mentions"
            value={mentionValue}
            onChange={(e) => setMentionValue(e.target.value)}
            renderOverlay={renderMentionOverlay}
            placeholder="Type @ to see suggestions..."
            supportingText="Type @ followed by: ops, design, growth, studio, billing, engineering"
            fullWidth
          />
        </div>
      </PreviewCard>

      {/* ================================================================== */}
      {/* SECTION: Resize Behavior */}
      {/* ================================================================== */}
      <PreviewCard
        title="Resize Behavior"
        description={`Control how users can manually resize the textarea.

• none: Cannot resize
• vertical: Resize height only (default)
• horizontal: Resize width only (don't use fullWidth)
• both: Resize in any direction (don't use fullWidth)

Note: For horizontal/both resize, the component uses inline-flex layout to allow the textarea to expand.`}
        code={`import { useState } from "react";
import { Textarea } from "andhera-react";

export function ResizeBehavior() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Textarea label="No Resize" resize="none" placeholder="Cannot resize" fullWidth />
      <Textarea label="Vertical" resize="vertical" placeholder="Drag bottom edge" fullWidth />
      {/* Horizontal/both resize work best without fullWidth */}
      <Textarea label="Horizontal" resize="horizontal" placeholder="Drag right edge" />
      <Textarea label="Both" resize="both" placeholder="Drag any corner" />
    </div>
  );
}`}
      >
        <div className="grid w-full gap-6 md:grid-cols-2">
          <Textarea
            label="No Resize"
            resize="none"
            value={resizeNoneValue}
            onChange={(e) => setResizeNoneValue(e.target.value)}
            supportingText="resize='none'"
            fullWidth
          />
          <Textarea
            label="Vertical"
            resize="vertical"
            value={resizeVerticalValue}
            onChange={(e) => setResizeVerticalValue(e.target.value)}
            supportingText="resize='vertical' (default)"
            fullWidth
          />
          <Textarea
            label="Horizontal"
            resize="horizontal"
            value={resizeHorizontalValue}
            onChange={(e) => setResizeHorizontalValue(e.target.value)}
            supportingText="Drag right edge to resize width"
          />
          <Textarea
            label="Both"
            resize="both"
            value={resizeBothValue}
            onChange={(e) => setResizeBothValue(e.target.value)}
            supportingText="Drag corner to resize both ways"
          />
        </div>
      </PreviewCard>

      {/* ================================================================== */}
      {/* SECTION: Error Boolean */}
      {/* ================================================================== */}
      <PreviewCard
        title="Error Boolean"
        description={`Simple boolean error state as alternative to status prop.

• error: Boolean to show error styling
• errorMessage: Text shown when in error state`}
        code={`import { useState } from "react";
import { Textarea } from "andhera-react";

export function ErrorBoolean() {
  const [value, setValue] = useState("");
  const hasError = value.trim().length === 0;

  return (
    <Textarea
      label="Required Field"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      error={hasError}
      errorMessage={hasError ? "This field cannot be empty" : undefined}
      placeholder="Enter some text..."
      fullWidth
    />
  );
}`}
      >
        <div className="w-full max-w-xl mx-auto">
          <Textarea
            label="Required Field"
            value={errorBooleanValue}
            onChange={(e) => setErrorBooleanValue(e.target.value)}
            error={errorBooleanValue.trim().length === 0}
            errorMessage={errorBooleanValue.trim().length === 0 ? "This field cannot be empty" : undefined}
            placeholder="Enter some text to clear error..."
            fullWidth
          />
        </div>
      </PreviewCard>

      {/* ================================================================== */}
      {/* SECTION: Text Input Options */}
      {/* ================================================================== */}
      <PreviewCard
        title="Text Input Options"
        description={`Control browser text input behaviors.

• spellCheckEnabled: Enable/disable spell check underlines (works on all browsers)
• autoCorrectMode: Auto-correction on mobile keyboards (iOS/Android only)
• autoCapitalizeMode: Auto-capitalization on mobile keyboards (iOS/Android only)

Note: autoCorrect and autoCapitalize only work on mobile/touch devices. Desktop browsers ignore these attributes.`}
        code={`import { Textarea } from "andhera-react";

export function TextOptions() {
  return (
    <div className="grid gap-6">
      {/* spellCheckEnabled works on all browsers */}
      <Textarea
        label="Spell Check Disabled"
        spellCheckEnabled={false}
        defaultValue="Teh quikc browm fox"
        supportingText="No red underlines for misspellings"
        fullWidth
      />
      <Textarea
        label="Auto-capitalize Words"
        autoCapitalizeMode="words"
        placeholder="each word will capitalize"
        supportingText="Works on mobile keyboards"
        fullWidth
      />
      <Textarea
        label="Auto-correct On"
        autoCorrectMode="on"
        placeholder="Browser will auto-correct"
        supportingText="Enables browser auto-correct"
        fullWidth
      />
      <Textarea
        label="Auto-correct Off"
        autoCorrectMode="off"
        placeholder="No auto-correction"
        supportingText="Disables browser auto-correct"
        fullWidth
      />
    </div>
  );
}`}
      >
        <div className="grid w-full gap-6 md:grid-cols-2">
          <Textarea
            label="Spell Check Disabled"
            spellCheckEnabled={false}
            value={spellCheckValue}
            onChange={(e) => setSpellCheckValue(e.target.value)}
            supportingText="spellCheckEnabled={false}"
            fullWidth
          />
          <Textarea
            label="Auto-capitalize Words"
            autoCapitalizeMode="words"
            value={autoCapitalizeValue}
            onChange={(e) => setAutoCapitalizeValue(e.target.value)}
            placeholder="each word will capitalize"
            supportingText="Mobile only - capitalizes each word"
            fullWidth
          />
          <Textarea
            label="Auto-correct On"
            autoCorrectMode="on"
            value={autoCorrectOnValue}
            onChange={(e) => setAutoCorrectOnValue(e.target.value)}
            placeholder="Browser will auto-correct"
            supportingText="Mobile only - enables auto-correct"
            fullWidth
          />
          <Textarea
            label="Auto-correct Off"
            autoCorrectMode="off"
            value={autoCorrectOffValue}
            onChange={(e) => setAutoCorrectOffValue(e.target.value)}
            placeholder="No auto-correction"
            supportingText="Mobile only - disables auto-correct"
            fullWidth
          />
        </div>
      </PreviewCard>

      {/* ================================================================== */}
      {/* SECTION: Custom Styling */}
      {/* ================================================================== */}
      <PreviewCard
        title="Custom Styling"
        description={`Customize appearance with props and CSS classes.

• borderRadius: Custom border radius value
• containerClassName: Class for outer wrapper
• textareaClassName: Class for textarea element
• labelClassName: Class for label element`}
        code={`import { Textarea } from "andhera-react";

export function CustomStyling() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Textarea
        label="Sharp Corners"
        borderRadius="0px"
        placeholder="No border radius"
        supportingText="borderRadius='0px'"
        fullWidth
      />
      <Textarea
        label="Extra Rounded"
        borderRadius="24px"
        placeholder="Large radius"
        supportingText="borderRadius='24px'"
        fullWidth
      />
      <Textarea
        label="Styled Text"
        textareaClassName="italic font-semibold"
        defaultValue="Italic and bold text"
        supportingText="textareaClassName='italic font-semibold'"
        fullWidth
      />
    </div>
  );
}`}
      >
        <div className="grid w-full gap-6 md:grid-cols-2">
          <Textarea
            label="Sharp Corners"
            borderRadius="0px"
            value={customRadiusValue}
            onChange={(e) => setCustomRadiusValue(e.target.value)}
            supportingText="borderRadius='0px'"
            fullWidth
          />
          <Textarea
            label="Extra Rounded"
            borderRadius="24px"
            placeholder="Large radius"
            supportingText="borderRadius='24px'"
            fullWidth
          />
          <Textarea
            label="Styled Text"
            textareaClassName="italic font-semibold"
            value={customClassValue}
            onChange={(e) => setCustomClassValue(e.target.value)}
            supportingText="textareaClassName='italic font-semibold'"
            fullWidth
          />
        </div>
      </PreviewCard>

      {/* ================================================================== */}
      {/* SECTION: Advanced Customization */}
      {/* ================================================================== */}
      <PreviewCard
        title="Advanced Customization"
        description={`Full control over colors, fonts, and visual elements.

• focusBorderColor: Custom focus border color (hex or Tailwind)
• caretColor: Custom cursor/caret color
• fontFamily: Custom font family
• backgroundColor: Custom background color
• textColor: Custom text color
• placeholderColor: Custom placeholder color
• requiredIndicator: Custom required indicator element
• loadingText/loadingClassName: Customize loading overlay
• clearButtonText: Custom clear button text`}
        code={`import { useState } from "react";
import { Textarea } from "andhera-react";

export function AdvancedCustomization() {
  const [value, setValue] = useState("");

  return (
    <div className="grid gap-6">
      {/* Custom Colors */}
      <Textarea
        label="Custom Theme Colors"
        backgroundColor="#1a1a2e"
        textColor="#eef"
        focusBorderColor="#e94560"
        caretColor="#e94560"
        placeholderColor="#666"
        placeholder="Dark theme with pink accents"
        fullWidth
      />
      
      {/* Custom Font */}
      <Textarea
        label="Custom Font Family"
        fontFamily="Georgia, serif"
        placeholder="Using Georgia serif font"
        fullWidth
      />

      {/* Custom Required Indicator */}
      <Textarea
        label="Custom Indicator"
        required
        requiredIndicator={<span className="text-yellow-400 ml-1">★</span>}
        placeholder="Custom star indicator"
        fullWidth
      />

      {/* Custom Loading */}
      <Textarea
        label="Custom Loading"
        loading
        loadingText="Please wait..."
        loadingClassName="bg-purple-900/80"
        fullWidth
      />
    </div>
  );
}`}
      >
        <div className="grid w-full gap-6 md:grid-cols-2">
          <Textarea
            label="Custom Theme Colors"
            backgroundColor="#1a1a2e"
            textColor="#eef"
            focusBorderColor="#e94560"
            caretColor="#e94560"
            value={customColorsValue}
            onChange={(e) => setCustomColorsValue(e.target.value)}
            placeholder="Dark theme with pink accents"
            supportingText="Custom bg, text, focus, caret colors"
            fullWidth
          />
          <Textarea
            label="Custom Focus Color"
            focusBorderColor="#10b981"
            caretColor="#10b981"
            value={customFocusValue}
            onChange={(e) => setCustomFocusValue(e.target.value)}
            placeholder="Green focus border"
            supportingText="focusBorderColor='#10b981'"
            fullWidth
          />
          <Textarea
            label="Custom Font Family"
            fontFamily="Georgia, serif"
            placeholder="Using Georgia serif font"
            supportingText="fontFamily='Georgia, serif'"
            fullWidth
          />
          <Textarea
            label="Custom Required"
            required
            requiredIndicator={<span className="text-yellow-400 ml-1">★</span>}
            value={customRequiredValue}
            onChange={(e) => setCustomRequiredValue(e.target.value)}
            placeholder="Custom star indicator"
            supportingText="requiredIndicator={<span>★</span>}"
            fullWidth
          />
        </div>
      </PreviewCard>

      {/* ================================================================== */}
      {/* PROPERTIES TABLE */}
      {/* ================================================================== */}
      <PropertiesTable
        properties={[
          // Label props
          { name: "label", type: "string", description: "Label text displayed above or inside the textarea" },
          { name: "labelPlacement", type: "'default' | 'inner' | 'border'", defaultValue: "'default'", description: "Position of the label" },
          { name: "labelSecondary", type: "string", description: "Secondary text next to label (e.g., 'Optional')" },
          { name: "labelTooltip", type: "ReactNode", description: "Tooltip content shown on info icon hover" },
          { name: "labelClassName", type: "string", description: "Custom CSS classes for the label" },
          // Value props
          { name: "placeholder", type: "string", description: "Placeholder text when empty" },
          { name: "value", type: "string", description: "Controlled value" },
          { name: "defaultValue", type: "string", description: "Uncontrolled default value" },
          { name: "onChange", type: "(e: ChangeEvent) => void", description: "Called when value changes" },
          // Appearance props
          { name: "variant", type: "'outlined' | 'filled'", defaultValue: "'outlined'", description: "Visual style variant" },
          { name: "size", type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: "Size preset with different heights/padding" },
          { name: "fullWidth", type: "boolean", defaultValue: "false", description: "Take full container width" },
          { name: "borderRadius", type: "string", description: "Custom border radius value" },
          // State props
          { name: "required", type: "boolean", defaultValue: "false", description: "Show required asterisk on label" },
          { name: "requiredIndicator", type: "ReactNode", description: "Custom required indicator element" },
          { name: "hideRequiredIndicator", type: "boolean", defaultValue: "false", description: "Hide the required asterisk" },
          { name: "disabled", type: "boolean", defaultValue: "false", description: "Disable all interactions" },
          { name: "readOnly", type: "boolean", defaultValue: "false", description: "Allow viewing/copying but not editing" },
          { name: "autoFocus", type: "boolean", defaultValue: "false", description: "Focus textarea on mount" },
          // Status props
          { name: "status", type: "'default' | 'success' | 'warning' | 'error'", description: "Visual status state" },
          { name: "error", type: "boolean", defaultValue: "false", description: "Boolean error state (alternative to status)" },
          { name: "errorMessage", type: "string", description: "Error message shown when in error state" },
          { name: "supportingText", type: "string", description: "Helper text below textarea" },
          { name: "supportingTextClassName", type: "string", description: "Custom CSS classes for supporting text" },
          // Character count props
          { name: "maxLength", type: "number", description: "Maximum character limit" },
          { name: "showCharacterCount", type: "boolean", defaultValue: "false", description: "Show character counter" },
          { name: "characterCountClassName", type: "string", description: "Custom CSS classes for character counter" },
          // Size/dimension props
          { name: "autoGrow", type: "boolean", defaultValue: "false", description: "Auto-expand height with content" },
          { name: "minRows", type: "number", description: "Minimum rows for auto-grow" },
          { name: "maxRows", type: "number", description: "Maximum rows before scrolling" },
          { name: "rows", type: "number", description: "Fixed number of visible rows" },
          { name: "height", type: "number | string", description: "Fixed height value" },
          { name: "minHeight", type: "number | string", description: "Minimum height constraint" },
          { name: "maxHeight", type: "number | string", description: "Maximum height with scroll" },
          { name: "resize", type: "'none' | 'vertical' | 'horizontal' | 'both'", defaultValue: "'vertical'", description: "Resize behavior" },
          // Loading props
          { name: "loading", type: "boolean", defaultValue: "false", description: "Show loading spinner overlay" },
          { name: "loadingText", type: "string", defaultValue: "'Loading...'", description: "Custom loading overlay text" },
          { name: "loadingClassName", type: "string", description: "Custom CSS classes for loading overlay" },
          // Clear button props
          { name: "showClearButton", type: "boolean", defaultValue: "false", description: "Show clear button" },
          { name: "clearButtonPosition", type: "'top-right' | 'bottom-right'", defaultValue: "'top-right'", description: "Position of clear button" },
          { name: "clearButtonText", type: "string", defaultValue: "'Clear'", description: "Custom clear button text" },
          { name: "onClear", type: "() => void", description: "Called when clear button clicked" },
          { name: "clearButtonAriaLabel", type: "string", defaultValue: "'Clear text'", description: "Accessibility label for clear button" },
          // Validation props
          { name: "validate", type: "(value: string) => string | null", description: "Validation function returning error message" },
          { name: "validationMode", type: "'change' | 'blur'", defaultValue: "'change'", description: "When to run validation" },
          { name: "onValidationChange", type: "(message: string | null) => void", description: "Called when validation state changes" },
          // Debounce props
          { name: "onDebouncedChange", type: "(value: string) => void", description: "Called after debounce delay" },
          { name: "debounceDelay", type: "number", defaultValue: "320", description: "Debounce delay in milliseconds" },
          // Overlay props
          { name: "renderOverlay", type: "(context: TextareaOverlayContext) => ReactNode", description: "Render custom overlay" },
          { name: "overlayClassName", type: "string", description: "Custom CSS classes for overlay container" },
          { name: "onCaretChange", type: "(context: TextareaOverlayContext) => void", description: "Called when cursor position changes" },
          // Text input behavior props
          { name: "spellCheckEnabled", type: "boolean", defaultValue: "true", description: "Enable browser spell check" },
          { name: "autoCorrectMode", type: "'on' | 'off'", description: "Auto-correct behavior (mobile only)" },
          { name: "autoCapitalizeMode", type: "'none' | 'sentences' | 'words' | 'characters'", description: "Auto-capitalize behavior (mobile only)" },
          // Custom styling props
          { name: "focusBorderColor", type: "string", description: "Custom focus border color (hex or Tailwind class)" },
          { name: "caretColor", type: "string", defaultValue: "'#FFCB00'", description: "Custom cursor/caret color" },
          { name: "fontFamily", type: "string", defaultValue: "'Inter, ...'", description: "Custom font family for all text" },
          { name: "backgroundColor", type: "string", description: "Custom background color for textarea" },
          { name: "textColor", type: "string", description: "Custom text color" },
          { name: "placeholderColor", type: "string", description: "Custom placeholder text color" },
          // Class name props
          { name: "containerClassName", type: "string", description: "Custom CSS classes for outer container" },
          { name: "textareaClassName", type: "string", description: "Custom CSS classes for textarea element" },
          { name: "className", type: "string", description: "Custom CSS classes for inner container" },
          { name: "style", type: "CSSProperties", description: "Inline styles for textarea" },
        ]}
      />
    </div>
  );
}
