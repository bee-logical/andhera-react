import React, { forwardRef } from "react";
import "./skeleton.css";

// Simple clsx-style helper
const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

/**
 * Available skeleton shape variants
 */
export type SkeletonVariant = "text" | "circle" | "rect";

/**
 * Animation type for skeleton
 */
export type SkeletonAnimation = "shimmer" | "pulse" | "wave" | "none";

/**
 * Props for the Skeleton component
 */
export type SkeletonProps = {
  /** Shape variant of the skeleton: "text" (default), "rect", or "circle" */
  variant?: SkeletonVariant;
  /** Width - accepts pixels (number) or CSS units (string) e.g. "100%" or 48 */
  width?: string | number;
  /** Height - accepts pixels (number) or CSS units (string) e.g. 16 or "2rem" */
  height?: string | number;
  /** Border radius override - accepts pixels (number) or CSS units (string) */
  radius?: string | number;
  /** Enable/disable animation. Default: true */
  animated?: boolean;
  /** Animation type: "shimmer" (default), "pulse", "wave", or "none" */
  animation?: SkeletonAnimation;
  /** @deprecated Use animation prop instead. Use shimmer (true) or pulse (false) animation */
  shimmer?: boolean;
  /** Background color of the skeleton. Default: "#3a3a3a" for dark theme */
  baseColor?: string;
  /** Highlight/shimmer color for animation. Default: "rgba(255, 255, 255, 0.1)" */
  highlightColor?: string;
  /** Animation duration in seconds. Default: 1.5 */
  duration?: number;
  /** Animation direction for shimmer/wave: "ltr" (left to right) or "rtl" (right to left) */
  direction?: "ltr" | "rtl";
  /** Whether the skeleton should take full width of parent. Default: false */
  fullWidth?: boolean;
  /** Custom aria-label for accessibility */
  ariaLabel?: string;
  /** Number of times to repeat the skeleton in a row */
  count?: number;
  /** Gap between repeated skeletons when count > 1 */
  gap?: string | number;
  /** Whether to render as inline element */
  inline?: boolean;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "children">;

/**
 * Normalize dimension values to CSS string
 */
const normalize = (val?: string | number) =>
  val === undefined ? undefined : typeof val === "number" ? `${val}px` : val;

/**
 * Get animation class based on animation type and animated state
 */
const getAnimationClass = (
  animated: boolean,
  animation: SkeletonAnimation,
  shimmer?: boolean
): string => {
  if (!animated || animation === "none") return "skeleton-static";
  
  // Handle legacy shimmer prop
  if (shimmer !== undefined) {
    return shimmer ? "skeleton-shimmer" : "skeleton-pulse";
  }
  
  switch (animation) {
    case "shimmer":
      return "skeleton-shimmer";
    case "pulse":
      return "skeleton-pulse";
    case "wave":
      return "skeleton-wave";
    default:
      return "skeleton-shimmer";
  }
};

/**
 * Skeleton component for loading placeholders
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Skeleton variant="text" width="100%" />
 * 
 * // Circle avatar placeholder
 * <Skeleton variant="circle" width={48} height={48} />
 * 
 * // Custom colors and animation
 * <Skeleton 
 *   variant="rect" 
 *   width="100%" 
 *   height={120}
 *   baseColor="#2a2a2a"
 *   highlightColor="rgba(255, 255, 255, 0.15)"
 *   animation="wave"
 *   duration={2}
 * />
 * ```
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = "text",
      width,
      height,
      radius,
      animated = true,
      animation = "shimmer",
      shimmer,
      baseColor,
      highlightColor,
      duration,
      direction = "ltr",
      fullWidth = false,
      ariaLabel = "Loading...",
      count = 1,
      gap = 8,
      inline = false,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const isCircle = variant === "circle";

    const baseClasses = cx(
      "relative overflow-hidden select-none",
      inline ? "inline-block" : "block",
      className
    );

    const inlineStyle: React.CSSProperties = {
      width: fullWidth ? "100%" : normalize(width),
      height: normalize(height),
      borderRadius: isCircle ? "50%" : normalize(radius) || "0.125rem",
      backgroundColor: baseColor || "var(--skeleton-base-color, #3a3a3a)",
      ["--skeleton-highlight-color" as string]: highlightColor || "rgba(255, 255, 255, 0.1)",
      ["--skeleton-duration" as string]: duration ? `${duration}s` : undefined,
      ["--skeleton-direction" as string]: direction === "rtl" ? "reverse" : "normal",
      ...style,
    };

    const animationClass = getAnimationClass(animated, animation, shimmer);

    // Default sizes
    if (!width && !height && !fullWidth) {
      if (variant === "text") inlineStyle.height = "1rem";
      if (variant === "rect") {
        inlineStyle.height = "8rem";
        inlineStyle.width = "100%";
      }
      if (variant === "circle") {
        inlineStyle.width = "48px";
        inlineStyle.height = "48px";
      }
    }

    const skeletonElement = (
      <div
        ref={ref}
        role="status"
        aria-busy={animated}
        aria-label={ariaLabel}
        className={cx(baseClasses, animationClass)}
        style={inlineStyle}
        {...rest}
      >
        <span className="sr-only">{ariaLabel}</span>
      </div>
    );

    // Render multiple skeletons if count > 1
    if (count > 1) {
      return (
        <div
          style={{
            display: inline ? "inline-flex" : "flex",
            flexDirection: inline ? "row" : "column",
            gap: normalize(gap),
          }}
        >
          {Array.from({ length: count }).map((_, index) => (
            <div
              key={index}
              role="status"
              aria-busy={animated}
              aria-label={ariaLabel}
              className={cx(baseClasses, animationClass)}
              style={inlineStyle}
            >
              <span className="sr-only">{ariaLabel}</span>
            </div>
          ))}
        </div>
      );
    }

    return skeletonElement;
  }
);

Skeleton.displayName = "Skeleton";

export default Skeleton;
