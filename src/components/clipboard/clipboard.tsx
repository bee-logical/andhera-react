import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  forwardRef,
} from 'react';
import {
  ClipboardOutline,
  ClipboardStack,
  ClipboardCheck,
  ClipboardError,
  ClipboardLoading,
} from '../icons/clipboard';

// ---- Types ----

export type ClipboardSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ClipboardVariant =
  | 'icon' // icon + background (default)
  | 'iconOnly' // icon only, square, tighter
  | 'withText' // icon + label
  | 'textOnly' // label only
  | 'input' // input-like container + copy button
  | 'inline' // inline ghost link-style
  | 'toolbar' // small icon button for toolbars
  | 'floating'; // circular FAB-like

export type DefaultIconVariant = 'outline-rect' | 'stack-rect';

export type ClipboardTone = 'solid' | 'soft' | 'outline' | 'ghost';

export type ClipboardColorScheme = 'neutral' | 'primary' | 'success' | 'danger' | 'gold';

export type ClipboardCopyStrategy = 'auto' | 'clipboard' | 'execCommand';

export interface ClipboardProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** The text content to be copied to the clipboard. */
  textToCopy?: string;
  /** Optional CSS selector; if provided, inner text/value of the target will be copied when textToCopy is not given. */
  copyTarget?: string;
  /** Optional ref to a DOM element; text/value from this element will be copied when textToCopy is not given. */
  copyRef?: React.RefObject<HTMLElement>;

  /** Visual style variant. Defaults to 'icon'. */
  variant?: ClipboardVariant;
  /** The size of the button. Defaults to 'md'. */
  size?: ClipboardSize;

  /** Tone of the button. Defaults to 'solid'. */
  tone?: ClipboardTone;
  /** Color scheme variant. Defaults to 'neutral'. */
  colorScheme?: ClipboardColorScheme;

  /** Border radius option. Defaults to 'md'. */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Shadow option. Defaults to 'none'. */
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  /** Show border or not. Defaults to true for most variants. */
  bordered?: boolean;

  /** Disable showing success check icon. Icon becomes green instead. */
  noSuccessIcon?: boolean;

  /** Tailwind class (or classes) to apply to the icon on success when `noSuccessIcon` is true. */
  successIconColor?: string;

  /**
   * Optional prop to select a default icon variant.
   * 'outline-rect' is the old icon, 'stack-rect' is the new icon.
   */
  copyIconVariant?: DefaultIconVariant;

  /** Optional custom icon to show in the default state. Overrides `copyIconVariant`. */
  copyIcon?: React.ReactNode;
  /** Optional custom icon to show in the 'copied' success state (when `noSuccessIcon` is false). */
  copiedIcon?: React.ReactNode;
  /** Optional custom icon to show in the 'loading' state. */
  loadingIcon?: React.ReactNode;
  /** Optional custom icon to show in the 'error' state. */
  errorIcon?: React.ReactNode;

  /** Text to show next to the icon when variant is 'withText'. Defaults to "Copy". */
  copyText?: string;
  /** Text to show when variant is 'withText' in success state. Defaults to "Copied!". */
  copiedText?: string;
  /** Text to show when copying is in progress. */
  loadingText?: string;
  /** Text to show when an error occurs. */
  errorText?: string;

  /** Duration in milliseconds to show the success state. Defaults to 2000ms. */
  resetDuration?: number;
  /** Disable automatic reset of 'copied' / 'error' state. */
  disableTimeout?: boolean;

  /** Custom class for the specific copy button inside the input variant. */
  inputButtonClassName?: string;
  /** Custom class for outer wrapper (useful for 'input' variant). */
  wrapperClassName?: string;
  /** Custom class for the icon span. */
  iconClassName?: string;
  /** Custom class for text span. */
  textClassName?: string;
  /** Custom class applied when in success state. */
  successClassName?: string;
  /** Custom class applied when in error state. */
  errorClassName?: string;

  /** Controlled copied state. If provided, component becomes controlled for this flag. */
  isCopied?: boolean;
  /** Controlled loading state. */
  isLoading?: boolean;
  /** Controlled error state. */
  isError?: boolean;
  /** Fired when copied state changes (uncontrolled or controlled usage). */
  onCopiedChange?: (value: boolean) => void;

  /** Clipboard operation lifecycle callbacks. */
  onCopyStart?: () => void;
  onCopySuccess?: () => void;
  onCopyError?: (error: unknown) => void;
  onReset?: () => void;

  /** Choose clipboard strategy. Defaults to 'auto'. */
  copyStrategy?: ClipboardCopyStrategy;

  /** Announce copied state to screen readers with aria-live. Defaults to true. */
  announceCopied?: boolean;
  /** Custom aria-label when ready to copy. Overrides default message. */
  ariaLabelCopy?: string;
  /** Custom aria-label when copied. Overrides default message. */
  ariaLabelCopied?: string;
}

