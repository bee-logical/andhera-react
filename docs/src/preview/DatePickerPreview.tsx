import { useState } from "react";
import { DatePicker } from "@/components";
import { PreviewCard } from "../components/PreviewCard";

interface PropDefinition {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
}

const propDefinitions: PropDefinition[] = [
  { name: "mode", type: "'single' | 'range'", defaultValue: "'single'", description: "Switch between single date and range selection modes." },
  { name: "value", type: "Date | [Date, Date] | null", defaultValue: "-", description: "Controlled value for the picker. Provide a tuple when mode is 'range'." },
  { name: "onChange", type: "(date: Date | [Date, Date] | null) => void", defaultValue: "-", description: "Called whenever the selection changes via typing or calendar clicks." },
  { name: "placeholder", type: "string", defaultValue: "'Select date'", description: "Input placeholder shown when no value is selected." },
  { name: "size", type: "'small' | 'medium' | 'large'", defaultValue: "'medium'", description: "Size variant of the date picker input." },
  { name: "disabled", type: "boolean", defaultValue: "false", description: "Disables the input and hides the calendar trigger." },
  { name: "readOnly", type: "boolean", defaultValue: "false", description: "Makes the date picker read-only (viewable but not editable)." },
  { name: "required", type: "boolean", defaultValue: "false", description: "Whether the input is required for form validation." },
  { name: "autoFocus", type: "boolean", defaultValue: "false", description: "Auto-focus the input on mount." },
  { name: "error", type: "string", defaultValue: "-", description: "Displays an error message below the input when provided." },
  { name: "name", type: "string", defaultValue: "-", description: "Input name attribute for form submission." },
  { name: "id", type: "string", defaultValue: "-", description: "Input id attribute for accessibility and labels." },
  { name: "disablePastDates", type: "boolean", defaultValue: "false", description: "Prevents selecting any date prior to today." },
  { name: "minDate", type: "Date", defaultValue: "-", description: "Smallest calendar date the user can choose." },
  { name: "maxDate", type: "Date", defaultValue: "-", description: "Largest calendar date the user can choose." },
  { name: "validateRange", type: "boolean", defaultValue: "true", description: "Guards against reversed ranges when typing start and end dates manually." },
  { name: "dateFormat", type: "string", defaultValue: "'DD/MM/YYYY'", description: "Date format pattern. Tokens: DD (01-31), D (1-31), MM (01-12), M (1-12), MMM (Jan), MMMM (January), YYYY (2025), YY (25)." },
  { name: "rangeSeparator", type: "string", defaultValue: "' - '", description: "Separator string between start and end dates in range mode." },
  { name: "dualCalendar", type: "boolean", defaultValue: "false", description: "Display two calendars side-by-side for range selection. Only works when mode='range'. Perfect for booking systems and travel dates." },
  { name: "startDateLabel", type: "string", defaultValue: "'Start Date'", description: "Label shown above the left calendar in dual calendar mode." },
  { name: "endDateLabel", type: "string", defaultValue: "'End Date'", description: "Label shown above the right calendar in dual calendar mode." },
  { name: "separateInputs", type: "boolean", defaultValue: "false", description: "Show separate input fields for start and end dates in dual calendar mode." },
  { name: "showTodayButton", type: "boolean", defaultValue: "false", description: "Show a 'Today' button in the calendar popup." },
  { name: "todayButtonText", type: "string", defaultValue: "'Today'", description: "Custom text for the Today button." },
  { name: "closeOnSelect", type: "boolean", defaultValue: "false", description: "Whether to close the calendar immediately after selecting a date." },
  { name: "showConfirmButton", type: "boolean", defaultValue: "false", description: "Show an OK/Apply button to confirm the selection." },
  { name: "confirmButtonText", type: "string", defaultValue: "'OK'", description: "Text for the confirm button." },
  { name: "showCancelButton", type: "boolean", defaultValue: "false", description: "Show a Cancel button to close without selecting." },
  { name: "cancelButtonText", type: "string", defaultValue: "'Cancel'", description: "Text for the cancel button." },
  { name: "actionButtons", type: "ActionButton[]", defaultValue: "-", description: "Custom action buttons to display in calendar footer. Each button has label, onClick, and optional variant." },
  { name: "onConfirm", type: "(date: Date | [Date, Date] | null) => void", defaultValue: "-", description: "Callback fired when the confirm button is clicked." },
  { name: "onCancel", type: "() => void", defaultValue: "-", description: "Callback fired when the cancel button is clicked." },
  { name: "onOpen", type: "() => void", defaultValue: "-", description: "Callback fired when the calendar opens." },
  { name: "onClose", type: "() => void", defaultValue: "-", description: "Callback fired when the calendar closes." },
  { name: "primaryColor", type: "string", defaultValue: "'#FFCB00'", description: "Primary color for all interactive elements (focus ring, selected dates, buttons)." },
  { name: "hoverColor", type: "string", defaultValue: "-", description: "Hover color for day buttons. Defaults to primaryColor with transparency." },
  { name: "selectedDateStyles", type: "SelectedDateStyles", defaultValue: "-", description: "Custom styles for selected date(s) including backgroundColor, color, borderRadius, boxShadow, and fontWeight." },
  { name: "rangeHighlightStyles", type: "RangeHighlightStyles", defaultValue: "-", description: "Custom styles for dates within a selected range including backgroundColor and color." },
  { name: "todayIndicatorStyles", type: "TodayIndicatorStyles", defaultValue: "-", description: "Custom styles for today's date indicator including borderColor, borderWidth, and borderStyle." },
  { name: "className", type: "string", defaultValue: "-", description: "Additional className for the container element." },
  { name: "inputClassName", type: "string", defaultValue: "-", description: "Additional className for the input wrapper." },
  { name: "calendarClassName", type: "string", defaultValue: "-", description: "Additional className for the calendar popup." },
  { name: "aria-label", type: "string", defaultValue: "-", description: "Accessible label for screen readers." },
  { name: "aria-describedby", type: "string", defaultValue: "-", description: "ID of element that describes the input." },
  { name: "clearButtonLabel", type: "string", defaultValue: "'Clear date'", description: "Accessible label for the clear button." },
  { name: "calendarIconLabel", type: "string", defaultValue: "'Open calendar'", description: "Accessible label for the calendar icon." },
  { name: "disabledDates", type: "Date[]", defaultValue: "[]", description: "Array of specific dates that should be disabled and unselectable." },
  { name: "disabledDateRanges", type: "[Date, Date][]", defaultValue: "[]", description: "Array of date range tuples to disable. Each tuple contains [startDate, endDate] (inclusive)." },
  { name: "shouldDisableDate", type: "(date: Date) => boolean", defaultValue: "-", description: "Custom function to determine if a date should be disabled. Return true to disable." },
  { name: "allowDisabledInRange", type: "boolean", defaultValue: "false", description: "When true, allows selecting a range that includes disabled dates. When false, shows an error if the range contains disabled dates." },
  { name: "disabledInRangeError", type: "string", defaultValue: "'Selected range contains disabled dates'", description: "Error message shown when a selected range contains disabled dates and allowDisabledInRange is false." },
];

