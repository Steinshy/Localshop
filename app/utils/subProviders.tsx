"use client";

// React
import { useState, createContext, useCallback } from "react";

// Utils
import { showToast } from "@utils/helpers";
import http from "@utils/http";

// Interfaces - Data
import { UserResponse, UserContextType } from "@interfaces/user";
import { CartResponse, CartContextType } from "@interfaces/cart";
import { defaultUser } from "@data/user";
import { defaultCart } from "@data/cart";

// CART PROVIDERS //

const useCart = () => {
  const [cart, setCart] = useState(defaultCart as CartResponse);

  const refresh = useCallback(async () => {
    const response = await http.get("/cart");
    const { data } = response?.data as { data: CartResponse };
    setCart(data);
  }, []);

  const reset = () => {
    setCart(defaultCart);
  };

  return { data: cart, update: setCart, refresh, reset };
};

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const userCart = useCart();

  return <CartContext.Provider value={userCart as CartContextType}>{children}</CartContext.Provider>;
};

const CartContext = createContext<CartContextType>({
  data: {} as CartResponse,
  update: () => {},
  refresh: async () => {},
  reset: () => {},
});

// USER PROVIDERS //

const useUser = () => {
  const [user, setUser] = useState(defaultUser as UserResponse);

  const refresh = useCallback(async () => {
    const response = await http.get("/user");
    const { data } = response?.data as { data: UserResponse };
    setUser(data);
  }, []);

  const logout = () => {
    setUser(defaultUser);
    showToast("Logged out!", "success");
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
