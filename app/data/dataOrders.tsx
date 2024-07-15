// Interface
import { OrderResponse, OrderItem } from '@interfaces/userOrder';

// Data
import { defaultAddress } from '@data/dataAddress';
import { defaultUser } from '@data/dataUser';
import { defaultProduct } from '@data/dataProduct';

// defaultOrder => items
const orderItem: OrderItem = {
  id: 0,
  quantity: 0,
  price: 0,
  product: {
    data: defaultProduct,
  },
};

export const defaultOrder: OrderResponse = {
  id: 0,
  type: '',
  attributes: {
    id: 0,
    total: 0,
    createdAt: '',
    updatedAt: '',
    items: [orderItem],
    totalItems: 0,
    totalUniqueItems: 0,
    status: '',
    user: {
      data: defaultUser,
    },
    shipping: {
      data: defaultAddress,
    },
    billing: {
      data: defaultAddress,
    },
  },
};
