// React - Interfaces
import { Dispatch, SetStateAction , ReactNode} from 'react';
import { CartResponse } from '@interfaces/cart';
import { UserResponse } from '@interfaces/user';
import { AddressResponse } from './userAddress';

// subProviders => CartContext
export type CartContextType = {
  data: CartResponse;
  update: Dispatch<SetStateAction<CartResponse>>;
  refresh: () => Promise<boolean>;
  reset: () => void;
  shipping?: AddressResponse;
  setShipping: Dispatch<SetStateAction<AddressResponse | undefined>>;
  billing?: AddressResponse;
  setBilling: Dispatch<SetStateAction<AddressResponse | undefined>>;
};

// subProviders => UserContext
export type UserContextType = {
  data: UserResponse;
  update: Dispatch<SetStateAction<UserResponse>>;
  refresh: () => Promise<boolean>;
  isLogged: () => boolean;
  logout: () => void;
};

export type ProviderProps = {
  children: ReactNode;
  initialUser: UserResponse;
  initialCart: CartResponse;
};
