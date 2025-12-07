"use client";
import React, { forwardRef, ButtonHTMLAttributes, useMemo } from 'react';
import { classNames } from '@/utils/classNames';

/**
 * Visual style variants for the ToggleButton
 */
export type ToggleButtonVariant = 'primary' | 'secondary' | 'light' | 'outline' | 'ghost';

/**
 * Size options for the ToggleButton
 */
export type ToggleButtonSize = 'xs' | 'small' | 'medium' | 'large' | 'xl';

/**
 * Alignment/orientation of the ToggleButton within a group
 */
export type ToggleButtonAlignment = 'horizontal' | 'vertical';

/**
 * Border radius style options
 */
export type ToggleButtonRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Props for the ToggleButton component
 */
export interface ToggleButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value' | 'onChange'> {
  /** Value associated with this toggle button */
  value: string | boolean;
  /** Whether the button is currently active/selected */
  isActive?: boolean;
  /** Click handler for the button */
  onClick?: () => void;
  /** Button content (text, icons, or any ReactNode) */
  children?: React.ReactNode;
  /** Internal prop - indicates if this is the first button in a group */
  isFirst?: boolean;
  /** Internal prop - indicates if this is the last button in a group */
  isLast?: boolean;
  /** Disables the button and prevents interaction */
  disabled?: boolean;
  /** Visual style variant */
  variant?: ToggleButtonVariant;
  /** Layout direction when used in a group */
  alignment?: ToggleButtonAlignment;
  /** Size of the button */
  size?: ToggleButtonSize;
  /** Border radius style */
  radius?: ToggleButtonRadius;
  /** Additional CSS classes for the button */
  className?: string;
  /** Additional HTML attributes to spread on the button element */
  inputProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  /** Custom CSS classes applied when button is active (overrides default active styles) */
  customActiveClassName?: string;
  /** Custom CSS classes applied when button is inactive */
  customInactiveClassName?: string;
  /** Icon to display before the button text */
  startIcon?: React.ReactNode;
  /** Icon to display after the button text */
  endIcon?: React.ReactNode;
  /** If true, only renders the icon (requires startIcon or endIcon) */
  iconOnly?: boolean;
  /** Custom background color for inactive state */
  backgroundColor?: string;
  /** Custom text color for inactive state */
  textColor?: string;
  /** Custom border color */
  borderColor?: string;
  /** Custom background color when active */
  activeBackgroundColor?: string;
  /** Custom text color when active */
  activeTextColor?: string;
  /** Custom border color when active */
  activeBorderColor?: string;
  /** Disables hover effects */
  disableRipple?: boolean;
  /** Full width button */
  fullWidth?: boolean;
  /** Tooltip text on hover */
  tooltip?: string;
  /** Accessibility label for screen readers */
  'aria-label'?: string;
  /** ID of element describing the button */
  'aria-describedby'?: string;
  /** Indicates if the button is pressed (for accessibility) */
  'aria-pressed'?: boolean;
}

