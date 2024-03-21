"use client";

// React
import { useState, useEffect } from "react";

// Utils - Request
import http from "../utils/http";

// Component
import ProductCard from "./components/productCard";
import SkeletonProduct from "./components/skeletonProduct";
import Pagination from "./components/pagination";
import OffersDisplay from "./components/offersDisplay";
import Search from "./../components/search";

// Interfaces - ProductInterface
import { ProductInterface, ProductDataProps } from "../utils/interfaces";

export default function Products() {
  const limit = 12;
  const [skip, setSkip] = useState(0);
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const array = Array(12);

  const previousPage = () => {
    setIsLoading(true);
    setSkip(skip - limit);
  };

  const nextPage = () => {
    setIsLoading(true);
    setSkip(skip + limit);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http.get<ProductDataProps>(
          "/products" + "?limit=" + limit + "&skip=" + skip
        );
        const { products, total } = response?.data || {};
        setProducts(Array.isArray(products) ? products : [products]);
        setTotal(total || 0);
        setIsLoading(false);
      } catch (error) {
        setProducts([]);
        console.error("An error occurred while fetching data:", error);
      }
    };
    fetchData().catch(console.error);
  }, [skip]);

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
          {/* Do search */}
          <Search />
        </div>
      </div>

      {/* Offers Display */}
      <OffersDisplay />

      {/* Products Card */}
      <div className="flex flex-col flex-grow justify-between">
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
