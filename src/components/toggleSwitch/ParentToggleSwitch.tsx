"use client";
import React, { useState, useCallback } from 'react';
import ToggleSwitch from './ToggleSwitch';
import type { 
  ToggleSwitchProps, 
  ToggleSwitchSize, 
  ToggleSwitchLabelPlacement, 
  ToggleSwitchVariant 
} from './ToggleSwitch';

/**
 * Props for the ParentToggleSwitch component (uncontrolled version)
 */
export interface ParentToggleSwitchProps extends Omit<ToggleSwitchProps, 'checked' | 'onChange'> {
  /** Initial checked state */
  initialChecked?: boolean;
  /** Default checked state (alias for initialChecked) */
  defaultChecked?: boolean;
  /** Callback fired when the toggle state changes */
  onToggle?: (checked: boolean) => void;
  /** Callback fired when the toggle state changes (alias for onToggle) */
  onChange?: (checked: boolean) => void;
}

/**
 * ParentToggleSwitch - An uncontrolled version of ToggleSwitch that manages its own state.
 * Use this when you don't need to control the switch state externally.
 */
const ParentToggleSwitch: React.FC<ParentToggleSwitchProps> = ({
  id,
  name,
  initialChecked = false,
  defaultChecked,
  onToggle,
  onChange,
  onBlur,
  onFocus,
  label,
  helperText,
  error,
  labelPlacement,
  disabled,
  required,
  readOnly,
  icon,
  checkedIcon,
  uncheckedIcon,
  size,
  variant,
  className,
  switchClassName,
  labelClassName,
  knobClassName,
  checkedColor,
  uncheckedColor,
  borderFocusColor,
  knobColor,
  activeKnobColor,
  loading,
  tooltip,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  'aria-labelledby': ariaLabelledBy,
  'data-testid': dataTestId,
  tabIndex,
}) => {
  const [checked, setChecked] = useState<boolean>(defaultChecked ?? initialChecked);

  const handleToggle = useCallback((newChecked: boolean) => {
    setChecked(newChecked);
    onToggle?.(newChecked);
    onChange?.(newChecked);
  }, [onToggle, onChange]);

  return (
    <ToggleSwitch
      id={id}
      name={name}
      checked={checked}
      onChange={handleToggle}
      onBlur={onBlur}
      onFocus={onFocus}
      label={label}
      helperText={helperText}
      error={error}
      labelPlacement={labelPlacement}
      disabled={disabled}
      required={required}
      readOnly={readOnly}
      icon={icon}
      checkedIcon={checkedIcon}
      uncheckedIcon={uncheckedIcon}
      size={size}
      variant={variant}
      className={className}
      switchClassName={switchClassName}
      labelClassName={labelClassName}
      knobClassName={knobClassName}
      checkedColor={checkedColor}
      uncheckedColor={uncheckedColor}
      borderFocusColor={borderFocusColor}
      knobColor={knobColor}
      activeKnobColor={activeKnobColor}
      loading={loading}
      tooltip={tooltip}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-labelledby={ariaLabelledBy}
      data-testid={dataTestId}
      tabIndex={tabIndex}
    />
  );
};

ParentToggleSwitch.displayName = 'ParentToggleSwitch';

export default ParentToggleSwitch;