function PropsReference() {
  return (
    <div className="w-full bg-white/[0.04] border border-[#364153] rounded-2xl p-6 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="font-manrope text-xl font-semibold m-0 text-white">
          DatePicker Props
        </h3>
        <p className="m-0 text-[#AEB6C4] text-sm leading-relaxed">
          DatePicker is a flexible date selection component that supports single date and range selection modes.
          It accepts all standard HTML input attributes plus the specialized props below.
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

export function DatePickerPreview() {
  const [singleDate, setSingleDate] = useState<Date | null>(null);
  const [rangeDate, setRangeDate] = useState<[Date, Date] | null>(null);
  const [pastDisabled, setPastDisabled] = useState<Date | null>(null);
  const [customRange, setCustomRange] = useState<[Date, Date] | null>(null);
  const [errorDate, setErrorDate] = useState<Date | null>(null);
  const [weekendError, setWeekendError] = useState<string>("");
  const [sizeSmall, setSizeSmall] = useState<Date | null>(null);
  const [sizeMedium, setSizeMedium] = useState<Date | null>(null);
  const [sizeLarge, setSizeLarge] = useState<Date | null>(null);
  const [todayDate, setTodayDate] = useState<Date | null>(null);
  const [dualCalendarRange, setDualCalendarRange] = useState<[Date, Date] | null>(null);
  const [dualCalendarCustomLabels, setDualCalendarCustomLabels] = useState<[Date, Date] | null>(null);
  const [dualCalendarSeparateInputs, setDualCalendarSeparateInputs] = useState<[Date, Date] | null>(null);
  
  // Disabled dates examples
  const [disabledSpecificDate, setDisabledSpecificDate] = useState<Date | null>(null);
  const [disabledRangeDate, setDisabledRangeDate] = useState<Date | null>(null);
  const [disabledCustomFunctionDate, setDisabledCustomFunctionDate] = useState<Date | null>(null);
  const [disabledInRangeSelection, setDisabledInRangeSelection] = useState<[Date, Date] | null>(null);
  const [allowDisabledInRangeSelection, setAllowDisabledInRangeSelection] = useState<[Date, Date] | null>(null);

  const today = new Date();
  const minDate = new Date(today.getFullYear(), today.getMonth(), 1);
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 3, 0);
  
  // Disabled dates for examples
  const specificDisabledDates = [
    new Date(today.getFullYear(), today.getMonth(), 10),
    new Date(today.getFullYear(), today.getMonth(), 15),
    new Date(today.getFullYear(), today.getMonth(), 20),
    new Date(today.getFullYear(), today.getMonth(), 25),
  ];
  
  const disabledDateRangesExample: [Date, Date][] = [
    [
      new Date(today.getFullYear(), today.getMonth(), 5),
      new Date(today.getFullYear(), today.getMonth(), 8),
    ],
    [
      new Date(today.getFullYear(), today.getMonth(), 18),
      new Date(today.getFullYear(), today.getMonth(), 22),
    ],
  ];
  
  // Custom function to disable weekends
  const disableWeekends = (date: Date): boolean => {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday = 0, Saturday = 6
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Single Date Selection */}
      <PreviewCard
        isDatePicker={true}
        title="Single Date Selection"
        description="Basic date picker for selecting a single date. Includes manual input with format validation (DD/MM/YYYY)."
        code={`import { useState } from "react";
import { DatePicker } from "andhera-react";

export function SingleDateExample() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <DatePicker
      value={date}
      onChange={(next) => setDate(Array.isArray(next) ? next[0] ?? null : next)}
      placeholder="Select a date"
    />
  );
}`}
      >
        <div className="flex flex-col gap-4 items-center w-full">
          <DatePicker
            value={singleDate}
            onChange={(next) => setSingleDate(Array.isArray(next) ? next[0] ?? null : next)}
            placeholder="Select a date"
          />
          {singleDate && (
            <p className="text-sm text-gray-400">
              Selected: {singleDate.toLocaleDateString()}
            </p>
          )}
        </div>
      </PreviewCard>

      {/* Size Variants */}
      <PreviewCard
        isDatePicker={true}
        title="Size Variants"
        description="DatePicker comes in three size variants: small, medium (default), and large. Use the size prop to match your UI density."
        code={`import { useState } from "react";
import { DatePicker } from "andhera-react";

export function SizeVariantsExample() {
  const [smallDate, setSmallDate] = useState<Date | null>(null);
  const [mediumDate, setMediumDate] = useState<Date | null>(null);
  const [largeDate, setLargeDate] = useState<Date | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <DatePicker
        size="small"
        value={smallDate}
        onChange={(next) => setSmallDate(Array.isArray(next) ? next[0] ?? null : next)}
        placeholder="Small size"
      />
      <DatePicker
        size="medium"
        value={mediumDate}
        onChange={(next) => setMediumDate(Array.isArray(next) ? next[0] ?? null : next)}
        placeholder="Medium size (default)"
      />
      <DatePicker
        size="large"
        value={largeDate}
        onChange={(next) => setLargeDate(Array.isArray(next) ? next[0] ?? null : next)}
        placeholder="Large size"
      />
    </div>
  );
}`}
      >
        <div className="flex flex-col gap-4 items-center w-full">
          <DatePicker
            size="small"
            value={sizeSmall}
            onChange={(next) => setSizeSmall(Array.isArray(next) ? next[0] ?? null : next)}
            placeholder="Small size"
          />
          <DatePicker
            size="medium"
            value={sizeMedium}
            onChange={(next) => setSizeMedium(Array.isArray(next) ? next[0] ?? null : next)}
            placeholder="Medium size (default)"
          />
          <DatePicker
            size="large"
            value={sizeLarge}
            onChange={(next) => setSizeLarge(Array.isArray(next) ? next[0] ?? null : next)}
            placeholder="Large size"
          />
        </div>
      </PreviewCard>

      {/* Range Selection */}
      <PreviewCard
        isDatePicker={true}
        title="Date Range Selection"
        description="Select a date range by picking start and end dates. Visual feedback shows the selected range in the calendar."
        code={`import { useState } from "react";
import { DatePicker } from "andhera-react";

export function RangeDateExample() {
  const [range, setRange] = useState<[Date, Date] | null>(null);

  return (
    <DatePicker
      mode="range"
      value={range}
      onChange={(next) => {
        if (Array.isArray(next)) {
          setRange(next);
        } else if (next instanceof Date) {
          setRange([next, next]);
        } else {
          setRange(null);
        }
      }}
      placeholder="Select date range"
    />
  );
}`}
      >
        <div className="flex flex-col gap-4 items-center w-full">
          <DatePicker
            mode="range"
            value={rangeDate}
            onChange={(next) => {
              if (Array.isArray(next)) {
                setRangeDate(next);
              } else if (next instanceof Date) {
                setRangeDate([next, next]);
              } else {
                setRangeDate(null);
              }
            }}
            placeholder="Select date range"
          />
          {rangeDate && (
            <p className="text-sm text-gray-400">
              Range: {rangeDate[0].toLocaleDateString()} - {rangeDate[1].toLocaleDateString()}
            </p>
          )}
        </div>
      </PreviewCard>

      {/* Dual Calendar Range Selection */}
      <PreviewCard
        isDatePicker={true}
        title="Dual Calendar Range Selection"
        description="Display two calendars side-by-side for intuitive date range selection. The left calendar shows the start date month and the right shows the end date month. Perfect for booking systems, travel dates, or any scenario requiring a date range."
        code={`import { useState } from "react";
import { DatePicker } from "andhera-react";

export function DualCalendarExample() {
  const [range, setRange] = useState<[Date, Date] | null>(null);

  return (
    <DatePicker
      mode="range"
      dualCalendar
      value={range}
      onChange={(next) => {
        if (Array.isArray(next)) {
          setRange(next);
        } else {
          setRange(null);
        }
      }}
      placeholder="Select check-in and check-out"
    />
  );
}`}
      >
        <div className="flex flex-col gap-4 items-center w-full" style={{ position: 'relative', zIndex: 1000 }}>
          <DatePicker
            mode="range"
            dualCalendar
            value={dualCalendarRange}
            onChange={(next) => {
              if (Array.isArray(next)) {
                setDualCalendarRange(next);
              } else {
                setDualCalendarRange(null);
              }
            }}
            placeholder="Select check-in and check-out"
          />
          {dualCalendarRange && (
            <p className="text-sm text-gray-400">
              Range: {dualCalendarRange[0].toLocaleDateString()} - {dualCalendarRange[1].toLocaleDateString()}
            </p>
          )}
        </div>
      </PreviewCard>

      {/* Dual Calendar with Custom Labels */}
      <PreviewCard
        isDatePicker={true}
        title="Dual Calendar with Custom Labels"
        description="Customize the labels above each calendar to match your use case - like 'Departure' and 'Return' for flights, or 'Check-in' and 'Check-out' for hotels."
        code={`import { useState } from "react";
import { DatePicker } from "andhera-react";

export function DualCalendarLabelsExample() {
  const [range, setRange] = useState<[Date, Date] | null>(null);

  return (
    <DatePicker
      mode="range"
      dualCalendar
      startDateLabel="Departure"
      endDateLabel="Return"
      value={range}
      onChange={(next) => {
        if (Array.isArray(next)) {
          setRange(next);
        } else {
          setRange(null);
        }
      }}
      placeholder="Select departure and return dates"
      showConfirmButton
      showCancelButton
      confirmButtonText="Apply"
    />
  );
}`}
      >
        <div className="flex flex-col gap-4 items-center w-full">
          <DatePicker
            mode="range"
            dualCalendar
            startDateLabel="Departure"
            endDateLabel="Return"
            value={dualCalendarCustomLabels}
            onChange={(next) => {
              if (Array.isArray(next)) {
                setDualCalendarCustomLabels(next);
              } else {
                setDualCalendarCustomLabels(null);
              }
            }}
            placeholder="Select departure and return dates"
            showConfirmButton
            showCancelButton
            confirmButtonText="Apply"
          />
          {dualCalendarCustomLabels && (
            <p className="text-sm text-gray-400">
              Flight: {dualCalendarCustomLabels[0].toLocaleDateString()} → {dualCalendarCustomLabels[1].toLocaleDateString()}
            </p>
          )}
        </div>
      </PreviewCard>

      {/* Dual Calendar with Separate Inputs */}
      <PreviewCard
        isDatePicker={true}
        title="Dual Calendar with Separate Input Fields"
        description="Display two separate input boxes for start and end dates - perfect for hotel check-in/check-out, flight booking, or any scenario where users need clear visual separation between dates."
        code={`import { useState } from "react";
import { DatePicker } from "andhera-react";

export function SeparateInputsExample() {
  const [range, setRange] = useState<[Date, Date] | null>(null);

  return (
    <DatePicker
      mode="range"
      dualCalendar
      separateInputs
      startDateLabel="Check-in"
      endDateLabel="Check-out"
      value={range}
      onChange={(next) => {
        if (Array.isArray(next)) {
          setRange(next);
        } else {
          setRange(null);
        }
      }}
    />
  );
}`}
      >
        <div className="flex flex-col gap-4 items-center w-full" style={{ position: 'relative', zIndex: 1000 }}>
          <DatePicker
            mode="range"
            dualCalendar
            separateInputs
            startDateLabel="Check-in"
            endDateLabel="Check-out"
            value={dualCalendarSeparateInputs}
            onChange={(next) => {
              if (Array.isArray(next)) {
                setDualCalendarSeparateInputs(next);
              } else {
                setDualCalendarSeparateInputs(null);
              }
            }}
          />
          {dualCalendarSeparateInputs && (
            <p className="text-sm text-gray-400">
              Stay: {dualCalendarSeparateInputs[0].toLocaleDateString()} to {dualCalendarSeparateInputs[1].toLocaleDateString()}
            </p>
          )}
        </div>
      </PreviewCard>

      {/* Disable Past Dates */}
      <PreviewCard
        isDatePicker={true}
        title="Disable Past Dates"
        description="Prevent users from selecting dates before today. Useful for booking systems, scheduling, or future event planning."
        code={`import { useState } from "react";
import { DatePicker } from "andhera-react";

export function FutureDatesExample() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <DatePicker
      value={date}
      onChange={(next) => setDate(Array.isArray(next) ? next[0] ?? null : next)}
      placeholder="Select future date"
      disablePastDates
    />
  );
}`}
      >
        <div className="flex flex-col gap-4 items-center w-full">
          <DatePicker
            value={pastDisabled}
            onChange={(next) => setPastDisabled(Array.isArray(next) ? next[0] ?? null : next)}
            placeholder="Select future date only"
            disablePastDates
          />
          <p className="text-xs text-gray-500">
            Try selecting a past date - it's disabled!
          </p>
        </div>
      </PreviewCard>

      {/* Custom Date Range Constraints */}
      <PreviewCard
        isDatePicker={true}
        title="Custom Date Range Constraints"
        description="Restrict selectable dates using minDate and maxDate. Perfect for limiting selections to specific periods like current month or quarter."
        code={`import { useState } from "react";
import { DatePicker } from "andhera-react";

export function CustomRangeExample() {
  const [range, setRange] = useState<[Date, Date] | null>(null);
  
  const today = new Date();
  const minDate = new Date(today.getFullYear(), today.getMonth(), 1);
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 3, 0);

  return (
    <DatePicker
      mode="range"
      value={range}
      onChange={(next) => {
        if (Array.isArray(next)) {
          setRange(next);
        } else {
          setRange(null);
        }
      }}
      minDate={minDate}
      maxDate={maxDate}
      placeholder="Select within allowed range"
    />
  );
}`}
      >
        <div className="flex flex-col gap-4 items-center w-full">
          <DatePicker
            mode="range"
            value={customRange}
            onChange={(next) => {
              if (Array.isArray(next)) {
                setCustomRange(next);
              } else {
                setCustomRange(null);
              }
            }}
            minDate={minDate}
            maxDate={maxDate}
            placeholder="Select within next 3 months"
          />
          <p className="text-xs text-gray-500">
            Only {minDate.toLocaleDateString()} to {maxDate.toLocaleDateString()} available
          </p>
        </div>
      </PreviewCard>

      {/* Error State */}
      <PreviewCard
        isDatePicker={true}
        title="Error State"
        description="Display validation errors with custom error messages. Automatically validates date format and range constraints."
        code={`import { useState } from "react";
import { DatePicker } from "andhera-react";

export function ErrorStateExample() {
  const [date, setDate] = useState<Date | null>(null);
  const [error, setError] = useState<string>("");

  const handleChange = (next: Date | [Date, Date] | null) => {
    const selectedDate = Array.isArray(next) ? next[0] : next;
    
    if (selectedDate) {
      const dayOfWeek = selectedDate.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        setError("Weekends are not allowed");
        setDate(null);
        return;
      }
      setError("");
    }
    
    setDate(selectedDate);
  };

  return (
    <DatePicker
      value={date}
      onChange={handleChange}
      placeholder="Select weekday only"
      error={error}
    />
  );
}`}
      >
        <div className="flex flex-col gap-4 items-center w-full">
          <DatePicker
            value={errorDate}
            onChange={(next) => {
              const selectedDate = Array.isArray(next) ? next[0] : next;
              
              if (selectedDate) {
                const dayOfWeek = selectedDate.getDay();
                if (dayOfWeek === 0 || dayOfWeek === 6) {
                  setWeekendError("Weekends are not allowed");
                  setErrorDate(null);
                  return;
                }
                setWeekendError("");
              } else {
                setWeekendError("");
              }
              
              setErrorDate(selectedDate);
            }}
            placeholder="Try selecting a weekend"
            error={weekendError}
          />
        </div>
      </PreviewCard>

      {/* Disabled State */}
      <PreviewCard
        isDatePicker={true}
        title="Disabled State"
        description="Completely disable the date picker when user interaction should be prevented."
        code={`import { DatePicker } from "andhera-react";

export function DisabledExample() {
  return (
    <DatePicker
      value={new Date()}
      disabled
      placeholder="Disabled date picker"
    />
  );
}`}
      >
        <div className="flex flex-col gap-4 items-center w-full">
          <DatePicker
            value={new Date()}
            disabled
            placeholder="Disabled date picker"
          />
        </div>
      </PreviewCard>

      {/* Read-Only State */}
      <PreviewCard
        isDatePicker={true}
        title="Read-Only State"
        description="Display dates in read-only mode. Users can see the value but cannot modify it."
        code={`import { DatePicker } from "andhera-react";

export function ReadOnlyExample() {
  return (
    <DatePicker
      value={new Date()}
      readOnly
      placeholder="Read-only date picker"
    />
  );
}`}
      >
        <div className="flex flex-col gap-4 items-center w-full">
          <DatePicker
            value={new Date()}
            readOnly
            placeholder="Read-only date picker"
          />
          <p className="text-xs text-gray-500">
            Click to open - the date cannot be changed
          </p>
        </div>
      </PreviewCard>

      {/* With Today Button */}
      <PreviewCard
        isDatePicker={true}
        title="Today Button"
        description="Add a 'Today' button in the calendar for quick selection of the current date."
        code={`import { useState } from "react";
import { DatePicker } from "andhera-react";

export function TodayButtonExample() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <DatePicker
      value={date}
      onChange={(next) => setDate(Array.isArray(next) ? next[0] ?? null : next)}
      placeholder="Select date"
      showTodayButton
      todayButtonText="Go to Today"
    />
  );
}`}
      >
        <div className="flex flex-col gap-4 items-center w-full">
          <DatePicker
            value={todayDate}
            onChange={(next) => setTodayDate(Array.isArray(next) ? next[0] ?? null : next)}
            placeholder="Click calendar, then 'Go to Today'"
            showTodayButton
            todayButtonText="Go to Today"
          />
          {todayDate && (
            <p className="text-sm text-gray-400">
              Selected: {todayDate.toLocaleDateString()}
            </p>
          )}
        </div>
      </PreviewCard>

      {/* Manual Input with Validation */}
      <PreviewCard
        isDatePicker={true}
        title="Manual Input & Format Validation"
        description="Type dates manually in DD/MM/YYYY format. The picker validates format, date validity, and range constraints in real-time."
        code={`import { useState } from "react";
import { DatePicker } from "andhera-react";

export function ManualInputExample() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <div>
      <DatePicker
        value={date}
        onChange={(next) => setDate(Array.isArray(next) ? next[0] ?? null : next)}
        placeholder="Try typing: 25/12/2025"
      />
      <p className="text-xs text-gray-500 mt-2">
        Format: DD/MM/YYYY (auto-formatting enabled)
      </p>
    </div>
  );
}`}
      >
        <div className="flex flex-col gap-4 items-center w-full">
          <DatePicker
            value={null}
            onChange={() => {}}
            placeholder="Type: 25/12/2025"
          />
          <div className="text-xs text-gray-400 space-y-1 text-center">
            <p>✓ Auto-inserts "/" after day and month</p>
            <p>✓ Validates real dates (no 32/13/2025)</p>
            <p>✓ Clears with X button</p>
          </div>
        </div>
      </PreviewCard>

      {/* Required Field */}
      <PreviewCard
        isDatePicker={true}
        title="Required Field"
        description="Mark the date picker as required for form validation. Works with native HTML form validation."
        code={`import { useState } from "react";
import { DatePicker } from "andhera-react";

export function RequiredFieldExample() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <form onSubmit={(e) => { e.preventDefault(); alert('Form submitted!'); }}>
      <DatePicker
        value={date}
        onChange={(next) => setDate(Array.isArray(next) ? next[0] ?? null : next)}
        placeholder="Required date field"
        required
        name="appointment"
        id="appointment-date"
      />
      <button type="submit">Submit</button>
    </form>
  );
}`}
      >
        <div className="flex flex-col gap-4 items-center w-full">
          <DatePicker
            value={null}
            onChange={() => {}}
            placeholder="Required date field"
            required
            name="appointment"
            id="appointment-date"
          />
          <p className="text-xs text-gray-500">
            Has name and id attributes for form submission
          </p>
        </div>
      </PreviewCard>

      {/* Range Validation */}
      <PreviewCard
        isDatePicker={true}
        title="Range Validation"
        description="In range mode, the picker prevents invalid ranges where start date is after end date. Toggle validateRange to customize this behavior."
        code={`import { useState } from "react";
import { DatePicker } from "andhera-react";

export function RangeValidationExample() {
  const [range, setRange] = useState<[Date, Date] | null>(null);

  return (
    <DatePicker
      mode="range"
      value={range}
      onChange={(next) => {
        if (Array.isArray(next)) {
          setRange(next);
        }
      }}
      placeholder="Select valid range"
      validateRange={true}
    />
  );
}`}
      >
        <div className="flex flex-col gap-4 items-center w-full">
          <DatePicker
            mode="range"
            value={null}
            onChange={() => {}}
            placeholder="Start date must be before end date"
            validateRange={true}
          />
          <p className="text-xs text-gray-500">
            Try selecting end date before start date in calendar
          </p>
        </div>
      </PreviewCard>

      {/* Accessibility Features */}
      <PreviewCard
        isDatePicker={true}
        title="Accessibility Features"
        description="DatePicker includes full accessibility support with ARIA attributes, keyboard navigation, and screen reader announcements."
        code={`import { useState } from "react";
import { DatePicker } from "andhera-react";

export function AccessibilityExample() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <DatePicker
      value={date}
      onChange={(next) => setDate(Array.isArray(next) ? next[0] ?? null : next)}
      placeholder="Accessible date picker"
      aria-label="Select appointment date"
      clearButtonLabel="Clear selected date"
      calendarIconLabel="Open date picker calendar"
      id="accessible-date"
      name="accessible-date"
    />
  );
}`}
      >
        <div className="flex flex-col gap-4 items-center w-full">
          <DatePicker
            value={null}
            onChange={() => {}}
            placeholder="Accessible date picker"
            aria-label="Select appointment date"
            clearButtonLabel="Clear selected date"
            calendarIconLabel="Open date picker calendar"
            id="accessible-date"
            name="accessible-date"
          />
          <div className="text-xs text-gray-400 space-y-1 text-center">
            <p>✓ aria-label for screen readers</p>
            <p>✓ aria-expanded for calendar state</p>
            <p>✓ Keyboard navigation support</p>
            <p>✓ Error announcements with role="alert"</p>
          </div>
        </div>
      </PreviewCard>

      {/* Custom Selected Date Styles */}
      <PreviewCard
        isDatePicker={true}
        title="Custom Selected Date Styles"
        description="Customize the appearance of selected dates with custom colors, border radius, shadow, and font weight."
        code={`import { useState } from "react";
import { DatePicker } from "andhera-react";

export function CustomStylesExample() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <DatePicker
      value={date}
      onChange={(next) => setDate(Array.isArray(next) ? next[0] ?? null : next)}
      placeholder="Custom styled selection"
      selectedDateStyles={{
        backgroundColor: "#10B981",
        color: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(16, 185, 129, 0.4)",
        fontWeight: 700,
      }}
      primaryColor="#10B981"
    />
  );
}`}
      >
        <div className="flex flex-col gap-4 items-center w-full">
          <DatePicker
            value={null}
            onChange={() => {}}
            placeholder="Custom styled selection"
            selectedDateStyles={{
              backgroundColor: "#10B981",
              color: "#ffffff",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(16, 185, 129, 0.4)",
              fontWeight: 700,
            }}
            primaryColor="#10B981"
          />
          <p className="text-xs text-gray-500">
            Green theme with rounded corners
          </p>
        </div>
      </PreviewCard>

      {/* Custom Primary Color */}
      <PreviewCard
        isDatePicker={true}
        title="Custom Primary Color"
        description="Override the default primary color for all interactive elements including focus ring, selected dates, and buttons."
        code={`import { useState } from "react";
import { DatePicker } from "andhera-react";

export function CustomPrimaryColorExample() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <DatePicker
      value={date}
      onChange={(next) => setDate(Array.isArray(next) ? next[0] ?? null : next)}
      placeholder="Purple theme"
      primaryColor="#8B5CF6"
      showTodayButton
      todayButtonText="Go to Today"
    />
  );
}`}
      >
        <div className="flex flex-col gap-4 items-center w-full">
          <DatePicker
            value={null}
            onChange={() => {}}
            placeholder="Purple theme"
            primaryColor="#8B5CF6"
            showTodayButton
            todayButtonText="Go to Today"
          />
          <p className="text-xs text-gray-500">
            Click to see the purple theme in action
          </p>
        </div>
      </PreviewCard>

      {/* Range Highlight Styles */}
      <PreviewCard
        isDatePicker={true}
        title="Custom Range Highlight"
        description="Customize the appearance of dates within a selected range using rangeHighlightStyles."
        code={`import { useState } from "react";
import { DatePicker } from "andhera-react";

export function RangeHighlightExample() {
  const [range, setRange] = useState<[Date, Date] | null>(null);

  return (
    <DatePicker
      mode="range"
      value={range}
      onChange={(next) => setRange(Array.isArray(next) ? next : null)}
      placeholder="Select a date range"
      primaryColor="#F59E0B"
      rangeHighlightStyles={{
        backgroundColor: "rgba(245, 158, 11, 0.25)",
        color: "#FEF3C7",
      }}
    />
  );
}`}
      >
        <div className="flex flex-col gap-4 items-center w-full">
          <DatePicker
            mode="range"
            value={null}
            onChange={() => {}}
            placeholder="Select a date range"
            primaryColor="#F59E0B"
            rangeHighlightStyles={{
              backgroundColor: "rgba(245, 158, 11, 0.25)",
              color: "#FEF3C7",
            }}
          />
          <p className="text-xs text-gray-500">
            Amber-themed range selection
          </p>
        </div>
      </PreviewCard>

      {/* Today Indicator Styles */}
      <PreviewCard
        isDatePicker={true}
        title="Custom Today Indicator"
        description="Customize how today's date is highlighted in the calendar with custom border styles."
        code={`import { useState } from "react";
import { DatePicker } from "andhera-react";

export function TodayIndicatorExample() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <DatePicker
      value={date}
      onChange={(next) => setDate(Array.isArray(next) ? next[0] ?? null : next)}
      placeholder="Notice today's indicator"
      todayIndicatorStyles={{
        borderColor: "#EF4444",
        borderWidth: "2px",
        borderStyle: "dashed",
      }}
    />
  );
}`}
      >
        <div className="flex flex-col gap-4 items-center w-full">
          <DatePicker
            value={null}
            onChange={() => {}}
            placeholder="Notice today's indicator"
            todayIndicatorStyles={{
              borderColor: "#EF4444",
              borderWidth: "2px",
              borderStyle: "dashed",
            }}
          />
          <p className="text-xs text-gray-500">
            Today has a red dashed border
          </p>
        </div>
      </PreviewCard>

      {/* Confirm & Cancel Buttons */}
      <PreviewCard
        isDatePicker={true}
        title="Confirm & Cancel Buttons"
        description="Add OK and Cancel buttons to confirm or cancel date selection before applying changes."
        code={`import { useState } from "react";
import { DatePicker } from "andhera-react";

export function ConfirmCancelExample() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <DatePicker
      value={date}
      onChange={(next) => setDate(Array.isArray(next) ? next[0] ?? null : next)}
      placeholder="Select and confirm"
      showConfirmButton
      confirmButtonText="Apply"
      showCancelButton
      cancelButtonText="Cancel"
      onConfirm={(selected) => console.log("Confirmed:", selected)}
      onCancel={() => console.log("Cancelled")}
    />
  );
}`}
      >
        <div className="flex flex-col gap-4 items-center w-full">
          <DatePicker
            value={null}
            onChange={() => {}}
            placeholder="Select and confirm"
            showConfirmButton
            confirmButtonText="Apply"
            showCancelButton
            cancelButtonText="Cancel"
            onConfirm={(selected) => console.log("Confirmed:", selected)}
            onCancel={() => console.log("Cancelled")}
          />
          <p className="text-xs text-gray-500">
            Click calendar to see Apply/Cancel buttons
          </p>
        </div>
      </PreviewCard>

      {/* Custom Action Buttons */}
      <PreviewCard
        isDatePicker={true}
        title="Custom Action Buttons"
        description="Add custom action buttons to the calendar footer for specialized workflows."
        code={`import { useState } from "react";
import { DatePicker } from "andhera-react";

export function CustomActionsExample() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <DatePicker
      value={date}
      onChange={(next) => setDate(Array.isArray(next) ? next[0] ?? null : next)}
      placeholder="With custom actions"
      actionButtons={[
        {
          label: "Clear",
          variant: "ghost",
          onClick: () => setDate(null),
        },
        {
          label: "Tomorrow",
          variant: "secondary",
          onClick: () => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            setDate(tomorrow);
          },
        },
      ]}
      showConfirmButton
    />
  );
}`}
      >
        <div className="flex flex-col gap-4 items-center w-full">
          <DatePicker
            value={null}
            onChange={() => {}}
            placeholder="With custom actions"
            actionButtons={[
              {
                label: "Clear",
                variant: "ghost",
                onClick: () => console.log("Clear clicked"),
              },
              {
                label: "Tomorrow",
                variant: "secondary",
                onClick: () => console.log("Tomorrow clicked"),
              },
            ]}
            showConfirmButton
          />
          <p className="text-xs text-gray-500">
            Custom Clear and Tomorrow buttons with Confirm
          </p>
        </div>
      </PreviewCard>

      {/* Close on Select */}
      <PreviewCard
        isDatePicker={true}
        title="Close Calendar on Select"
        description="By default, the calendar stays open after selecting a date. Set closeOnSelect to true for immediate closing behavior."
        code={`import { useState } from "react";
import { DatePicker } from "andhera-react";

export function CloseOnSelectExample() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <DatePicker
      value={date}
      onChange={(next) => setDate(Array.isArray(next) ? next[0] ?? null : next)}
      placeholder="Closes after selection"
      closeOnSelect={true}
    />
  );
}`}
      >
        <div className="flex flex-col gap-4 items-center w-full">
          <DatePicker
            value={null}
            onChange={() => {}}
            placeholder="Closes after selection"
            closeOnSelect={true}
          />
          <p className="text-xs text-gray-500">
            Calendar closes immediately after selecting a date
          </p>
        </div>
      </PreviewCard>

      {/* Custom Date Format */}
      <PreviewCard
        isDatePicker={true}
        title="Custom Date Format"
        description="Customize the date format for display and input. Supports tokens: DD, D, MM, M, MMM, MMMM, YYYY, YY with any separator."
        code={`import { useState } from "react";
import { DatePicker } from "andhera-react";

export function DateFormatExample() {
  const [date1, setDate1] = useState<Date | null>(null);
  const [date2, setDate2] = useState<Date | null>(null);
  const [date3, setDate3] = useState<Date | null>(null);

  return (
    <div className="flex flex-col gap-4">
      {/* US Format */}
      <DatePicker
        value={date1}
        onChange={(next) => setDate1(Array.isArray(next) ? next[0] : next)}
        placeholder="MM/DD/YYYY"
        dateFormat="MM/DD/YYYY"
      />
      
      {/* ISO Format */}
      <DatePicker
        value={date2}
        onChange={(next) => setDate2(Array.isArray(next) ? next[0] : next)}
        placeholder="YYYY-MM-DD"
        dateFormat="YYYY-MM-DD"
      />
      
      {/* Friendly Format */}
      <DatePicker
        value={date3}
        onChange={(next) => setDate3(Array.isArray(next) ? next[0] : next)}
        placeholder="D MMM YYYY"
        dateFormat="D MMM YYYY"
      />
    </div>
  );
}`}
      >
        <div className="flex flex-col gap-4 items-center w-full">
          <div className="flex flex-col gap-3 w-full max-w-xs">
            <div>
              <p className="text-xs text-gray-400 mb-1">US Format (MM/DD/YYYY)</p>
              <DatePicker
                value={null}
                onChange={() => {}}
                placeholder="MM/DD/YYYY"
                dateFormat="MM/DD/YYYY"
              />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">ISO Format (YYYY-MM-DD)</p>
              <DatePicker
                value={null}
                onChange={() => {}}
                placeholder="YYYY-MM-DD"
                dateFormat="YYYY-MM-DD"
              />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Friendly (D MMM YYYY)</p>
              <DatePicker
                value={null}
                onChange={() => {}}
                placeholder="D MMM YYYY"
                dateFormat="D MMM YYYY"
              />
            </div>
          </div>
        </div>
      </PreviewCard>

      {/* Date Format with Range */}
      <PreviewCard
        isDatePicker={true}
        title="Custom Format with Range"
        description="Custom date formats work with range selection too. Use rangeSeparator to customize the separator between dates."
        code={`import { useState } from "react";
import { DatePicker } from "andhera-react";

export function RangeFormatExample() {
  const [range, setRange] = useState<[Date, Date] | null>(null);

  return (
    <DatePicker
      mode="range"
      value={range}
      onChange={(next) => setRange(Array.isArray(next) ? next : null)}
      placeholder="Select date range"
      dateFormat="MMM D, YYYY"
      rangeSeparator=" → "
    />
  );
}`}
      >
        <div className="flex flex-col gap-4 items-center w-full">
          <DatePicker
            mode="range"
            value={null}
            onChange={() => {}}
            placeholder="Select date range"
            dateFormat="MMM D, YYYY"
            rangeSeparator=" → "
          />
          <p className="text-xs text-gray-500">
            Format: "Dec 25, 2025 → Dec 31, 2025"
          </p>
        </div>
      </PreviewCard>

      {/* Disabled Specific Dates */}
      <PreviewCard
        isDatePicker={true}
        title="Disabled Specific Dates"
        description="Disable specific dates using the disabledDates prop. Pass an array of Date objects to prevent users from selecting those dates. Disabled dates appear grayed out and cannot be clicked."
        code={`import { useState } from "react";
import { DatePicker } from "andhera-react";

export function DisabledDatesExample() {
  const [date, setDate] = useState<Date | null>(null);
  
  // Disable specific dates
  const disabledDates = [
    new Date(2025, 5, 10), // June 10, 2025
    new Date(2025, 5, 15), // June 15, 2025
    new Date(2025, 5, 20), // June 20, 2025
    new Date(2025, 5, 25), // June 25, 2025
  ];

  return (
    <DatePicker
      value={date}
      onChange={(next) => setDate(Array.isArray(next) ? next[0] ?? null : next)}
      placeholder="Select a date"
      disabledDates={disabledDates}
    />
  );
}`}
      >
        <div className="flex flex-col gap-4 items-center w-full">
          <DatePicker
            value={disabledSpecificDate}
            onChange={(next) => setDisabledSpecificDate(Array.isArray(next) ? next[0] ?? null : next)}
            placeholder="Select a date"
            disabledDates={specificDisabledDates}
          />
          <p className="text-xs text-gray-500">
            Dates 10th, 15th, 20th, and 25th of current month are disabled
          </p>
        </div>
      </PreviewCard>

      {/* Disabled Date Ranges */}
      <PreviewCard
        isDatePicker={true}
        title="Disabled Date Ranges"
        description="Disable entire ranges of dates using the disabledDateRanges prop. Perfect for blocking out holidays, maintenance periods, or already-booked dates."
        code={`import { useState } from "react";
import { DatePicker } from "andhera-react";

export function DisabledRangesExample() {
  const [date, setDate] = useState<Date | null>(null);
  
  // Disable date ranges - array of [start, end] tuples
  const disabledDateRanges: [Date, Date][] = [
    [new Date(2025, 5, 5), new Date(2025, 5, 8)],   // June 5-8
    [new Date(2025, 5, 18), new Date(2025, 5, 22)], // June 18-22
  ];

  return (
    <DatePicker
      value={date}
      onChange={(next) => setDate(Array.isArray(next) ? next[0] ?? null : next)}
      placeholder="Select a date"
      disabledDateRanges={disabledDateRanges}
    />
  );
}`}
      >
        <div className="flex flex-col gap-4 items-center w-full">
          <DatePicker
            value={disabledRangeDate}
            onChange={(next) => setDisabledRangeDate(Array.isArray(next) ? next[0] ?? null : next)}
            placeholder="Select a date"
            disabledDateRanges={disabledDateRangesExample}
          />
          <p className="text-xs text-gray-500">
            Dates 5th-8th and 18th-22nd of current month are disabled
          </p>
        </div>
      </PreviewCard>

      {/* Custom Disable Function (Weekends) */}
      <PreviewCard
        isDatePicker={true}
        title="Custom Disable Function (Weekends)"
        description="Use the shouldDisableDate prop to provide a custom function that determines which dates to disable. This example disables all weekends."
        code={`import { useState } from "react";
import { DatePicker } from "andhera-react";

export function DisableWeekendsExample() {
  const [date, setDate] = useState<Date | null>(null);
  
  // Function to disable weekends
  const disableWeekends = (date: Date): boolean => {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday = 0, Saturday = 6
  };

  return (
    <DatePicker
      value={date}
      onChange={(next) => setDate(Array.isArray(next) ? next[0] ?? null : next)}
      placeholder="Select a weekday"
      shouldDisableDate={disableWeekends}
    />
  );
}`}
      >
        <div className="flex flex-col gap-4 items-center w-full">
          <DatePicker
            value={disabledCustomFunctionDate}
            onChange={(next) => setDisabledCustomFunctionDate(Array.isArray(next) ? next[0] ?? null : next)}
            placeholder="Select a weekday"
            shouldDisableDate={disableWeekends}
          />
          <p className="text-xs text-gray-500">
            All Saturdays and Sundays are disabled
          </p>
        </div>
      </PreviewCard>

      {/* Range Selection with Disabled Dates (Restricted) */}
      <PreviewCard
        isDatePicker={true}
        title="Range Selection - Restrict Disabled Dates"
        description="When selecting a date range, prevent users from selecting ranges that include disabled dates. The calendar shows an error if the selected range contains any disabled dates."
        code={`import { useState } from "react";
import { DatePicker } from "andhera-react";

export function RestrictedRangeExample() {
  const [range, setRange] = useState<[Date, Date] | null>(null);
  
  const disabledDates = [
    new Date(2025, 5, 12),
    new Date(2025, 5, 18),
  ];

  return (
    <DatePicker
      mode="range"
      value={range}
      onChange={(next) => setRange(Array.isArray(next) ? next : null)}
      placeholder="Select date range"
      disabledDates={disabledDates}
      allowDisabledInRange={false} // Default - prevents ranges with disabled dates
      disabledInRangeError="Your selected range includes unavailable dates"
    />
  );
}`}
      >
        <div className="flex flex-col gap-4 items-center w-full">
          <DatePicker
            mode="range"
            value={disabledInRangeSelection}
            onChange={(next) => setDisabledInRangeSelection(Array.isArray(next) ? next : null)}
            placeholder="Select date range"
            disabledDates={specificDisabledDates}
            allowDisabledInRange={false}
            disabledInRangeError="Your selected range includes unavailable dates"
          />
          <p className="text-xs text-gray-500">
            Try selecting a range that includes 10th, 15th, 20th, or 25th - you'll see an error
          </p>
        </div>
      </PreviewCard>

      {/* Range Selection with Disabled Dates (Allowed) */}
      <PreviewCard
        isDatePicker={true}
        title="Range Selection - Allow Disabled Dates in Range"
        description="Use allowDisabledInRange={true} to permit selecting date ranges even if they contain disabled dates. The disabled dates will still appear grayed out but won't prevent range selection."
        code={`import { useState } from "react";
import { DatePicker } from "andhera-react";

export function AllowDisabledInRangeExample() {
  const [range, setRange] = useState<[Date, Date] | null>(null);
  
  const disabledDates = [
    new Date(2025, 5, 12),
    new Date(2025, 5, 18),
  ];

  return (
    <DatePicker
      mode="range"
      value={range}
      onChange={(next) => setRange(Array.isArray(next) ? next : null)}
      placeholder="Select date range"
      disabledDates={disabledDates}
      allowDisabledInRange={true} // Allow ranges that include disabled dates
    />
  );
}`}
      >
        <div className="flex flex-col gap-4 items-center w-full">
          <DatePicker
            mode="range"
            value={allowDisabledInRangeSelection}
            onChange={(next) => setAllowDisabledInRangeSelection(Array.isArray(next) ? next : null)}
            placeholder="Select date range"
            disabledDates={specificDisabledDates}
            allowDisabledInRange={true}
          />
          <p className="text-xs text-gray-500">
            You can select ranges that include disabled dates (10th, 15th, 20th, 25th)
          </p>
        </div>
      </PreviewCard>

      {/* Props Reference Table */}
      <PropsReference />
    </div>
  );
}

export default DatePickerPreview;
