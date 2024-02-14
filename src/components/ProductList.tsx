import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./productCard";

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
  const [products, setProducts] = useState<Product[]>([]);
  const URL = "https://dummyjson.com/products";

  const fetchData = async () => {
    try {
      const response = await axios.get(URL);
      setProducts(response.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-[900px] gap-2 grid grid-cols-2 grid-rows-2 px-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
