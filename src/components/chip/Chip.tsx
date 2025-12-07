import React, { forwardRef, useState, useCallback } from 'react';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Chip size options
 * @description Controls the overall size of the chip
 */
export type ChipSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Chip variant options
 * @description Controls the visual style of the chip
 */
export type ChipVariant = 'filled' | 'outlined' | 'soft' | 'ghost';

/**
 * Chip color options
 * @description Predefined color schemes for the chip
 */
export type ChipColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

/**
 * Chip border radius options
 * @description Controls the border radius of the chip
 */
export type ChipRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get size classes for the chip
 */
const getSizeClasses = (size: ChipSize): string => {
  const sizes: Record<ChipSize, string> = {
    xs: 'text-xs px-1.5 py-0.5 gap-1',
    sm: 'text-sm px-2 py-0.5 gap-1',
    md: 'text-sm px-2.5 py-1 gap-1.5',
    lg: 'text-base px-3 py-1.5 gap-2',
    xl: 'text-lg px-4 py-2 gap-2',
  };
  return sizes[size];
};

/**
 * Get icon size based on chip size
 */
const getIconSize = (size: ChipSize): number => {
  const sizes: Record<ChipSize, number> = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  };
  return sizes[size];
};

/**
 * Get border radius classes
 */
const getRadiusClasses = (radius: ChipRadius): string => {
  const radiusMap: Record<ChipRadius, string> = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };
  return radiusMap[radius];
};

/**
 * Get color styles based on variant and color
 */
const getColorStyles = (
  variant: ChipVariant,
  color: ChipColor,
  customBgColor?: string,
  customTextColor?: string,
  customBorderColor?: string
): React.CSSProperties => {
  // If custom colors are provided, use them
  if (customBgColor || customTextColor || customBorderColor) {
    return {
      backgroundColor: customBgColor || 'transparent',
      color: customTextColor || 'inherit',
      borderColor: customBorderColor || customBgColor || 'transparent',
      borderWidth: variant === 'outlined' || variant === 'soft' ? '1px' : '0',
      borderStyle: 'solid',
    };
  }

  // Color palette definitions - primary uses brand yellow #FFCB00
  const colors: Record<ChipColor, { base: string; light: string; dark: string; text: string; border: string }> = {
    default: { base: '#FFCB00', light: '#FFF9E0', dark: '#E6B800', text: '#000000', border: '#FFE566' },
    primary: { base: '#FFCB00', light: '#FFF9E0', dark: '#E6B800', text: '#000000', border: '#FFE566' },
    secondary: { base: '#8b5cf6', light: '#ede9fe', dark: '#6d28d9', text: '#5b21b6', border: '#c4b5fd' },
    success: { base: '#10b981', light: '#d1fae5', dark: '#059669', text: '#065f46', border: '#6ee7b7' },
    warning: { base: '#f59e0b', light: '#fef3c7', dark: '#d97706', text: '#92400e', border: '#fcd34d' },
    error: { base: '#ef4444', light: '#fee2e2', dark: '#dc2626', text: '#991b1b', border: '#fca5a5' },
    info: { base: '#06b6d4', light: '#cffafe', dark: '#0891b2', text: '#155e75', border: '#67e8f9' },
  };

  const colorPalette = colors[color];

  // Determine text color for filled variant - use black for light backgrounds (default/primary yellow)
  const filledTextColor = (color === 'default' || color === 'primary') ? '#000000' : '#ffffff';

  switch (variant) {
    case 'filled':
      return {
        backgroundColor: colorPalette.base,
        color: filledTextColor,
        borderWidth: '0',
      };
    case 'outlined':
      return {
        backgroundColor: 'transparent',
        color: colorPalette.base,
        borderColor: colorPalette.border,
        borderWidth: '1px',
        borderStyle: 'solid',
      };
    case 'soft':
      return {
        backgroundColor: colorPalette.light,
        color: colorPalette.text,
        borderColor: colorPalette.border,
        borderWidth: '1px',
        borderStyle: 'solid',
      };
    case 'ghost':
      return {
        backgroundColor: 'transparent',
        color: colorPalette.base,
        borderWidth: '0',
      };
    default:
      return {};
  }
};

// ============================================================================
// LOADING SPINNER COMPONENT
// ============================================================================

