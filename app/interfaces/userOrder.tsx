// Interfaces
import { UserResponse } from '@interfaces/user';
import { ProductResponse } from '@interfaces/product';
import { PagyProps } from '@interfaces/general';
import { ErrorObj } from '@interfaces//httpUtils';
import { AddressResponse } from '@interfaces/userAddress';

// actionsCart | actionsUserOrder | previouslyOrdered | dataOrders | interfaces => userOrders
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
    };
    billing: {
      data: AddressResponse;
    };
  };
};

// previouslyOrdered | dataOrders | interfaces => userOrders
export type OrderItem = {
  id: number;
  quantity: number;
  price: number;
  product: {
    data: ProductResponse;
  };
};

// orderPage
export type OrderPageProps = {
  params: {
    id: string;
  };
};

// orderPage
export type OrderCardProps = {
  order: OrderResponse;
  detailed?: boolean;
};

// orderProduct
export type OrderProductCardProps = {
  orderProduct: OrderItem;
};

// orderList
export type OrderListProps = {
  items: OrderResponse[];
  pageInfos?: PagyProps;
  pageError?: Error | ErrorObj | string;
};
