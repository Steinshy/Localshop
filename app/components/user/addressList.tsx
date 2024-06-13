"use client";

// React
import { FC, useState, useEffect } from "react";

// Components
import AddressCard from "@components/user/addressCard";
import AddressModal from "@components/user/addressModal";

// Interfaces
import { AddressListProps, AddressObj, AddressValuesProps } from "@interfaces/address";

// Actions
import { getAddresses, handleRemoveAddress, handleUpdateAddress } from "actions";

const AddressList: FC<AddressListProps> = ({ selected, setSelected, selectable = false, items = [] }) => {
  const [addresses, setAddresses] = useState<AddressObj[]>(items);

  useEffect(() => {
    if (addresses.length === 0) {
      void fetch();
    }
  }, []);

  const fetch = async () => {
    const data = await getAddresses();
    setAddresses(data);
  };

  const handleRemove = async (id: number) => {
    const data = await handleRemoveAddress(id);
    setAddresses(data);
  };

  const handleUpdate = async (id: number, newAddress: AddressValuesProps) => {
    const data = await handleUpdateAddress(id, newAddress);
    setAddresses(data);
  };

  useEffect(() => {
    if (setSelected) {
      setSelected(addresses.find((address) => address.attributes.default === true)?.id ?? addresses[0]?.id ?? null);
    }
  }, [addresses, setSelected]);

  return (
    <>
      <AddressModal 
        addresses={addresses} 
        fetch={fetch} 
        handleUpdate={handleUpdate} 
        />
      {addresses.map((address) => (
        <AddressCard
          key={address.id}
          addresses={addresses}
          address={address}
          selectable={selectable}
          selected={selected}
          setSelected={setSelected}
          fetch={fetch}
          handleUpdate={handleUpdate}
          handleRemove={handleRemove}
        />
      ))}
    </>
  );
};

export default AddressList;
