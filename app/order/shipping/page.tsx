// NextJS
import { redirect } from 'next/navigation';

// Components
import CartShipping from '@components/cart/cartShipping';

// Actions
import { getAddresses } from '@actions/actionsUserAddress';
import { getCart } from '@actions/actionsCart';

const ShippingPage = async () => {
  const { data:cartData } = await getCart();
  if (!cartData) return;
  const { attributes: { items } } = cartData;

  if (items.length <= 0) return redirect('/order');

  const { data, pagy } = await getAddresses(1);

  return (
    <div className="flex flex-col flex-1 gap-2">
      <CartShipping items={data} pageInfos={pagy} />
    </div>
  );
};

export default ShippingPage;
