"use client";

// React
import { FC, useEffect, useContext } from "react";

// Components
import AddressCard from "./addressCard";
import AddressModal from "./addressModal";

// Utils
import { UserContext } from "../../../utils/subProviders";

// Interfaces
import { AddressListProps } from "../../../interfaces/user";

const AddressList:FC<AddressListProps> = ({ selected, setSelected, selectable = false }) => {
  const userStore = useContext(UserContext);
  const { addresses } = userStore.user;

  useEffect(() => {
    if (setSelected) {
      setSelected(addresses.find((address) => address.default === true)?.id ?? addresses[0]?.id ?? null);
    }
  }, [addresses, setSelected]);

  return (
    <>
      <AddressModal />
      {addresses.map((address) => (
        <AddressCard
          key={address.id}
          address={address}
          selectable={selectable}
          selected={selected}
          setSelected={setSelected}
        />
      ))}
    </>
  );
}

export default AddressList;
