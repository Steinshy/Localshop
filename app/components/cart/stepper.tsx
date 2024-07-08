// React
import { FC } from 'react';

// Interfaces
import { StepperProps } from '@interfaces/general';

const Stepper: FC<StepperProps> = ({ steps, currentStep }) => (
  <div className='flex justify-center'>
    {steps.map((step, index) => (
      <div key={index} className='flex justify-center items-center'>
        <div className={`w-4 h-4 rounded-full ${currentStep >= index ? 'bg-primary' : 'bg-gray-200'} mr-2`} />
        <p className={`text-sm ${currentStep >= index ? 'text-primary' : 'text-gray-500'}`}>{step}</p>
        {index < steps.length - 1 && <div className={`h-0.5 w-8 bg-gray-200 mx-2`} />}
      </div>
    ))}
  </div>
);

export default Stepper;
