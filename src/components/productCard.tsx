import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";

interface Props {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
}

const ProductCard = ({ product }) => {
  return (
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
          );
        };

export default ProductCard;