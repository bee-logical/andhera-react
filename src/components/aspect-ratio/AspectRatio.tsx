import React from 'react';

// AspectRatio Types
export type AspectRatioVariant = 'container' | 'image' | 'video' | 'custom';
export type AspectRatioSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type AspectRatioPreset = '1:1' | '4:3' | '16:9' | '21:9' | '3:2' | '5:4' | '9:16' | '2:3';
export type AspectRatioElement = 'div' | 'section' | 'article' | 'main' | 'aside' | 'figure';

export interface AspectRatioProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onLoad'> {
  /** Content to render inside the aspect ratio container */
  children?: React.ReactNode;
  
  /** Visual variant type */
  variant?: AspectRatioVariant;
  
  /** Size preset for common dimensions */
  size?: AspectRatioSize;
  
  /** Quick aspect ratio presets */
  ratio?: AspectRatioPreset;
  
  /** Custom aspect ratio (e.g., "16/9" or 1.77) */
  customRatio?: string | number;
  
  /** Width of the container */
  width?: string | number;
  
  /** Height of the container */
  height?: string | number;
  
  /** Maximum width */
  maxWidth?: string | number;
  
  /** Maximum height */
  maxHeight?: string | number;
  
  /** Minimum width */
  minWidth?: string | number;
  
  /** Minimum height */
  minHeight?: string | number;
  
  /** Full width of parent container */
  fullWidth?: boolean;
  
  /** Full height of parent container */
  fullHeight?: boolean;
  
  /** Background color */
  backgroundColor?: string;
  
  /** Border radius */
  borderRadius?: string | number;
  
  /** Add border */
  border?: boolean | string;
  
  /** Add shadow */
  shadow?: boolean | 'sm' | 'md' | 'lg' | 'xl';
  
  /** Overflow behavior */
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
  
  /** Object fit for content (useful for images/videos) */
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  
  /** Object position */
  objectPosition?: string;
  
  /** Loading state */
  loading?: boolean;
  
  /** Loading placeholder content */
  loadingContent?: React.ReactNode;
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Interactive/clickable state */
  interactive?: boolean;
  
  /** Hover handler */
  onHover?: (event: React.MouseEvent<HTMLDivElement>) => void;
  
  /** Center content horizontally */
  centerX?: boolean;
  
  /** Center content vertically */
  centerY?: boolean;
  
  /** Center content both ways */
  center?: boolean;
  
  /** Padding inside container */
  padding?: string | number;
  
  /** Margin around container */
  margin?: string | number;
  
  /** Animate on hover */
  animated?: boolean;
  
  /** Scale on hover */
  hoverScale?: boolean;
  
  /** Rounded corners */
  rounded?: boolean | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  
  /** Custom text color override */
  textColor?: string;
  
  /** Custom border color override */
  borderColor?: string;
  
  /** Additional styles for the container */
  containerClassName?: string;
  
  /** Tooltip text on hover */
  tooltip?: string;
  
  /** Transform text to uppercase */
  uppercase?: boolean;
  
  /** Compact/dense mode with reduced padding */
  compact?: boolean;
  
  /** Active/pressed state */
  active?: boolean;
  
  /** Enable/disable hover and click animations */
  enableAnimations?: boolean;
  
  /** Custom container element type */
  as?: 'div' | 'section' | 'article' | 'main' | 'aside' | 'figure';
}

/**
 * AspectRatio - A flexible container component that maintains consistent aspect ratios
 * 
 * This component ensures content maintains proper proportions across different screen sizes
 * while providing extensive customization options for styling and behavior.
 * 
 * @example
 * ```tsx
 * // Basic square aspect ratio
 * <AspectRatio ratio="1:1">
 *   <img src="image.jpg" alt="Square image" />
 * </AspectRatio>
 * 
 * // Video aspect ratio with custom styling
 * <AspectRatio ratio="16:9" variant="video" shadow="lg" rounded="md">
 *   <video src="video.mp4" controls />
 * </AspectRatio>
 * 
 * // Custom ratio with interactive features
 * <AspectRatio customRatio={1.5} interactive onClick={handleClick}>
 *   <div>Interactive content</div>
 * </AspectRatio>
 * 
 * // Responsive container with centering
 * <AspectRatio ratio="4:3" fullWidth center shadow="md">
 *   <p>Centered content</p>
 * </AspectRatio>
 * ```
 */
