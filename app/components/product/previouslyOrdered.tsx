'use client';

// React
import { FC, useContext, useEffect, useState } from 'react';

// NextJS
import Link from 'next/link';

// NextUI
import { Button, Card, CardBody } from '@nextui-org/react';

// subProviders
import { UserContext } from '@subProviders/userProvider';

// Utils
import { showToast } from '@utils/helpers';

// Actions
import { getPreviouslyOrdered } from '@actions/actionsProducts';

// Interfaces
import { PreviouslyOrderedProps } from '@interfaces/product';
import { PreviouslyOrderedInfos, PreviouslyOrderedItem } from '@interfaces/cart';

const PreviouslyOrdered: FC<PreviouslyOrderedProps> = ({ productId }) => {
  const userStore = useContext(UserContext);
  const { isLogged } = userStore;
  if (!isLogged()) return null;

  const [item, setItem] = useState<PreviouslyOrderedItem>({ data: { attributes: {}} } as PreviouslyOrderedItem),
        [infos, setInfos] = useState<PreviouslyOrderedInfos>({} as PreviouslyOrderedInfos);
  const { data: { attributes: { price } } } = item;
  const { orderId, count, createdAt } = infos || {};

  const handleGetOrders = () => {
    const apiFetch = async () => {
      const { data, error } = await getPreviouslyOrdered(productId.toString());
      console.log(data);
      if (error) return showToast(error.message, 'error');

      setItem(data.item);
      setInfos(data.infos);
    };

    void apiFetch();
  };

  useEffect(() => {
    handleGetOrders();
  }, [productId]);
  
  return (
    <Card shadow='none' className='border-1'>
      <CardBody>
        <div className='flex flex-col sm:flex-row justify-center items-center sm:justify-between gap-2'>
          <div>
            <p>Your have ordered this product {count > 1 ? `${count} times` : 'once'}</p>
            <p className='text-foreground/75 text-sm'>Last ordered on {createdAt} for {price}€</p>
          </div>
          <Button as={Link} href={`/user/orders/${orderId}`} size='sm' variant='flat'>
            View
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default PreviouslyOrdered;
