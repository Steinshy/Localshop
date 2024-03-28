"use client";

// React context
import { useContext, useEffect, useState } from "react";

// Components - Generation
import { CartContext } from "../utils/cartProvider";

import CartItems from "./components/cartItems";
import CartSummary from "./components/cartSummary";

export default function Cart() {
  // Cart Store context
  const cartStore = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(true);
  // Cart
  const [cartChecked, setCartChecked] = useState(false);
  const [cart, setCart] = useState(cartStore.data);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalPriceDiscount, setTotalPriceDiscount] = useState<number>(0);

  // Calculate Total Price
  useEffect(() => {
    const calculateTotal = () => {
      let total = 0;
      cartStore.data.forEach((item) => {
        total += item.price * item.quantity;
      });
      setTotalPrice(total);
    };

    calculateTotal();
  }, [cartStore.data]);

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
    <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
      <CartItems cartStore={cartStore} cart={cart} isLoading={isLoading} />
      <CartSummary cart={cart} setTotalPriceDiscount={setTotalPriceDiscount} totalPriceDiscount={totalPriceDiscount} totalPrice={totalPrice} isLoading={isLoading} />
    </div>
  );
}
