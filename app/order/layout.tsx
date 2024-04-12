"use client";

// React
import { FC, useContext, useEffect, useState } from "react";

// Components
import CartSummary from "./cart/components/cartSummary";

// https://github.com/Riyad-Arafat/formik-stepper?tab=readme-ov-file
// https://dev.to/riyadelberkawy/formik-stepper-a-better-way-to-create-multi-step-forms-with-formik-3m6a

// Utils
import { CartContext, UserContext } from "../utils/subProviders";
import { CartProps } from "../utils/interfaces";

const OrderLayout:FC<CartProps> = ({ children }) => {
  // Cart Store context
  const cartStore = useContext(CartContext);
  const userStore = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  // Cart
  const [cartChecked, setCartChecked] = useState(false);
  const [cart, setCart] = useState(cartStore.data);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [shippingPrice, setshippingPrice] = useState<number>(0);
  const [taxesPrice, setTaxesPrice] = useState<number>(0);

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

  return userStore.isLogged() ? (
    <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
      {children}
      <CartSummary cart={cart} totalPrice={totalPrice} shippingPrice={shippingPrice} taxesPrice={taxesPrice} isLoading={isLoading} />
    </div>
  ) : (
    <div className="flex flex-col flex-grow items-center justify-center">
      <h1 className="text-md text-heading xl:text-lg lg:text-md">You need to be logged in to view your cart.</h1>
    </div>
  );
}

export default OrderLayout;
