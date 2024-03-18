"use client";

// React
import { useState, useEffect, FC } from "react";

// Utils - Request
import http from "../utils/http";

import { Skeleton } from "@nextui-org/react";

// Component
import ProductCard from "./components/productCard";
import SkeletonProduct from "./components/skeletonProduct";
// import Pagination from "./components/pagination";
import Search from "./../components/search";

// Interfaces - ProductInterface
import { ProductInterface } from "../utils/interfaces";

// Nextui - React Icon
import { Button } from "@nextui-org/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Products() {
  const clamp = (num: number, min: number, max: number) =>
    Math.min(Math.max(num, min), max);
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
        const response = await http.get(
          "/products" + "?limit=" + limit + "&skip=" + skip
        );
        const { products, total } = response?.data;
        setProducts(products || []);
        setTotal(total || 0);
        setIsLoading(false);
      } catch (error: any) {
        setProducts([]);
        console.error(error);
      }
    };
    fetchData();
  }, [skip]);

  return (
    <>
      <div className="w-full">
        <div className="inset-0 mt-8 p-5 flex-col text-center md:px-20 lg:space-y-10">
          <h1 className="text-2xl font-bold tracking-tight text-heading lg:text-4xl xl:text-5xl">
            Products
          </h1>
          <p className="text-sm text-heading xl:text-lg lg:text-md">
            Welcome to our product catalog, where innovation meets excellence!
            We are thrilled to present a curated selection of top-notch products
            designed to meet your diverse needs and exceed your expectations.
            Whether you're a seasoned professional or just starting your
            journey, our range of products is carefully crafted to enhance your
            experience and make every task seamless. From cutting-edge
            technology to timeless classics, we have something for everyone.
          </p>
          <div className="flex flex-col flex-grow"></div>
          <Search />

          {/* Products Card */}
          <div className="flex flex-col flex-grow justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 p-2 pb-4">
              {isLoading &&
                Array.from(array.keys()).map((index) => (
                  <SkeletonProduct key={index} />
                ))}

              {!isLoading && total > 0 &&
                products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          </div>

          {/* Pagination */}
          {isLoading && total === 0 && (
            <Skeleton isLoaded={!isLoading}>
              <div className="flex flex-grow px-2 mb-4"></div>
            </Skeleton>
          )}

          {total > 0 && (
            <div className="flex flex-grow justify-between px-2 mb-4">
              <Button
                isDisabled={skip <= 0}
                isLoading={isLoading}
                size="sm"
                variant="flat"
                onClick={previousPage}
                startContent={<FaChevronLeft />}
              >
                Previous
              </Button>
              <Skeleton isLoaded={!isLoading}>
                <p className="text-sm text-foreground/40">
                  Displaying {clamp(skip + limit, 0, total)} items of {total}
                </p>
              </Skeleton>
              <Button
                isDisabled={skip + limit >= total}
                isLoading={isLoading}
                size="sm"
                variant="flat"
                onClick={nextPage}
                endContent={<FaChevronRight />}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
