"use client";

// React
import { useState, useEffect, FC } from "react";

// Components
import ProductCard from "@components/product/productCard";
import Pagination from "@components/product/pagination";

// Interfaces
import { ProductObj, ProductDataProps } from "@interfaces/product";

interface ProductsListProp {
  getProducts: (page?: number | undefined, query?: string | undefined) => Promise<ProductDataProps>;
  products: ProductObj[];
  pages: number;
}

const ProductsList: FC<ProductsListProp> = ({ getProducts, products, pages }) => {
  const [localPage, setLocalPage] = useState(1);
  const [totalPages, setTotalPages] = useState(pages);
  const [localProducts, setLocalProducts] = useState<ProductObj[]>(products);
  const [query, setQuery] = useState<string>('');

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
  useEffect(() => {
    const fetchData = async () => {
      const { data, pages } = await getProducts(localPage, query);
      setLocalProducts(data);
      setTotalPages(pages);
    }

    void fetchData();
  }, [localPage, query]);

  // Set totalPages and query
  useEffect(() => {
    setQuery(query || '');
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
