'use client';

// React
import { FC, useState, createContext, useCallback } from 'react';

// Actions
import { getUser, userLogout } from '@actions/actionsUser';

// Interfaces
import { actionsUser, UserResponse } from '@interfaces/user';
import { UserProviderProps, UserContextType } from '@interfaces/providers';

export const useUser = (initialUser?: UserResponse) => {
  const [user, setUser] = useState<UserResponse | undefined>(initialUser);

  const refresh = useCallback(async () => {
    const { data, error } = (await getUser()) as actionsUser;
    !error ? setUser(data) : setUser(undefined);
    return !error;
  }, [setUser]);

  const logout = useCallback(() => {
    void userLogout();
    setUser(undefined);
  }, [setUser]);

  return { data: user, update: setUser, isLogged: () => user !== undefined, logout, refresh };
};

export const UserProvider: FC<UserProviderProps> = ({ children, initialUser }) => {
  const userState = useUser(initialUser);

  return <UserContext.Provider value={userState}>{children}</UserContext.Provider>;
};

export const UserContext = createContext<UserContextType>({
  data: {} as UserResponse,
  update: () => {},
  refresh: async () => {
    return await new Promise<boolean>((resolve) => {
      resolve(false);
    });
  },
  isLogged: () => true || false,
  logout: () => {}
});
