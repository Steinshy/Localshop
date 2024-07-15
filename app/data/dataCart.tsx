// Interfaces
import { CartItemProps, CartResponse } from '@interfaces/cart';

// Data
import { defaultAddress } from '@data/dataAddress';
import { defaultDiscount } from '@data/dataDiscount';
import { defaultProduct } from '@data/dataProduct';

// defaultCart => items
const defaultCartItem: CartItemProps = {
  id: 0,
  quantity: 0,
  price: 0,
  product: {
    data: defaultProduct,
  },
};

export const defaultCart: CartResponse = {
  id: '',
  type: '',

  attributes: {
    id: 0,
    createdAt: '',
    updatedAt: '',
    items: [defaultCartItem],
    coupon: {
      data: defaultDiscount,
    },
    shipping: {
      data: defaultAddress,
    },
    billing: {
      data: defaultAddress,
    },
    finalPrice: 0,
    totalItems: 0,
    totalPrice: 0,
    totalUniqueItems: 0,
    shipping_price: 0,
    taxes_price: 0,
  },
};
