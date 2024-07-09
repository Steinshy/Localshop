// React
import { FC } from 'react';

// NextJS
import { Metadata } from 'next';

// Components
import Stepper from '@components/cart/stepper';
import CartSummary from '@components/cart/cartSummary';

// Interfaces
import { LayoutProps } from '@interfaces/general';

export const metadata: Metadata = {
  title: 'Order'
};

const OrderLayout:FC<LayoutProps> = ({ children }) => {
  const steps: string[] = ['Cart', 'Shipping', 'Payment'],
        pathToStepMap: { [key: string]: number } = {
          '/order/': 0,
          '/order/shipping': 1,
          '/order/payment': 2,
        };

  return (
    <div className='max-w-screen-2xl flex flex-col flex-grow my-8'>
      {/* Stepper */}
      <div className='mb-5'>
        <Stepper steps={steps} pathToStepMap={pathToStepMap} />
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-10 gap-2'>
        {/* Left side */}
        {children}

        {/* Right Side */}
        <div className='sm:col-span-3'>
          <CartSummary />
        </div>
      </div>
    </div>
  );
}

export default OrderLayout;
