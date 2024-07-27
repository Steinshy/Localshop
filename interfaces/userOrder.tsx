// Interfaces
import { UserResponse } from '@interfaces/user';
import { PagyProps } from '@interfaces/general';
import { ErrorObj } from '@interfaces//httpUtils';
import { AddressResponse } from '@interfaces/userAddress';
import { CartItemProps } from './cart';

// actionsCart | actionsUserOrder | previouslyOrdered | dataOrders | interfaces => userOrders
export type OrderResponse = {
  id: number;
  type: string;

  attributes: {
    id: number;
    total: number;
    createdAt: string;
    updatedAt: string;
    items: CartItemProps[];
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

export type chipColorsProps = {
  [key: string]: 'primary' | 'default' | 'secondary' | 'success' | 'warning' | 'danger' | undefined;
};

// orderCard
export type OrderProductCardProps = {
  item: CartItemProps;
  detailed: boolean;
};

// orderList
export type OrderListProps = {
  items: OrderResponse[];
  pageInfos?: PagyProps;
  pageError?: Error | ErrorObj | string;
};