// --- Default Copy Icons ---
const DefaultCopyIcon1 = () => <ClipboardOutline className="w-full h-full" />;

const DefaultCopyIcon2 = () => <ClipboardStack className="w-full h-full" />;

const DefaultCheckIcon: React.FC<{ colorScheme?: ClipboardColorScheme; className?: string }> = ({
  colorScheme = 'neutral',
  className,
}) => (
  <ClipboardCheck
    className={joinClasses("w-full h-full", clipboardTheme[colorScheme].success, className)}
    strokeWidth={3}
  />
);

const DefaultErrorIcon = () => (
  <ClipboardError className="w-full h-full text-red-500" strokeWidth={2.5} />
);

const DefaultLoadingIcon = () => (
  <ClipboardLoading className="w-full h-full animate-spin" />
);

// ---- Helpers ----

const sizeClasses: Record<
  ClipboardSize,
  { button: string; icon: string; text: string; inputHeight: string }
> = {
  xs: {
    button: 'px-1.5 py-1 text-[11px] gap-1',
    icon: 'w-3.5 h-3.5',
    text: 'text-[11px] font-medium',
    inputHeight: 'h-7 text-xs',
  },
  sm: {
    button: 'p-1.5 gap-1.5',
    icon: 'w-4 h-4',
    text: 'text-xs font-medium',
    inputHeight: 'h-8 text-xs',
  },
  md: {
    button: 'p-2 gap-2',
    icon: 'w-5 h-5',
    text: 'text-sm font-medium',
    inputHeight: 'h-10 text-sm',
  },
  lg: {
    button: 'p-2.5 gap-2.5',
    icon: 'w-6 h-6',
    text: 'text-base font-medium',
    inputHeight: 'h-12 text-base',
  },
  xl: {
    button: 'p-3 gap-3',
    icon: 'w-7 h-7',
    text: 'text-lg font-semibold',
    inputHeight: 'h-14 text-lg',
  },
};

const roundedMap: Record<
  NonNullable<ClipboardProps["rounded"]>,
  string
> = {
  none: "rounded-none",        // 0px
  sm: "rounded-[4px]",         // custom 4px
  md: "rounded-[8px]",         // custom 8px
  lg: "rounded-[12px]",        // custom 12px
  xl: "rounded-[14px]",        // custom 20px
  full: "rounded-[45px]",        // pill or circle
};


const shadowMap = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
} as const;

function joinClasses(...classes: Array<string | undefined | false>): string {
  return classes.filter(Boolean).join(' ');
}

// Basic tone/color scheme mapping for zinc dark theme
// ----- FULL COLOR SCHEME THEME MAP (Icon + Text + Border + Background + Hover + Success + Error) -----

