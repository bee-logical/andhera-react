/**
 * Badge Component
 * --------------------------------------------
 * A fully dynamic, accessible, Tailwind-only badge for wrapping any element.
 * Features:
 * - Dynamic counts, dots, and custom content support
 * - Configurable variants, sizes, shapes, and positions
 * - Fine-tuned corner alignment with `offset`
 * - Accessible with ARIA attributes and keyboard interaction
 * - Self-contained (no external libraries)
 */

import React, { KeyboardEvent } from 'react';

// Helper: format count display value
export const formatCount = (count?: number, maxCount?: number): string => {
  if (typeof count !== 'number') return '';
  if (typeof maxCount === 'number' && count > maxCount) return `${maxCount}+`;
  return count.toString();
};

// Badge props interface
export interface BadgeProps {
  count?: number;
  showBadge?: boolean;
  maxCount?: number;
  dot?: boolean;
  variant?: 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'muted';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'rounded' | 'pill' | 'square';
  position?: { vertical: 'top' | 'bottom'; horizontal: 'left' | 'right' };
  offset?: { x?: number; y?: number };
  animated?: boolean;
  className?: string;
  badgeClassName?: string;
  ariaLabel?: string;
  children?: React.ReactNode;
  customContent?: React.ReactNode;
  onClick?: () => void;
}

// Utility: simple conditional class joiner
const cn = (...classes: (string | undefined | false)[]) => classes.filter(Boolean).join(' ');

const Badge: React.FC<BadgeProps> = ({
  count,
  showBadge = true,
  maxCount = 99,
  dot = false,
  variant = 'primary',
  size = 'md',
  shape = 'circle',
  position = { vertical: 'top', horizontal: 'right' },
  offset = { x: 0, y: 0 },
  animated = true,
  className = '',
  badgeClassName = '',
  ariaLabel,
  children,
  customContent,
  onClick,
}) => {
  if (!showBadge) return <span className={cn('relative inline-flex', className)}>{children}</span>;

  // Variant color mapping
  const variantClasses: Record<string, string> = {
    default: 'bg-gray-700 text-white',
    primary: 'bg-[#FFCB00] text-black',
    success: 'bg-green-600 text-white',
    danger: 'bg-red-600 text-white',
    warning: 'bg-yellow-500 text-black',
    info: 'bg-blue-500 text-white',
    muted: 'bg-gray-600 text-white',
  };

  // Size mapping
  const sizeClasses: Record<string, string> = {
    xs: 'min-w-[0.5rem] h-[0.5rem] text-[0.5rem] px-1',
    sm: 'min-w-[0.75rem] h-[0.75rem] text-xs px-1.5',
    md: 'min-w-[1rem] h-[1rem] text-sm px-2',
    lg: 'min-w-[1.25rem] h-[1.25rem] text-base px-2.5',
    xl: 'min-w-[1.5rem] h-[1.5rem] text-lg px-3',
  };

  // Shape mapping
  const shapeClasses: Record<string, string> = {
    circle: 'rounded-full',
    rounded: 'rounded-md',
    pill: 'rounded-full px-2',
    square: 'rounded-none',
  };

  // Positioning logic
  const corner = `${position.vertical}-${position.horizontal}`;
  const positionClasses: Record<string, string> = {
    'top-right': 'top-0 right-0 translate-x-1/2 -translate-y-1/2',
    'top-left': 'top-0 left-0 -translate-x-1/2 -translate-y-1/2',
    'bottom-right': 'bottom-0 right-0 translate-x-1/2 translate-y-1/2',
    'bottom-left': 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
  };

  // Accessibility handling
  const isInteractive = typeof onClick === 'function';
  const isDecorative = dot && !ariaLabel;

  // Fine-tuning offset
  const offsetStyle = {
    transform: `translate(${offset.x ?? 0}px, ${offset.y ?? 0}px)`,
  };

  // Badge interactive handlers
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isInteractive) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <span className={cn('relative inline-flex items-center justify-center', className)}>
      {children}

      <span
        className={cn(
          'absolute flex items-center justify-center select-none z-10',
          variantClasses[variant],
          sizeClasses[size],
          shapeClasses[shape],
          positionClasses[corner],
          animated && 'transition-transform transform hover:scale-110 duration-150 ease-out',
          dot ? 'p-0' : '',
          isInteractive ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2' : 'pointer-events-none',
          badgeClassName
        )}
        style={{
          ...offsetStyle,
        }}
        aria-label={ariaLabel}
        aria-hidden={isDecorative}
        role={ariaLabel ? 'status' : undefined}
        aria-live={ariaLabel ? 'polite' : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        onClick={onClick}
        onKeyDown={handleKeyDown}
      >
        {customContent ? (
          customContent
        ) : dot ? null : (
          <span className="px-1 font-medium leading-none">{formatCount(count, maxCount)}</span>
        )}
      </span>
    </span>
  );
};

export default Badge;
