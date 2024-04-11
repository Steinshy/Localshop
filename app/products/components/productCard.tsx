// React Context
import { FC } from "react";

// NextJS - Link
import Link from "next/link";

// Components - AddToCart
import AddToCart from "./addToCart";

// Interfaces - Generation
import { ProductCardProps, generateSlug, generateNewProductLogo } from "../../utils/interfaces";

// NextUi
import { Card, CardBody, CardHeader, CardFooter, Image } from "@nextui-org/react";

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const productRating = Math.round(product.rating) || 0;

  const Reviews: FC<{ productRating: number }> = ({ productRating }) => {
    return (
      <div className="flex items-center gap-1 ml-auto">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 ${i < productRating ? "text-yellow-500" : "text-gray-300"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        ))}
      </div>
    );
  }

  return (
    <article>
      <Card
        className="w-full h-[350px]"
        as={Link}
        href={`/products/${product.id}/${generateSlug(product.title)}`}
        radius="sm"
      >
        <CardHeader className="absolute z-10 top-2 right-2 flex-col items-end">
          {generateNewProductLogo() && (
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
          <Reviews productRating={productRating} />
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
