import { UserResponse } from "@interfaces/user";
import { ProductResponse } from "./product";

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
    }
  }
};

type OrderItem = {
  id: number;
  quantity: number;
  price: number;
  product: {
    data: ProductResponse;
  }
}

type OrderPageProps = {
  params: {
    id: string;
  };
};

type OrderCardProps = {
  order: OrderResponse;
}

export type { OrderItem, OrderResponse, OrderPageProps, OrderCardProps };
