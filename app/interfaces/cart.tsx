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
    items: CartItem[];
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
type CartItem = {
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
  cartItem: CartItem;
};

type CartItemProps = {
  items: CartItem[];
};

type CartButtonProcessProps = {
  pathname: string;
  items: CartItem[];
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
  CartItem,
  CartContextType,
  CartItemProps,
  CartProductProps,
  CartButtonProcessProps,
  CartButtonDeleteProps,
  AddToCartProps,
};
