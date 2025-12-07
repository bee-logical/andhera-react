'use client';

import React, { useEffect, useRef, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * Dialog size options
 */
export type DialogSize = 'xs' | 'small' | 'medium' | 'large' | 'xl' | 'full';

/**
 * Dialog position options
 */
export type DialogPosition = 'center' | 'top' | 'bottom';

/**
 * Dialog animation options
 */
export type DialogAnimation = 'fade' | 'scale' | 'slide-up' | 'slide-down' | 'none';

export interface BeeDialogProps {
  /**
   * Controls whether the dialog is visible
   */
  open: boolean;
  
  /**
   * Callback fired when the dialog should be closed
   */
  onClose: () => void;
  
  /**
   * Title displayed in the dialog header
   */
  title?: React.ReactNode;
  
  /**
   * Dialog content
   */
  children: React.ReactNode;
  
  /**
   * Action buttons displayed in the dialog footer
   */
  actions?: React.ReactNode;
  
  /**
   * Size of the dialog
   * @default 'medium'
   */
  size?: DialogSize;
  
  /**
   * Additional CSS classes for the dialog container
   */
  className?: string;

  /**
   * Whether to close the dialog when clicking the backdrop
   * @default true
   */
  closeOnBackdropClick?: boolean;

  /**
   * Whether to close the dialog when pressing Escape key
   * @default true
   */
  closeOnEscape?: boolean;

  /**
   * Whether to show the close button in the header
   * @default true
   */
  showCloseButton?: boolean;

  /**
   * Custom close button icon
   */
  closeIcon?: React.ReactNode;

  /**
   * Dialog position on screen
   * @default 'center'
   */
  position?: DialogPosition;

  /**
   * Animation type for dialog entrance/exit
   * @default 'scale'
   */
  animation?: DialogAnimation;

  /**
   * Animation duration in milliseconds
   * @default 300
   */
  animationDuration?: number;

  /**
   * Whether to show backdrop blur
   * @default true
   */
  blurBackdrop?: boolean;

  /**
   * Custom backdrop color/opacity (CSS value)
   */
  backdropColor?: string;

  /**
   * Custom backdrop className
   */
  backdropClassName?: string;

  /**
   * Whether to prevent body scroll when dialog is open
   * @default true
   */
  preventScroll?: boolean;

  /**
   * Custom max height for the dialog (CSS value)
   */
  maxHeight?: string;

  /**
   * Custom min height for the dialog (CSS value)
   */
  minHeight?: string;

  /**
   * Custom width for the dialog (CSS value, overrides size)
   */
  width?: string;

  /**
   * Whether the dialog content should be scrollable
   * @default true
   */
  scrollable?: boolean;

  /**
   * Custom padding for dialog content
   */
  contentPadding?: string;

  /**
   * Whether to show a divider between header and content
   * @default true
   */
  showHeaderDivider?: boolean;

  /**
   * Whether to show a divider between content and footer
   * @default true
   */
  showFooterDivider?: boolean;

  /**
   * Custom header className
   */
  headerClassName?: string;

  /**
   * Custom content className
   */
  contentClassName?: string;

  /**
   * Custom footer className
   */
  footerClassName?: string;

  /**
   * Custom styles for the dialog
   */
  style?: React.CSSProperties;

  /**
   * Custom styles for the header
   */
  headerStyle?: React.CSSProperties;

  /**
   * Custom styles for the content
   */
  contentStyle?: React.CSSProperties;

  /**
   * Custom styles for the footer
   */
  footerStyle?: React.CSSProperties;

  /**
   * Description text below the title
   */
  description?: React.ReactNode;

  /**
   * Icon displayed before the title
   */
  icon?: React.ReactNode;

  /**
   * Icon color (for status dialogs)
   */
  iconColor?: string;

  /**
   * Footer alignment
   * @default 'right'
   */
  footerAlign?: 'left' | 'center' | 'right' | 'space-between';

  /**
   * Whether the dialog is fullscreen on mobile
   * @default false
   */
  fullscreenOnMobile?: boolean;

  /**
   * Z-index for the dialog overlay
   * @default 9999
   */
  zIndex?: number;

  /**
   * Border radius for the dialog
   */
  borderRadius?: string;

  /**
   * Callback fired when the dialog has finished opening animation
   */
  onAfterOpen?: () => void;

  /**
   * Callback fired when the dialog has finished closing animation
   */
  onAfterClose?: () => void;

  /**
   * Test ID for automated testing
   */
  'data-testid'?: string;

  /**
   * Accessible label for the dialog
   */
  'aria-label'?: string;

  /**
   * ID of element that describes the dialog
   */
  'aria-describedby'?: string;

  /**
   * Whether to trap focus within the dialog
   * @default true
   */
  trapFocus?: boolean;

  /**
   * Whether to restore focus to the trigger element on close
   * @default true
   */
  restoreFocus?: boolean;

  /**
   * Initial focus element selector within the dialog
   */
  initialFocus?: string;
}

const sizeClasses: Record<DialogSize, string> = {
  xs: 'max-w-xs',
  small: 'max-w-sm',
  medium: 'max-w-md',
  large: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-[95vw]',
};

const positionClasses: Record<DialogPosition, string> = {
  center: 'items-center',
  top: 'items-start pt-[10vh]',
  bottom: 'items-end pb-[10vh]',
};

const getAnimationClasses = (animation: DialogAnimation, isOpen: boolean): string => {
  const baseTransition = 'transform transition-all';
  
  switch (animation) {
    case 'fade':
      return `${baseTransition} ${isOpen ? 'opacity-100' : 'opacity-0'}`;
    case 'scale':
      return `${baseTransition} ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`;
    case 'slide-up':
      return `${baseTransition} ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`;
    case 'slide-down':
      return `${baseTransition} ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`;
    case 'none':
      return '';
    default:
      return `${baseTransition} ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`;
  }
};

const footerAlignClasses: Record<string, string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
  'space-between': 'justify-between',
};

