'use client';

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MutableRefObject,
  type ReactNode,
  type TextareaHTMLAttributes,
} from 'react';
import { Button } from '../button/buttons';

export type TextareaStatus = 'default' | 'success' | 'warning' | 'error';
export type TextareaSize = 'sm' | 'md' | 'lg';
export type TextareaVariant = 'outlined' | 'filled';
export type TextareaLabelPlacement = 'default' | 'inner' | 'border';
export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';
export type ClearButtonPosition = 'top-right' | 'bottom-right';

export type TextareaOverlayContext = {
  value: string;
  selectionStart: number;
  selectionEnd: number;
  textarea: HTMLTextAreaElement | null;
};

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  /** Primary label text */
  label?: string;
  /** Secondary label text (e.g., "Optional") */
  labelSecondary?: string;
  /** Label placement position */
  labelPlacement?: TextareaLabelPlacement;
  /** Tooltip content shown next to label */
  labelTooltip?: ReactNode;
  /** Helper text below textarea */
  supportingText?: string;
  /** Custom classes for supporting text */
  supportingTextClassName?: string;
  /** Custom classes for label */
  labelClassName?: string;
  /** Custom classes for outer container */
  containerClassName?: string;
  /** Custom classes for textarea element */
  textareaClassName?: string;
  /** Visual status state */
  status?: TextareaStatus;
  /** Boolean error state (alternative to status) */
  error?: boolean;
  /** Error message shown when in error state */
  errorMessage?: string;
  /** Visual style variant */
  variant?: TextareaVariant;
  /** Size preset */
  size?: TextareaSize;
  /** Take full container width */
  fullWidth?: boolean;
  /** Show character counter */
  showCharacterCount?: boolean;
  /** Custom classes for character counter */
  characterCountClassName?: string;
  /** Custom border radius */
  borderRadius?: string;
  /** Auto-expand height with content */
  autoGrow?: boolean;
  /** Minimum rows for auto-grow */
  minRows?: number;
  /** Maximum rows before scrolling */
  maxRows?: number;
  /** Resize behavior */
  resize?: TextareaResize;
  /** Fixed height value */
  height?: CSSProperties['height'];
  /** Maximum height constraint */
  maxHeight?: CSSProperties['maxHeight'];
  /** Minimum height constraint */
  minHeight?: CSSProperties['minHeight'];
  /** Show loading spinner overlay */
  loading?: boolean;
  /** Custom loading text */
  loadingText?: string;
  /** Custom classes for loading overlay */
  loadingClassName?: string;
  /** Show clear button */
  showClearButton?: boolean;
  /** Callback when clear button clicked */
  onClear?: () => void;
  /** Accessibility label for clear button */
  clearButtonAriaLabel?: string;
  /** Position of clear button */
  clearButtonPosition?: ClearButtonPosition;
  /** Custom clear button text */
  clearButtonText?: string;
  /** Validation function */
  validate?: (value: string) => string | null | undefined;
  /** When to run validation */
  validationMode?: 'change' | 'blur';
  /** Callback when validation state changes */
  onValidationChange?: (message: string | null) => void;
  /** Debounce delay in milliseconds */
  debounceDelay?: number;
  /** Callback after debounce delay */
  onDebouncedChange?: (value: string) => void;
  /** Enable browser spell check */
  spellCheckEnabled?: boolean;
  /** Auto-capitalize behavior (mobile) */
  autoCapitalizeMode?: 'none' | 'sentences' | 'words' | 'characters' | 'on' | 'off';
  /** Auto-correct behavior (mobile) */
  autoCorrectMode?: 'on' | 'off';
  /** Render custom overlay */
  renderOverlay?: (context: TextareaOverlayContext) => ReactNode;
  /** Custom classes for overlay container */
  overlayClassName?: string;
  /** Callback when cursor position changes */
  onCaretChange?: (context: TextareaOverlayContext) => void;
  /** Custom focus border color (hex or Tailwind class) */
  focusBorderColor?: string;
  /** Custom caret/cursor color */
  caretColor?: string;
  /** Custom font family */
  fontFamily?: string;
  /** Custom background color for textarea */
  backgroundColor?: string;
  /** Custom text color */
  textColor?: string;
  /** Custom placeholder color */
  placeholderColor?: string;
  /** Custom required indicator */
  requiredIndicator?: ReactNode;
  /** Hide required indicator */
  hideRequiredIndicator?: boolean;
}

