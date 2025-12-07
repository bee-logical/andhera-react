import React from 'react';

// Button Types
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'secondary-destructive' | 'ghost' | 'link';
export type ButtonSize = 'xs' | 'small' | 'default' | 'large' | 'extra-large';
export type IconPosition = 'none' | 'leading' | 'trailing' | 'icon-only';
export type ButtonType = 'button' | 'submit' | 'reset';
export type LoadingPosition = 'start' | 'end' | 'center';

// Icon Component (Chevron as example - you can replace with your icon library)
const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'type'> {
  /** Button content */
  children?: React.ReactNode;
  
  /** Button variant type */
  variant?: ButtonVariant;
  
  /** Button size */
  size?: ButtonSize;
  
  /** Icon position */
  iconPosition?: IconPosition;
  
  /** Leading icon (left side) */
  leadingIcon?: React.ReactNode;
  
  /** Trailing icon (right side) */
  trailingIcon?: React.ReactNode;
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Full width button */
  fullWidth?: boolean;
  
  /** Custom className */
  className?: string;
  
  /** Loading state */
  loading?: boolean;
  
  /** Custom loading text (replaces button text when loading) */
  loadingText?: string;
  
  /** Position of loading spinner */
  loadingPosition?: LoadingPosition;
  
  /** Click handler */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  
  /** HTML button type */
  type?: ButtonType;
  
  /** Renders button as a link (anchor element) */
  href?: string;
  
  /** Target for link button */
  target?: '_blank' | '_self' | '_parent' | '_top';
  
  /** Rel attribute for link button */
  rel?: string;
  
  /** Custom border radius (e.g., "4px", "12px", "full" for pill) */
  borderRadius?: string;
  
  /** Accessibility label */
  'aria-label'?: string;
  
  /** Accessibility described by */
  'aria-describedby'?: string;
  
  /** Active/pressed state */
  active?: boolean;
  
  /** Content to render on left side (more flexible than icon) */
  leftSection?: React.ReactNode;
  
  /** Content to render on right side (more flexible than icon) */
  rightSection?: React.ReactNode;
  
  /** Compact/dense mode with reduced padding */
  compact?: boolean;
  
  /** Transform text to uppercase */
  uppercase?: boolean;
  
  /** Add box shadow */
  shadow?: boolean | 'sm' | 'md' | 'lg';
  
  /** Enable/disable hover and click animations */
  animated?: boolean;
  
  /** Pill shape (fully rounded) */
  rounded?: boolean;
  
  /** Tooltip text on hover */
  tooltip?: string;
  
  /** Custom text color override */
  textColor?: string;
  
  /** Custom background color override */
  backgroundColor?: string;
  
  /** Custom border color override */
  borderColor?: string;
  
  /** Additional styles for the button container */
  containerClassName?: string;
}

