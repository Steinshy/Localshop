// React
import { FC } from 'react';

// NextJS
import { headers } from "next/headers";

// Components
import Stepper from '@components/cart/stepper';
import CartSummary from '@components/cart/cartSummary';

// Interfaces
import { LayoutProps } from '@interfaces/general';

const OrderLayout:FC<LayoutProps> = ({ children }) => {
  // A REVOIR : Le pathname ne s'update que par le serveur
  const headerList = headers();
  const pathname: string | null = headerList.get("x-current-path"),
        steps: string[] = ['Cart', 'Shipping', 'Payment'],
        pathToStepMap: { [key: string]: number } = {
          '/order/': 0,
          '/order/shipping': 1,
          '/order/payment': 2,
        };

  const getCurrentStep = (): number => {
    if (pathname && Object.prototype.hasOwnProperty.call(pathToStepMap, pathname)) {
      return pathToStepMap[pathname];
    }
    return 0;
  }

  const currentStep = getCurrentStep();

  return (
    <div className='max-w-screen-2xl flex flex-col flex-grow my-8'>
      {/* Stepper */}
      <div className='mb-5'>
        <Stepper steps={steps} currentStep={currentStep} />
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
