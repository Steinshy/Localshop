// React
import { FC } from "react";

// Helpers
import { generateSlug, generateRandomBool } from "@/app/utils/helpers";

// NextJS
import Link from "next/link";

// NextUI
import { Card, CardBody, CardHeader, CardFooter, Image } from "@nextui-org/react";

// Components
import AddToCart from "./addToCart";
import StarsReviews from "./starsReviews";

// Interfaces
import { ProductCardProps } from "@/app/interfaces/product";

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { attributes } = product;
  const { id, title, thumbnail, rating, price, stock } = attributes;

  return (
    <article>
      <Card
        className="w-full h-[350px]"
        as={Link}
        href={`/products/${id}/${generateSlug(title)}`}
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
            src={thumbnail.url}
          />
        </CardBody>
        <div className="flex justify-center text-center">
          <h2>{title}</h2>
        </div>
        <div className="flex col justify-end p-2">
        <StarsReviews rating={rating} />
        </div>
        <CardFooter className="flex col justify-between">
          <h3>{price} €</h3>
          <h4 className="text-sm text-gray-500">{stock} left</h4>
          <AddToCart product={product} isIconOnly />
        </CardFooter>
      </Card>
    </article>
  );
};

export default ProductCard;