export const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  (
    {
      children,
      variant = 'container',
      size = 'md',
      ratio,
      customRatio,
      width,
      height,
      maxWidth,
      maxHeight,
      minWidth,
      minHeight,
      fullWidth = false,
      fullHeight = false,
      className = '',
      style = {},
      backgroundColor,
      borderRadius,
      border = false,
      shadow = false,
      overflow = 'hidden',
      objectFit = 'cover',
      objectPosition = 'center',
      loading = false,
      loadingContent,
      disabled = false,
      interactive = false,
      onClick,
      onHover,
      onFocus,
      onBlur,
      tabIndex,
      role,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      centerX = false,
      centerY = false,
      center = false,
      padding,
      margin,
      animated = false,
      hoverScale = false,
      rounded = false,
      textColor,
      borderColor,
      containerClassName,
      tooltip,
      uppercase = false,
      compact = false,
      active = false,
      enableAnimations = true,
      as: Component = 'div',
      ...rest
    },
    ref
  ) => {
    // Calculate aspect ratio value
    const getAspectRatioValue = (): string => {
      if (customRatio) {
        if (typeof customRatio === 'number') {
          return `${customRatio}`;
        }
        // Convert fraction strings to decimal for CSS
        if (typeof customRatio === 'string' && customRatio.includes('/')) {
          const [width, height] = customRatio.split('/').map(Number);
          return `${width / height}`;
        }
        return customRatio;
      }
      
      if (ratio) {
        const ratioMap: Record<AspectRatioPreset, string> = {
          '1:1': '1',
          '4:3': `${4/3}`, // 1.333...
          '16:9': `${16/9}`, // 1.777...
          '21:9': `${21/9}`, // 2.333...
          '3:2': `${3/2}`, // 1.5
          '5:4': `${5/4}`, // 1.25
          '9:16': `${9/16}`, // 0.5625
          '2:3': `${2/3}`, // 0.666...
        };
        return ratioMap[ratio];
      }
      
      return '1'; // Default to square
    };

    // Size classes - only constrain width when using aspect-ratio
    const sizeClasses = {
      xs: 'w-16',
      sm: 'w-24',
      md: 'w-32',
      lg: 'w-48',
      xl: 'w-64',
      full: 'w-full',
    };

    // Variant classes
    const variantClasses = {
      container: 'bg-gray-900/40 border border-gray-700/50',
      image: 'bg-gray-800/60 border border-gray-600/40',
      video: 'bg-black/80 border border-gray-600/60',
      custom: 'bg-gray-900/20',
    };

    // Shadow classes
    const shadowClasses = {
      sm: 'shadow-sm shadow-black/20',
      md: 'shadow-md shadow-black/25',
      lg: 'shadow-lg shadow-black/30',
      xl: 'shadow-xl shadow-black/35',
    };

    // Rounded classes
    const roundedClasses = {
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      full: 'rounded-full',
    };

    // Build base classes
    const baseClasses = [
      'relative',
      
      // Size handling - only apply size class if no custom dimensions
      !fullWidth && !fullHeight && !width && !height ? sizeClasses[size] : '',
      fullWidth ? 'w-full' : '',
      fullHeight && !ratio && !customRatio ? 'h-full' : '', // Don't set height when using aspect-ratio
      
      // Add max-height constraint for very wide ratios to prevent excessive height
      'max-h-screen',
      
      // Variant styling
      variantClasses[variant],
      
      // Border handling
      border === true ? 'border border-gray-600/50' : 
      typeof border === 'string' ? `border ${border}` : '',
      
      // Shadow
      shadow === true ? shadowClasses.md :
      typeof shadow === 'string' ? shadowClasses[shadow as keyof typeof shadowClasses] : '',
      
      // Rounded corners
      rounded === true ? roundedClasses.md :
      typeof rounded === 'string' ? roundedClasses[rounded as keyof typeof roundedClasses] : '',
      
      // Interactive states
      interactive ? 'cursor-pointer' : '',
      disabled ? 'opacity-50 cursor-not-allowed' : '',
      active ? 'ring-2 ring-blue-500/50' : '',
      
      // Animations
      enableAnimations && animated ? 'transition-all duration-300 ease-in-out' : '',
      enableAnimations && hoverScale && !disabled ? 'hover:scale-105 transform transition-transform duration-200' : '',
      enableAnimations && interactive ? 'hover:brightness-110 transition-all duration-200' : '',
      
      // Overflow
      `overflow-${overflow}`,
      
      // Text styling
      uppercase ? 'uppercase' : '',
      compact ? 'p-2' : '',
      
      // Centering
      (center || centerX) && (center || centerY) ? 'flex items-center justify-center' :
      center || centerX ? 'flex justify-center' :
      center || centerY ? 'flex items-center' : '',
      
      // Container className
      containerClassName || '',
    ].filter(Boolean).join(' ');

    // Helper to determine if ratio is ultra-wide (> 2.0)
    const aspectRatioValue = parseFloat(getAspectRatioValue());
    const isUltraWide = aspectRatioValue > 2.0;
    
    // Custom styles
    const customStyles: React.CSSProperties = {
      aspectRatio: getAspectRatioValue(),
      width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
      // Only set explicit height if not using aspect-ratio or if fullHeight is true
      height: (height && !ratio && !customRatio) || fullHeight ? (typeof height === 'number' ? `${height}px` : height) : undefined,
      maxWidth: maxWidth ? (typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth) : undefined,
      maxHeight: maxHeight ? (typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight) : 
                 // Add reasonable max-height for ultra-wide ratios
                 isUltraWide && !maxHeight && !fullHeight ? '200px' : undefined,
      minWidth: minWidth ? (typeof minWidth === 'number' ? `${minWidth}px` : minWidth) : undefined,
      minHeight: minHeight ? (typeof minHeight === 'number' ? `${minHeight}px` : minHeight) : undefined,
      backgroundColor: backgroundColor,
      borderRadius: borderRadius ? (typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius) : undefined,
      borderColor: borderColor,
      color: textColor,
      padding: !compact && padding ? (typeof padding === 'number' ? `${padding}px` : padding) : undefined,
      margin: margin ? (typeof margin === 'number' ? `${margin}px` : margin) : undefined,
      ...style,
    };

    // Content styling for images/videos
    const contentClasses = [
      'w-full h-full',
      variant === 'image' || variant === 'video' ? `object-${objectFit}` : '',
    ].filter(Boolean).join(' ');

    const contentStyle: React.CSSProperties = {
      objectPosition: objectPosition,
    };

    // Event handlers
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      onClick?.(event);
    };

    const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      onHover?.(event);
    };

    // Loading state
    if (loading) {
      return (
        <Component
          ref={ref as any}
          className={`${baseClasses} ${className}`.trim()}
          style={customStyles}
          aria-label={ariaLabel || 'Loading content'}
          role={role || 'status'}
          title={tooltip}
          {...rest}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {loadingContent || (
              <div className="flex items-center space-x-2 text-gray-400">
                <div className="w-4 h-4 border-2 border-gray-600 border-t-gray-400 rounded-full animate-spin" />
                <span className="text-sm">Loading...</span>
              </div>
            )}
          </div>
        </Component>
      );
    }

    return (
      <Component
        ref={ref as any}
        className={`${baseClasses} ${className}`.trim()}
        style={customStyles}
        onClick={interactive ? handleClick : onClick}
        onMouseEnter={onHover ? handleMouseEnter : undefined}
        onFocus={onFocus}
        onBlur={onBlur}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        role={role}
        tabIndex={interactive ? (tabIndex ?? 0) : tabIndex}
        title={tooltip}
        {...rest}
      >
        {React.Children.map(children, (child) => {
          // Apply styling to direct img/video children
          if (React.isValidElement(child) && 
              (child.type === 'img' || child.type === 'video')) {
            return React.cloneElement(child as React.ReactElement<any>, {
              className: `${contentClasses} ${child.props.className || ''}`.trim(),
              style: { ...contentStyle, ...child.props.style },
            });
          }
          return child;
        })}
      </Component>
    );
  }
);

AspectRatio.displayName = 'AspectRatio';

// Export component and types
export default AspectRatio;