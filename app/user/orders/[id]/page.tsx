"use client";

// React
import { FC, useContext } from "react";

// NextJS
import Link from "next/link";

// NextUI
import { Card, CardBody, Button, Chip } from "@nextui-org/react";

// Icons
import { FaArrowRight } from "react-icons/fa";

// Components
import Breadcrumb from "../../../components/breadCrumb";

// Utils
import { UserContext } from "@/app/utils/subProviders";
import { readableDate } from "@/app/utils/helpers";

// Interfaces
import { OrderPageProps } from "@/app/interfaces/user";

// Components
import OrderProductCard from "@/app/user/orders/components/orderProductCard";
// Data
import { chipColor } from "@/app/data/orders";

const OrdersPage: FC<OrderPageProps> = ({ params }) => {
  const userStore = useContext(UserContext);
  const { orders } = userStore.user;
  const order = orders.find((order) => order.id.toString() === params.id);

  const breadCrumbItems = [
    { title: "User", href: "/user" },
    { title: "Orders", href: "/user/orders" },
    { title: `Order ${params.id}` },
  ];

  return (
    <div className="max-w-screen-md mx-auto w-full">
      <Breadcrumb items={breadCrumbItems} />
      <h1 className="text-2xl mb-2 text-center">Order {params.id}</h1>

      {order ? (
        <div className="grid gap-3">
          <Card className="max-w-[500px]">
            <CardBody>
              <div className="grid grid-cols-1 gap-3">
              <Chip size="sm" className="text-white" color={chipColor(order.status)}>{order.status}</Chip>
                <p className="text-md font-semibold">Payment: {order.paymentType}</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-md">Total: {order.total}€</p>
                <p className="text-md">Date: {readableDate(order.date)}</p>
              </div>
            </CardBody>
          </Card>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-md font-semibold">Products ({order.productsTotal})</p>
            <ul className="grid grid-cols-1 gap-3 mt-2">
              {order.products.map((product) => (
                <OrderProductCard key={product.id} product={product} />
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="flex flex-col flex-grow items-center justify-center">
          <p className="text-md">Order not found</p>
          <Button
            color="primary"
            variant="flat"
            href="/user/orders"
            as={Link}
            className="mt-4"
            endContent={<FaArrowRight />}
          >
            Go back to orders
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
