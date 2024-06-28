// NextJS
import Link from 'next/link';

// NextUI
import { Button } from '@nextui-org/react';

// Icons
import { FaCartArrowDown, FaArrowRight } from 'react-icons/fa';

const CartEmptyView = () => (
  <div className='flex flex-col flex-grow items-center justify-center'>
    <FaCartArrowDown className='text-8xl text-foreground' />
    <p className='text-lg text-center mt-4'>Your cart is empty</p>
    <Button color='primary' variant='flat' href='/products' as={Link} className='mt-4' endContent={<FaArrowRight />}>
      Start shopping
    </Button>
  </div>
);

export default CartEmptyView;
