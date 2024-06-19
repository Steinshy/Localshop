"use client";
// React
import { FC } from "react";

// Helpers
import { generateSlug, generateRandomBool } from "@utils/helpers";

// NextJS
import Link from "next/link";

// NextUI
import { Card, CardBody, CardHeader, CardFooter, Image } from "@nextui-org/react";

// Components
import AddToCart from "@components/product/addToCart";
import StarsReviews from "@components/product/starsReviews";

// Interfaces
import { ProductCardProps } from "@interfaces/product";

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { attributes } = product;
  const { id, title, thumbnail, rating, price, stock } = attributes;
  // const isNew = generateRandomBool(); // Cause hydratation error

  return (
    <article>
      <Card className="w-full h-[350px]" as={Link} href={`/products/${id}/${generateSlug(title)}`} radius="sm">
        <CardHeader className="absolute z-10 top-2 right-2 flex-col items-end">
          {/* {isNew && <p className="text-tiny text-white uppercase font-bold bg-red-500 p-1 rounded-md shadow-lg">New!</p>} */}
        </CardHeader>
        <CardBody className="relative">
          <Image
            removeWrapper
            className="z-0 w-full h-48 rounded-md object-cover"
            alt="Product Image"
            src={thumbnail.url}
          />
          <div className="flex-col justify-center text-center p-2">
            <h2 className="text-md">{title}</h2>
            <div className="flex justify-center p-2">
              <StarsReviews rating={rating} />
            </div>
          </div>
        </CardBody>
        <CardFooter className="flex justify-between">
          <h3 className="text-lg">{price} €</h3>
          <h4 className="text-sm text-gray-500">{stock} left</h4>
          <AddToCart product={product} isIconOnly />
        </CardFooter>
      </Card>
    </article>
  );
};

export default ProductCard;
