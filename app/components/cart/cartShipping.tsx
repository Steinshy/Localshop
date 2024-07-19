'use client';

// React
import { useContext, useState } from "react";

// NextUI
import { Button } from "@nextui-org/react";

// Components
import AddressList from "@components/user/address/addressList";

// subProviders
import { CartContext } from '@subProviders/cartProvider';

// Icons
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Interfaces
import { AddressResponse } from "@interfaces/userAddress";
import { PagyProps } from "@interfaces/general";

const CartShipping = ({ items = [], pageInfos }:{ items?: AddressResponse[]; pageInfos?: PagyProps }) => {
  const [step, setStep] = useState<number>(1);
  const cartStore = useContext(CartContext);
  const { shipping } = cartStore;

  const GoToStep = (nextStep: number) => {
    setStep(nextStep);
  }

  // Toggle Step button
  const isDisabled = shipping ? false : true;

  const StepButton = () => (
    <Button
      onPress={() => GoToStep(step === 1 ? 2 : 1)}
      isDisabled={step === 1 ? isDisabled : false}
      color={step === 1 ? 'primary' : 'default'}
      startContent={step === 1 ? null : <FaArrowLeft />}
      endContent={step === 1 ? <FaArrowRight /> : null}
    >
      {step === 1 ? 'Select Billing Address' : 'Edit Shipping Address'}
    </Button>
  );

  return (
    step === 1 ? (
      <AddressList title='Shipping' items={items} pageInfos={pageInfos} selectable type='shipping' endContent={<StepButton />} />
    ) : (
      <AddressList title='Billing' items={items} pageInfos={pageInfos} selectable type='billing' endContent={<StepButton />} />
    )
  );
};

export default CartShipping;