type TextColorInfo = {
  className: string;
  hex: string;
};

type SizeConfig = {
  paddingClass: string;
  innerRestPadding: string;
  innerActivePadding: string;
  textClass: string;
  minHeightClass: string;
  lineHeight: number;
  rows: number;
};

const sizeConfig: Record<TextareaSize, SizeConfig> = {
  sm: {
    paddingClass: 'px-3 py-2.5',
    innerRestPadding: 'px-3 pt-6 pb-2.5',
    innerActivePadding: 'px-3 pt-6 pb-2',
    textClass: 'text-sm leading-5',
    minHeightClass: 'min-h-[96px]',
    lineHeight: 20,
    rows: 3,
  },
  md: {
    paddingClass: 'px-4 py-3',
    innerRestPadding: 'px-4 pt-7 pb-3',
    innerActivePadding: 'px-4 pt-7 pb-3',
    textClass: 'text-base leading-6',
    minHeightClass: 'min-h-[128px]',
    lineHeight: 22,
    rows: 4,
  },
  lg: {
    paddingClass: 'px-5 py-4',
    innerRestPadding: 'px-5 pt-9 pb-4',
    innerActivePadding: 'px-5 pt-9 pb-4',
    textClass: 'text-lg leading-7',
    minHeightClass: 'min-h-[168px]',
    lineHeight: 24,
    rows: 5,
  },
};

const resizeClassMap: Record<TextareaResize, string> = {
  none: 'resize-none',
  vertical: 'resize-y',
  horizontal: 'resize-x',
  both: 'resize',
};

const statusBorderClassMap: Record<Exclude<TextareaStatus, 'default'>, string> = {
  success: 'border-[#00C951]',
  warning: 'border-[#FF6900]',
  error: 'border-[#FB2C36]',
};

const statusSupportingTextClassMap: Record<Exclude<TextareaStatus, 'default'>, string> = {
  success: 'text-[#00C951]',
  warning: 'text-[#FF6900]',
  error: 'text-[#FB2C36]',
};

const variantBackgroundClassMap: Record<TextareaVariant, string> = {
  outlined: 'bg-[#151821]',
  filled: 'bg-[#2B2F3C]',
};

const variantIdleBorderClassMap: Record<TextareaVariant, string> = {
  outlined: 'border-[#737373]',
  filled: 'border-transparent',
};

const variantValueBorderClassMap: Record<TextareaVariant, string> = {
  outlined: 'border-[#A3A3A3]',
  filled: 'border-[#4B4F5C]',
};

const variantDisabledBorderClassMap: Record<TextareaVariant, string> = {
  outlined: 'border-[#525252]',
  filled: 'border-[#3A3D47]',
};

const variantShadowClassMap: Record<TextareaVariant, string> = {
  outlined: '',
  filled: 'shadow-[0_18px_42px_rgba(8,12,32,0.45)]',
};

