// React - Interfaces
import { Dispatch, SetStateAction } from 'react';
import { CartResponse } from '@interfaces/cart';
import { UserResponse } from '@interfaces/user';

// subProviders => CartContext
type CartContextType = {
  data: CartResponse;
  update: Dispatch<SetStateAction<CartResponse>>;
  refresh: () => Promise<boolean>;
  reset: () => void;
};

// subProviders => UserContext
type UserContextType = {
  data: UserResponse;
  update: Dispatch<SetStateAction<UserResponse>>;
  refresh: () => Promise<boolean>;
  isLogged: () => boolean;
  logout: () => void;
};

export type { CartContextType, UserContextType };
