import { useEffect, useState } from "react";
import ProductCard from "./productCard";
import http from "../utils/http";

// Data being passed to useState and return expected data
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>(new Array(10));
  const [isLoading, setIsLoading] = useState(true);
  const URL = "/products";

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await http.get(URL);
      setProducts(response.data.products);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 p-2">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} isLoading={isLoading} />
      ))}
    </div>
  );
};

export default ProductList;
