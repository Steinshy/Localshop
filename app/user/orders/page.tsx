// NextJS
import { Metadata } from 'next';

// Components
import OrdersList from '@components/user/order/ordersList';

export const metadata: Metadata = { title: 'Orders' };

const OrdersPage = () => {

  return (
    <>
      <h1 className='text-2xl mb-2'>Orders</h1>
      <OrdersList />
    </>
  );
};

export default OrdersPage;
