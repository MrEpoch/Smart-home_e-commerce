import React, { useContext, useMemo, useState } from "react";
import { ChildrenProp, Product } from "./Types";
import { ProductContext } from "./Contexts";
import { useQuery } from "@tanstack/react-query";

export function useTheme() {
  const value = useContext(ProductContext);
  if (value === null) return {};
  return value;
}

export default function Theme_Context({
  children,
}: ChildrenProp): React.JSX.Element {
  
  const [products, setProducts] = useState<Array<Product>>([]);

  const { data, isLoading, error } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: async () => await getProducts(),
  });

  useMemo(() => {
    if (data && Array.isArray(data)) setProducts(data);
  }, [data]);

  const value = {
    products,
    isLoading,
    error
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}
