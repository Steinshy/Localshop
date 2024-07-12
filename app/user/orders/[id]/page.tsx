// React
import { FC } from 'react';

// NextJS
import { Metadata } from 'next';
import Link from 'next/link';

// NextUI
import { Button } from '@nextui-org/react';

// Icons
import { FaArrowRight } from 'react-icons/fa';

// Components
import OrderCard from '@components/user/order/orderCard';

// Interfaces
import { OrderPageProps } from '@interfaces/userOrder';

// Actions
import { getOrder } from '@actions/actionsUserOrders';

type MetaProps = { params: { id: string } }
 
export async function generateMetadata({ params }: MetaProps): Promise<Metadata> {
  const { data } = await getOrder(params.id);
  const { id } = data;
  return { title: `Order #${id}` }
}

const OrderPage: FC<OrderPageProps> = async ({ params }) => {
  const { data: order } = await getOrder(params.id);

  return (
    <>
      <h1 className='text-2xl mb-2'>Order #{order.id}</h1>

      {/*  Order Details */}
      {order ? (
        <OrderCard order={order} detailed />
      ) : (
        <div className='flex flex-col gap-2'>
          <p className='text-lg'>Order not found</p>
          <Button
            color='primary'
            variant='flat'
            href='/user/orders'
            as={Link}
            className='mt-4'
            endContent={<FaArrowRight />}
          >
            Go back to orders
          </Button>
        </div>
      )}
    </>
  );
};

export default OrderPage;
