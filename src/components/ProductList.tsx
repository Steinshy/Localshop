import { useState, useEffect } from "react";
import { Button } from '@chakra-ui/react'
import ProductCard from "./productCard";
import http from "../utils/http";
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
  
}

const ProductList = () => {
  const URL = "/products";
  const limit = 10;
  const [skip, setSkip] = useState(0)
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await http.get(URL + '?limit=' + limit + '&skip=' + skip); // url api = http://127.0.0.1:3000/products?limit=10&skip=2
      const { products } = response?.data; 
      setProducts(products);
      setTotal(response?.data.total);
    } catch (error: any) {
      setProducts([]);
      console.error(error);
    }
    setIsLoading(false);
  };

  // Le fetch va deja etre trigger a l'assignation
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
      {/* Pagination here */}
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