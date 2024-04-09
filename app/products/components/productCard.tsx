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
            <p className="text-tiny text-white uppercase font-bold bg-red-500 p-1 rounded-md shadow-lg">
              New!
            </p>
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
        </div>
        <CardFooter className="col relative flex items-center justify-between">
          <h3 className="">{product.price} €</h3>
          <AddToCart product={product} isIconOnly />
        </CardFooter>
      </Card>
    </article>
  );
};

export default ProductCard;
