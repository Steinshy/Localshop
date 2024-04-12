"use client";

// Context - React
import React, { useState, createContext } from "react";

// Interface
import { UserItemsObj, UserContextType, UserDefaultData, CartItemObj, CartContextType } from "./interfaces";

// Cart Hook => Self Providers
const useCart = () => {
  const [cart, setCart] = useState<CartItemObj[]>( [] || 
    (JSON.parse(localStorage.getItem("cart") as string) as CartItemObj[])
  );
  const [cartChecked, setCartChecked] = useState<boolean>(false);

  // Update cart data
  const update = (newData: CartItemObj[]) => {
    setCart(newData);
    setCartChecked(true);
    localStorage.setItem("cart", JSON.stringify(newData));
  };
  return { data: cart, update, cartChecked };
};

// User Hook => Self Providers

const UserLoggedOutData = {
  id: 0,
  firstname: "",
  lastname: "",
  email: "",
  addresses: [],
  orders: [],
  payepaymentmethods: [],
};

const useUser = () => {
  const [user, setUser] = useState<UserItemsObj>(UserDefaultData || (JSON.parse(localStorage.getItem("user") as string) as UserItemsObj));

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

// Export CartProvider
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const userCart = useCart();

  return <CartContext.Provider value={userCart as CartContextType}>{children}</CartContext.Provider>;
};

// Export UserProvider
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const userState = useUser();

  return <UserContext.Provider value={userState as UserContextType}>{children}</UserContext.Provider>;
};

// Export UserContext
export const UserContext = createContext<UserContextType>({
  user: UserDefaultData,
  userChecked: false,
  update: () => {},
  isLogged: () => false,
  logout: () => {},
});

// Export CartContext
export const CartContext = createContext<CartContextType>({
  data: [],
  update: () => {},
});
