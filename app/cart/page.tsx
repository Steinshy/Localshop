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
    <div className="max-w-screen-xl mx-auto grid grid-cols-3 gap-4 my-8">
      {/* LEFT */}
      <div className="col-span-2">
        <div className="flex justify-end items-center mb-4">
          <Button
            color="danger"
            variant="solid"
            onClick={() => cartStore.update([])}
            startContent={<FaTrash />}
          >
            Delete Cart
          </Button>
        </div>
        {cartStore.data.length <= 0 && !isLoading ? (
          <p className="text-lg text-center mt-4">Your cart is empty</p>
        ) : (
          <ul className="flex flex-col">
            {cartStore.data.map((item) => {
              const slug = generateSlug(item.title);
              return (
                <li key={item.id} className="p-4 bg-background border rounded-md mb-2 flex justify-between items-center">
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
                  <p className="flex flex-grow justify-self-start">
                    <Link href={`/products/${item.id}/${slug}`}>
                      {item.title}
                    </Link>
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* RIGHT */}
      <div className="border rounded-md p-4">
        <h2 className="text-2xl font-semibold mb-4">Order summary</h2>
        
        <div className="grid grid-cols-3 gap-4">
          <p className="text-lg">Subtotal:</p>
          <p className="text-lg">€{total}</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <p className="text-lg">Shipping:</p>
          <p className="text-lg">€0</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <p className="text-lg">Taxes:</p>
          <p className="text-lg">€0</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <p className="text-lg">Discount:</p>
          <p className="text-lg">€0</p>
        </div>

        <hr className="my-4" />
        <div className="grid grid-cols-3 gap-4">
          <p className="text-lg">Total:</p>
          <p className="text-lg">€{total}</p>
        </div>

        <hr className="my-4" />
        <p className="text-small mb-4">
          Shipping and taxes will be calculated at checkout
        </p>

        <div className="grid grid-cols-3 gap-4 my-4">
          <Input
            type="field"
            placeholder="Enter your Promo Code"
            className="col-span-2"
          />
          <Button
            color="primary"
            variant="solid"
            className="col-span-1"
            onClick={() => alert("Promo code applied")}
          >
            Apply
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            color="secondary"
            variant="solid"
            href="/products"
            as={Link}
            startContent={<FaArrowLeft />}
          >
            Continue shopping
          </Button>
          <Button
            color="success"
            variant="solid"
            href="/checkout"
            as={Link}
            endContent={<FaArrowRight />}
            className="text-white"
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
