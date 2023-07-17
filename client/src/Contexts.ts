import { createContext } from "react";
import { ThemeContextType } from "./Types";

export const ThemeContext = createContext<ThemeContextType>(
  {} as ThemeContextType,
);

