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
 
type OrdersObj = {
  id: number;
  label: string;
  date: string;
  productsTotal: number;
  status: string;
  paymentType: string;
  isPaid: boolean;
  total: number;
  products: CartItemObj[];
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

export type {
  UserItemsObj,
  UserContextType,
  AddressObj,
  OrdersObj,
  AddressListProps,
  AddressCardProps
}
