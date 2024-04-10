"use client";

// React
import { FC, useContext } from "react";

// Components
import AddressCard from "../../user/components/addressCard";
import AddressModal from "../../user/components/addressModal";

// Utils
import { UserContext } from "../..//utils/subProviders";

interface AddressListProps {
  selected?: number|null,
  setSelected?: (id:number) => void,
  selectable?: boolean
}

const AddressList:FC<AddressListProps> = ({ selected, setSelected, selectable = false }) => {
  const userStore = useContext(UserContext);
  const { addresses } = userStore.user;

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