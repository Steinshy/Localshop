"use client";

import { useContext, useEffect, useState } from "react";
import { CartContext } from "../utils/cartProvider";
import { Image, Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { FaTrash, FaCartArrowDown } from "react-icons/fa";
import { generateSlug } from "../utils/site";

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
      setIsLoading(false)
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
  }

  return (
    <div className="flex flex-col flex-grow justify-center items-center p-4">
      <h1 className="text-5xl mb-8 flex justify-start items-center">
        <FaCartArrowDown className="mr-4" />
        Cart
      </h1>

      {cartStore.data.length <= 0 ? (
        <p className="text-lg text-center mt-4">
          Your cart is empty
        </p>
      ) : 
        cartStore.data.map((item) => {
          const slug = generateSlug(item.title);
          return (
            <ul key={item.id} className="max-w-lg flex w-full flex-col">
              <li className="mb-2 flex justify-between items-center">
                <Link href={`/products/${item.id}/${slug}`}>
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    classNames={{
                      img: "w-16 h-16",
                      wrapper: "border mr-4"
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
                <Input
                  className="w-20 mr-5"
                  type="number"
                  value={item.quantity.toString()}
                  onValueChange={(value) => handleQuantityChange(value, item.id)}
                  min={1}
                />
                <p className="font-semibold mr-4">{item.price}€</p>
                <Button isIconOnly variant="flat" color="danger" onClick={(e) => handleClick(e, item.id)}>
                  <FaTrash />
                </Button>
              </li>
            </ul>
          )
        })
      }

      <div className="flex gap-2 max-w-lg w-full justify-end items-center">
        <p className="text-lg mt-6">
          Total: <span className="font-semibold">{total}€</span>
        </p>
      </div>

      <div className="flex gap-2 max-w-lg w-full justify-end items-center">
          <Button
            className="mt-8"
            color="secondary"
            variant="flat"
            href="/products"
            as={Link}
          >
            Continue shopping
          </Button>
          <Button 
            isDisabled={cartStore.data.length <= 0}
            className="mt-8"
            color="primary"
            variant="solid"
            href="/checkout"
            as={Link}
          >
            Checkout
          </Button>
      </div>
    </div>
  );
}
