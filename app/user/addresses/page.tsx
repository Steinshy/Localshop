// NextJS
import { Metadata } from 'next';

// Components
import Breadcrumb from '@components/layout/breadCrumb';
import AddressList from '@components/user/address/addressList';

// Actions
import { getAddresses } from 'actions';

export const metadata: Metadata = { title: 'Addresses'};

const AddressesPage = async () => {
  const { data:addresses, error } = await getAddresses();
  const breadCrumbItems = [{ title: "User", href: "/user" }, { title: "Addresses" }];

  return (
    <div className='max-w-screen-md mx-auto w-full'>
      <Breadcrumb items={breadCrumbItems} />
      <h1 className='text-2xl mb-2'>Addresses</h1>
      {addresses.length > 0 && !error ? (
        <div className='grid grid-cols-1 gap-3'>
          <AddressList items={addresses} />
        </div>
      ) : (
        <div className='flex flex-col flex-grow items-center justify-center'>
          {error ? (
            <>
              <p className='text-md'>There was an error retrieving your addresses</p>
            </>
          ) : (
            <p className='text-md'>No address has been made yet</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AddressesPage;
