'use client';

// React
import { useState, createContext, useCallback } from 'react';

// Utils
import { getCart, getUser } from 'actions';

// Interfaces - Data
import { CartResponse, CartContextType } from '@interfaces/cart';
import { UserResponse, UserContextType } from '@interfaces/user';
import { defaultCart, defaultUser } from '@data/general';

// CART PROVIDERS //
const useCart = () => {
  const [cart, setCart] = useState<CartResponse>(defaultCart);

  const refresh = useCallback(async () => {
    const response = await getCart();
    const { data:cart } = response;
    setCart(cart);
  }, []);

  const reset = useCallback(() => {
    setCart(defaultCart);
  }, []);

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
    const response = await getUser();
    const { data:user } = response;
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    setUser(defaultUser);
  }, []);

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
