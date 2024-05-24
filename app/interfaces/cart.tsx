// React
import { Dispatch, SetStateAction } from "react";

type CartResponse = {
  id: string;
  type: string;

  attributes: {
    id: number;
    createdAt: string;
    updatedAt: string;
    items: CartItemObj[];
    totalPrice: number;
    totalItems: number;
    totalUniqueItems: number;
  };
}

type CartItemObj = {
  id: number;
  quantity: number;
  price: number;
  product: {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    thumbnail: {
      url: string;
      full: string;
    };
    images: {
      thumbnail: string;
      full: string;
    }[];
  };
};

type CartContextType = {
  data: CartResponse;
  update: Dispatch<SetStateAction<CartResponse>>;
  refresh: () => Promise<void>;
};

type CartItemProps = {
  items: CartItemObj[];
};

type CartProductProps = {
  cartItem: CartItemObj;
};

type CartCouponsProps = {
  totalPrice: number;
};

type CouponsObject = {
  code: string;
  discount: number;
  active: boolean;
  expired: boolean;
};

export type {
  CartResponse,
  CartItemObj,
  CartContextType,
  CartItemProps,
  CartProductProps,
  CartCouponsProps,
  CouponsObject,
};
