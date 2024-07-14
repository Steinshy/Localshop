import { UserResponse } from '@interfaces/user';
import { ProductResponse } from '@interfaces/product';
import { PagyProps } from './general';
import { ErrorObj } from './httpUtils';
import { AddressResponse } from './userAddress';

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
    shipping: {
      data: AddressResponse;
    }
    billing: {
      data: AddressResponse;
    }
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

export type OrderListProps = {
  items: OrderResponse[];
  pageInfos?: PagyProps;
  pageError?: Error | ErrorObj | string;
}
