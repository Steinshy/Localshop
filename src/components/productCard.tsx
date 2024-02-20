import { Card, CardHeader, CardFooter, Image, Button, Skeleton } from "@chakra-ui/react";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
}

interface ProductCardProps {
  product: Product;
  isLoading: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isLoading }) => (
  <Skeleton isLoaded={!isLoading}>
    <Card key={product.id} className="w-full h-[300px] rounded-md shadow-lg">
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <p className="text-tiny text-white/60 uppercase font-bold">New</p>
        <h4 className="text-white font-medium text-2xl">{product.title}</h4>
      </CardHeader>
      <Image
        alt="Card example background"
        className="object-cover h-full w-full rounded-md"
        src={product.thumbnail}
      />
      <CardFooter className="w-full absolute bg-black/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between items-center rounded-b-md">
        <p className="text-white text-small">{product.price} €</p>
        <Button className="text-tiny" color="primary" size="sm">
          Buy
        </Button>
      </CardFooter>
    </Card>
  </Skeleton>
);

export default ProductCard;
