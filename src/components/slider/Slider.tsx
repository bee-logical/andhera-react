'use client';

import React, { useState, useRef, useEffect, useCallback, forwardRef } from 'react';

/** Size options for the slider: 'sm' (small), 'md' (medium), 'lg' (large) */
export type SliderSize = 'sm' | 'md' | 'lg';

/** Color variants for the slider appearance */
export type SliderVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'dark';

/** Orientation options for the slider: 'horizontal' or 'vertical' */
export type SliderOrientation = 'horizontal' | 'vertical';

/** Tooltip position relative to the thumb */
export type SliderTooltipPosition = 'top' | 'bottom' | 'left' | 'right';

/** Mark definition for custom step markers */
export interface SliderMark {
  /** The value position for this mark */
  value: number;
  /** Optional label to display at this mark */
  label?: string;
}

export interface SliderProps {
  /** Minimum value of the slider. Default: 0 */
  min?: number;
  /** Maximum value of the slider. Default: 100 */
  max?: number;
  /** Step increment for value changes. Use decimal values for precise control (e.g., 0.1). Default: 1 */
  step?: number;
  /** Current value for controlled mode. Use with onChange. */
  value?: number;
  /** Default value for uncontrolled mode. Default: min */
  defaultValue?: number;
  /** Callback fired when value changes. Receives the new value. */
  onChange?: (value: number) => void;
  /** Callback fired when dragging starts */
  onChangeStart?: (value: number) => void;
  /** Callback fired when dragging ends */
  onChangeEnd?: (value: number) => void;
  /** When true, disables the slider and prevents interaction. Default: false */
  disabled?: boolean;
  /** When true, makes the slider read-only but still focusable. Default: false */
  readOnly?: boolean;
  /** Orientation of the slider: 'horizontal' | 'vertical'. Default: 'horizontal' */
  orientation?: SliderOrientation;
  /** Color variant: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'dark'. Default: 'primary' */
  variant?: SliderVariant;
  /** Size of the slider: 'sm' | 'md' | 'lg'. Default: 'md' */
  size?: SliderSize;
  /** When true, always shows tooltip with current value. Default: false */
  showTooltip?: boolean;
  /** When true, shows tooltip only while dragging. Default: false */
  showTooltipOnDrag?: boolean;
  /** Position of the tooltip: 'top' | 'bottom' | 'left' | 'right'. Default: 'top' */
  tooltipPosition?: SliderTooltipPosition;
  /** Custom formatter function for tooltip text. Receives value, returns display string. */
  tooltipFormat?: (value: number) => string;
  /** Label text displayed above the slider */
  label?: string;
  /** When true, displays a required indicator (*) next to the label. Default: false */
  required?: boolean;
  /** Description text displayed below the slider */
  description?: string;
  /** Helper text displayed below the slider (hidden when error is shown) */
  helperText?: string;
  /** When true, displays the slider in error state. Default: false */
  error?: boolean;
  /** Error message displayed below the slider when error is true */
  errorMessage?: string;
  /** When true, shows step markers on the track. Default: false */
  showSteps?: boolean;
  /** Custom marks to display on the track. Overrides showSteps when provided. */
  marks?: SliderMark[];
  /** When true, shows min/max and current value labels. Default: false */
  showValueLabels?: boolean;
  /** When true, enables range selection with two thumbs. Default: false */
  range?: boolean;
  /** Start value for range slider in controlled mode */
  valueStart?: number;
  /** End value for range slider in controlled mode */
  valueEnd?: number;
  /** Callback fired when range values change. Receives (start, end) values. */
  onRangeChange?: (start: number, end: number) => void;
  /** When true, inverts the slider direction (right-to-left or bottom-to-top). Default: false */
  inverted?: boolean;
  /** Width of the slider track in pixels or CSS value. Default: 400 for horizontal */
  trackWidth?: number | string;
  /** Height of the slider track in pixels or CSS value. Default: 320 for vertical */
  trackHeight?: number | string;
  /** Custom class name for the container */
  className?: string;
  /** Custom class name for the track element */
  trackClassName?: string;
  /** Custom class name for the thumb element(s) */
  thumbClassName?: string;
  /** Custom class name for the filled track portion */
  fillClassName?: string;
  /** Custom class name for the label element */
  labelClassName?: string;
  /** Custom class name for the tooltip element */
  tooltipClassName?: string;
  /** Custom class name for the description/helper text */
  descriptionClassName?: string;
  /** Custom class name for step markers */
  stepClassName?: string;
  /** ID attribute for the slider */
  id?: string;
  /** Name attribute for form submission */
  name?: string;
  /** Accessible label when no visible label is provided */
  'aria-label'?: string;
  /** ID of an element that labels the slider */
  'aria-labelledby'?: string;
  /** ID of an element that describes the slider */
  'aria-describedby'?: string;
  /** Accessible text announcing value changes (for screen readers) */
  'aria-valuetext'?: string;
}

