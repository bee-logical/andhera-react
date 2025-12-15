'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDownIcon, XIcon, CheckIcon } from '@/utils/icons';
import './Dropdown.css';

export interface DropdownOption {
  id?: string | number;
  label?: string;
  value?: any;
  disabled?: boolean;
  group?: string;
  [key: string]: any;
}

export interface DropdownGroup {
  label: string;
  options: DropdownOption[];
}

export interface BeeDropdownProps {
  // Core Props
  data?: DropdownOption[];
  options?: DropdownOption[];
  value?: string | number | string[] | number[] | null;
  onChange?: (value: any) => void;
  defaultValue?: string | number | string[] | number[] | null;
  placeholder?: string;
  multiple?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  clearable?: boolean;
  name?: string;
  required?: boolean;
  
  // Opening & Closing
  openingDirection?: 'up' | 'down' | 'auto';
  closeOnSelect?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  openOnFocus?: boolean;
  
  // Search & Filter
  searchable?: boolean;
  searchValue?: string;
  defaultSearchValue?: string;
  filterOption?: (option: DropdownOption, search: string) => boolean;
  debounceTime?: number;
  minSearchLength?: number;
  highlightSearch?: boolean;
  caseSensitiveSearch?: boolean;
  onInputChange?: (value: string) => void;
  onSearch?: (search: string) => void;
  
  // Option Structure
  labelKey?: string;
  valueKey?: string;
  groupBy?: string;
  groupLabel?: (groupName: string) => React.ReactNode;
  optionDisabled?: (option: DropdownOption) => boolean;
  isOptionSelected?: (option: DropdownOption) => boolean;
  isOptionEqualToValue?: (option: DropdownOption, value: any) => boolean;
  
  // Async / Remote Data
  async?: boolean;
  loadOptions?: (search: string) => Promise<DropdownOption[]>;
  loadOnMount?: boolean;
  loadOnSearch?: boolean;
  loading?: boolean;
  loadingText?: string;
  noOptionsText?: string;
  fetchDelay?: number;
  serverSearch?: boolean;
  
  // Multi-Select
  maxSelected?: number;
  hideSelectedOptions?: boolean;
  deselectOnBackspace?: boolean;
  selectAll?: boolean;
  selectAllLabel?: string;
  showCheckboxes?: boolean;
  chipVariant?: 'filled' | 'outlined';
  renderTag?: (value: any) => React.ReactNode;
  tagLimit?: number;
  tagEllipsisText?: string;
  
  // Creatable
  creatable?: boolean;
  isValidNewOption?: (input: string) => boolean;
  newOptionLabel?: (input: string) => string;
  onCreateOption?: (input: string) => void;
  createOnBlur?: boolean;
  
  // Styling
  className?: string;
  style?: React.CSSProperties;
  dropdownClassName?: string;
  optionClassName?: string;
  controlClassName?: string;
  valueClassName?: string;
  placeholderClassName?: string;
  iconClassName?: string;
  // Advanced Styling
  triggerStyle?: React.CSSProperties;
  menuStyle?: React.CSSProperties;
  valueStyle?: React.CSSProperties;
  placeholderStyle?: React.CSSProperties;
  optionStyle?: React.CSSProperties;
  selectedOptionClassName?: string;
  selectedOptionStyle?: React.CSSProperties;
  focusedOptionClassName?: string;
  focusedOptionStyle?: React.CSSProperties;
  // Variants
  variant?: 'outlined' | 'filled' | 'standard' | 'error' | 'success' | 'warning';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  size?: 'small' | 'medium' | 'large';
  shape?: 'round' | 'square' | 'rounded';
  fullWidth?: boolean;
  width?: number | string;
  menuWidth?: number | string;
  menuHeight?: number | string;
  elevation?: number;
  
  // Icons
  icon?: React.ReactNode;
  dropdownIcon?: React.ReactNode;
  clearIcon?: React.ReactNode;
  loadingIcon?: React.ReactNode;
  selectedIcon?: React.ReactNode;
  expandIconPosition?: 'left' | 'right';
  
  // Custom Renderers
  renderOption?: (option: DropdownOption, state: any) => React.ReactNode;
  renderGroup?: (groupLabel: string, options: DropdownOption[]) => React.ReactNode;
  renderValue?: (selected: any) => React.ReactNode;
  renderPlaceholder?: () => React.ReactNode;
  renderMenu?: (children: React.ReactNode) => React.ReactNode;
  renderFooter?: () => React.ReactNode;
  renderEmpty?: () => React.ReactNode;
  
