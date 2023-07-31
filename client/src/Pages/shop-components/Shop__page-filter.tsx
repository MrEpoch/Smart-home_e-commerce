import { Autocomplete, TextField } from "@mui/material"
import Product_card from "../home-components/product__card"
import { useProduct } from "../../product_context";
import { Product, ProductContextType } from "../../Types";
import { useState } from "react";

export default function Shop__page_filter(): React.JSX.Element {
    const { products, error, isLoading } = useProduct() as ProductContextType;

      const [filter_condition, setFilter_condition] = useState<"all" | "locks" | "cameras" | "doorbells" | "lights" | "thermostats">("all");

      function filter_products(product: Product): boolean {
        if (product.category === filter_condition) {
          return true;
        } else if (filter_condition === "all") {
            return true;
        }
        return false;
      }

    return (
     <div className="products__section">
        <div className="products__section__filters">
            <div className="products__section__filters__categories">
              <button onClick={() => setFilter_condition("all")} className="products__section__filters__categories__all">
                All products
              </button>
              <button onClick={() => setFilter_condition("locks")} className="products__section__filters__categories__locks">
                Smart Locks
              </button>
              <button onClick={() => setFilter_condition("cameras")} className="products__section__filters__categories__cameras">
                Security cameras
              </button>
              <button onClick={() => setFilter_condition("doorbells")} className="products__section__filters__categories__doorbells">
                Bluetooth doorbells
              </button>
              <button onClick={() => setFilter_condition("lights")} className="products__section__filters__categories__lights">
                Controllable Lights
              </button>
              <button onClick={() => setFilter_condition("thermostats")} className="products__section__filters__categories__thermostats">
                Wifi Thermostats
              </button>
            </div>
            <div className="products__section__filters__search">
                <Autocomplete 
                    autoHighlight
                    options={products}
                    getOptionLabel={(option: Product) => option.name}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search products"
                            variant="outlined"
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: "new-password",
                            }}
                        />)
                    }
                />
            </div>
          </div>
          <div className="products__section__products">
          {products.filter(product => filter_products(product)).map((product: Product) => (
                <Product_card key={product.id} props={product} />
            ))}
         </div>
     </div>
    )
}
