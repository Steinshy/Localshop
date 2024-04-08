import React, { FC } from "react";
import { Spinner, Button } from "@nextui-org/react";
import { FaTrash, FaCartArrowDown, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { CartItemProps } from "../../../utils/interfaces";
import CartProduct from "./cartProduct";

const CartItems: FC<CartItemProps> = ({ cartStore, cart, isLoading }) => {
  const ContinueShoppingButton = () => (
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
  );

  const DeleteCartButton = ({ value }: { value: number }) => (
    <Button
      color="default"
      variant="light"
      onClick={() => cartStore.update([])}
      startContent={<FaTrash className="text-foreground/50" />}
      isDisabled={value <= 0}
      className="text-foreground/50"
    >
      Delete Cart
    </Button>
  );

  const StartShoppingButton = () => (
    <Button color="primary" variant="flat" href="/products" as={Link} className="mt-4" endContent={<FaArrowRight />}>
      Start shopping
    </Button>
  );

  return (
    <div className="flex flex-col col-span-1 lg:col-span-2">
      <div className="flex justify-between items-center mb-4">
        {cart.length > 0 && (
          <>
            <ContinueShoppingButton />
            <DeleteCartButton value={cart.length} />
          </>
        )}
      </div>
      {cart.length <= 0 ? (
        <div className="flex flex-col flex-grow items-center justify-center">
          {isLoading ? (
            <Spinner size="lg" color="warning" label="Loading Cart..." />
          ) : (
            <>
              <FaCartArrowDown className="text-8xl text-foreground" />
              <p className="text-lg text-center mt-4">Your cart is empty</p>
              <StartShoppingButton />
            </>
          )}
        </div>
      ) : (
        <ul className="flex flex-col flex-grow gap-2">
          {cart.map((itemcart) => (
            <CartProduct key={itemcart.id} cartStore={cartStore} itemcart={itemcart} />
          ))}
        </ul>
      )}
    </div>
  );
};
export default CartItems;
