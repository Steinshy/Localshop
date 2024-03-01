// React - Routes
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// Components
import Navbar from "./components/navbar";
import Footer from "./components/footer";

// Pages
import Home from "./page";
import ProductPage from "./products/page";
import AboutPage from "./about/page";
import Product from "./product/product";

// Context
import { CartContext } from "./utils/contexts";

// Chakra UI - APP CSS
import { ChakraProvider } from '@chakra-ui/react'
import "./styles/App.css";

// Setup Routes
const HOME_ROUTE = "/";
const PRODUCT_PAGE_ROUTE = "/product-page";
const PRODUCT_ROUTE = "/product-page/:id/:slug";
const ABOUT_US_ROUTE = "/about-us";

const RoutesComponent = () => (
  <Routes>
    <Route path={HOME_ROUTE} element={<Home />} />
    <Route path={PRODUCT_PAGE_ROUTE} element={<ProductPage />} />
    <Route path={PRODUCT_ROUTE} element={<Product />} />
    <Route path={ABOUT_US_ROUTE} element={<AboutPage />} />
  </Routes>
  );
  interface CartItem {
    id: number;
    color?: string;
    size?: string;
    discount: number;
    quantity: number;
}

const App = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  useEffect(() => {
    console.log('CART CONTEXT')
    console.log(cart);
    console.log('CART LENGTH')
    console.log(cart.length);
  }, [cart])

  return (
    <ChakraProvider>
      <CartContext.Provider value={{data: cart, update: setCart}}>
      <main className="flex flex-col flex-grow bg-background">
        <Navbar />
        <RoutesComponent />
        <Footer />
      </main>
      </CartContext.Provider>
    </ChakraProvider>
  );
};

export default App;