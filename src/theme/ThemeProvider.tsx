import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { defaultTheme } from "./defaultTheme";
import type { Theme } from "./types";

const ThemeContext = createContext<Theme>(defaultTheme);
const ThemeUpdateContext = createContext<(theme: Theme) => void>(() => undefined);

export const useTheme = () => useContext(ThemeContext);
export const useSetTheme = () => useContext(ThemeUpdateContext);

export interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: Theme;
}

export const ThemeProvider = ({ children, initialTheme = defaultTheme }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  const memoisedTheme = useMemo(() => theme, [theme]);
  const memoisedUpdate = useCallback((nextTheme: Theme) => setTheme(nextTheme), []);

  return (
    <ThemeContext.Provider value={memoisedTheme}>
      <ThemeUpdateContext.Provider value={memoisedUpdate}>{children}</ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
};
