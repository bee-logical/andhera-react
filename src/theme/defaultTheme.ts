import { tokens } from "./tokens";

export const defaultTheme = {
  fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  borderRadius: tokens.radii.md,
  colorScheme: "light" as const,
  tokens,
};
