'use client';

import React, { useEffect, useState, useCallback, useRef, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import { AlertCircle } from '@/components/icons/status/AlertCircle';
import { CheckCircle } from '@/components/icons/status/CheckCircle';
import { Info } from '@/components/icons/status/Info';
import { XCircle } from '@/components/icons/status/XCircle';
import { X } from '@/components/icons/interface/X';

// ============================================================================
// Types & Interfaces
// ============================================================================

export type SnackbarType = 'success' | 'warning' | 'info' | 'error' | 'default';
export type SnackbarVariant = 'filled' | 'outline' | 'soft';
export type SnackbarPosition = 
  | 'top-left' 
  | 'top-center' 
  | 'top-right' 
  | 'bottom-left' 
  | 'bottom-center' 
  | 'bottom-right' 
  | 'center';
export type SnackbarSize = 'small' | 'default' | 'large';
export type SnackbarAnimation = 'slide' | 'fade' | 'zoom' | 'none';
export type ProgressType = 'circular' | 'linear' | 'none';
export type AriaLive = 'polite' | 'assertive' | 'off';

export interface SnackbarAction {
  label: string;
  onClick: () => void;
  variant?: 'text' | 'outlined' | 'filled';
}

export interface BeeSnackbarProps {
  /** Type of snackbar that determines color scheme and icon */
  type?: SnackbarType;
  /** Visual style variant of the snackbar */
  variant?: SnackbarVariant;
  /** Fixed positioning of the snackbar on screen */
  position?: SnackbarPosition;
  /** Size variant affecting padding and font size */
  size?: SnackbarSize;
  /** The main message to display */
  message?: string | React.ReactNode;
  /** Optional title/heading for the snackbar */
  title?: string;
  /** Callback fired when snackbar is closed */
  onClose?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Custom content to display instead of message prop */
  children?: React.ReactNode;
  /** Auto-close duration in milliseconds (0 = no auto-close) */
  duration?: number;
  /** Whether to show close button */
  closable?: boolean;
  /** Pause auto-close timer on hover */
  pauseOnHover?: boolean;
  /** Custom icon to display (pass null to hide icon) */
  icon?: React.ReactNode | null;
  /** Show/hide icon */
  showIcon?: boolean;
  /** Action button configuration */
  action?: SnackbarAction;
  /** Multiple action buttons */
  actions?: SnackbarAction[];
  /** Animation style */
  animation?: SnackbarAnimation;
  /** Progress indicator type */
  progressType?: ProgressType;
  /** Custom minimum width */
  minWidth?: string | number;
  /** Custom maximum width */
  maxWidth?: string | number;
  /** Custom z-index */
  zIndex?: number;
  /** Render snackbar in a portal (document.body) */
  portal?: boolean;
  /** ARIA live region setting for accessibility */
  ariaLive?: AriaLive;
  /** Custom background color (overrides type) */
  backgroundColor?: string;
  /** Custom text color (overrides type) */
  textColor?: string;
  /** Custom border color (for outline/soft variants) */
  borderColor?: string;
  /** Custom icon color */
  iconColor?: string;
  /** Border radius */
  borderRadius?: string | number;
  /** Box shadow */
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Whether the snackbar is open/visible */
  open?: boolean;
  /** Callback fired when animation completes (enter/exit) */
  onAnimationEnd?: (state: 'entered' | 'exited') => void;
  /** Data test ID for testing */
  'data-testid'?: string;
  /** Custom inline styles */
  style?: React.CSSProperties;
}

// ============================================================================
// Default Icon Map
// ============================================================================

const iconMap = {
  success: CheckCircle,
  warning: AlertCircle,
  info: Info,
  error: XCircle,
  default: Info,
} as const;

// ============================================================================
// Style Maps
// ============================================================================

const filledStyles = {
  success: 'bg-green-500 text-white',
  warning: 'bg-yellow-500 text-white',
  info: 'bg-blue-500 text-white',
  error: 'bg-red-500 text-white',
  default: 'bg-gray-700 text-white',
} as const;

const outlineStyles = {
  success: 'bg-transparent border-green-500 text-green-700 border-2',
  warning: 'bg-transparent border-yellow-500 text-yellow-700 border-2',
  info: 'bg-transparent border-blue-500 text-blue-700 border-2',
  error: 'bg-transparent border-red-500 text-red-700 border-2',
  default: 'bg-transparent border-gray-500 text-gray-700 border-2',
} as const;

const softStyles = {
  success: 'bg-green-100 text-green-800 border border-green-200',
  warning: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
  info: 'bg-blue-100 text-blue-800 border border-blue-200',
  error: 'bg-red-100 text-red-800 border border-red-200',
  default: 'bg-gray-100 text-gray-800 border border-gray-200',
} as const;

const positionStyles = {
  'top-left': 'fixed top-4 left-4',
  'top-center': 'fixed top-4 left-1/2 transform -translate-x-1/2',
  'top-right': 'fixed top-4 right-4',
  'bottom-left': 'fixed bottom-4 left-4',
  'bottom-center': 'fixed bottom-4 left-1/2 transform -translate-x-1/2',
  'bottom-right': 'fixed bottom-4 right-4',
  'center': 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
} as const;

const sizeStyles = {
  small: 'p-2 text-xs gap-2',
  default: 'p-4 text-sm gap-3',
  large: 'p-5 text-base gap-4',
} as const;

const iconSizes = {
  small: 'h-4 w-4',
  default: 'h-5 w-5',
  large: 'h-6 w-6',
} as const;

const shadowStyles = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
} as const;

