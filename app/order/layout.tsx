'use client';

// React
import { FC, useContext } from "react";

// NextJS
import { usePathname } from "next/navigation";

// Components
import Stepper from "@components/cart/stepper";
import CartSummary from "@components/cart/cartSummary";

// Utils
import { UserContext } from "@utils/subProviders";
import { LayoutProps } from "@interfaces/general";

const OrderLayout: FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname(), userStore = useContext(UserContext);

  // Stepper
  const steps = ["Cart", "Shipping", "Payment"];
  const currentStep = steps.findIndex((step) => step.toLowerCase() === pathname.split("/").pop());

  return userStore.isLogged ? (
    <>
      <div className="max-w-screen-2xl mx-auto my-8">
        <Stepper steps={steps} current={currentStep} />
      </div>

      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
        {children}
        <CartSummary />
      </div>
    </>
  ) : (
    <div className="flex flex-col flex-grow items-center justify-center">
      <h1 className="text-md text-heading xl:text-lg lg:text-md">You need to be logged in to view your cart.</h1>
    </div>
  );
};

export default OrderLayout;
