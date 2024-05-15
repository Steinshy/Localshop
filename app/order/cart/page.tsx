// React
import { useContext, useEffect, useState } from "react";

// Components
import CartItems from "./components/cartItems";

// Utils
import http from "@/app/utils/http";

// Interfaces
import { CartResponse } from "@/app/interfaces/cart";

const getCart = async () => {
  const response = await http.get('/cart');
  const { data } = response?.data as { data: CartResponse };
  return data;
};

const Cart = async () => {
  const data = await getCart();
  const { attributes } = data;
  const { items } = attributes;

  return (
    <CartItems items={items} />
  );
};

export default Cart;
