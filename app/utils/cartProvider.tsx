"use client";

// React Context for Cart
import React, {
  useState,
  useEffect,
  createContext,
  Dispatch,
  SetStateAction,
  Context,
} from "react";

// Interface - CartItem
import { CartItem } from "../utils/interfaces";

interface CartContextType {
  data: CartItem[];
  update: Dispatch<SetStateAction<CartItem[]>>;
}

const CartContext: Context<CartContextType> = createContext<CartContextType>({
  data: [],
  update: () => {},
});

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartChecked, setCartChecked] = useState<boolean>(false);
  const [cart, setCart] = useState<CartItem[]>([] as CartItem[]);

  useEffect(() => {
    const getCartData = async () => {
      try {
        const data = (await JSON.parse(
          localStorage.getItem("cart") || "[]"
        )) as CartItem[];
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