  // Keyboard Navigation
  keyboardNavigation?: boolean;
  pageSize?: number;
  homeEndNavigation?: boolean;
  arrowScrollBehavior?: 'smooth' | 'auto';
  autoFocus?: boolean;
  autoHighlight?: boolean;
  tabIndex?: number;
  
  // Portal & Layering
  portal?: boolean;
  portalContainer?: HTMLElement;
  zIndex?: number;
  disablePortal?: boolean;
  
  // Animation
  animation?: 'fade' | 'slide' | 'scale' | 'none';
  animationDuration?: number;
  
  // Accessibility
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaInvalid?: boolean;
  ariaDisabled?: boolean;
  role?: string;
  optionRole?: string;
  id?: string;
  
  // Events
  onSelect?: (option: DropdownOption) => void;
  onDeselect?: (option: DropdownOption) => void;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
  onFocus?: (event: React.FocusEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
  onHighlight?: (option: DropdownOption) => void;
  onScroll?: (event: React.UIEvent) => void;
  onClear?: () => void;
  
  // Virtualization
  virtualized?: boolean;
  itemHeight?: number;
  overscan?: number;
  
  // Legacy Props (for backward compatibility)
  label?: string;
  helperText?: string;
  
  // Utility
  optionProps?: (option: DropdownOption) => object;
  valueProps?: (value: any) => object;
  'data-testid'?: string;
  debug?: boolean;
}

const LoadingSpinner = () => (
  <svg className="dropdown-animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export const Dropdown: React.FC<BeeDropdownProps> = ({
  // Core Props
  data,
  options,
  value,
  onChange,
  defaultValue,
  placeholder = 'Select an option',
  multiple = false,
  disabled = false,
  readOnly = false,
  clearable = false,
  name,
  required = false,
  
  // Opening & Closing
  openingDirection = 'down',
  closeOnSelect = true,
  open: controlledOpen,
  defaultOpen = false,
  onOpen,
  onClose,
  openOnFocus = false,
  
  // Search & Filter
  searchable = false,
  searchValue: controlledSearchValue,
  defaultSearchValue = '',
  filterOption,
  debounceTime = 300,
  minSearchLength = 0,
  highlightSearch = false,
  caseSensitiveSearch = false,
  onInputChange,
  onSearch,
  
  // Option Structure
  labelKey = 'label',
  valueKey = 'value',
  groupBy,
  groupLabel,
  optionDisabled,
  isOptionSelected: isOptionSelectedProp,
  isOptionEqualToValue,
  
  // Async / Remote Data
  async = false,
  loadOptions,
  loadOnMount = false,
  loadOnSearch = false,
  loading = false,
  loadingText = 'Loading...',
  noOptionsText = 'No options available',
  fetchDelay = 0,
  serverSearch = false,
  
  // Multi-Select
  maxSelected,
  hideSelectedOptions = false,
  deselectOnBackspace = true,
  selectAll = false,
  selectAllLabel = 'Select All',
  showCheckboxes = false,
  chipVariant = 'filled',
  renderTag,
  tagLimit,
  tagEllipsisText = '...',
  
  // Creatable
  creatable = false,
  isValidNewOption = (input: string) => input.trim().length > 0,
  newOptionLabel = (input) => `Create "${input}"`,
  onCreateOption,
  createOnBlur = false,
  
  // Styling
  className = '',
  style,
  dropdownClassName,
  optionClassName,
  controlClassName,
  valueClassName,
  placeholderClassName,
  iconClassName,
  // Advanced Styling
  triggerStyle,
  menuStyle,
  valueStyle,
  placeholderStyle,
  optionStyle,
  selectedOptionClassName,
  selectedOptionStyle,
  focusedOptionClassName,
  focusedOptionStyle,
  // Variants
  variant = 'outlined',
  color = 'primary',
  size = 'medium',
  shape = 'rounded',
  fullWidth = false,
  width,
  menuWidth,
  menuHeight = '240px',
  elevation = 2,
  
  // Icons
  icon,
  dropdownIcon,
  clearIcon,
  loadingIcon,
  selectedIcon,
  expandIconPosition = 'right',
  
  // Custom Renderers
  renderOption,
  renderGroup,
  renderValue,
  renderPlaceholder,
  renderMenu,
  renderFooter,
  renderEmpty,
  
  // Keyboard Navigation
  keyboardNavigation = true,
  pageSize = 10,
  homeEndNavigation = true,
  arrowScrollBehavior = 'smooth',
  autoFocus = false,
  autoHighlight = false,
  tabIndex = 0,
  
  // Portal & Layering
  portal = false,
  portalContainer,
  zIndex = 1000,
  disablePortal = false,
  
  // Animation
  animation = 'fade',
  animationDuration = 200,
  
  // Accessibility
  ariaLabel,
  ariaDescribedBy,
  ariaInvalid,
  ariaDisabled,
  role = 'combobox',
  optionRole = 'option',
  id,
  
  // Events
  onSelect,
  onDeselect,
  onMenuOpen,
  onMenuClose,
  onFocus,
  onBlur,
  onHighlight,
  onScroll,
  onClear,
  
  // Virtualization
  virtualized = false,
  itemHeight = 40,
  overscan = 5,
  
  // Legacy Props
  label,
  helperText,
  
  // Utility
  optionProps,
  valueProps,
  'data-testid': dataTestId,
  debug = false,
}) => {
  // Refs
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout>>();
  
  // Determine options source
  const optionsData = useMemo(() => options || data || [], [options, data]);
  
  // State
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [selectedValue, setSelectedValue] = useState<any>(value ?? defaultValue ?? (multiple ? [] : null));
  const [focusedIndex, setFocusedIndex] = useState<number>(autoHighlight ? 0 : -1);
  const [searchText, setSearchText] = useState(controlledSearchValue ?? defaultSearchValue);
  const [asyncOptions, setAsyncOptions] = useState<DropdownOption[]>([]);
  const [isLoading, setIsLoading] = useState(loading);
  const [portalPosition, setPortalPosition] = useState<{ top: number; left: number; width: number; direction: 'up' | 'down' }>({ 
    top: 0, 
    left: 0, 
    width: 0,
    direction: 'down'
  });
  
  // Controlled vs Uncontrolled
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const currentSearchValue = controlledSearchValue !== undefined ? controlledSearchValue : searchText;

  // Calculate portal position when opening
  const updatePortalPosition = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const menuHeightNum = typeof menuHeight === 'string' ? parseInt(menuHeight) : (menuHeight || 240);
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      
      // Determine direction based on available space or prop
      let direction: 'up' | 'down' = 'down';
      if (openingDirection === 'up') {
        direction = 'up';
      } else if (openingDirection === 'auto') {
        direction = spaceBelow < menuHeightNum && spaceAbove > spaceBelow ? 'up' : 'down';
      }
      
      const menuWidthNum = typeof menuWidth === 'number' ? menuWidth : rect.width;
      
      // Calculate left position
      let left = rect.left + window.scrollX;
      
      // Ensure menu doesn't go off-screen horizontally
      if (left + menuWidthNum > window.innerWidth - 16) {
        left = window.innerWidth - menuWidthNum - 16;
      }
      if (left < 16) left = 16;
      
      setPortalPosition({
        top: direction === 'down' 
          ? rect.bottom + window.scrollY + 4
          : rect.top + window.scrollY - menuHeightNum - 4,
        left,
        width: menuWidthNum,
        direction,
      });
    }
  }, [openingDirection, menuWidth, menuHeight]);

  // Update position when dropdown opens
  useEffect(() => {
    if (isOpen) {
      updatePortalPosition();
    }
  }, [isOpen, updatePortalPosition]);

  // Update position on scroll/resize
  useEffect(() => {
    if (!isOpen) return;
    
    const handlePositionUpdate = () => updatePortalPosition();
    
    window.addEventListener('scroll', handlePositionUpdate, true);
    window.addEventListener('resize', handlePositionUpdate);
    
    return () => {
      window.removeEventListener('scroll', handlePositionUpdate, true);
      window.removeEventListener('resize', handlePositionUpdate);
    };
  }, [isOpen, updatePortalPosition]);

  // Helper functions
  const getOptionLabel = useCallback((option: DropdownOption) => {
    return option[labelKey] || option.label || String(option.id || option.value || '');
  }, [labelKey]);

  const getOptionValue = useCallback((option: DropdownOption) => {
    return option[valueKey] || option.value || option.id;
  }, [valueKey]);

  const isOptionSelected = useCallback((option: DropdownOption) => {
    if (isOptionSelectedProp) return isOptionSelectedProp(option);
    
    const optVal = getOptionValue(option);
    if (multiple) {
      const selectedArray = Array.isArray(selectedValue) ? selectedValue : [];
      return selectedArray.some(val => 
        isOptionEqualToValue ? isOptionEqualToValue(option, val) : val === optVal
      );
    }
    return isOptionEqualToValue ? isOptionEqualToValue(option, selectedValue) : selectedValue === optVal;
  }, [selectedValue, multiple, getOptionValue, isOptionSelectedProp, isOptionEqualToValue]);

  const isOptionDisabled = useCallback((option: DropdownOption) => {
    if (optionDisabled) return optionDisabled(option);
    return option.disabled || false;
  }, [optionDisabled]);

  // Filter options based on search
  const filteredOptions = useMemo(() => {
    let opts = async ? asyncOptions : optionsData;
    
    if (!searchable || !currentSearchValue || currentSearchValue.length < minSearchLength) {
      return opts;
    }

    const searchLower = caseSensitiveSearch ? currentSearchValue : currentSearchValue.toLowerCase();
    
    return opts.filter(option => {
      if (filterOption) {
        return filterOption(option, currentSearchValue);
      }
      
      const label = getOptionLabel(option);
      const labelToMatch = caseSensitiveSearch ? label : label.toLowerCase();
      return labelToMatch.includes(searchLower);
    });
  }, [optionsData, asyncOptions, async, searchable, currentSearchValue, minSearchLength, caseSensitiveSearch, filterOption, getOptionLabel]);

  // Hide selected options if needed
  const displayedOptions = useMemo(() => {
    if (hideSelectedOptions && multiple) {
      return filteredOptions.filter(opt => !isOptionSelected(opt));
    }
    return filteredOptions;
  }, [filteredOptions, hideSelectedOptions, multiple, isOptionSelected]);

  // Group options if groupBy is provided
  const groupedOptions = useMemo(() => {
    if (!groupBy) return null;
    
    const groups: { [key: string]: DropdownOption[] } = {};
    displayedOptions.forEach(option => {
      const groupName = option[groupBy] || 'Other';
      if (!groups[groupName]) groups[groupName] = [];
      groups[groupName].push(option);
    });
    
    return Object.entries(groups);
  }, [displayedOptions, groupBy]);

  // Sync external value
  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  // Auto focus
  useEffect(() => {
    if (autoFocus && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [autoFocus]);

  // Load async options on mount
  useEffect(() => {
    if (async && loadOnMount && loadOptions) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        loadOptions('').then(opts => {
          setAsyncOptions(opts);
          setIsLoading(false);
        }).catch(() => setIsLoading(false));
      }, fetchDelay);
      
      return () => clearTimeout(timer);
    }
  }, [async, loadOnMount, loadOptions, fetchDelay]);

  // Debounced search
  useEffect(() => {
    if (async && loadOnSearch && loadOptions && currentSearchValue) {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      
      setIsLoading(true);
      debounceTimerRef.current = setTimeout(() => {
        loadOptions(currentSearchValue).then(opts => {
          setAsyncOptions(opts);
          setIsLoading(false);
        }).catch(() => setIsLoading(false));
      }, debounceTime);
      
      return () => {
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }
      };
    }
  }, [currentSearchValue, async, loadOnSearch, loadOptions, debounceTime]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isInsideTrigger = dropdownRef.current?.contains(target);
      const isInsideMenu = listRef.current?.contains(target);
      
      if (!isInsideTrigger && !isInsideMenu) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handlers
  const handleOpen = useCallback(() => {
    if (disabled || readOnly) return;
    
    if (controlledOpen === undefined) {
      setInternalOpen(true);
    }
    onOpen?.();
    onMenuOpen?.();
  }, [disabled, readOnly, controlledOpen, onOpen, onMenuOpen]);

  const handleClose = useCallback(() => {
    if (controlledOpen === undefined) {
      setInternalOpen(false);
    }
    setFocusedIndex(-1);
    onClose?.();
    onMenuClose?.();
    
    if (createOnBlur && creatable && currentSearchValue && isValidNewOption?.(currentSearchValue)) {
      onCreateOption?.(currentSearchValue);
    }
  }, [controlledOpen, onClose, onMenuClose, createOnBlur, creatable, currentSearchValue, isValidNewOption, onCreateOption]);

  const toggleDropdown = useCallback(() => {
    if (isOpen) {
      handleClose();
    } else {
      handleOpen();
    }
  }, [isOpen, handleOpen, handleClose]);

  const handleSelect = useCallback((option: DropdownOption) => {
    const optValue = getOptionValue(option);
    
    if (multiple) {
      const currentArray = Array.isArray(selectedValue) ? selectedValue : [];
      const isSelected = isOptionSelected(option);
      
      let newValue;
      if (isSelected) {
        newValue = currentArray.filter(val => 
          isOptionEqualToValue ? !isOptionEqualToValue(option, val) : val !== optValue
        );
        onDeselect?.(option);
      } else {
        if (maxSelected && currentArray.length >= maxSelected) {
          return;
        }
        newValue = [...currentArray, optValue];
        onSelect?.(option);
      }
      
      setSelectedValue(newValue);
      onChange?.(newValue);
    } else {
      setSelectedValue(optValue);
      onChange?.(optValue);
      onSelect?.(option);
      
      if (closeOnSelect) {
        handleClose();
      }
    }
    
    setSearchText('');
  }, [multiple, selectedValue, getOptionValue, isOptionSelected, isOptionEqualToValue, maxSelected, onChange, onSelect, onDeselect, closeOnSelect, handleClose]);

  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const newValue = multiple ? [] : null;
    setSelectedValue(newValue);
    onChange?.(newValue);
    onClear?.();
  }, [multiple, onChange, onClear]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchText(newValue);
    onInputChange?.(newValue);
    onSearch?.(newValue);
  }, [onInputChange, onSearch]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (disabled || readOnly || !keyboardNavigation) return;

    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        if (!isOpen) {
          handleOpen();
        } else if (focusedIndex >= 0 && focusedIndex < displayedOptions.length) {
          const option = displayedOptions[focusedIndex];
          if (!isOptionDisabled(option)) {
            handleSelect(option);
          }
        } else if (creatable && currentSearchValue && isValidNewOption?.(currentSearchValue)) {
          onCreateOption?.(currentSearchValue);
        }
        break;
        
      case ' ':
        if (!searchable) {
          e.preventDefault();
          if (!isOpen) {
            handleOpen();
          } else if (focusedIndex >= 0 && focusedIndex < displayedOptions.length) {
            const option = displayedOptions[focusedIndex];
            if (!isOptionDisabled(option)) {
              handleSelect(option);
            }
          }
        }
        break;
        
      case 'Escape':
        e.preventDefault();
        handleClose();
        break;
        
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          handleOpen();
        } else {
          setFocusedIndex(prev => {
            const next = prev < displayedOptions.length - 1 ? prev + 1 : prev;
            onHighlight?.(displayedOptions[next]);
            return next;
          });
        }
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          setFocusedIndex(prev => {
            const next = prev > 0 ? prev - 1 : 0;
            onHighlight?.(displayedOptions[next]);
            return next;
          });
        }
        break;
        
      case 'Home':
        if (homeEndNavigation && isOpen) {
          e.preventDefault();
          setFocusedIndex(0);
          onHighlight?.(displayedOptions[0]);
        }
        break;
        
      case 'End':
        if (homeEndNavigation && isOpen) {
          e.preventDefault();
          const lastIndex = displayedOptions.length - 1;
          setFocusedIndex(lastIndex);
          onHighlight?.(displayedOptions[lastIndex]);
        }
        break;
        
      case 'Backspace':
        if (deselectOnBackspace && multiple && !currentSearchValue && Array.isArray(selectedValue) && selectedValue.length > 0) {
          e.preventDefault();
          const newValue = selectedValue.slice(0, -1);
          setSelectedValue(newValue);
          onChange?.(newValue);
        }
        break;
    }
  }, [disabled, readOnly, keyboardNavigation, isOpen, focusedIndex, displayedOptions, searchable, currentSearchValue, multiple, selectedValue, handleOpen, handleClose, handleSelect, isOptionDisabled, homeEndNavigation, deselectOnBackspace, creatable, isValidNewOption, onCreateOption, onChange, onHighlight]);

  // Scroll focused item into view
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && listRef.current) {
      const focusedElement = listRef.current.children[focusedIndex] as HTMLElement;
      if (focusedElement) {
        focusedElement.scrollIntoView({ block: 'nearest', behavior: arrowScrollBehavior });
      }
    }
  }, [focusedIndex, isOpen, arrowScrollBehavior]);

  // Get display value
  const getDisplayValue = useCallback(() => {
    if (renderValue) {
      return renderValue(selectedValue);
    }
    
    if (multiple && Array.isArray(selectedValue)) {
      if (selectedValue.length === 0) {
        return renderPlaceholder ? renderPlaceholder() : placeholder;
      }
      
      const selectedOptions = selectedValue
        .map(val => optionsData.find(opt => getOptionValue(opt) === val))
        .filter(Boolean);
      
      if (renderTag) {
        const tags = selectedOptions.slice(0, tagLimit || selectedOptions.length).map(renderTag);
        if (tagLimit && selectedOptions.length > tagLimit) {
          tags.push(<span key="ellipsis" className="text-sm text-gray-400">{tagEllipsisText}</span>);
        }
        return <div className="flex flex-wrap gap-1">{tags}</div>;
      }
      
      const labels = selectedOptions.map(opt => getOptionLabel(opt!));
      const displayLabels = tagLimit ? labels.slice(0, tagLimit) : labels;
      if (tagLimit && labels.length > tagLimit) {
        return `${displayLabels.join(', ')} ${tagEllipsisText}`;
      }
      return labels.join(', ');
    }
    
    const selectedOption = optionsData.find(opt => getOptionValue(opt) === selectedValue);
    return selectedOption ? getOptionLabel(selectedOption) : (renderPlaceholder ? renderPlaceholder() : placeholder);
  }, [selectedValue, multiple, renderValue, renderPlaceholder, renderTag, tagLimit, tagEllipsisText, placeholder, optionsData, getOptionValue, getOptionLabel]);

  // Styling
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return 'px-3 py-1.5 text-sm';
      case 'large':
        return 'px-5 py-3.5 text-lg';
      default:
        return 'px-4 py-2.5 text-base';
    }
  };

  const getShapeStyles = () => {
    switch (shape) {
      case 'square':
        return 'rounded-none';
      case 'round':
        return 'rounded-full';
      default:
        return 'rounded-lg';
    }
  };

  const getVariantStyles = () => {
    const baseStyles = 'transition-all duration-200';
    
    const variants = {
      outlined: `border ${baseStyles}`,
      filled: `${baseStyles}`,
      standard: `border-b ${baseStyles}`,
      error: `border border-red-500 ${baseStyles}`,
      success: `border border-green-500 ${baseStyles}`,
      warning: `border border-yellow-500 ${baseStyles}`,
    };
    
    return variants[variant];
  };

  const getColorStyles = () => {
    const colors = {
      primary: 'border-[#ffcb00] bg-gray-800 text-white hover:border-[#ffcb00] focus:border-[#ffcb00]',
      secondary: 'border-gray-500 bg-gray-700 text-white hover:border-gray-400',
      success: 'border-green-500 bg-green-900 text-white hover:border-green-400',
      error: 'border-red-500 bg-red-900 text-white hover:border-red-400',
      warning: 'border-yellow-500 bg-yellow-900 text-white hover:border-yellow-400',
      info: 'border-blue-500 bg-blue-900 text-white hover:border-blue-400',
    };
    
    return colors[color];
  };

  const containerStyles = [
    'relative',
    fullWidth ? 'w-full' : width ? '' : 'min-w-[200px]',
    className,
  ].filter(Boolean).join(' ');

  const triggerStyles = [
    'flex items-center justify-between w-full text-left outline-none cursor-pointer',
    getSizeStyles(),
    getShapeStyles(),
    getVariantStyles(),
    getColorStyles(),
    disabled && 'opacity-60 cursor-not-allowed',
    readOnly && 'cursor-default',
    controlClassName,
  ].filter(Boolean).join(' ');

  const menuStyles = [
    'bg-gray-800 border border-gray-600 rounded-lg shadow-xl overflow-auto dropdown-scrollbar-thin',
    dropdownClassName,
  ].filter(Boolean).join(' ');

  const animationClass = useMemo(() => {
    if (animation === 'none') return '';
    
    const animationMap = {
      fade: isOpen ? 'dropdown-animate-fadeIn' : 'dropdown-animate-fadeOut',
      slide: isOpen ? 'dropdown-animate-slideIn' : 'dropdown-animate-slideOut',
      scale: isOpen ? 'dropdown-animate-scaleIn' : 'dropdown-animate-scaleOut',
    };
    
    return animationMap[animation] || '';
  }, [animation, isOpen]);

  // Render option
  const renderOptionItem = useCallback((option: DropdownOption, index: number) => {
    const selected = isOptionSelected(option);
    const optDisabled = isOptionDisabled(option);
    const focused = index === focusedIndex;
    
    if (renderOption) {
      return renderOption(option, { selected, disabled: optDisabled, focused });
    }

    // Compute combined styles for selected/focused states
    const computedStyle: React.CSSProperties = {
      ...optionStyle,
      ...(selected ? selectedOptionStyle : {}),
      ...(focused && !selected ? focusedOptionStyle : {}),
    };
    
    return (
      <li
        key={getOptionValue(option)}
        role={optionRole}
        aria-selected={selected}
        aria-disabled={optDisabled}
        onClick={() => !optDisabled && handleSelect(option)}
        onMouseEnter={() => !optDisabled && setFocusedIndex(index)}
        className={[
          'flex items-center justify-between px-4 py-2.5 cursor-pointer transition-colors',
          selected ? 'bg-blue-600 text-white font-medium' : 'text-white',
          focused && !selected ? 'bg-gray-700' : '',
          !selected && !focused ? 'hover:bg-gray-700' : '',
          optDisabled && 'opacity-50 cursor-not-allowed',
          optionClassName,
          selected && selectedOptionClassName,
          focused && !selected && focusedOptionClassName,
        ].filter(Boolean).join(' ')}
        style={computedStyle}
        {...(optionProps?.(option) || {})}
      >
        {showCheckboxes && (
          <input
            type="checkbox"
            checked={selected}
            readOnly
            className="mr-2"
          />
        )}
        <span className="flex-1">{getOptionLabel(option)}</span>
        {selected && (selectedIcon || <CheckIcon className="w-4 h-4 flex-shrink-0" />)}
      </li>
    );
  }, [focusedIndex, isOptionSelected, isOptionDisabled, renderOption, optionRole, handleSelect, getOptionValue, getOptionLabel, showCheckboxes, selectedIcon, optionClassName, optionProps, optionStyle, selectedOptionClassName, selectedOptionStyle, focusedOptionClassName, focusedOptionStyle]);

  // Render menu content
  const renderMenuContent = () => {
    if (isLoading || loading) {
      return (
        <div className="flex items-center justify-center px-4 py-8 text-gray-300">
          {loadingIcon || <LoadingSpinner />}
          <span className="ml-2">{loadingText}</span>
        </div>
      );
    }
    
    if (displayedOptions.length === 0) {
      if (renderEmpty) {
        return renderEmpty();
      }
      
      if (creatable && currentSearchValue && isValidNewOption?.(currentSearchValue)) {
        return (
          <li
            className="px-4 py-3 text-sm text-blue-400 cursor-pointer hover:bg-gray-700"
            onClick={() => onCreateOption?.(currentSearchValue)}
          >
            {newOptionLabel(currentSearchValue)}
          </li>
        );
      }
      
      return (
        <li className="px-4 py-3 text-sm text-gray-300 text-center">
          {noOptionsText}
        </li>
      );
    }
    
    if (groupedOptions) {
      return groupedOptions.map(([groupName, opts]) => (
        <div key={groupName}>
          <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase bg-gray-900">
            {groupLabel ? groupLabel(groupName) : groupName}
          </div>
          {opts.map((opt, idx) => renderOptionItem(opt, displayedOptions.indexOf(opt)))}
        </div>
      ));
    }
    
    return displayedOptions.map((option, index) => renderOptionItem(option, index));
  };

  return (
    <div 
      className={containerStyles} 
      style={{ width, ...style }}
      ref={dropdownRef}
      data-testid={dataTestId}
    >
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-white mb-1.5">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Control */}
      <div
        ref={triggerRef}
        onClick={searchable && isOpen ? undefined : toggleDropdown}
        onKeyDown={handleKeyDown}
        onFocus={(e) => {
          if (openOnFocus) handleOpen();
          onFocus?.(e);
        }}
        onBlur={onBlur}
        className={triggerStyles}
        style={triggerStyle}
        tabIndex={searchable && isOpen ? -1 : tabIndex}
        role={role}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-invalid={ariaInvalid}
        aria-disabled={ariaDisabled || disabled}
        id={id}
      >
        {/* Expand Icon on Left */}
        {expandIconPosition === 'left' && (
          <span className="mr-2">
            {dropdownIcon || (
              <ChevronDownIcon
                className={[
                  'w-5 h-5 text-gray-300 transition-transform duration-200',
                  isOpen ? 'rotate-180' : 'rotate-0',
                  disabled && 'opacity-50',
                  iconClassName,
                ].filter(Boolean).join(' ')}
              />
            )}
          </span>
        )}
        
        {/* Leading Icon */}
        {icon && (
          <span className={`mr-2 ${iconClassName || ''}`}>{icon}</span>
        )}
        
        {/* Value / Search Input */}
        {searchable && isOpen ? (
          <input
            ref={searchInputRef}
            type="text"
            value={currentSearchValue}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
            autoFocus
          />
        ) : (
          <span 
            className={[
              'flex-1',
              !selectedValue || (Array.isArray(selectedValue) && selectedValue.length === 0) ? placeholderClassName || 'text-gray-400' : valueClassName || 'text-white',
            ].filter(Boolean).join(' ')}
            style={!selectedValue || (Array.isArray(selectedValue) && selectedValue.length === 0) ? placeholderStyle : valueStyle}
          >
            {getDisplayValue()}
          </span>
        )}
        
        {/* Actions */}
        <div className="flex items-center gap-2 ml-2">
          {clearable && selectedValue !== null && (Array.isArray(selectedValue) ? selectedValue.length > 0 : true) && !disabled && !readOnly && (
            <span
              onClick={handleClear}
              className="p-0.5 hover:bg-gray-700 rounded-full transition-colors cursor-pointer"
              role="button"
              tabIndex={-1}
              aria-label="Clear selection"
            >
              {clearIcon || <XIcon className="w-4 h-4 text-gray-300" />}
            </span>
          )}
          
          {(isLoading || loading) && (loadingIcon || <LoadingSpinner />)}
          
          {expandIconPosition !== 'left' && (dropdownIcon || (
            <ChevronDownIcon
              className={[
                'w-5 h-5 text-gray-300 transition-transform duration-200',
                isOpen ? 'rotate-180' : 'rotate-0',
                disabled && 'opacity-50',
                iconClassName,
              ].filter(Boolean).join(' ')}
            />
          ))}
        </div>
      </div>

      {/* Dropdown Menu - Rendered via Portal */}
      {isOpen && !disabled && !readOnly && createPortal(
        <ul
          ref={listRef}
          role="listbox"
          aria-multiselectable={multiple}
          className={`${menuStyles} ${animationClass}`}
          style={{ 
            position: 'fixed',
            top: portalPosition.direction === 'down' ? portalPosition.top : 'auto',
            bottom: portalPosition.direction === 'up' ? window.innerHeight - portalPosition.top - (typeof menuHeight === 'string' ? parseInt(menuHeight) : (menuHeight || 240)) : 'auto',
            left: portalPosition.left,
            width: menuWidth || portalPosition.width,
            maxHeight: menuHeight,
            zIndex: zIndex || 9999,
            ...menuStyle,
          }}
          onScroll={onScroll}
        >
          {/* Select All */}
          {selectAll && multiple && (
            <li
              className="px-4 py-2.5 text-sm font-medium text-blue-400 cursor-pointer hover:bg-gray-700 border-b border-gray-700"
              onClick={() => {
                const allValues = displayedOptions.map(getOptionValue);
                setSelectedValue(allValues);
                onChange?.(allValues);
              }}
            >
              {selectAllLabel}
            </li>
          )}
          
          {renderMenu ? renderMenu(renderMenuContent()) : renderMenuContent()}
          
          {/* Footer */}
          {renderFooter && renderFooter()}
        </ul>,
        disablePortal ? (portalContainer || document.body) : document.body
      )}

      {/* Helper Text */}
      {helperText && (
        <p className={`text-xs mt-1.5 ${variant === 'error' ? 'text-red-400' : 'text-gray-300'}`}>
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Dropdown;
