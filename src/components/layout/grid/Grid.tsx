import { forwardRef } from "react";
import type { GridProps } from "./Grid.types";

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ columns = 2, gap = "1.5rem", minColumnWidth, style, ...rest }, ref) => {
    const template = minColumnWidth ? `repeat(auto-fit, minmax(${minColumnWidth}, 1fr))` : `repeat(${columns}, minmax(0, 1fr))`;

    return (
      <div
        ref={ref}
        style={{ display: "grid", gap, gridTemplateColumns: template, ...(style ?? {}) }}
        {...rest}
      />
    );
  },
);

Grid.displayName = "Grid";
