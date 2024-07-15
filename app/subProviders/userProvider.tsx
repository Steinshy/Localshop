'use client';

// React
import { FC, useState, createContext, useCallback } from 'react';

// Actions
import { getUser, userLogout } from '@actions/actionsUser';

// Interfaces
import { UserActions, UserProviderProps, UserResponse } from '@interfaces/user';
import { UserContextType } from '@interfaces/subProviders';

// Data
import { defaultUser } from '@data/general';


// USER PROVIDERS //
const useUser = (initialUser:UserResponse) => {
  const [user, setUser] = useState<UserResponse>(initialUser);

  const refresh = useCallback(async () => {
    const { data, error } = await getUser() as UserActions;
    !error ? setUser(data) : setUser(defaultUser);
    return !error;
  }, [setUser]);

  const logout = useCallback(() => {
    void userLogout();
    setUser(defaultUser);
  }, [setUser]);

  return { data: user, update: setUser, isLogged: () => user.id > 0, logout, refresh };
};

const UserProvider:FC<UserProviderProps> = ({ children, initialUser }) => {
  const userState = useUser(initialUser);

  return <UserContext.Provider value={userState}>{children}</UserContext.Provider>;
};

const UserContext = createContext<UserContextType>({
  data: {} as UserResponse,
  update: () => {},
  refresh: async () => {
    return await new Promise<boolean>((resolve) => { resolve(false);});
  },
  isLogged: () => true || false,
  logout: () => {},
});

export { UserProvider, UserContext, useUser };
