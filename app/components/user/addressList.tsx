"use client";

// React
import { FC, useState, useEffect, useContext } from "react";

// Components
import AddressCard from "@components/user/addressCard";
import AddressModal from "@components/user/addressModal";

// Utils
import { UserContext } from "@utils/subProviders";

// Interfaces
import { AddressListProps } from "@interfaces/user";

const AddressList: FC<AddressListProps> = ({ selected, setSelected, selectable = false }) => {
  const [addresses, setAddresses] = useState([]);
  const userStore = useContext(UserContext);
  console.log(addresses, "addresses")

  useEffect(() => {
    setAddresses(userStore.getAddress());
  }, []);

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
};

export default AddressList;
