"use client";

// React context
import { useContext, useEffect, useState } from "react";

// Components
import { CartContext } from "../utils/cartProvider";
import { generateSlug } from "../utils/site";

// NextUI components
import { Image, Button, Input } from "@nextui-org/react";
import Link from "next/link";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";

import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";

// React Icons
import {
  FaTrash,
  FaCartArrowDown,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

export default function Cart() {
  const cartStore = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    setIsLoading(true);
    const calculateTotal = () => {
      let total = 0;
      cartStore.data.forEach((item) => {
        total += item.price * item.quantity;
      });
      setTotal(total);
      setIsLoading(false);
    };

    calculateTotal();
  }, [cartStore.data]);

  const handleClick = (event: React.MouseEvent<HTMLElement>, id: number) => {
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
    <div className="container mx-auto">
      <div className="flex flex-row">
        <div className="grid grid-cols gap-4">
          {cartStore.data.length <= 0 && !isLoading ? (
            <p className="text-lg text-center mt-4">Your cart is empty</p>
          ) : (
            cartStore.data.map((item) => {
              const slug = generateSlug(item.title);
              return (
                <Card>
                  <CardHeader>
                    <ul key={item.id} className="max-w-lg flex w-full flex-col">
                      <li className="mb-2 flex justify-between items-center">
                        <Link href={`/products/${item.id}/${slug}`}>
                          <Image
                            src={item.thumbnail}
                            alt={item.title}
                            classNames={{
                              img: "w-16 h-16",
                              wrapper: "border mr-4",
                            }}
                            radius="sm"
                            shadow="sm"
                          />
                        </Link>
                        <p className="flex flex-grow justify-self-start">
                          <Link href={`/products/${item.id}/${slug}`}>
                            {item.title}
                          </Link>
                        </p>
                      </li>
                    </ul>
                  </CardHeader>
                </Card>
              );
            })
          )}
        </div>
        <div className="grid-col grid gap-4">
          <div>Partie droite</div>
        </div>
      </div>

        <div className="flex flex-row">
          <div className="grid grid-cols gap-4">

            <div className="flex flex-row gap-2 max-w-lg w-full justify-end items-center">
              <p className="text-lg mt-6">
                Total: <span className="font-semibold">{total}€</span>
              </p>
            </div>
          </div>
          
          <div className="flex flex-row">
            <div className="grid grid-cols gap-4">
              <Input
                  type="field"
                  label="Promo code"
                  placeholder="Enter your Promo Code"
                />
            </div>
          </div>
        </div>

        <div className="flex flex-row">
          <div className="grid grid-cols-3 gap-4">
            <Button
              className="mt-8"
              color="secondary"
              variant="solid"
              href="/products"
              as={Link}
              startContent={<FaArrowLeft />}
            >
              Continue shopping
            </Button>

            <Popover placement="top">
              <PopoverTrigger>
                <Button
                  isDisabled={cartStore.data.length <= 0}
                  className="mt-8"
                  color="danger"
                  variant="solid"
                  onClick={() => cartStore.update([])}
                >
                  Delete Cart
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="px-1 py-2">
                  <div className="text-tiny">Your cart has been emptied !</div>
                </div>
              </PopoverContent>
            </Popover>

            <Button
              isDisabled={cartStore.data.length <= 0}
              className="mt-8"
              color="primary"
              variant="solid"
              href="/checkout"
              as={Link}
              endContent={<FaArrowRight />}
            >
              Checkout
            </Button>
          </div>
        </div>

    </div>
  );
}