const variantBackgroundHexMap: Record<TextareaVariant, string> = {
  outlined: '#151821',
  filled: '#2B2F3C',
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  const {
    label,
    labelSecondary,
    labelPlacement = 'default',
    labelTooltip,
    supportingText,
    supportingTextClassName = '',
    labelClassName = '',
    containerClassName = '',
    textareaClassName = '',
    status,
    error = false,
    errorMessage,
    variant = 'outlined',
    size = 'md',
    fullWidth = false,
    disabled = false,
    readOnly = false,
    required = false,
    maxLength,
    showCharacterCount = false,
    characterCountClassName = '',
    borderRadius,
    autoGrow = false,
    minRows,
    maxRows,
    resize = 'vertical',
    height,
    maxHeight,
    minHeight,
    loading = false,
    loadingText = 'Loading...',
    loadingClassName = '',
    showClearButton = false,
    onClear,
    clearButtonAriaLabel = 'Clear text',
    clearButtonPosition = 'top-right',
    clearButtonText = 'Clear',
    validate,
    validationMode = 'change',
    onValidationChange,
    debounceDelay = 320,
    onDebouncedChange,
    spellCheckEnabled = true,
    autoCapitalizeMode,
    autoCorrectMode,
    renderOverlay,
    overlayClassName = '',
    onCaretChange,
    focusBorderColor,
    caretColor = '#FFCB00',
    fontFamily = 'Inter, "InterVariable", Roboto, sans-serif',
    backgroundColor,
    textColor,
    placeholderColor,
    requiredIndicator,
    hideRequiredIndicator = false,
    placeholder,
    value,
    defaultValue,
    className = '',
    autoFocus,
    onFocus,
    onBlur,
    onChange,
    onClick: onClickProp,
    onKeyUp: onKeyUpProp,
    onSelect: onSelectProp,
    id,
    name,
    style,
    ...rest
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const combinedRef = (node: HTMLTextAreaElement | null) => {
    textareaRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      (ref as MutableRefObject<HTMLTextAreaElement | null>).current = node;
    }
  };

  const resolvedValue = value ?? internalValue;
  const stringValue: string = Array.isArray(resolvedValue)
    ? resolvedValue.join('\n')
    : typeof resolvedValue === 'number'
      ? String(resolvedValue)
      : typeof resolvedValue === 'string'
        ? resolvedValue
        : '';
  const hasValue = stringValue.length > 0;
  const characterCount = stringValue.length;

  const resolvedStatus: TextareaStatus = status ?? (error ? 'error' : 'default');

  const updateSelectionState = useCallback((target: HTMLTextAreaElement) => {
    const start = target.selectionStart ?? 0;
    const end = target.selectionEnd ?? start;
    setSelection({ start, end });
  }, []);

  const runValidation = useCallback(
    (val: string) => {
      if (!validate) {
        setValidationMessage((prev) => {
          if (prev !== null) {
            onValidationChange?.(null);
          }
          return null;
        });
        return null;
      }
      const nextMessage = validate(val) ?? null;
      setValidationMessage((prev) => {
        if (prev !== nextMessage) {
          onValidationChange?.(nextMessage);
        }
        return nextMessage;
      });
      return nextMessage;
    },
    [validate, onValidationChange],
  );

  useEffect(() => {
    if (validationMode === 'change') {
      runValidation(stringValue);
    }
  }, [stringValue, validationMode, runValidation]);

  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [autoFocus]);

  const adjustHeight = useCallback(() => {
    if (!autoGrow || !textareaRef.current) return;
    const node = textareaRef.current;
    node.style.height = 'auto';
    const computed = typeof window !== 'undefined' ? window.getComputedStyle(node) : null;
    const lineHeight = computed ? parseFloat(computed.lineHeight) || sizeConfig[size].lineHeight : sizeConfig[size].lineHeight;
    const minHeightPx = minRows ? minRows * lineHeight : undefined;
    const maxHeightPx = maxRows ? maxRows * lineHeight : undefined;
    let nextHeight = node.scrollHeight;
    if (maxHeightPx !== undefined) {
      nextHeight = Math.min(nextHeight, maxHeightPx);
    }
    if (minHeightPx !== undefined) {
      nextHeight = Math.max(nextHeight, minHeightPx);
    }
    node.style.height = `${nextHeight}px`;
  }, [autoGrow, size, minRows, maxRows]);

  useEffect(() => {
    adjustHeight();
  }, [stringValue, adjustHeight]);

  useEffect(() => {
    if (!onDebouncedChange) return;
    const timeout = window.setTimeout(() => onDebouncedChange(stringValue), debounceDelay);
    return () => window.clearTimeout(timeout);
  }, [stringValue, onDebouncedChange, debounceDelay]);

  useEffect(() => {
    if (!onCaretChange) return;
    onCaretChange({ value: stringValue, selectionStart: selection.start, selectionEnd: selection.end, textarea: textareaRef.current });
  }, [selection, stringValue, onCaretChange]);

  const isValidationError = Boolean(validationMessage);
  const effectiveStatus: TextareaStatus = isValidationError ? 'error' : resolvedStatus;
  const supportingFromStatus = effectiveStatus !== 'default' ? statusSupportingTextClassMap[effectiveStatus as Exclude<TextareaStatus, 'default'>] : 'text-[#99a1af]';

  const handleFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    if (validationMode === 'blur') {
      runValidation(event.currentTarget.value);
    }
    onBlur?.(event);
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (value === undefined) {
      setInternalValue(event.target.value);
    }
    updateSelectionState(event.currentTarget);
    onChange?.(event);
  };

  const handleClick = (event: React.MouseEvent<HTMLTextAreaElement>) => {
    updateSelectionState(event.currentTarget);
    onClickProp?.(event);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    updateSelectionState(event.currentTarget);
    onKeyUpProp?.(event);
  };

  const handleSelect = (event: React.SyntheticEvent<HTMLTextAreaElement>) => {
    updateSelectionState(event.currentTarget);
    onSelectProp?.(event);
  };

  const handleClear = () => {
    if (value === undefined) {
      setInternalValue('');
    }
    onClear?.();
    textareaRef.current?.focus();
  };

  const getBorderColor = () => {
    if (disabled) return variantDisabledBorderClassMap[variant];
    if (effectiveStatus !== 'default') {
      return statusBorderClassMap[effectiveStatus as Exclude<TextareaStatus, 'default'>];
    }
    if (isFocused) {
      // Support custom focus border color - can be hex or Tailwind class
      if (focusBorderColor) {
        if (focusBorderColor.startsWith('#') || focusBorderColor.startsWith('rgb')) {
          return `border-[${focusBorderColor}] border-[1.5px]`;
        }
        return `${focusBorderColor} border-[1.5px]`;
      }
      return 'border-[#FFCB00] border-[1.5px]';
    }
    if (hasValue) return variantValueBorderClassMap[variant];
    return variantIdleBorderClassMap[variant];
  };

  const getTextColorInfo = (): TextColorInfo => {
    // Allow custom text color override
    if (textColor) {
      return { className: '', hex: textColor };
    }
    const palette = {
      disabled: { className: 'text-[#6B6B6B]', hex: '#6B6B6B' },
      active: { className: 'text-[#E3E6F2]', hex: '#E3E6F2' },
      idle: { className: 'text-[#C7CBD7]', hex: '#C7CBD7' },
    };

    if (disabled) return palette.disabled;
    if (hasValue || isFocused) return palette.active;
    return palette.idle;
  };

  const getLabelColor = () => {
    if (disabled) return 'text-[#5e5e5e]';
    if (isFocused || hasValue) return 'text-white';
    return 'text-white';
  };

  const getSupportingTextColor = () => {
    if (disabled) return 'text-[#5e5e5e]';
    if (effectiveStatus !== 'default') {
      return supportingFromStatus;
    }
    if (isFocused || hasValue) return 'text-[#99a1af]';
    return 'text-[#99a1af]';
  };

  const getOptionalTextColor = () => (disabled ? 'text-[#5e5e5e]' : 'text-[#e5e5e5]');

  const containerRadius = borderRadius ? (borderRadius === 'full' ? 'rounded-full' : '') : 'rounded-[12px]';
  const customBorderRadiusStyle = borderRadius && borderRadius !== 'full' ? { borderRadius } : undefined;
  // Allow custom background color override
  const containerBackground = backgroundColor 
    ? '' 
    : variantBackgroundClassMap[variant];
  const containerShadow = variantShadowClassMap[variant];
  // Allow custom placeholder color
  const placeholderClass = placeholderColor 
    ? `placeholder:text-[${placeholderColor}]` 
    : 'placeholder:text-[#99a1af]';
  const disabledTextClass = 'disabled:text-[#737373]';
  const supportingWidthClass = maxLength && showCharacterCount ? '' : 'max-w-[400px]';
  const derivedSupportingText = validationMessage ?? (effectiveStatus === 'error' && errorMessage ? errorMessage : supportingText);

  const { className: textColorClass, hex: textColorHex } = getTextColorInfo();
  const isStackedLabel = labelPlacement === 'default';
  const isInnerLabel = labelPlacement === 'inner';
  const isBorderLabel = labelPlacement === 'border';
  // Need overflow-visible for border label (floating label) and for horizontal/both resize (resize handle visibility)
  const needsOverflowVisible = isBorderLabel || resize === 'horizontal' || resize === 'both';
  const containerOverflowClass = needsOverflowVisible ? 'overflow-visible' : 'overflow-hidden';
  // Use custom background for inline label background too
  const inlineLabelBackground = backgroundColor ?? variantBackgroundHexMap[variant];
  const paddingConfig = sizeConfig[size];
  const containerMinHeightClass = height ? '' : paddingConfig.minHeightClass;
  const textareaPaddingClass = isInnerLabel
    ? paddingConfig.innerActivePadding
    : paddingConfig.paddingClass;

  // Required indicator - customizable
  const renderRequiredIndicator = () => {
    if (hideRequiredIndicator || !required) return null;
    if (requiredIndicator) return requiredIndicator;
    return <span className="text-[#FB2C36] ml-0.5">*</span>;
  };

  const shouldShowCounter = Boolean(maxLength) && showCharacterCount;
  const textareaId = id ?? `textarea-${Math.random().toString(36).slice(2, 9)}`;
  const supportingTextId = `${textareaId}-supporting`;
  const errorId = `${textareaId}-error`;
  const rows = props.rows ?? paddingConfig.rows;

  const textareaInlineStyle: CSSProperties = {
    ...style,
  };

  const resolvedHeightValue = typeof height === 'number' ? `${height}px` : height;
  const resolvedMaxHeightValue = typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight;
  const resolvedMinHeightValue = typeof minHeight === 'number' ? `${minHeight}px` : minHeight;

  if (resolvedHeightValue) {
    textareaInlineStyle.height = resolvedHeightValue;
  }

  if (resolvedMinHeightValue) {
    textareaInlineStyle.minHeight = resolvedMinHeightValue;
  } else if (!resolvedHeightValue && !autoGrow && minRows) {
    textareaInlineStyle.minHeight = `${minRows * paddingConfig.lineHeight}px`;
  } else if (!resolvedHeightValue && !resolvedMinHeightValue) {
    // Default minimum height based on size to prevent collapsing to zero
    const defaultMinHeights = { sm: '96px', md: '128px', lg: '168px' };
    textareaInlineStyle.minHeight = defaultMinHeights[size];
  }

  if (resolvedMaxHeightValue) {
    textareaInlineStyle.maxHeight = resolvedMaxHeightValue;
  } else if (!autoGrow && maxRows) {
    textareaInlineStyle.maxHeight = `${maxRows * paddingConfig.lineHeight}px`;
  }

  const userDefinedOverflow = style?.overflow;
  if (userDefinedOverflow === undefined) {
    if (resolvedHeightValue || resolvedMaxHeightValue) {
      textareaInlineStyle.overflow = 'auto';
    } else if (autoGrow) {
      textareaInlineStyle.overflow = 'hidden';
    }
  }

  const overlayContent = renderOverlay
    ? renderOverlay({ value: stringValue, selectionStart: selection.start, selectionEnd: selection.end, textarea: textareaRef.current })
    : null;

  const describedById = derivedSupportingText ? (effectiveStatus === 'error' ? errorId : supportingTextId) : undefined;

  const allowHorizontalResize = resize === 'horizontal' || resize === 'both';
  
  // For horizontal resize, don't constrain width with w-full
  const getOuterContainerWidth = () => {
    if (allowHorizontalResize) {
      return 'w-fit'; // Allow content to determine width for horizontal resize
    }
    return fullWidth ? 'w-full' : 'w-full sm:w-[420px]';
  };

  return (
    <div className={`flex flex-col gap-1 ${getOuterContainerWidth()} ${containerClassName}`}>
      {label && isStackedLabel && (
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <label
              htmlFor={textareaId}
              className={`text-xs sm:text-sm font-medium leading-4 tracking-[0.4px] ${getLabelColor()} ${labelClassName}`}
              style={{ fontFamily }}
            >
              {label}
              {renderRequiredIndicator()}
            </label>
            {labelSecondary && (
              <span
                className={`text-[10px] sm:text-xs font-normal tracking-[0.4px] ${getOptionalTextColor()}`}
                style={{ fontFamily }}
              >
                {labelSecondary}
              </span>
            )}
            {labelTooltip && (
              <span className="text-[#99a1af] cursor-help" title={typeof labelTooltip === 'string' ? labelTooltip : undefined}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </span>
            )}
          </div>
          {showClearButton && hasValue && !disabled && !readOnly && !loading && clearButtonPosition === 'top-right' && (
            <Button
              variant="secondary-destructive"
              size="xs"
              onClick={handleClear}
              aria-label={clearButtonAriaLabel}
            >
              {clearButtonText}
            </Button>
          )}
        </div>
      )}

      <div className={allowHorizontalResize ? "relative inline-block" : "relative"}>
        <div
          className={`
          ${allowHorizontalResize ? 'inline-flex' : 'flex'} items-stretch
          ${getBorderColor()}
          border border-solid ${containerRadius}
          transition-all duration-200
          ${containerBackground}
          ${containerShadow}
          ${disabled ? 'cursor-not-allowed' : ''}
          ${readOnly ? 'cursor-default' : ''}
          ${!allowHorizontalResize && (fullWidth ? 'w-full' : '')}
          ${containerOverflowClass}
          ${containerMinHeightClass}
          ${className}
        `}
          style={{
            ...customBorderRadiusStyle,
            ...(backgroundColor ? { backgroundColor } : {}),
          }}
        >
          <div className={`relative ${allowHorizontalResize ? 'inline-block' : 'flex-1'}`}>
          {label && isBorderLabel && (
            <span
              className={`
                pointer-events-none absolute -top-3 left-4 px-2 font-medium tracking-[0.4px] z-10
                text-[11px] sm:text-xs
                ${getLabelColor()}
                ${labelClassName}
              `}
              style={{
                fontFamily,
                backgroundColor: inlineLabelBackground,
              }}
            >
              {label}
              {renderRequiredIndicator()}
              {labelSecondary && (
                <span className="ml-1 text-[10px] font-normal uppercase opacity-80">{labelSecondary}</span>
              )}
            </span>
          )}

          {label && isInnerLabel && (
            <span
              className={`
                pointer-events-none absolute top-2 left-4 font-medium tracking-[0.4px]
                text-[11px] sm:text-xs uppercase
                ${getLabelColor()}
                ${labelClassName}
              `}
              style={{ fontFamily }}
            >
              {label}
              {renderRequiredIndicator()}
              {labelSecondary && (
                <span className="ml-1 text-[10px] font-normal uppercase opacity-80">{labelSecondary}</span>
              )}
            </span>
          )}

          <textarea
            ref={combinedRef}
            id={textareaId}
            name={name}
            value={stringValue}
            placeholder={placeholder}
            disabled={disabled || loading}
            readOnly={readOnly}
            required={required}
            maxLength={maxLength}
            rows={rows}
            className={`
              ${allowHorizontalResize ? 'min-w-[200px]' : 'w-full'} h-full bg-transparent outline-none
              ${textareaPaddingClass}
              ${paddingConfig.textClass}
              ${textColorClass}
              ${placeholderClass}
              ${disabledTextClass}
              ${resizeClassMap[resize]}
              ${textareaClassName}
            `}
            aria-invalid={effectiveStatus === 'error'}
            aria-describedby={describedById}
            aria-required={required}
            aria-busy={loading}
            spellCheck={spellCheckEnabled}
            autoCapitalize={autoCapitalizeMode}
            autoCorrect={autoCorrectMode}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            onClick={handleClick}
            onKeyUp={handleKeyUp}
            onSelect={handleSelect}
            style={{
              fontFamily,
              caretColor: readOnly ? 'transparent' : caretColor,
              color: textColorHex,
              ...textareaInlineStyle,
            }}
            {...rest}
          />
        </div>

        {loading && (
          <div className={`absolute inset-0 flex items-center justify-center bg-[#151821]/80 backdrop-blur-sm rounded-[12px] z-10 ${loadingClassName}`}>
            <div className="flex flex-col items-center gap-3" role="status" aria-live="polite">
              <svg
                className="animate-spin h-8 w-8 text-[#FFCB00]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span className="text-sm text-white/90 font-medium" style={{ fontFamily }}>{loadingText}</span>
            </div>
          </div>
        )}
        </div>
      </div>

      {(derivedSupportingText || shouldShowCounter) && (
        <div className={`flex items-center justify-between px-2 sm:px-4 ${supportingWidthClass}`}>
          {derivedSupportingText && (
            <p
              id={effectiveStatus === 'error' ? errorId : supportingTextId}
              className={`text-[11px] sm:text-xs font-normal leading-5 tracking-[0.3px] ${getSupportingTextColor()} break-words overflow-hidden text-ellipsis flex-1 ${supportingTextClassName}`}
              style={{ fontFamily }}
            >
              {derivedSupportingText}
            </p>
          )}
          {shouldShowCounter && maxLength && (
            <span
              className={`text-[10px] sm:text-xs font-normal tracking-[0.4px] ml-2 shrink-0 ${
                characterCount >= maxLength ? 'text-[#FB2C36]' : 'text-[#99a1af]'
              } ${characterCountClassName}`}
              style={{ fontFamily }}
            >
              {characterCount}/{maxLength}
            </span>
          )}
        </div>
      )}

      {showClearButton && hasValue && !disabled && !readOnly && !loading && clearButtonPosition === 'bottom-right' && (
        <div className="flex justify-end -mt-4">
          <Button
            variant="secondary-destructive"
            size="xs"
            onClick={handleClear}
            aria-label={clearButtonAriaLabel}
          >
            {clearButtonText}
          </Button>
        </div>
      )}

      {overlayContent && <div className={`mt-2 px-2 sm:px-4 text-sm text-slate-200 ${overlayClassName}`}>{overlayContent}</div>}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
