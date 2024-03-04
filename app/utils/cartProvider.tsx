'use client';

import React, { useState, useEffect, createContext, Dispatch, SetStateAction, Context } from "react";

interface CartItem {
  id: number;
  color?: string;
  size?: string;
  discount: number;
  quantity: number;
}

interface CartContextType {
  data: CartItem[];
  update: Dispatch<SetStateAction<CartItem[]>>;
}

const CartContext: Context<CartContextType> = createContext<CartContextType>({
  data: [],
  update: () => {},
});

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  useEffect(() => {
    console.log("CART CONTEXT");
    console.log(cart);
    console.log("CART LENGTH");
    console.log(cart.length);
  }, [cart]);

  return (
    <CartContext.Provider value={{ data: cart, update: setCart }}>
      {children}
    </CartContext.Provider>
  );
}

export {
  CartContext, CartProvider
}