export const clipboardTheme = {
  neutral: {
    icon: 'text-zinc-400',
    iconHover: 'text-zinc-200',
    text: 'text-zinc-300',
    border: 'border-zinc-700',
    bg: 'bg-zinc-900',
    bgHover: 'hover:bg-zinc-800',
    bgSoft: 'bg-zinc-800/30',
    bgSoftHover: 'hover:bg-zinc-800/50',
    bgGhostHover: 'hover:bg-zinc-800/40',
    success: 'text-green-500',
    error: 'text-red-500',
  },

  primary: {
    icon: 'text-blue-400',
    iconHover: 'text-blue-200',
    text: 'text-blue-300',
    border: 'border-blue-700',
    bg: 'bg-blue-900',
    bgHover: 'hover:bg-blue-800',
    bgSoft: 'bg-blue-800/30',
    bgSoftHover: 'hover:bg-blue-800/50',
    bgGhostHover: 'hover:bg-blue-800/40',
    success: 'text-blue-500',
    error: 'text-red-500',
  },

  success: {
    icon: 'text-green-400',
    iconHover: 'text-green-200',
    text: 'text-green-300',
    border: 'border-green-700',
    bg: 'bg-green-900',
    bgHover: 'hover:bg-green-800',
    bgSoft: 'bg-green-800/30',
    bgSoftHover: 'hover:bg-green-800/50',
    bgGhostHover: 'hover:bg-green-800/40',
    success: 'text-green-500',
    error: 'text-red-500',
  },

  danger: {
    icon: 'text-red-400',
    iconHover: 'text-red-200',
    text: 'text-red-300',
    border: 'border-red-700',
    bg: 'bg-red-900',
    bgHover: 'hover:bg-red-800',
    bgSoft: 'bg-red-800/30',
    bgSoftHover: 'hover:bg-red-800/50',
    bgGhostHover: 'hover:bg-red-800/40',
    success: 'text-red-500',
    error: 'text-red-300',
  },
  gold: {
    icon: 'text-[#ffcb00]',
    iconHover: 'text-[#ffd633]', 
    text: 'text-[#ffcb00]',
    border: 'border-[#ffcb00]/50',
    bg: 'bg-[#ffcb00]/10',
    bgHover: 'hover:bg-[#ffcb00]/20',
    bgSoft: 'bg-[#ffcb00]/15',
    bgSoftHover: 'hover:bg-[#ffcb00]/25',
    bgGhostHover: 'hover:bg-[#ffcb00]/20',
    success: 'text-[#ffcb00]',
    error: 'text-red-500',
  },

} as const;


// ----- Button Tone / Background System -----
function getToneClasses(
  tone: ClipboardTone,
  colorScheme: ClipboardColorScheme,
  state: 'idle' | 'hover' | 'active' | 'copied' | 'error' | 'loading',
  bordered: boolean = true
): string {
  const theme = clipboardTheme[colorScheme];

  // Border class: only apply if bordered is true
  const borderClass = bordered ? theme.border : 'border-transparent';

  const toneMap = {
    solid: `
      ${theme.bg}
      ${borderClass}
      ${theme.text}
      ${theme.bgHover}
    `,

    soft: `
      ${theme.bgSoft}
      ${theme.text}
      ${borderClass}
      ${theme.bgSoftHover}
    `,

    outline: `
      bg-transparent
      ${theme.text}
      ${borderClass}
      ${theme.bgHover}
    `,

    ghost: `
      bg-transparent
      ${theme.text}
      border-transparent
      ${theme.bgGhostHover}
    `,
  };

  if (state === 'copied') {
    return `${theme.success} bg-transparent border-transparent`;
  }

  if (state === 'error') {
    return `${theme.error} bg-transparent border-transparent`;
  }

  return toneMap[tone];
}




// ---- Component ----

