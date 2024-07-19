'use client';

// React
import { useContext } from 'react';

// NextJS
import Link from 'next/link';

// NextUI
import { Button } from '@nextui-org/react';

// Icons
import { FaCartArrowDown, FaArrowRight, FaArrowLeft } from 'react-icons/fa';

// Components
import CartProduct from '@components/cart/cartProduct';
import CartClearBtn from '@components/cart/cartClearBtn';

// Utils
import { CartContext } from '@subProviders/cartProvider';

const OrderPage = () => {
  const cartStore = useContext(CartContext);
  if (!cartStore.data) return;
  const { data: { attributes: { items } } } = cartStore;

  return items.length ? (
    <div className='flex flex-col sm:col-span-7 gap-2'>
      <div className='flex justify-between'>
        <Button color='default' variant='light' href='/products' as={Link} startContent={<FaArrowLeft className='text-foreground/50' />} className='text-foreground/50'>
          Continue shopping
        </Button>
        <CartClearBtn />
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
        {items.map((cartItem) => (
          <CartProduct key={cartItem.id} cartItem={cartItem} />
        ))}
      </div>
    </div>
  ) : (
    <div className='flex flex-col flex-grow justify-center items-center sm:col-span-7 gap-2'>
      <FaCartArrowDown className='text-8xl text-foreground' />
      <p className='text-lg text-center mt-4'>Your cart is empty</p>
      <Button color='primary' variant='flat' href='/products' as={Link} endContent={<FaArrowRight />}>
        Start shopping
      </Button>
    </div>
  );
};

export default OrderPage;
