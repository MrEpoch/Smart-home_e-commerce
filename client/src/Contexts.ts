import { createContext } from "react";
import { ProductContextType, ThemeContextType } from "./Types";

export const ThemeContext = createContext<ThemeContextType>(
  {} as ThemeContextType,
);

export const ProductContext = createContext<ProductContextType>(
  {} as ProductContextType,
);
