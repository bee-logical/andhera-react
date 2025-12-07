"use client";
import React, { forwardRef, useMemo, useId } from 'react';
import { classNames } from '@/utils/classNames';

/**
 * Size options for the ToggleSwitch
 */
export type ToggleSwitchSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Label placement options
 */
export type ToggleSwitchLabelPlacement = 'top' | 'bottom' | 'left' | 'right';

/**
 * Visual variant options
 */
export type ToggleSwitchVariant = 'default' | 'outlined' | 'filled';

/**
 * Props for the ToggleSwitch component
 */
export interface ToggleSwitchProps {
  /** Unique identifier for the switch */
  id?: string;
  /** Name attribute for form submission */
  name?: string;
  /** Controls the on/off state of the toggle switch */
  checked: boolean;
  /** Callback fired when the toggle state changes */
  onChange: (checked: boolean) => void;
  /** Callback fired when the switch loses focus */
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  /** Callback fired when the switch gains focus */
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  /** Label for the toggle switch */
  label?: React.ReactNode;
  /** Helper text displayed below the switch */
  helperText?: React.ReactNode;
  /** Error message displayed below the switch */
  error?: string;
  /** Placement of the label relative to the switch */
  labelPlacement?: ToggleSwitchLabelPlacement;
  /** Disables the toggle switch */
  disabled?: boolean;
  /** Marks the toggle switch as required (shows asterisk) */
  required?: boolean;
  /** Makes the switch read-only (can't be changed but not visually disabled) */
  readOnly?: boolean;
  /** Icon or content to display inside the toggle knob */
  icon?: React.ReactNode;
  /** Icon to show when switch is ON */
  checkedIcon?: React.ReactNode;
  /** Icon to show when switch is OFF */
  uncheckedIcon?: React.ReactNode;
  /** Size of the toggle switch */
  size?: ToggleSwitchSize;
  /** Visual variant of the switch */
  variant?: ToggleSwitchVariant;
  /** Custom CSS class for the wrapper container */
  className?: string;
  /** Custom CSS class for the switch button */
  switchClassName?: string;
  /** Custom CSS class for the label */
  labelClassName?: string;
  /** Custom CSS class for the knob/thumb */
  knobClassName?: string;
  /** Background color when checked (Tailwind class or custom) */
  checkedColor?: string;
  /** Background color when unchecked */
  uncheckedColor?: string;
  /** Border/focus ring color */
  borderFocusColor?: string;
  /** Knob/thumb color */
  knobColor?: string;
  /** Custom active (checked) knob color */
  activeKnobColor?: string;
  /** Loading state - shows spinner in knob */
  loading?: boolean;
  /** Tooltip text on hover */
  tooltip?: string;
  /** Accessibility label for screen readers */
  'aria-label'?: string;
  /** ID of element describing the switch */
  'aria-describedby'?: string;
  /** ID of element labelling the switch */
  'aria-labelledby'?: string;
  /** Test ID for testing frameworks */
  'data-testid'?: string;
  /** Tab index for keyboard navigation */
  tabIndex?: number;
}

// Size configurations
const sizeConfig: Record<ToggleSwitchSize, { 
  track: string; 
  knob: string; 
  translate: string; 
  icon: string;
  label: string;
  gap: string;
}> = {
  xs: { 
    track: 'h-4 w-7', 
    knob: 'h-3 w-3', 
    translate: 'translate-x-3',
    icon: 'text-[8px]',
    label: 'text-xs',
    gap: 'gap-1.5'
  },
  sm: { 
    track: 'h-5 w-9', 
    knob: 'h-4 w-4', 
    translate: 'translate-x-4',
    icon: 'text-[10px]',
    label: 'text-sm',
    gap: 'gap-2'
  },
  md: { 
    track: 'h-6 w-11', 
    knob: 'h-5 w-5', 
    translate: 'translate-x-5',
    icon: 'text-xs',
    label: 'text-sm',
    gap: 'gap-2'
  },
  lg: { 
    track: 'h-7 w-14', 
    knob: 'h-6 w-6', 
    translate: 'translate-x-7',
    icon: 'text-sm',
    label: 'text-base',
    gap: 'gap-3'
  },
  xl: { 
    track: 'h-8 w-16', 
    knob: 'h-7 w-7', 
    translate: 'translate-x-8',
    icon: 'text-base',
    label: 'text-lg',
    gap: 'gap-3'
  },
};

