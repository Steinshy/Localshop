// React
import { Dispatch, SetStateAction } from "react";

// Interfaces
import { CartItemObj } from "./cart";

type UserItemsObj = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  addresses: AddressObj[];
  orders: OrdersObj[];
};

type UserContextType = {
  user: UserItemsObj;
  userChecked: boolean;
  update: Dispatch<SetStateAction<UserItemsObj>>;
  isLogged: () => boolean;
  logout: () => void;
};

type AddressObj = {
  id: number;
  label: string;
  firstname: string;
  lastname: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  [key: string]: string | number | boolean;
  default: boolean;
};

type AddressListProps = {
  selected?: number | null;
  setSelected?: (id: number) => void;
  selectable?: boolean;
};

type AddressCardProps = {
  selected?: number | null;
  setSelected?: (id: number) => void;
  address: AddressObj;
  selectable?: boolean;
};

type OrdersObj = {
  id: number;
  invoice: string;
  label: string;
  date: string;
  productsTotal: number;
  status: string;
  paymentType: string;
  isPaid: boolean;
  total: number;
  products: CartItemObj[];
};

type OrderPageProps = {
  params: {
    id: string;
  };
};

type OrderCardProps = {
  order: OrdersObj;
  user: UserItemsObj;
};

type OrderProductCardProps = {
  key: number;
  product: CartItemObj;
};

export type {
  UserItemsObj,
  UserContextType,
  AddressObj,
  AddressListProps,
  AddressCardProps,
  OrdersObj,
  OrderPageProps,
  OrderProductCardProps,
  OrderCardProps,
};
