'use client';

// React
import { useState, useEffect } from "react";

// Utils - Request
import http from "../../utils/http";

// Component
import ProductCard from "./productCard";

// Interfaces - ProductInterface
import { ProductInterface } from "../../utils/site";

// Nextui - React Icon
import { Button } from '@nextui-org/react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ProductList = () => {
  const limit = 12;
  const [skip, setSkip] = useState(0)
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await http.get("/products" + '?limit=' + limit + '&skip=' + skip);
      const { products, total } = response?.data;
      setProducts(products || []);
      setTotal(total || 0);
    } catch (error: any) {
      setProducts([]);
      console.error(error);
    }
    setIsLoading(false);
  };

  const previousPage = () => {
    setSkip(skip - limit);
  }

  const nextPage = () => {
    setSkip(skip + limit);
  }

  useEffect(() => {
    fetchData();
  }, [skip]);

  // Clamp function to prevent negative values
  const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max)

  return (
    <div className="flex flex-col flex-grow justify-between">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 p-2 pb-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} isLoading={isLoading} />
        ))}
      </div>

      {/* No products */}
      {!isLoading && total <= 0 && (
        <div className="flex flex-grow justify-center items-center">
          <p>No products found</p>
        </div>
      )}
      
      {/* Pagination */}
      {total > 0 && (
        <div className="flex justify-between items-center px-2 mb-4">
          <Button
            isDisabled={skip <= 0 || isLoading}
            size="sm"
            variant="flat"
            onClick={previousPage}
            startContent={
              <FaChevronLeft />
            }
          >
            Previous
          </Button>
          <p className="text-sm text-foreground/40">
            Displaying {clamp(skip + limit, 0, total)} items of {total}
          </p>
          <Button
            isDisabled={(skip + limit) >= total || isLoading}
            size="sm"
            variant="flat"
            onClick={nextPage}
            endContent={
              <FaChevronRight />
            }
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
