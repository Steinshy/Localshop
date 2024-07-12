'use client';

// React
import { FC } from 'react';

// NextJS
import { usePathname } from 'next/navigation';

// Interfaces
import { StepperProps } from '@interfaces/general';

const Stepper: FC<StepperProps> = ({ steps, pathToStepMap }) => {
  const pathname = usePathname(), maxSteps = steps.length - 1;

  const getCurrentStep = (): number => {
    if (pathname && Object.prototype.hasOwnProperty.call(pathToStepMap, pathname)) {
      return pathToStepMap[pathname];
    }
    return 0;
  }

  const currentStep = getCurrentStep();

  return (
    <div className='flex justify-center'>
      {steps.map((step, index) => (
        <div key={index} className='flex justify-center items-center'>
          <div className={`flex justify-center items-center w-4 h-4 rounded-full ${currentStep === maxSteps ? 'bg-success' : currentStep >= index ? 'bg-primary' : 'bg-gray-200'} mr-2`}>
            {currentStep === index &&
              <div className={`w-3 h-3 rounded-full animate-ping ${currentStep === maxSteps ? 'bg-success' : 'bg-primary'}`} />
            }
          </div>
          <p className={`text-sm ${currentStep === maxSteps ? 'text-success' : currentStep >= index ? 'text-primary' : 'text-foreground/75'}`}>
            {step}
          </p>
          {index < steps.length - 1 && <div className={`h-0.5 w-8 bg-gray-200 mx-2`} />}
        </div>
      ))}
    </div>
  );
}

export default Stepper;
