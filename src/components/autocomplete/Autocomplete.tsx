'use client';

import React, { forwardRef, useState, useEffect, useRef, useCallback, useMemo, InputHTMLAttributes } from 'react';
import { Chip } from '../chip';
import { InputAlert, ChevronDown, X, CheckCircle } from '../icons';
import { DropdownMenu, DropdownMenuOption } from '../dropdown';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type AutocompleteStatus = 'default' | 'success' | 'warning' | 'error';
export type AutocompleteSize = 'sm' | 'md' | 'lg';
export type AutocompleteVariant = 'outlined' | 'filled' | 'standard';
export type AutocompleteFilterMode = 'startsWith' | 'contains' | 'custom';
export type AutocompleteAnimation = 'fade' | 'slide' | 'scale' | 'none';
export type AutocompleteShape = 'square' | 'rounded' | 'pill';

export interface AutocompleteOption {
  /** Unique identifier for the option */
  id: string | number;
  /** Display label for the option */
  label: string;
  /** Value associated with the option */
  value?: any;
  /** Disable this option */
  disabled?: boolean;
  /** Secondary description text */
  description?: string;
  /** Group name for categorization */
  group?: string;
  /** Icon to display before the label */
  icon?: React.ReactNode;
  /** Custom data for the option */
  [key: string]: any;
}

export interface AutocompleteProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'value'> {
  // ====== Core Props ======
  /** Array of options to display */
  options: AutocompleteOption[];
  /** Currently selected value(s) */
  value?: AutocompleteOption | AutocompleteOption[] | null;
  /** Callback when selection changes */
  onChange?: (value: AutocompleteOption | AutocompleteOption[] | null) => void;
  /** Callback when input value changes */
  onInputChange?: (value: string) => void;
  
  // ====== Labels & Text ======
  /** Primary field label */
  label?: string;
  /** Secondary label text */
  labelSecondary?: string;
  /** Helper text shown below */
  supportingText?: string;
  /** Error message to display */
  errorMessage?: string;
  /** Placeholder text */
  placeholder?: string;
  /** No options message */
  noOptionsText?: string;
  /** Loading text */
  loadingText?: string;
  /** Label tooltip */
  labelTooltip?: React.ReactNode;
  /** Create option label (for creatable mode) */
  createOptionLabel?: (inputValue: string) => string;
  
  // ====== Validation & Status ======
  /** Validation status */
  status?: AutocompleteStatus;
  /** Makes it required */
  required?: boolean;
  
  // ====== Sizing & Layout ======
  /** Size of the input */
  size?: AutocompleteSize;
  /** Whether it takes full width */
  fullWidth?: boolean;
  /** Custom width */
  width?: string | number;
  /** Custom height */
  height?: string | number;
  
  // ====== Variants & Styling ======
  /** Visual variant */
  variant?: AutocompleteVariant;
  /** Border shape */
  shape?: AutocompleteShape;
  /** Custom border radius */
  borderRadius?: string;
  /** Animation type (uses Dropdown's animation system) */
  animation?: AutocompleteAnimation;
  /** Animation duration in ms */
  animationDuration?: number;
  
  // ====== Selection Behavior ======
  /** Whether to allow multiple selections */
  multiple?: boolean;
  /** Allow free text input (not in options) */
  freeSolo?: boolean;
  /** Allow creating new options */
  creatable?: boolean;
  /** Callback when creating new option */
  onCreateOption?: (inputValue: string) => void;
  /** Validate new option input */
  isValidNewOption?: (inputValue: string) => boolean;
  
  // ====== Filter & Search ======
  /** Filter mode for matching */
  filterMode?: AutocompleteFilterMode;
  /** Custom filter function */
  customFilter?: (option: AutocompleteOption, inputValue: string) => boolean;
  /** Case sensitive filtering */
  caseSensitive?: boolean;
  /** Minimum characters to trigger dropdown */
  minChars?: number;
  /** Maximum items to display in dropdown */
  maxDropdownItems?: number;
  /** Debounce time for search in ms */
  debounceTime?: number;
  /** Highlight matching text in options */
  highlightMatch?: boolean;
  
