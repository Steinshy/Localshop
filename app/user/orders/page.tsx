"use client";

import { useContext } from "react";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import Breadcrumb from "../../components/breadCrumb";
import { UserContext } from "../../utils/subProviders";

const OrdersPage = () => {
  const userStore = useContext(UserContext);
  const breadCrumbItems = [{ title: "User", href: "/user" }, { title: "Orders" }];
  console.log("userStore" , userStore)
  return (
    <>
      <Breadcrumb items={breadCrumbItems} />

      <div className="flex flex-col flex-grow items-center justify-center">
        <h1 className="text-md text-heading xl:text-lg lg:text-md">No order has been made yet</h1>
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
    </>
  );
};

export default OrdersPage;
