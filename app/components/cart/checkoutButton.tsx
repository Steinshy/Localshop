'use client';

// React
import { FC, useContext } from 'react';

// NextJS
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Icons
import { FaArrowRight } from 'react-icons/fa';

// NextUi
import { Button } from '@nextui-org/react';

// Interface
import { CheckoutButtonProps } from '@interfaces/cart';
import { CartContext } from '@utils/subProviders';

const CheckoutButton: FC<CheckoutButtonProps> = ({ items }) => {
  const pathname = usePathname(), cartStore = useContext(CartContext);
  const pathMappings: { [key: string]: { text: string; nextPath: string } } = {
    '/order': { text: 'Proceed to Shipping', nextPath: '/order/shipping' },
    '/order/shipping': { text: 'Proceed to Payment', nextPath: '/order/payment' },
    '/order/payment': { text: 'Return to Cart', nextPath: '/order' },
  };

  const { text, nextPath } = pathMappings[pathname] || { text: 'Proceed to Payment', nextPath: '/order/payment' };
  const { data: { attributes: { addresses } } } = cartStore;

  const isDisabled = (): boolean => {
    if (nextPath !== '/order/payment') return false;
    if (addresses.length <= 0) return true;
    
    const shipping = addresses.find((address) => address.type === 'shipping'),
          billing = addresses.find((address) => address.type === 'billing');
    if (!shipping || !billing) return true;

    return false;
  }

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
      isDisabled={items.length < 1 || isDisabled()}
    >
      {text}
    </Button>
  );
};

export default CheckoutButton;