const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>(({
  value,
  isActive = false,
  onClick = () => {},
  children,
  isFirst,
  isLast,
  disabled = false,
  variant = 'primary',
  alignment = 'horizontal',
  size = 'medium',
  radius,
  className = '',
  inputProps,
  customActiveClassName,
  customInactiveClassName,
  startIcon,
  endIcon,
  iconOnly = false,
  backgroundColor,
  textColor,
  borderColor,
  activeBackgroundColor,
  activeTextColor,
  activeBorderColor,
  disableRipple = false,
  fullWidth = false,
  tooltip,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  'aria-pressed': ariaPressed,
  ...rest
}, ref) => {
  // Determine border radius based on position in group or explicit radius prop
  const borderRadiusClasses = useMemo(() => {
    // If explicit radius is provided, use it for standalone buttons
    if (radius) {
      const radiusMap: Record<ToggleButtonRadius, string> = {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        full: 'rounded-full',
      };
      return radiusMap[radius];
    }

    // For grouped buttons, apply radius only to first/last
    if (variant === 'secondary') {
      if (isFirst) {
        return alignment === 'horizontal' ? 'rounded-l-3xl' : 'rounded-t-3xl';
      }
      if (isLast) {
        return alignment === 'horizontal' ? 'rounded-r-3xl' : 'rounded-b-3xl';
      }
      return '';
    }

    // Default radius for other variants
    if (isFirst) {
      return alignment === 'horizontal'
        ? 'rounded-tl-lg rounded-bl-lg'
        : 'rounded-tl-lg rounded-tr-lg';
    }
    if (isLast) {
      return alignment === 'horizontal'
        ? 'rounded-tr-lg rounded-br-lg'
        : 'rounded-bl-lg rounded-br-lg';
    }
    return '';
  }, [radius, variant, isFirst, isLast, alignment]);

  // Base styles for all variants
  const baseClasses = classNames(
    'inline-flex items-center justify-center gap-2 font-medium',
    'border transition-all duration-200 ease-in-out',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow-400',
    !disableRipple && 'active:scale-[0.98]',
    fullWidth && 'w-full',
    disabled && 'cursor-not-allowed opacity-50'
  );

  // Variant-specific styles for inactive state
  const inactiveStyles: Record<ToggleButtonVariant, string> = {
    primary: 'border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-gray-100',
    secondary: 'border-gray-600 bg-gray-900 text-gray-300 hover:bg-gray-700',
    light: 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
    outline: 'border-gray-500 bg-transparent text-gray-300 hover:bg-gray-800 hover:border-gray-400',
    ghost: 'border-transparent bg-transparent text-gray-400 hover:bg-gray-800 hover:text-gray-200',
  };

  // Variant-specific styles for active state
  const activeStyles: Record<ToggleButtonVariant, string> = {
    primary: 'border-yellow-500 bg-[#FFCB00] text-black hover:bg-yellow-400',
    secondary: 'border-yellow-500 bg-[#FFCB00] text-black hover:bg-yellow-400',
    light: 'border-gray-400 bg-gray-200 text-gray-900 hover:bg-gray-300',
    outline: 'border-[#FFCB00] bg-transparent text-[#FFCB00] hover:bg-yellow-500/10',
    ghost: 'border-transparent bg-gray-700 text-white hover:bg-gray-600',
  };

  // Disabled styles
  const disabledStyles = 'border-gray-700 bg-gray-800 text-gray-500 cursor-not-allowed hover:bg-gray-800';

  // Size-based styles
  const sizeStyles: Record<ToggleButtonSize, string> = {
    xs: 'h-6 px-2 py-1 text-xs min-w-[24px]',
    small: 'h-8 px-3 py-1.5 text-sm min-w-[32px]',
    medium: 'h-10 px-4 py-2 text-sm min-w-[40px]',
    large: 'h-12 px-6 py-3 text-base min-w-[48px]',
    xl: 'h-14 px-8 py-4 text-lg min-w-[56px]',
  };

  // Icon-only size adjustments
  const iconOnlySizeStyles: Record<ToggleButtonSize, string> = {
    xs: 'h-6 w-6 p-1',
    small: 'h-8 w-8 p-1.5',
    medium: 'h-10 w-10 p-2',
    large: 'h-12 w-12 p-3',
    xl: 'h-14 w-14 p-4',
  };

  // Determine the current style based on state
  const getCurrentStyles = () => {
    if (disabled) return disabledStyles;
    if (isActive) {
      if (customActiveClassName) return customActiveClassName;
      return activeStyles[variant];
    }
    if (customInactiveClassName) return customInactiveClassName;
    return inactiveStyles[variant];
  };

  // Build custom inline styles for color overrides
  const customStyles = useMemo(() => {
    const styles: React.CSSProperties = {};
    
    if (isActive) {
      if (activeBackgroundColor) styles.backgroundColor = activeBackgroundColor;
      if (activeTextColor) styles.color = activeTextColor;
      if (activeBorderColor) styles.borderColor = activeBorderColor;
    } else {
      if (backgroundColor) styles.backgroundColor = backgroundColor;
      if (textColor) styles.color = textColor;
      if (borderColor) styles.borderColor = borderColor;
    }
    
    return Object.keys(styles).length > 0 ? styles : undefined;
  }, [isActive, backgroundColor, textColor, borderColor, activeBackgroundColor, activeTextColor, activeBorderColor]);

  // Render content
  const renderContent = () => {
    if (iconOnly && (startIcon || endIcon)) {
      return startIcon || endIcon;
    }

    return (
      <>
        {startIcon && <span className="toggle-button-start-icon flex-shrink-0">{startIcon}</span>}
        {children && <span className="toggle-button-label">{children}</span>}
        {endIcon && <span className="toggle-button-end-icon flex-shrink-0">{endIcon}</span>}
      </>
    );
  };

  return (
    <button
      ref={ref}
      onClick={disabled ? undefined : onClick}
      type="button"
      disabled={disabled}
      title={tooltip}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-pressed={ariaPressed ?? isActive}
      className={classNames(
        baseClasses,
        borderRadiusClasses,
        iconOnly ? iconOnlySizeStyles[size] : sizeStyles[size],
        getCurrentStyles(),
        className
      )}
      style={customStyles}
      {...inputProps}
      {...rest}
    >
      {renderContent()}
    </button>
  );
});

ToggleButton.displayName = 'ToggleButton';

export default ToggleButton;
 