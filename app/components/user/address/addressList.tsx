'use client';

// React
import { FC, useState, useContext } from 'react';

// NextUI
import { Button, Spinner } from '@nextui-org/react';

// Components
import AddressCard from '@components/user/address/addressCard';
import AddressModal from '@components/user/address/addressModal';
import AddressSearch from '@components/user/address/addressSearch';

// subProviders
import { CartContext } from '@subProviders/cartProvider';

// Interfaces
import { AddressListProps, AddressResponse, AddressValuesProps } from '@interfaces/userAddress';
import { PagyProps } from '@interfaces/general';
import { ErrorObj } from '@interfaces/httpUtils';

// Actions
import { getAddresses, CreateAddress, UpdateAddress, RemoveAddress } from '@actions/actionsUserAddress';

// Utils
import { showToast } from '@utils/helpers';

const AddressList: FC<AddressListProps> = ({ type, selectable = false, items = [], pageInfos, pageError, endContent, title = 'Addresses' }) => {
  const cartStore = useContext(CartContext);
  const { shipping, billing, setShipping, setBilling } = cartStore;

  const [addresses, setAddresses] = useState<AddressResponse[]>(items),
    [isFetching, setIsFetching] = useState<boolean>(false),
    [query, setQuery] = useState<string>(''),
    [pagy, setPagy] = useState<PagyProps>(pageInfos || { page: 1, pages: 1 }),
    [error, setError] = useState<Error | ErrorObj | string | undefined>(pageError);

  const fetch = (page?: number, query?: string) => {
    const apiFetch = async () => {
      const { data, pagy, error } = await getAddresses(page, query);
      setIsFetching(false);
      if (error) {
        setError(error);
        return showToast(error.message, 'error');
      }

      setAddresses(data), setPagy(pagy);
    };

    setIsFetching(true);
    void apiFetch();
  };

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

    if (shipping && shipping.id === id) setShipping(undefined);
    if (billing && billing.id === id) setBilling(undefined);
  };

  const handleClear = () => {
    setQuery('');
    void fetch(1);
  };

  const handlePreviousPage = () => {
    void fetch(pagy.page - 1, query);
  };

  const handleNextPage = () => {
    void fetch(pagy.page + 1, query);
  };

  return (
    <>
      <h2 className='text-2xl'>{title}</h2>
      <div className='grid grid-cols-1 sm:flex items-center gap-2'>
        <div className='grid grid-cols-4 gap-2 sm:flex sm:flex-1'>
          <div className='col-span-3 sm:flex-1'>
            <AddressSearch query={query} setQuery={setQuery} fetch={fetch} handleClear={handleClear} isFetching={isFetching} />
          </div>
          <AddressModal addresses={addresses} handleCreate={handleCreate} handleUpdate={handleUpdate} />
        </div>
        {endContent}
      </div>

      <div className='flex flex-col flex-grow my-4'>
        {addresses.length > 0 && !error && !isFetching ? (
          <div className='grid grid-cols-1 gap-3'>
            {addresses.map((address) => (
              <AddressCard key={`address_${address.id}`} addresses={addresses} address={address} selectable={selectable} type={type} handleCreate={handleCreate} handleUpdate={handleUpdate} handleRemove={handleRemove} />
            ))}
          </div>
        ) : (
          <div className='flex flex-col flex-grow items-center justify-center'>
            {isFetching ? <Spinner color='primary' size='lg' /> : <p className='text-md break-all'>{error ? 'There was an error retrieving your addresses' : query.length > 0 ? `No results for ${query}` : 'No addresses has been added yet'}</p>}
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className='flex justify-between items-center'>
        <Button size='sm' isDisabled={pagy.page <= 1 || isFetching} onPress={handlePreviousPage}>
          Previous
        </Button>
        <p className='text-sm text-foreground/50'>
          Displaying page {pagy.page} of {pagy.pages}
        </p>
        <Button size='sm' isDisabled={pagy.page === pagy.pages || isFetching} onPress={handleNextPage}>
          Next
        </Button>
      </div>
    </>
  );
};

export default AddressList;
