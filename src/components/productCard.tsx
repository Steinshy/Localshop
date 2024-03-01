import { Card, CardHeader, CardFooter, Image, Button, Skeleton } from "@chakra-ui/react";
import { FaCartPlus } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import { ProductInterface } from "../config/site";

interface ProductCardProps {
  product: ProductInterface;
  isLoading: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isLoading }) => {
  // Function to add the product to the cart, localstorage? + react context?
  const AddToCart = () => {
    console.log("Add to cart");
  }
  const slug = product.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

  return (
    <Skeleton isLoaded={!isLoading}>
      <Card as={RouterLink} to={"/product-page/" + product.id + '/' + slug} key={product.id} className="w-full h-[300px] rounded-md shadow-lg">
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
          <Button onClick={AddToCart} color="teal" size="sm">
            <FaCartPlus className="text-xl" />
          </Button>
        </CardFooter>
      </Card>
    </Skeleton>
  );
}

export default ProductCard;
