'use client';

// React
import { FC, useContext, useEffect, useState } from 'react';

// NextJS
import Link from 'next/link';

// NextUI
import { Button, Card, CardBody } from '@nextui-org/react';

// Utils
import { UserContext } from '@subProviders/userProvider';
import { showToast } from '@utils/helpers';

// Actions
import { getPreviouslyOrdered } from '@actions/actionsUserOrders';

// Interfaces
import { PreviouslyOrderedProps } from '@interfaces/product';
import { OrderItem, OrderResponse } from '@interfaces/userOrder';

const PreviouslyOrdered: FC<PreviouslyOrderedProps> = ({ productId }) => {
  const [orders, setOrders] = useState<OrderResponse[]>([]),
        [checked, setChecked] = useState<boolean>(false),
        userStore = useContext(UserContext);
  const { isLogged } = userStore;

  useEffect(() => {
    const apiFetch = async () => {
      const { data, error } = await getPreviouslyOrdered(productId.toString());
      setChecked(true);
      if (error) return showToast(error.message, 'error');
      setOrders(data);
    };

    if (isLogged() && !checked) void apiFetch();
  }, [isLogged, productId, checked]);

  const getLastOrderInfos = (): { date?: string; price?: number; } => {
    const { attributes: { items, createdAt } } = orders[0];
    const orderItem = items.find((item: OrderItem) => item.product.data.id === productId.toString());
    return { date: createdAt, price: orderItem?.price };
  };

  return (
    isLogged() &&
    orders.length > 0 && (
      <Card shadow='none' className='border-1'>
        <CardBody>
          <div className='flex flex-col sm:flex-row justify-center items-center sm:justify-between gap-2'>
            <div>
              <p>Your ordered this product {orders.length > 1 ? `${orders.length} times` : 'once'}</p>
              <p className='text-foreground/75 text-sm'>
                Last ordered on {getLastOrderInfos().date} for {getLastOrderInfos().price}€
              </p>
            </div>
            <Button as={Link} href={`/user/orders/${orders[0].id}`} size='sm' variant='flat'>
              View
            </Button>
          </div>
        </CardBody>
      </Card>
    )
  );
};

export default PreviouslyOrdered;
