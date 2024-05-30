"use client";

// React
import { useState, createContext, useCallback } from "react";

import http from "@utils/http";

// Interfaces
import { UserResponse, UserContextType } from "@interfaces/user";
import { CartResponse, CartContextType } from "@interfaces/cart";

// Data
// import { UserDefaultData, UserLoggedOutData } from "@data/user";

// CART
const defaultCart = {
  id: "",
  type: "",
  attributes: {
    id: 0,
    createdAt: "",
    updatedAt: "",
    items: [],
    totalPrice: 0,
    totalItems: 0,
    totalUniqueItems: 0,
  },
};

const defaultUser = {
  id: 0,
  type: "",
  addresses: [],
  orders: [],

  attributes: {
    id: 0,
    firstname: "",
    lastname: "",
    email: "",
    avatar: {
      small: "",
      large: "",
    },
  },
};

const useCart = () => {
  const [cart, setCart] = useState<CartResponse>(defaultCart as CartResponse);

  const refresh = useCallback(async () => {
    const response = await http.get("/cart");
    const { data } = response?.data as { data: CartResponse };
    setCart(data);
  }, []);

  return { data: cart, update: setCart, refresh };
};

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const userCart = useCart();

  return <CartContext.Provider value={userCart as CartContextType}>{children}</CartContext.Provider>;
};

const CartContext = createContext<CartContextType>({
  data: {} as CartResponse,
  update: () => {},
  refresh: async () => {}
});

const useUser = () => {
  const [user, setUser] = useState<UserResponse>(defaultUser as UserResponse);

  // Update user data
  const refresh = useCallback(async () => {
    const response = await http.get('/user');
    const { data } = response?.data as { data: UserResponse };
    setUser(data);
  }, []);

  // Logout user
  const logout = () => {
    setUser(defaultUser);
  }

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
  logout: () => {}
});

export { UserProvider, CartProvider, UserContext, CartContext, useCart, useUser };
