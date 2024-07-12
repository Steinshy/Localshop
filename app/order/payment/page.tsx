// NextJS
import { redirect } from 'next/navigation';

// Actions
import { getCart } from '@actions/actionsCart';

const PaymentPage = async () => {
  const { data:cartData } = await getCart();
  const { attributes: { items, addresses } } = cartData;

  if (items.length <= 0) return redirect('/order');

  const shipping = addresses.find((address) => address.type === 'shipping'),
        billing = addresses.find((address) => address.type === 'billing');
  if (!shipping || !billing) return redirect('/order/shipping');

  return (
    <div className="flex flex-col sm:col-span-7 gap-2">
      <h1 className="text-xl">Payment</h1>
    </div>
  );
}

export default PaymentPage;
