'use client';

// React
import { FC, useContext } from 'react';

// NextJS
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

// Icons
import { FaArrowRight } from 'react-icons/fa';

// NextUI
import { Button } from '@nextui-org/react';

// Utils
import { CartContext } from '@subProviders/cartProvider';
import { showToast } from '@utils/helpers';

// Actions
import { placeOrder } from '@actions/actionsCart';

// Interface
import { CheckoutButtonProps } from '@interfaces/cart';

const CheckoutButton: FC<CheckoutButtonProps> = ({ items }) => {
  const pathname = usePathname(), cartStore = useContext(CartContext),
        router = useRouter();
  const pathMappings: { [key: string]: { text: string; nextPath: string } } = {
    '/order': { text: 'Proceed to Shipping', nextPath: '/order/shipping' },
    '/order/shipping': { text: 'Proceed to Payment', nextPath: '/order/payment' },
    '/order/payment': { text: 'Place Order', nextPath: '/order/complete' },
  };

  const { text, nextPath } = pathMappings[pathname] || { text: 'Proceed to Payment', nextPath: '/order/payment' };
  const { shipping, billing } = cartStore;

  const isDisabled = (): boolean => {
    if (nextPath !== '/order/payment') return false;
    if (!shipping || !billing) return true;

    return false;
  }

  const handleOrder = () => {
    const apiFetch = async () => {
      const { data, error } = await placeOrder();
      if (error) return showToast(error.message, 'error');
      void router.push(`/user/orders/${data.id}`);
    }
    void apiFetch();
  }

  return (
    <Button
      color='success'
      variant='solid'
      href={nextPath !== '/order/complete' ? nextPath : ''}
      as={nextPath !== '/order/complete' ? Link : undefined}
      onPress={nextPath === '/order/complete' ? handleOrder : undefined}
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