const typeColors = {
  success: { main: '#10b981', light: '#d1fae5', dark: '#065f46' },
  warning: { main: '#f59e0b', light: '#fef3c7', dark: '#92400e' },
  info: { main: '#3b82f6', light: '#dbeafe', dark: '#1e40af' },
  error: { main: '#ef4444', light: '#fee2e2', dark: '#991b1b' },
  default: { main: '#6b7280', light: '#f3f4f6', dark: '#374151' },
} as const;

// Animation keyframes
const animationStyles = {
  slide: {
    'top-left': { enter: 'animate-slide-in-left', exit: 'animate-slide-out-left' },
    'top-center': { enter: 'animate-slide-in-top', exit: 'animate-slide-out-top' },
    'top-right': { enter: 'animate-slide-in-right', exit: 'animate-slide-out-right' },
    'bottom-left': { enter: 'animate-slide-in-left', exit: 'animate-slide-out-left' },
    'bottom-center': { enter: 'animate-slide-in-bottom', exit: 'animate-slide-out-bottom' },
    'bottom-right': { enter: 'animate-slide-in-right', exit: 'animate-slide-out-right' },
    'center': { enter: 'animate-zoom-in', exit: 'animate-zoom-out' },
  },
  fade: { enter: 'animate-fade-in', exit: 'animate-fade-out' },
  zoom: { enter: 'animate-zoom-in', exit: 'animate-zoom-out' },
  none: { enter: '', exit: '' },
};

// ============================================================================
// Animation CSS (injected once)
// ============================================================================

