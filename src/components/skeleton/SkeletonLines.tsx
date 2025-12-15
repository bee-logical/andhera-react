import React, { forwardRef } from "react";
import { Skeleton, SkeletonProps } from "./skeleton";

/**
 * Props for the SkeletonLines component
 */
export type SkeletonLinesProps = {
  /** Number of text lines to render. Default: 3 */
  lines?: number;
  /** Gap between lines in pixels or CSS units. Default: 8 */
  spacing?: number | string;
  /** Width of all lines except the last. Default: "100%" */
  width?: string | number;
  /** Width of the last line (creates natural text feel). Default: "70%" */
  lastLineWidth?: string | number;
  /** Randomize line widths for more natural look */
  randomize?: boolean;
  /** Minimum random width percentage (0-100). Default: 60 */
  minRandomWidth?: number;
  /** Maximum random width percentage (0-100). Default: 100 */
  maxRandomWidth?: number;
  /** Custom widths for each line (overrides width and lastLineWidth) */
  lineWidths?: (string | number)[];
  /** Custom heights for each line (overrides height) */
  lineHeights?: (string | number)[];
  /** Custom className for the container */
  containerClassName?: string;
  /** Custom style for the container */
  containerStyle?: React.CSSProperties;
} & Omit<SkeletonProps, "variant" | "width" | "count">;

/**
 * Get width for a specific line index
 */
const getLineWidth = (
  index: number,
  total: number,
  options: Pick<SkeletonLinesProps, "width" | "lastLineWidth" | "randomize" | "minRandomWidth" | "maxRandomWidth" | "lineWidths">
): string | number => {
  const { width = "100%", lastLineWidth = "70%", randomize, minRandomWidth = 60, maxRandomWidth = 100, lineWidths } = options;
  
  // Custom line widths take precedence
  if (lineWidths && lineWidths[index] !== undefined) {
    return lineWidths[index];
  }
  
  // Last line uses lastLineWidth
  if (index === total - 1) {
    return lastLineWidth;
  }
  
  // Randomize widths if enabled
  if (randomize) {
    const randomPercent = Math.floor(Math.random() * (maxRandomWidth - minRandomWidth + 1)) + minRandomWidth;
    return `${randomPercent}%`;
  }
  
  return width;
};

/**
 * Normalize spacing to CSS value
 */
const normalizeSpacing = (spacing: number | string): string => {
  return typeof spacing === "number" ? `${spacing}px` : spacing;
};

/**
 * SkeletonLines component for rendering multiple text skeleton lines
 * 
 * @example
 * ```tsx
 * // Basic usage with 3 lines
 * <SkeletonLines lines={3} />
 * 
 * // Custom last line width
 * <SkeletonLines lines={5} lastLineWidth="50%" />
 * 
 * // Randomized widths for natural look
 * <SkeletonLines lines={4} randomize />
 * 
 * // Custom heights per line
 * <SkeletonLines 
 *   lines={3} 
 *   lineHeights={[20, 14, 14]} 
 *   lineWidths={["60%", "100%", "80%"]}
 * />
 * ```
 */
export const SkeletonLines = forwardRef<HTMLDivElement, SkeletonLinesProps>(
  (
    {
      lines = 3,
      spacing = 8,
      width = "100%",
      lastLineWidth = "70%",
      randomize = false,
      minRandomWidth = 60,
      maxRandomWidth = 100,
      lineWidths,
      lineHeights,
      height = 12,
      containerClassName,
      containerStyle,
      ...rest
    },
    ref
  ) => {
    const lineElements = Array.from({ length: lines }).map((_, index) => {
      const lineWidth = getLineWidth(index, lines, {
        width,
        lastLineWidth,
        randomize,
        minRandomWidth,
        maxRandomWidth,
        lineWidths,
      });
      
      const lineHeight = lineHeights?.[index] ?? height;
      
      return (
        <Skeleton
          key={index}
          variant="text"
          width={lineWidth}
          height={lineHeight}
          {...rest}
        />
      );
    });

    return (
      <div
        ref={ref}
        className={containerClassName}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: normalizeSpacing(spacing),
          ...containerStyle,
        }}
      >
        {lineElements}
      </div>
    );
  }
);

SkeletonLines.displayName = "SkeletonLines";