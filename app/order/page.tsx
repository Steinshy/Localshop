'use client';

// React
import { useContext } from 'react';

// NextJS
import Link from 'next/link';

// NextUI
import { Button } from '@nextui-org/react';
import { FaCartArrowDown, FaArrowRight } from 'react-icons/fa';

// Components
import CartProduct from '@components/cart/cartProduct';

// Utils
import { CartContext } from '@utils/subProviders';

const OrderPage = () => {
  const cartStore = useContext(CartContext);
  const { data: { attributes: { items } } } = cartStore;

  return items.length ? (
    <ul className='flex flex-col sm:col-span-7 gap-2'>
      {items.map((cartItem) => (
        <li key={cartItem.id}>
          <CartProduct cartItem={cartItem} />
        </li>
      ))}
    </ul>
  ) : (
    <div className='flex flex-col flex-grow justify-center items-center sm:col-span-7 gap-2'>
      <FaCartArrowDown className='text-8xl text-foreground' />
      <p className='text-lg text-center mt-4'>Your cart is empty</p>
      <Button color='primary' variant='flat' href='/products' as={Link} className='mt-4' endContent={<FaArrowRight />}>
        Start shopping
      </Button>
    </div>
  );
};

export default OrderPage;
