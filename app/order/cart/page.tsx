"use client";

// React context
import { useContext, useEffect, useState } from "react";

// Components - Generation
import { CartContext } from "@/app/utils/subProviders";
import CartItems from "./components/cartItems";

const Cart = () => {
  // Context
  const cartStore = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(true);
  // Cart
  const [cartChecked, setCartChecked] = useState(false);
  const [cart, setCart] = useState(cartStore.data);

  // Cart check
  useEffect(() => {
    setCart(cartStore.data);
    setCartChecked(true);
  }, [cartStore.data]);

  // Cart check with loading
  useEffect(() => {
    if (!cartChecked) return;
    setIsLoading(false);
  }, [cartChecked]);

  return (
      <CartItems cartStore={cartStore} cart={cart} isLoading={isLoading} />
  );
};

export default Cart;
