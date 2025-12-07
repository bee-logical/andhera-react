import React from "react";

// Simple clsx-style helper
const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

export type SkeletonVariant = "text" | "circle" | "rect";

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant; // shape
  width?: string | number; // e.g. "100%" or 48
  height?: string | number; // e.g. 16 or "2rem"
  radius?: string | number; // borderRadius
  animated?: boolean; // shimmer/pulse on/off
  shimmer?: boolean; // shimmer or pulse animation
}

const normalize = (val?: string | number) =>
  val === undefined ? undefined : typeof val === "number" ? `${val}px` : val;

export default function Skeleton({
  variant = "text",
  width,
  height,
  radius,
  animated = true,
  shimmer = true,
  className,
  style,
  ...rest
}: SkeletonProps) {
  const isCircle = variant === "circle";

  const baseClasses = cx(
    "relative overflow-hidden bg-gray-200 dark:bg-gray-700 rounded-sm select-none",
    className
  );

  const inlineStyle: React.CSSProperties = {
    width: normalize(width),
    height: normalize(height),
    borderRadius: isCircle ? "50%" : normalize(radius),
    ...style,
  };

  const animationClass = animated
    ? shimmer
      ? "skeleton-shimmer"
      : "animate-pulse"
    : "skeleton-static";

  // Default sizes
  if (!width && !height) {
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

  return (
    <div
      role="status"
      aria-busy={animated}
      className={cx(baseClasses, animationClass)}
      style={inlineStyle}
      {...rest}
    >
      <span className="sr-only">Loading...</span>

      <style>{`
        .skeleton-shimmer {
          position: relative;
        }
        .skeleton-shimmer::after {
          content: "";
          position: absolute;
          top: 0;
          left: -150%;
          width: 250%;
          height: 100%;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.4) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          animation: shimmer 1.2s ease-in-out infinite;
          mix-blend-mode: overlay;
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .skeleton-static::after {
          display: none !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .skeleton-shimmer::after {
            animation: none;
          }
          .animate-pulse {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
