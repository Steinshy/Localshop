// NextJS
import { Metadata } from 'next';

// Components
import Breadcrumb from '@components/layout/breadCrumb';
import AddressList from '@components/user/address/addressList';
import { breadCrumbItems } from '@components/layout/breadCrumbItems';

// Actions
import { getAddresses } from '@actions/actionsUserAddress';

export const metadata: Metadata = { title: 'Addresses'};

const AddressesPage = async () => {
  const { data:addresses, pagy, error } = await getAddresses();

  return (
    <div className='max-w-screen-md mx-auto w-full'>
      <Breadcrumb items={breadCrumbItems.user('Addresses')} />
      
      {addresses.length > 0 && !error ? (
        <div className='grid grid-cols-1 gap-3'>
          <AddressList items={addresses} pageInfos={pagy} />
        </div>
      ) : (
        <>
          <h1 className='text-2xl mb-2'>Addresses</h1>
          <div className='flex flex-col flex-grow items-center justify-center'>
            {error ? (
              <>
                <p className='text-md'>There was an error retrieving your addresses</p>
              </>
            ) : (
              <p className='text-md'>No address has been made yet</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AddressesPage;
