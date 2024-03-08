// React Context
import { FC } from "react";

// NextJS - Link
import Link from "next/link";

// Components - AddToCart
import AddToCart from "./addToCart";

// Utils - Interfaces
import { ProductCardProps } from "../../utils/site";
import { generateSlug } from "../../utils/site";

// NextUi
import { Card, CardHeader, CardFooter, Image, Skeleton } from "@nextui-org/react";

const ProductCard:FC<ProductCardProps> = ({ product, isLoading }) => {
  const slug = generateSlug(product.title)

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
        <CardFooter className="absolute bg-black/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
          <p className="text-white text-sm font-semibold">
            {product.price} €
          </p>
          <AddToCart product={product}/>
        </CardFooter>
      </Card>
    </Skeleton>
  );
}

export default ProductCard;
