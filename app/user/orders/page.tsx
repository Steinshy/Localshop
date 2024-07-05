// NextJS
import Link from "next/link";

// NextUI
import { Button } from "@nextui-org/react";

// Icons
import { FaArrowRight } from "react-icons/fa";

// Components
import OrderCard from "@components/user/orderCard";
import Breadcrumb from "@components/layout/breadCrumb";
import { getOrders } from "actions";

const OrdersPage = async () => {
  const orders = await getOrders();
  const breadCrumbItems = [{ title: "User", href: "/user" }, { title: "Orders" }];

  return (
    <div className="max-w-screen-md mx-auto w-full">
      <Breadcrumb items={breadCrumbItems} />
      <h1 className="text-2xl mb-2 text-center">Orders</h1>

      {orders.length > 0 ? (
        <div className="grid grid-cols-1 gap-3">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
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
