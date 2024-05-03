// React
import { Dispatch, SetStateAction } from "react";

type CartItemObj = {
  id: number;
  color?: string;
  size?: string;
  discount: number;
  quantity: number;
  price: number;
  title: string;
  category: string;
  stock: number;
  thumbnail: string;
};

type CartContextType = {
  data: CartItemObj[];
  update: Dispatch<SetStateAction<CartItemObj[]>>;
};

type CartItemProps = {
  cartStore: CartContextType;
  cart: CartItemObj[];
  isLoading: boolean;
};

type CartProductProps = {
  cartStore: CartContextType;
  itemcart: CartItemObj;
};

type CartSummaryProps = {
  cart: CartItemObj[];
  totalPrice: number;
  shippingPrice: number;
  taxesPrice: number;
  isLoading: boolean;
};

type CartCouponsProps = {
  totalPrice: number;
  isLoading: boolean;
};

type CouponsObject = {
  code: string;
  discount: number;
  active: boolean;
  expired: boolean;
};

export type {
  CartItemObj,
  CartContextType,
  CartItemProps,
  CartProductProps,
  CartSummaryProps,
  CartCouponsProps,
  CouponsObject,
};
