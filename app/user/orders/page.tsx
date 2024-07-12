// NextJS
import { Metadata } from 'next';

// Components
import Breadcrumb from '@components/layout/breadCrumb';
import OrdersList from '@components/user/order/ordersList';
import { breadCrumbItems } from '@components/layout/breadCrumbItems';

export const metadata: Metadata = { title: 'Orders' };

const OrdersPage = () => {

  return (
    <>
      <Breadcrumb items={breadCrumbItems.user('Orders')} />
      <h1 className='text-2xl mb-2'>Orders</h1>
      <OrdersList />
    </>
  );
};

export default OrdersPage;
