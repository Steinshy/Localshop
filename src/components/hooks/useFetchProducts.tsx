import { useEffect, useState } from "react";
import http from "../../utils/http"

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
}

const useFetchProducts = (url: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await http.get(url);
      const { products } = response?.data; 
      setProducts(products);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { products, isLoading };
};

export default useFetchProducts;