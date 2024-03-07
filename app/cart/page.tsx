"use client";

import { useContext, useEffect, useState } from "react";
import { CartContext } from "../utils/cartProvider";
import { Image, Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";

export default function Cart() {
  const cartStore = useContext(CartContext);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const calculateTotal = () => {
      let total = 0;
      cartStore.data.forEach((item) => {
        total += item.price * item.quantity;
      });
      setTotal(total);
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
    <div className="flex flex-col flex-grow justify-center items-center">
      <h1 className="text-5xl">Cart</h1>

      {cartStore.data.length <= 0 ? (
        <p className="text-lg text-center mt-4">
          Your cart is empty
        </p>
      ) : 
        cartStore.data.map((item) => {
          const slug = item.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
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

      <p className="text-lg font-semibold mt-4">
        Total: {total}€
      </p>
    </div>
  );
}
