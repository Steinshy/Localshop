"use client";

// React
import { useState, useEffect, useCallback } from "react";

// Utils - Request
import http from "../utils/http";

// Component
import ProductCard from "./components/productCard";
import SkeletonProduct from "./components/skeletonProduct";
import Pagination from "./components/pagination";
import OffersDisplay from "./components/offersDisplay";
import { Input } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";

// Interfaces - Utils
import { ProductObj, ProductDataProps } from "../utils/interfaces";

export default function Products() {
  const limit = 12;
  const array = Array(12);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState<ProductObj[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState<string>("");

  const previousPage = () => {
    setIsLoading(true);
    setSkip(skip - limit);
  };

  const nextPage = () => {
    setIsLoading(true);
    setSkip(skip + limit);
  };

  const fetchData = useCallback(async () => {
    try {
      const base_url = `/products?limit=${limit}&skip=${skip}`;
      const search_url = `/products/search?limit=${limit}&skip=${skip}&q=${query}`;
      const url = query.length > 0 ? search_url : base_url;
      const response = await http.get<ProductDataProps>(url);
      const { products, total } = response?.data || {};
      setProducts(Array.isArray(products) ? products : [products]);
      setTotal(total || 0);
      setIsLoading(false);
    } catch (error) {
      setProducts([]);
    }
  }, [limit, skip, query]);

  // Fetch data
  useEffect(() => {
    fetchData().catch((error) => {
      console.error("An error occurred while fetching data:", error);
    });
  }, [fetchData, query, skip]);

  // Reset skip when query changes
  useEffect(() => {
    setSkip(0);
  }, [query]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchData().catch((error) => {
      console.error("An error occurred while fetching data:", error);
    });
  };

  return (
    <div className="flex flex-col flex-grow">
      <div
        className="flex flex-col items-center justify-center min-h-svh"
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1683133438751-abb68a5c2270?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div className="max-w-screen-lg mx-auto flex flex-col items-center justify-center gap-8">
          <h1 className="text-white text-2xl font-bold tracking-tight text-heading lg:text-4xl xl:text-5xl">
            Products
          </h1>
          <p className="text-white text-sm text-heading xl:text-lg lg:text-md">
            Welcome to our product catalog, where innovation meets excellence!
            We are thrilled to present a curated selection of top-notch products
            designed to meet your diverse needs and exceed your expectations.
            Whether you&#39;re a seasoned professional or just starting your
            journey, our range of products is carefully crafted to enhance your
            experience and make every task seamless. From cutting-edge
            technology to timeless classics, we have something for everyone.
          </p>

          {/* Search */}
          <form onSubmit={handleSubmit} action="#" className="w-full">
            <Input
              aria-label="Search"
              placeholder="Type and press enter..."
              type="search"
              value={query}
              onChange={handleQueryChange}
              startContent={<FaSearch />}
              size="lg"
            />
          </form>
        </div>
      </div>

      {/* Offers Display */}
      <OffersDisplay />

      {/* Products Card */}
      <div className="flex flex-col flex-grow justify-between">
        <div className="flex items-center justify-center gap-4 p-4">
          {query.length > 0 && <p>Results for : {query}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 p-2 pb-4">
          
          {isLoading &&
            Array.from(array.keys()).map((index) => ( 
              <SkeletonProduct key={index} />
            ))}

          {!isLoading &&
            total > 0 &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>

      {/* Pagination */}
      <Pagination
        isLoading={isLoading}
        total={total}
        limit={limit}
        skip={skip}
        previousPage={previousPage}
        nextPage={nextPage}
      />
    </div>
  );
}
