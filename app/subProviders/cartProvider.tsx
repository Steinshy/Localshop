'use client';

// React
import { FC, useState, createContext, useCallback } from 'react';

// Actions
import { getCart } from '@actions/actionsCart';

// Interfaces
import { CartActions, CartResponse } from '@interfaces/cart';
import { CartProviderProps } from '@interfaces/subProviders';
import { CartContextType } from '@interfaces/subProviders';

// Data
import { defaultCart } from '@data/dataCart';
import { AddressResponse } from '@interfaces/userAddress';

const useCart = (initialCart: CartResponse) => {
  const [cart, setCart] = useState<CartResponse>(initialCart),
    [shipping, setShipping] = useState<AddressResponse | undefined>(initialCart.attributes.shipping?.data),
    [billing, setBilling] = useState<AddressResponse | undefined>(initialCart.attributes.billing?.data);

  const refresh = useCallback(async (): Promise<boolean> => {
    const { data, error } = (await getCart()) as CartActions;
    !error ? setCart(data) : setCart(defaultCart);
    return !error;
  }, [setCart]);

  const reset = useCallback(() => {
    setCart(defaultCart);
  }, [setCart]);

  return { data: cart, update: setCart, refresh, reset, shipping, setShipping, billing, setBilling };
};

const CartProvider: FC<CartProviderProps> = ({ children, initialCart }) => {
  const userCart = useCart(initialCart);

  return <CartContext.Provider value={userCart}>{children}</CartContext.Provider>;
};

const CartContext = createContext<CartContextType>({
  data: {} as CartResponse,
  update: () => {},
  refresh: async () => {
    return await new Promise<boolean>((resolve) => {
      resolve(false);
    });
  },
  reset: () => {},
  shipping: {} as AddressResponse,
  setShipping: () => {},
  billing: {} as AddressResponse,
  setBilling: () => {},
});

export { CartProvider, CartContext, useCart };
