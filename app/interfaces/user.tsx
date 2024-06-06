// React
import { Dispatch, SetStateAction } from "react";

// Interfaces
import { CartItemObj } from "@interfaces/cart";

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

type UserContextType = {
  data: UserResponse;
  update: Dispatch<SetStateAction<UserResponse>>;
  refresh: () => Promise<void>;
  isLogged: () => boolean;
  logout: () => void;
};



type OrdersObj = {
  id: number;

  attributes: {
    status: string;
    total: number;
    // products: CartItemObj[];
  };
};

type OrderPageProps = {
  params: {
    id: string;
  };
};

type OrderCardProps = {
  order: OrdersObj;
  user: UserResponse;
};

type OrderProductCardProps = {
  key: number;
  orderProduct: CartItemObj;
};

export type {
  UserResponse,
  UserContextType,
  OrdersObj,
  OrderPageProps,
  OrderProductCardProps,
  OrderCardProps,
};
