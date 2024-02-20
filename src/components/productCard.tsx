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
  <Card key={product.id} className="w-full h-[300px] col-span-12 sm:col-span-5">
    <Skeleton isLoaded={!isLoading}>
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <p className="text-tiny text-white/60 uppercase font-bold">New</p>
        <h4 className="text-white font-medium text-2xl">{product.title}</h4>
      </CardHeader>
      <Image
        alt="Card example background"
        className="z-0 w-500 h-264 object-cover"
        src={product.thumbnail}
      />
      <CardFooter className="absolute bg-black/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
        <div>
          <p className="text-white text-small">{product.price} €</p>
        </div>
        <Button className="text-tiny" color="primary" size="sm">
          Buy
        </Button>
      </CardFooter>
    </Skeleton>
  </Card>
);

export default ProductCard;
