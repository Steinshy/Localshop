"use client";

// React Context
import { FC, useContext, useState } from "react";
import { CartContext } from "../../utils/cartProvider";
import { FaShoppingCart } from "react-icons/fa";

// Next - Link - redirect
import Link from "next/link";
import { redirect } from 'next/navigation' 

// NextUi - Reat Icon
import { Button } from "@nextui-org/react";

// Interface - ProductCardProps
import { ProductCardProps } from "../../utils/site";

const AddToCart: FC<ProductCardProps> = ({ product }) => {
  const { id, title, category, thumbnail, price } = product;
  const cartStore = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const item = cartStore.data.find((item) => item.id === product.id);
  const quantity = item ? item.quantity : 0;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setIsLoading(true);
    event.preventDefault();

    if (quantity > 0) { redirect('/cart') }
    if (item) {
      item.quantity += 1;
      cartStore.update((prev) => prev.map((i) => (i.id === item.id ? item : i))
      );
    } else {
      const newItem = {
        id,
        discount: 0,
        quantity: 1,
        price,
        title,
        category,
        thumbnail,
      };

      cartStore.update((prev) => [...prev, newItem]);
      setIsLoading(false);
    }
  };

  return (

    <Button
      color="primary"
      variant="solid"
      size="md"
      radius="sm"
      href="/cart"
      as={Link}
      isLoading={isLoading}
      onClick={handleClick}
      startContent={quantity >= 1 && <FaShoppingCart />}
    >
      {quantity > 0 ? "Go to Cart" : `Add to Cart`}
    </Button>
  );
};

export default AddToCart;
