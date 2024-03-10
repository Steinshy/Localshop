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
  const isNew = () => Math.random() >= 0.5;
  return (
    <Skeleton isLoaded={!isLoading} classNames={{
      base: "rounded-md"
    }}>
      <Card isFooterBlurred as={Link} href={`/products/${product.id}/${slug}`} className="w-full h-[300px]" radius="sm">
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          {isNew() && (
            <p className="text-tiny text-white uppercase font-bold bg-red-500 p-1 rounded-sm shadow-lg">
              New!
            </p>
          )}
        </CardHeader>
        <Image
          removeWrapper
          alt="Card example background"
          className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
          src={product.thumbnail}
        />
        <CardFooter className="flex-col items-start absolute bg-black/30 bottom-0 border-t-1 border-zinc-100/50 z-10">
          <h4 className="text-white font-medium text-xl">
            {product.title}
          </h4>
          <div className="flex w-full flex-grow gap-2 items-center justify-between">
            <p className="text-sm text-white/75 font-semibold">
              {product.price} €
            </p>
            <AddToCart product={product} isIconOnly />
          </div>
        </CardFooter>
      </Card>
    </Skeleton>
  );
}

export default ProductCard;