/**
 * Enterprise-level Dialog Component
 * 
 * A fully customizable modal dialog component with comprehensive features:
 * - Multiple sizes (xs, small, medium, large, xl, full)
 * - Customizable animations (fade, scale, slide-up, slide-down, none)
 * - Flexible positioning (center, top, bottom)
 * - Backdrop customization
 * - Header with title, description, and icon support
 * - Footer with customizable alignment
 * - Keyboard navigation (Escape to close)
 * - Focus trapping for accessibility
 * - Scroll locking
 * - Mobile fullscreen support
 */
export const Dialog: React.FC<BeeDialogProps> = ({
  open,
  onClose,
  title,
  children,
  actions,
  size = 'medium',
  className = '',
  closeOnBackdropClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  closeIcon,
  position = 'center',
  animation = 'scale',
  animationDuration = 300,
  blurBackdrop = true,
  backdropColor,
  backdropClassName = '',
  preventScroll = true,
  maxHeight,
  minHeight,
  width,
  scrollable = true,
  contentPadding,
  showHeaderDivider = true,
  showFooterDivider = true,
  headerClassName = '',
  contentClassName = '',
  footerClassName = '',
  style,
  headerStyle,
  contentStyle,
  footerStyle,
  description,
  icon,
  iconColor,
  footerAlign = 'right',
  fullscreenOnMobile = false,
  zIndex = 9999,
  borderRadius,
  onAfterOpen,
  onAfterClose,
  'data-testid': dataTestId,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  trapFocus = true,
  restoreFocus = true,
  initialFocus,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const titleId = useRef(`dialog-title-${Math.random().toString(36).substr(2, 9)}`).current;
  const descriptionId = useRef(`dialog-desc-${Math.random().toString(36).substr(2, 9)}`).current;
  
  // Animation state - starts false to allow entrance animation
  const [isAnimatedIn, setIsAnimatedIn] = useState(false);

  // Handle animation on open
  useEffect(() => {
    if (open) {
      // Small delay to ensure the DOM is ready before starting animation
      const timer = requestAnimationFrame(() => {
        setIsAnimatedIn(true);
      });
      return () => cancelAnimationFrame(timer);
    } else {
      setIsAnimatedIn(false);
    }
  }, [open]);

  // Store the previously focused element
  useEffect(() => {
    if (open && restoreFocus) {
      previousActiveElement.current = document.activeElement as HTMLElement;
    }
  }, [open, restoreFocus]);

  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open && closeOnEscape) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscapeKey);
      if (preventScroll) {
        document.body.style.overflow = 'hidden';
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      if (preventScroll) {
        document.body.style.overflow = 'unset';
      }
    };
  }, [open, onClose, closeOnEscape, preventScroll]);

  // Focus management
  useEffect(() => {
    if (open && dialogRef.current) {
      // Set initial focus
      if (initialFocus) {
        const focusTarget = dialogRef.current.querySelector(initialFocus) as HTMLElement;
        if (focusTarget) {
          focusTarget.focus();
        } else {
          dialogRef.current.focus();
        }
      } else {
        dialogRef.current.focus();
      }

      // Trigger onAfterOpen callback
      const timer = setTimeout(() => {
        onAfterOpen?.();
      }, animationDuration);

      return () => clearTimeout(timer);
    }
  }, [open, initialFocus, animationDuration, onAfterOpen]);

  // Restore focus on close
  useEffect(() => {
    if (!open && previousActiveElement.current && restoreFocus) {
      const timer = setTimeout(() => {
        previousActiveElement.current?.focus();
        onAfterClose?.();
      }, animationDuration);

      return () => clearTimeout(timer);
    }
  }, [open, restoreFocus, animationDuration, onAfterClose]);

  // Focus trap
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (!trapFocus || event.key !== 'Tab') return;

    const focusableElements = dialogRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (!focusableElements || focusableElements.length === 0) return;

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }, [trapFocus]);

  // Handle backdrop click
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && closeOnBackdropClick) {
      onClose();
    }
  };

  if (!open) {
    return null;
  }

  const animationStyle = {
    transitionDuration: `${animationDuration}ms`,
  };

  const DefaultCloseIcon = () => (
    <svg
      className="w-5 h-5 text-gray-400 hover:text-white transition-colors"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  const dialogContent = (
    <div
      className={`fixed inset-0 flex justify-center p-4 transition-opacity ${positionClasses[position]} ${
        isAnimatedIn ? 'opacity-100' : 'opacity-0'
      } ${fullscreenOnMobile ? 'sm:p-4 p-0' : ''}`}
      style={{ zIndex, transitionDuration: `${animationDuration}ms` }}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={description ? descriptionId : ariaDescribedBy}
      aria-label={ariaLabel}
      data-testid={dataTestId}
    >
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 transition-opacity ${blurBackdrop ? 'backdrop-blur-sm' : ''} ${backdropClassName} ${
          isAnimatedIn ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ 
          backgroundColor: backdropColor || 'rgba(0, 0, 0, 0.5)',
          transitionDuration: `${animationDuration}ms`,
        }}
        aria-hidden="true"
      />
      
      {/* Dialog */}
      <div
        ref={dialogRef}
        className={`
          relative w-full ${width ? '' : sizeClasses[size]} bg-gray-900 text-white shadow-xl
          overflow-hidden border border-gray-700
          ${getAnimationClasses(animation, isAnimatedIn)}
          ${fullscreenOnMobile ? 'sm:rounded-lg sm:max-h-[90vh] max-h-full rounded-none' : 'rounded-lg max-h-[90vh]'}
          ${className}
        `}
        style={{
          ...animationStyle,
          width: width || undefined,
          maxHeight: maxHeight || (fullscreenOnMobile ? undefined : '90vh'),
          minHeight: minHeight || undefined,
          borderRadius: borderRadius || undefined,
          ...style,
        }}
        tabIndex={-1}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div 
            className={`flex items-start justify-between p-6 ${showHeaderDivider ? 'border-b border-gray-700' : ''} ${headerClassName}`}
            style={headerStyle}
          >
            <div className="flex items-start gap-3 flex-1 min-w-0">
              {icon && (
                <div 
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: iconColor }}
                >
                  {icon}
                </div>
              )}
              <div className="flex-1 min-w-0">
                {title && (
                  <h2 id={titleId} className="text-xl font-semibold text-white m-0 leading-tight">
                    {title}
                  </h2>
                )}
                {description && (
                  <p id={descriptionId} className="text-sm text-gray-400 mt-1 m-0 leading-relaxed">
                    {description}
                  </p>
                )}
              </div>
            </div>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="flex-shrink-0 p-1.5 rounded-full hover:bg-gray-800 transition-colors duration-200 cursor-pointer ml-4 -mr-1 -mt-1"
                aria-label="Close dialog"
                type="button"
              >
                {closeIcon || <DefaultCloseIcon />}
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div 
          className={`${title || showCloseButton ? '' : 'pt-6'} ${actions ? '' : 'pb-6'} ${scrollable ? 'overflow-y-auto' : ''} ${contentClassName}`}
          style={{
            padding: contentPadding || '1.5rem',
            maxHeight: scrollable && !maxHeight ? 'calc(90vh - 200px)' : undefined,
            ...contentStyle,
          }}
        >
          {children}
        </div>

        {/* Actions/Footer */}
        {actions && (
          <div 
            className={`flex items-center gap-3 p-6 ${showFooterDivider ? 'border-t border-gray-700' : ''} bg-gray-800/50 ${footerAlignClasses[footerAlign]} ${footerClassName}`}
            style={footerStyle}
          >
            {actions}
          </div>
        )}
      </div>
    </div>
  );

  // Use portal to render dialog at body level to avoid stacking context issues
  if (typeof document !== 'undefined') {
    return createPortal(dialogContent, document.body);
  }

  return dialogContent;
};

export default Dialog;