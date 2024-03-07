"use client";

import { useContext, useEffect, useState } from "react";
import { CartContext } from "../utils/cartProvider";
import { Image, Button } from "@nextui-org/react";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";

export default function Cart() {
  const cartStore = useContext(CartContext);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const calculateTotal = () => {
      let total = 0;
      cartStore.data.forEach((item) => {
        total += item.price;
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
              <li className="mb-2">
                <Link href={`/products/${item.id}/${slug}`} className="flex justify-between items-center">
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
                  <p className="flex flex-grow justify-self-start">{item.title}</p>
                  <p className="font-semibold mr-4">{item.price}€</p>
                  <Button isIconOnly variant="flat" color="danger" onClick={(e) => handleClick(e, item.id)}>
                    <FaTrash />
                  </Button>
                </Link>
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
