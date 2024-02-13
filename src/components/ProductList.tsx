import { useEffect, useState } from "react";
import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";
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

  <div className="max-w-[900px] gap-2 grid grid-cols-2 grid-rows-2 px-8">
    { products.map((product) => (
      <Card
        key={product.id}
        isFooterBlurred
        className="w-full h-[300px] col-span-12 sm:col-span-5"
      >
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">New</p>
          <h4 className="text-white font-medium text-2xl">{product.title}</h4>
        </CardHeader>
        <Image
          removeWrapper
          isZoomed
          alt="Card example background"
          className="z-0 w-500 h-264 object-cover"
          src={product.thumbnail}
        />
        <CardFooter className="absolute bg-black/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
          <div>
            <p className="text-white text-small">{product.price} €</p>
          </div>
          <Button className="text-tiny" color="primary" radius="full" size="sm">
            Buy
          </Button>
        </CardFooter>
      </Card>
    ))};
  </div>

  //         <li>{product.title}</li>
  //         <li>{product.brand}</li>
  //         <li>{product.category}</li>
  //         <li>{product.description}</li>
};

export default ProductList;
