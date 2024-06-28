'use client';

// React
import { useContext, useState, useEffect } from 'react';

// NextJS
import Link from 'next/link';

// NextUI
import { Button } from '@nextui-org/react';

// Icons
import { FaCartArrowDown, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// Components
import CartProduct from '@components/cart/cartProduct';
import CartButtonDelete from '@components/cart/cartButtonDelete';

// Utils
import { CartContext } from '@utils/subProviders';

const CartPage = () => {
  const [hasRefreshed, setHasRefreshed] = useState(false);

  const cartStore = useContext(CartContext);
  const { data: { attributes } } = useContext(CartContext);
  const { items } = attributes;

  useEffect(() => {
    if (!hasRefreshed) {
      void cartStore.refresh();
      setHasRefreshed(true);
    }
  }, [cartStore, hasRefreshed]);

  const renderEmptyCart = () => (
    <div className='flex flex-col flex-grow items-center justify-center'>
      <FaCartArrowDown className='text-8xl text-foreground' />
      <p className='text-lg text-center mt-4'>Your cart is empty</p>
      <Button color='primary' variant='flat' href='/products' as={Link} className='mt-4' endContent={<FaArrowRight />}>
        Start shopping
      </Button>
    </div>
  );

  const renderCartContent = () => (
    <>
      <ul className='flex flex-col flex-grow gap-2'>
        {items.map((cartItem) => (
          <CartProduct key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>

      <div className='flex justify-between items-center mt-4'>
        <Button
          color='default'
          variant='light'
          href='/products'
          as={Link}
          startContent={<FaArrowLeft className='text-foreground/50' />}
          className='text-foreground/50'
        >
          Continue shopping
        </Button>
        <CartButtonDelete cartStore={cartStore} />
      </div>
    </>
  );

  return (
    <div className='flex flex-col col-span-1 lg:col-span-2'>
      {items.length === 0 ? renderEmptyCart() : renderCartContent()}
    </div>
  );
};

export default CartPage;