interface LoadingSpinnerProps {
  size: number;
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size, color }) => (
  <svg
    className="animate-spin"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    style={{ color }}
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

// ============================================================================
// DEFAULT ICONS
// ============================================================================

const DefaultCloseIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const DefaultCheckIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ============================================================================
// CHIP PROPS INTERFACE
// ============================================================================

export interface ChipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Text content of the chip */
  label: string;
  
  /** Size of the chip */
  size?: ChipSize;
  
  /** Visual style variant */
  variant?: ChipVariant;
  
  /** Color scheme */
  color?: ChipColor;
  
  /** Border radius style */
  radius?: ChipRadius;
  
  /** Whether the chip can be removed */
  removable?: boolean;
  
  /** Whether the chip is selectable */
  selectable?: boolean;
  
  /** Whether the chip is currently selected (controlled) */
  selected?: boolean;
  
  /** Default selected state (uncontrolled) */
  defaultSelected?: boolean;
  
  /** Whether the chip is clickable (non-selectable but clickable) */
  clickable?: boolean;
  
  /** Whether the chip is disabled */
  disabled?: boolean;
  
  /** Whether the chip is in loading state */
  loading?: boolean;
  
  /** Loading text to display */
  loadingText?: string;
  
  /** Whether to show animation effects */
  animated?: boolean;
  
  /** Avatar element (image or initials) */
  avatar?: React.ReactNode;
  
  /** Icon at the start of the chip */
  icon?: React.ReactNode;
  
  /** Icon at the end of the chip (before remove button) */
  endIcon?: React.ReactNode;
  
  /** Custom remove icon */
  removeIcon?: React.ReactNode;
  
  /** Custom checkmark icon for selected state */
  checkmarkIcon?: React.ReactNode;
  
  /** Whether to show checkmark when selected */
  showCheckmark?: boolean;
  
  /** Custom background color */
  backgroundColor?: string;
  
  /** Custom text color */
  textColor?: string;
  
  /** Custom border color */
  borderColor?: string;
  
  /** Custom hover background color */
  hoverBackgroundColor?: string;
  
  /** Custom selected background color */
  selectedBackgroundColor?: string;
  
  /** Custom selected text color */
  selectedTextColor?: string;
  
  /** Callback when chip is clicked */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  
  /** Callback when chip is removed */
  onRemove?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /** Callback when selection changes */
  onSelectionChange?: (selected: boolean) => void;
  
  /** Additional class names */
  className?: string;
  
  /** Inline styles */
  style?: React.CSSProperties;
  
  /** Accessible label for the chip */
  'aria-label'?: string;
  
  /** Test ID for testing */
  'data-testid'?: string;
}

// ============================================================================
// CHIP COMPONENT
// ============================================================================

/**
 * Chip Component
 * 
 * A versatile chip/tag component for displaying information, selections, or actions.
 * Supports multiple sizes, variants, colors, and interactive states.
 * 
 * @example
 * // Basic usage
 * <Chip label="Tag" />
 * 
 * @example
 * // With icon and removable
 * <Chip label="React" icon={<ReactIcon />} removable onRemove={() => {}} />
 * 
 * @example
 * // Selectable chip
 * <Chip label="Option" selectable selected={isSelected} onSelectionChange={setIsSelected} />
 * 
 * @example
 * // Custom colors
 * <Chip label="Custom" backgroundColor="#ff6b6b" textColor="#fff" />
 */
