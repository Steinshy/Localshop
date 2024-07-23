// React
import { Dispatch, SetStateAction, ReactNode } from 'react';

// Interfaces
import { CartResponse } from '@interfaces/cart';
import { UserResponse } from '@interfaces/user';
import { AddressResponse } from './userAddress';

// cartProvider | Interfaces => cart
export type CartContextType = {
  data?: CartResponse;
  update: (data: CartResponse) => void;
  refresh: () => Promise<boolean>;
  reset: () => void;
  shipping?: AddressResponse;
  setShipping: Dispatch<SetStateAction<AddressResponse | undefined>>;
  billing?: AddressResponse;
  setBilling: Dispatch<SetStateAction<AddressResponse | undefined>>;
};

// userProvider | Interfaces => user
export type UserContextType = {
  data?: UserResponse;
  update: Dispatch<SetStateAction<UserResponse | undefined>>;
  refresh: () => Promise<boolean>;
  isLogged: () => boolean;
  logout: () => void;
};

// CartProvider
export type CartProviderProps = {
  children: React.ReactNode;
  initialCart?: CartResponse;
};

// userProvider
export type UserProviderProps = {
  children: React.ReactNode;
  initialUser?: UserResponse;
};

// providers
export type ProviderProps = {
  children: ReactNode;
  initialUser?: UserResponse;
  initialCart?: CartResponse;
};
