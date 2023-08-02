export type ChildrenProp = {
  children: React.ReactNode;
};

export type ThemeContextType = {
  dark: boolean;
  toggle: () => void;
};

export type ProductContextType = {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
  setSkip: React.Dispatch<React.SetStateAction<number>>;
};

export type Product = {
  id: string;
  name: string;
  price: string;
  description: string;
  long_description: string;
  image: string;
  category: string;
};
