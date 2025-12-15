'use client';

import React, { useState, useEffect, useCallback, useMemo, forwardRef } from 'react';
import { MinusIcon, PlusIcon, ChevronDownIcon } from '@/utils/icons';
import { classNames } from '@/utils/classNames';

/** Accordion size options */
export type AccordionSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** Accordion visual variants */
export type AccordionVariant = 'default' | 'filled' | 'outlined' | 'ghost' | 'separated' | 'flush';

/** Accordion border radius options */
export type AccordionRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

/** Content alignment options */
export type AccordionContentAlign = 'left' | 'center' | 'right';

/** Header alignment options */
export type AccordionHeaderAlign = 'left' | 'center' | 'right';

/** Individual accordion item configuration */
export interface AccordionItem {
  /** Unique identifier for the item */
  value: string;
  /** Header label - can be string or custom ReactNode */
  label: string | React.ReactNode;
  /** Content to display when expanded - supports any ReactNode (text, lists, mixed content, nested accordions) */
  children: React.ReactNode;
  /** Disable this specific item */
  disabled?: boolean;
  /** Custom className for this item's container */
  itemClassName?: string;
  /** Custom className for this item's header */
  headerClassName?: string;
  /** Custom className for this item's content */
  contentClassName?: string;
  /** Custom icon for this specific item */
  icon?: React.ReactNode;
  /** Subtitle or description shown below the label */
  subtitle?: string | React.ReactNode;
  /** Content alignment for this specific item (overrides global) */
  contentAlign?: AccordionContentAlign;
  /** Custom content padding for this specific item */
  contentPadding?: string;
  /** Custom header background color for this item */
  headerBgColor?: string;
  /** Custom header background color when expanded for this item */
  headerExpandedBgColor?: string;
  /** Custom content background color for this item */
  contentBgColor?: string;
  /** Header text alignment for this specific item (overrides global) */
  headerAlign?: AccordionHeaderAlign;
}

export interface BeeAccordionProps {
  /** Array of accordion items to render */
  items: AccordionItem[];
  /** Controlled expanded value (string for single, string[] for multiple) */
  value?: string | string[] | null;
  /** Default expanded value for uncontrolled mode */
  defaultValue?: string | string[] | null;
  /** Callback when expanded value changes */
  onChange?: (value: string | string[] | null) => void;
  /** Allow multiple items to be expanded simultaneously */
  multiple?: boolean;
  /** Allow collapsing the last open item (single mode) */
  collapsible?: boolean;
  /** Disable all accordion interactions */
  disabled?: boolean;
  
  // UI & Styling
  /** Additional className for the accordion container */
  className?: string;
  /** Inline styles for the accordion container */
  style?: React.CSSProperties;
  /** Default className applied to each item container */
  itemClassName?: string;
  /** Default className applied to each header */
  headerClassName?: string;
  /** Default className applied to each content area */
  contentClassName?: string;
  /** Custom icon for both states (overridden by expandIcon/collapseIcon) */
  icon?: React.ReactNode;
  /** Icon shown when item is collapsed */
  expandIcon?: React.ReactNode;
  /** Icon shown when item is expanded */
  collapseIcon?: React.ReactNode;
  /** Position of the icon in the header */
  iconPosition?: 'left' | 'right';
  /** Size variant affecting padding and font size */
  size?: AccordionSize;
  /** Make accordion take full container width */
  fullWidth?: boolean;
  /** Visual style variant */
  variant?: AccordionVariant;
  /** Border radius of items */
  radius?: AccordionRadius;
  /** Show dividers between items */
  dividers?: boolean;
  /** Gap/spacing between items */
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  // Color customization
  /** Custom background color for items */
  bgColor?: string;
  /** Custom background color when expanded */
  expandedBgColor?: string;
  /** Custom header background color (when collapsed) */
  headerBgColor?: string;
  /** Custom header background color when expanded */
  headerExpandedBgColor?: string;
  /** Custom header background on hover */
  headerHoverBgColor?: string;
  /** Custom text color */
  textColor?: string;
  /** Custom text color when expanded */
  expandedTextColor?: string;
  /** Custom border color */
  borderColor?: string;
  /** Custom border color when expanded */
  expandedBorderColor?: string;
  /** Custom accent/highlight color */
  accentColor?: string;
  /** Custom content background color */
  contentBgColor?: string;
  /** Custom content text color */
  contentTextColor?: string;
  /** Content horizontal alignment */
  contentAlign?: AccordionContentAlign;
  /** Header text alignment */
  headerAlign?: AccordionHeaderAlign;
  /** Custom padding for content area (e.g., 'p-4', 'px-6 py-4') */
  contentPadding?: string;
  /** Hide the expand/collapse icon */
  hideIcon?: boolean;
  
