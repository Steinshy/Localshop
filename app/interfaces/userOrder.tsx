import { UserResponse } from '@interfaces/user';
import { ProductResponse } from '@interfaces/product';

export type OrderResponse = {
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

export type OrderItem = {
  id: number;
  quantity: number;
  price: number;
  product: {
    data: ProductResponse;
  };
};

export type OrderPageProps = {
  params: {
    id: string;
  };
};

export type OrderCardProps = {
  order: OrderResponse;
  detailed?: boolean;
};

export type OrderProductCardProps = {
  orderProduct: OrderItem;
};
