// NextJS
import { redirect } from 'next/navigation';

// NextUI
import { Divider } from "@nextui-org/react";

// Components
import AddressList from "@components/user/address/addressList";

// Actions
import { getAddresses } from '@actions/actionsUserAddress';
import { getCart } from '@actions/actionsCart';

const ShippingPage = async () => {
  const { data:cartData } = await getCart();
  const { attributes: { items } } = cartData;

  if (items.length <= 0) return redirect('/order');

  const { data } = await getAddresses();

  return (
    <div className="flex flex-col sm:col-span-7 gap-2">
      <h2 className="text-2xl mb-4">Shipping Address</h2>
      <div className="grid grid-cols-1 gap-3">
        <AddressList items={data} selectable type='shipping' />
      </div>

      <Divider className="my-4" />

      <h2 className="text-2xl mb-4">Billing Address</h2>
      <div className="grid grid-cols-1 gap-3">
        <AddressList items={data} selectable type='billing' />
      </div>
    </div>
  );
};

export default ShippingPage;
