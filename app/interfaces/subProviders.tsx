// React - Interfaces
import { Dispatch, SetStateAction } from 'react';
import { ReactNode } from "react";
import { CartResponse } from '@interfaces/cart';
import { UserResponse } from '@interfaces/user';

// subProviders => CartContext
type CartContextType = {
  data: CartResponse;
  update: Dispatch<SetStateAction<CartResponse>>;
  refresh: () => Promise<boolean>;
  reset: () => void;
  setAddressID: Dispatch<SetStateAction<{ [x: string]: string|null; }>>;
  addressID: { [x: string]: string|null; };
};

// subProviders => UserContext
type UserContextType = {
  data: UserResponse;
  update: Dispatch<SetStateAction<UserResponse>>;
  refresh: () => Promise<boolean>;
  isLogged: () => boolean;
  logout: () => void;
};

type ProviderProps = {
  children: ReactNode;
  initialUser: UserResponse;
  initialCart: CartResponse;
}

export type { CartContextType, UserContextType, ProviderProps };
