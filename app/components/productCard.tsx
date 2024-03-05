// React Context
import { FC, useContext } from "react";
import { CartContext } from "../utils/cartProvider";

// Chakra UI - Icon
import { Card, CardHeader, CardFooter, Image, Skeleton, Button } from "@nextui-org/react"
import { FaCartPlus } from "react-icons/fa";

import Link from "next/link";

// Utils - Interfaces
import { ProductCardProps } from "../config/site";

const ProductCard:FC<ProductCardProps> = ({ product, isLoading }) => {
  const cartStore = useContext(CartContext);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    AddToCart();
  };

  // Function to add the product to the cart, localstorage? + react context?
  const AddToCart = () => {
    const newItem = {
      id: product.id,
      discount: 0,
      quantity: 1
    }
    
    cartStore.update([...cartStore.data, newItem]);
  }
  const slug = product.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

  return (
    <Skeleton isLoaded={!isLoading} classNames={{
      base: "rounded-md"
    }}>
      <Card isFooterBlurred as={Link} href={`/products/${product.id}/${slug}`} className="w-full h-[300px]" radius="sm">
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">
            New
          </p>
          <h4 className="text-black font-medium text-2xl">
            {product.title}
          </h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card example background"
          className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
          src={product.thumbnail}
        />
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
          <p className="text-black text-sm font-semibold">
            {product.price} €
          </p>
          <Button isIconOnly color="primary" variant="flat" size="sm" radius="sm" onClick={handleClick}>
            <FaCartPlus className="text-lg" />
          </Button>
        </CardFooter>
      </Card>
    </Skeleton>
  );
}

export default ProductCard;
