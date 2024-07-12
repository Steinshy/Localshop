// Interface
import { DiscountResponse } from '@interfaces/discount';
import { ProductResponse } from '@interfaces/product';
import { CartContextType } from '@interfaces/subProviders';
import { AddressResponse } from '@interfaces/userAddress';

export type InitialCartProps = {
  initialCart: CartResponse;
};

// Utils => subProviders
export type CartActions = {
  data: CartResponse;
  error?: string;
};

export type CartProviderProps = {
  children: React.ReactNode;
  initialCart: CartResponse;
};

// Components => Product => AddToCart | Data => defaultCart | utils => subProviders
export type CartResponse = {
  id: string;
  type: string;
  attributes: {
    id: number;
    createdAt: string;
    updatedAt: string;
    items: CartItemProps[];
    totalPrice: number;
    coupon: {
      data: DiscountResponse;
    },
    addresses: CartAddresses[],
    finalPrice: number;
    totalItems: number;
    totalUniqueItems: number;
  };
};

export type CartAddresses = {
  id: number;
  type: string;
  address: {
    data: AddressResponse;
  }
}

export type CartItemProps = {
  id: number;
  quantity: number;
  price: number;
  product: {
    data: ProductResponse;
  };
};

export type AddToCartProps = {
  localProduct: ProductResponse;
  isIconOnly?: boolean;
};

// Components => Cart => CartProduct
export type CartProductProps = {
  cartItem: CartItemProps;
};

export type CartClearBtnProps = {
  id?: string;
  cartStore: CartContextType;
};

// Components => Cart => CheckoutButtonProps
export type CheckoutButtonProps = {
  items: CartItemProps[];
};
