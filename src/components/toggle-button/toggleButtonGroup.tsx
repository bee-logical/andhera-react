"use client";
import React, { ReactElement, forwardRef, useMemo, useCallback } from 'react';
import { classNames } from '@/utils/classNames';
import type { ToggleButtonProps, ToggleButtonVariant, ToggleButtonSize, ToggleButtonAlignment, ToggleButtonRadius } from './toggleButton';

/**
 * Selection mode for the ToggleButtonGroup
 */
export type ToggleButtonSelectionMode = 'single' | 'multiple';

/**
 * Spacing options between buttons in the group
 */
export type ToggleButtonSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg';

/**
 * Props for the ToggleButtonGroup component
 */
export interface ToggleButtonGroupProps {
  /** Currently selected value(s). String for single mode, string[] for multiple mode */
  value: string | string[];
  /** Callback when selection changes */
  onChange: (value: string | string[]) => void;
  /** Additional callback for extended actions */
  onMoreAction?: (value: string) => void;
  /** ToggleButton children */
  children: ReactElement<ToggleButtonProps>[] | ReactElement<ToggleButtonProps>;
  /** Disables all buttons in the group */
  disabled?: boolean;
  /** Visual style variant applied to all buttons */
  variant?: ToggleButtonVariant;
  /** Layout direction of the group */
  alignment?: ToggleButtonAlignment;
  /** Size applied to all buttons */
  size?: ToggleButtonSize;
  /** Border radius style for the group */
  radius?: ToggleButtonRadius;
  /** Adds elevation shadow effect */
  elevated?: boolean;
  /** Selection mode - single (radio-like) or multiple (checkbox-like) */
  selectionMode?: ToggleButtonSelectionMode;
  /** Spacing between buttons */
  spacing?: ToggleButtonSpacing;
  /** Whether the group should take full width */
  fullWidth?: boolean;
  /** If true, at least one option must always be selected (single mode only) */
  required?: boolean;
  /** Additional CSS classes for the container */
  className?: string;
  /** Custom background color for the group container */
  containerBackgroundColor?: string;
  /** Custom border color for the group container */
  containerBorderColor?: string;
  /** Accessibility label for the group */
  'aria-label'?: string;
  /** ID of element labelling the group */
  'aria-labelledby'?: string;
  /** ID attribute for the group container */
  id?: string;
  /** Test ID for testing */
  'data-testid'?: string;
}

const ToggleButtonGroup = forwardRef<HTMLDivElement, ToggleButtonGroupProps>(({
  value,
  onChange,
  onMoreAction,
  disabled = false,
  children,
  variant = 'primary',
  alignment = 'horizontal',
  size = 'medium',
  radius,
  elevated = false,
  selectionMode = 'single',
  spacing = 'none',
  fullWidth = false,
  required = false,
  className,
  containerBackgroundColor,
  containerBorderColor,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  id,
  'data-testid': dataTestId,
}, ref) => {
  // Convert value to array for internal handling
  const selectedValues = useMemo(() => {
    if (Array.isArray(value)) return value;
    return value ? [value] : [];
  }, [value]);

  // Handle button click based on selection mode
  const handleButtonClick = useCallback((buttonValue: string) => {
    if (selectionMode === 'single') {
      // In single mode with required, don't allow deselection
      if (required && selectedValues.includes(buttonValue)) {
        return;
      }
      // Toggle off if already selected (when not required), otherwise select
      if (selectedValues.includes(buttonValue) && !required) {
        onChange('');
      } else {
        onChange(buttonValue);
      }
    } else {
      // Multiple selection mode
      if (selectedValues.includes(buttonValue)) {
        // Don't allow deselecting the last item if required
        if (required && selectedValues.length === 1) {
          return;
        }
        onChange(selectedValues.filter(v => v !== buttonValue));
      } else {
        onChange([...selectedValues, buttonValue]);
      }
    }
  }, [selectionMode, selectedValues, onChange, required]);

  // Spacing classes
  const spacingClasses: Record<ToggleButtonSpacing, string> = {
    none: 'gap-0',
    xs: alignment === 'horizontal' ? 'gap-1' : 'gap-1',
    sm: alignment === 'horizontal' ? 'gap-2' : 'gap-2',
    md: alignment === 'horizontal' ? 'gap-3' : 'gap-3',
    lg: alignment === 'horizontal' ? 'gap-4' : 'gap-4',
  };

  // Container classes based on variant and options
  const containerClasses = useMemo(() => {
    const baseClasses = classNames(
      'inline-flex',
      alignment === 'horizontal' ? 'flex-row' : 'flex-col',
      spacingClasses[spacing],
      fullWidth && 'w-full'
    );

    // Add variant-specific container styling
    if (variant === 'secondary') {
      return classNames(
        baseClasses,
        'p-[1px] rounded-3xl border',
        elevated
          ? 'bg-white border-gray-200 shadow-[0px_1px_2px_0px_rgba(13,90,88,0.05)]'
          : 'bg-white border-gray-300'
      );
    }

    return baseClasses;
  }, [alignment, spacing, fullWidth, variant, elevated]);

  // Custom inline styles for the container
  const containerStyles = useMemo(() => {
    const styles: React.CSSProperties = {};
    if (containerBackgroundColor) styles.backgroundColor = containerBackgroundColor;
    if (containerBorderColor) styles.borderColor = containerBorderColor;
    return Object.keys(styles).length > 0 ? styles : undefined;
  }, [containerBackgroundColor, containerBorderColor]);

  // Determine appropriate ARIA role
  const role = selectionMode === 'single' ? 'radiogroup' : 'group';

  const childCount = React.Children.count(children);

  return (
    <div
      ref={ref}
      id={id}
      role={role}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-disabled={disabled}
      data-testid={dataTestId}
      className={classNames(containerClasses, className)}
      style={containerStyles}
    >
      {React.Children.map(children, (child, i) => {
        if (!React.isValidElement(child)) return null;

        const childProps = child.props as ToggleButtonProps;
        const buttonValue = String(childProps.value);
        const isActive = selectedValues.includes(buttonValue);
        const isFirst = i === 0;
        const isLast = i + 1 === childCount;

        return React.cloneElement(child, {
          isActive,
          onClick: () => {
            if (typeof childProps.value === 'boolean' && onMoreAction) {
              onMoreAction(buttonValue);
            } else {
              handleButtonClick(buttonValue);
            }
          },
          isFirst: spacing === 'none' ? isFirst : undefined,
          isLast: spacing === 'none' ? isLast : undefined,
          disabled: disabled || childProps.disabled,
          variant: childProps.variant ?? variant,
          alignment,
          size: childProps.size ?? size,
          radius: spacing !== 'none' ? (childProps.radius ?? radius ?? 'md') : childProps.radius,
          fullWidth,
          'aria-checked': selectionMode === 'single' ? isActive : undefined,
          role: selectionMode === 'single' ? 'radio' : 'checkbox',
        } as Partial<ToggleButtonProps>);
      })}
    </div>
  );
});

ToggleButtonGroup.displayName = 'ToggleButtonGroup';

export default ToggleButtonGroup;