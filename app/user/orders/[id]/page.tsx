// React
import { FC } from 'react';

// NextJS
import Link from 'next/link';

// NextUI - Icons
import { Card, CardBody, Button, Chip } from '@nextui-org/react';
import { FaArrowRight } from 'react-icons/fa';

// Components
import Breadcrumb from '@components/layout/breadCrumb';
import OrderProductCard from '@components/user/order/orderProductCard';

// Utils
import { readableDate } from '@utils/helpers';

// Interfaces
import { OrderPageProps } from '@interfaces/userOrder';

// Actions
import { getOrder } from 'actions';

const OrderPage: FC<OrderPageProps> = async ({ params }) => {
  const { data: order, error } = await getOrder(params.id);
  const {
    attributes: { items, total, createdAt, totalItems, status },
  } = order;

  const breadCrumbItems = [
    { title: 'User', href: '/user' },
    { title: 'Orders', href: '/user/orders' },
    { title: `Order ${params.id}` },
  ];

  return (
    <div className='max-w-screen-md mx-auto w-full'>
      <Breadcrumb items={breadCrumbItems} />
      <h1 className='text-2xl mb-2 text-center'>Order {params.id}</h1>

      {/*  Order Details */}
      {order ? (
        <>
          <div className='grid grid-cols-1 gap-3'>
            <Card className='max-w-[500px]'>
              <CardBody>
                <div className='grid grid-cols-1 gap-3'>
                  <Chip size='sm' className='text-white'>
                    {status}
                  </Chip>
                  <p className='text-md font-semibold'>Payment: </p>
                </div>
                <div className='flex items-center justify-between mt-2'>
                  <p className='text-md'>Total: {total}€</p>
                  <p className='text-md'>Date: {readableDate(createdAt)}</p>
                </div>
              </CardBody>
            </Card>

            {/* Address Details */}
            <Card className='max-w-[500px]'>
              <CardBody>
                <div className='grid grid-cols-1 gap-3'>
                  <Chip size='sm' className='text-white'>
                    {status}
                  </Chip>
                  <p className='text-md font-semibold'>Payment: </p>
                </div>
                <div className='flex items-center justify-between mt-2'>
                  <p className='text-md'>Total: {total}€</p>
                  <p className='text-md'>Date: {readableDate(createdAt)}</p>
                </div>
              </CardBody>
            </Card>
          </div>

          <div className='grid grid-cols-1 gap-3'>
            <Card className='max-w-[500px]'>
            <Chip size='sm' className='text-white'>
                Products ({totalItems})
                </Chip>
              <ul className='grid grid-cols-1 gap-3 mt-2'>
                {items.map((orderProduct) => (
                  <OrderProductCard key={orderProduct.id} orderProduct={orderProduct} />
                ))}
              </ul>
            </Card>
          </div>
        </>
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
    </div>
  );
};

export default OrderPage;
