'use client';

// React
import { useState, createContext, useCallback } from 'react';

// Interfaces
import { CartActions, CartResponse } from '@interfaces/cart';
import { UserActions, UserResponse } from '@interfaces/user';
import { UserContextType, CartContextType } from '@interfaces/subProviders';

// Data
import { defaultCart, defaultUser } from '@data/general';

// API
import { getCart, getUser } from 'actions';

// CART PROVIDERS //
const useCart = () => {
  const [cart, setCart] = useState<CartResponse>(defaultCart);

  const refresh = useCallback(async () => {
    const { data, error } = await getCart() as CartActions;
    !error ? setCart(data) : setCart(defaultCart);
    return !error;
  }, [setCart]);

  const reset = useCallback(() => {
    setCart(defaultCart);
  }, [setCart]);

  return { data: cart, update: setCart, refresh, reset };
};

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const userCart = useCart();

  return <CartContext.Provider value={userCart}>{children}</CartContext.Provider>;
};

const CartContext = createContext<CartContextType>({
  data: {} as CartResponse,
  update: () => {},
  refresh: async () => {},
  reset: () => {},
});

// USER PROVIDERS //
const useUser = () => {
  const [user, setUser] = useState<UserResponse>(defaultUser);

  const refresh = useCallback(async () => {
    const { data, error } = await getUser() as UserActions;
    !error ? setUser(data) : setUser(defaultUser);
    return !error;
  }, [setUser]);

  const logout = useCallback(() => {
    setUser(defaultUser);
  }, [setUser]);

  return { data: user, update: setUser, isLogged: () => user.id > 0, logout, refresh };
};

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const userState = useUser();

  return <UserContext.Provider value={userState}>{children}</UserContext.Provider>;
};

const UserContext = createContext<UserContextType>({
  data: {} as UserResponse,
  update: () => {},
  refresh: async () => {},
  isLogged: () => true || false,
  logout: () => {},
});

export { UserProvider, CartProvider, UserContext, CartContext, useCart, useUser };
