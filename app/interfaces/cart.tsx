// React
import { Dispatch, SetStateAction } from "react";

// Interface
import { CouponsObject } from "@interfaces/coupon";
import { ProductImageProps } from "@interfaces/product";

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
  type: string;
  quantity: number;
  product: {
    id: number;
    description: string;
    price: number;
    title: string;
    stock: number;
    rating: number;
    category: string;
    discountPercentage: number;
    brand: string;
    thumbnail: {
      url: string;
      full: string;
    };
    images: [ProductImageProps];
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
  productId?: number;
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
