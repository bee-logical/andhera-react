"use client";

import React, { useState, KeyboardEvent } from "react";

/**
 * Props for the Pagination component
 * 
 * @property {number} totalItems - Total number of records in the dataset
 * @property {number} itemsPerPage - Number of items displayed per page
 * @property {number} currentPage - The currently active page (1-indexed)
 * @property {(page: number) => void} onPageChange - Callback function triggered when page changes
 * @property {boolean} [showFirstLastButtons] - Show "First" and "Last" navigation buttons
 * @property {boolean} [showPageSizeSelector] - Show dropdown to change items per page
 * @property {number[]} [pageSizeOptions] - Available options for page size selector
 * @property {boolean} [showJumpToPage] - Allow user to jump directly to a specific page
 * @property {number} [maxVisiblePages] - Maximum number of page buttons to display
 * @property {'default' | 'primary' | 'secondary' | 'outlined' | 'ghost'} [variant] - Visual style variant
 * @property {'rounded' | 'square' | 'pill'} [shape] - Button shape style
 * @property {'sm' | 'md' | 'lg'} [size] - Button size
 * @property {'blue' | 'gray' | 'red' | 'green' | 'purple' | 'orange'} [color] - Color theme
 * @property {string | React.ReactNode} [prevLabel] - Custom label/icon for "Previous" button
 * @property {string | React.ReactNode} [nextLabel] - Custom label/icon for "Next" button
 * @property {string | React.ReactNode} [firstLabel] - Custom label/icon for "First" button
 * @property {string | React.ReactNode} [lastLabel] - Custom label/icon for "Last" button
 * @property {string} [className] - Additional CSS classes for the wrapper
 * @property {string} [buttonClassName] - Additional CSS classes for buttons
 * @property {boolean} [disabled] - Disable all pagination interactions
 * @property {boolean} [compact] - Show compact version (icons only, for mobile)
 * @property {'left' | 'center' | 'right'} [align] - Alignment of pagination controls
 * @property {boolean} [showPageInfo] - Show "Page X of Y" text
 * @property {(newSize: number) => void} [onPageSizeChange] - Callback when page size changes
 */
interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  showFirstLastButtons?: boolean;
  showPageSizeSelector?: boolean;
  pageSizeOptions?: number[];
  showJumpToPage?: boolean;
  maxVisiblePages?: number;
  variant?: "default" | "primary" | "secondary" | "outlined" | "ghost";
  shape?: "rounded" | "square" | "pill";
  size?: "sm" | "md" | "lg";
  color?: "blue" | "gray" | "red" | "green" | "purple" | "orange";
  prevLabel?: string | React.ReactNode;
  nextLabel?: string | React.ReactNode;
  firstLabel?: string | React.ReactNode;
  lastLabel?: string | React.ReactNode;
  className?: string;
  buttonClassName?: string;
  disabled?: boolean;
  compact?: boolean;
  align?: "left" | "center" | "right";
  showPageInfo?: boolean;
  onPageSizeChange?: (newSize: number) => void;
}

type PaginationColor = NonNullable<PaginationProps["color"]>;

const primaryVariantStyles: Record<PaginationColor, string> = {
  blue: "bg-[#FFCB00] text-black hover:bg-[#FFCB00] hover:opacity-90",
  gray: "bg-gray-800 text-gray-300 hover:bg-gray-700",
  red: "bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600",
  green: "bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600",
  purple: "bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600",
  orange: "bg-orange-600 text-white hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600",
};