  // Animation / Transition
  /** Duration of expand/collapse animation in ms */
  transitionDuration?: number;
  /** CSS easing function for transitions */
  transitionEasing?: string;
  /** Enable/disable animations */
  animate?: boolean;
  
  // Accessibility
  /** ARIA label for the accordion container */
  ariaLabel?: string;
  /** ID of element that labels the accordion */
  ariaLabelledBy?: string;
  
  // Events
  /** Callback when an item expands */
  onExpand?: (value: string) => void;
  /** Callback when an item collapses */
  onCollapse?: (value: string) => void;

  // Advanced
  /** Keep content mounted in DOM when collapsed */
  keepMounted?: boolean;
  /** Unmount content when collapsed */
  unmountOnExit?: boolean;
  /** Animate icon rotation on expand/collapse */
  rotateIcon?: boolean;
  /** Custom icon rotation degree when expanded */
  iconRotation?: number;
  /** Expand all items initially (for multiple mode) */
  expandAll?: boolean;
}

/** Utility function to get size-based classes */
const getSizeClasses = (size: AccordionSize): { header: string; content: string } => {
  const sizes: Record<AccordionSize, { header: string; content: string }> = {
    xs: { header: 'px-3 py-2 text-xs', content: 'px-3 pb-3 pt-2 text-xs' },
    sm: { header: 'px-4 py-3 text-sm', content: 'px-4 pb-4 pt-3 text-sm' },
    md: { header: 'px-6 py-4 text-base', content: 'px-6 pb-6 pt-4 text-sm' },
    lg: { header: 'px-8 py-5 text-lg', content: 'px-8 pb-8 pt-5 text-base' },
    xl: { header: 'px-10 py-6 text-xl', content: 'px-10 pb-10 pt-6 text-lg' },
  };
  return sizes[size];
};

/** Utility function to get radius classes */
const getRadiusClasses = (radius: AccordionRadius): string => {
  const radii: Record<AccordionRadius, string> = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-2xl',
  };
  return radii[radius];
};

/** Utility function to get gap classes */
const getGapClasses = (gap: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'): string => {
  const gaps: Record<string, string> = {
    none: 'space-y-0',
    xs: 'space-y-1',
    sm: 'space-y-2',
    md: 'space-y-3',
    lg: 'space-y-4',
    xl: 'space-y-6',
  };
  return gaps[gap];
};

