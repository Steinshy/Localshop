"use client";

// React
import { useState, createContext } from "react";

// Interfaces
import { UserItemsObj, UserContextType } from "../interfaces/user";
import { CartItemObj, CartContextType } from "../interfaces/cart";

// Data
import { UserDefaultData, UserLoggedOutData } from "../data/user";

// CART
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

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const userCart = useCart();

  return <CartContext.Provider value={userCart as CartContextType}>{children}</CartContext.Provider>;
};

const CartContext = createContext<CartContextType>({
  data: [],
  update: () => {},
});

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

export {
  UserProvider,
  CartProvider,
  UserContext,
  CartContext,
  useCart,
  useUser
}
