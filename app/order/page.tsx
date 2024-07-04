'use client';

// React
import { useContext } from 'react';

// NextJS
import { usePathname } from 'next/navigation';
import Link from 'next/link';

// NextUI - Icons
import { Button } from '@nextui-org/react';
import { FaCartArrowDown, FaArrowRight } from 'react-icons/fa';

// Components
import CartSummary from '@components/cart/cartSummary';
import CartProduct from '@components/cart/cartProduct';

// Utils
import { UserContext, CartContext } from '@utils/subProviders';

const OrderPage = () => {
  const pathname = usePathname();
  const userStore = useContext(UserContext),
    cartStore = useContext(CartContext);

  const { isLogged } = userStore;
  const { data } = cartStore;
  const { attributes } = data;
  const { items, finalPrice, totalPrice, coupon } = attributes;

  // Stepper
  const steps = ['Cart', 'Shipping', 'Payment'];
  const currentStep = steps.findIndex((step) => step.toLowerCase() === pathname.split('/').pop());

  return isLogged() && items.length ? (
    <>
      {/* Stepper */}
      <div className='grid grid-col-1 max-w-screen-2xl mx-auto my-8'>
        <div className='flex justify-center'>
          {steps.map((step, index) => (
            <div key={index} className='flex items-center'>
              <div className={`w-4 h-4 rounded-full ${currentStep >= index ? 'bg-primary' : 'bg-gray-200'} mr-2`} />
              <p className={`text-sm ${currentStep >= index ? 'text-primary' : 'text-gray-500'}`}>{step}</p>

              {index < steps.length - 1 && <div className={`h-0.5 w-8 bg-gray-200 mx-2`} />}
            </div>
          ))}
        </div>
      </div>
      {/* Left side */}
      <div className='grid grid-cols-2 max-sm:grid-cols-1'>
        <div className=''>
          <ul className=''>
            {items.map((cartItem) => (
              <li key={cartItem.id} className='p-2 bg-background border-1 rounded-md'>
                <CartProduct cartItem={cartItem} />
              </li>
            ))}
          </ul>
        </div>
        <div className=''>
          {/* Right Side */}
          <CartSummary items={items} coupon={coupon} finalPrice={finalPrice} totalPrice={totalPrice} />
        </div>
      </div>
    </>
  ) : (
    <div className='flex flex-col flex-grow items-center justify-center'>
      <FaCartArrowDown className='text-8xl text-foreground' />
      <p className='text-lg text-center mt-4'>Your cart is empty</p>
      <Button color='primary' variant='flat' href='/products' as={Link} className='mt-4' endContent={<FaArrowRight />}>
        Start shopping
      </Button>
    </div>
  );
};

export default OrderPage;
