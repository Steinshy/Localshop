// React - Interfaces
import { Dispatch, SetStateAction } from 'react';
import { ReactNode } from "react";
import { CartAddresses, CartResponse } from '@interfaces/cart';
import { UserResponse } from '@interfaces/user';

// subProviders => CartContext
type CartContextType = {
  data: CartResponse;
  update: Dispatch<SetStateAction<CartResponse>>;
  refresh: () => Promise<boolean>;
  reset: () => void;
  setSelectedAddresses: Dispatch<SetStateAction<CartAddresses[]>>;
  selectedAddresses: CartAddresses[];
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
