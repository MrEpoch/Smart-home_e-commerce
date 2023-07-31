import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Theme_Context from "./theme_context";
import Product_Context from "./product_context";

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Theme_Context>
            <Product_Context>
                <div className="d-flex flex-column">
                    <Router />
                </div>
            </Product_Context>
        </Theme_Context>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
