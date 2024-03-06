"use client";

// React
import { useEffect, useState } from "react";

// Utils - Request
import http from "../../../utils/http";

// Components - ProductImages - AddToCart
import ProductImages from "../../components/productImages";
import { ProductInterface } from "../../../utils/site";
import AddToCart from "../../components/addToCart";

// NextUi - Skeleton
import { Skeleton } from "@nextui-org/react";

async function getData(id: string) {
  try {
    const res = await http.get(`/products/${id}`);
    return res;
  } catch (error) {
    console.error(error);
  }
}

export default function Product({ params }: { params: { id: string } }) {
  const [product, SetProduct] = useState<ProductInterface | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      const { data } = (await getData(params.id)) || {};
      SetProduct(data);
      setIsLoading(false);
    };
    fetchProduct();
  }, [params.id]);

  return (
    <Skeleton
      isLoaded={!isLoading}
      classNames={{
        base: "rounded-md",
      }}
    >
      {/* Update: Work ok but idk, before: No Product but arrive first then squeleton then results, should be: Squeleton and result or not */}
      {!isLoading && !product && (
        <div className="flex flex-grow justify-center items-center">
          <p>No products found</p>
        </div>
      )}
      {/* Products */}
      {!isLoading && product && (
        <div className="grid grid-cols-2 gap-4 items-center justify-center p-4">
          <ProductImages
            alt={product.title}
            main={product.thumbnail}
            images={product.images}
          />

          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-semibold">{product.title}</h1>
            <p className="text-md text-foreground/75">{product.description}</p>
            <p className="text-md font-semibold">{product.price}€</p>

            <div className="flex justify-start">
              <AddToCart product={product} />
            </div>
          </div>
        </div>
      )}
    </Skeleton>
  );
}
