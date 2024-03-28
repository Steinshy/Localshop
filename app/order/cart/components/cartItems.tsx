import { generateSlug } from "../../../utils/interfaces";
import { Image, Spinner, Button, Input } from "@nextui-org/react";
import { FaTrash, FaCartArrowDown, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Link from "next/link";

const CartItems = ({ cartStore, cart, isLoading,}: { cartStore: any; cart: any; isLoading: boolean }) => {
  const handleUpdateCart = ( event: React.MouseEvent<HTMLElement>, id: number ) => {
    event.preventDefault();

    const newCart = cartStore.data.filter((item) => item.id !== id);
    cartStore.update(newCart);
  };

  const handleQuantityChange = (value: string, id: number) => {
    const newCart = cartStore.data.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: parseInt(value) };
      }
      return item;
    });
    cartStore.update(newCart);
  };

  return (
    <div className="flex flex-col col-span-1 lg:col-span-2">
      <div className="flex justify-between items-center mb-4">
        {cart.length > 0 && (
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
        )}
        <Button
          color="default"
          variant="light"
          onClick={() => cartStore.update([])}
          startContent={<FaTrash className="text-foreground/50" />}
          isDisabled={cart.length <= 0}
          className="text-foreground/50"
        >
          Delete Cart
        </Button>
      </div>
      {cart.length <= 0 ? (
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
        <ul className="flex flex-col flex-grow gap-2">
          {cart.map((item) => {
            const slug = generateSlug(item.title);
            return (
              <li
                key={item.id}
                className="p-2 bg-background border-2 border-current text-default-100 rounded-md"
              >
                <div className="grid grid-cols-2">
                  <div className="flex justify-start items-center">
                    <Link href={`/products/${item.id}/${slug}`}>
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        classNames={{
                          img: "w-16 h-16 object-cover",
                          wrapper: "mr-4",
                        }}
                        radius="md"
                        shadow="none"
                      />
                    </Link>
                    <p className="text-lg text-foreground font-semibold">
                      {item.title}
                    </p>
                  </div>
                  <div className="flex justify-end items-start">
                    <Button
                      color="default"
                      variant="light"
                      className="text-foreground/25"
                      onClick={(e) => handleUpdateCart(e, item.id)}
                      startContent={<FaTrash />}
                      isIconOnly
                      size="sm"
                    />
                  </div>
                </div>
                {/* Single item information */}
                <hr className="my-4" />

                <div className="grid grid-cols-3 gap-4">
                  <p className="text-md text-foreground/50">Price</p>
                  <p className="text-md text-foreground/50">Quantity</p>
                  <p className="text-md text-foreground/50">Total</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <p className="text-lg text-foreground">€{item.price}</p>
                  <Input
                    type="number"
                    value={item.quantity?.toString() || ""}
                    onChange={(e) =>
                      handleQuantityChange(e.target.value, item.id)
                    }
                  />
                  <p className="text-lg text-foreground">
                    €{item.price * item.quantity}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
export default CartItems;
