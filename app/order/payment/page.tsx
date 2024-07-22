// NextJS
import { redirect } from 'next/navigation';

// Actions
import { getCart } from '@actions/actionsCart';

const PaymentPage = async () => {
  const { data:cartData } = await getCart();
  if (!cartData) return;
  const { attributes: { items } } = cartData;

  if (items.length <= 0) return redirect('/order');

  return (
    <div className="flex flex-col flex-1 gap-2">
      <h1 className="text-xl">Payment</h1>
    </div>
  );
}

export default PaymentPage;
