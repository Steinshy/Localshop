'use server';

// NextJS
import Link from 'next/link';

// NextUI
import { Button } from '@nextui-org/react';

// Icons
import { FaArrowRight } from 'react-icons/fa';

// Components
import OrderCard from '@components/user/order/orderCard';
import Breadcrumb from '@components/layout/breadCrumb';
import { getOrders } from 'actions';

const OrdersPage = async () => {
  const { data: orders, error } = await getOrders();
  const breadCrumbItems = [{ title: 'User', href: '/user' }, { title: 'Orders' }];

  return (
    <>
      <Breadcrumb items={breadCrumbItems} />
      <h1 className='text-2xl mb-2 text-center'>Orders</h1>

      {orders.length > 0 && !error ? (
        <div className='grid grid-cols-1 gap-3'>
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div className='flex flex-col flex-grow items-center justify-center'>
          {error ? (
            <>
              <p className='text-md'>There was an error retrieving your orders</p>
              <p>{error.message}</p>
            </>
          ) : (
            <>
              <p className='text-md'>No order has been made yet</p>
              <Button
                color='primary'
                variant='flat'
                href='/products'
                as={Link}
                className='mt-4'
                endContent={<FaArrowRight />}
              >
                Start shopping
              </Button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default OrdersPage;
