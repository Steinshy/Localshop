'use client';

// React
import { FC, useContext } from "react";

// NextJS
import Link from "next/link";

// NextUI
import { Button, Image } from "@nextui-org/react";

// Icons
import { FaArrowRight } from "react-icons/fa";

// Components
import Breadcrumb from "../../../components/breadCrumb";

// Utils
import { UserContext } from "@/app/utils/subProviders";

// Interfaces
import { generateSlug } from "@/app/utils/interfaces";

interface OrdersPageProps {
  params: {
    id: string;
  };
}

const OrdersPage:FC<OrdersPageProps> = ({ params }) => {
  const userStore = useContext(UserContext);
  const { orders } = userStore.user;
  const order = orders.find((order) => order.id.toString() === params.id);

  const breadCrumbItems = [{ title: "User", href: "/user" }, { title: "Orders", href: "/user/orders" }, { title: `Order ${params.id}` }];

  return (
    <div className="max-w-screen-md mx-auto w-full">
      <Breadcrumb items={breadCrumbItems} />
      <h1 className="text-2xl mb-2">Order {params.id}</h1>
      
      {order ? (
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <p className="text-md font-semibold">Order ID: {order.id}</p>
                <p className="text-md font-semibold">Status: {order.status}</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-md">Total: ${order.total}</p>
                <p className="text-md">Date: {order.date}</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-md font-semibold">Products</p>
              <ul className="grid grid-cols-1 gap-3 mt-2">
                {order.products.map((product) => {
                  const slug = generateSlug(product.title);
                  return (
                    <li key={product.id} className="p-2 bg-background border-1 rounded-md">
                      <div className="grid grid-cols-2">
                        <div className="flex justify-start items-center">
                          <Link href={`/products/${product.id}/${slug}`}>
                            <Image
                              src={product.thumbnail}
                              alt={product.title}
                              classNames={{
                                img: "w-16 h-16 object-cover",
                                wrapper: "mr-4",
                              }}
                              radius="md"
                              shadow="none"
                            />
                          </Link>
                          <p className="text-lg text-foreground font-semibold">{product.title}</p>
                        </div>
                      </div>
                      {/* Single item information */}
                      <hr className="my-4" />
                
                      <div className="grid grid-cols-3 gap-4">
                        <p className="text-md text-foreground/50">Price</p>
                        <p className="text-md text-foreground/50">Quantity</p>
                        <p className="text-md text-foreground/50">Total</p>
                      </div>
                
                      <div className="grid grid-cols-3 gap-4">
                        <p className="text-lg text-foreground">{product.price}€</p>
                        <p className="text-lg text-foreground">{product.quantity}</p>
                        <p className="text-lg text-foreground">{product.price * product.quantity}€</p>
                      </div>
                    </li>
                  )
                })}
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
        )
      }
    </div>
  );
};

export default OrdersPage;
