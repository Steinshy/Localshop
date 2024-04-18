// React
import { FC } from "react";

// NextJS
import Link from "next/link";

// NextUI
import { Card, CardBody, CardHeader, CardFooter, Image } from "@nextui-org/react";

// Components
import AddToCart from "./addToCart";

// Interfaces
import { ProductCardProps } from "../../interfaces/product";

import StarsReviews from "./starsReviews";

// Helpers
import { generateSlug, generateRandomBool } from "../../utils/helpers";

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    <article>
      <Card
        className="w-full h-[350px]"
        as={Link}
        href={`/products/${product.id}/${generateSlug(product.title)}`}
        radius="sm"
      >
        <CardHeader className="absolute z-10 top-2 right-2 flex-col items-end">
          {generateRandomBool() && (
            <p className="text-tiny text-white uppercase font-bold bg-red-500 p-1 rounded-md shadow-lg">New!</p>
          )}
        </CardHeader>
        <CardBody>
          <Image
            removeWrapper
            className="z-0 w-full h-48 rounded-md object-cover"
            alt="Product Image"
            src={product.thumbnail}
          />
        </CardBody>
        <div className="flex items-center text-base p-3">
          <h5 className="">{product.title}</h5>
          <StarsReviews productRating={product.rating} />
        </div>
        <CardFooter className="col relative flex justify-between">
          <h4 className="">{product.price} €</h4>
          <h3 className="text-sm text-gray-500">{product.stock} left</h3>
          <AddToCart product={product} isIconOnly />
        </CardFooter>
      </Card>
    </article>
  );
};

export default ProductCard;