const animationCSS = `
@keyframes snackbar-slide-in-left {
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
@keyframes snackbar-slide-out-left {
  from { transform: translateX(0); opacity: 1; }
  to { transform: translateX(-100%); opacity: 0; }
}
@keyframes snackbar-slide-in-right {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
@keyframes snackbar-slide-out-right {
  from { transform: translateX(0); opacity: 1; }
  to { transform: translateX(100%); opacity: 0; }
}
@keyframes snackbar-slide-in-top {
  from { transform: translateX(-50%) translateY(-100%); opacity: 0; }
  to { transform: translateX(-50%) translateY(0); opacity: 1; }
}
@keyframes snackbar-slide-out-top {
  from { transform: translateX(-50%) translateY(0); opacity: 1; }
  to { transform: translateX(-50%) translateY(-100%); opacity: 0; }
}
@keyframes snackbar-slide-in-bottom {
  from { transform: translateX(-50%) translateY(100%); opacity: 0; }
  to { transform: translateX(-50%) translateY(0); opacity: 1; }
}
@keyframes snackbar-slide-out-bottom {
  from { transform: translateX(-50%) translateY(0); opacity: 1; }
  to { transform: translateX(-50%) translateY(100%); opacity: 0; }
}
@keyframes snackbar-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes snackbar-fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}
@keyframes snackbar-zoom-in {
  from { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
  to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
}
@keyframes snackbar-zoom-out {
  from { transform: translate(-50%, -50%) scale(1); opacity: 1; }
  to { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
}
.animate-slide-in-left { animation: snackbar-slide-in-left 0.3s ease-out forwards; }
.animate-slide-out-left { animation: snackbar-slide-out-left 0.3s ease-in forwards; }
.animate-slide-in-right { animation: snackbar-slide-in-right 0.3s ease-out forwards; }
.animate-slide-out-right { animation: snackbar-slide-out-right 0.3s ease-in forwards; }
.animate-slide-in-top { animation: snackbar-slide-in-top 0.3s ease-out forwards; }
.animate-slide-out-top { animation: snackbar-slide-out-top 0.3s ease-in forwards; }
.animate-slide-in-bottom { animation: snackbar-slide-in-bottom 0.3s ease-out forwards; }
.animate-slide-out-bottom { animation: snackbar-slide-out-bottom 0.3s ease-in forwards; }
.animate-fade-in { animation: snackbar-fade-in 0.3s ease-out forwards; }
.animate-fade-out { animation: snackbar-fade-out 0.3s ease-in forwards; }
.animate-zoom-in { animation: snackbar-zoom-in 0.3s ease-out forwards; }
.animate-zoom-out { animation: snackbar-zoom-out 0.3s ease-in forwards; }
`;

// Inject animation styles once
if (typeof window !== 'undefined') {
  const styleId = 'bee-snackbar-animations';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = animationCSS;
    document.head.appendChild(style);
  }
}

// ============================================================================
// Helper Functions
// ============================================================================

const formatWidth = (value: string | number | undefined): string | undefined => {
  if (value === undefined) return undefined;
  return typeof value === 'number' ? `${value}px` : value;
};

const formatBorderRadius = (value: string | number | undefined): string | undefined => {
  if (value === undefined) return undefined;
  return typeof value === 'number' ? `${value}px` : value;
};

// ============================================================================
// Action Button Component
// ============================================================================

interface ActionButtonProps {
  action: SnackbarAction;
  variant: SnackbarVariant;
  type: SnackbarType;
  size: SnackbarSize;
}

const ActionButton: React.FC<ActionButtonProps> = ({ action, variant, type, size }) => {
  const buttonSizes = {
    small: 'px-2 py-0.5 text-xs',
    default: 'px-3 py-1 text-xs',
    large: 'px-4 py-1.5 text-sm',
  };

  const colors = typeColors[type];
  const isFilled = variant === 'filled';
  
  const buttonVariants = {
    text: `bg-transparent ${isFilled ? 'text-white hover:bg-white/20' : `text-${type === 'default' ? 'gray' : type}-700 hover:bg-${type === 'default' ? 'gray' : type}-100`}`,
    outlined: `bg-transparent border ${isFilled ? 'border-white/50 text-white hover:bg-white/10' : `border-current`}`,
    filled: isFilled 
      ? 'bg-white/20 text-white hover:bg-white/30' 
      : `bg-${type === 'default' ? 'gray' : type}-500 text-white hover:opacity-90`,
  };

  return (
    <button
      onClick={action.onClick}
      className={`
        ${buttonSizes[size]}
        ${buttonVariants[action.variant || 'text']}
        rounded font-medium transition-all duration-200 cursor-pointer
        focus:outline-none focus:ring-2 focus:ring-offset-1
      `}
      style={{
        ...(action.variant === 'filled' && !isFilled && { backgroundColor: colors.main, color: 'white' }),
      }}
    >
      {action.label}
    </button>
  );
};

