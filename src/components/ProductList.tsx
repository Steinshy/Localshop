import { useEffect, useState } from "react";
import axios from "axios";

// Data being passed to useState and return expected data
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
}

const ProductList = () => {
  const [products, setProducts] = useState(useState<Product[]>([]));
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
  }, [fetchData]);

  return (
    <div>
      <h1>Products Lists</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.title} - {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
