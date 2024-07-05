// React
import { FC } from "react";

// NextUI
import { Image } from "@nextui-org/react";

// NextJS
import Link from "next/link";

// Helpers
import { generateSlug } from "@utils/helpers";
import { OrderItem } from "@interfaces/orders";

// Interface
interface OrderProductCardProps {
  orderProduct: OrderItem;
}

const OrderProductCard: FC<OrderProductCardProps> = ({ orderProduct }) => {
  const { quantity, price, product } = orderProduct;
  const { data: { attributes: { id:productID, title, thumbnail } } } = product;
  const slug = generateSlug(title);

  return (
    <li className="p-2 bg-background border-1 rounded-md">
      <div className="grid grid-cols-2">
        <div className="flex justify-start items-center">
          <Link href={`/products/${productID}/${slug}`}>
            <Image
              src={thumbnail.url}
              alt={title}
              classNames={{
                img: "w-16 h-16 object-cover",
                wrapper: "mr-4",
              }}
              radius="md"
              shadow="none"
            />
          </Link>
          <p className="text-lg text-foreground font-semibold">{title}</p>
        </div>
      </div>
      {/* Single item information */}
      <hr className="my-4" />

      <div className="grid grid-cols-3 gap-4">
        <p className="text-md text-foreground/50">Price</p>
        <p className="text-md text-foreground/50">Quantity</p>
        <p className="text-md text-foreground/50">Total</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <p className="text-lg text-foreground">{price}€</p>
        <p className="text-lg text-foreground">{quantity}</p>
        <p className="text-lg text-foreground">{price * quantity}€</p>
      </div>
    </li>
  );
};
export default OrderProductCard;
