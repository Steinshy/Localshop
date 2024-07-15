// NextJS
import { Metadata } from 'next';

// Components
import AddressList from '@components/user/address/addressList';

// Actions
import { getAddresses } from '@actions/actionsUserAddress';

export const metadata: Metadata = { title: 'Addresses' };

const AddressesPage = async () => {
  const { data: addresses, pagy, error } = await getAddresses();
  return <AddressList items={addresses} pageInfos={pagy} pageError={error} endContent={<></>} />;
};

export default AddressesPage;
