import React from "react";
// Simple clsx-style helper
const cx = (...classes: Array<string | false | null | undefined>) =>
    classes.filter(Boolean).join(" ");

export function SkeletonGroup({
    className,
    children,
    ...rest
  }: React.HTMLAttributes<HTMLDivElement>) {
    return (
      <div className={cx("space-y-2", className)} {...rest}>
        {children}
      </div>
    );
  }