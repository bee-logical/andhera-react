import React, { forwardRef } from 'react';

// ============================================================================
// TYPES
// ============================================================================

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarVariant = 'circular' | 'rounded' | 'square';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Image source URL */
  src?: string;
  /** Alt text for the image */
  alt?: string;
  /** Initials to display when no image is provided */
  initials?: string;
  /** Size of the avatar */
  size?: AvatarSize;
  /** Shape variant */
  variant?: AvatarVariant;
  /** Background color (used when showing initials) */
  bgColor?: string;
  /** Text color for initials */
  textColor?: string;
  /** Fallback content when image fails to load */
  fallback?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

// ============================================================================
// SIZE CLASSES
// ============================================================================

const sizeClasses: Record<AvatarSize, { container: string; text: string }> = {
  xs: { container: 'w-5 h-5', text: 'text-[10px]' },
  sm: { container: 'w-6 h-6', text: 'text-xs' },
  md: { container: 'w-8 h-8', text: 'text-sm' },
  lg: { container: 'w-10 h-10', text: 'text-base' },
  xl: { container: 'w-12 h-12', text: 'text-lg' },
};

const variantClasses: Record<AvatarVariant, string> = {
  circular: 'rounded-full',
  rounded: 'rounded-md',
  square: 'rounded-none',
};

// ============================================================================
// DEFAULT FALLBACK ICON
// ============================================================================

const DefaultUserIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="60%"
    height="60%"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

// ============================================================================
// AVATAR COMPONENT
// ============================================================================

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt = 'Avatar',
      initials,
      size = 'md',
      variant = 'circular',
      bgColor = '#6b7280',
      textColor = '#ffffff',
      fallback,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = React.useState(false);

    const handleImageError = () => {
      setImageError(true);
    };

    const sizeClass = sizeClasses[size];
    const variantClass = variantClasses[variant];

    // Determine what to render
    const showImage = src && !imageError;
    const showInitials = !showImage && initials;
    const showFallback = !showImage && !showInitials;

    const baseClasses = [
      'inline-flex items-center justify-center flex-shrink-0 overflow-hidden',
      sizeClass.container,
      variantClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const computedStyle: React.CSSProperties = {
      backgroundColor: showImage ? undefined : bgColor,
      color: textColor,
      ...style,
    };

    return (
      <div ref={ref} className={baseClasses} style={computedStyle} {...props}>
        {showImage && (
          <img
            src={src}
            alt={alt}
            onError={handleImageError}
            className="w-full h-full object-cover"
          />
        )}
        {showInitials && (
          <span className={`font-medium ${sizeClass.text}`}>
            {initials.slice(0, 2).toUpperCase()}
          </span>
        )}
        {showFallback && (fallback || <DefaultUserIcon />)}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export default Avatar;
