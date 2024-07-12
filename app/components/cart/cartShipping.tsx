'use client';

// React
import { useContext, useState } from "react";

// NextUI
import { Button } from "@nextui-org/react";

// Components
import AddressList from "@components/user/address/addressList";

// Utils
import { CartContext } from "@utils/subProviders";

// Icons
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Interfaces
import { AddressResponse } from "@interfaces/userAddress";

const CartShipping = ({ items }:{ items: AddressResponse[]; }) => {
  const [step, setStep] = useState<number>(1);
  const cartStore = useContext(CartContext);
  const { data: { attributes: { addresses } } } = cartStore;

  const GoToStep = (nextStep: number) => {
    setStep(nextStep);
  }

  // Toggle Step button
  const shipping = addresses.find((address) => address.type === 'shipping');
  const isDisabled = shipping ? false : true;

  return (
    <>
      {step === 1 ? (
        <>
          <AddressList title='Shipping' items={items} selectable type='shipping' />
          <div className='flex justify-end'>
            <Button
              onPress={() => GoToStep(2)}
              isDisabled={isDisabled}
              color='primary'
              endContent={<FaArrowRight />}
            >
              Select Billing Address
            </Button>
          </div>
        </>
      ) : (
        <>
          <AddressList title='Billing' items={items} selectable type='billing' />
          <div className='flex justify-start'>
            <Button
              onPress={() => GoToStep(1)}
              color='default'
              startContent={<FaArrowLeft />}
            >
              Select Shipping Address
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default CartShipping;
