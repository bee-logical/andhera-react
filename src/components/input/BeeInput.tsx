'use client';

import React, { forwardRef, useState, useEffect, useRef, InputHTMLAttributes } from 'react';
import { InputAlert, InputEye, InputEyeOff } from '../icons';

export type BeeInputStatus = 'default' | 'success' | 'warning' | 'error';

export type BeeInputSize = 'sm' | 'md' | 'lg';

export type BeeInputVariant = 'outlined' | 'filled';

export type BeeInputLabelPlacement = 'default' | 'inner' | 'border';

export interface BeeInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  /** Primary field label */
  label?: string;
  /** Secondary label text (e.g., "Required", "Optional") */
  labelSecondary?: string;
  /** Label position relative to the input */
  labelPlacement?: BeeInputLabelPlacement;
  /** Helper text shown below the input */
  supportingText?: string;
  /** Legacy error flag - prefer using status="error" */
  error?: boolean;
  /** Error message to display when status is error */
  errorMessage?: string;
  /** Disables the input */
  disabled?: boolean;
  /** Makes the input read-only (focusable but not editable) */
  readOnly?: boolean;
  /** Visual variant of the input container */
  variant?: BeeInputVariant;
  /** Validation status that affects border and text colors */
  status?: BeeInputStatus;
  /** Size of the input */
  size?: BeeInputSize;
  /** Whether the input takes full width of container */
  fullWidth?: boolean;
  /** Icon displayed at the start of the input */
  startIcon?: React.ReactNode;
  /** Icon displayed at the end of the input */
  endIcon?: React.ReactNode;
  /** Content displayed before the input value (e.g., currency symbol) */
  prefix?: React.ReactNode;
  /** Content displayed after the input value (e.g., unit) */
  suffix?: React.ReactNode;
  /** Shows a toggle button for password visibility */
  showPasswordToggle?: boolean;
  /** Shows a clear button when the input has a value */
  showClearButton?: boolean;
  /** Shows a loading spinner */
  loading?: boolean;
  /** Shows a required asterisk indicator */
  required?: boolean;
  /** Maximum character length with optional counter display */
  maxLength?: number;
  /** Shows character counter when maxLength is set */
  showCharacterCount?: boolean;
  /** Additional CSS classes for the native input element */
  inputClassName?: string;
  /** Additional CSS classes for the container wrapper */
  containerClassName?: string;
  /** Additional CSS classes for the label element */
  labelClassName?: string;
  /** Additional CSS classes for the supporting text */
  supportingTextClassName?: string;
  /** Callback when prefix element is clicked */
  onPrefixClick?: () => void;
  /** Callback when suffix element is clicked */
  onSuffixClick?: () => void;
  /** Callback when end icon is clicked */
  onEndIconClick?: () => void;
  /** Callback when clear button is clicked */
  onClear?: () => void;
  /** Auto-focuses the input on mount */
  autoFocus?: boolean;
  /** Custom border radius (e.g., "4px", "12px", "full") */
  borderRadius?: string;
  /** Info tooltip content shown next to the label */
  labelTooltip?: React.ReactNode;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** ARIA described by ID for accessibility */
  'aria-describedby'?: string;
}

type TextColorInfo = {
  className: string;
  hex: string;
};