/**
 * AnderaUI Button Component
 * 
 * A comprehensive button component with multiple variants, sizes, and states
 * following the Figma design system specifications.
 * 
 * @example
 * ```tsx
 * // Primary button
 * <Button variant="primary" size="default">Button</Button>
 * 
 * // Button with icon
 * <Button variant="secondary" iconPosition="leading" leadingIcon={<PlusIcon />}>
 *   Add Item
 * </Button>
 * 
 * // Icon only button
 * <Button variant="primary" iconPosition="icon-only" leadingIcon={<PlusIcon />} />
 * 
 * // Link button
 * <Button href="https://example.com" target="_blank">Visit Site</Button>
 * 
 * // Custom styled button
 * <Button backgroundColor="#8B5CF6" textColor="#FFFFFF">Custom</Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'default',
      iconPosition = 'none',
      leadingIcon,
      trailingIcon,
      disabled = false,
      fullWidth = false,
      className = '',
      loading = false,
      loadingText,
      loadingPosition = 'center',
      onClick,
      type = 'button',
      href,
      target,
      rel,
      borderRadius,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      active = false,
      leftSection,
      rightSection,
      compact = false,
      uppercase = false,
      shadow = false,
      animated = true,
      rounded = false,
      tooltip,
      textColor,
      backgroundColor,
      borderColor,
      containerClassName = '',
      ...rest
    },
    ref
  ) => {
    // Compact padding multiplier
    const compactMultiplier = compact ? 0.75 : 1;
    
    // Size configurations based on Figma specs
    const sizeConfig = {
      'xs': {
        height: compact ? '24px' : '28px',
        padding: iconPosition === 'icon-only' ? '6px' : `6px ${Math.round(10 * compactMultiplier)}px`,
        fontSize: '12px',
        gap: '4px',
        iconSize: '14px'
      },
      'small': {
        height: compact ? '28px' : '32px',
        padding: iconPosition === 'icon-only' ? '8px' : `8px ${Math.round(12 * compactMultiplier)}px`,
        fontSize: '14px',
        gap: '6px',
        iconSize: '16px'
      },
      'default': {
        height: compact ? '34px' : '38px',
        padding: iconPosition === 'icon-only' ? '10px' : `10px ${Math.round(14 * compactMultiplier)}px`,
        fontSize: '14px',
        gap: '8px',
        iconSize: '16px'
      },
      'large': {
        height: compact ? '40px' : '44px',
        padding: iconPosition === 'icon-only' ? '12px' : `12px ${Math.round(16 * compactMultiplier)}px`,
        fontSize: '16px',
        gap: '8px',
        iconSize: '18px'
      },
      'extra-large': {
        height: compact ? '44px' : '48px',
        padding: iconPosition === 'icon-only' ? '14px' : `14px ${Math.round(18 * compactMultiplier)}px`,
        fontSize: '16px',
        gap: '10px',
        iconSize: '20px'
      }
    };

    // Variant color configurations based on Figma design
    const variantConfig = {
      'primary': {
        default: {
          background: '#FFCB00',
          color: '#000000',
          border: 'none',
        },
        hover: {
          background: '#FFD633',
          color: '#000000',
        },
        focus: {
          background: '#FFCB00',
          color: '#000000',
          outline: '2px solid #FFE566',
          outlineOffset: '2px',
        },
        disabled: {
          background: '#3A3A3A',
          color: '#666666',
          cursor: 'not-allowed',
        }
      },
      'secondary': {
        default: {
          background: 'transparent',
          color: '#FFCB00',
          border: '1px solid #FFCB00',
        },
        hover: {
          background: 'rgba(255, 203, 0, 0.1)',
          color: '#FFCB00',
          border: '1px solid #FFCB00',
        },
        focus: {
          background: 'transparent',
          color: '#FFCB00',
          border: '1px solid #FFCB00',
          outline: '2px solid rgba(255, 203, 0, 0.3)',
          outlineOffset: '2px',
        },
        disabled: {
          background: 'transparent',
          color: '#666666',
          border: '1px solid #2A2A2A',
          cursor: 'not-allowed',
        }
      },
      'tertiary': {
        default: {
          background: 'transparent',
          color: '#FFCB00',
          border: 'none',
        },
        hover: {
          background: 'rgba(255, 203, 0, 0.1)',
          color: '#FFCB00',
        },
        focus: {
          background: 'rgba(255, 203, 0, 0.1)',
          color: '#FFCB00',
          outline: '2px solid rgba(255, 203, 0, 0.3)',
          outlineOffset: '2px',
        },
        disabled: {
          background: 'transparent',
          color: '#666666',
          cursor: 'not-allowed',
        }
      },
      'destructive': {
        default: {
          background: '#EF4444',
          color: '#FFFFFF',
          border: 'none',
        },
        hover: {
          background: '#F87171',
          color: '#FFFFFF',
        },
        focus: {
          background: '#EF4444',
          color: '#FFFFFF',
          outline: '2px solid rgba(239, 68, 68, 0.5)',
          outlineOffset: '2px',
        },
        disabled: {
          background: '#3A3A3A',
          color: '#666666',
          cursor: 'not-allowed',
        }
      },
      'secondary-destructive': {
        default: {
          background: 'transparent',
          color: '#EF4444',
          border: '1px solid #EF4444',
        },
        hover: {
          background: 'rgba(239, 68, 68, 0.1)',
          color: '#EF4444',
          border: '1px solid #F87171',
        },
        focus: {
          background: 'transparent',
          color: '#EF4444',
          border: '1px solid #EF4444',
          outline: '2px solid rgba(239, 68, 68, 0.3)',
          outlineOffset: '2px',
        },
        disabled: {
          background: 'transparent',
          color: '#666666',
          border: '1px solid #2A2A2A',
          cursor: 'not-allowed',
        }
      },
      'ghost': {
        default: {
          background: 'transparent',
          color: '#E3E6F2',
          border: 'none',
        },
        hover: {
          background: 'rgba(255, 255, 255, 0.1)',
          color: '#FFFFFF',
        },
        focus: {
          background: 'rgba(255, 255, 255, 0.1)',
          color: '#FFFFFF',
          outline: '2px solid rgba(255, 255, 255, 0.3)',
          outlineOffset: '2px',
        },
        disabled: {
          background: 'transparent',
          color: '#666666',
          cursor: 'not-allowed',
        }
      },
      'link': {
        default: {
          background: 'transparent',
          color: '#FFCB00',
          border: 'none',
          textDecoration: 'underline',
        },
        hover: {
          background: 'transparent',
          color: '#FFD633',
          textDecoration: 'underline',
        },
        focus: {
          background: 'transparent',
          color: '#FFCB00',
          textDecoration: 'underline',
          outline: '2px solid rgba(255, 203, 0, 0.3)',
          outlineOffset: '2px',
        },
        disabled: {
          background: 'transparent',
          color: '#666666',
          textDecoration: 'none',
          cursor: 'not-allowed',
        }
      }
    };

    const currentSize = sizeConfig[size];
    const currentVariant = variantConfig[variant];
    const stateStyle = disabled ? currentVariant.disabled : (active ? currentVariant.hover : currentVariant.default);

    // Separate style from rest props
    const { style: customStyle, ...buttonProps } = rest;
    
    // Shadow configuration
    const getShadowStyle = (): string => {
      if (!shadow) return 'none';
      if (shadow === true || shadow === 'md') return '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)';
      if (shadow === 'sm') return '0 1px 2px 0 rgba(0, 0, 0, 0.3)';
      if (shadow === 'lg') return '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)';
      return 'none';
    };
    
    // Border radius configuration
    const getBorderRadius = (): string => {
      if (rounded) return '9999px';
      if (borderRadius === 'full') return '9999px';
      if (borderRadius) return borderRadius;
      return '8px';
    };

    const baseStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: currentSize.gap,
      height: currentSize.height,
      padding: currentSize.padding,
      fontSize: currentSize.fontSize,
      fontWeight: 500,
      fontFamily: 'Manrope, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      borderRadius: getBorderRadius(),
      transition: animated ? 'all 0.2s ease' : 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      outline: 'none',
      width: fullWidth ? '100%' : iconPosition === 'icon-only' ? currentSize.height : 'auto',
      minWidth: iconPosition === 'icon-only' ? currentSize.height : 'auto',
      textTransform: uppercase ? 'uppercase' : 'none',
      letterSpacing: uppercase ? '0.05em' : 'normal',
      boxShadow: getShadowStyle(),
      textDecoration: 'none',
      ...stateStyle,
      // Apply custom color overrides
      ...(backgroundColor && { background: backgroundColor }),
      ...(textColor && { color: textColor }),
      ...(borderColor && { border: `1px solid ${borderColor}` }),
      ...customStyle, // Merge custom styles
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled && !loading && onClick) {
        onClick(e);
      }
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (!disabled && !loading && animated) {
        const hoverStyle = currentVariant.hover;
        Object.assign(e.currentTarget.style, hoverStyle);
        // Preserve custom overrides
        if (backgroundColor) e.currentTarget.style.background = backgroundColor;
        if (textColor) e.currentTarget.style.color = textColor;
        if (borderColor) e.currentTarget.style.border = `1px solid ${borderColor}`;
      }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (!disabled && !loading && animated) {
        const defaultStyle = active ? currentVariant.hover : currentVariant.default;
        Object.assign(e.currentTarget.style, defaultStyle);
        e.currentTarget.style.outline = 'none';
        e.currentTarget.style.outlineOffset = '0px';
        // Preserve custom overrides
        if (backgroundColor) e.currentTarget.style.background = backgroundColor;
        if (textColor) e.currentTarget.style.color = textColor;
        if (borderColor) e.currentTarget.style.border = `1px solid ${borderColor}`;
      }
    };

    const handleFocus = (e: React.FocusEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (!disabled && !loading && animated) {
        const focusStyle = currentVariant.focus;
        Object.assign(e.currentTarget.style, focusStyle);
        // Preserve custom overrides
        if (backgroundColor) e.currentTarget.style.background = backgroundColor;
        if (textColor) e.currentTarget.style.color = textColor;
        if (borderColor) e.currentTarget.style.border = `1px solid ${borderColor}`;
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (!disabled && !loading && animated) {
        const defaultStyle = active ? currentVariant.hover : currentVariant.default;
        Object.assign(e.currentTarget.style, defaultStyle);
        e.currentTarget.style.outline = 'none';
        e.currentTarget.style.outlineOffset = '0px';
        // Preserve custom overrides
        if (backgroundColor) e.currentTarget.style.background = backgroundColor;
        if (textColor) e.currentTarget.style.color = textColor;
        if (borderColor) e.currentTarget.style.border = `1px solid ${borderColor}`;
      }
    };

    const renderIcon = (icon: React.ReactNode) => {
      if (!icon) return null;
      return (
        <span style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          width: currentSize.iconSize,
          height: currentSize.iconSize,
          flexShrink: 0,
        }}>
          {icon}
        </span>
      );
    };
    
    const renderLoadingSpinner = () => (
      <svg 
        style={{ 
          animation: 'spin 1s linear infinite',
          width: currentSize.iconSize,
          height: currentSize.iconSize,
          flexShrink: 0,
        }}
        viewBox="0 0 24 24" 
        fill="none"
      >
        <circle 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4" 
          strokeOpacity="0.25"
        />
        <path 
          d="M12 2a10 10 0 0 1 10 10" 
          stroke="currentColor" 
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    );

    const renderContent = () => {
      const displayText = loading && loadingText ? loadingText : children;
      
      if (loading) {
        if (iconPosition === 'icon-only') {
          return renderLoadingSpinner();
        }
        
        // Loading with position
        if (loadingPosition === 'start') {
          return (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: currentSize.gap }}>
              {renderLoadingSpinner()}
              {displayText && <span style={{ lineHeight: 1 }}>{displayText}</span>}
            </span>
          );
        }
        
        if (loadingPosition === 'end') {
          return (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: currentSize.gap }}>
              {displayText && <span style={{ lineHeight: 1 }}>{displayText}</span>}
              {renderLoadingSpinner()}
            </span>
          );
        }
        
        // Center (default) - spinner only or with loading text
        return (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: currentSize.gap }}>
            {renderLoadingSpinner()}
            {displayText && <span style={{ lineHeight: 1 }}>{displayText}</span>}
          </span>
        );
      }

      if (iconPosition === 'icon-only') {
        return renderIcon(leadingIcon || trailingIcon);
      }

      return (
        <>
          {leftSection && <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>{leftSection}</span>}
          {iconPosition === 'leading' && renderIcon(leadingIcon)}
          {children && <span style={{ lineHeight: 1 }}>{children}</span>}
          {iconPosition === 'trailing' && renderIcon(trailingIcon)}
          {rightSection && <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>{rightSection}</span>}
        </>
      );
    };
    
    // Common props for both button and anchor
    const commonProps = {
      className: `andera-button ${containerClassName} ${className}`.trim(),
      style: baseStyles,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      title: tooltip,
    };

    // Render as anchor if href is provided
    if (href && !disabled) {
      return (
        <>
          <style>
            {`
              @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
            `}
          </style>
          <a
            href={href}
            target={target}
            rel={target === '_blank' ? (rel || 'noopener noreferrer') : rel}
            {...commonProps}
            onFocus={handleFocus as React.FocusEventHandler<HTMLAnchorElement>}
            onBlur={handleBlur as React.FocusEventHandler<HTMLAnchorElement>}
            onClick={(e) => {
              if (loading) {
                e.preventDefault();
              }
            }}
          >
            {renderContent()}
          </a>
        </>
      );
    }

    return (
      <>
        <style>
          {`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}
        </style>
        <button
          ref={ref}
          type={type}
          {...commonProps}
          disabled={disabled || loading}
          onClick={handleClick}
          onFocus={handleFocus as React.FocusEventHandler<HTMLButtonElement>}
          onBlur={handleBlur as React.FocusEventHandler<HTMLButtonElement>}
          {...buttonProps}
        >
          {renderContent()}
        </button>
      </>
    );
  }
);

Button.displayName = 'Button';

// Export default for convenience
export default Button;

// Export icon components for use in demos
export { ChevronRightIcon, PlusIcon };

// Note: Types (ButtonProps, ButtonVariant, ButtonSize, IconPosition, ButtonType, LoadingPosition) 
// are already exported at the top of this file
