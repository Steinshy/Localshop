import { UserResponse } from '@interfaces/user';
import { ProductResponse } from '@interfaces/product';

type OrderResponse = {
  id: number;
  type: string;

  attributes: {
    id: number;
    total: number;
    createdAt: string;
    updatedAt: string;
    items: OrderItem[];
    totalItems: number;
    totalUniqueItems: number;
    status: string;
    user: {
      data: UserResponse;
    };
  };
};

type GetOrdersResponse = {
  data: OrderResponse[];
};

type GetOrderResponse = {
  data: OrderResponse;
};

type OrderItem = {
  id: number;
  quantity: number;
  price: number;
  product: {
    data: ProductResponse;
  };
};

type OrderPageProps = {
  params: {
    id: string;
  };
};

type OrderCardProps = {
  order: OrderResponse;
  detailed?: boolean;
};

type OrderProductCardProps = {
  orderProduct: OrderItem;
};

export type {
  OrderItem,
  GetOrdersResponse,
  GetOrderResponse,
  OrderResponse,
  OrderPageProps,
  OrderCardProps,
  OrderProductCardProps,
};
