// Interface
import { DiscountResponse } from '@interfaces/discount';
import { ProductResponse } from '@interfaces/product';
import { CartContextType } from '@interfaces/subProviders';

type InitialCartProps = {
  initialCart: CartResponse;
};

// Utils => subProviders
type CartActions = {
  data: CartResponse;
  error?: string;
};

type CartProviderProps = {
  children: React.ReactNode;
  initialCart: CartResponse;
};

// Components => Product => AddToCart | Data => defaultCart | utils => subProviders
type CartResponse = {
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
    finalPrice: number;
    totalItems: number;
    totalUniqueItems: number;
  };
};

type CartItemProps = {
  id: number;
  quantity: number;
  price: number;
  product: {
    data: ProductResponse;
  };
};

type AddToCartProps = {
  localProduct: ProductResponse;
  isIconOnly?: boolean;
};

// Components => Cart => CartProduct
type CartProductProps = {
  cartItem: CartItemProps;
};

type CartClearBtnProps = {
  id?: string;
  cartStore: CartContextType;
};

// Components => Cart => CheckoutButtonProps
type CheckoutButtonProps = {
  items: CartItemProps[];
};

export type {
  InitialCartProps,
  CartActions,
  CartProviderProps,
  CartResponse,
  CartItemProps,
  AddToCartProps,
  CartProductProps,
  CartClearBtnProps,
  CheckoutButtonProps,
};
