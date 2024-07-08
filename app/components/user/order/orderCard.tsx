// React
import { FC } from 'react';

// NextJS
import Link from 'next/link';

// NextUI
import { Card, CardHeader, CardBody, Chip, Button, Badge, Avatar } from '@nextui-org/react';

// Utils
import { readableDate } from '@utils/helpers';

// Interfaces
import { OrderCardProps } from '@interfaces/userOrder';

const OrderCard: FC<OrderCardProps> = ({ order }) => {
  const { attributes: { id, total, createdAt, totalItems, status, user, items } } = order;
  const { data: { attributes: { firstname, lastname } } } = user;

  return (
    <Card className='border-2 w-full h-full'>
      <CardHeader className='flex items-center justify-between bg-gray-100'>
        <p>Date: {readableDate(createdAt)}</p>
        <p>Total: {total}€</p>
        <p>
          Dispatched to: {lastname} {firstname}
        </p>
        <p>Order ID: {id}</p>
        <Chip size='sm' className='text-white'>
          {status}
        </Chip>
      </CardHeader>

      {/* Multiple Products Cards */}
      <CardBody>
        <div className='flex items-center justify-between'>
          <p className='text-lg'>Products: {totalItems}</p>
          <Button className='text-white' as={Link} href={`/user/orders/${id}`} size='sm' color='primary'>
            Views Details
          </Button>
        </div>
        <div className='flex gap-2 mt-2 p-1'>
          {items.map((item) => {
            const { quantity, product } = item;
            const { data: { id, attributes: {thumbnail: { url } } } } = product;
            return (
              <Badge key={`product_${id}`} content={quantity} color="primary" size='sm'>
                <Avatar
                  radius="md"
                  size="sm"
                  src={url}
                />
              </Badge>
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
};

export default OrderCard;
