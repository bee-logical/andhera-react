import React, { forwardRef } from "react";

// Simple clsx-style helper
const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

/**
 * Spacing size options for SkeletonGroup
 */
export type SkeletonGroupSpacing = "none" | "xs" | "sm" | "md" | "lg" | "xl" | number;

/**
 * Direction/layout options for SkeletonGroup
 */
export type SkeletonGroupDirection = "column" | "row";

/**
 * Props for the SkeletonGroup component
 */
export type SkeletonGroupProps = {
  /** Spacing between skeleton children. Default: "sm" */
  spacing?: SkeletonGroupSpacing;
  /** Custom gap value (overrides spacing preset) */
  gap?: string | number;
  /** Layout direction: "column" (default) or "row" */
  direction?: SkeletonGroupDirection;
  /** Alignment of items in cross axis */
  align?: "start" | "center" | "end" | "stretch";
  /** Justify content along main axis */
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  /** Whether to wrap items in row layout */
  wrap?: boolean;
  /** Children elements */
  children?: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "children">;

/**
 * Get spacing value in pixels from preset or number
 */
const getSpacingValue = (spacing: SkeletonGroupSpacing): string => {
  if (typeof spacing === "number") return `${spacing}px`;
  
  const spacingMap: Record<Exclude<SkeletonGroupSpacing, number>, string> = {
    none: "0",
    xs: "0.25rem",
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem",
  };
  return spacingMap[spacing];
};

/**
 * Get alignment class based on alignment prop
 */
const getAlignmentStyle = (align?: SkeletonGroupProps["align"]): string | undefined => {
  if (!align) return undefined;
  const alignMap: Record<NonNullable<typeof align>, string> = {
    start: "flex-start",
    center: "center",
    end: "flex-end",
    stretch: "stretch",
  };
  return alignMap[align];
};

/**
 * Get justify content style
 */
const getJustifyStyle = (justify?: SkeletonGroupProps["justify"]): string | undefined => {
  if (!justify) return undefined;
  const justifyMap: Record<NonNullable<typeof justify>, string> = {
    start: "flex-start",
    center: "center",
    end: "flex-end",
    between: "space-between",
    around: "space-around",
    evenly: "space-evenly",
  };
  return justifyMap[justify];
};

/**
 * SkeletonGroup component to organize skeleton children with consistent spacing
 * 
 * @example
 * ```tsx
 * // Basic vertical stack
 * <SkeletonGroup spacing="md">
 *   <Skeleton variant="text" />
 *   <Skeleton variant="text" />
 *   <Skeleton variant="rect" height={100} />
 * </SkeletonGroup>
 * 
 * // Horizontal layout with custom gap
 * <SkeletonGroup direction="row" gap={16} align="center">
 *   <Skeleton variant="circle" width={40} height={40} />
 *   <Skeleton variant="text" width={200} />
 * </SkeletonGroup>
 * ```
 */
export const SkeletonGroup = forwardRef<HTMLDivElement, SkeletonGroupProps>(
  (
    {
      spacing = "sm",
      gap,
      direction = "column",
      align,
      justify,
      wrap = false,
      className,
      children,
      style,
      ...rest
    },
    ref
  ) => {
    const computedGap = gap !== undefined 
      ? (typeof gap === "number" ? `${gap}px` : gap)
      : getSpacingValue(spacing);

    const groupStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: direction,
      gap: computedGap,
      alignItems: getAlignmentStyle(align),
      justifyContent: getJustifyStyle(justify),
      flexWrap: wrap ? "wrap" : "nowrap",
      ...style,
    };

    return (
      <div 
        ref={ref}
        className={cx("skeleton-group", className)} 
        style={groupStyle}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

SkeletonGroup.displayName = "SkeletonGroup";