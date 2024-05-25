// React
import { useContext } from "react";

// NextJS
import Link from "next/link";
import { usePathname } from "next/navigation";

// NextUI
import { Button } from "@nextui-org/react";

// Components
import CartCoupons from "./cartCoupons";

// Icons
import { FaArrowRight } from "react-icons/fa";

// Utils
import { CartContext } from "@utils/subProviders";

const CartSummary = () => {
  const pathname:string = usePathname(), cartStore = useContext(CartContext);
  const { data:cartData } = cartStore;
  const { attributes } = cartData;
  const { items, totalPrice } = attributes;

  const buttonTextMap:{ [key: string]: string } = {
    "/order/cart": "Proceed to Shipping",
    "/order/shipping": "Proceed to Payment",
    "/order/payment": "Return to Cart",
    default: "Proceed to Payment",
  };

  const buttonText:string = buttonTextMap[pathname] || buttonTextMap.default;

  const cartNavigation = (pathname:string) => {
    switch (pathname) {
      case "/order/cart":
        return "/order/shipping";
      case "/order/shipping":
        return "/order/payment";
      case "/order/payment":
        return "/order/cart";
      default:
        return "/order/cart";
    }
  };

  return (
    <div>
      <div className="sticky top-[70px] border-1 p-4 rounded-md bg-background">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">Order summary</h2>
        {/* Cart Summary without coupon reductions */}
        <div className="grid grid-cols-2 gap-4 text-foreground">
          <p className="text-lg">Subtotal:</p>
          <p className="text-lg">{totalPrice}€</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-foreground">
          <p className="text-lg">Shipping:</p>
          <p className="text-lg">0€</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-foreground">
          <p className="text-lg">Taxes:</p>
          <p className="text-lg">0€</p>
        </div>

        {/* COUPONS */}
        <CartCoupons totalPrice={totalPrice} />

        {/* Payment Redirection */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            color="success"
            variant="solid"
            href={cartNavigation(pathname)}
            as={Link}
            endContent={<FaArrowRight />}
            className="text-white col-span-2"
            size="lg"
            radius="sm"
            isDisabled={items.length <= 0}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
