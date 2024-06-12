// React
import { Dispatch, SetStateAction } from "react";

// Interface
import { CouponsObject } from "@interfaces/coupon";

type CartResponse = {
  id: string;
  type: string;

  attributes: {
    id: number;
    createdAt: string;
    updatedAt: string;
    totalPrice: number;
    totalItems: number;
    totalUniqueItems: number;
    finalPrice: number;
    items: CartItemObj[];
    coupon: CouponsObject;
  };
};

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
  reset: () => void;
};

type CartItemProps = {
  items: CartItemObj[];
};

type CartProductProps = {
  cartItem: CartItemObj;
};

type CartButtonProcessProps = {
  pathname: string;
  items: CartItemObj[];
};

type CartButtonDeleteProps = {
  cartStore: CartContextType;
  productId: number;
};

export type {
  CartResponse,
  CartItemObj,
  CartContextType,
  CartItemProps,
  CartProductProps,
  CartButtonProcessProps,
  CartButtonDeleteProps,
};
