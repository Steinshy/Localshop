'use client';

// React
import { FC, useState, useContext } from 'react';

// NextUI
import { Button, Input } from '@nextui-org/react';

// Components
import AddressCard from '@components/user/address/addressCard';
import AddressModal from '@components/user/address/addressModal';

// Icons
import { FaSearch } from 'react-icons/fa';

// Interfaces
import { AddressListProps, AddressResponse, AddressValuesProps } from '@interfaces/userAddress';

// Actions
import { getAddresses, CreateAddress, UpdateAddress, RemoveAddress } from '@actions/actionsUserAddress';

// Utils
import { showToast } from '@utils/helpers';
import { CartContext } from '@utils/subProviders';
import { PagyProps } from '@interfaces/general';

const AddressList: FC<AddressListProps> = ({ type, selectable = false, items = [], pageInfos, title = 'Addresses' }) => {
  const cartStore = useContext(CartContext);
  const { selectedAddresses, setSelectedAddresses } = cartStore;
  const [addresses, setAddresses] = useState<AddressResponse[]>(items),
        [isFetching, setIsFetching] = useState<boolean>(false),
        [query, setQuery] = useState<string>(''),
        [pagy, setPagy] = useState<PagyProps>(pageInfos || { page: 1, pages: 1 });

  const fetch = (page?: number, query?: string) => {
    const apiFetch = async () => {
      const { data, pagy, error } = await getAddresses(page, query);
      setIsFetching(false);
      if (error) return showToast(error.message, 'error');
      setAddresses(data);
      setPagy(pagy);
    }

    setIsFetching(true);
    void apiFetch();
  }

  const handleCreate = async (newAddress: AddressValuesProps) => {
    const { error } = await CreateAddress(newAddress);
    if (error?.items) return error.items;

    showToast('Address has been Created!', 'success');
    void fetch();

    return;
  };

  const handleUpdate = async (id: string, newAddress: AddressValuesProps) => {
    const { error } = await UpdateAddress(id, newAddress);
    if (error?.items) return error.items;

    showToast('Address has been Updated!', 'success');
    void fetch();

    return;
  };

  const handleRemove = async (id: string) => {
    const { error } = await RemoveAddress(id);
    if (error) return showToast(error.message, 'error');

    showToast('Address has been removed!', 'success');
    void fetch();

    const index = selectedAddresses.findIndex(item => item.id.toString() === id);
    if (index !== -1) {
      const newSelectedAddresses = [...selectedAddresses];
      delete newSelectedAddresses[index];
      setSelectedAddresses(newSelectedAddresses);
    }
  };

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    void fetch(1, query);
  };

  const handleClear = () => {
    setQuery('');
    void fetch(1);
  };

  const handlePreviousPage = () => {
    void fetch(pagy.page - 1, query);
  }

  const handleNextPage = () => {
    void fetch(pagy.page + 1, query);
  }

  return (
    <>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl'>{title}</h2>
        {/* Search form */}
        <form onSubmit={handleSearch} className='flex flex-grow justify-center items-center px-2'>
          <Input
            aria-label='Search'
            placeholder='Type...'
            type='search'
            value={query}
            onValueChange={setQuery}
            onClear={handleClear}
            startContent={<FaSearch />}
            size='md'
            className='max-w-screen-2xl'
            isDisabled={isFetching}
            isClearable
          />
        </form>
        <AddressModal addresses={addresses} handleCreate={handleCreate} handleUpdate={handleUpdate} />
      </div>
      
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

      {/* Pagination */}
      <div className='flex justify-between items-center'>
        <Button size='sm' isDisabled={pagy.page <= 1 || isFetching} onPress={handlePreviousPage}>Previous</Button>
        <p className='text-sm text-foreground/50'>Displaying page {pagy.page} of {pagy.pages}</p>
        <Button size='sm' isDisabled={pagy.page === pagy.pages || isFetching} onPress={handleNextPage}>Next</Button>
      </div>
    </>
  );
};

export default AddressList;