// ============================================================================
// Main Snackbar Component
// ============================================================================

export const BeeSnackbar: React.FC<BeeSnackbarProps> = ({
  type = 'default',
  variant = 'filled',
  position,
  size = 'default',
  message,
  title,
  onClose,
  className = '',
  children,
  duration = 4000,
  closable = true,
  pauseOnHover = true,
  icon,
  showIcon = true,
  action,
  actions,
  animation = 'slide',
  progressType = 'circular',
  minWidth = 300,
  maxWidth = 500,
  zIndex = 9999,
  portal = false,
  ariaLive = 'polite',
  backgroundColor,
  textColor,
  borderColor,
  iconColor,
  borderRadius,
  shadow = 'lg',
  open = true,
  onAnimationEnd,
  'data-testid': dataTestId,
  style,
}) => {
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(open);
  const [isExiting, setIsExiting] = useState(false);
  const startTimeRef = useRef<number>(Date.now());
  const remainingTimeRef = useRef<number>(duration);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Get variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'filled':
        return filledStyles[type];
      case 'outline':
        return outlineStyles[type];
      case 'soft':
        return softStyles[type];
      default:
        return filledStyles[type];
    }
  };

  const variantStyles = getVariantStyles();
  const positionClasses = position ? positionStyles[position] : '';
  const sizeClasses = sizeStyles[size];
  const shadowClass = shadowStyles[shadow];
  const colors = typeColors[type];

  // Get animation class
  const getAnimationClass = () => {
    if (animation === 'none') return '';
    
    const animConfig = animationStyles[animation];
    
    if (animation === 'slide' && position) {
      const slideConfig = animConfig as typeof animationStyles.slide;
      return isExiting ? slideConfig[position].exit : slideConfig[position].enter;
    }
    
    const simpleConfig = animConfig as { enter: string; exit: string };
    return isExiting ? simpleConfig.exit : simpleConfig.enter;
  };

  // Default icon component
  const DefaultIconComponent = iconMap[type];

  // Render icon
  const renderIcon = () => {
    if (!showIcon) return null;
    if (icon === null) return null;
    if (icon) return <div className={`flex-shrink-0 ${iconSizes[size]}`}>{icon}</div>;
    return (
      <div className="flex-shrink-0" style={{ color: iconColor }}>
        <DefaultIconComponent className={iconSizes[size]} />
      </div>
    );
  };

  // Handle close with animation
  const handleClose = useCallback(() => {
    if (animation !== 'none') {
      setIsExiting(true);
      setTimeout(() => {
        setIsVisible(false);
        onAnimationEnd?.('exited');
        onClose?.();
      }, 300); // Match animation duration
    } else {
      setIsVisible(false);
      onClose?.();
    }
  }, [animation, onClose, onAnimationEnd]);

  // Timer effect
  useEffect(() => {
    if (!open) {
      handleClose();
      return;
    }
    
    setIsVisible(true);
    setIsExiting(false);
    onAnimationEnd?.('entered');
  }, [open]);

  // Auto-close timer with pause support
  useEffect(() => {
    if (duration === 0 || !isVisible || isExiting) return;

    const tick = () => {
      if (isPaused) return;
      
      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(newProgress);
      
      if (elapsed >= duration) {
        handleClose();
      }
    };

    timerRef.current = setInterval(tick, 50);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [duration, isPaused, isVisible, isExiting, handleClose]);

  // Handle pause/resume
  const handleMouseEnter = () => {
    if (pauseOnHover && duration > 0) {
      setIsPaused(true);
      remainingTimeRef.current = (progress / 100) * duration;
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover && duration > 0) {
      setIsPaused(false);
      startTimeRef.current = Date.now() - ((100 - progress) / 100) * duration;
    }
  };

  // Don't render if not visible
  if (!isVisible) return null;

  // Combine all actions
  const allActions = [...(action ? [action] : []), ...(actions || [])];

  // Build inline styles
  const inlineStyles: React.CSSProperties = {
    ...(position && { position: 'fixed' as const }),
    minWidth: formatWidth(minWidth),
    maxWidth: formatWidth(maxWidth),
    zIndex,
    borderRadius: formatBorderRadius(borderRadius),
    ...(backgroundColor && { backgroundColor }),
    ...(textColor && { color: textColor }),
    ...(borderColor && variant !== 'filled' && { borderColor }),
    ...style,
  };

  // Render progress indicator
  const renderProgress = () => {
    if (duration === 0 || progressType === 'none') return null;

    if (progressType === 'linear') {
      return (
        <div 
          className="absolute bottom-0 left-0 right-0 h-1 bg-black/10 overflow-hidden rounded-b-lg"
          style={{ borderRadius: `0 0 ${formatBorderRadius(borderRadius) || '0.5rem'} ${formatBorderRadius(borderRadius) || '0.5rem'}` }}
        >
          <div
            className="h-full transition-all duration-75 ease-linear"
            style={{
              width: `${progress}%`,
              backgroundColor: variant === 'filled' ? 'rgba(255,255,255,0.5)' : colors.main,
            }}
          />
        </div>
      );
    }

    return null;
  };

  // Render circular progress on close button
  const renderCloseButton = () => {
    if (!closable) return null;

    const showCircularProgress = progressType === 'circular' && duration > 0;

    return (
      <button
        onClick={handleClose}
        className={`
          flex-shrink-0 relative rounded-full transition-colors duration-200 cursor-pointer
          ${variant === 'filled' 
            ? 'hover:bg-white hover:bg-opacity-20' 
            : 'hover:bg-gray-100'
          }
          ${showCircularProgress ? 'p-1' : 'p-1'}
        `}
        aria-label="Close snackbar"
      >
        {showCircularProgress && (
          <svg
            className="absolute inset-0 w-6 h-6 transform -rotate-90"
            viewBox="0 0 24 24"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke={variant === 'filled' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.1)'}
              strokeWidth="2"
            />
            <circle
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke={variant === 'filled' ? 'rgba(255,255,255,0.8)' : colors.main}
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="62.83"
              strokeDashoffset={62.83 - (progress / 100) * 62.83}
              className="transition-all duration-75 ease-linear"
            />
          </svg>
        )}
        <X className={`${size === 'small' ? 'h-3 w-3' : size === 'large' ? 'h-5 w-5' : 'h-4 w-4'} relative z-10`} />
      </button>
    );
  };

  const snackbarContent = (
    <div
      className={`
        ${positionClasses}
        ${variantStyles}
        ${sizeClasses}
        ${shadowClass}
        ${getAnimationClass()}
        flex items-start rounded-lg relative overflow-hidden
        ${className}
      `}
      style={inlineStyles}
      role="alert"
      aria-live={ariaLive}
      aria-atomic="true"
      data-testid={dataTestId}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Left Icon */}
      {renderIcon()}

      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && (
          <div className={`font-semibold ${size === 'small' ? 'text-xs' : size === 'large' ? 'text-base' : 'text-sm'} mb-1`}>
            {title}
          </div>
        )}
        {children ? (
          children
        ) : (
          <div className={`font-medium ${title ? 'font-normal opacity-90' : ''}`}>
            {message}
          </div>
        )}
        
        {/* Action buttons */}
        {allActions.length > 0 && (
          <div className="flex gap-2 mt-2">
            {allActions.map((act, index) => (
              <ActionButton
                key={index}
                action={act}
                variant={variant}
                type={type}
                size={size}
              />
            ))}
          </div>
        )}
      </div>

      {/* Close Button */}
      {renderCloseButton()}

      {/* Linear Progress */}
      {renderProgress()}
    </div>
  );

  // Portal rendering
  if (portal && typeof document !== 'undefined') {
    return createPortal(snackbarContent, document.body);
  }

  return snackbarContent;
};

