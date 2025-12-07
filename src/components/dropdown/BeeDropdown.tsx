'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, XIcon, CheckIcon } from '@/utils/icons';

export interface DropdownOption {
  id: string | number;
  label: string;
}

export interface BeeDropdownProps {
  data: DropdownOption[];
  value?: string | number | null;
  onChange: (id: string | number | null) => void;
  defaultValue?: string | number;
  placeholder?: string;
  className?: string;
  variant?: 'default' | 'error' | 'success' | 'disabled';
  disabled?: boolean;
  clearable?: boolean;
  label?: string;
  helperText?: string;
  required?: boolean;
}

export const BeeDropdown: React.FC<BeeDropdownProps> = ({
  data,
  value,
  onChange,
  defaultValue,
  placeholder = 'Select an option',
  className = '',
  variant = 'default',
  disabled = false,
  clearable = false,
  label,
  helperText,
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | number | null>(
    value ?? defaultValue ?? null
  );
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Sync internal state with external value prop
  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
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

  // Get selected option label
  const selectedOption = data.find((option) => option.id === selectedValue);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  // Handle option selection
  const handleSelect = (id: string | number) => {
    setSelectedValue(id);
    onChange(id);
    setIsOpen(false);
    setFocusedIndex(-1);
  };

  // Handle clear button
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedValue(null);
    onChange(null);
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
          handleSelect(data[focusedIndex].id);
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
      default: `border-gray-600 bg-gray-800 text-white hover:border-gray-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
        isOpen ? 'border-blue-500 ring-2 ring-blue-200' : ''
      }`,
      error: `border-red-500 bg-gray-800 text-white hover:border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 ${
        isOpen ? 'border-red-600 ring-2 ring-red-200' : ''
      }`,
      success: `border-green-500 bg-gray-800 text-white hover:border-green-400 focus:border-green-400 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ${
        isOpen ? 'border-green-600 ring-2 ring-green-200' : ''
      }`,
      disabled: 'border-gray-200 bg-gray-100 cursor-not-allowed opacity-60',
    };

    return {
      container: baseStyles,
      trigger: `flex items-center justify-between w-full px-4 py-2.5 text-left border rounded-lg outline-none transition-all ${
        triggerVariants[variant]
      } ${isDisabled ? triggerVariants.disabled : ''}`,
      text: `text-sm ${selectedOption ? 'text-white font-medium' : 'text-gray-400'} ${
        isDisabled ? 'text-gray-400' : ''
      }`,
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
        aria-labelledby={label ? 'dropdown-label' : undefined}
      >
        <span className={styles.text}>{displayText}</span>
        
        <div className="flex items-center gap-2">
          {/* Clear Button */}
          {clearable && selectedValue !== null && !disabled && variant !== 'disabled' && (
            <span
              onClick={handleClear}
              className="p-0.5 hover:bg-gray-700 rounded-full transition-colors cursor-pointer"
              role="button"
              tabIndex={0}
              aria-label="Clear selection"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleClear(e as unknown as React.MouseEvent<HTMLSpanElement>);
                }
              }}
            >
              <XIcon className="w-4 h-4 text-gray-300" />
            </span>
          )}
          
          {/* Chevron Icon */}
          <ChevronDownIcon
            className={`w-5 h-5 text-gray-300 transition-transform duration-200 ${
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
          className="absolute z-50 w-full mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto focus:outline-none"
          style={{ top: '100%' }}
        >
          {data.length === 0 ? (
            <li className="px-4 py-3 text-sm text-gray-300 text-center">
              No options available
            </li>
          ) : (
            data.map((option, index) => {
              const isSelected = option.id === selectedValue;
              const isFocused = index === focusedIndex;

              return (
                <li
                  key={option.id}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(option.id)}
                  onMouseEnter={() => setFocusedIndex(index)}
                  className={`
                    flex items-center justify-between px-4 py-2.5 text-sm cursor-pointer transition-colors
                    ${isSelected ? 'bg-[#FFCB00] text-black font-medium' : 'text-white'}
                    ${isFocused && !isSelected ? 'bg-gray-700' : ''}
                    ${!isSelected && !isFocused ? 'hover:bg-gray-700' : ''}
                  `}
                >
                  <span>{option.label}</span>
                  {isSelected && (
                    <CheckIcon className="w-4 h-4 text-black flex-shrink-0" />
                  )}
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
    </div>
  );
};

export default BeeDropdown;
