// NextJS
import { Metadata } from 'next';

// Components
import OrdersList from '@components/user/order/ordersList';
import Breadcrumb from '@components/layout/breadCrumb';

// Actions

export const metadata: Metadata = { title: 'Orders' };

const OrdersPage = () => {
  const breadCrumbItems = [{ title: 'User', href: '/user' }, { title: 'Orders' }];

  return (
    <>
      <Breadcrumb items={breadCrumbItems} />
      <h1 className='text-2xl mb-2'>Orders</h1>
      <OrdersList />
    </>
  );
};

export default OrdersPage;
