// React
import { FC, useContext } from "react";

// NextJS
import Link from "next/link";

// NextUI
import { Image, Button, Input } from "@nextui-org/react";

// Icons
import { FaTrash } from "react-icons/fa";

// Interfaces
import { CartProductProps } from "@/app/interfaces/cart";

// Helpers
import { generateSlug } from "@/app/utils/helpers";

// Store
import { CartContext } from "@/app/utils/subProviders";

// type CartItemObj = {
//   id: number;
//   quantity: number;
//   price: number;
//   product: {
//     id: number;
//     title: string;
//     description: string;
//     price: number;
//     discountPercentage: number;
//     rating: number;
//     stock: number;
//     brand: string;
//     thumbnail: {
//       url: string;
//       full: string;
//     };
//     images: {
//       thumbnail: string;
//       full: string;
//     }[];
//   };
// };

const CartProduct:FC<CartProductProps> = ({ cartItem }) => {
  // const cartStore = useContext(CartContext);
  const { quantity, price, product } = cartItem;
  const { id, title, thumbnail } = product;

  const slug = generateSlug(title);

  const handleRemoveItem = (event: React.MouseEvent<HTMLElement>, id: number) => {
    event.preventDefault();

    // API call to remove the item from the cart
    // cartStore.update(newCart);
  };

  // const handleQuantityChange = (id: number) => {
  //   // API call to update the quantity of the item
  //   // cartStore.update();
  // };

  return (
    <li key={id} className="p-2 bg-background border-1 rounded-md">
      <div className="grid grid-cols-2">
        <div className="flex justify-start items-center">
          <Link href={`/products/${id}/${slug}`}>
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
        <div className="flex justify-end items-start">
          <Button
            color="default"
            variant="light"
            className="text-foreground/25"
            onClick={(e) => handleRemoveItem(e, id)}
            startContent={<FaTrash />}
            isIconOnly
            size="sm"
          />
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
        {/* <Input
          isRequired
          min="0"
          type="number"
          value={quantity.toString()}
          onChange={(e) => handleQuantityChange(e.target.value, id)}
        /> */}
        <p className="text-lg text-foreground">{price * quantity}€</p>
      </div>
    </li>
  );
};

export default CartProduct;
