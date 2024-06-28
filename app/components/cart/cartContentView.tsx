// React
import { FC } from 'react';

// NextJS
import Link from 'next/link';

// NextUI
import { Button } from '@nextui-org/react';

// Components
import CartProduct from '@components/cart/cartProduct';
import CartButtonDelete from '@components/cart/cartButtonDelete';

// Icons
import { FaArrowLeft } from 'react-icons/fa';

// Interfaces
import { CartContentViewProps } from '@interfaces/cart';

const CartContentView: FC<CartContentViewProps> = ({ items, cartStore }) => (
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

export default CartContentView;
