import React, { forwardRef } from "react";

/**
 * Radio button size options
 */
export type RadioSize = 'small' | 'medium' | 'large';

/**
 * Radio button color/variant options
 */
export type RadioVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';

/**
 * Label position options
 */
export type RadioLabelPosition = 'left' | 'right' | 'top' | 'bottom';

export interface RadioProps {
  /** Unique identifier for the radio button */
  id?: string;
  
  /** Name attribute for grouping radio buttons */
  name?: string;
  
  /** Value of the radio button */
  value?: string | number;
  
  /** Label text displayed next to the radio button */
  label?: React.ReactNode;
  
  /** Controlled checked state */
  checked?: boolean;
  
  /** Default checked state for uncontrolled component */
  defaultChecked?: boolean;
  
  /** Whether the radio button is disabled */
  disabled?: boolean;
  
  /** Whether the radio button is read-only */
  readOnly?: boolean;
  
  /** Callback fired when the checked state changes */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  
  /** Additional CSS classes for the wrapper */
  className?: string;
  
  /** Additional CSS classes for the label */
  labelClassName?: string;
  
  /** Additional CSS classes for the radio input */
  inputClassName?: string;
  
  /** Whether selection is required */
  required?: boolean;
  
  /** Position of the label relative to the radio button. RadioLabelPosition type: 'left' | 'right' | 'top' | 'bottom' */
  labelPosition?: RadioLabelPosition;
  
  /** Size of the radio button. RadioSize type: 'small' | 'medium' | 'large' */
  size?: RadioSize;
  
  /** Color variant of the radio button. RadioVariant type: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' */
  variant?: RadioVariant;
  
  /** Callback fired when the radio button receives focus */
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  
  /** Callback fired when the radio button loses focus */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  
  /** Custom styles for the wrapper */
  style?: React.CSSProperties;
  
  /** Custom styles for the label */
  labelStyle?: React.CSSProperties;
  
  /** Description text displayed below the label */
  description?: React.ReactNode;
  
  /** Additional CSS classes for the description */
  descriptionClassName?: string;
  
  /** Error state */
  error?: boolean;
  
  /** Error message to display */
  errorMessage?: string;
  
  /** Helper text displayed below the radio button */
  helperText?: string;
  
  /** Whether to show a ripple effect on interaction */
  ripple?: boolean;
  
  /** Custom icon for checked state */
  checkedIcon?: React.ReactNode;
  
  /** Custom icon for unchecked state */
  uncheckedIcon?: React.ReactNode;
  
  /** ARIA label for accessibility */
  'aria-label'?: string;
  
  /** ARIA described by for accessibility */
  'aria-describedby'?: string;
  
  /** Test ID for automated testing */
  'data-testid'?: string;
  
  /** Tab index for keyboard navigation */
  tabIndex?: number;
}

// Size configurations
const sizeConfig: Record<RadioSize, { outer: string; inner: string; gap: string; labelSize: string }> = {
  small: { outer: 'w-4 h-4', inner: 'w-2 h-2', gap: 'gap-1.5', labelSize: 'text-xs' },
  medium: { outer: 'w-5 h-5', inner: 'w-3 h-3', gap: 'gap-2', labelSize: 'text-sm' },
  large: { outer: 'w-6 h-6', inner: 'w-3.5 h-3.5', gap: 'gap-2.5', labelSize: 'text-base' },
};

// Variant color configurations
const variantConfig: Record<RadioVariant, { border: string; checked: string; dot: string; focus: string }> = {
  default: { 
    border: 'border-gray-400', 
    checked: 'checked:border-[#FFCB00]', 
    dot: 'bg-[#FFCB00]',
    focus: 'focus-visible:ring-[#FFCB00]/30'
  },
  primary: { 
    border: 'border-gray-400', 
    checked: 'checked:border-blue-500', 
    dot: 'bg-blue-500',
    focus: 'focus-visible:ring-blue-500/30'
  },
  success: { 
    border: 'border-gray-400', 
    checked: 'checked:border-emerald-500', 
    dot: 'bg-emerald-500',
    focus: 'focus-visible:ring-emerald-500/30'
  },
  warning: { 
    border: 'border-gray-400', 
    checked: 'checked:border-amber-500', 
    dot: 'bg-amber-500',
    focus: 'focus-visible:ring-amber-500/30'
  },
  error: { 
    border: 'border-gray-400', 
    checked: 'checked:border-red-500', 
    dot: 'bg-red-500',
    focus: 'focus-visible:ring-red-500/30'
  },
  info: { 
    border: 'border-gray-400', 
    checked: 'checked:border-cyan-500', 
    dot: 'bg-cyan-500',
    focus: 'focus-visible:ring-cyan-500/30'
  },
};

const RadioButton = forwardRef<HTMLInputElement, RadioProps>(({
  id,
  name,
  value,
  label,
  checked,
  defaultChecked,
  disabled = false,
  readOnly = false,
  onChange,
  className = "",
  labelClassName = "",
  inputClassName = "",
  required = false,
  labelPosition = "right",
  size = "medium",
  variant = "default",
  onBlur,
  onFocus,
  style,
  labelStyle,
  description,
  descriptionClassName = "",
  error = false,
  errorMessage,
  helperText,
  ripple = true,
  checkedIcon,
  uncheckedIcon,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  'data-testid': dataTestId,
  tabIndex,
}, ref) => {
  const sizeStyles = sizeConfig[size];
  const variantStyles = variantConfig[error ? 'error' : variant];
  
  // Generate unique IDs for accessibility
  const uniqueId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;
  const descriptionId = description ? `${uniqueId}-description` : undefined;
  const errorId = errorMessage ? `${uniqueId}-error` : undefined;
  const helperId = helperText ? `${uniqueId}-helper` : undefined;

  // Determine flex direction based on label position
  const getFlexDirection = () => {
    switch (labelPosition) {
      case 'left': return 'flex-row-reverse';
      case 'right': return 'flex-row';
      case 'top': return 'flex-col-reverse';
      case 'bottom': return 'flex-col';
      default: return 'flex-row';
    }
  };

  // Wrapper classes
  const wrapperClasses = `
    inline-flex items-center ${sizeStyles.gap} select-none
    ${disabled ? "cursor-not-allowed opacity-50" : readOnly ? "cursor-default" : "cursor-pointer"}
    ${getFlexDirection()}
    ${className}
  `.trim();

  // Input classes
  const inputClasses = `
    peer appearance-none ${sizeStyles.outer} rounded-full border-2 
    ${variantStyles.border} ${variantStyles.checked}
    transition-all duration-200 outline-none
    focus-visible:ring-4 ${variantStyles.focus}
    ${disabled ? 'cursor-not-allowed' : readOnly ? 'cursor-default' : 'cursor-pointer'}
    ${error ? 'border-red-500' : ''}
    ${inputClassName}
  `.trim();

  // Label classes
  const labelClasses = `
    ${sizeStyles.labelSize} text-gray-200
    ${disabled ? 'text-gray-500' : ''}
    ${error ? 'text-red-400' : ''}
    ${labelClassName}
  `.trim();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || readOnly) return;
    onChange?.(e);
  };

  // Custom icon rendering
  const renderRadioVisual = () => {
    if (checkedIcon || uncheckedIcon) {
      return (
        <span className="relative flex items-center justify-center">
          <input
            ref={ref}
            id={uniqueId}
            type="radio"
            name={name}
            value={value}
            checked={checked}
            defaultChecked={defaultChecked}
            disabled={disabled}
            readOnly={readOnly}
            onChange={handleChange}
            required={required}
            className="peer sr-only"
            onBlur={onBlur}
            onFocus={onFocus}
            aria-label={ariaLabel}
            aria-describedby={[descriptionId, errorId, helperId, ariaDescribedBy].filter(Boolean).join(' ') || undefined}
            data-testid={dataTestId}
            tabIndex={tabIndex}
          />
          <span className={`
            ${sizeStyles.outer} flex items-center justify-center
            transition-all duration-200
            ${disabled ? 'opacity-50' : ''}
          `}>
            <span className="peer-checked:hidden">{uncheckedIcon}</span>
            <span className="hidden peer-checked:block">{checkedIcon}</span>
          </span>
        </span>
      );
    }

    return (
      <span className="relative flex items-center justify-center">
        <input
          ref={ref}
          id={uniqueId}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          readOnly={readOnly}
          onChange={handleChange}
          required={required}
          className={inputClasses}
          onBlur={onBlur}
          onFocus={onFocus}
          aria-label={ariaLabel}
          aria-describedby={[descriptionId, errorId, helperId, ariaDescribedBy].filter(Boolean).join(' ') || undefined}
          data-testid={dataTestId}
          tabIndex={tabIndex}
        />

        {/* Ripple/Hover effect */}
        {ripple && !disabled && (
          <span
            className={`
              absolute ${sizeStyles.outer} rounded-full pointer-events-none
              transition-all duration-200
              peer-hover:shadow-[0_0_0_8px_rgba(255,203,0,0.12)]
              peer-focus-visible:shadow-[0_0_0_8px_rgba(255,203,0,0.20)]
            `}
          />
        )}

        {/* Inner dot */}
        <span
          className={`
            absolute ${sizeStyles.inner} ${variantStyles.dot} rounded-full
            scale-0 transition-transform duration-200
            peer-checked:scale-100
          `}
        />
      </span>
    );
  };

  return (
    <div className="inline-flex flex-col">
      <label 
        htmlFor={uniqueId} 
        className={wrapperClasses}
        style={style}
      >
        {renderRadioVisual()}

        {/* Label with optional description */}
        {(label || description) && (
          <span className="flex flex-col">
            {label && (
              <span className={labelClasses} style={labelStyle}>
                {label}
                {required && <span className="text-red-500 ml-0.5">*</span>}
              </span>
            )}
            {description && (
              <span 
                id={descriptionId}
                className={`text-xs text-gray-400 mt-0.5 ${descriptionClassName}`}
              >
                {description}
              </span>
            )}
          </span>
        )}
      </label>

      {/* Error message */}
      {error && errorMessage && (
        <span id={errorId} className="text-xs text-red-400 mt-1 ml-7">
          {errorMessage}
        </span>
      )}

      {/* Helper text */}
      {!error && helperText && (
        <span id={helperId} className="text-xs text-gray-500 mt-1 ml-7">
          {helperText}
        </span>
      )}
    </div>
  );
});

RadioButton.displayName = 'RadioButton';

export default RadioButton;