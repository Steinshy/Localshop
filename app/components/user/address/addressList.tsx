'use client';

// React
import { FC, useState } from 'react';

// Components
import AddressCard from '@components/user/address/addressCard';
import AddressModal from '@components/user/address/addressModal';

// Interfaces
import { AddressListProps, AddressResponse, AddressValuesProps } from '@interfaces/address';

// Actions
import { getAddresses, CreateAddress, UpdateAddress, RemoveAddress } from 'actions';

// Utils
import { showToast } from '@utils/helpers';

const AddressList: FC<AddressListProps> = ({ selectable = false, type, items = [] }) => {
  const [addresses, setAddresses] = useState<AddressResponse[]>(items);

  const refresh = async() => {
    const { data, error } = await getAddresses();
    if (!error) setAddresses(data);
  }

  const handleCreate = async (newAddress: AddressValuesProps) => {
    const { error:createError } = await CreateAddress(newAddress);
    if (createError?.items) return createError.items;

    showToast('Address has been Created!', 'success');
    void refresh();

    return;
  };

  const handleUpdate = async (id: string, newAddress: AddressValuesProps) => {
    const { error:updateError } = await UpdateAddress(id, newAddress);
    if (updateError?.items) return updateError.items;

    showToast('Address has been Updated!', 'success');
    void refresh();

    return;
  };

  const handleRemove = async (id: string) => {
    const { error:removeError } = await RemoveAddress(id);
    if (removeError) return showToast(removeError.message, 'error');

    showToast('Address has been removed!', 'success');
    void refresh();
  };

  return (
    <>
      <AddressModal addresses={addresses} handleCreate={handleCreate} handleUpdate={handleUpdate} />
      {addresses.map((address) => (
        <AddressCard
          key={address.id}
          addresses={addresses}
          address={address}
          selectable={selectable}
          type={type}
          handleCreate={handleCreate}
          handleUpdate={handleUpdate}
          handleRemove={handleRemove}
        />
      ))}
    </>
  );
};

export default AddressList;
