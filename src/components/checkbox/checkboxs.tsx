import React, { forwardRef, useId, useEffect, useRef } from "react";

/**
 * Checkbox Size Variants
 */
export type CheckboxSize = "small" | "medium" | "large";

/**
 * Checkbox Visual States
 */
export type CheckboxVariant = "primary" | "error" | "default";

/**
 * Checkbox State (controlled or uncontrolled)
 */
export type CheckboxState = "checked" | "unchecked" | "indeterminate";

/**
 * Label Position Options
 */
export type CheckboxLabelPosition = "left" | "right" | "top" | "bottom";

/**
 * Border Radius Options
 */
export type CheckboxBorderRadius = "none" | "sm" | "md" | "lg" | "full";

/**
 * Comprehensive Checkbox Props Interface
 */
export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
  /**
   * Checkbox label text
   */
  label?: string;

  /**
   * Description text below the label
   */
  description?: string;

  /**
   * Error message to display
   */
  error?: string;

  /**
   * Helper text to display
   */
  helperText?: string;

  /**
   * Checkbox size variant
   * @default "medium"
   */
  size?: CheckboxSize;

  /**
   * Visual style variant
   * @default "primary"
   */
  variant?: CheckboxVariant;

  /**
   * Custom color for checkbox when checked (overrides variant)
   */
  color?: string;

  /**
   * Custom focus ring color
   */
  focusRingColor?: string;

  /**
   * Focus ring width
   * @default "1px"
   */
  focusRingWidth?: string;

  /**
   * Controlled checked state
   */
  checked?: boolean;

  /**
   * Default checked state (uncontrolled)
   */
  defaultChecked?: boolean;

  /**
   * Indeterminate state (neither checked nor unchecked)
   */
  indeterminate?: boolean;

  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Required field indicator
   */
  required?: boolean;

  /**
   * Read-only state
   */
  readOnly?: boolean;

  /**
   * Change event handler
   */
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Focus event handler
   */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;

  /**
   * Blur event handler
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;

  /**
   * Custom className for the container
   */
  containerClassName?: string;

  /**
   * Custom className for the label
   */
  labelClassName?: string;

  /**
   * Custom className for the checkbox input
   */
  checkboxClassName?: string;

  /**
   * Label position relative to checkbox
   * @default "right"
   */
  labelPosition?: CheckboxLabelPosition;

  /**
   * Show focus ring on keyboard navigation
   * @default true
   */
  showFocusRing?: boolean;

  /**
   * Custom icon for checked state
   */
  checkedIcon?: React.ReactNode;

  /**
   * Custom icon for indeterminate state
   */
  indeterminateIcon?: React.ReactNode;

  /**
   * Name attribute for form submission
   */
  name?: string;

  /**
   * Value attribute for form submission
   */
  value?: string;
  
  /**
   * Enable/disable animations
   * @default true
   */
  animated?: boolean;
  
  /**
   * Custom border color when unchecked
   */
  borderColor?: string;
  
  /**
   * Custom border color on hover (unchecked state)
   */
  hoverBorderColor?: string;
  
  /**
   * Custom color for the checkmark/indeterminate icon
   */
  iconColor?: string;
  
  /**
   * Custom border radius for the checkbox
   * Can be a predefined option or a custom CSS value
   */
  borderRadius?: CheckboxBorderRadius | string;
  
  /**
   * Tooltip text shown on hover
   */
  tooltip?: string;
  
  /**
   * Auto-focus the checkbox on mount
   */
  autoFocus?: boolean;
  
  /**
   * Inline styles for the label element
   */
  labelStyle?: React.CSSProperties;
  
  /**
   * Inline styles for the checkbox element
   */
  checkboxStyle?: React.CSSProperties;

  /**
   * Form validation pattern
   */
  "aria-invalid"?: boolean;

  /**
   * Accessibility label
   */
  "aria-label"?: string;

  /**
   * Accessibility described by
   */
  "aria-describedby"?: string;

  /**
   * Test ID for testing
   */
  "data-testid"?: string;
}

/**
 * Default CheckIcon Component
 */
const CheckIcon: React.FC<{ className?: string; color?: string }> = ({ className, color = 'currentColor' }) => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M8.5 2.5L3.75 7.25L1.5 5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Default IndeterminateIcon Component
 */
