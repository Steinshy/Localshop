"use client";

// React Context for User
import React, {
  useState,
  useEffect,
  createContext,
  Dispatch,
  SetStateAction,
  Context,
} from "react";

// Interface - UserItem
interface UserItem {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

interface UserContextType {
  data: UserItem
  update: Dispatch<SetStateAction<UserItem>>;
  isLogged: () => boolean;
}

const UserDefaultData = {
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
  const [User, setUser] = useState<UserItem>(UserDefaultData as UserItem);

  const isLogged = () => {
    return User.id !== 0;
  }

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = (await JSON.parse(
          localStorage.getItem("user") || JSON.stringify(UserDefaultData)
        )) as UserItem;
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
    <UserContext.Provider value={{ data: User, update: setUser, isLogged: isLogged }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
