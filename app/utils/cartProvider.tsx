"use client";

// Context - React
import React, { useState, useEffect, createContext, Context } from "react";

// Interface - Utils
import { CartItemObj, CartContextType } from "../utils/interfaces";

const CartContext: Context<CartContextType> = createContext<CartContextType>({
  data: [],
  update: () => {},
});

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartChecked, setCartChecked] = useState<boolean>(false);
  const [cart, setCart] = useState<CartItemObj[]>([]);

  useEffect(() => {
    const getCartData = async () => {
      try {
        const data = (await JSON.parse(localStorage.getItem("cart") || JSON.stringify([]))) as CartItemObj[];
        setCart(data);
        setCartChecked(true);
      } catch (error) {
        console.error("An error occurred while fill localStorage :", error);
      }
    };
    getCartData().catch(console.error);
  }, [cartChecked]);

  useEffect(() => {
    if (!cartChecked) return;
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart, cartChecked]);

  return (
    <CartContext.Provider value={{ data: cart, update: setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
