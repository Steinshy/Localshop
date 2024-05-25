'use client';

// React
import { useContext } from "react";

// Components
import OrderCard from "@components/user/orderCard";

// Utils
import { UserContext } from "@utils/subProviders";

const OrdersList = () => {
  const userStore = useContext(UserContext);
  const { orders } = userStore.user;

  return (
    <>
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          user={userStore.user}
        />
      ))}
    </>
  );
}

export default OrdersList;