// React
import { Dispatch, SetStateAction } from 'react';

// Interface
import { CouponsObject } from '@interfaces/coupon';

// General Interface

type CartGeneralResponse = {
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

type ProductResponseData = {
  id: string;
  type: string;
  attributes: {
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

// type CartResponse = {
//   id: string;
//   type: string;

//   attributes: {
//     id: number;
//     createdAt: string;
//     updatedAt: string;
//     items: CartItems[];
//     totalPrice: number;
//     coupon: CouponsObject;
//     finalPrice: number;
//     totalItems: number;
//     totalUniqueItems: number;
//   };
// };

// CartResponse => CartItems
type CartItems = {
  id: number;
  quantity: number;
  price: number;
  product: {
    data: ProductResponseData;
  };
};

type CartContextType = {
  data: CartGeneralResponse;
  update: Dispatch<SetStateAction<CartGeneralResponse>>;
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
  productId?: number;
  cartStore: CartContextType;
};

type AddToCartProps = {
  localProduct: ProductResponseData;
  isIconOnly?: boolean;
};

export type {
  CartGeneralResponse,
  CartItems,
  CartContextType,
  CartItemProps,
  CartProductProps,
  CartButtonProcessProps,
  CartButtonDeleteProps,
  AddToCartProps,
};