const Slider = forwardRef<HTMLDivElement, SliderProps>(({
  min = 0,
  max = 100,
  step = 1,
  value: controlledValue,
  defaultValue,
  onChange,
  onChangeStart,
  onChangeEnd,
  disabled = false,
  readOnly = false,
  orientation = 'horizontal',
  variant = 'primary',
  size = 'md',
  showTooltip = false,
  showTooltipOnDrag = false,
  tooltipPosition = 'top',
  tooltipFormat = (val) => val.toString(),
  label,
  required = false,
  description,
  helperText,
  error = false,
  errorMessage,
  showSteps = false,
  marks,
  showValueLabels = false,
  range = false,
  valueStart: controlledStart,
  valueEnd: controlledEnd,
  onRangeChange,
  inverted = false,
  trackWidth,
  trackHeight,
  className = '',
  trackClassName = '',
  thumbClassName = '',
  fillClassName = '',
  labelClassName = '',
  tooltipClassName = '',
  descriptionClassName = '',
  stepClassName = '',
  id,
  name,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  'aria-valuetext': ariaValueText,
}, ref) => {
  // State management for controlled/uncontrolled mode
  const [internalValue, setInternalValue] = useState(defaultValue ?? min);
  const [internalStart, setInternalStart] = useState(controlledStart ?? min);
  const [internalEnd, setInternalEnd] = useState(controlledEnd ?? max);
  
  const [isDragging, setIsDragging] = useState(false);
  const [activeThumb, setActiveThumb] = useState<'single' | 'start' | 'end' | null>(null);
  const [showTooltipState, setShowTooltipState] = useState(false);
  
  const trackRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLDivElement | null>(null);
  const thumbStartRef = useRef<HTMLDivElement | null>(null);
  const thumbEndRef = useRef<HTMLDivElement | null>(null);

  // Use controlled value if provided, otherwise use internal state
  const currentValue = controlledValue !== undefined ? controlledValue : internalValue;
  const currentStart = controlledStart !== undefined ? controlledStart : internalStart;
  const currentEnd = controlledEnd !== undefined ? controlledEnd : internalEnd;

  // Check if interaction is allowed
  const isInteractive = !disabled && !readOnly;

  // Clamp value within min/max range
  const clampValue = useCallback((val: number) => {
    const steppedValue = Math.round((val - min) / step) * step + min;
    return Math.min(Math.max(steppedValue, min), max);
  }, [min, max, step]);

  // Convert pixel position to value
  const getValueFromPosition = useCallback((clientX: number, clientY: number) => {
    if (!trackRef.current) return min;
    
    const rect = trackRef.current.getBoundingClientRect();
    let percentage: number;
    
    if (orientation === 'horizontal') {
      percentage = (clientX - rect.left) / rect.width;
      if (inverted) percentage = 1 - percentage;
    } else {
      percentage = 1 - (clientY - rect.top) / rect.height;
      if (inverted) percentage = 1 - percentage;
    }
    
    const rawValue = min + percentage * (max - min);
    return clampValue(rawValue);
  }, [min, max, orientation, inverted, clampValue]);

  // Handle mouse/touch move
  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (!isInteractive) return;
    
    const newValue = getValueFromPosition(clientX, clientY);
    
    if (range) {
      if (activeThumb === 'start') {
        const clampedStart = Math.min(newValue, currentEnd);
        if (controlledStart === undefined) setInternalStart(clampedStart);
        onRangeChange?.(clampedStart, currentEnd);
      } else if (activeThumb === 'end') {
        const clampedEnd = Math.max(newValue, currentStart);
        if (controlledEnd === undefined) setInternalEnd(clampedEnd);
        onRangeChange?.(currentStart, clampedEnd);
      }
    } else {
      if (controlledValue === undefined) setInternalValue(newValue);
      onChange?.(newValue);
    }
  }, [isInteractive, range, activeThumb, currentStart, currentEnd, controlledValue, controlledStart, controlledEnd, getValueFromPosition, onChange, onRangeChange]);

  // Mouse handlers
  const handleMouseDown = (thumb: 'single' | 'start' | 'end') => (e: React.MouseEvent) => {
    if (!isInteractive) return;
    e.preventDefault();
    setIsDragging(true);
    setActiveThumb(thumb);
    setShowTooltipState(true);
    // Fire onChangeStart
    if (range) {
      onChangeStart?.(thumb === 'start' ? currentStart : currentEnd);
    } else {
      onChangeStart?.(currentValue);
    }
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX, e.clientY);
  }, [isDragging, handleMove]);

  const handleMouseUp = useCallback(() => {
    // Fire onChangeEnd before resetting state
    if (isDragging) {
      if (range) {
        onChangeEnd?.(activeThumb === 'start' ? currentStart : currentEnd);
      } else {
        onChangeEnd?.(currentValue);
      }
    }
    setIsDragging(false);
    setActiveThumb(null);
    if (!showTooltip && !showTooltipOnDrag) setShowTooltipState(false);
  }, [showTooltip, showTooltipOnDrag, isDragging, range, activeThumb, currentStart, currentEnd, currentValue, onChangeEnd]);

  // Touch handlers
  const handleTouchStart = (thumb: 'single' | 'start' | 'end') => (e: React.TouchEvent) => {
    if (!isInteractive) return;
    setIsDragging(true);
    setActiveThumb(thumb);
    setShowTooltipState(true);
    // Fire onChangeStart
    if (range) {
      onChangeStart?.(thumb === 'start' ? currentStart : currentEnd);
    } else {
      onChangeStart?.(currentValue);
    }
  };

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging || !e.touches[0]) return;
    e.preventDefault();
    handleMove(e.touches[0].clientX, e.touches[0].clientY);
  }, [isDragging, handleMove]);

  const handleTouchEnd = useCallback(() => {
    // Fire onChangeEnd before resetting state
    if (isDragging) {
      if (range) {
        onChangeEnd?.(activeThumb === 'start' ? currentStart : currentEnd);
      } else {
        onChangeEnd?.(currentValue);
      }
    }
    setIsDragging(false);
    setActiveThumb(null);
    if (!showTooltip && !showTooltipOnDrag) setShowTooltipState(false);
  }, [showTooltip, showTooltipOnDrag, isDragging, range, activeThumb, currentStart, currentEnd, currentValue, onChangeEnd]);

  // Track click handler with auto-focus
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isInteractive || isDragging) return;
    const newValue = getValueFromPosition(e.clientX, e.clientY);
    let thumbToFocus: 'single' | 'start' | 'end' = 'single';
    if (range) {
      // Determine which thumb is closer
      const distToStart = Math.abs(newValue - currentStart);
      const distToEnd = Math.abs(newValue - currentEnd);
      if (distToStart < distToEnd) {
        const clampedStart = Math.min(newValue, currentEnd);
        if (controlledStart === undefined) setInternalStart(clampedStart);
        onRangeChange?.(clampedStart, currentEnd);
        thumbToFocus = 'start';
      } else {
        const clampedEnd = Math.max(newValue, currentStart);
        if (controlledEnd === undefined) setInternalEnd(clampedEnd);
        onRangeChange?.(currentStart, clampedEnd);
        thumbToFocus = 'end';
      }
    } else {
      if (controlledValue === undefined) setInternalValue(newValue);
      onChange?.(newValue);
      thumbToFocus = 'single';
    }
    // Focus the correct thumb after value change
    setTimeout(() => {
      if (range) {
        if (thumbToFocus === 'start' && thumbStartRef.current) thumbStartRef.current.focus();
        if (thumbToFocus === 'end' && thumbEndRef.current) thumbEndRef.current.focus();
      } else {
        if (thumbRef.current) thumbRef.current.focus();
      }
    }, 0);
  };

  // Keyboard handlers
  const handleKeyDown = (thumb: 'single' | 'start' | 'end') => (e: React.KeyboardEvent) => {
    if (!isInteractive) return;
    
    let delta = 0;
    // Handle inverted direction
    const leftKey = inverted ? 'ArrowRight' : 'ArrowLeft';
    const rightKey = inverted ? 'ArrowLeft' : 'ArrowRight';
    const upKey = inverted ? 'ArrowDown' : 'ArrowUp';
    const downKey = inverted ? 'ArrowUp' : 'ArrowDown';
    
    if (e.key === rightKey || e.key === upKey) {
      delta = step;
      e.preventDefault();
    } else if (e.key === leftKey || e.key === downKey) {
      delta = -step;
      e.preventDefault();
    } else if (e.key === 'Home') {
      delta = min - (range ? (thumb === 'start' ? currentStart : currentEnd) : currentValue);
      e.preventDefault();
    } else if (e.key === 'End') {
      delta = max - (range ? (thumb === 'start' ? currentStart : currentEnd) : currentValue);
      e.preventDefault();
    } else if (e.key === 'PageUp') {
      delta = step * 10;
      e.preventDefault();
    } else if (e.key === 'PageDown') {
      delta = -step * 10;
      e.preventDefault();
    }
    
    if (delta !== 0) {
      if (range) {
        if (thumb === 'start') {
          const newStart = clampValue(currentStart + delta);
          const clampedStart = Math.min(newStart, currentEnd);
          if (controlledStart === undefined) setInternalStart(clampedStart);
          onRangeChange?.(clampedStart, currentEnd);
        } else if (thumb === 'end') {
          const newEnd = clampValue(currentEnd + delta);
          const clampedEnd = Math.max(newEnd, currentStart);
          if (controlledEnd === undefined) setInternalEnd(clampedEnd);
          onRangeChange?.(currentStart, clampedEnd);
        }
      } else {
        const newValue = clampValue(currentValue + delta);
        if (controlledValue === undefined) setInternalValue(newValue);
        onChange?.(newValue);
      }
    }
  };

  // Event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  // Show tooltip on mount if showTooltip is true
  useEffect(() => {
    setShowTooltipState(showTooltip);
  }, [showTooltip]);

  // Size mappings
  const sizeClasses = {
    sm: {
      track: orientation === 'horizontal' ? 'h-[3px]' : 'w-[3px] h-64',
      thumb: 'w-[28px] h-[18px]',
      offset: 14, // Half of 28px
    },
    md: {
      track: orientation === 'horizontal' ? 'h-[4px]' : 'w-[4px] h-80',
      thumb: 'w-[32px] h-[20px]',
      offset: 16, // Half of 32px
    },
    lg: {
      track: orientation === 'horizontal' ? 'h-[6px]' : 'w-[6px] h-96',
      thumb: 'w-[38px] h-[24px]',
      offset: 19, // Half of 38px
    },
  };

  // Variant color mappings
  const variantClasses = {
    default: {
      fill: 'bg-gray-400 dark:bg-gray-600',
      thumb: 'border-gray-500 dark:border-gray-600',
      focus: 'focus:ring-gray-500',
    },
    primary: {
      fill: 'bg-[#FFCB00]',
      thumb: 'border-[#FFCB00]',
      focus: 'focus:ring-[#FFCB00]',
    },
    secondary: {
      fill: 'bg-gray-600 dark:bg-gray-500',
      thumb: 'border-gray-600 dark:border-gray-500',
      focus: 'focus:ring-gray-500',
    },
    success: {
      fill: 'bg-green-600 dark:bg-green-500',
      thumb: 'border-green-600 dark:border-green-500',
      focus: 'focus:ring-green-500',
    },
    warning: {
      fill: 'bg-yellow-500 dark:bg-yellow-400',
      thumb: 'border-yellow-500 dark:border-yellow-400',
      focus: 'focus:ring-yellow-500',
    },
    danger: {
      fill: 'bg-red-600 dark:bg-red-500',
      thumb: 'border-red-600 dark:border-red-500',
      focus: 'focus:ring-red-500',
    },
    info: {
      fill: 'bg-cyan-600 dark:bg-cyan-500',
      thumb: 'border-cyan-600 dark:border-cyan-500',
      focus: 'focus:ring-cyan-500',
    },
    dark: {
      fill: 'bg-gray-900 dark:bg-gray-800',
      thumb: 'border-gray-900 dark:border-gray-800',
      focus: 'focus:ring-gray-900',
    },
  };

  // Calculate percentages
  const getPercentage = (val: number) => ((val - min) / (max - min)) * 100;
  
  const singlePercentage = getPercentage(currentValue);
  const startPercentage = getPercentage(currentStart);
  const endPercentage = getPercentage(currentEnd);

  // Generate step markers or custom marks
  const stepsToRender: SliderMark[] = marks || (showSteps ? Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i): SliderMark => ({ value: min + i * step })) : []);

  // Calculate track dimensions
  const getTrackWidth = () => {
    if (trackWidth) return typeof trackWidth === 'number' ? `${trackWidth}px` : trackWidth;
    return orientation === 'horizontal' ? '400px' : '24px';
  };
  
  const getTrackHeight = () => {
    if (trackHeight) return typeof trackHeight === 'number' ? `${trackHeight}px` : trackHeight;
    return orientation === 'vertical' ? '320px' : '24px';
  };

  // Helper/error text ID for aria-describedby
  const helperId = id ? `${id}-helper` : undefined;
  const errorId = id ? `${id}-error` : undefined;
  const descriptionId = id ? `${id}-description` : undefined;

  // Tooltip positioning
  const getTooltipPositionClass = () => {
    if (orientation === 'vertical') {
      return tooltipPosition === 'left' ? '-left-12' : tooltipPosition === 'right' ? '-right-12' : 'left-1/2 -translate-x-1/2';
    }
    return tooltipPosition === 'bottom' ? '-bottom-8' : '-top-8';
  };

  // Render tooltip
  const renderTooltip = (value: number, isVisible: boolean) => {
    const shouldShow = showTooltip || (showTooltipOnDrag && isVisible);
    if (!shouldShow && !isVisible) return null;
    
    return (
      <div
        className={`
          absolute ${getTooltipPositionClass()}
          bg-gray-900 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded shadow-lg
          whitespace-nowrap pointer-events-none z-10
          ${tooltipClassName}
        `}
      >
        {tooltipFormat(value)}
      </div>
    );
  };

  // Render thumb
  const renderThumb = (
    value: number,
    percentage: number,
    thumbType: 'single' | 'start' | 'end',
    thumbRef: React.RefObject<HTMLDivElement>
  ) => {
    const isActive = activeThumb === thumbType;
    const effectivePercentage = inverted ? 100 - percentage : percentage;
    
    return (
      <div
        ref={thumbRef}
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-disabled={disabled}
        aria-readonly={readOnly}
        aria-orientation={orientation}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy || (error && errorId) || helperId || descriptionId}
        aria-valuetext={ariaValueText || tooltipFormat(value)}
        aria-invalid={error}
        className={`
          absolute rounded-full bg-white shadow-md
          transition-transform
          ${!isInteractive ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-105'}
          ${isActive ? 'scale-110' : ''}
          focus:ring-2 focus:ring-offset-2 focus:outline-none focus:ring-[#FFCB00]
          ${thumbClassName}
          ${sizeClasses[size].thumb}
          ${orientation === 'horizontal' ? 'top-1/2 -translate-y-1/2' : 'left-1/2 -translate-x-1/2'}
        `}
        style={orientation === 'horizontal' ? {
          left: `calc(${effectivePercentage}% - ${sizeClasses[size].offset}px)`
        } : {
          bottom: `calc(${effectivePercentage}% - ${sizeClasses[size].offset}px)`
        }}
        onMouseDown={handleMouseDown(thumbType)}
        onTouchStart={handleTouchStart(thumbType)}
        onKeyDown={handleKeyDown(thumbType)}
      >
        {renderTooltip(value, isActive || showTooltipState)}
      </div>
    );
  };

  return (
    <div
      ref={ref}
      id={id}
      className={`
        ${orientation === 'horizontal' ? 'flex flex-col gap-2' : 'flex flex-row items-center gap-4'} 
        w-full select-none
        ${className}
      `}
    >
      {/* Label */}
      {label && (
        <label className={`text-sm font-medium text-white ${labelClassName}`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Main slider container with value label */}
      <div className={`${orientation === 'horizontal' ? 'flex items-center gap-3' : 'flex flex-col gap-2 h-full'}`}>
        {/* Slider container */}
        <div 
          className={`relative`} 
          style={{ 
            width: getTrackWidth(), 
            height: getTrackHeight() 
          }}
        >
          {/* Hidden input for form submission */}
          {name && (
            <input
              type="hidden"
              name={name}
              value={range ? `${currentStart}-${currentEnd}` : currentValue}
            />
          )}

          {/* Track */}
          <div
            ref={trackRef}
            className={`
              absolute rounded-full bg-[#262626]
              ${orientation === 'horizontal' ? `top-1/2 left-0 -translate-y-1/2 ${sizeClasses[size].track}` : `left-1/2 top-0 -translate-x-1/2 ${sizeClasses[size].track}`}
              ${!isInteractive ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
              ${error ? 'ring-2 ring-red-500' : ''}
              ${trackClassName}
            `}
            style={orientation === 'horizontal' ? { width: getTrackWidth() } : { height: getTrackHeight() }}
            onClick={handleTrackClick}
          >
          {/* Filled track */}
          {range ? (
            <div
              className={`
                absolute rounded-full transition-none
                ${orientation === 'horizontal' ? 'top-0 h-full' : 'left-0 w-full'}
                ${error ? 'bg-red-500' : variantClasses[variant].fill}
                ${fillClassName}
              `}
              style={orientation === 'horizontal' ? {
                left: inverted ? `${100 - endPercentage}%` : `${startPercentage}%`,
                width: `${endPercentage - startPercentage}%`
              } : {
                bottom: inverted ? `${100 - endPercentage}%` : `${startPercentage}%`,
                height: `${endPercentage - startPercentage}%`
              }}
            />
          ) : (
            <div
              className={`
                absolute rounded-full transition-none
                ${orientation === 'horizontal' ? 'top-0 h-full' : 'left-0 w-full'}
                ${error ? 'bg-red-500' : variantClasses[variant].fill}
                ${fillClassName}
              `}
              style={orientation === 'horizontal' ? {
                left: inverted ? `${100 - singlePercentage}%` : '0',
                width: `${singlePercentage}%`
              } : {
                bottom: inverted ? `${100 - singlePercentage}%` : '0',
                height: `${singlePercentage}%`
              }}
            />
          )}

          {/* Step markers / Custom marks */}
          {stepsToRender.map((mark, index) => {
            const markPercentage = getPercentage(mark.value);
            const effectivePercentage = inverted ? 100 - markPercentage : markPercentage;
            return (
              <div
                key={mark.value}
                className={`
                  absolute ${orientation === 'horizontal' ? 'top-1/2 -translate-y-1/2' : 'left-1/2 -translate-x-1/2'}
                  ${stepClassName}
                `}
                style={
                  orientation === 'horizontal'
                    ? { left: `${effectivePercentage}%` }
                    : { bottom: `${effectivePercentage}%` }
                }
              >
                <div className="w-1 h-1 rounded-full bg-gray-500" />
                {mark.label && (
                  <span className="absolute text-xs text-gray-400 mt-2 -translate-x-1/2 whitespace-nowrap">
                    {mark.label}
                  </span>
                )}
              </div>
            );
          })}

          {/* Thumbs */}
          {range ? (
            <>
              {renderThumb(currentStart, startPercentage, 'start', thumbStartRef)}
              {renderThumb(currentEnd, endPercentage, 'end', thumbEndRef)}
            </>
          ) : (
            renderThumb(currentValue, singlePercentage, 'single', thumbRef)
          )}
        </div>

        {/* Value labels for vertical */}
        {showValueLabels && orientation === 'vertical' && (
          <div className="flex flex-col justify-between ml-2 text-xs text-gray-600 dark:text-gray-400 h-full">
            <span>{inverted ? min : max}</span>
            {range && (
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                {currentStart} - {currentEnd}
              </span>
            )}
            {!range && <span className="text-blue-600 dark:text-blue-400 font-semibold">{currentValue}</span>}
            <span>{inverted ? max : min}</span>
          </div>
        )}
      </div>

      {/* Value display for horizontal slider */}
      {showValueLabels && orientation === 'horizontal' && (
        <div className="w-[40px] text-right">
          <p className="font-manrope font-normal leading-[1.3] text-[14px] text-white">
            {range ? `${Math.round((currentStart + currentEnd) / 2)}%` : `${Math.round(currentValue)}%`}
          </p>
        </div>
      )}
    </div>

      {/* Description */}
      {description && !error && (
        <p id={descriptionId} className={`text-xs text-gray-300 mt-1 ${descriptionClassName}`}>
          {description}
        </p>
      )}

      {/* Helper text */}
      {helperText && !error && !description && (
        <p id={helperId} className={`text-xs text-gray-400 mt-1 ${descriptionClassName}`}>
          {helperText}
        </p>
      )}

      {/* Error message */}
      {error && errorMessage && (
        <p id={errorId} className={`text-xs text-red-500 mt-1 ${descriptionClassName}`} role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
});

Slider.displayName = 'Slider';

export default Slider;
