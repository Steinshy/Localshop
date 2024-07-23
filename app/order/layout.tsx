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

const OrderLayout: FC<LayoutProps> = ({ children }) => {
  const steps: string[] = ['Cart', 'Shipping', 'Payment'],
    pathToStepMap: { [key: string]: number } = {
      '/order/': 0,
      '/order/shipping': 1,
      '/order/payment': 2
    };

  return (
    <div className="max-w-screen-2xl mx-auto w-full flex flex-col items-center flex-grow my-8 px-2">
      {/* Stepper */}
      <div className="mb-5">
        <Stepper steps={steps} pathToStepMap={pathToStepMap} />
      </div>

      <div className="flex flex-grow w-full justify-center gap-2 flex-wrap sm:flex-nowrap">
        {/* Left side */}
        {children}

        {/* Right Side */}
        <div className="w-[400px]">
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default OrderLayout;
