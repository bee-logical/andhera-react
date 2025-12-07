'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, XIcon } from '@/utils/icons';

export interface MultiSelectOption {
  id: string | number;
  label: string;
}

export interface BeeMultiSelectProps {
  data: MultiSelectOption[];
  value?: (string | number)[];
  onChange: (ids: (string | number)[]) => void;
  defaultValue?: (string | number)[];
  placeholder?: string;
  className?: string;
  variant?: 'default' | 'error' | 'success' | 'disabled';
  disabled?: boolean;
  label?: string;
  helperText?: string;
  required?: boolean;
  maxSelections?: number;
  showCheckboxes?: boolean;
}

export const BeeMultiSelect: React.FC<BeeMultiSelectProps> = ({
  data,
  value,
  onChange,
  defaultValue,
  placeholder = 'Select options',
  className = '',
  variant = 'default',
  disabled = false,
  label,
  helperText,
  required = false,
  maxSelections,
  showCheckboxes = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<(string | number)[]>(
    value ?? defaultValue ?? []
  );
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Sync internal state with external value prop
  useEffect(() => {
    if (value !== undefined) {
      setSelectedValues(value);
    }
  }, [value]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Get selected options
  const selectedOptions = data.filter((option) => selectedValues.includes(option.id));

  // Handle option selection/deselection
  const handleToggleOption = (id: string | number) => {
    let newValues: (string | number)[];
    
    if (selectedValues.includes(id)) {
      // Deselect
      newValues = selectedValues.filter((val) => val !== id);
    } else {
      // Select (check max selections)
      if (maxSelections && selectedValues.length >= maxSelections) {
        return; // Don't allow more selections
      }
      newValues = [...selectedValues, id];
    }
    
    setSelectedValues(newValues);
    onChange(newValues);
  };

  // Handle clear all
  const handleClearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedValues([]);
    onChange([]);
    setFocusedIndex(-1);
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        setFocusedIndex(-1);
      }
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (isOpen && focusedIndex >= 0) {
          handleToggleOption(data[focusedIndex].id);
        } else {
          setIsOpen(!isOpen);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else {
          setFocusedIndex((prev) => (prev < data.length - 1 ? prev + 1 : prev));
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        }
        break;
      case 'Home':
        e.preventDefault();
        if (isOpen) {
          setFocusedIndex(0);
        }
        break;
      case 'End':
        e.preventDefault();
        if (isOpen) {
          setFocusedIndex(data.length - 1);
        }
        break;
    }
  };

  // Scroll focused item into view
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && listRef.current) {
      const focusedElement = listRef.current.children[focusedIndex] as HTMLElement;
      if (focusedElement) {
        focusedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [focusedIndex, isOpen]);

  // Variant styles
  const getVariantStyles = () => {
    const isDisabled = disabled || variant === 'disabled';
    
    const baseStyles = 'relative w-full min-w-[200px] transition-all duration-200';
    
    const triggerVariants = {
      default: `border-gray-600 bg-gray-800 hover:border-gray-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 ${
        isOpen ? 'border-blue-500 ring-2 ring-blue-200' : ''
      }`,
      error: `border-red-500 bg-gray-800 hover:border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-500/20 ${
        isOpen ? 'border-red-600 ring-2 ring-red-200' : ''
      }`,
      success: `border-green-500 bg-gray-800 hover:border-green-400 focus:border-green-400 focus:ring-2 focus:ring-green-500/20 ${
        isOpen ? 'border-green-600 ring-2 ring-green-200' : ''
      }`,
      disabled: 'border-gray-200 bg-gray-100 cursor-not-allowed opacity-60',
    };

    return {
      container: baseStyles,
      trigger: `flex items-center justify-between w-full px-3 py-2 text-left border rounded-lg outline-none transition-all min-h-[42px] ${
        triggerVariants[variant]
      } ${isDisabled ? triggerVariants.disabled : ''}`,
      helperText: variant === 'error' ? 'text-red-400' : 'text-gray-300',
    };
  };

  const styles = getVariantStyles();

  return (
    <div className={`${styles.container} ${className}`} ref={dropdownRef}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-white mb-1.5">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        disabled={disabled || variant === 'disabled'}
        className={styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={label ? 'multiselect-label' : undefined}
      >
        <div className="flex-1 overflow-hidden">
          {selectedOptions.length === 0 ? (
            <span className="text-sm text-gray-400">{placeholder}</span>
          ) : (
            <span className="text-sm text-white font-medium truncate block">
              {selectedOptions.map(opt => opt.label).join(', ')}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2 ml-2">
          {/* Clear All Button */}
          {selectedValues.length > 0 && !disabled && variant !== 'disabled' && (
            <span
              onClick={handleClearAll}
              className="p-0.5 hover:bg-gray-700 rounded-full transition-colors cursor-pointer"
              role="button"
              tabIndex={0}
              aria-label="Clear all selections"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleClearAll(e as unknown as React.MouseEvent<HTMLSpanElement>);
                }
              }}
            >
              <XIcon className="w-4 h-4 text-gray-300" />
            </span>
          )}
          
          {/* Chevron Icon */}
          <ChevronDownIcon
            className={`w-5 h-5 text-gray-300 transition-transform duration-200 flex-shrink-0 ${
              isOpen ? 'rotate-180' : 'rotate-0'
            } ${disabled || variant === 'disabled' ? 'opacity-50' : ''}`}
          />
        </div>
      </button>

      {/* Dropdown List */}
      {isOpen && !disabled && variant !== 'disabled' && (
        <ul
          ref={listRef}
          role="listbox"
          aria-multiselectable="true"
          className="absolute z-50 w-full mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto focus:outline-none"
          style={{ top: '100%' }}
        >
          {data.length === 0 ? (
            <li className="px-4 py-3 text-sm text-gray-300 text-center">
              No options available
            </li>
          ) : (
            data.map((option, index) => {
              const isSelected = selectedValues.includes(option.id);
              const isFocused = index === focusedIndex;
              const isMaxed = maxSelections ? selectedValues.length >= maxSelections && !isSelected : false;

              return (
                <li
                  key={option.id}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => !isMaxed && handleToggleOption(option.id)}
                  onMouseEnter={() => setFocusedIndex(index)}
                  className={`
                    flex items-center gap-3 px-4 py-2.5 text-sm transition-colors
                    ${isMaxed ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                    ${isSelected ? 'bg-[#FFCB00]' : ''}
                    ${isFocused && !isSelected ? 'bg-gray-700' : ''}
                    ${!isSelected && !isFocused && !isMaxed ? 'hover:bg-gray-700' : ''}
                  `}
                >
                  {showCheckboxes && (
                    <div
                      className={`
                        w-4 h-4 border-2 rounded flex items-center justify-center transition-colors flex-shrink-0
                        ${isSelected 
                          ? 'bg-blue-600 border-blue-600' 
                          : 'border-gray-600 bg-gray-700'
                        }
                      `}
                    >
                      {isSelected && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  )}
                  <span className={`flex-1 ${isSelected ? 'text-black font-medium' : 'text-white'}`}>
                    {option.label}
                  </span>
                </li>
              );
            })
          )}
        </ul>
      )}

      {/* Helper Text */}
      {helperText && (
        <p className={`text-xs mt-1.5 ${styles.helperText}`}>
          {helperText}
        </p>
      )}
      
      {/* Selection Count */}
      {selectedValues.length > 0 && (
        <p className="text-xs mt-1 text-gray-400">
          {selectedValues.length} {selectedValues.length === 1 ? 'item' : 'items'} selected
          {maxSelections && ` (max: ${maxSelections})`}
        </p>
      )}
    </div>
  );
};

export default BeeMultiSelect;
