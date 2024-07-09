// React
import { FC } from 'react';

// NextJS
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Icons
import { FaArrowRight } from 'react-icons/fa';

// NextUi
import { Button } from '@nextui-org/react';

// Interface
import { OrderProcessButtonProps } from '@interfaces/cart';

const OrderProcessButton: FC<OrderProcessButtonProps> = ({ items }) => {
  const pathname = usePathname();
  const pathMappings: { [key: string]: { text: string; nextPath: string } } = {
    '/order': { text: 'Proceed to Shipping', nextPath: '/order/shipping' },
    '/order/shipping': { text: 'Proceed to Payment', nextPath: '/order/payment' },
    '/order/payment': { text: 'Return to Cart', nextPath: '/order' },
  };

  const { text, nextPath } = pathMappings[pathname] || { text: 'Proceed to Payment', nextPath: '/order/payment' };

  return (
    <Button
      color='success'
      variant='solid'
      href={nextPath}
      as={Link}
      endContent={<FaArrowRight />}
      className='text-white col-span-2'
      size='lg'
      radius='sm'
      isDisabled={items.length < 1}
    >
      {text}
    </Button>
  );
};

export default OrderProcessButton;
