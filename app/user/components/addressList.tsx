"use client";

import { useContext } from "react";
import { UserContext } from "../..//utils/subProviders";

import AddressCard from "../../user/components/addressCard";
import AddressModal from "../../user/components/addressModal";

export default function AddressList() {
  const userStore = useContext(UserContext);
  const { addresses } = userStore.user;

  return (
    <div className="grid grid-cols-3 gap-3">
      <AddressModal />
      {addresses.map((address) => (
        <AddressCard key={address.id} {...address} />
      ))}
    </div>
  );
}