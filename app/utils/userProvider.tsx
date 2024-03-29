"use client";

// Context - React
import React, { useState, useEffect, createContext, Context } from "react";

// Interface - Utils
import { UserItemsObj, UserContextType } from "./interfaces";

const UserDefaultData: UserItemsObj = {
  id: 1,
  firstname: "John",
  lastname: "Doe",
  email: "john.doe@gmail.com",
  password: "password",
};

const UserContext: Context<UserContextType> = createContext<UserContextType>({
  data: UserDefaultData,
  update: () => {},
  isLogged: () => false,
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [UserChecked, setUserChecked] = useState<boolean>(false);
  const [User, setUser] = useState<UserItemsObj>(UserDefaultData);

  const isLogged = () => {
    return User.id !== 0;
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = (await JSON.parse(
          localStorage.getItem("user") || JSON.stringify(UserDefaultData)
        )) as UserItemsObj;
        setUser(data);
        setUserChecked(true);
      } catch (error) {
        console.error("An error occurred while fill localStorage :", error);
      }
    };
    getUserData().catch(console.error);
  }, [UserChecked]);

  useEffect(() => {
    if (!UserChecked) return;
    localStorage.setItem("User", JSON.stringify(User));
  }, [User, UserChecked]);

  return (
    <UserContext.Provider value={{ data: User, update: setUser, isLogged: isLogged }}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };
