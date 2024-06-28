// React
import { Dispatch, SetStateAction } from 'react';

// Interface
import { CouponsResponse } from '@interfaces/coupon';
import { ProductResponse } from '@interfaces/product';

// Components => Product => AddToCart | Data => defaultCart | utils => subProviders
type CartResponse = {
  id: string;
  type: string;
  attributes: {
    id: number;
    createdAt: string;
    updatedAt: string;
    items: CartItems[];
    totalPrice: number;
    coupon: CouponsResponse;
    finalPrice: number;
    totalItems: number;
    totalUniqueItems: number;
  };
};

// Actions => getCart | subProviders => GetCart
type getCartResponse = {
  data: CartResponse;
};

// CartResponse => CartItems
type CartItems = {
  id: number;
  quantity: number;
  price: number;
  product: {
    data: ProductResponse;
  };
};

// subProviders => CartContext
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
  productId?: number;
  cartStore: CartContextType;
};

type AddToCartProps = {
  localProduct: ProductResponse;
  isIconOnly?: boolean;
};

export type {
  CartResponse,
  getCartResponse,
  CartItems,
  CartContextType,
  CartItemProps,
  CartProductProps,
  CartButtonProcessProps,
  CartButtonDeleteProps,
  AddToCartProps,
};