  // ====== Async Loading ======
  /** Loading state */
  loading?: boolean;
  /** Load options asynchronously */
  loadOptions?: (inputValue: string) => Promise<AutocompleteOption[]>;
  /** Load options on mount */
  loadOnMount?: boolean;
  /** Minimum chars for async search */
  asyncMinChars?: number;
  
  // ====== Interaction ======
  /** Disables the autocomplete */
  disabled?: boolean;
  /** Makes it read-only */
  readOnly?: boolean;
  /** Auto-focus on mount */
  autoFocus?: boolean;
  /** Automatically highlight first option */
  autoHighlight?: boolean;
  /** Open dropdown on focus */
  openOnFocus?: boolean;
  /** Close on select (single mode) */
  closeOnSelect?: boolean;
  /** Clear input on blur */
  clearOnBlur?: boolean;
  /** Select on blur if there's a match */
  selectOnBlur?: boolean;
  
  // ====== UI Features ======
  /** Clear button when has value */
  showClearButton?: boolean;
  /** Show dropdown toggle button */
  showDropdownButton?: boolean;
  /** Show checkmarks for selected items (passed to DropdownMenu) */
  showCheckmarks?: boolean;
  /** Group options by property (passed to DropdownMenu) */
  groupBy?: string;
  
  // ====== Multi-Select Options (uses Chip component) ======
  /** Maximum selected items (multiple mode) */
  maxSelected?: number;
  /** Chip variant for selected tags */
  chipVariant?: 'filled' | 'outlined' | 'soft' | 'ghost';
  /** Chip color for selected tags */
  chipColor?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  /** Chip size for selected tags */
  chipSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Max chips to display before collapsing */
  maxChips?: number;
  /** Text for collapsed chips */
  moreChipsText?: (count: number) => string;
  /** Allow removing chips with backspace */
  removeOnBackspace?: boolean;
  
  // ====== Icons ======
  /** Icon to display at start */
  startIcon?: React.ReactNode;
  /** Icon to display at end */
  endIcon?: React.ReactNode;
  /** Custom dropdown icon */
  dropdownIcon?: React.ReactNode;
  /** Custom clear icon */
  clearIcon?: React.ReactNode;
  /** Custom loading icon */
  loadingIcon?: React.ReactNode;
  /** Custom check icon for selected items (passed to DropdownMenu) */
  checkIcon?: React.ReactNode;
  
  // ====== Custom Renderers (passed to DropdownMenu) ======
  /** Custom render for option */
  renderOption?: (option: AutocompleteOption, state: { selected: boolean; highlighted: boolean; disabled: boolean }) => React.ReactNode;
  /** Custom render for selected tags (multiple mode) - uses Chip component by default */
  renderTags?: (value: AutocompleteOption[], onRemove: (option: AutocompleteOption) => void) => React.ReactNode;
  /** Custom render for input value display */
  renderValue?: (value: AutocompleteOption | AutocompleteOption[] | null) => React.ReactNode;
  /** Custom render for group header */
  renderGroup?: (groupName: string, options: AutocompleteOption[]) => React.ReactNode;
  /** Custom render for empty state */
  renderEmpty?: () => React.ReactNode;
  /** Custom render for loading state */
  renderLoading?: () => React.ReactNode;
  /** Custom render for dropdown footer */
  renderFooter?: () => React.ReactNode;
  
  // ====== Portal & Positioning (passed to DropdownMenu) ======
  /** Use portal for dropdown */
  portal?: boolean;
  /** Portal container element */
  portalContainer?: HTMLElement;
  /** Dropdown z-index */
  zIndex?: number;
  /** Dropdown opening direction */
  openingDirection?: 'up' | 'down' | 'auto';
  /** Dropdown max height */
  dropdownMaxHeight?: string | number;
  /** Dropdown min width */
  dropdownMinWidth?: string | number;
  
  // ====== Events ======
  /** Callback when dropdown opens */
  onOpen?: () => void;
  /** Callback when dropdown closes */
  onClose?: () => void;
  /** Callback when option is highlighted */
  onHighlight?: (option: AutocompleteOption | null) => void;
  /** Callback on focus */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Callback on blur */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Callback when scrolling dropdown */
  onScroll?: (event: React.UIEvent<HTMLDivElement>) => void;
  
  // ====== Styling Classes ======
  /** Additional classes for container */
  className?: string;
  /** Classes for outer container */
  containerClassName?: string;
  /** Classes for input wrapper */
  inputWrapperClassName?: string;
  /** Classes for input element */
  inputClassName?: string;
  /** Classes for label */
  labelClassName?: string;
  /** Classes for dropdown menu (passed to DropdownMenu) */
  dropdownClassName?: string;
  /** Classes for dropdown option (passed to DropdownMenu) */
  optionClassName?: string;
  /** Classes for selected option (passed to DropdownMenu) */
  selectedOptionClassName?: string;
  /** Classes for highlighted option (passed to DropdownMenu) */
  highlightedOptionClassName?: string;
  /** Classes for disabled option (passed to DropdownMenu) */
  disabledOptionClassName?: string;
  /** Classes for group header (passed to DropdownMenu) */
  groupClassName?: string;
  /** Classes for supporting text */
  supportingTextClassName?: string;
  
  // ====== Styling Overrides ======
  /** Style for container */
  containerStyle?: React.CSSProperties;
  /** Style for input wrapper */
  inputWrapperStyle?: React.CSSProperties;
  /** Style for input */
  inputStyle?: React.CSSProperties;
  /** Style for dropdown (passed to DropdownMenu) */
  dropdownStyle?: React.CSSProperties;
  /** Style for option (passed to DropdownMenu) */
  optionStyle?: React.CSSProperties;
  /** Style for selected option (passed to DropdownMenu) */
  selectedOptionStyle?: React.CSSProperties;
  /** Style for highlighted option (passed to DropdownMenu) */
  highlightedOptionStyle?: React.CSSProperties;
  
  // ====== Color Customization ======
  /** Background color */
  backgroundColor?: string;
  /** Text color */
  textColor?: string;
  /** Border color */
  borderColor?: string;
  /** Focus border color */
  focusBorderColor?: string;
  /** Placeholder color */
  placeholderColor?: string;
  /** Dropdown background color (passed to DropdownMenu) */
  dropdownBgColor?: string;
  /** Option hover color (passed to DropdownMenu) */
  optionHoverColor?: string;
  /** Selected option color (passed to DropdownMenu) */
  selectedOptionColor?: string;
  
  // ====== Accessibility ======
  /** ARIA label */
  'aria-label'?: string;
  /** ARIA described by */
  'aria-describedby'?: string;
  /** ARIA invalid */
  'aria-invalid'?: boolean;
  /** Custom ID */
  id?: string;
}

// ============================================================================
// UTILITY COMPONENTS
// ============================================================================

