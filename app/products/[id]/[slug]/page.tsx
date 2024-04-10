"use client"

// Utils - Request
import http from "../../../utils/http";

import { FC, useEffect, useState } from "react";

// ProductImages
import ProductImages from "../../components/productImages";
import { ProductObj } from "../../../utils/interfaces";

// Components
import Breadcrumb from "./components/breadCrumb";
import AddToCard from "../../components/addToCart";

const ProductPage: FC<{ params: { id: string } }> = ({ params }) => {
  const [product, setProduct] = useState<ProductObj>();

  // FetchData
    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http.get(`/products/${params.id}`);
        const productData = response?.data as ProductObj;
        setProduct(productData)
      } catch (error) {
        console.error(`Error fetching product with id ${params.id}:`, error);
      }
    }

    fetchData().catch((error) => {
      console.error("An error occurred while fetching data:", error);
    });
  }, [params.id]);

  return product ? (
    <>
      <Breadcrumb title={product.title} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center justify-center p-4">
        <ProductImages alt={product.title} main={product.thumbnail} images={product.images} />

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold text-center sm:text-start">{product.title}</h1>
          <p className="text-md text-foreground/75">{product.description}</p>
          <p className="text-md font-semibold">{product.price}€</p>

          <div className="flex justify-center sm:justify-start">
            <AddToCard product={product} />
          </div>
        </div>
      </div>
    </>
  ) : (
    // No product found
    <div className="flex flex-grow justify-center items-center">
      <p>No products found</p>
    </div>
  );
};
export default ProductPage;
