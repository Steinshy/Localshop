// React
import { Dispatch, SetStateAction } from 'react';

// Interface
import { CouponsObject } from '@interfaces/coupon';
import { ProductResponse } from '@interfaces/product';

// General Interface
type CartResponse = {
  id: string;
  type: string;

  attributes: {
    id: number;
    createdAt: string;
    updatedAt: string;
    items: CartItems[];
    totalPrice: number;
    coupon: CouponsObject;
    finalPrice: number;
    totalItems: number;
    totalUniqueItems: number;
  };
};
// CartResponse => CartItems
type CartItems = {
  id: number;
  quantity: number;
  price: number;
  product: ProductResponse;
};

type CartContextType = {
  data: CartResponse;
  update: Dispatch<SetStateAction<CartResponse>>;
  refresh: () => Promise<void>;
  reset: () => void;
};

type CartProductProps = {
  cartItem: CartItems;
};

type CartItemProps = {
  items: CartItems[];
};

type CartButtonProcessProps = {
  pathname: string;
  items: CartItems[];
};

type CartButtonDeleteProps = {
  cartStore: CartContextType;
  productId?: number;
};

export type {
  CartResponse,
  CartItems,
  CartContextType,
  CartItemProps,
  CartProductProps,
  CartButtonProcessProps,
  CartButtonDeleteProps,
};
