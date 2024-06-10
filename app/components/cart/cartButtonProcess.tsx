// React
import { FC } from "react";
// NextJS
import Link from "next/link";
// Icons
import { FaArrowRight } from "react-icons/fa";
// React
import { Button } from "@nextui-org/react";

// Interface
import { CartButtonProcessProps } from "@interfaces/cart";

const CartButtonProcess: FC<CartButtonProcessProps> = ({ pathname, items }) => {
  const buttonText: string =
    {
      "/order/cart": "Proceed to Shipping",
      "/order/shipping": "Proceed to Payment",
      "/order/payment": "Return to Cart",
      default: "Proceed to Payment",
    }[pathname] || "Proceed to Payment";

  // Navigation
  const paths = ["/order/cart", "/order/shipping", "/order/payment"];
  const index = paths.indexOf(pathname);
  const navPaths = paths[(index + 1) % paths.length];

  return (
    <Button
      color="success"
      variant="solid"
      href={navPaths}
      as={Link}
      endContent={<FaArrowRight />}
      className="text-white col-span-2"
      size="lg"
      radius="sm"
      isDisabled={items.length < 1}
    >
      {buttonText}
    </Button>
  );
};

export default CartButtonProcess;
