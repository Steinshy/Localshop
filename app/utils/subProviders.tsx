"use client";

// React
import { useState, createContext, useEffect, useCallback } from "react";

import http from "@utils/http";

// Interfaces
import { UserItemsObj, UserContextType } from "@interfaces/user";
import { CartResponse, CartContextType } from "@interfaces/cart";

// Data
import { UserDefaultData, UserLoggedOutData } from "@data/user";

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

const useCart = () => {
  const [cart, setCart] = useState<CartResponse>(defaultCart as CartResponse);

  const refresh = useCallback(async () => {
    const response = await http.get('/cart');
    const { data } = response?.data as { data: CartResponse };
    setCart(data);
  }, []);

  useEffect(() => {
    void refresh();
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
  const [user, setUser] = useState<UserItemsObj>(
    UserDefaultData || (JSON.parse(localStorage.getItem("user") as string) as UserItemsObj)
  );

  // Update User
  const update = (newData: UserItemsObj) => {
    setUser(newData);
    localStorage.setItem("user", JSON.stringify(newData));
  };

  // Logout User
  const logout = () => {
    setUser(UserLoggedOutData);
    localStorage.removeItem("user");
  };
  return { user, update, logout, isLogged: () => user.id !== 0 };
};

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const userState = useUser();

  return <UserContext.Provider value={userState as UserContextType}>{children}</UserContext.Provider>;
};

const UserContext = createContext<UserContextType>({
  user: UserDefaultData,
  userChecked: false,
  update: () => {},
  isLogged: () => false,
  logout: () => {},
});

export { UserProvider, CartProvider, UserContext, CartContext, useCart, useUser };
