'use client';

// React
import { FC, useState, createContext, useCallback } from 'react';

// Interfaces
import { CartActions, CartProviderProps, CartResponse } from '@interfaces/cart';
import { UserActions, UserProviderProps, UserResponse } from '@interfaces/user';
import { UserContextType, CartContextType } from '@interfaces/subProviders';

// Data
import { defaultCart, defaultUser } from '@data/general';

// API
import { getCart, getUser, userLogout } from 'actions';

// CART PROVIDERS //
const useCart = (initialCart:CartResponse) => {
  const [cart, setCart] = useState<CartResponse>(initialCart);
  const [addressID, setAddressID] = useState<{ [x: string]: string|null; }>({});

  const refresh = useCallback(async ():Promise<boolean> => {
    const { data, error } = await getCart() as CartActions;
    !error ? setCart(data) : setCart(defaultCart);
    return !error;
  }, [setCart]);

  const reset = useCallback(() => {
    setCart(defaultCart);
  }, [setCart]);

  return { data: cart, update: setCart, refresh, reset, setAddressID, addressID };
};

const CartProvider:FC<CartProviderProps> = ({ children, initialCart }) => {
  const userCart = useCart(initialCart);

  return <CartContext.Provider value={userCart}>{children}</CartContext.Provider>;
};

const CartContext = createContext<CartContextType>({
  data: {} as CartResponse,
  update: () => {},
  refresh: async () => {
    return await new Promise<boolean>((resolve) => { resolve(false);});
  },
  reset: () => {},
  setAddressID: () => {},
  addressID: {}
});

// USER PROVIDERS //
const useUser = (initialUser:UserResponse) => {
  const [user, setUser] = useState<UserResponse>(initialUser);

  const refresh = useCallback(async () => {
    const { data, error } = await getUser() as UserActions;
    !error ? setUser(data) : setUser(defaultUser);
    return !error;
  }, [setUser]);

  const logout = useCallback(() => {
    void userLogout();
    setUser(defaultUser);
  }, [setUser]);

  return { data: user, update: setUser, isLogged: () => user.id > 0, logout, refresh };
};

const UserProvider:FC<UserProviderProps> = ({ children, initialUser }) => {
  const userState = useUser(initialUser);

  return <UserContext.Provider value={userState}>{children}</UserContext.Provider>;
};

const UserContext = createContext<UserContextType>({
  data: {} as UserResponse,
  update: () => {},
  refresh: async () => {
    return await new Promise<boolean>((resolve) => { resolve(false);});
  },
  isLogged: () => true || false,
  logout: () => {},
});

export { UserProvider, CartProvider, UserContext, CartContext, useCart, useUser };
