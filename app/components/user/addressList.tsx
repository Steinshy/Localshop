"use client";

// React
import { FC, useState, useEffect } from "react";

// Components
import AddressCard from "@components/user/addressCard";
import AddressModal from "@components/user/addressModal";

// Interfaces
import { AddressListProps, AddressObj } from "@interfaces/address";

// Utils
import http from "@utils/http";

const AddressList: FC<AddressListProps> = ({ selected, setSelected, selectable = false, items = [] }) => {
  const [addresses, setAddresses] = useState<AddressObj[]>(items);

  const fetch = () => {
    const apiFetch = async () => {
      // fetch request
      const response = await http.get("/addresses");
      const { data } = response.data as { data: AddressObj[] };
      setAddresses(data);
    };

    void apiFetch();
  };

  useEffect(() => {
    if (setSelected) {
      setSelected(addresses.find((address) => address.attributes.default === true)?.id ?? addresses[0]?.id ?? null);
    }
  }, [addresses, setSelected]);

  return (
    <>
      <AddressModal addresses={addresses} fetch={fetch} />
      {addresses.map((address) => (
        <AddressCard
          key={address.id}
          addresses={addresses}
          address={address}
          selectable={selectable}
          selected={selected}
          setSelected={setSelected}
          fetch={fetch}
        />
      ))}
    </>
  );
};

export default AddressList;