export const Chip = forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      label,
      size = 'md',
      variant = 'filled',
      color = 'default',
      radius = 'full',
      removable = false,
      selectable = false,
      selected: selectedProp,
      defaultSelected = false,
      clickable = false,
      disabled = false,
      loading = false,
      loadingText,
      animated = true,
      avatar,
      icon,
      endIcon,
      removeIcon,
      checkmarkIcon,
      showCheckmark = true,
      backgroundColor,
      textColor,
      borderColor,
      hoverBackgroundColor,
      selectedBackgroundColor,
      selectedTextColor,
      onClick,
      onRemove,
      onSelectionChange,
      className = '',
      style,
      'aria-label': ariaLabel,
      'data-testid': testId,
      ...rest
    },
    ref
  ) => {
    // Manage internal selected state for uncontrolled mode
    const [internalSelected, setInternalSelected] = useState(defaultSelected);
    
    // Determine if controlled or uncontrolled
    const isControlled = selectedProp !== undefined;
    const isSelected = isControlled ? selectedProp : internalSelected;
    
    // Determine if chip is interactive
    const isInteractive = (selectable || clickable || removable) && !disabled && !loading;
    
    // Handle click events
    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        if (disabled || loading) return;
        
        if (selectable) {
          const newSelected = !isSelected;
          if (!isControlled) {
            setInternalSelected(newSelected);
          }
          onSelectionChange?.(newSelected);
        }
        
        onClick?.(event);
      },
      [disabled, loading, selectable, isSelected, isControlled, onSelectionChange, onClick]
    );
    
    // Handle remove button click
    const handleRemove = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        if (!disabled && !loading) {
          onRemove?.(event);
        }
      },
      [disabled, loading, onRemove]
    );
    
    // Get icon size
    const iconSize = getIconSize(size);
    
    // Build styles
    const baseColorStyles = getColorStyles(
      variant,
      color,
      isSelected && selectedBackgroundColor ? selectedBackgroundColor : backgroundColor,
      isSelected && selectedTextColor ? selectedTextColor : textColor,
      borderColor
    );
    
    // Build CSS custom properties for hover effects
    const customProperties: React.CSSProperties = {
      '--chip-hover-bg': hoverBackgroundColor || '',
    } as React.CSSProperties;
    
    // Build class names
    const chipClasses = [
      'inline-flex items-center justify-center font-medium',
      getSizeClasses(size),
      getRadiusClasses(radius),
      animated ? 'transition-all duration-200' : '',
      isInteractive ? 'cursor-pointer' : '',
      isInteractive && animated ? 'hover:scale-105 active:scale-95' : '',
      disabled ? 'opacity-50 cursor-not-allowed' : '',
      loading ? 'cursor-wait' : '',
      isSelected && animated ? 'ring-2 ring-offset-1' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        role={selectable ? 'checkbox' : clickable || removable ? 'button' : 'status'}
        aria-checked={selectable ? isSelected : undefined}
        aria-disabled={disabled || loading}
        aria-label={ariaLabel || label}
        aria-busy={loading}
        tabIndex={isInteractive ? 0 : -1}
        data-testid={testId}
        data-selected={isSelected}
        data-disabled={disabled}
        data-loading={loading}
        className={chipClasses}
        style={{ ...baseColorStyles, ...customProperties, ...style }}
        onClick={isInteractive ? handleClick : undefined}
        onKeyDown={(e) => {
          if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            handleClick(e as unknown as React.MouseEvent<HTMLDivElement>);
          }
        }}
        {...rest}
      >
        {/* Loading spinner */}
        {loading && (
          <LoadingSpinner size={iconSize} color={baseColorStyles.color as string} />
        )}
        
        {/* Avatar */}
        {!loading && avatar && (
          <span className="flex-shrink-0 -ml-0.5">{avatar}</span>
        )}
        
        {/* Start icon or checkmark for selected state */}
        {!loading && !avatar && (
          <>
            {isSelected && showCheckmark && selectable ? (
              <span className={`flex-shrink-0 ${animated ? 'animate-pulse' : ''}`}>
                {checkmarkIcon || <DefaultCheckIcon size={iconSize} />}
              </span>
            ) : icon ? (
              <span className="flex-shrink-0">{icon}</span>
            ) : null}
          </>
        )}
        
        {/* Label */}
        <span className="truncate">
          {loading && loadingText ? loadingText : label}
        </span>
        
        {/* End icon */}
        {!loading && endIcon && (
          <span className="flex-shrink-0">{endIcon}</span>
        )}
        
        {/* Remove button */}
        {removable && !loading && (
          <button
            type="button"
            className={[
              'flex-shrink-0 ml-0.5 rounded-full p-0.5',
              'hover:bg-black/10 dark:hover:bg-white/10',
              animated ? 'transition-colors duration-150' : '',
              disabled ? 'cursor-not-allowed' : 'cursor-pointer',
            ].join(' ')}
            onClick={handleRemove}
            disabled={disabled}
            aria-label={`Remove ${label}`}
            tabIndex={-1}
          >
            {removeIcon || <DefaultCloseIcon size={iconSize - 2} />}
          </button>
        )}
      </div>
    );
  }
);

Chip.displayName = 'Chip';

// ============================================================================
// CHIP GROUP COMPONENT
// ============================================================================

export interface ChipGroupProps {
  /** Array of chips to render */
  children: React.ReactNode;
  
  /** Spacing between chips */
  spacing?: 'xs' | 'sm' | 'md' | 'lg';
  
  /** Direction of chip arrangement */
  direction?: 'row' | 'column';
  
  /** Whether to wrap chips to next line */
  wrap?: boolean;
  
  /** Additional class names */
  className?: string;
  
  /** Inline styles */
  style?: React.CSSProperties;
  
  /** Accessible label for the group */
  'aria-label'?: string;
}

const getSpacingClass = (spacing: 'xs' | 'sm' | 'md' | 'lg'): string => {
  const spacingMap: Record<string, string> = {
    xs: 'gap-1',
    sm: 'gap-2',
    md: 'gap-3',
    lg: 'gap-4',
  };
  return spacingMap[spacing];
};

/**
 * ChipGroup Component
 * 
 * A container for organizing multiple chips with consistent spacing.
 * 
 * @example
 * <ChipGroup spacing="sm">
 *   <Chip label="React" />
 *   <Chip label="TypeScript" />
 *   <Chip label="Tailwind" />
 * </ChipGroup>
 */
export const ChipGroup: React.FC<ChipGroupProps> = ({
  children,
  spacing = 'sm',
  direction = 'row',
  wrap = true,
  className = '',
  style,
  'aria-label': ariaLabel,
}) => {
  const groupClasses = [
    'flex',
    direction === 'row' ? 'flex-row' : 'flex-col',
    wrap && direction === 'row' ? 'flex-wrap' : '',
    getSpacingClass(spacing),
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={groupClasses}
      style={style}
    >
      {children}
    </div>
  );
};

ChipGroup.displayName = 'ChipGroup';

// ============================================================================
// EXPORTS (for backwards compatibility)
// ============================================================================

export type CustomChipProps = ChipProps;
export const CustomChip = Chip;

export default Chip;
