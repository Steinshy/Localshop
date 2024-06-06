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

type AddressAttr = {
  id: number;
  label: string;
  firstname: string;
  lastname: string;
  phone: number;
  address: string;
  city: string;
  state: string;
  country: string;
  zip: number;
  default: boolean;
  createdAt: string;
  updatedAt: string;
};

type AddressObj = {
  id: number;
  type: string;
  attributes: AddressAttr;
};

type AddressListProps = {
  items: AddressObj[];
  selected?: number | null;
  setSelected?: (id: number) => void;
  selectable?: boolean;
};

type AddressCardProps = {
  addresses: AddressObj[];
  selected?: number | null;
  setSelected?: (id: number) => void;
  address: AddressObj;
  selectable?: boolean;
  fetch: () => void;
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
  AddressAttr,
  AddressObj,
  AddressListProps,
  AddressCardProps,
  OrdersObj,
  OrderPageProps,
  OrderProductCardProps,
  OrderCardProps,
};
