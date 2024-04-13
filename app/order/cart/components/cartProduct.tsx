// React
import { FC } from "react";

// NextJS
import Link from "next/link";

// NextUI
import { Image, Button, Input } from "@nextui-org/react";

// Icons
import { FaTrash } from "react-icons/fa";

// Interfaces
import { CartProductProps } from "../../../interfaces/cart";

// Helpers
import { generateSlug } from "../../../utils/helpers";

const CartProduct:FC<CartProductProps> = ({ cartStore, itemcart }) => {
  const slug = generateSlug(itemcart.title);

  const handleUpdateCart = (event: React.MouseEvent<HTMLElement>, id: number) => {
    event.preventDefault();

    const newCart = cartStore.data.filter((item) => item.id !== id);
    cartStore.update(newCart);
  };

  const handleQuantityChange = (value: string, id: number) => {
    const newCart = cartStore.data.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: parseInt(value) };
      }
      return item;
    });
    cartStore.update(newCart);
  };

  return (
    <li key={itemcart.id} className="p-2 bg-background border-1 rounded-md">
      <div className="grid grid-cols-2">
        <div className="flex justify-start items-center">
          <Link href={`/products/${itemcart.id}/${slug}`}>
            <Image
              src={itemcart.thumbnail}
              alt={itemcart.title}
              classNames={{
                img: "w-16 h-16 object-cover",
                wrapper: "mr-4",
              }}
              radius="md"
              shadow="none"
            />
          </Link>
          <p className="text-lg text-foreground font-semibold">{itemcart.title}</p>
        </div>
        <div className="flex justify-end items-start">
          <Button
            color="default"
            variant="light"
            className="text-foreground/25"
            onClick={(e) => handleUpdateCart(e, itemcart.id)}
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
        <p className="text-lg text-foreground">{itemcart.price}€</p>
        <Input
          type="number"
          value={itemcart.quantity?.toString() || ""}
          onChange={(e) => handleQuantityChange(e.target.value, itemcart.id)}
        />
        <p className="text-lg text-foreground">{itemcart.price * itemcart.quantity}€</p>
      </div>
    </li>
  );
};

export default CartProduct;
