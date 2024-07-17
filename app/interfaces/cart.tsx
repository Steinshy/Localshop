// Interface
import { DiscountResponse } from '@interfaces/discount';
import { ProductResponse } from '@interfaces/product';
import { CartContextType } from '@interfaces/subProviders';
import { AddressResponse } from '@interfaces/userAddress';

// actionsCart | dataCart | Interfaces => cart | cartProvider | subProviders
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
    shipping?: {
      data: AddressResponse;
    }
    billing?: {
      data: AddressResponse;
    }
    finalPrice: number;
    totalItems: number;
    totalUniqueItems: number;
    shipping_price: number;
    taxes_price: number;
  };
};

//  dataCart | Interfaces => cart
export type CartItemProps = {
  id: number;
  quantity: number;
  price: number;
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
  cartStore: CartContextType;
};

// checkoutButton
export type CheckoutButtonProps = {
  items: CartItemProps[];
};
