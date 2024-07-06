'use client';

// React
import { FC, useState, useEffect } from 'react';

// Components
import AddressCard from '@components/user/addressCard';
import AddressModal from '@components/user/addressModal';

// Interfaces
import { AddressListProps, AddressResponse, AddressValuesProps } from '@interfaces/address';

// Actions
import { getAddresses, CreateAddress, UpdateAddress, RemoveAddress } from 'actions';

// Utils
import { showToast } from '@utils/helpers';

const AddressList: FC<AddressListProps> = ({ selected, setSelected, selectable = false, items = [] }) => {
  const [addresses, setAddresses] = useState<AddressResponse[]>(items);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (addresses.length === 0) {
  //       const { data, error } = await getAddresses();
  //       if (!error) setAddresses(data);
  //     }
  //   };

  //   void fetchData();
  // }, [addresses.length]);

  const handleCreate = async (newAddress: AddressValuesProps) => {
    const { error:createError } = await CreateAddress(newAddress);
    if (createError) return showToast(createError, 'error');

    showToast('Address has been Created!', 'success');
    const { data, error } = await getAddresses();
    if (!error) setAddresses(data);
  };

  const handleUpdate = async (id: number, newAddress: AddressValuesProps) => {
    const { error:updateError } = await UpdateAddress(id, newAddress);
    if (updateError) return showToast(updateError, 'error');

    showToast('Address has been Updated!', 'success');
    const { data, error } = await getAddresses();
    if (!error) setAddresses(data);
  };

  const handleRemove = async (id: number) => {
    const { error:removeError } = await RemoveAddress(id);
    console.log(removeError);
    if (removeError) return showToast(removeError, 'error');

    showToast('Address has been removed!', 'success');
    const { data, error } = await getAddresses();
    if (!error) setAddresses(data);
  };

  useEffect(() => {
    if (setSelected) {
      setSelected(addresses.find((address) => address.attributes.default === true)?.id ?? addresses[0]?.id ?? null);
    }
  }, [addresses, setSelected]);

  return (
    <>
      <AddressModal addresses={addresses} handleCreate={handleCreate} handleUpdate={handleUpdate} />
      {addresses.map((address) => (
        <AddressCard
          key={address.id}
          addresses={addresses}
          address={address}
          selectable={selectable}
          selected={selected}
          setSelected={setSelected}
          handleCreate={handleCreate}
          handleUpdate={handleUpdate}
          handleRemove={handleRemove}
        />
      ))}
    </>
  );
};

export default AddressList;
