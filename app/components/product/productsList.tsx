"use client";

// React
import { useState, useEffect, FC } from "react";

// Components
import ProductCard from "@components/product/productCard";

// Interfaces
import { ProductObj, ProductsListProp } from "@interfaces/product";

const ProductsList: FC<ProductsListProp> = ({ getProducts, products, pages }) => {
  const [localPage, setLocalPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(pages);
  const [localProducts, setLocalProducts] = useState<ProductObj[]>(products);
  const [query, setQuery] = useState<string>("");

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      if (localPage <= 1 || localPage > totalPages) return;
      try {
        const { data, pages } = await getProducts(localPage, query);
        setLocalProducts((localProducts) => [...localProducts, ...data as ProductObj[]] as ProductObj[]);
        setTotalPages(pages as number);
      } catch (error) {
        console.error("An error occurred while fetching products:", error);
      }
    };

    void fetchData();
  }, [localPage, query]);

  // Set totalPages and query at load page
  useEffect(() => {
    setQuery(query || "");
    setTotalPages(pages);
  }, [query, pages]);

  // Set localPage to 1 when a query is added
  useEffect(() => {
    setLocalPage(1);
  }, [query]);

  // Infinite scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
      setLocalPage(localPage + 1);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [localPage]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 px-2 pb-4">
      {localProducts.map((product) => (
        <ProductCard key={`product_${product.id}`} product={product} />
      ))}
    </div>
  );
};

export default ProductsList;
