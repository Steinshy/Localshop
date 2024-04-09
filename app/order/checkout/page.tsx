"use client";

import { Divider } from "@nextui-org/react";
import AddressList from "../../user/components/addressList";

export default function Checkout() {

  return (
    <div className="flex flex-col col-span-1 lg:col-span-2">
      <div className="flex flex-col col-span-1 lg:col-span-2">
        <h2 className="text-xl">Shipping Address</h2>

        <AddressList />
      </div>

      <Divider className="my-2" />

      <div className="flex flex-col col-span-1 lg:col-span-2">
        <h2 className="text-xl">Billing Address</h2>

        <AddressList />
      </div>
    </div>
  );
}
