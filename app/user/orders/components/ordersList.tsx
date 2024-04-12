"use client";

// React
import { useContext } from "react";

// Components
// import AddressCard from "../../user/components/addressCard";
// import AddressModal from "../../user/components/addressModal";

// Utils
import OrderCard from "./orderCard";
import { UserContext } from "../../../utils/subProviders";

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