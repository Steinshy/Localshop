"use client";

// React
import { FC, useState } from "react";

// NextUI
import { Divider } from "@nextui-org/react";

// Components
import AddressList from "../../user/addresses/components/addressList";

const Shipping: FC = () => {
  const [selectedShippingAddressId, setSelectedShippingAddressId] = useState<number | null>(1);
  const [selectedBillingAddressId, setSelectedBillingAddressId] = useState<number | null>(1);

  return (
    <div className="flex flex-col col-span-1 lg:col-span-2 px-2 w-full">
      <h2 className="text-2xl mb-4">Shipping Address</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        <AddressList selected={selectedShippingAddressId} setSelected={setSelectedShippingAddressId} selectable />
      </div>

      <Divider className="my-4" />

      <h2 className="text-2xl mb-4">Billing Address</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        <AddressList selected={selectedBillingAddressId} setSelected={setSelectedBillingAddressId} selectable />
      </div>
    </div>
  );
};

export default Shipping;
