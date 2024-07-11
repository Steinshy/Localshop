'use client';

import { useEffect, useState } from 'react';
import { getOrders } from '@actions/actionsUserOrders'
import { OrderResponse } from '@interfaces/userOrder';
import OrdersCard from '@components/user/order/orderCard';
import { Button } from '@nextui-org/react';
import { FaCartArrowDown, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';

const OrdersList = () => {
  const [orders, setOrders] = useState<OrderResponse[]>([]);

  const refresh = async () => {
    const { data: orders, error } = await getOrders();
    if (error)
      return (
        <div className='flex flex-col flex-grow items-center justify-center'>
          <p className='text-md'>There was an error retrieving your orders</p>;
        </div>
      );
    if (!error) setOrders(orders);
    if (!orders.length)
      return (
        <div className='flex flex-col flex-grow items-center justify-center'>
          <FaCartArrowDown className='text-8xl text-foreground' />
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
        </div>
      );
  };

  useEffect(() => {
    void refresh();
  }, []);

  return (
    <div className='grid grid-cols-1 gap-3'>
      {orders.map((order) => (
        <OrdersCard key={order.id} order={order} />
      ))}
    </div>
  );
};

export default OrdersList;