export const Clipboard = forwardRef<HTMLButtonElement, ClipboardProps>(
  (
    {
      textToCopy,
      copyTarget,
      copyRef,

      variant = 'icon',
      size = 'md',

      tone = 'solid',
      colorScheme = 'neutral',

      rounded = 'md',
      shadow = 'none',
      bordered = true,

      copyIconVariant = 'outline-rect',
      copyIcon,
      copiedIcon,
      loadingIcon,
      errorIcon,
      noSuccessIcon,
      successIconColor = 'text-green-500',

      copyText = 'Copy',
      copiedText = 'Copied!',
      loadingText = 'Copying…',
      errorText = 'Failed',

      resetDuration = 2000,
      disableTimeout = false,

      inputButtonClassName = '',
      wrapperClassName = '',
      iconClassName = '',
      textClassName = '',
      successClassName = '',
      errorClassName = '',

      isCopied,
      isLoading,
      isError,
      onCopiedChange,

      onCopyStart,
      onCopySuccess,
      onCopyError,
      onReset,

      copyStrategy = 'auto',

      announceCopied = true,
      ariaLabelCopy,
      ariaLabelCopied,

      className = '',
      onClick,
      ...buttonProps
    },
    ref
  ) => {
    const [internalCopied, setInternalCopied] = useState(false);
    const [internalLoading, setInternalLoading] = useState(false);
    const [internalError, setInternalError] = useState(false);

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const currentSize = sizeClasses[size] || sizeClasses.md;

    const effectiveCopied = typeof isCopied === 'boolean' ? isCopied : internalCopied;
    const effectiveLoading =
      typeof isLoading === 'boolean' ? isLoading : internalLoading;
    const effectiveError = typeof isError === 'boolean' ? isError : internalError;

    const setCopied = (value: boolean) => {
      if (typeof isCopied !== 'boolean') {
        setInternalCopied(value);
      }
      onCopiedChange?.(value);
    };

    const setLoading = (value: boolean) => {
      if (typeof isLoading !== 'boolean') {
        setInternalLoading(value);
      }
    };

    const setError = (value: boolean) => {
      if (typeof isError !== 'boolean') {
        setInternalError(value);
      }
    };

    // Automatically disable success icon for these variants unless explicitly overridden
    const autoNoSuccessIcon =
      noSuccessIcon ?? (variant === 'iconOnly' || variant === 'input');

    const clearTimers = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    const resetStates = useCallback(() => {
      clearTimers();
      const hadState = effectiveCopied || effectiveError;
      setCopied(false);
      setError(false);
      if (hadState) {
        onReset?.();
      }
    }, [effectiveCopied, effectiveError, onReset]);

    useEffect(() => {
      return () => {
        clearTimers();
      };
    }, []);

    const getDefaultCopyIcon = (): React.ReactNode => {
      if (copyIconVariant === 'outline-rect') return <DefaultCopyIcon1 />;
      return <DefaultCopyIcon2 />;
    };

    const resolveCopySource = (): string | null => {
      if (textToCopy != null && textToCopy !== '') {
        return textToCopy;
      }

      if (copyRef && copyRef.current) {
        const el = copyRef.current as any;
        if (typeof el.value === 'string') return el.value;
        if (typeof el.textContent === 'string') return el.textContent;
      }

      if (copyTarget && typeof document !== 'undefined') {
        const target = document.querySelector(copyTarget) as any;
        if (target) {
          if (typeof target.value === 'string') return target.value;
          if (typeof target.textContent === 'string') return target.textContent;
        }
      }

      return null;
    };

    const performCopy = async (value: string) => {
      const canUseClipboardApi =
        typeof navigator !== 'undefined' && !!navigator.clipboard;

      // Decide strategy
      const useClipboard =
        copyStrategy === 'clipboard' ||
        (copyStrategy === 'auto' && canUseClipboardApi);

      if (useClipboard && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(value);
        return;
      }

      if (copyStrategy === 'execCommand' || copyStrategy === 'auto') {
        // Fallback using execCommand
        const textarea = document.createElement('textarea');
        textarea.value = value;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand('copy');
        } finally {
          document.body.removeChild(textarea);
        }
        return;
      }

      throw new Error('No available clipboard strategy.');
    };

    const handleCopy = useCallback(
      async (e: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(e);
        if (e.defaultPrevented) return;

        const source = resolveCopySource();
        if (!source) {
          console.warn('[Clipboard] No textToCopy or valid copy target provided.');
          return;
        }

        resetStates();
        onCopyStart?.();
        setError(false);
        setLoading(true);

        try {
          await performCopy(source);
          setLoading(false);
          setCopied(true);
          onCopySuccess?.();

          if (!disableTimeout && resetDuration > 0) {
            timeoutRef.current = setTimeout(() => {
              setCopied(false);
              setError(false);
              onReset?.();
            }, resetDuration);
          }
        } catch (err) {
          console.error('[Clipboard] Failed to copy text: ', err);
          setLoading(false);
          setError(true);
          onCopyError?.(err);

          if (!disableTimeout && resetDuration > 0) {
            timeoutRef.current = setTimeout(() => {
              setError(false);
              onReset?.();
            }, resetDuration);
          }
        }
      },
      [
        onClick,
        resolveCopySource,
        resetStates,
        onCopyStart,
        onCopySuccess,
        onCopyError,
        disableTimeout,
        resetDuration,
      ]
    );

    const stateForTone: 'idle' | 'hover' | 'active' | 'copied' | 'error' | 'loading' =
      effectiveError
        ? 'error'
        : effectiveCopied
        ? 'copied'
        : effectiveLoading
        ? 'loading'
        : 'idle';

    const baseToneClasses = getToneClasses(tone, colorScheme, stateForTone, bordered);

    const baseButtonClasses =
      'group inline-flex items-center justify-center transition-all duration-200 ease-in-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

    const variantAdjustments: Record<ClipboardVariant, string> = {
      icon: '',
      iconOnly: 'aspect-square !px-0',
      withText: '',
      textOnly: '!gap-0 bg-transparent border-transparent hover:bg-zinc-900/50',
      input: '', // handled separately in render
      inline:
        'bg-transparent border-transparent px-0 py-0 text-xs font-medium underline-offset-4 hover:underline',
      toolbar:
        'h-8 w-8 p-1.5 rounded-md text-zinc-400 bg-zinc-900 border-zinc-700 hover:bg-zinc-800',
      floating:
        'rounded-full shadow-md h-10 w-10 md:h-11 md:w-11 p-0 bg-zinc-900 text-zinc-100 border-zinc-700 hover:bg-zinc-800',
    };

    const iconToRender: React.ReactNode = (() => {
      const currentCopyIcon = copyIcon || getDefaultCopyIcon();

      if (effectiveLoading) {
        return loadingIcon || <DefaultLoadingIcon />;
      }
      if (effectiveError) {
        return errorIcon || <DefaultErrorIcon />;
      }

      if (effectiveCopied && !autoNoSuccessIcon) {
        return copiedIcon || <DefaultCheckIcon colorScheme={colorScheme} />;
      }
      if (effectiveCopied && !autoNoSuccessIcon) {
        return copiedIcon || <DefaultCheckIcon />;
      }

      return currentCopyIcon;
    })();

    const textToRender = (() => {
      if (effectiveLoading) return loadingText ?? copyText;
      if (effectiveError) return errorText ?? copyText;
      if (effectiveCopied) return copiedText;
      return copyText;
    })();

    const isTextVariant =
      variant === 'withText' || variant === 'textOnly' || variant === 'inline';

    const ariaLabel = (() => {
      if (effectiveLoading) return loadingText || 'Copying to clipboard';
      if (effectiveError) return errorText || 'Failed to copy';
      if (effectiveCopied) return ariaLabelCopied || copiedText;
      if (ariaLabelCopy) return ariaLabelCopy;
      const base = textToCopy || 'content';
      return `Copy ${base} to clipboard`;
    })();

    const radiusClass = roundedMap[rounded] ?? roundedMap.md;
    const shadowClass = shadowMap[shadow] ?? '';

    // --- INPUT VARIANT RENDER ---
    if (variant === 'input') {
      const inputIconNode = iconToRender;

      const inputButtonToneClasses = joinClasses(
        'bg-transparent !border-none shadow-none !ring-0 !outline-none',
        effectiveError && 'text-red-500',
        !effectiveCopied && !effectiveError && !effectiveLoading &&
          effectiveError
  ? clipboardTheme[colorScheme].error
  : effectiveCopied
  ? clipboardTheme[colorScheme].success
  : clipboardTheme[colorScheme].icon,

!effectiveCopied &&
  !effectiveError &&
  !effectiveLoading &&
  `group-hover:${clipboardTheme[colorScheme].iconHover.replace("text-", "")}`,

      );

      return (
        <div
          className={joinClasses(
            'relative w-full flex items-center justify-between bg-zinc-900 border border-zinc-700 pl-4 pr-1.5 overflow-hidden',
            radiusClass,
            currentSize.inputHeight,
            wrapperClassName
          )}
        >
          <span className="truncate text-zinc-400 font-mono mr-3 select-all">
            {textToCopy ?? ''}
          </span>

          <button
            ref={ref}
            type="button"
            onClick={handleCopy}
            aria-label={ariaLabel}
            className={joinClasses(
              baseButtonClasses,
              currentSize.button,   
              '!border-none bg-transparent shadow-none !ring-0 !outline-none',
              inputButtonToneClasses,
              inputButtonClassName  
            )}
            {...buttonProps}
          >
            <span
  className={joinClasses(
    currentSize.icon,
    'transition-transform duration-200',

    effectiveLoading && 'animate-pulse',

    // Full color-scheme support for icons:
    effectiveError
      ? clipboardTheme[colorScheme].error
      : effectiveCopied
      ? clipboardTheme[colorScheme].success
      : clipboardTheme[colorScheme].icon,

    // Hover color (only idle state)
    !effectiveCopied &&
      !effectiveError &&
      !effectiveLoading &&
      `group-hover:${clipboardTheme[colorScheme].iconHover.replace('text-', '')}`,

    iconClassName
  )}
>
  {iconToRender}
</span>


            {announceCopied && (
              <span className="sr-only" aria-live="polite">
                {effectiveError
                  ? errorText || 'Copy failed'
                  : effectiveCopied
                  ? copiedText || 'Copied'
                  : ''}
              </span>
            )}
          </button>
        </div>
      );
    }

    // --- STANDARD BUTTON RENDER ---

const resolvedClasses = joinClasses(
  baseButtonClasses,
  // Add focus ring only for variants that need it (not iconOnly or input)
  // The 'input' variant is handled above and returns early, so checking for it here is redundant.
  variant !== 'iconOnly' && 'focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 focus:ring-offset-zinc-950',
  currentSize.button,
  // Add default border for all variants except iconOnly
  variant !== 'iconOnly' && 'border',
  variant === 'iconOnly' ? '' : baseToneClasses, // iconOnly: skip tone classes entirely (bordered is handled inside getToneClasses)
  radiusClass,
  shadowClass,
  variantAdjustments[variant],

  // --- ICON ONLY FIX: pure icon button, no borders ever ---
variant === 'iconOnly' &&
  joinClasses(
    '!border-none !outline-none !ring-0 bg-transparent',
    clipboardTheme[colorScheme].icon,
    `hover:${clipboardTheme[colorScheme].iconHover}`
  ),


  // --- INPUT FIX (already handled separately) ---

  // remove border on copied for noSuccessIcon behavior (ONLY for iconOnly variant; input handled earlier)
  (variant === 'iconOnly' && effectiveCopied && autoNoSuccessIcon) &&
    'border-transparent bg-transparent',

  effectiveCopied && successClassName,
  effectiveError && errorClassName,
  className
);



    const showIcon = variant !== 'textOnly';

    const showTextLabel =
      variant === 'withText' || variant === 'textOnly' || variant === 'inline';

    return (
      <>
        <button
          ref={ref}
          type="button"
          onClick={handleCopy}
          className={resolvedClasses}
          aria-label={ariaLabel}
          {...buttonProps}
        >
          {showIcon && (
            <span
              className={joinClasses(
                currentSize.icon,
                'transition-transform duration-200',
                effectiveLoading
                  ? 'animate-pulse'
                  : effectiveCopied
                  ? 'scale-110'
                  : 'group-hover:scale-105',
                autoNoSuccessIcon && effectiveCopied && successIconColor,
                iconClassName
              )}
            >
              {iconToRender}
            </span>
          )}

          {showTextLabel && (
           <span
  className={joinClasses(
    currentSize.text,

    effectiveError
      ? clipboardTheme[colorScheme].error
      : effectiveCopied
      ? clipboardTheme[colorScheme].success
      : clipboardTheme[colorScheme].text,

    textClassName
  )}
>
  {textToRender}
</span>

          )}
        </button>

        {announceCopied && (
          <span className="sr-only" aria-live="polite">
            {effectiveError
              ? errorText || 'Copy failed'
              : effectiveCopied
              ? copiedText || 'Copied'
              : ''}
          </span>
        )}
      </>
    );
  }
);

Clipboard.displayName = 'Clipboard';