const ToggleSwitch = forwardRef<HTMLButtonElement, ToggleSwitchProps>(({
  id,
  name,
  checked,
  onChange,
  onBlur,
  onFocus,
  label,
  helperText,
  error,
  labelPlacement = 'right',
  disabled = false,
  required = false,
  readOnly = false,
  icon,
  checkedIcon,
  uncheckedIcon,
  size = 'md',
  variant = 'default',
  className = '',
  switchClassName = '',
  labelClassName = '',
  knobClassName = '',
  checkedColor = 'bg-[#FFCB00]',
  uncheckedColor = 'bg-gray-600',
  borderFocusColor = 'ring-[#FFCB00]',
  knobColor = 'bg-white',
  activeKnobColor,
  loading = false,
  tooltip,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  'aria-labelledby': ariaLabelledBy,
  'data-testid': dataTestId,
  tabIndex,
}, ref) => {
  const generatedId = useId();
  const switchId = id || generatedId;
  const helperId = `${switchId}-helper`;
  const errorId = `${switchId}-error`;
  
  const config = sizeConfig[size];

  const handleToggle = () => {
    if (!disabled && !readOnly && !loading) {
      onChange(!checked);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      handleToggle();
    }
  };

  // Determine track background color
  const trackBgColor = useMemo(() => {
    if (disabled) return checked ? 'bg-gray-500' : 'bg-gray-700';
    return checked ? checkedColor : uncheckedColor;
  }, [checked, disabled, checkedColor, uncheckedColor]);

  // Determine knob color
  const currentKnobColor = useMemo(() => {
    if (checked && activeKnobColor) return activeKnobColor;
    return knobColor;
  }, [checked, knobColor, activeKnobColor]);

  // Get current icon to display
  const currentIcon = useMemo(() => {
    if (loading) {
      return (
        <svg className="animate-spin" width="12" height="12" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
      );
    }
    if (checked && checkedIcon) return checkedIcon;
    if (!checked && uncheckedIcon) return uncheckedIcon;
    return icon;
  }, [loading, checked, checkedIcon, uncheckedIcon, icon]);

  // Variant-specific wrapper styles
  const variantWrapperStyles = useMemo(() => {
    switch (variant) {
      case 'outlined':
        return 'p-2 border border-gray-600 rounded-lg hover:border-gray-500';
      case 'filled':
        return 'p-2 bg-gray-800 rounded-lg';
      default:
        return '';
    }
  }, [variant]);

  // Build aria-describedby value
  const describedBy = useMemo(() => {
    const ids: string[] = [];
    if (ariaDescribedBy) ids.push(ariaDescribedBy);
    if (helperText) ids.push(helperId);
    if (error) ids.push(errorId);
    return ids.length > 0 ? ids.join(' ') : undefined;
  }, [ariaDescribedBy, helperText, error, helperId, errorId]);

  // Label content with required indicator
  const labelContent = label && (
    <label
      htmlFor={switchId}
      className={classNames(
        config.label,
        'text-gray-200 select-none',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        labelClassName
      )}
    >
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );

  // Helper/Error text
  const helperContent = (helperText || error) && (
    <div className="flex flex-col">
      {error && (
        <span id={errorId} className="text-red-500 text-xs mt-1">
          {error}
        </span>
      )}
      {helperText && !error && (
        <span id={helperId} className="text-gray-500 text-xs mt-1">
          {helperText}
        </span>
      )}
    </div>
  );

  // The switch button element
  const switchElement = (
    <button
      ref={ref}
      type="button"
      role="switch"
      id={switchId}
      name={name}
      aria-checked={checked}
      aria-label={ariaLabel || (typeof label === 'string' ? label : undefined)}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={describedBy}
      aria-disabled={disabled}
      aria-readonly={readOnly}
      aria-invalid={!!error}
      aria-required={required}
      disabled={disabled}
      tabIndex={disabled ? -1 : tabIndex}
      title={tooltip}
      data-testid={dataTestId}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      onBlur={onBlur}
      onFocus={onFocus}
      className={classNames(
        'relative inline-flex flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent',
        'transition-colors duration-200 ease-in-out',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        borderFocusColor,
        config.track,
        trackBgColor,
        disabled && 'opacity-50 cursor-not-allowed',
        readOnly && 'cursor-default',
        error && 'ring-2 ring-red-500 ring-offset-2',
        switchClassName
      )}
    >
      <span className="sr-only">
        {typeof label === 'string' ? label : 'Toggle switch'}
      </span>
      <span
        aria-hidden="true"
        className={classNames(
          'pointer-events-none inline-flex items-center justify-center rounded-full shadow ring-0',
          'transition-transform duration-200 ease-in-out',
          config.knob,
          currentKnobColor,
          checked ? config.translate : 'translate-x-0',
          knobClassName
        )}
      >
        {currentIcon && (
          <span className={classNames('text-gray-600 flex items-center justify-center', config.icon)}>
            {currentIcon}
          </span>
        )}
      </span>
    </button>
  );

  // Render based on label placement
  const renderContent = () => {
    const contentWithHelper = (mainContent: React.ReactNode, includeHelper: boolean = true) => (
      <div className="flex flex-col">
        {mainContent}
        {includeHelper && helperContent}
      </div>
    );

    switch (labelPlacement) {
      case 'top':
        return contentWithHelper(
          <div className={classNames('flex flex-col items-start', config.gap)}>
            {labelContent}
            {switchElement}
          </div>
        );
      case 'bottom':
        return contentWithHelper(
          <div className={classNames('flex flex-col items-start', config.gap)}>
            {switchElement}
            {labelContent}
          </div>
        );
      case 'left':
        return (
          <div className="flex flex-col">
            <div className={classNames('flex items-center', config.gap)}>
              {labelContent}
              {switchElement}
            </div>
            {helperContent}
          </div>
        );
      case 'right':
      default:
        return (
          <div className="flex flex-col">
            <div className={classNames('flex items-center', config.gap)}>
              {switchElement}
              {labelContent}
            </div>
            {helperContent}
          </div>
        );
    }
  };

  return (
    <div 
      className={classNames(
        'inline-flex',
        variantWrapperStyles,
        className
      )}
    >
      {renderContent()}
    </div>
  );
});

ToggleSwitch.displayName = 'ToggleSwitch';

export default ToggleSwitch;