// ============================================================================
// Snackbar Provider Context (for managing multiple snackbars)
// ============================================================================

interface SnackbarItem extends Omit<BeeSnackbarProps, 'open'> {
  id: string;
}

interface SnackbarContextValue {
  show: (props: Omit<BeeSnackbarProps, 'open'>) => string;
  close: (id: string) => void;
  closeAll: () => void;
}

const SnackbarContext = createContext<SnackbarContextValue | null>(null);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

export interface SnackbarProviderProps {
  children: React.ReactNode;
  /** Maximum number of snackbars to show at once */
  maxSnackbars?: number;
  /** Default position for all snackbars */
  defaultPosition?: SnackbarPosition;
  /** Spacing between stacked snackbars */
  spacing?: number;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
  maxSnackbars = 5,
  defaultPosition = 'bottom-right',
  spacing = 8,
}) => {
  const [snackbars, setSnackbars] = useState<SnackbarItem[]>([]);

  const show = useCallback((props: Omit<BeeSnackbarProps, 'open'>) => {
    const id = `snackbar-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    setSnackbars(prev => {
      const newSnackbars = [...prev, { ...props, id }];
      // Limit to maxSnackbars
      if (newSnackbars.length > maxSnackbars) {
        return newSnackbars.slice(-maxSnackbars);
      }
      return newSnackbars;
    });

    return id;
  }, [maxSnackbars]);

  const close = useCallback((id: string) => {
    setSnackbars(prev => prev.filter(s => s.id !== id));
  }, []);

  const closeAll = useCallback(() => {
    setSnackbars([]);
  }, []);

  // Calculate offset for stacking
  const getStackOffset = (index: number, position: SnackbarPosition) => {
    const offset = index * (72 + spacing); // Approximate snackbar height + spacing
    
    if (position.includes('top')) {
      return { top: `${16 + offset}px` };
    }
    if (position.includes('bottom')) {
      return { bottom: `${16 + offset}px` };
    }
    return {};
  };

  return (
    <SnackbarContext.Provider value={{ show, close, closeAll }}>
      {children}
      {typeof document !== 'undefined' && createPortal(
        <>
          {snackbars.map((snackbar, index) => {
            const pos = snackbar.position || defaultPosition;
            return (
              <BeeSnackbar
                key={snackbar.id}
                {...snackbar}
                position={pos}
                portal={false}
                open={true}
                onClose={() => {
                  snackbar.onClose?.();
                  close(snackbar.id);
                }}
                style={{
                  ...snackbar.style,
                  ...getStackOffset(snackbars.length - 1 - index, pos),
                }}
              />
            );
          })}
        </>,
        document.body
      )}
    </SnackbarContext.Provider>
  );
};

// ============================================================================
// Convenience functions for common snackbar types
// ============================================================================

export const createSnackbarHelpers = (show: SnackbarContextValue['show']) => ({
  success: (message: string, options?: Partial<BeeSnackbarProps>) => 
    show({ type: 'success', message, variant: 'filled', ...options }),
  error: (message: string, options?: Partial<BeeSnackbarProps>) => 
    show({ type: 'error', message, variant: 'filled', ...options }),
  warning: (message: string, options?: Partial<BeeSnackbarProps>) => 
    show({ type: 'warning', message, variant: 'filled', ...options }),
  info: (message: string, options?: Partial<BeeSnackbarProps>) => 
    show({ type: 'info', message, variant: 'filled', ...options }),
});

export default BeeSnackbar;