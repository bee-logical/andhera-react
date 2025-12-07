"use client";
import React, { forwardRef, useState, useId } from 'react';
import RadioButton, { 
  RadioSize, 
  RadioVariant, 
  RadioLabelPosition,
  RadioProps 
} from './radioButton';

/**
 * Radio group layout direction
 */
export type RadioGroupDirection = 'row' | 'column';

/**
 * Option type for radio group items
 */
export interface RadioOption {
  /** Display label for the option */
  label: React.ReactNode;
  /** Value of the option */
  value: string | number;
  /** Whether this option is disabled */
  disabled?: boolean;
  /** Whether this option is required */
  required?: boolean;
  /** Description text for the option */
  description?: string;
  /** Helper text for the option */
  helperText?: string;
}

export interface RadioGroupProps {
  /** Array of radio options to display */
  options: RadioOption[];
  
  /** Name attribute for the radio group (required for proper grouping) */
  name: string;
  
  /** Callback fired when selection changes. Receives the selected value. */
  onChange: (value: string | number) => void;
  
  /** Default selected value (uncontrolled) */
  defaultValue?: string | number;
  
  /** Controlled selected value */
  value?: string | number;
  
  /** Position of labels relative to radio buttons. RadioLabelPosition type: 'left' | 'right' | 'top' | 'bottom' */
  labelPosition?: RadioLabelPosition;
  
  /** Additional CSS classes for the group wrapper */
  className?: string;
  
  /** Additional CSS classes for each radio item wrapper */
  itemClassName?: string;
  
  /** Layout direction of radio buttons. RadioGroupDirection type: 'row' | 'column' */
  direction?: RadioGroupDirection;
  
  /** Additional CSS classes for the radio inputs */
  inputClassName?: string;
  
  /** Additional CSS classes for the labels */
  labelClassName?: string;
  
  /** Callback fired when any radio receives focus */
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  
  /** Callback fired when any radio loses focus */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  
  /** Size of all radio buttons. RadioSize type: 'small' | 'medium' | 'large' */
  size?: RadioSize;
  
  /** Color variant of all radio buttons. RadioVariant type: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' */
  variant?: RadioVariant;
  
  /** Whether all radio buttons are disabled */
  disabled?: boolean;
  
  /** Whether selection is required */
  required?: boolean;
  
  /** Error state for the entire group */
  error?: boolean;
  
  /** Error message to display below the group */
  errorMessage?: string;
  
  /** Helper text displayed below the group */
  helperText?: string;
  
  /** Group label/title displayed above the radio buttons */
  label?: React.ReactNode;
  
  /** Additional CSS classes for the group label */
  groupLabelClassName?: string;
  
  /** Whether to show ripple effect on interaction */
  ripple?: boolean;
  
  /** Gap between radio items (Tailwind gap class, e.g., 'gap-2', 'gap-4') */
  gap?: string;
  
  /** Custom styles for the group wrapper */
  style?: React.CSSProperties;
  
  /** Read-only state for all radio buttons */
  readOnly?: boolean;
  
  /** ARIA label for the radio group */
  'aria-label'?: string;
  
  /** ARIA described by for accessibility */
  'aria-describedby'?: string;
  
  /** Test ID for automated testing */
  'data-testid'?: string;
  
  /** Custom render function for each radio option */
  renderOption?: (option: RadioOption, props: Partial<RadioProps>) => React.ReactNode;
}

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(({
  options,
  name,
  onChange,
  defaultValue = '',
  value: controlledValue,
  labelPosition = 'right',
  className = '',
  itemClassName = '',
  direction = 'column',
  inputClassName = '',
  labelClassName = '',
  onFocus,
  onBlur,
  size = 'medium',
  variant = 'default',
  disabled = false,
  required = false,
  error = false,
  errorMessage,
  helperText,
  label,
  groupLabelClassName = '',
  ripple = true,
  gap,
  style,
  readOnly = false,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  'data-testid': dataTestId,
  renderOption,
}, ref) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const groupId = useId();
  
  // Use controlled value if provided, otherwise use internal state
  const selectedValue = controlledValue !== undefined ? controlledValue : internalValue;
  
  // Generate IDs for accessibility
  const labelId = label ? `${groupId}-label` : undefined;
  const errorId = errorMessage ? `${groupId}-error` : undefined;
  const helperId = helperText ? `${groupId}-helper` : undefined;

  const handleChange = (optionValue: string | number) => {
    if (disabled || readOnly) return;
    
    if (controlledValue === undefined) {
      setInternalValue(optionValue);
    }
    onChange(optionValue);
  };

  // Determine gap class
  const gapClass = gap || (direction === 'row' ? 'gap-6' : 'gap-3');

  // Group wrapper classes
  const groupClasses = `
    flex ${direction === 'row' ? 'flex-row flex-wrap' : 'flex-col'} ${gapClass}
    ${className}
  `.trim();

  return (
    <div 
      ref={ref}
      className="flex flex-col"
      style={style}
      role="radiogroup"
      aria-label={ariaLabel}
      aria-labelledby={labelId}
      aria-describedby={[errorId, helperId, ariaDescribedBy].filter(Boolean).join(' ') || undefined}
      aria-required={required}
      aria-invalid={error}
      data-testid={dataTestId}
    >
      {/* Group Label */}
      {label && (
        <span 
          id={labelId}
          className={`text-sm font-medium text-gray-200 mb-2 ${groupLabelClassName}`}
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </span>
      )}

      {/* Radio Options */}
      <div className={groupClasses}>
        {options.map((option) => {
          const radioProps: Partial<RadioProps> = {
            labelPosition,
            className: itemClassName,
            label: option.label,
            name,
            value: option.value,
            checked: selectedValue === option.value,
            onChange: () => handleChange(option.value),
            disabled: disabled || option.disabled,
            size,
            variant: error ? 'error' : variant,
            defaultChecked: defaultValue === option.value,
            required: option.required,
            inputClassName,
            labelClassName,
            onBlur,
            onFocus,
            ripple,
            readOnly,
            description: option.description,
            helperText: option.helperText,
          };

          // Custom render function
          if (renderOption) {
            return (
              <React.Fragment key={option.value}>
                {renderOption(option, radioProps)}
              </React.Fragment>
            );
          }

          return (
            <RadioButton
              key={option.value}
              {...radioProps as RadioProps}
            />
          );
        })}
      </div>

      {/* Error message */}
      {error && errorMessage && (
        <span id={errorId} className="text-xs text-red-400 mt-2">
          {errorMessage}
        </span>
      )}

      {/* Helper text */}
      {!error && helperText && (
        <span id={helperId} className="text-xs text-gray-500 mt-2">
          {helperText}
        </span>
      )}
    </div>
  );
});

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;

// Export types for external use
export type { RadioSize, RadioVariant, RadioLabelPosition };