'use client';

import React, { forwardRef, useEffect, useCallback, useState, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import './Dropdown.css';

// ============================================================================
// TYPES
// ============================================================================

export interface DropdownMenuOption {
  id?: string | number;
  label?: string;
  value?: any;
  disabled?: boolean;
  group?: string;
  description?: string;
  icon?: React.ReactNode;
  [key: string]: any;
}

export interface DropdownMenuProps {
  /** Whether the menu is open */
  open: boolean;
  /** Reference element to position the menu relative to */
  anchorEl: HTMLElement | null;
  /** Options to display in the menu */
  options: DropdownMenuOption[];
  /** Currently selected value(s) - can be single option, array, or their IDs/values */
  selectedValue?: any;
  /** Callback when an option is selected */
  onSelect?: (option: DropdownMenuOption) => void;
  /** Callback when menu should close */
  onClose?: () => void;
  /** Multiple selection mode */
  multiple?: boolean;
  
  // ====== Filtering ======
  /** Filtered options (if filtering is handled externally) */
  filteredOptions?: DropdownMenuOption[];
  /** Current highlighted/focused index */
  highlightedIndex?: number;
  /** Callback when highlighted index changes */
  onHighlightChange?: (index: number) => void;
  
  // ====== Grouping ======
  /** Group options by this key */
  groupBy?: string;
  /** Custom group header renderer */
  renderGroup?: (groupName: string, options: DropdownMenuOption[]) => React.ReactNode;
  
  // ====== Loading & Empty States ======
  /** Loading state */
  loading?: boolean;
  /** Loading text */
  loadingText?: string;
  /** No options text */
  noOptionsText?: string;
  /** Custom loading renderer */
  renderLoading?: () => React.ReactNode;
  /** Custom empty state renderer */
  renderEmpty?: () => React.ReactNode;
  
  // ====== Creatable ======
  /** Enable creating new options */
  creatable?: boolean;
  /** Input value for create option */
  createInputValue?: string;
  /** Create option label */
  createOptionLabel?: (input: string) => string;
  /** Callback when creating new option */
  onCreateOption?: (input: string) => void;
  /** Validate new option */
  isValidNewOption?: (input: string) => boolean;
  
  // ====== Custom Renderers ======
  /** Custom option renderer */
  renderOption?: (option: DropdownMenuOption, state: { selected: boolean; highlighted: boolean; disabled: boolean }) => React.ReactNode;
  /** Custom footer renderer */
  renderFooter?: () => React.ReactNode;
  
  // ====== Checkmarks ======
  /** Show checkmarks for selected items */
  showCheckmarks?: boolean;
  /** Custom check icon */
  checkIcon?: React.ReactNode;
  
  // ====== Styling ======
  /** Additional class for the menu container */
  className?: string;
  /** Style for the menu container */
  style?: React.CSSProperties;
  /** Class for individual options */
  optionClassName?: string;
  /** Style for individual options */
  optionStyle?: React.CSSProperties;
  /** Class for selected options */
  selectedOptionClassName?: string;
  /** Style for selected options */
  selectedOptionStyle?: React.CSSProperties;
  /** Class for highlighted options */
  highlightedOptionClassName?: string;
  /** Style for highlighted options */
  highlightedOptionStyle?: React.CSSProperties;
  /** Class for disabled options */
  disabledOptionClassName?: string;
  /** Class for group headers */
  groupClassName?: string;
  
  // ====== Colors ======
  /** Background color */
  backgroundColor?: string;
  /** Border color */
  borderColor?: string;
  /** Option hover color */
  optionHoverColor?: string;
  /** Selected option background color */
  selectedOptionColor?: string;
  
  // ====== Dimensions ======
  /** Max height of the menu */
  maxHeight?: string | number;
  /** Min width of the menu */
  minWidth?: string | number;
  /** Custom width (defaults to anchor width) */
  width?: string | number;
  
  // ====== Positioning ======
  /** Opening direction */
  openingDirection?: 'up' | 'down' | 'auto';
  /** Use portal for rendering */
  portal?: boolean;
  /** Portal container */
  portalContainer?: HTMLElement;
  /** Z-index for the menu */
  zIndex?: number;
  /** Offset from anchor element */
  offset?: number;
  
  // ====== Animation ======
  /** Animation type */
  animation?: 'fade' | 'slide' | 'scale' | 'none';
  /** Animation duration in ms */
  animationDuration?: number;
  
  // ====== Shape ======
  /** Border radius style */
  shape?: 'square' | 'rounded' | 'pill';
  /** Custom border radius */
  borderRadius?: string;
  
  // ====== Accessibility ======
  /** ARIA label */
  'aria-label'?: string;
  /** ID for the menu */
  id?: string;
  /** Role for the menu */
  role?: string;
  
  // ====== Events ======
  /** Scroll event handler */
  onScroll?: (event: React.UIEvent<HTMLDivElement>) => void;
}

// ============================================================================
// UTILITY COMPONENTS
// ============================================================================

const LoadingSpinner: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg 
    className="dropdown-animate-spin" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const DefaultCheckIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

// ============================================================================
// STYLING UTILITIES
// ============================================================================

const getShapeClasses = (shape: DropdownMenuProps['shape'], customRadius?: string): string => {
  if (customRadius) return '';
  const shapes: Record<NonNullable<DropdownMenuProps['shape']>, string> = {
    square: 'rounded-none',
    rounded: 'rounded-lg',
    pill: 'rounded-2xl',
  };
  return shapes[shape || 'rounded'];
};

const getAnimationClass = (animation: DropdownMenuProps['animation']): string => {
  if (!animation || animation === 'none') return '';
  const animationMap: Record<Exclude<NonNullable<DropdownMenuProps['animation']>, 'none'>, string> = {
    fade: 'dropdown-animate-fadeIn',
    slide: 'dropdown-animate-slideIn',
    scale: 'dropdown-animate-scaleIn',
  };
  return animationMap[animation];
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  (
    {
      open,
      anchorEl,
      options,
      selectedValue,
      onSelect,
      onClose,
      multiple = false,
      
      // Filtering
      filteredOptions,
      highlightedIndex = -1,
      onHighlightChange,
      
      // Grouping
      groupBy,
      renderGroup,
      
      // Loading & Empty
      loading = false,
      loadingText = 'Loading...',
      noOptionsText = 'No options',
      renderLoading,
      renderEmpty,
      
      // Creatable
      creatable = false,
      createInputValue = '',
      createOptionLabel = (input) => `Create "${input}"`,
      onCreateOption,
      isValidNewOption = (input) => input.trim().length > 0,
      
      // Custom Renderers
      renderOption,
      renderFooter,
      
      // Checkmarks
      showCheckmarks = true,
      checkIcon,
      
      // Styling
      className = '',
      style,
      optionClassName = '',
      optionStyle,
      selectedOptionClassName = '',
      selectedOptionStyle,
      highlightedOptionClassName = '',
      highlightedOptionStyle,
      disabledOptionClassName = '',
      groupClassName = '',
      
      // Colors
      backgroundColor = '#1A1D26',
      borderColor = '#FACC15',
      optionHoverColor,
      selectedOptionColor,
      
      // Dimensions
      maxHeight = 300,
      minWidth,
      width,
      
      // Positioning
      openingDirection = 'auto',
      portal = true,
      portalContainer,
      zIndex = 9999,
      offset = 4,
      
      // Animation
      animation = 'fade',
      animationDuration = 200,
      
      // Shape
      shape = 'rounded',
      borderRadius,
      
      // Accessibility
      'aria-label': ariaLabel,
      id,
      role = 'listbox',
      
      // Events
      onScroll,
    },
    ref
  ) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState<{
      top: number;
      left: number;
      width: number;
      direction: 'up' | 'down';
    }>({ top: 0, left: 0, width: 0, direction: 'down' });

    // Combine refs
    const combinedRef = useCallback((node: HTMLDivElement | null) => {
      (menuRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    }, [ref]);

    // Get display options
    const displayOptions = filteredOptions || options;

    // Check if option is selected
    const isSelected = useCallback((option: DropdownMenuOption): boolean => {
      if (selectedValue === null || selectedValue === undefined) return false;
      
      // If selectedValue is an array of option objects
      if (Array.isArray(selectedValue)) {
        return selectedValue.some(v => 
          (typeof v === 'object' && v !== null && 'id' in v) 
            ? v.id === option.id 
            : v === option.id || v === option.value
        );
      }
      
      // If selectedValue is a single option object
      if (typeof selectedValue === 'object' && selectedValue !== null && 'id' in selectedValue) {
        return selectedValue.id === option.id;
      }
      
      // If selectedValue is a primitive (id or value)
      return selectedValue === option.id || selectedValue === option.value;
    }, [selectedValue]);

    // Calculate position
    const updatePosition = useCallback(() => {
      if (!anchorEl) return;
      
      const rect = anchorEl.getBoundingClientRect();
      const menuHeight = typeof maxHeight === 'number' ? maxHeight : parseInt(String(maxHeight));
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      
      let direction: 'up' | 'down' = 'down';
      if (openingDirection === 'up') {
        direction = 'up';
      } else if (openingDirection === 'auto') {
        direction = spaceBelow < menuHeight && spaceAbove > spaceBelow ? 'up' : 'down';
      }
      
      const menuWidth = width 
        ? (typeof width === 'number' ? width : parseInt(width)) 
        : rect.width;
      
      setPosition({
        top: direction === 'down' 
          ? rect.bottom + window.scrollY + offset 
          : rect.top + window.scrollY - menuHeight - offset,
        left: rect.left + window.scrollX,
        width: menuWidth,
        direction,
      });
    }, [anchorEl, maxHeight, openingDirection, width, offset]);

    // Update position when open or anchor changes
    useEffect(() => {
      if (open && anchorEl) {
        updatePosition();
      }
    }, [open, anchorEl, updatePosition]);

    // Update position on scroll/resize
    useEffect(() => {
      if (!open) return;
      
      const handleUpdate = () => updatePosition();
      
      window.addEventListener('scroll', handleUpdate, true);
      window.addEventListener('resize', handleUpdate);
      
      return () => {
        window.removeEventListener('scroll', handleUpdate, true);
        window.removeEventListener('resize', handleUpdate);
      };
    }, [open, updatePosition]);

    // Click outside handler
    useEffect(() => {
      if (!open) return;
      
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        if (
          anchorEl && !anchorEl.contains(target) &&
          menuRef.current && !menuRef.current.contains(target)
        ) {
          onClose?.();
        }
      };
      
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open, anchorEl, onClose]);

    // Group options if groupBy is provided
    const groupedOptions = useMemo(() => {
      if (!groupBy) return null;
      
      return displayOptions.reduce((acc, option) => {
        const group = (option[groupBy] as string) || 'Other';
        if (!acc[group]) acc[group] = [];
        acc[group].push(option);
        return acc;
      }, {} as Record<string, DropdownMenuOption[]>);
    }, [displayOptions, groupBy]);

    // Render single option
    const renderOptionItem = (option: DropdownMenuOption, index: number) => {
      const selected = isSelected(option);
      const highlighted = index === highlightedIndex;
      const optionDisabled = option.disabled;
      
      if (renderOption) {
        return (
          <div
            key={option.id ?? index}
            onClick={() => !optionDisabled && onSelect?.(option)}
            onMouseEnter={() => !optionDisabled && onHighlightChange?.(index)}
            role="option"
            aria-selected={selected}
            aria-disabled={optionDisabled}
          >
            {renderOption(option, { selected, highlighted, disabled: !!optionDisabled })}
          </div>
        );
      }
      
      const baseClasses = `
        px-4 py-2.5 cursor-pointer transition-colors flex items-center gap-3
        ${highlighted && !selected ? highlightedOptionClassName || 'bg-[#2B2F3C]' : ''}
        ${selected ? selectedOptionClassName || 'text-[#FACC15]' : 'text-[#FAFAFA] hover:bg-[#2B2F3C]'}
        ${optionDisabled ? disabledOptionClassName || 'opacity-50 cursor-not-allowed' : ''}
        ${optionClassName}
      `;
      
      const combinedStyle: React.CSSProperties = {
        ...optionStyle,
        ...(selected ? selectedOptionStyle : {}),
        ...(highlighted ? highlightedOptionStyle : {}),
        ...(selectedOptionColor && selected ? { backgroundColor: selectedOptionColor } : {}),
      };
      
      return (
        <div
          key={option.id ?? index}
          className={baseClasses}
          style={combinedStyle}
          onClick={() => !optionDisabled && onSelect?.(option)}
          onMouseEnter={() => !optionDisabled && onHighlightChange?.(index)}
          role="option"
          aria-selected={selected}
          aria-disabled={optionDisabled}
        >
          {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
          <div className="flex-1 min-w-0">
            <div className="truncate">{option.label}</div>
            {option.description && (
              <div className="text-xs text-[#737373] truncate">{option.description}</div>
            )}
          </div>
          {showCheckmarks && selected && (
            <span className="flex-shrink-0 text-[#FACC15]">
              {checkIcon || <DefaultCheckIcon size={16} />}
            </span>
          )}
        </div>
      );
    };

    // Render menu content
    const renderMenuContent = () => {
      // Loading state
      if (loading) {
        if (renderLoading) return renderLoading();
        return (
          <div className="flex items-center justify-center px-4 py-6 text-[#A3A3A3]">
            <LoadingSpinner size={18} />
            <span className="ml-2">{loadingText}</span>
          </div>
        );
      }
      
      // Empty state
      if (displayOptions.length === 0) {
        // Creatable option
        if (creatable && createInputValue && isValidNewOption(createInputValue)) {
          return (
            <div
              className="px-4 py-3 text-[#60A5FA] cursor-pointer hover:bg-[#2B2F3C] transition-colors"
              onClick={() => onCreateOption?.(createInputValue)}
            >
              {createOptionLabel(createInputValue)}
            </div>
          );
        }
        
        if (renderEmpty) return renderEmpty();
        return (
          <div className="px-4 py-6 text-[#A3A3A3] text-center">
            {noOptionsText}
          </div>
        );
      }
      
      // Grouped options
      if (groupedOptions) {
        let globalIndex = 0;
        return Object.entries(groupedOptions).map(([groupName, opts]) => (
          <div key={groupName}>
            {renderGroup ? (
              renderGroup(groupName, opts)
            ) : (
              <div className={`px-4 py-2 text-xs font-semibold text-[#737373] uppercase bg-[#151821] sticky top-0 ${groupClassName}`}>
                {groupName}
              </div>
            )}
            {opts.map((opt) => {
              const index = globalIndex++;
              return renderOptionItem(opt, displayOptions.findIndex(o => o.id === opt.id));
            })}
          </div>
        ));
      }
      
      // Flat options
      return displayOptions.map((option, index) => renderOptionItem(option, index));
    };

    // Don't render if not open
    if (!open) return null;

    const shapeClass = getShapeClasses(shape, borderRadius);
    const animationClass = getAnimationClass(animation);

    const menuContent = (
      <div
        ref={combinedRef}
        className={`
          dropdown-scrollbar-thin
          ${animationClass}
          ${shapeClass}
          ${className}
        `}
        style={{
          position: portal ? 'fixed' : 'absolute',
          top: portal ? position.top : '100%',
          left: portal ? position.left : 0,
          width: portal ? position.width : '100%',
          marginTop: portal ? 0 : offset,
          maxHeight,
          minWidth,
          zIndex,
          backgroundColor,
          border: `2px solid ${borderColor}`,
          borderRadius,
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
          overflow: 'auto',
          animationDuration: `${animationDuration}ms`,
          ...style,
        }}
        role={role}
        aria-label={ariaLabel}
        aria-multiselectable={multiple}
        id={id}
        onScroll={onScroll}
      >
        {renderMenuContent()}
        {renderFooter?.()}
      </div>
    );

    if (portal) {
      return createPortal(menuContent, portalContainer || document.body);
    }

    return menuContent;
  }
);

DropdownMenu.displayName = 'DropdownMenu';

export default DropdownMenu;
