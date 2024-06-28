// React
import { Dispatch, SetStateAction } from 'react';

type UserResponse = {
  id: number;
  type: string;

  attributes: {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    avatar: {
      small: string;
      large: string;
    };
  };
};

type getUserResponse = {
  data: UserResponse
};

type UserContextType = {
  data: UserResponse;
  update: Dispatch<SetStateAction<UserResponse>>;
  refresh: () => Promise<void>;
  isLogged: () => boolean;
  logout: () => void;
};

export type { UserResponse, getUserResponse, UserContextType };
