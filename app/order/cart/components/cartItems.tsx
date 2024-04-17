// React
import { FC } from "react";

// NextJS
import Link from "next/link";

// NextUI
import { Spinner, Button } from "@nextui-org/react";

// Icons
import { FaTrash, FaCartArrowDown, FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Components
import CartProduct from "./cartProduct";

// Interfaces
import { CartItemProps } from "../../../interfaces/cart";

const CartItems: FC<CartItemProps> = ({ cartStore, cart, isLoading }) => {
  return (
    <div className="flex flex-col col-span-1 lg:col-span-2">
      {cart.length === 0 ? (
        <div className="flex flex-col flex-grow items-center justify-center">
          {isLoading ? (
            <Spinner size="lg" color="warning" label="Loading Cart..." />
          ) : (
            <>
              <FaCartArrowDown className="text-8xl text-foreground" />
              <p className="text-lg text-center mt-4">Your cart is empty</p>
              <Button
                color="primary"
                variant="flat"
                href="/products"
                as={Link}
                className="mt-4"
                endContent={<FaArrowRight />}
              >
                Start shopping
              </Button>
            </>
          )}
        </div>
      ) : (
        <>
          <ul className="flex flex-col flex-grow gap-2">
            {cart.map((itemcart) => (
              <CartProduct key={itemcart.id} cartStore={cartStore} itemcart={itemcart} />
            ))}
          </ul>

          <div className="flex justify-between items-center mb-4">
            <Button
              color="default"
              variant="light"
              href="/products"
              as={Link}
              startContent={<FaArrowLeft className="text-foreground/50" />}
              className="text-foreground/50"
            >
              Continue shopping
            </Button>

            <Button
              color="default"
              variant="light"
              onClick={() => cartStore.update([])}
              startContent={<FaTrash className="text-foreground/50" />}
              isDisabled={isLoading}
              className="text-foreground/50"
            >
              Delete Cart
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItems;
