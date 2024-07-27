'use client';

// React
import { FC, useContext } from 'react';

// NextJS
import Link from 'next/link';

// NextUI
import { Button, Card, CardBody } from '@nextui-org/react';

// Providers
import { UserContext } from '@providers/userProvider';

// Interfaces
import { PreviouslyOrderedProps } from '@interfaces/product';

const PreviouslyOrdered: FC<PreviouslyOrderedProps> = ({ item, infos }) => {
  const userStore = useContext(UserContext);
  if (!userStore.isLogged()) return null;

  return (
    item &&
    infos && (
      <Card shadow="none" className="border-1">
        <CardBody>
          <div className="flex flex-col sm:flex-row justify-center items-center sm:justify-between gap-2">
            <div>
              <p>Your have ordered this product {infos.count > 1 ? `${infos.count} times` : 'once'}</p>
              <p className="text-foreground/75 text-sm">
                Last ordered {infos.createdAt} ago for {item.data?.attributes.price}
              </p>
            </div>
            <Button as={Link} href={`/user/orders/${infos.orderId}`} size="sm" variant="flat">
              View
            </Button>
          </div>
        </CardBody>
      </Card>
    )
  );
};

export default PreviouslyOrdered;
