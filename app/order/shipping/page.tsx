"use client";

// React
import { useState } from "react";

// NextUI
import { Divider } from "@nextui-org/react";

// Components
import AddressList from "@components/user/addressList";

const ShippingPage = () => {
  const [selectedShippingAddressId, setSelectedShippingAddressId] = useState<number | null>(1);
  const [selectedBillingAddressId, setSelectedBillingAddressId] = useState<number | null>(1);

  return (
    <div className="flex flex-col col-span-1 lg:col-span-2">
      <h2 className="text-2xl mb-4">Shipping Address</h2>
      <div className="grid grid-cols-1 gap-3">
        <AddressList selected={selectedShippingAddressId} setSelected={setSelectedShippingAddressId} selectable />
      </div>

      <Divider className="my-4" />

      <h2 className="text-2xl mb-4">Billing Address</h2>
      <div className="grid grid-cols-1 gap-3">
        <AddressList selected={selectedBillingAddressId} setSelected={setSelectedBillingAddressId} selectable />
      </div>
    </div>
  );
};

export default ShippingPage;
