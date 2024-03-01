import { useEffect, useState } from "react";
import http from "../../utils/http";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
}

const useFetchProducts = (url: string, limit: number, skip: number) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await http.get(url + '?limit=' + limit + '&skip=' + skip); // url api = http://127.0.0.1:3000/products?limit=10&skip=2
      const { products } = response?.data; 
      setProducts(products);
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { products, isLoading, error };
};

export default useFetchProducts;
