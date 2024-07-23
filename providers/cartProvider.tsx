'use client';

// React
import { FC, useState, createContext } from 'react';

// Actions
import { getCart } from '@actions/actionsCart';

// Interfaces
import { CartResponse } from '@interfaces/cart';
import { CartProviderProps, CartContextType } from '@interfaces/providers';

// Data
import { AddressResponse } from '@interfaces/userAddress';

export const useCart = (initialCart?: CartResponse) => {
  const [cart, setCart] = useState<CartResponse | undefined>(initialCart),
    [shipping, setShipping] = useState<AddressResponse | undefined>(initialCart?.attributes.shipping?.data),
    [billing, setBilling] = useState<AddressResponse | undefined>(initialCart?.attributes.billing?.data);

  const refresh = async () => {
    const { data, error } = await getCart();
    !error ? setCart(data) : setCart(undefined);
    return !error;
  };

  const update = (data: CartResponse) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart, ...data };
      return newCart;
    });
  };

  const reset = () => {
    setCart(undefined);
  };

  return { data: cart, update, refresh, reset, shipping, setShipping, billing, setBilling };
};

export const CartProvider: FC<CartProviderProps> = ({ children, initialCart }) => {
  const userCart = useCart(initialCart);

  return <CartContext.Provider value={userCart}>{children}</CartContext.Provider>;
};

export const CartContext = createContext<CartContextType>({
  data: {} as CartResponse,
  update: (data: CartResponse) => {},
  refresh: async () => {
    return await new Promise<boolean>((resolve) => {
      resolve(false);
    });
  },
  reset: () => {},
  shipping: {} as AddressResponse,
  setShipping: () => {},
  billing: {} as AddressResponse,
  setBilling: () => {}
});
