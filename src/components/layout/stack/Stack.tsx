import { forwardRef } from "react";
import { classNames } from "@/utils";
import type { StackProps } from "./Stack.types";

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    { direction = "vertical", gap = "1rem", align = "stretch", justify = "start", wrap = false, style, className, ...rest },
    ref,
  ) => {
    const flexDirection = direction === "horizontal" ? "flex-row" : "flex-col";
    const alignClass: Record<NonNullable<StackProps["align"]>, string> = {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    };
    const justifyClass: Record<NonNullable<StackProps["justify"]>, string> = {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
    };

    return (
      <div
        ref={ref}
        className={classNames("flex", flexDirection, alignClass[align], justifyClass[justify], wrap ? "flex-wrap" : undefined, className)}
        style={{ gap, ...(style ?? {}) }}
        {...rest}
      />
    );
  },
);

Stack.displayName = "Stack";
