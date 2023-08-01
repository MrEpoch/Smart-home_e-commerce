import React, { useContext, useMemo, useState } from "react";
import { ChildrenProp, Product } from "./Types";
import { ProductContext } from "./Contexts";
import { useQuery } from "@tanstack/react-query";
import { GetProducts } from "./API_requests";

export function useProduct() {
  const value = useContext(ProductContext);
  if (value === null) return {};
  return value;
}

export default function Product_Context({
  children,
}: ChildrenProp): React.JSX.Element {
  const [products, setProducts] = useState<Array<Product>>([]);
  const [skip, setSkip] = useState<number>(0);
  const [more, setMore] = useState<Array<Product>>([]);

  const { data, isLoading, error } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: async () => await GetProducts(0),
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
  
  function loadMore(skip) {
    GetProducts(skip).then((res) => {
      if (res) {
        setMore(res);
      }
    }); 
  }

  useMemo(() => {
    if (data && Array.isArray(data)) setProducts(data);  
  }, [data]);

  const value = {
    products,
    isLoading,
    error,
    loadMore,
    more,
    setSkip
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}
