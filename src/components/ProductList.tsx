import { useState, useEffect } from "react";
import { Button } from '@chakra-ui/react'
import ProductCard from "./productCard";
import http from "../utils/http";
import { ProductInterface } from "../config/site";

const ProductList = () => {
  const URL = "/products";
  const limit = 10;
  const [skip, setSkip] = useState(0)
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await http.get(URL + '?limit=' + limit + '&skip=' + skip);
      const { products } = response?.data; 
      setProducts(products);
      setTotal(response?.data.total);
    } catch (error: any) {
      setProducts([]);
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [skip]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 p-2">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} isLoading={isLoading} />
      ))}

      {/* Skeletons */}
      {isLoading && (
        Array.from({length: limit}).map((_item, index) => (
          <div key={index} className="animate-pulse bg-gray-200 w-full h-[300px] rounded-md shadow-lg"></div>
        ))
      )}

      {/* No products */}
      {!isLoading && products.length === 0 && (
        <div className="text-center w-full col-span-full">
          <p>No products found</p>
        </div>
      )}
      
      {/* Pagination */}
      {total > 0 && (
        <div className="flex justify-center w-full col-span-full">
          { skip > 0 && (
            <Button colorScheme='teal' variant='solid' onClick={() => setSkip(skip - limit)}>Previous</Button>
          )}
          { skip !== total - limit  && (
            <Button colorScheme='teal' variant='solid' onClick={() => setSkip(skip + limit)}>Next</Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;