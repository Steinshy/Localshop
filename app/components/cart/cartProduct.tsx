"use client";

// React
import { FC, useContext, useState } from "react";

// NextJS
import Link from "next/link";

// NextUI
import { Image, Button, Input } from "@nextui-org/react";

// Icons
import { FaTrash } from "react-icons/fa";

// Interfaces
import { CartProductProps, CartResponse } from "@interfaces/cart";

// Helpers
import { generateSlug } from "@utils/helpers";
import http from "@utils/http";

// Providers
import { CartContext } from "@utils/subProviders";

const CartProduct: FC<CartProductProps> = ({ cartItem }) => {
  const cartStore = useContext(CartContext);
  const { quantity, price, product } = cartItem;
  const { id, title, thumbnail } = product;
  const [currentQuantity, setCurrentQuantity] = useState<string>(quantity.toString());
  const slug = generateSlug(title);

  const removeItem = async () => {
    const response = await http.delete(`/cart/remove_item?product_id=${product.id}`);
    const { data } = response?.data as { data: CartResponse };
    cartStore.update(data);
  };

  const handleQuantityChange = (quantity: string) => {
    if (Number(quantity) <= 0) return void removeItem();
    const apiCall = async () => {
      setCurrentQuantity(quantity);
      const response = await http.post("/cart/update_quantity", { product_id: product.id, quantity: quantity });
      const { data } = response?.data as { data: CartResponse };
      cartStore.update(data);
    };

    void apiCall();
  };

  const handleRemoveItem = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    void removeItem();
  };

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
            onClick={handleRemoveItem}
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
        <Input
          isRequired
          min="0"
          type="number"
          value={currentQuantity.toString()}
          onChange={(e) => handleQuantityChange(e.target.value)}
        />
        <p className="text-lg text-foreground">{price * Number(currentQuantity)}€</p>
      </div>
    </li>
  );
};

export default CartProduct;
