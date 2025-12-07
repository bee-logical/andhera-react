import type { tokens } from "./tokens";

export type Tokens = typeof tokens;

export interface Theme {
  fontFamily: string;
  borderRadius: string;
  colorScheme: "light" | "dark";
  tokens: Tokens;
}
