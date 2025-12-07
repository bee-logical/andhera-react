import type { HTMLAttributes } from "react";

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: "horizontal" | "vertical";
  gap?: number | string;
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around";
  wrap?: boolean;
}