// Uses the same spinner animation as Dropdown component for consistency
const LoadingSpinner: React.FC<{ size?: number; color?: string }> = ({ size = 16, color }) => (
  <svg 
    className="dropdown-animate-spin" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none"
    style={{ color }}
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

// ============================================================================
// STYLING UTILITIES
// ============================================================================

const getSizeClasses = (size: AutocompleteSize): { padding: string; fontSize: string; height: string; iconSize: number } => {
  const sizes: Record<AutocompleteSize, { padding: string; fontSize: string; height: string; iconSize: number }> = {
    sm: { padding: 'px-3 py-1.5', fontSize: 'text-sm', height: 'min-h-[36px]', iconSize: 16 },
    md: { padding: 'px-4 py-2.5', fontSize: 'text-base', height: 'min-h-[44px]', iconSize: 18 },
    lg: { padding: 'px-5 py-3', fontSize: 'text-lg', height: 'min-h-[52px]', iconSize: 20 },
  };
  return sizes[size];
};

const getShapeClasses = (shape: AutocompleteShape, customRadius?: string): string => {
  if (customRadius) return '';
  const shapes: Record<AutocompleteShape, string> = {
    square: 'rounded-none',
    rounded: 'rounded-lg',
    pill: 'rounded-full',
  };
  return shapes[shape];
};

const getVariantClasses = (variant: AutocompleteVariant, isFocused: boolean, hasValue: boolean, status: AutocompleteStatus): string => {
  const baseClasses = 'transition-all duration-200';
  
  if (status !== 'default') {
    const statusColors: Record<Exclude<AutocompleteStatus, 'default'>, string> = {
      success: 'border-[#00C951]',
      warning: 'border-[#FF6900]',
      error: 'border-[#FB2C36]',
    };
    return `border-2 ${statusColors[status]} ${baseClasses}`;
  }
  
  switch (variant) {
    case 'outlined':
      return `border-2 ${isFocused ? 'border-[#FACC15]' : hasValue ? 'border-[#A3A3A3]' : 'border-[#737373]'} bg-[#151821] ${baseClasses}`;
    case 'filled':
      return `border-2 ${isFocused ? 'border-[#FACC15]' : 'border-transparent'} bg-[#2B2F3C] ${baseClasses}`;
    case 'standard':
      return `border-b-2 ${isFocused ? 'border-[#FACC15]' : 'border-[#737373]'} bg-transparent rounded-none ${baseClasses}`;
    default:
      return baseClasses;
  }
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Autocomplete component that composes:
 * - DropdownMenu component for the dropdown menu (portal, positioning, animations)
 * - Chip component for multi-select tags
 * - Icons from the library icon system
 * 
 * This demonstrates true component composition within the library.
 */
const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
  (
    {
      // Core Props
      options = [],
      value = null,
      onChange,
      onInputChange,
      
      // Labels & Text
      label,
      labelSecondary,
      supportingText,
      errorMessage,
      placeholder = 'Search...',
      noOptionsText = 'No options',
      loadingText = 'Loading...',
      labelTooltip,
      createOptionLabel = (input) => `Create "${input}"`,
      
      // Validation & Status
      status = 'default',
      required = false,
      
      // Sizing & Layout
      size = 'md',
      fullWidth = false,
      width,
      height,
      
      // Variants & Styling
      variant = 'outlined',
      shape = 'rounded',
      borderRadius,
      animation = 'fade',
      animationDuration = 200,
      
      // Selection Behavior
      multiple = false,
      freeSolo = false,
      creatable = false,
      onCreateOption,
      isValidNewOption = (input) => input.trim().length > 0,
      
      // Filter & Search
      filterMode = 'contains',
      customFilter,
      caseSensitive = false,
      minChars = 0,
      maxDropdownItems = 10,
      debounceTime = 300,
      highlightMatch = false,
      
      // Async Loading
      loading = false,
      loadOptions,
      loadOnMount = false,
      asyncMinChars = 1,
      
      // Interaction
      disabled = false,
      readOnly = false,
      autoFocus = false,
      autoHighlight = true,
      openOnFocus = false,
      closeOnSelect = true,
      clearOnBlur = false,
      selectOnBlur = false,
      
      // UI Features
      showClearButton = true,
      showDropdownButton = true,
      showCheckmarks = true,
      groupBy,
      
      // Multi-Select Options (uses Chip component)
      maxSelected,
      chipVariant = 'soft',
      chipColor = 'primary',
      chipSize = 'sm',
      maxChips = 3,
      moreChipsText = (count) => `+${count} more`,
      removeOnBackspace = true,
      
      // Icons
      startIcon,
      endIcon,
      dropdownIcon,
      clearIcon,
      loadingIcon,
      checkIcon,
      
      // Custom Renderers
      renderOption,
      renderTags,
      renderValue,
      renderGroup,
      renderEmpty,
      renderLoading,
      renderFooter,
      
      // Portal & Positioning (passed to DropdownMenu)
      portal = true,
      portalContainer,
      zIndex = 9999,
      openingDirection = 'auto',
      dropdownMaxHeight = 300,
      dropdownMinWidth,
      
      // Events
      onOpen,
      onClose,
      onHighlight,
      onFocus,
      onBlur,
      onScroll,
      
      // Styling Classes
      className = '',
      containerClassName = '',
      inputWrapperClassName = '',
      inputClassName = '',
      labelClassName = '',
      dropdownClassName = '',
      optionClassName = '',
      selectedOptionClassName = '',
      highlightedOptionClassName = '',
      disabledOptionClassName = '',
      groupClassName = '',
      supportingTextClassName = '',
      
      // Styling Overrides
      containerStyle,
      inputWrapperStyle,
      inputStyle,
      dropdownStyle,
      optionStyle,
      selectedOptionStyle,
      highlightedOptionStyle,
      
      // Color Customization
      backgroundColor,
      textColor,
      borderColor,
      focusBorderColor,
      placeholderColor,
      dropdownBgColor,
      optionHoverColor,
      selectedOptionColor,
      
      // Accessibility
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedby,
      'aria-invalid': ariaInvalid,
      id,
      
      ...rest
    },
    ref
  ) => {
    // ====== State ======
    const [inputValue, setInputValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [isFocused, setIsFocused] = useState(false);
    const [asyncOptions, setAsyncOptions] = useState<AutocompleteOption[]>([]);
    const [isLoading, setIsLoading] = useState(loading);
    
    // ====== Refs ======
    const inputRef = useRef<HTMLInputElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const debounceTimerRef = useRef<ReturnType<typeof setTimeout>>();
    
    // ====== Combined Ref ======
    const combinedRef = useCallback((node: HTMLInputElement | null) => {
      inputRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
      }
    }, [ref]);
    
    // ====== Derived Values ======
    const sizeStyles = getSizeClasses(size);
    const shapeClass = getShapeClasses(shape, borderRadius);
    const variantClass = getVariantClasses(variant, isFocused, Boolean(value), status);
    
    const hasValue = multiple 
      ? Array.isArray(value) && value.length > 0
      : value !== null;
    
    const currentOptions = loadOptions ? asyncOptions : options;
    
    // ====== Filter Options ======
    const filterOptions = useCallback((opts: AutocompleteOption[], input: string): AutocompleteOption[] => {
      if (!input && minChars > 0) return opts;
      if (input.length < minChars) return opts;
      
      const searchTerm = caseSensitive ? input : input.toLowerCase();
      
      return opts.filter(option => {
        if (customFilter || filterMode === 'custom') {
          return customFilter ? customFilter(option, input) : true;
        }
        
        const optionLabel = caseSensitive ? option.label : option.label.toLowerCase();
        
        switch (filterMode) {
          case 'startsWith':
            return optionLabel.startsWith(searchTerm);
          case 'contains':
            return optionLabel.includes(searchTerm);
          default:
            return true;
        }
      }).slice(0, maxDropdownItems);
    }, [minChars, caseSensitive, customFilter, filterMode, maxDropdownItems]);
    
    const filteredOptions = useMemo(() => {
      return filterOptions(currentOptions, inputValue);
    }, [currentOptions, inputValue, filterOptions]);
    
    // ====== Selection Helpers ======
    const isSelected = useCallback((option: AutocompleteOption): boolean => {
      if (!value) return false;
      if (Array.isArray(value)) {
        return value.some(v => v.id === option.id);
      }
      return value.id === option.id;
    }, [value]);
    
    // ====== Handlers ======
    const handleOpen = useCallback(() => {
      if (disabled || readOnly) return;
      setIsOpen(true);
      onOpen?.();
    }, [disabled, readOnly, onOpen]);
    
    const handleClose = useCallback(() => {
      setIsOpen(false);
      setHighlightedIndex(-1);
      onClose?.();
    }, [onClose]);
    
    const handleSelect = useCallback((option: DropdownMenuOption) => {
      const autocompleteOption = option as AutocompleteOption;
      if (autocompleteOption.disabled) return;
      
      if (multiple) {
        const currentValues = Array.isArray(value) ? value : [];
        const isAlreadySelected = isSelected(autocompleteOption);
        
        if (isAlreadySelected) {
          const newValues = currentValues.filter(v => v.id !== autocompleteOption.id);
          onChange?.(newValues.length > 0 ? newValues : null);
        } else {
          if (maxSelected && currentValues.length >= maxSelected) return;
          onChange?.([...currentValues, autocompleteOption]);
        }
        setInputValue('');
      } else {
        onChange?.(autocompleteOption);
        setInputValue(autocompleteOption.label);
        if (closeOnSelect) {
          handleClose();
        }
      }
    }, [multiple, value, isSelected, onChange, maxSelected, closeOnSelect, handleClose]);
    
    const handleRemoveTag = useCallback((option: AutocompleteOption) => {
      if (Array.isArray(value)) {
        const newValues = value.filter(v => v.id !== option.id);
        onChange?.(newValues.length > 0 ? newValues : null);
      }
    }, [value, onChange]);
    
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      onInputChange?.(newValue);
      
      if (!isOpen && newValue.length >= minChars) {
        handleOpen();
      }
      
      if (autoHighlight && filteredOptions.length > 0) {
        setHighlightedIndex(0);
      }
      
      // Async loading
      if (loadOptions && newValue.length >= asyncMinChars) {
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }
        
        setIsLoading(true);
        debounceTimerRef.current = setTimeout(async () => {
          try {
            const results = await loadOptions(newValue);
            setAsyncOptions(results);
          } catch (error) {
            console.error('Failed to load options:', error);
          } finally {
            setIsLoading(false);
          }
        }, debounceTime);
      }
    }, [isOpen, minChars, autoHighlight, filteredOptions.length, loadOptions, asyncMinChars, debounceTime, handleOpen, onInputChange]);
    
    const handleClear = useCallback((e: React.MouseEvent) => {
      e.stopPropagation();
      onChange?.(multiple ? null : null);
      setInputValue('');
      inputRef.current?.focus();
    }, [onChange, multiple]);
    
    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (!isOpen) {
            handleOpen();
          } else {
            setHighlightedIndex(prev => {
              const next = prev < filteredOptions.length - 1 ? prev + 1 : prev;
              onHighlight?.(filteredOptions[next] || null);
              return next;
            });
          }
          break;
          
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex(prev => {
            const next = prev > 0 ? prev - 1 : 0;
            onHighlight?.(filteredOptions[next] || null);
            return next;
          });
          break;
          
        case 'Enter':
          e.preventDefault();
          if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
            handleSelect(filteredOptions[highlightedIndex]);
          } else if (creatable && inputValue && isValidNewOption(inputValue)) {
            onCreateOption?.(inputValue);
            setInputValue('');
          }
          break;
          
        case 'Escape':
          e.preventDefault();
          handleClose();
          break;
          
        case 'Backspace':
          if (removeOnBackspace && multiple && !inputValue && Array.isArray(value) && value.length > 0) {
            const newValues = value.slice(0, -1);
            onChange?.(newValues.length > 0 ? newValues : null);
          }
          break;
          
        case 'Tab':
          if (selectOnBlur && highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
            handleSelect(filteredOptions[highlightedIndex]);
          }
          handleClose();
          break;
      }
    }, [isOpen, highlightedIndex, filteredOptions, creatable, inputValue, isValidNewOption, onCreateOption, removeOnBackspace, multiple, value, onChange, selectOnBlur, handleOpen, handleClose, handleSelect, onHighlight]);
    
    const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      if (openOnFocus) {
        handleOpen();
      }
      onFocus?.(e);
    }, [openOnFocus, handleOpen, onFocus]);
    
    const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      if (clearOnBlur && !multiple) {
        if (!value) setInputValue('');
      }
      onBlur?.(e);
    }, [clearOnBlur, multiple, value, onBlur]);
    
    // ====== Effects ======
    
    // Auto-focus
    useEffect(() => {
      if (autoFocus && inputRef.current) {
        inputRef.current.focus();
      }
    }, [autoFocus]);
    
    // Sync input value with single value
    useEffect(() => {
      if (!multiple && value && !Array.isArray(value)) {
        setInputValue(value.label);
      }
    }, [value, multiple]);
    
    // Load on mount
    useEffect(() => {
      if (loadOptions && loadOnMount) {
        setIsLoading(true);
        loadOptions('').then(results => {
          setAsyncOptions(results);
          setIsLoading(false);
        }).catch(() => setIsLoading(false));
      }
    }, [loadOptions, loadOnMount]);
    
    // Sync loading prop
    useEffect(() => {
      setIsLoading(loading);
    }, [loading]);
    
    // ====== Render Helpers ======
    
    const renderMultipleTags = () => {
      if (!multiple || !Array.isArray(value) || value.length === 0) return null;
      
      if (renderTags) {
        return renderTags(value, handleRemoveTag);
      }
      
      // Default rendering using Chip component
      const visibleTags = maxChips ? value.slice(0, maxChips) : value;
      const hiddenCount = maxChips ? Math.max(0, value.length - maxChips) : 0;
      
      return (
        <div className="flex flex-wrap gap-1 py-1 px-1">
          {visibleTags.map(item => (
            <Chip
              key={item.id}
              label={item.label}
              variant={chipVariant}
              color={chipColor}
              size={chipSize}
              removable
              onRemove={(e) => {
                e.stopPropagation();
                handleRemoveTag(item);
              }}
              disabled={disabled}
            />
          ))}
          {hiddenCount > 0 && (
            <Chip
              label={moreChipsText(hiddenCount)}
              variant="ghost"
              color="default"
              size={chipSize}
            />
          )}
        </div>
      );
    };
    
    // ====== Status Styling ======
    const statusSupportingTextClass = status !== 'default' ? {
      success: 'text-[#00C951]',
      warning: 'text-[#FF6900]',
      error: 'text-[#FB2C36]',
    }[status] : 'text-[#A3A3A3]';
    
    const displaySupportingText = status === 'error' && errorMessage ? errorMessage : supportingText;
    
    // ====== Custom Styling ======
    const customContainerStyle: React.CSSProperties = {
      width: fullWidth ? '100%' : width,
      ...containerStyle,
    };
    
    const customInputWrapperStyle: React.CSSProperties = {
      backgroundColor,
      borderColor: isFocused ? focusBorderColor : borderColor,
      borderRadius,
      height,
      ...inputWrapperStyle,
    };
    
    const customInputStyle: React.CSSProperties = {
      color: textColor,
      ...inputStyle,
    };
    
    // ====== Render ======
    return (
      <div 
        className={`${fullWidth ? 'w-full' : ''} ${containerClassName}`} 
        style={customContainerStyle}
        ref={containerRef}
      >
        {/* Label */}
        {label && (
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1">
              <label className={`text-sm font-medium text-[#FAFAFA] ${labelClassName}`}>
                {label}
                {required && <span className="text-[#FB2C36] ml-1">*</span>}
              </label>
              {labelTooltip && (
                <div className="ml-1 text-[#A3A3A3] cursor-help" title={String(labelTooltip)}>
                  <InputAlert size={16} />
                </div>
              )}
            </div>
            {labelSecondary && (
              <span className="text-xs text-[#737373]">{labelSecondary}</span>
            )}
          </div>
        )}
        
        {/* Input Container */}
        <div className="relative">
          <div
            className={`
              flex items-center gap-2 flex-wrap
              ${variantClass}
              ${shapeClass}
              ${sizeStyles.height}
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              ${readOnly ? 'cursor-default' : ''}
              ${inputWrapperClassName}
            `}
            style={customInputWrapperStyle}
          >
            {/* Start Icon */}
            {startIcon && (
              <div className="flex-shrink-0 ml-3 text-[#A3A3A3]">
                {startIcon}
              </div>
            )}
            
            {/* Multiple Tags (using Chip component) */}
            {renderMultipleTags()}
            
            {/* Input */}
            <input
              ref={combinedRef}
              type="text"
              value={renderValue ? '' : inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              onBlur={handleBlur}
              disabled={disabled}
              readOnly={readOnly}
              placeholder={hasValue && !multiple ? '' : placeholder}
              aria-label={ariaLabel || label}
              aria-describedby={ariaDescribedby}
              aria-invalid={ariaInvalid || status === 'error'}
              aria-expanded={isOpen}
              aria-autocomplete="list"
              aria-controls={isOpen ? `${id || 'autocomplete'}-listbox` : undefined}
              role="combobox"
              id={id}
              className={`
                flex-1 min-w-[50px]
                ${sizeStyles.padding}
                ${sizeStyles.fontSize}
                bg-transparent
                text-[#FAFAFA]
                placeholder:text-[#737373]
                outline-none
                ${disabled ? 'cursor-not-allowed' : ''}
                ${readOnly ? 'cursor-default' : ''}
                ${inputClassName}
                ${className}
              `}
              style={customInputStyle}
              {...rest}
            />
            
            {/* Custom Rendered Value */}
            {renderValue && value && (
              <div className={`flex-1 ${sizeStyles.padding} ${sizeStyles.fontSize} text-[#FAFAFA]`}>
                {renderValue(value)}
              </div>
            )}
            
            {/* End Icon */}
            {endIcon && (
              <div className="flex-shrink-0 text-[#A3A3A3]">
                {endIcon}
              </div>
            )}
            
            {/* Actions */}
            <div className="flex items-center gap-1 mr-2">
              {/* Loading */}
              {isLoading && (
                <div className="flex-shrink-0">
                  {loadingIcon || <LoadingSpinner size={sizeStyles.iconSize} />}
                </div>
              )}
              
              {/* Clear Button */}
              {showClearButton && hasValue && !disabled && !readOnly && !isLoading && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="flex-shrink-0 p-1 text-[#737373] hover:text-[#FAFAFA] transition-colors rounded-full hover:bg-[#2B2F3C]"
                  aria-label="Clear"
                  tabIndex={-1}
                >
                  {clearIcon || <X size={sizeStyles.iconSize} />}
                </button>
              )}
              
              {/* Dropdown Button */}
              {showDropdownButton && !isLoading && (
                <button
                  type="button"
                  onClick={() => {
                    if (!disabled && !readOnly) {
                      if (isOpen) handleClose();
                      else handleOpen();
                    }
                  }}
                  className="flex-shrink-0 p-1 text-[#A3A3A3] hover:text-[#FAFAFA] transition-colors rounded-full hover:bg-[#2B2F3C]"
                  aria-label="Toggle dropdown"
                  tabIndex={-1}
                >
                  {dropdownIcon || (
                    <ChevronDown
                      size={sizeStyles.iconSize}
                      className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  )}
                </button>
              )}
            </div>
          </div>
          
          {/* Dropdown Menu - Using shared DropdownMenu component */}
          <DropdownMenu
            open={isOpen && !disabled && !readOnly}
            anchorEl={containerRef.current}
            options={filteredOptions as DropdownMenuOption[]}
            selectedValue={value}
            onSelect={handleSelect}
            onClose={handleClose}
            multiple={multiple}
            
            // Filtering
            highlightedIndex={highlightedIndex}
            onHighlightChange={setHighlightedIndex}
            
            // Grouping
            groupBy={groupBy}
            renderGroup={renderGroup as ((groupName: string, options: DropdownMenuOption[]) => React.ReactNode) | undefined}
            
            // Loading & Empty
            loading={isLoading}
            loadingText={loadingText}
            noOptionsText={noOptionsText}
            renderLoading={renderLoading}
            renderEmpty={renderEmpty}
            
            // Creatable
            creatable={creatable}
            createInputValue={inputValue}
            createOptionLabel={createOptionLabel}
            onCreateOption={onCreateOption}
            isValidNewOption={isValidNewOption}
            
            // Custom Renderers
            renderOption={renderOption as any}
            renderFooter={renderFooter}
            
            // Checkmarks
            showCheckmarks={showCheckmarks}
            checkIcon={checkIcon || <CheckCircle size={sizeStyles.iconSize} />}
            
            // Styling
            className={dropdownClassName}
            style={dropdownStyle}
            optionClassName={optionClassName}
            optionStyle={optionStyle}
            selectedOptionClassName={selectedOptionClassName}
            selectedOptionStyle={selectedOptionStyle}
            highlightedOptionClassName={highlightedOptionClassName}
            highlightedOptionStyle={highlightedOptionStyle}
            disabledOptionClassName={disabledOptionClassName}
            groupClassName={groupClassName}
            
            // Colors
            backgroundColor={dropdownBgColor}
            borderColor="#FACC15"
            optionHoverColor={optionHoverColor}
            selectedOptionColor={selectedOptionColor}
            
            // Dimensions
            maxHeight={dropdownMaxHeight}
            minWidth={dropdownMinWidth}
            
            // Positioning
            openingDirection={openingDirection}
            portal={portal}
            portalContainer={portalContainer}
            zIndex={zIndex}
            
            // Animation (uses Dropdown's animation system)
            animation={animation}
            animationDuration={animationDuration}
            
            // Shape
            shape={shape}
            borderRadius={borderRadius}
            
            // Accessibility
            id={`${id || 'autocomplete'}-listbox`}
            
            // Events
            onScroll={onScroll}
          />
        </div>
        
        {/* Supporting Text */}
        {displaySupportingText && (
          <p className={`text-xs mt-2 ${statusSupportingTextClass} ${supportingTextClassName}`}>
            {displaySupportingText}
          </p>
        )}
      </div>
    );
  }
);

Autocomplete.displayName = 'Autocomplete';

export default Autocomplete;
