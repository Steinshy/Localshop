"use client";

// React
import { useState, createContext, useCallback } from "react";

import http from "@utils/http";

// Interfaces - Data
import { UserResponse, UserContextType } from "@interfaces/user";
import { CartResponse, CartContextType } from "@interfaces/cart";
import { defaultUser } from "@data/user";
import { defaultCart } from "@data/cart";

const useCart = () => {
  const [cart, setCart] = useState(defaultCart as CartResponse);

  const refresh = useCallback(async () => {
    const response = await http.get("/cart");
    const { data } = response?.data as { data: CartResponse };
    setCart(data);
  }, []);

  // Empty cart when user is log out
  const logout = () => {
    setCart(defaultCart);
  };

  return { data: cart, update: setCart, refresh, logout };
};

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const userCart = useCart();

  return <CartContext.Provider value={userCart as CartContextType}>{children}</CartContext.Provider>;
};

const CartContext = createContext<CartContextType>({
  data: {} as CartResponse,
  update: () => {},
  refresh: async () => {},
  logout: () => {},
});

const useUser = () => {
  const [user, setUser] = useState(defaultUser as UserResponse);

  // Update user data
  const refresh = useCallback(async () => {
    const response = await http.get("/user");
    const { data } = response?.data as { data: UserResponse };
    setUser(data);
  }, []);

  // Logout user
  const logout = () => {
    setUser(defaultUser);
  };

  return { data: user, update: setUser, isLogged: () => user.id > 0, logout, refresh };
};

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const userState = useUser();

  return <UserContext.Provider value={userState as UserContextType}>{children}</UserContext.Provider>;
};

const UserContext = createContext<UserContextType>({
  data: {} as UserResponse,
  update: () => {},
  refresh: async () => {},
  isLogged: () => true || false,
  logout: () => {},
});

export { UserProvider, CartProvider, UserContext, CartContext, useCart, useUser };
