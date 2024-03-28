
import { FC } from "react";
// NextLink - NextUI
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import CartCoupons from './cartCoupons';

// React Icons
import { FaArrowRight } from "react-icons/fa";
import { CartItemProps } from "../../../utils/interfaces";

const CartSummary: FC<CartItemProps> = ({ cart, setTotalPriceDiscount, totalPriceDiscount, totalPrice, isLoading }) => {
  const pathname = usePathname()
  // PathName = order/cart or order/checkout or order/shopping - 
  const orderPathName = pathname === '/order/cart' ? '/order/shipping' : pathname === '/order/checkout' ? '' : '/order/checkout'
  
  return (
    <>
      <div className="border-2 border-current p-4 rounded-md bg-background text-default-100">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">
          Order summary
        </h2>
        {/* Cart Summary without coupon reductions */}
        <div className="grid grid-cols-2 gap-4 text-foreground">
          <p className="text-lg">Subtotal:</p>
          <p className="text-lg">€{totalPrice}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-foreground">
          <p className="text-lg">Shipping:</p>
          <p className="text-lg">€0</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-foreground">
          <p className="text-lg">Taxes:</p>
          <p className="text-lg">€0</p>
        </div>

        {/* COUPONS */}
        <CartCoupons setTotalPriceDiscount={setTotalPriceDiscount} totalPriceDiscount={totalPriceDiscount} totalPrice={totalPrice} isLoading={isLoading} />

        {/* Checkout Redirection */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            color="success"
            variant="solid"
            href={orderPathName}
            as={Link}
            endContent={<FaArrowRight />}
            className="text-white col-span-2"
            size="lg"
            radius="sm"
            isDisabled={cart.quantity <= 0 || isLoading}
          >
            {pathname === '/order/cart' ? 'Proceed to Shipping' : pathname === '/order/checkout' ? 'Proceed to Payment' : 'Proceed to Checkout'}
          </Button>
        </div>
      </div>
    </>
  );
};
export default CartSummary;
