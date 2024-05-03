"use client";

// React
import { useContext } from "react";

// Components
import OrderCard from "./orderCard";

// Utils
import { UserContext } from "@/app/utils/subProviders";

const OrdersList = () => {
  const userStore = useContext(UserContext);
  const { orders } = userStore.user;

  return (
    <>
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
        />
      ))}
    </>
  );
}

export default OrdersList;