// React
import { FC } from 'react';
// NextUI
import { Badge, Avatar, Tooltip, Image } from '@nextui-org/react';

// NextJS
import Link from 'next/link';

// Interfaces
import { OrderProductCardProps } from '@interfaces/userOrder';

const OrderProductCard: FC<OrderProductCardProps> = ({ item, detailed }) => {
  const { quantity, price, product } = item;
  const {
    data: {
      id,
      attributes: {
        category,
        slug: productSlug,
        title,
        thumbnail: { url }
      }
    }
  } = product;
  const {
    data: {
      attributes: { slug: categorySlug }
    }
  } = category;

  return detailed ? (
    <div className="grid grid-cols-1 gap-2 mt-2">
      <div className="p-2 bg-background border-1 rounded-md">
        <div className="grid grid-cols-2">
          <div className="flex justify-start items-center">
            <Link href={`/products/${categorySlug}/${productSlug}`}>
              <Image
                src={url}
                alt={title}
                classNames={{
                  img: 'w-16 h-16 object-cover',
                  wrapper: 'mr-4'
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
      </div>
    </div>
  ) : (
    <Badge key={`product_${id}`} content={quantity} color="primary" size="sm">
      <Tooltip content={title}>
        <Link href={`/products/${categorySlug}/${productSlug}`}>
          <Avatar radius="md" size="sm" src={url} />
        </Link>
      </Tooltip>
    </Badge>
  );
};
export default OrderProductCard;
