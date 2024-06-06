import { CartItemObj } from "@interfaces/cart";
import { UserResponse } from "@interfaces/user";

type OrdersObj = {
  id: number;

  attributes: {
    status: string;
    total: number;
    // products: CartItemObj[];
  };
};

type OrderPageProps = {
  params: {
    id: string;
  };
};

type OrderCardProps = {
  order: OrdersObj;
  user: UserResponse;
};

type OrderProductCardProps = {
  key: number;
  orderProduct: CartItemObj;
};

export type { OrdersObj, OrderPageProps, OrderCardProps, OrderProductCardProps };
