'use client';

// React
import { useContext } from "react";

// NextJS
import Link from "next/link";

// NextUI
import { Button } from "@nextui-org/react";

// Icons
import { FaArrowRight } from "react-icons/fa";

// Components
import OrdersList from "@components/user/ordersList";
import Breadcrumb from "@components/layout/breadCrumb";

// Utils
import { UserContext } from "@utils/subProviders";

const OrdersPage = () => {
  const userStore = useContext(UserContext);
  const { orders } = userStore.user;
  const breadCrumbItems = [{ title: "User", href: "/user" }, { title: "Orders" }];

  return (
    <div className="max-w-screen-md mx-auto w-full">
      <Breadcrumb items={breadCrumbItems} />
      <h1 className="text-2xl mb-2 text-center">Orders</h1>

      {orders.length > 0 ? (
        <div className="grid grid-cols-1 gap-3">
          <OrdersList />
        </div>
      ) : (
        <div className="flex flex-col flex-grow items-center justify-center">
          <p className="text-md">No order has been made yet</p>
          <Button
            color="primary"
            variant="flat"
            href="/products"
            as={Link}
            className="mt-4"
            endContent={<FaArrowRight />}
          >
            Start shopping
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
