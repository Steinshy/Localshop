// Interface
import { DiscountResponse } from '@interfaces/discount';
import { ProductResponse } from '@interfaces/product';
import { AddressResponse } from '@interfaces/userAddress';

// actionsCart | dataCart | Interfaces => cart | cartProvider | Providers
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
    };
    shipping?: {
      data: AddressResponse;
    };
    billing?: {
      data: AddressResponse;
    };
    finalPrice: number;
    totalItems: number;
    totalUniqueItems: number;
    shipping_price: number;
    taxes_price: number;
  };
};

// To move
export type PreviouslyOrderedResponse = {
  item: PreviouslyOrderedItem;
  infos: PreviouslyOrderedInfos;
};
export type PreviouslyOrderedInfos = {
  orderId: string;
  count: number;
  createdAt: string;
};
export type PreviouslyOrderedItem = {
  data: {
    attributes: CartItemProps;
  };
};

//  dataCart | Interfaces => cart
export type CartItemProps = {
  id: number;
  quantity: number;
  price: number;
  total: number;
  product: {
    data: ProductResponse;
  };
};

// addToCart
export type AddToCartProps = {
  localProduct: ProductResponse;
  isIconOnly?: boolean;
};

// cartProduct
export type CartProductProps = {
  cartItem: CartItemProps;
};

// cartClearBtn
export type CartClearBtnProps = {
  id?: string;
};

// checkoutButton
export type CheckoutButtonProps = {
  items: CartItemProps[];
};
