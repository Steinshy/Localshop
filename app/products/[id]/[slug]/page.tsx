// Utils - Request + Interface
import http from "../../../utils/http";

// Chakra UI - Icon
import { Button, Image, Link } from "@nextui-org/react";
import { FaCartPlus } from "react-icons/fa";

import ProductImages from "../../../components/productImages";

async function getData(id: string) {
  const res = await http.get(`/products/${id}`);
  if (res.status !== 200) throw new Error('Failed to fetch data');
  return res;
}

export default async function Product({ params }: { params: { id: string } }) {
  const { data: product } = await getData(params.id);

  return (
    product && (
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
            <Button variant="flat" color="primary">
              <FaCartPlus className="text-lg" />
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    )
  )
}
