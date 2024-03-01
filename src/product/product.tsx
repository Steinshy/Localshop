// React + Routes
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Request + Interface
import http from "../utils/http";
import { ProductInterface } from "../config/site";

// Style
import { Card, CardHeader, CardFooter, Image, Button, Skeleton } from "@chakra-ui/react";
import { FaCartPlus } from "react-icons/fa";

export default function Product() {
  const URL = "/products/";
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState({} as ProductInterface);
  
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await http.get(URL + params.id); 
      const product = response?.data;
      setProduct(product);
      console.log(product);
    } catch (error: any) {
      // setProduct();
      // console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Skeleton isLoaded={!isLoading}>
        {product && (
            <Card className="w-full h-[300px] rounded-md shadow-lg">
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">New</p>
              <h4 className="text-white font-medium text-2xl">{product.title}</h4>
            </CardHeader>
            <Image
              className="object-cover h-full w-full rounded-md"
              src={product.thumbnail}
            />
            <CardFooter className="w-full absolute bg-black/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between items-center rounded-b-md">
              <p className="text-white text-small font-semibold">{product.price} €</p>
              <Button color="teal" size="sm">
                <FaCartPlus className="text-xl" />
              </Button>
            </CardFooter>
          </Card>
        )}
    </Skeleton>
  )
}