const IndeterminateIcon: React.FC<{ className?: string; color?: string }> = ({ className, color = 'currentColor' }) => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M2.5 5H7.5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Enterprise-level Checkbox Component
 * 
 * A fully customizable checkbox component with comprehensive features:
 * - Multiple sizes (small, medium, large)
 * - Visual variants (primary, error, default)
 * - Indeterminate state support
 * - Keyboard navigation and accessibility
 * - Label positioning (left, right, top, bottom)
 * - Error and helper text display
 * - Focus states and hover effects
 * - Disabled and read-only states
 * - Custom icons support
 * - Full form integration
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Checkbox label="Accept terms" />
 * 
 * // Controlled with state
 * const [checked, setChecked] = useState(false);
 * <Checkbox 
 *   label="Subscribe to newsletter" 
 *   checked={checked} 
 *   onChange={(value) => setChecked(value)} 
 * />
 * 
 * // With error state
 * <Checkbox 
 *   label="Required field" 
 *   variant="error" 
 *   error="This field is required" 
 *   required 
 * />
 * 
 * // Indeterminate state
 * <Checkbox 
 *   label="Select all" 
 *   indeterminate={true} 
 * />
 * 
 * // With description
 * <Checkbox 
 *   label="Enable notifications" 
 *   description="Receive email updates about your account" 
 *   helperText="You can change this later in settings" 
 * />
 * ```
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      description,
      error,
      helperText,
      size = "medium",
      variant = "primary",
      color,
      focusRingColor,
      focusRingWidth = "1px",
      checked,
      defaultChecked,
      indeterminate = false,
      disabled = false,
      required = false,
      readOnly = false,
      onChange,
      onFocus,
      onBlur,
      containerClassName = "",
      labelClassName = "",
      checkboxClassName = "",
      labelPosition = "right",
      showFocusRing = true,
      checkedIcon,
      indeterminateIcon,
      name,
      value,
      animated = true,
      borderColor,
      hoverBorderColor,
      iconColor,
      borderRadius,
      tooltip,
      autoFocus,
      labelStyle,
      checkboxStyle,
      "aria-invalid": ariaInvalid,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedBy,
      "data-testid": dataTestId,
      className,
      id: providedId,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;
    const descriptionId = `${id}-description`;
    
    // Internal ref for managing indeterminate state
    const internalRef = useRef<HTMLInputElement | null>(null);

    // Sync indeterminate state to DOM (indeterminate can only be set via JavaScript)
    useEffect(() => {
      const checkbox = internalRef.current;
      if (checkbox) {
        checkbox.indeterminate = indeterminate;
      }
    }, [indeterminate]);
    
    // Auto-focus effect
    useEffect(() => {
      if (autoFocus && internalRef.current) {
        internalRef.current.focus();
      }
    }, [autoFocus]);

    // Handle change event
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled || readOnly) return;
      onChange?.(event.target.checked, event);
    };

    // Size classes
    const sizeClasses = {
      small: {
        checkbox: "w-[18px] h-[18px]",
        icon: "w-[8px] h-[8px]",
        label: "text-sm",
        description: "text-xs",
      },
      medium: {
        checkbox: "w-[22px] h-[22px]",
        icon: "w-[10px] h-[10px]",
        label: "text-base",
        description: "text-sm",
      },
      large: {
        checkbox: "w-[26px] h-[26px]",
        icon: "w-[12px] h-[12px]",
        label: "text-lg",
        description: "text-base",
      },
    };

    // Get color based on custom color prop or variant
    const getColor = () => {
      if (color) return color;
      if (variant === "error") return "#E7000B";
      if (variant === "primary") return "#FFCB00";
      return "#000000";
    };
    
    // Get border color for unchecked state
    const getBorderColor = () => {
      if (borderColor) return borderColor;
      if (variant === "error") return "#E7000B";
      return "#737373";
    };
    
    // Get hover border color
    const getHoverBorderColor = () => {
      if (hoverBorderColor) return hoverBorderColor;
      return getColor();
    };
    
    // Get icon color
    const getIconColor = () => {
      if (iconColor) return iconColor;
      return "#000000";
    };
    
    // Get border radius
    const getBorderRadius = () => {
      if (!borderRadius) return "5.5px";
      
      // Map predefined options to CSS values
      const radiusMap: Record<CheckboxBorderRadius, string> = {
        none: "0px",
        sm: "2px",
        md: "4px",
        lg: "6px",
        full: "50%",
      };
      
      // Check if it's a predefined option
      if (borderRadius in radiusMap) {
        return radiusMap[borderRadius as CheckboxBorderRadius];
      }
      
      // Otherwise, use the value directly (custom CSS value)
      return borderRadius;
    };

    // Get focus ring color
    const getFocusRingColor = () => {
      if (focusRingColor) return focusRingColor;
      if (color) return color;
      if (variant === "error") return "rgba(231, 0, 11, 0.3)";
      if (variant === "primary") return "rgba(255, 203, 0, 0.3)";
      return "rgba(0, 0, 0, 0.2)";
    };
    
    // Get transition classes based on animated prop
    const getTransitionClasses = () => {
      return animated ? "transition-all duration-200 ease-in-out" : "";
    };

    // Get icon animation classes
    const getIconAnimationClasses = () => {
      return animated ? "animate-checkbox-check" : "";
    };

    // Get scale transform for checkbox on check
    const getScaleTransform = () => {
      if (!animated) return {};
      return (checked || indeterminate) ? { transform: 'scale(1)' } : { transform: 'scale(1)' };
    };

    // Variant classes
    const getCheckboxClasses = () => {
      const baseClasses =
        `relative shrink-0 cursor-pointer appearance-none ${getTransitionClasses()}`;
      const focusClasses = showFocusRing
        ? "focus-visible:outline-none"
        : "focus:outline-none";

      // Disabled state
      if (disabled) {
        return `${baseClasses} ${sizeClasses[size].checkbox} bg-gray-200 border-[1.375px] border-gray-400 cursor-not-allowed opacity-50`;
      }
      
      // Checked or Indeterminate state - no border, just background color
      if (checked || indeterminate) {
        return `${baseClasses} ${sizeClasses[size].checkbox} border-0 ${focusClasses}`;
      }

      // Unchecked state - dark theme with border
      return `${baseClasses} ${sizeClasses[size].checkbox} bg-[#262626] border-[1.375px] ${focusClasses}`;
    };

    // Container layout classes
    const getContainerClasses = () => {
      const baseClasses = "inline-flex items-start gap-2";
      
      if (labelPosition === "top") {
        return `${baseClasses} flex-col-reverse`;
      } else if (labelPosition === "bottom") {
        return `${baseClasses} flex-col`;
      } else if (labelPosition === "left") {
        return `${baseClasses} flex-row-reverse`;
      } else {
        return `${baseClasses} flex-row`;
      }
    };

    // Label classes
    const getLabelClasses = () => {
      const baseClasses = `${sizeClasses[size].label} select-none`;
      const disabledClasses = disabled ? "text-gray-400 cursor-not-allowed" : "text-white cursor-pointer";
      return `${baseClasses} ${disabledClasses}`;
    };

    // Render checkbox input with icon
    const renderCheckbox = () => {
      const checkboxColor = getColor();
      const ringColor = getFocusRingColor();
      
      return (
        <div className="relative inline-flex items-center justify-center">
          <input
            ref={(node) => {
              // Handle both forwarded ref and internal ref
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref) {
                (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
              }
              if (internalRef) {
                internalRef.current = node;
              }
            }}
            type="checkbox"
            id={id}
            name={name}
            value={value}
            checked={checked}
            defaultChecked={defaultChecked}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            onChange={handleChange}
            aria-invalid={ariaInvalid || !!error}
            aria-label={ariaLabel || label}
            aria-describedby={
              ariaDescribedBy ||
              [error && errorId, helperText && helperId, description && descriptionId]
                .filter(Boolean)
                .join(" ") ||
              undefined
            }
            data-testid={dataTestId}
            title={tooltip}
            className={`${getCheckboxClasses()} ${checkboxClassName} ${className || ""}`}
            style={{
              backgroundColor: (checked || indeterminate) && !disabled ? checkboxColor : undefined,
              borderColor: !disabled && !(checked || indeterminate) ? getBorderColor() : undefined,
              borderRadius: getBorderRadius(),
              boxShadow: showFocusRing ? undefined : 'none',
              ...checkboxStyle,
              ...(rest.style || {})
            }}
            onMouseEnter={(e) => {
              if (!disabled && !readOnly && !(checked || indeterminate) && animated) {
                e.currentTarget.style.borderColor = getHoverBorderColor();
              }
            }}
            onMouseLeave={(e) => {
              if (!disabled && !readOnly && !(checked || indeterminate) && animated) {
                e.currentTarget.style.borderColor = getBorderColor();
              }
            }}
            onFocusCapture={(e) => {
              if (showFocusRing) {
                e.currentTarget.style.boxShadow = `0 0 0 ${focusRingWidth} ${ringColor}`;
              }
              onFocus?.(e as any);
            }}
            onBlurCapture={(e) => {
              if (showFocusRing) {
                e.currentTarget.style.boxShadow = 'none';
              }
              onBlur?.(e as any);
            }}
            {...rest}
          />
        
          {/* Checkmark or Indeterminate Icon */}
          {(checked || indeterminate) && (
            <div 
              className={`absolute inset-0 flex items-center justify-center pointer-events-none ${getIconAnimationClasses()}`}
              style={animated ? {
                animation: 'checkboxPopIn 0.2s ease-out'
              } : undefined}
            >
              {indeterminate ? (
                indeterminateIcon || (
                  <IndeterminateIcon className={sizeClasses[size].icon} color={getIconColor()} />
                )
              ) : (
                checkedIcon || (
                  <CheckIcon className={sizeClasses[size].icon} color={getIconColor()} />
                )
              )}
            </div>
          )}
        </div>
      );
    };

    // Render label and description
    const renderLabel = () => {
      if (!label && !description) return null;

      return (
        <div className="flex flex-col gap-0.5">
          {label && (
            <label 
              htmlFor={id} 
              className={`${getLabelClasses()} ${labelClassName}`}
              style={labelStyle}
            >
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
          {description && (
            <span
              id={descriptionId}
              className={`${sizeClasses[size].description} ${
                disabled ? "text-gray-400" : "text-gray-300"
              }`}
            >
              {description}
            </span>
          )}
        </div>
      );
    };

    return (
      <div className="inline-flex flex-col gap-1">
        {/* Keyframes for animation */}
        {animated && (
          <style>{`
            @keyframes checkboxPopIn {
              0% {
                transform: scale(0);
                opacity: 0;
              }
              50% {
                transform: scale(1.2);
              }
              100% {
                transform: scale(1);
                opacity: 1;
              }
            }
          `}</style>
        )}
        {/* Main checkbox container */}
        <div className={`${getContainerClasses()} ${containerClassName}`}>
          {renderCheckbox()}
          {renderLabel()}
        </div>

        {/* Error message */}
        {error && (
          <div id={errorId} className="text-sm text-red-600 ml-6" role="alert">
            {error}
          </div>
        )}

        {/* Helper text */}
        {helperText && !error && (
          <div id={helperId} className="text-sm text-gray-500 ml-6">
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

/**
 * Checkbox Group Component for managing multiple checkboxes
 */
export interface CheckboxGroupProps {
  /**
   * Group label
   */
  label?: string;

  /**
   * Group description
   */
  description?: string;

  /**
   * Array of checkbox options
   */
  options: Array<{
    label: string;
    value: string;
    description?: string;
    disabled?: boolean;
    tooltip?: string;
  }>;

  /**
   * Selected values (controlled)
   */
  value?: string[];

  /**
   * Default selected values (uncontrolled)
   */
  defaultValue?: string[];

  /**
   * Change handler
   */
  onChange?: (values: string[]) => void;

  /**
   * Disable all checkboxes
   */
  disabled?: boolean;

  /**
   * Layout direction
   * @default "vertical"
   */
  direction?: "vertical" | "horizontal";

  /**
   * Size variant
   */
  size?: CheckboxSize;

  /**
   * Visual variant
   */
  variant?: CheckboxVariant;

  /**
   * Custom color for checkboxes
   */
  color?: string;

  /**
   * Custom focus ring color
   */
  focusRingColor?: string;

  /**
   * Focus ring width
   */
  focusRingWidth?: string;

  /**
   * Required field
   */
  required?: boolean;

  /**
   * Error message
   */
  error?: string;

  /**
   * Custom className
   */
  className?: string;

  /**
   * Name for form submission
   */
  name?: string;

  /**
   * Helper text displayed below the group
   */
  helperText?: string;

  /**
   * Enable animation effects
   * @default true
   */
  animated?: boolean;

  /**
   * Custom icon color when checked
   */
  iconColor?: string;

  /**
   * Custom border color for checkboxes
   */
  borderColor?: string;

  /**
   * Border color on hover
   */
  hoverBorderColor?: string;

  /**
   * Border radius for checkboxes
   * @default "md"
   */
  borderRadius?: "none" | "sm" | "md" | "lg" | "full";

  /**
   * Label position for all checkboxes
   * @default "right"
   */
  labelPosition?: CheckboxLabelPosition;

  /**
   * Custom gap between checkboxes
   */
  gap?: string;

  /**
   * Show "Select All" checkbox
   * @default false
   */
  showSelectAll?: boolean;

  /**
   * Label for "Select All" checkbox
   * @default "Select All"
   */
  selectAllLabel?: string;

  /**
   * Minimum number of selections required
   */
  minSelections?: number;

  /**
   * Maximum number of selections allowed
   */
  maxSelections?: number;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  description,
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  disabled = false,
  direction = "vertical",
  size = "medium",
  variant = "primary",
  color,
  focusRingColor,
  focusRingWidth,
  required = false,
  error,
  className = "",
  name,
  helperText,
  animated = true,
  iconColor,
  borderColor,
  hoverBorderColor,
  borderRadius,
  labelPosition = "right",
  gap,
  showSelectAll = false,
  selectAllLabel = "Select All",
  minSelections,
  maxSelections,
}) => {
  const [internalValue, setInternalValue] = React.useState<string[]>(
    defaultValue || []
  );

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  // Calculate if all or some options are selected
  const enabledOptions = options.filter(opt => !opt.disabled);
  const allSelected = enabledOptions.length > 0 && enabledOptions.every(opt => currentValue.includes(opt.value));
  const someSelected = enabledOptions.some(opt => currentValue.includes(opt.value)) && !allSelected;

  const handleCheckboxChange = (optionValue: string, checked: boolean) => {
    let newValue: string[];
    
    if (checked) {
      // Check maxSelections limit
      if (maxSelections !== undefined && currentValue.length >= maxSelections) {
        return; // Don't allow more selections
      }
      newValue = [...currentValue, optionValue];
    } else {
      // Check minSelections limit
      if (minSelections !== undefined && currentValue.length <= minSelections) {
        return; // Don't allow fewer selections
      }
      newValue = currentValue.filter((v) => v !== optionValue);
    }

    if (!isControlled) {
      setInternalValue(newValue);
    }

    onChange?.(newValue);
  };

  const handleSelectAll = (checked: boolean) => {
    let newValue: string[];
    
    if (checked) {
      // Select all enabled options (respecting maxSelections)
      const allEnabledValues = enabledOptions.map(opt => opt.value);
      if (maxSelections !== undefined) {
        newValue = allEnabledValues.slice(0, maxSelections);
      } else {
        newValue = allEnabledValues;
      }
    } else {
      // Deselect all (respecting minSelections)
      if (minSelections !== undefined && minSelections > 0) {
        newValue = currentValue.slice(0, minSelections);
      } else {
        newValue = [];
      }
    }

    if (!isControlled) {
      setInternalValue(newValue);
    }

    onChange?.(newValue);
  };

  const defaultGap = direction === "horizontal" ? "gap-4" : "gap-3";
  const customGap = gap ? `gap-[${gap}]` : defaultGap;

  const directionClasses =
    direction === "horizontal"
      ? `flex flex-row flex-wrap ${customGap}`
      : `flex flex-col ${customGap}`;

  // Shared checkbox props
  const sharedCheckboxProps = {
    size,
    variant,
    color,
    focusRingColor,
    focusRingWidth,
    animated,
    iconColor,
    borderColor,
    hoverBorderColor,
    borderRadius,
    labelPosition,
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {/* Group Label */}
      {label && (
        <div className="flex flex-col gap-1">
          <div className="text-base font-medium text-gray-900">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </div>
          {description && (
            <div className="text-sm text-gray-600">{description}</div>
          )}
        </div>
      )}

      {/* Select All Checkbox */}
      {showSelectAll && (
        <div className="border-b border-gray-200 pb-2 mb-1">
          <Checkbox
            label={selectAllLabel}
            checked={allSelected}
            indeterminate={someSelected}
            onChange={handleSelectAll}
            disabled={disabled}
            {...sharedCheckboxProps}
          />
        </div>
      )}

      {/* Checkboxes */}
      <div className={directionClasses} role="group" aria-label={label}>
        {options.map((option) => {
          const isChecked = currentValue.includes(option.value);
          const isDisabled = disabled || option.disabled || 
            (maxSelections !== undefined && !isChecked && currentValue.length >= maxSelections);
          
          return (
            <Checkbox
              key={option.value}
              label={option.label}
              description={option.description}
              name={name}
              value={option.value}
              checked={isChecked}
              onChange={(checked) => handleCheckboxChange(option.value, checked)}
              disabled={isDisabled}
              tooltip={option.tooltip}
              {...sharedCheckboxProps}
            />
          );
        })}
      </div>

      {/* Helper Text */}
      {helperText && !error && (
        <div className="text-sm text-gray-500">
          {helperText}
          {minSelections !== undefined && maxSelections !== undefined && (
            <span className="ml-1">
              (Select {minSelections}-{maxSelections})
            </span>
          )}
          {minSelections !== undefined && maxSelections === undefined && (
            <span className="ml-1">(Min: {minSelections})</span>
          )}
          {maxSelections !== undefined && minSelections === undefined && (
            <span className="ml-1">(Max: {maxSelections})</span>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="text-sm text-red-600" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

CheckboxGroup.displayName = "CheckboxGroup";

export default Checkbox;
