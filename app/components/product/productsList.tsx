"use client";

import { useState, useEffect, FC, useCallback } from "react";

import { ProductObj, ProductDataProps } from "@interfaces/product";
import ProductCard from "@components/product/productCard";
import Pagination from "@components/product/pagination";

interface ProductsListProp {
  getProducts: (page?: number, query?: string) => Promise<ProductDataProps>;
  products: ProductObj[];
  pages: number;
}

const ProductsList: FC<ProductsListProp> = ({ getProducts, products, pages }) => {
  const [localPage, setLocalPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [localProducts, setLocalProducts] = useState<ProductObj[]>([]);
  const [query, setQuery] = useState<string>("");

  // Pagination
  const previousPage = () => {
    setLocalPage(localPage - 1);
    console.log(localPage, "localPage");
  };

  const nextPage = () => {
    setLocalPage(localPage + 1);
    console.log(localPage, "localPage");
  };

  // Fetch data
  const fetchData = useCallback (async () => {
    try {
      await getProducts(localPage, query);
      setLocalProducts(products);
    } catch (error) {
      setLocalProducts([]);
      console.error("An error occurred while fetching products:", error);
    }
  }, [localPage, query]);

  // Fetch data when localPage or query changes
  useEffect(() => {
    fetchData().catch((error) => {
      console.error("An error occurred while fetching data:", error);
    });
  }, [fetchData, localPage, query]);


  // Set totalPages and query
  useEffect(() => {
    setQuery( query || "");
    setTotalPages(pages || 0);
  }, [query, pages]);

  // Set localPage to 1 when query is added
  useEffect(() => {
    setLocalPage(1);
  }, [query]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 px-2 pb-4">
        {localProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="flex flex-grow justify-between px-2 mb-4">
        {localProducts.length > 0 && (
          <Pagination totalPages={totalPages} localPage={localPage} previousPage={previousPage} nextPage={nextPage} />
        )}
      </div>
    </>
  );
};

export default ProductsList;