const Input = forwardRef<HTMLInputElement, BeeInputProps>(
  (
    {
      label,
      supportingText,
      error = false,
      errorMessage,
      disabled = false,
      readOnly = false,
      variant = 'outlined',
      fullWidth = false,
      size = 'md',
      startIcon,
      endIcon,
      prefix,
      suffix,
      showPasswordToggle = false,
      showClearButton = false,
      loading = false,
      required = false,
      maxLength,
      showCharacterCount = false,
      placeholder,
      value,
      defaultValue,
      type = 'text',
      className = '',
      inputClassName = '',
      containerClassName = '',
      labelClassName = '',
      supportingTextClassName = '',
      onFocus,
      onBlur,
      onChange,
      onPrefixClick,
      onSuffixClick,
      onEndIconClick,
      onClear,
      labelSecondary,
      labelPlacement = 'default',
      status,
      autoFocus,
      borderRadius,
      labelTooltip,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      ...rest
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue ?? '');
    const inputRef = useRef<HTMLInputElement | null>(null);
    
    // Combine refs
    const combinedRef = (node: HTMLInputElement | null) => {
      inputRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
      }
    };

    // Get the current value (controlled or uncontrolled)
    const currentValue = value !== undefined ? value : internalValue;
    const characterCount = typeof currentValue === 'string' ? currentValue.length : 0;

    const hasProvidedValue = value !== undefined && value !== null && value !== '';
    const hasDefaultValue =
      defaultValue !== undefined &&
      defaultValue !== null &&
      (typeof defaultValue === 'number'
        ? true
        : Array.isArray(defaultValue)
        ? defaultValue.length > 0
        : defaultValue !== '');
    const hasValue = hasProvidedValue || hasDefaultValue || (typeof internalValue === 'string' && internalValue !== '');

    const resolvedStatus: BeeInputStatus = status ?? (error ? 'error' : 'default');
    const isErrorState = resolvedStatus === 'error';
    const statusBorderClassMap: Record<Exclude<BeeInputStatus, 'default'>, string> = {
      success: 'border-[#00C951]',
      warning: 'border-[#FF6900]',
      error: 'border-[#FB2C36]',
    };
    const statusSupportingTextClassMap: Record<Exclude<BeeInputStatus, 'default'>, string> = {
      success: 'text-[#00C951]',
      warning: 'text-[#FF6900]',
      error: 'text-[#FB2C36]',
    };
    const variantBackgroundClassMap: Record<'outlined' | 'filled', string> = {
      outlined: 'bg-[#151821]',
      filled: 'bg-[#2B2F3C]',
    };
    const variantIdleBorderClassMap: Record<'outlined' | 'filled', string> = {
      outlined: 'border-[#737373]',
      filled: 'border-transparent',
    };
    const variantValueBorderClassMap: Record<'outlined' | 'filled', string> = {
      outlined: 'border-[#A3A3A3]',
      filled: 'border-[#4B4F5C]',
    };
    const variantDisabledBorderClassMap: Record<'outlined' | 'filled', string> = {
      outlined: 'border-[#525252]',
      filled: 'border-[#3A3D47]',
    };
    const variantShadowClassMap: Record<'outlined' | 'filled', string> = {
      outlined: '',
      filled: 'shadow-[0_16px_35px_rgba(8,12,32,0.45)]',
    };
    const variantBackgroundHexMap: Record<'outlined' | 'filled', string> = {
      outlined: '#151821',
      filled: '#2B2F3C',
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (value === undefined) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const handleClear = () => {
      if (value === undefined) {
        setInternalValue('');
      }
      onClear?.();
      inputRef.current?.focus();
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    // Auto-focus effect
    useEffect(() => {
      if (autoFocus && inputRef.current) {
        inputRef.current.focus();
      }
    }, [autoFocus]);

    // Determine input type
    const inputType = showPasswordToggle ? (showPassword ? 'text' : 'password') : type;

    // Determine border color and styles based on state
    const getBorderColor = () => {
      if (disabled) return variantDisabledBorderClassMap[variant];
      if (resolvedStatus !== 'default') {
        return statusBorderClassMap[resolvedStatus];
      }
      if (isFocused) {
        return 'border-[#FFCB00] border-[1.5px]';
      }
      if (hasValue) return variantValueBorderClassMap[variant];
      return variantIdleBorderClassMap[variant];
    };

    // Determine text color based on state
    const getTextColorInfo = (): TextColorInfo => {
      const palette = {
        disabled: { className: 'text-[#6B6B6B]', hex: '#6B6B6B' },
        active: { className: 'text-[#E3E6F2]', hex: '#E3E6F2' },
        idle: { className: 'text-[#C7CBD7]', hex: '#C7CBD7' },
      };

      if (disabled) return palette.disabled;
      if (hasValue || isFocused) return palette.active;
      return palette.idle;
    };

    // Determine label color
    const getLabelColor = () => {
      if (disabled) return 'text-[#5e5e5e]';
      if (isFocused || hasValue) return 'text-white';
      return 'text-white';
    };

    // Determine supporting text color
    const getSupportingTextColor = () => {
      if (disabled) return 'text-[#5e5e5e]';
      if (resolvedStatus !== 'default') {
        return statusSupportingTextClassMap[resolvedStatus];
      }
      if (isFocused || hasValue) return 'text-[#99a1af]';
      return 'text-[#99a1af]';
    };

    const getOptionalTextColor = () => {
      if (disabled) return 'text-[#5e5e5e]';
      return 'text-[#e5e5e5]';
    };

    const containerRadius = borderRadius 
      ? (borderRadius === 'full' ? 'rounded-full' : '') 
      : 'rounded-[8px]';
    const customBorderRadiusStyle = borderRadius && borderRadius !== 'full' 
      ? { borderRadius } 
      : undefined;
    const containerBackground = variantBackgroundClassMap[variant];
    const containerShadow = variantShadowClassMap[variant];
    const placeholderClass = 'placeholder:text-[#99a1af]';
    const disabledTextClass = 'disabled:text-[#737373]';
    const supportingWidthClass = maxLength && showCharacterCount ? '' : 'max-w-[240px]';
    const supportingContent = isErrorState && errorMessage ? errorMessage : supportingText;
    const { className: textColorClass, hex: textColorHex } = getTextColorInfo();
    const isStackedLabel = labelPlacement === 'default';
    const isInnerLabel = labelPlacement === 'inner';
    const isBorderLabel = labelPlacement === 'border';
    const containerOverflowClass = isBorderLabel ? 'overflow-visible' : 'overflow-hidden';
    const inlineLabelBackground = variantBackgroundHexMap[variant];

    // Floating label logic - label floats up when focused or has value
    const isFloatingLabelActive = isFocused || hasValue;
    
    // For inner/border labels, only add top padding when label is floated
    const inputVerticalPaddingClass = (isInnerLabel && isFloatingLabelActive) ? 'pt-5 pb-1' : 'py-1';

    // Determine if we should show the clear button
    const shouldShowClear = showClearButton && hasValue && !disabled && !readOnly && !loading;
    
    // Generate unique IDs for accessibility
    const inputId = rest.id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const supportingTextId = `${inputId}-supporting`;
    const errorId = `${inputId}-error`;

    const sizeConfig: Record<BeeInputSize, {
      controlHeightClass: string;
      sideAccessoryWidthClass: string;
      inputTextClass: string;
      accessoryTextClass: string;
      iconBoxClass: string;
    }> = {
      sm: {
        controlHeightClass: 'h-10 sm:h-11',
        sideAccessoryWidthClass: 'min-w-[38px] sm:min-w-[44px] px-2',
        inputTextClass: 'text-xs sm:text-sm',
        accessoryTextClass: 'text-xs sm:text-sm',
        iconBoxClass: 'w-4 h-4 sm:w-5 sm:h-5',
      },
      md: {
        controlHeightClass: 'h-12 sm:h-14',
        sideAccessoryWidthClass: 'min-w-[44px] sm:min-w-[52px] px-2 sm:px-3',
        inputTextClass: 'text-sm sm:text-base',
        accessoryTextClass: 'text-sm sm:text-base',
        iconBoxClass: 'w-5 h-5 sm:w-6 sm:h-6',
      },
      lg: {
        controlHeightClass: 'h-14 sm:h-16',
        sideAccessoryWidthClass: 'min-w-[52px] sm:min-w-[60px] px-3 sm:px-4',
        inputTextClass: 'text-base sm:text-lg',
        accessoryTextClass: 'text-base sm:text-lg',
        iconBoxClass: 'w-6 h-6 sm:w-7 sm:h-7',
      },
    };

    const { controlHeightClass, sideAccessoryWidthClass, inputTextClass, accessoryTextClass, iconBoxClass } =
      sizeConfig[size];
    const passwordToggleBgClass = 'bg-transparent';
    const passwordToggleHoverClass = disabled ? '' : 'hover:opacity-80';
    const passwordToggleIconColor = disabled ? '#A9A8AA' : '#E3E6F2';

    return (
      <div className={`flex flex-col gap-1 ${fullWidth ? 'w-full' : 'w-full sm:w-[258px]'} ${containerClassName}`}>
        {/* Label */}
        {label && isStackedLabel && (
          <div className="flex items-center gap-2">
            <label
              htmlFor={inputId}
              className={`text-xs sm:text-sm font-medium leading-4 tracking-[0.4px] px-0 ${getLabelColor()} ${labelClassName}`}
              style={{ fontFamily: 'Inter, "InterVariable", Roboto, sans-serif' }}
            >
              {label}
              {required && <span className="text-[#FB2C36] ml-0.5">*</span>}
            </label>
            {labelSecondary && (
              <span
                className={`text-[10px] sm:text-xs font-normal tracking-[0.4px] ${getOptionalTextColor()}`}
                style={{ fontFamily: 'Inter, "InterVariable", Roboto, sans-serif' }}
              >
                {labelSecondary}
              </span>
            )}
            {labelTooltip && (
              <span className="text-[#99a1af] cursor-help" title={typeof labelTooltip === 'string' ? labelTooltip : undefined}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </span>
            )}
          </div>
        )}

        {/* Input Container */}
        <div
          className={`
            relative flex items-stretch
            ${getBorderColor()}
            border border-solid ${containerRadius}
            transition-all duration-200
            ${containerBackground}
            ${containerShadow}
            ${disabled ? 'cursor-not-allowed' : ''}
            ${readOnly ? 'cursor-default' : ''}
            ${fullWidth ? 'w-full' : ''}
            ${containerOverflowClass}
          `}
          style={customBorderRadiusStyle}
        >
          {/* Border Label - Floating */}
          {label && isBorderLabel && (
            <span
              className={`
                pointer-events-none absolute left-4 px-2 font-medium tracking-[0.4px] z-10 
                transition-all duration-200 ease-out
                ${isFloatingLabelActive 
                  ? '-top-3 text-[11px] sm:text-xs' 
                  : 'top-1/2 -translate-y-1/2 text-sm sm:text-base'
                }
                ${isFloatingLabelActive ? getLabelColor() : 'text-[#99a1af]'}
                ${labelClassName}
              `}
              style={{ 
                fontFamily: 'Inter, "InterVariable", Roboto, sans-serif', 
                backgroundColor: isFloatingLabelActive ? inlineLabelBackground : 'transparent'
              }}
            >
              {label}
              {required && <span className="text-[#FB2C36] ml-0.5">*</span>}
              {labelSecondary && isFloatingLabelActive && (
                <span className="ml-1 text-[10px] font-normal uppercase opacity-80">
                  {labelSecondary}
                </span>
              )}
            </span>
          )}
          {/* Start Icon / Prefix */}
          {(startIcon || prefix) && (
            <div className={`flex items-center justify-center shrink-0 ${controlHeightClass}`}>
              {startIcon && (
                <div className={`flex items-center justify-center ${sideAccessoryWidthClass} ${controlHeightClass}`}>
                  <div className={`${iconBoxClass} flex items-center justify-center`}>
                    {startIcon}
                  </div>
                </div>
              )}
              {prefix && (
                <div
                  className={`flex items-center px-1 sm:px-2 ${controlHeightClass} ${accessoryTextClass} ${textColorClass} ${
                    onPrefixClick && !disabled ? 'cursor-pointer hover:opacity-90' : ''
                  }`}
                  onClick={onPrefixClick && !disabled ? onPrefixClick : undefined}
                  role={onPrefixClick ? "button" : undefined}
                  tabIndex={onPrefixClick && !disabled ? 0 : undefined}
                  onKeyDown={onPrefixClick && !disabled ? (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onPrefixClick();
                    }
                  } : undefined}
                >
                  {prefix}
                </div>
              )}
            </div>
          )}

          {/* Input Field */}
          <div className={`flex-1 relative ${controlHeightClass}`}>
            {/* Inner Label - Floating */}
            {label && isInnerLabel && (
              <span
                className={`
                  pointer-events-none absolute left-3 sm:left-4 font-medium tracking-[0.4px]
                  transition-all duration-200 ease-out
                  ${isFloatingLabelActive 
                    ? 'top-1 text-[9px] sm:text-[11px] uppercase' 
                    : 'top-1/2 -translate-y-1/2 text-sm sm:text-base normal-case'
                  }
                  ${isFloatingLabelActive ? getLabelColor() : 'text-[#99a1af]'}
                  ${labelClassName}
                `}
                style={{ fontFamily: 'Inter, "InterVariable", Roboto, sans-serif' }}
              >
                {label}
                {required && <span className="text-[#FB2C36] ml-0.5 normal-case">*</span>}
                {labelSecondary && isFloatingLabelActive && (
                  <span className="ml-1 text-[9px] sm:text-[10px] font-normal normal-case opacity-80">
                    {labelSecondary}
                  </span>
                )}
              </span>
            )}
            <input
              ref={combinedRef}
              id={inputId}
              type={inputType}
              value={value}
              defaultValue={defaultValue}
              placeholder={(isInnerLabel || isBorderLabel) && !isFloatingLabelActive ? '' : placeholder}
              disabled={disabled}
              readOnly={readOnly}
              required={required}
              maxLength={maxLength}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              aria-invalid={isErrorState}
              aria-label={ariaLabel}
              aria-describedby={ariaDescribedBy || (supportingContent ? supportingTextId : undefined)}
              aria-required={required}
              className={`
                w-full h-full px-2 sm:px-4 ${inputVerticalPaddingClass}
                ${inputTextClass} font-normal leading-6 tracking-[0.5px]
                ${textColorClass}
                bg-transparent
                outline-none
                ${placeholderClass}
                disabled:cursor-not-allowed
                ${readOnly ? 'cursor-default' : ''}
                ${disabledTextClass}
                ${!startIcon && !prefix ? 'pl-3 sm:pl-4' : 'pl-0'}
                ${!endIcon && !suffix && !showPasswordToggle && !shouldShowClear && !loading ? 'pr-3 sm:pr-4' : 'pr-0'}
                [appearance:textfield]
                [&::-webkit-outer-spin-button]:appearance-none
                [&::-webkit-inner-spin-button]:appearance-none
                ${inputClassName}
              `}
              style={{
                fontFamily: 'Inter, "InterVariable", Roboto, sans-serif',
                caretColor: readOnly ? 'transparent' : '#FFCB00',
                color: textColorHex,
              }}
              {...rest}
            />
          </div>

          {/* End Icon / Suffix / Loading / Clear */}
          {(endIcon || suffix || showPasswordToggle || isErrorState || shouldShowClear || loading) && (
            <div className={`flex items-center justify-center shrink-0 ${controlHeightClass}`}>
              {suffix && !isErrorState && (
                <div
                  className={`flex items-center px-1 sm:px-2 ${controlHeightClass} ${accessoryTextClass} ${textColorClass} ${
                    onSuffixClick && !disabled && !readOnly ? 'cursor-pointer hover:opacity-70' : ''
                  }`}
                  onClick={onSuffixClick && !disabled && !readOnly ? onSuffixClick : undefined}
                  role={onSuffixClick ? "button" : undefined}
                  tabIndex={onSuffixClick && !disabled && !readOnly ? 0 : undefined}
                  onKeyDown={onSuffixClick && !disabled && !readOnly ? (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSuffixClick();
                    }
                  } : undefined}
                >
                  {suffix}
                </div>
              )}
              
              {/* Loading Spinner */}
              {loading && (
                <div className={`flex items-center justify-center ${sideAccessoryWidthClass} ${controlHeightClass}`}>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                    <svg 
                      className="animate-spin" 
                      width="100%" 
                      height="100%" 
                      viewBox="0 0 24 24" 
                      fill="none"
                    >
                      <circle 
                        className="opacity-25" 
                        cx="12" 
                        cy="12" 
                        r="10" 
                        stroke="#E3E6F2" 
                        strokeWidth="3"
                      />
                      <path 
                        className="opacity-75" 
                        fill="#FFCB00" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  </div>
                </div>
              )}

              {/* Clear Button */}
              {shouldShowClear && !loading && (
                <button
                  type="button"
                  onClick={handleClear}
                  className={`flex items-center justify-center ${sideAccessoryWidthClass} ${controlHeightClass} cursor-pointer transition-opacity duration-150 hover:opacity-70`}
                  aria-label="Clear input"
                  title="Clear"
                >
                  <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="#99a1af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </div>
                </button>
              )}
              
              {/* Password Toggle */}
              {showPasswordToggle && !loading && (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  disabled={disabled}
                  className={`flex items-center justify-center ${sideAccessoryWidthClass} ${controlHeightClass} cursor-pointer disabled:cursor-not-allowed transition-opacity duration-150 ${passwordToggleBgClass} ${passwordToggleHoverClass}`}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                    {showPassword ? (
                      <InputEye size="100%" color={passwordToggleIconColor} />
                    ) : (
                      <InputEyeOff size="100%" color={passwordToggleIconColor} />
                    )}
                  </div>
                </button>
              )}
              
              {/* Error Icon */}
              {isErrorState && !loading && (
                <div className={`flex items-center justify-start ${sideAccessoryWidthClass} ${controlHeightClass}`}>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-start">
                    <InputAlert size="100%" />
                  </div>
                </div>
              )}
              
              {/* End Icon */}
              {endIcon && !isErrorState && !showPasswordToggle && !loading && !shouldShowClear && (
                <div 
                  className={`flex items-center justify-center ${sideAccessoryWidthClass} ${controlHeightClass} ${onEndIconClick && !disabled && !readOnly ? 'cursor-pointer hover:opacity-70' : ''}`}
                  onClick={onEndIconClick && !disabled && !readOnly ? onEndIconClick : undefined}
                  role={onEndIconClick ? "button" : undefined}
                  tabIndex={onEndIconClick && !disabled && !readOnly ? 0 : undefined}
                  onKeyDown={onEndIconClick && !disabled && !readOnly ? (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onEndIconClick();
                    }
                  } : undefined}
                >
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                    {endIcon}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Supporting Text / Error Message / Character Count */}
        {(supportingContent || (maxLength && showCharacterCount)) && (
          <div className={`flex items-center justify-between px-2 sm:px-4 ${supportingWidthClass}`}>
            {supportingContent && (
              <p
                id={isErrorState ? errorId : supportingTextId}
                className={`text-[10px] sm:text-xs font-normal leading-4 tracking-[0.4px] ${getSupportingTextColor()} break-words overflow-hidden text-ellipsis flex-1 ${supportingTextClassName}`}
                style={{ fontFamily: 'Inter, "InterVariable", Roboto, sans-serif' }}
              >
                {supportingContent}
              </p>
            )}
            {maxLength && showCharacterCount && (
              <span 
                className={`text-[10px] sm:text-xs font-normal tracking-[0.4px] ml-2 shrink-0 ${
                  characterCount >= maxLength ? 'text-[#FB2C36]' : 'text-[#99a1af]'
                }`}
                style={{ fontFamily: 'Inter, "InterVariable", Roboto, sans-serif' }}
              >
                {characterCount}/{maxLength}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
