// React Context
import { FC } from "react";

// NextJS - Link
import Link from "next/link";

// Components - AddToCart
import AddToCart from "./addToCart";

// Utils - Interfaces
import { ProductCardProps, generateSlug } from "../../utils/interfaces";

// NextUi
import { Card, CardBody, CardHeader, CardFooter, Image } from "@nextui-org/react";

const ProductCard: FC<ProductCardProps> = ({ product, isLoading }) => {
  const slug = generateSlug(product.title);
  const isNew = () => Math.random() >= 0.5;

  return (
    <article>
        <Card
          className="w-full h-[350px]"
          as={Link}
          href={`/products/${product.id}/${slug}`}
          radius="sm"
        >
          <CardHeader className="absolute z-10 top-1 flex-col items-end">
            {isNew() && (
              <p className="text-tiny text-white uppercase font-bold bg-red-500 p-1 rounded-sm shadow-lg">
                New!
              </p>
            )}
          </CardHeader>
          <CardBody>
            <Image
              removeWrapper
              className="z-0 w-full h-48 rounded-md object-cover"
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
