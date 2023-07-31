import { CircularProgress } from "@mui/material";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { ChildrenProp } from "./Types";
import About__page from "./Pages/About__page";
import Contact__page from "./Pages/Contact__page";
import Shop__page from "./Pages/Shop__page";

const Footer = lazy(() => import("./Pages/Footer"));
const Header = lazy(() => import("./Pages/Header"));
const Home__page = lazy(() => import("./Pages/Home__page"));

function Header_Footer({ children }: ChildrenProp): React.JSX.Element {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default function Router(): React.JSX.Element {
  return (
    <Suspense
      fallback={
        <div className="pages_loading">
          <CircularProgress />
        </div>
      }
    >
      <Routes>
        <Route
          path="/"
          element={
            <Header_Footer>
              <Home__page />
            </Header_Footer>
          }
        />
        <Route path="/shop" element={
            <Header_Footer>
                <Shop__page />    
            </Header_Footer>
        } />
        
        <Route path="/about" element={
            <Header_Footer>
                <About__page />
            </Header_Footer>
        } />
        <Route
          path="/contact"
          element={
              <Header_Footer>
                <Contact__page />
              </Header_Footer>}
        />
        <Route path="/login" element={<Header_Footer>login</Header_Footer>} />
        <Route
          path="/userpage"
          element={<Header_Footer>Userpage</Header_Footer>}
        />
        <Route path="/signup" element={<Header_Footer>signup</Header_Footer>} />
      </Routes>
    </Suspense>
  );
}
