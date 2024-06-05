"use client";

// React
import { FC, useState } from "react";

// Components
import AddressCard from "@components/user/addressCard";
import AddressModal from "@components/user/addressModal";

// Interfaces
import { AddressListProps, AddressAttr } from "@interfaces/user";

const AddressList: FC<AddressListProps> = ({ selected, setSelected, selectable = false, items = [] }) => {
  const [addresses, setAddresses] = useState(items);

  const AddAddress = (values: AddressAttr) => {
    const apiFetch = async () => {
      // Add request
      console.log(values);
    }

    void apiFetch();
  }

  const updateAddress = (id: string, values: AddressAttr) => {
    const apiFetch = async () => {
      // Update request
      console.log(values);
    }

    void apiFetch();
  }

  const removeAddress = (id: string) => {
    const apiFetch = async () => {
      // Remove request
      console.log(id);
    }

    void apiFetch();
  }

  // useEffect(() => {
  //   if (setSelected) {
  //     setSelected(addresses.find((address) => address.default === true)?.id ?? addresses[0]?.id ?? null);
  //   }
  // }, [addresses, setSelected]);

  return (
    <>
      <AddressModal addresses={addresses} AddAddress={AddAddress} updateAddress={updateAddress} />
      {addresses.map((address) => (
        <AddressCard
          key={address.id}
          addresses={addresses}
          address={address}
          selectable={selectable}
          selected={selected}
          setSelected={setSelected}
          AddAddress={AddAddress}
          updateAddress={updateAddress}
          removeAddress={removeAddress}
        />
      ))}
    </>
  );
};

export default AddressList;