const focusRingClasses: Record<PaginationColor, string> = {
  blue: "focus:ring-[#FFCB00] focus:ring-opacity-50",
  gray: "focus:ring-gray-500",
  red: "focus:ring-red-500",
  green: "focus:ring-green-500",
  purple: "focus:ring-purple-500",
  orange: "focus:ring-orange-500",
};

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  showFirstLastButtons = false,
  showPageSizeSelector = false,
  pageSizeOptions = [5, 10, 25, 50],
  showJumpToPage = false,
  maxVisiblePages = 7,
  variant = "default",
  shape = "rounded",
  size = "md",
  color = "blue",
  prevLabel = "←",
  nextLabel = "→",
  firstLabel = "«",
  lastLabel = "»",
  className = "",
  buttonClassName = "",
  disabled = false,
  compact = false,
  align = "center",
  showPageInfo = false,
  onPageSizeChange,
}) => {
  const [jumpToPageInput, setJumpToPageInput] = useState("");

  // Calculate total pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Variant styles
  const variantStyles = {
    default: "bg-gray-800 hover:bg-gray-700 text-gray-300",
    primary: primaryVariantStyles[color],
    secondary: "bg-gray-700 hover:bg-gray-600 text-gray-200",
    outlined: "border border-gray-600 hover:bg-gray-800 text-gray-300",
    ghost: "bg-transparent hover:bg-gray-800 text-gray-300",
  };

  // Active page styles based on color
  const activeStyles = {
    blue: "bg-[#FFCB00] text-black hover:bg-[#FFCB00] hover:opacity-90",
    gray: "bg-gray-600 text-white hover:bg-gray-700",
    red: "bg-red-600 text-white hover:bg-red-700",
    green: "bg-green-600 text-white hover:bg-green-700",
    purple: "bg-purple-600 text-white hover:bg-purple-700",
    orange: "bg-orange-600 text-white hover:bg-orange-700",
  };

  // Shape styles
  const shapeStyles = {
    rounded: "rounded-md",
    square: "rounded-none",
    pill: "rounded-full",
  };

  // Size styles
  const sizeStyles = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  // Alignment styles
  const alignStyles = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  // Generate page numbers with ellipsis
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      const leftSide = Math.max(2, currentPage - 1);
      const rightSide = Math.min(totalPages - 1, currentPage + 1);

      if (leftSide > 2) {
        pages.push("...");
      }

      for (let i = leftSide; i <= rightSide; i++) {
        pages.push(i);
      }

      if (rightSide < totalPages - 1) {
        pages.push("...");
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  // Handle page change
  const handlePageChange = (page: number) => {
    if (disabled || page < 1 || page > totalPages || page === currentPage) {
      return;
    }
    onPageChange(page);
  };

  // Handle jump to page
  const handleJumpToPage = () => {
    const pageNum = parseInt(jumpToPageInput, 10);
    if (pageNum >= 1 && pageNum <= totalPages) {
      handlePageChange(pageNum);
      setJumpToPageInput("");
    }
  };

  // Handle keyboard navigation for jump to page
  const handleJumpKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleJumpToPage();
    }
  };

  // Handle page size change
  const handlePageSizeChange = (newSize: number) => {
    if (onPageSizeChange) {
      onPageSizeChange(newSize);
    }
  };

  // Button base classes
  const buttonBaseClasses = `inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${focusRingClasses[color]} ${sizeStyles[size]} ${shapeStyles[shape]}`;

  // Disabled button classes
  const disabledClasses = "opacity-50 cursor-not-allowed pointer-events-none";

  return (
    <nav
      aria-label="Pagination Navigation"
      className={`flex flex-col sm:flex-row items-center gap-4 ${className}`}
    >
      {/* Page Size Selector */}
      {showPageSizeSelector && onPageSizeChange && (
        <div className="flex items-center gap-2">
          <label
            htmlFor="page-size-selector"
            className="text-sm text-gray-600 dark:text-gray-400"
          >
            Show:
          </label>
          <select
            id="page-size-selector"
            value={itemsPerPage}
            onChange={(e) => handlePageSizeChange(parseInt(e.target.value, 10))}
            disabled={disabled}
            className={`px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 ${focusRingClasses[color]} ${
              disabled ? disabledClasses : ""
            }`}
          >
            {pageSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Pagination Controls */}
      <div
        className={`flex items-center gap-2 flex-wrap ${alignStyles[align]}`}
      >
        {/* First Button */}
        {showFirstLastButtons && (
          <button
            onClick={() => handlePageChange(1)}
            disabled={disabled || currentPage === 1}
            aria-label="Go to first page"
            className={`${buttonBaseClasses} ${variantStyles[variant]} ${buttonClassName} ${
              disabled || currentPage === 1 ? disabledClasses : ""
            }`}
          >
            {compact ? firstLabel : <span className="flex items-center gap-1">{firstLabel} First</span>}
          </button>
        )}

        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={disabled || currentPage === 1}
          aria-label="Go to previous page"
          className={`${buttonBaseClasses} ${variantStyles[variant]} ${buttonClassName} ${
            disabled || currentPage === 1 ? disabledClasses : ""
          }`}
        >
          {compact ? prevLabel : <span className="flex items-center gap-1">{prevLabel} Prev</span>}
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 text-gray-500 dark:text-gray-400"
              >
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              disabled={disabled}
              aria-current={isActive ? "page" : undefined}
              aria-label={`Go to page ${pageNum}`}
              className={`${buttonBaseClasses} ${
                isActive ? activeStyles[color] : variantStyles[variant]
              } ${buttonClassName} ${disabled ? disabledClasses : ""}`}
            >
              {pageNum}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={disabled || currentPage === totalPages}
          aria-label="Go to next page"
          className={`${buttonBaseClasses} ${variantStyles[variant]} ${buttonClassName} ${
            disabled || currentPage === totalPages ? disabledClasses : ""
          }`}
        >
          {compact ? nextLabel : <span className="flex items-center gap-1">Next {nextLabel}</span>}
        </button>

        {/* Last Button */}
        {showFirstLastButtons && (
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={disabled || currentPage === totalPages}
            aria-label="Go to last page"
            className={`${buttonBaseClasses} ${variantStyles[variant]} ${buttonClassName} ${
              disabled || currentPage === totalPages ? disabledClasses : ""
            }`}
          >
            {compact ? lastLabel : <span className="flex items-center gap-1">Last {lastLabel}</span>}
          </button>
        )}
      </div>

      {/* Page Info */}
      {showPageInfo && (
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Page {currentPage} of {totalPages}
        </span>
      )}

      {/* Jump to Page */}
      {showJumpToPage && (
        <div className="flex items-center gap-2">
          <label
            htmlFor="jump-to-page"
            className="text-sm text-gray-600 dark:text-gray-400"
          >
            Go to:
          </label>
          <input
            id="jump-to-page"
            type="number"
            min="1"
            max={totalPages}
            value={jumpToPageInput}
            onChange={(e) => setJumpToPageInput(e.target.value)}
            onKeyDown={handleJumpKeyDown}
            disabled={disabled}
            placeholder="Page"
            className={`w-16 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 ${focusRingClasses[color]} ${
              disabled ? disabledClasses : ""
            }`}
          />
          <button
            onClick={handleJumpToPage}
            disabled={disabled}
            className={`${buttonBaseClasses} ${variantStyles[variant]} ${buttonClassName} ${
              disabled ? disabledClasses : ""
            }`}
          >
            Go
          </button>
        </div>
      )}
    </nav>
  );
};

export default Pagination;