export const Accordion = forwardRef<HTMLDivElement, BeeAccordionProps>((
  {
    items,
    value: controlledValue,
    defaultValue = null,
    onChange,
    multiple = false,
    collapsible = true,
    disabled = false,
    className = '',
    style,
    itemClassName = '',
    headerClassName = '',
    contentClassName = '',
    icon,
    expandIcon: customExpandIcon,
    collapseIcon: customCollapseIcon,
    iconPosition = 'right',
    size = 'md',
    fullWidth = false,
    variant = 'default',
    radius = 'lg',
    dividers = false,
    gap = 'md',
    bgColor,
    expandedBgColor,
    headerBgColor,
    headerExpandedBgColor,
    headerHoverBgColor,
    textColor,
    expandedTextColor,
    borderColor,
    expandedBorderColor,
    accentColor = '#FFCB00',
    contentBgColor,
    contentTextColor,
    contentAlign = 'left',
    headerAlign = 'left',
    contentPadding,
    hideIcon = false,
    transitionDuration = 300,
    transitionEasing = 'ease-in-out',
    animate = true,
    ariaLabel,
    ariaLabelledBy,
    onExpand,
    onCollapse,
    keepMounted = false,
    unmountOnExit = false,
    rotateIcon = true,
    iconRotation = 180,
    expandAll = false,
  },
  ref
) => {
  // Initialize with expandAll if multiple mode
  const getInitialValue = () => {
    if (expandAll && multiple) {
      return items.map(item => item.value);
    }
    return defaultValue;
  };

  const [internalValue, setInternalValue] = useState<string | string[] | null>(getInitialValue());
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  useEffect(() => {
    if (isControlled) {
      setInternalValue(controlledValue);
    }
  }, [controlledValue, isControlled]);

  const isItemExpanded = useCallback((itemValue: string) => {
    if (multiple && Array.isArray(currentValue)) {
      return currentValue.includes(itemValue);
    } else if (!multiple && typeof currentValue === 'string') {
      return currentValue === itemValue;
    }
    return false;
  }, [currentValue, multiple]);

  const handleToggle = useCallback((itemId: string) => {
    if (disabled || items.find(item => item.value === itemId)?.disabled) {
      return;
    }

    let newValue: string | string[] | null = currentValue;

    if (multiple) {
      const currentArray = Array.isArray(currentValue) ? [...currentValue] : [];
      if (currentArray.includes(itemId)) {
        newValue = currentArray.filter((id) => id !== itemId);
        onCollapse?.(itemId);
      } else {
        newValue = [...currentArray, itemId];
        onExpand?.(itemId);
      }
    } else {
      if (currentValue === itemId) {
        if (collapsible) {
          newValue = null;
          onCollapse?.(itemId);
        }
      } else {
        newValue = itemId;
        onExpand?.(itemId);
        if (currentValue !== null) {
          onCollapse?.(currentValue as string);
        }
      }
    }

    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  }, [currentValue, multiple, collapsible, disabled, items, isControlled, onChange, onExpand, onCollapse]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent, itemId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle(itemId);
    }
  }, [handleToggle]);

  const sizeClasses = useMemo(() => getSizeClasses(size), [size]);
  const radiusClasses = useMemo(() => getRadiusClasses(radius), [radius]);
  const gapClasses = useMemo(() => getGapClasses(gap), [gap]);

  // Variant-based styling using Tailwind classes with optional custom color overrides
  const getVariantClasses = useCallback((isExpanded: boolean, isDisabled: boolean) => {
    const baseItem = 'overflow-hidden transition-all duration-300';
    const baseHeader = 'w-full text-left font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 flex items-center justify-between';
    
    // Check if custom colors are provided
    const hasCustomColors = bgColor || textColor || borderColor || accentColor !== '#FFCB00';
    
    switch (variant) {
      case 'filled':
        return {
          item: `${baseItem} ${radiusClasses} shadow-md border border-gray-600`,
          itemExpanded: `${baseItem} ${radiusClasses} shadow-md border border-yellow-500`,
          header: `${baseHeader} ${sizeClasses.header}`,
          headerDefault: 'bg-gray-800 text-white hover:bg-gray-700',
          headerExpanded: 'bg-gray-700 text-yellow-400',
          content: 'bg-gray-800',
          hasCustomColors,
        };
      
      case 'outlined':
        return {
          item: `${baseItem} ${radiusClasses} border-2 border-gray-600 bg-transparent`,
          itemExpanded: `${baseItem} ${radiusClasses} border-2 border-yellow-500 bg-transparent`,
          header: `${baseHeader} ${sizeClasses.header}`,
          headerDefault: 'text-white hover:bg-white/5',
          headerExpanded: 'text-yellow-400 bg-white/5',
          content: 'bg-transparent',
          hasCustomColors,
        };
      
      case 'ghost':
        return {
          item: `${baseItem} ${radiusClasses} border-l-3 border-l-transparent`,
          itemExpanded: `${baseItem} ${radiusClasses} border-l-3 border-l-yellow-500`,
          header: `${baseHeader} ${sizeClasses.header}`,
          headerDefault: 'text-white hover:bg-white/5',
          headerExpanded: 'text-yellow-400 bg-yellow-500/10',
          content: 'bg-transparent',
          hasCustomColors,
        };
      
      case 'separated':
        return {
          item: `${baseItem} ${radiusClasses} shadow-lg border border-gray-700 bg-gray-800`,
          itemExpanded: `${baseItem} ${radiusClasses} shadow-lg border border-yellow-500 bg-gray-800 ring-1 ring-yellow-500/30`,
          header: `${baseHeader} ${sizeClasses.header}`,
          headerDefault: 'text-white hover:bg-gray-700',
          headerExpanded: 'bg-gray-700 text-yellow-400',
          content: 'bg-gray-800',
          hasCustomColors,
        };
      
      case 'flush':
        return {
          item: `${baseItem} rounded-none border-b border-gray-700 bg-transparent`,
          itemExpanded: `${baseItem} rounded-none border-b border-gray-700 bg-transparent`,
          header: `${baseHeader} ${sizeClasses.header} !px-0`,
          headerDefault: 'text-white',
          headerExpanded: 'text-yellow-400',
          content: 'bg-transparent',
          hasCustomColors,
        };
      
      case 'default':
      default:
        return {
          item: `${baseItem} ${radiusClasses} shadow-md border border-gray-600 bg-gray-800`,
          itemExpanded: `${baseItem} ${radiusClasses} shadow-lg border border-yellow-500 bg-gray-800 ring-1 ring-yellow-500/30`,
          header: `${baseHeader} ${sizeClasses.header}`,
          headerDefault: 'text-white hover:bg-gray-700',
          headerExpanded: 'bg-gray-700 text-yellow-400',
          content: 'bg-gray-800',
          hasCustomColors,
        };
    }
  }, [variant, radiusClasses, sizeClasses, bgColor, textColor, borderColor, accentColor]);

  // Get custom inline styles only when custom colors are provided (global level)
  const getCustomStyles = useCallback((isExpanded: boolean, itemOverrides?: { headerBgColor?: string; headerExpandedBgColor?: string; contentBgColor?: string }) => {
    const hasCustomColors = bgColor || textColor || borderColor || expandedBgColor || expandedTextColor || expandedBorderColor || headerBgColor || headerExpandedBgColor || contentBgColor || contentTextColor || accentColor !== '#FFCB00' || itemOverrides?.headerBgColor || itemOverrides?.headerExpandedBgColor || itemOverrides?.contentBgColor;
    
    if (!hasCustomColors) {
      return { item: {}, header: {}, content: {} };
    }

    // Per-item overrides take precedence over global settings
    const effectiveHeaderBg = itemOverrides?.headerBgColor || headerBgColor;
    const effectiveHeaderExpandedBg = itemOverrides?.headerExpandedBgColor || headerExpandedBgColor;
    const effectiveContentBg = itemOverrides?.contentBgColor || contentBgColor;

    return {
      item: {
        backgroundColor: bgColor,
        borderColor: isExpanded ? (expandedBorderColor || accentColor) : borderColor,
        ...(isExpanded && accentColor !== '#FFCB00' ? { boxShadow: `0 0 0 1px ${accentColor}30` } : {}),
      },
      header: {
        backgroundColor: isExpanded ? effectiveHeaderExpandedBg : effectiveHeaderBg,
        color: isExpanded ? (expandedTextColor || accentColor) : textColor,
      },
      content: {
        backgroundColor: effectiveContentBg,
        color: contentTextColor,
      },
    };
  }, [bgColor, expandedBgColor, headerBgColor, headerExpandedBgColor, textColor, expandedTextColor, borderColor, expandedBorderColor, accentColor, contentBgColor, contentTextColor]);

  const expandIconElement = useMemo(() => {
    if (icon) return icon;
    return customExpandIcon || <ChevronDownIcon className="w-5 h-5" />;
  }, [icon, customExpandIcon]);

  const collapseIconElement = useMemo(() => {
    if (icon) return icon;
    return customCollapseIcon || <ChevronDownIcon className="w-5 h-5" />;
  }, [icon, customCollapseIcon]);

  const animationStyles = animate ? {
    transition: `max-height ${transitionDuration}ms ${transitionEasing}, opacity ${transitionDuration}ms ${transitionEasing}`,
  } : {};

  return (
    <div 
      ref={ref}
      className={`${gapClasses} ${fullWidth ? 'w-full' : ''} ${className}`}
      style={style}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      role="region"
    >
      {items.map((item, index) => {
        const isExpanded = isItemExpanded(item.value);
        const isDisabled = disabled || item.disabled || false;
        const shouldRenderContent = keepMounted || isExpanded;
        const unmountImmediately = !keepMounted && !isExpanded && unmountOnExit;
        const variantClasses = getVariantClasses(isExpanded, isDisabled);
        // Pass per-item color overrides
        const customStyles = getCustomStyles(isExpanded, {
          headerBgColor: item.headerBgColor,
          headerExpandedBgColor: item.headerExpandedBgColor,
          contentBgColor: item.contentBgColor,
        });

        return (
          <div
            key={item.value}
            className={classNames(
              isExpanded ? variantClasses.itemExpanded : variantClasses.item,
              item.itemClassName || itemClassName || '',
              isDisabled && 'opacity-60 cursor-not-allowed'
            )}
            style={variantClasses.hasCustomColors ? customStyles.item : undefined}
          >
            {/* Divider */}
            {dividers && index !== 0 && (
              <div className={`border-t ${borderColor ? '' : 'border-gray-700'}`} style={borderColor ? { borderColor } : undefined} />
            )}
            
            {/* Header */}
            <button
              onClick={() => handleToggle(item.value)}
              onKeyDown={(e) => handleKeyDown(e, item.value)}
              className={classNames(
                variantClasses.header,
                isExpanded ? variantClasses.headerExpanded : variantClasses.headerDefault,
                headerClassName,
                item.headerClassName || '',
                isDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
                iconPosition === 'left' && 'flex-row-reverse',
                animate && `duration-${transitionDuration}`
              )}
              style={variantClasses.hasCustomColors ? customStyles.header : undefined}
              aria-expanded={isExpanded}
              aria-controls={`accordion-content-${item.value}`}
              id={`accordion-header-${item.value}`}
              disabled={isDisabled}
            >
              <div className={classNames(
                'flex-1',
                // Header alignment - per item or global (only when icon is on right, otherwise text goes opposite to icon)
                iconPosition === 'left' ? 'text-right' : (
                  (item.headerAlign || headerAlign) === 'center' ? 'text-center' :
                  (item.headerAlign || headerAlign) === 'right' ? 'text-right' : 'text-left'
                )
              )}>
                <span className={iconPosition === 'left' ? 'pl-4' : 'pr-4'}>{item.label}</span>
                {item.subtitle && (
                  <div className={classNames(
                    'text-sm font-normal mt-1',
                    contentTextColor ? '' : 'text-gray-400'
                  )} style={contentTextColor ? { color: contentTextColor } : undefined}>
                    {item.subtitle}
                  </div>
                )}
              </div>
              {!hideIcon && (
                <div
                  className="flex-shrink-0 transition-transform"
                  style={animate ? { 
                    transform: rotateIcon && isExpanded ? `rotate(${iconRotation}deg)` : 'rotate(0deg)',
                    transitionDuration: `${transitionDuration}ms`,
                    transitionTimingFunction: transitionEasing,
                  } : undefined}
                >
                  {item.icon || (rotateIcon ? expandIconElement : (isExpanded ? collapseIconElement : expandIconElement))}
                </div>
              )}
            </button>

            {/* Content */}
            {shouldRenderContent && (
              <div
                id={`accordion-content-${item.value}`}
                aria-labelledby={`accordion-header-${item.value}`}
                role="region"
                className={classNames(
                  'overflow-hidden',
                  variantClasses.content,
                  contentClassName,
                  item.contentClassName || '',
                  isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                )}
                style={{
                  ...animationStyles,
                  ...(variantClasses.hasCustomColors ? customStyles.content : {}),
                }}
              >
                <div className={classNames(
                  item.contentPadding || contentPadding || sizeClasses.content,
                  'leading-relaxed',
                  contentTextColor ? '' : 'text-gray-300',
                  // Content alignment - per item or global
                  (item.contentAlign || contentAlign) === 'center' && 'text-center',
                  (item.contentAlign || contentAlign) === 'right' && 'text-right',
                  (item.contentAlign || contentAlign) === 'left' && 'text-left'
                )} style={contentTextColor ? { color: contentTextColor } : undefined}>
                  {item.children}
                </div>
              </div>
            )}
            {unmountImmediately && null}
          </div>
        );
      })}
    </div>
  );
});

Accordion.displayName = 'Accordion';

export default Accordion;