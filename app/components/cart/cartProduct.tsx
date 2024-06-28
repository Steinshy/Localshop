'use client';

// React
import { FC, useContext, useState } from "react";

// NextJS
import Link from "next/link";

// NextUI
import { Image, Input } from "@nextui-org/react";

// Components
import CartButtonDelete from "@components/cart/cartButtonDelete";

// Interfaces
import { CartProductProps } from "@interfaces/cart";

// Utils
import { generateSlug } from "@utils/helpers";
import { CartContext } from "@utils/subProviders";

// Actions
import { deleteCartItem, updateQuantity } from "actions";

const CartProduct: FC<CartProductProps> = ({ cartItem }) => {  
  const cartStore = useContext(CartContext);
  const { quantity, price, product } = cartItem;
  const { data: { attributes: { id, title, thumbnail } } } = product;

  const [currentQuantity, setCurrentQuantity] = useState<string>(quantity.toString());
  const slug = generateSlug(title);

  const deleteItem = async () => {
    const response = await deleteCartItem(id.toString());
    const { data } = response;
    cartStore.update(data);
  }

  const handleQuantityChange = (quantity: string) => {
    if (Number(quantity) <= 0) return void deleteItem();

    const apiCall = async () => {
      setCurrentQuantity(quantity);
      const response = await updateQuantity(quantity, id.toString());
      const { data } = response;
      cartStore.update(data);
    };

    void apiCall();
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
                img: "w-16 h-16 object-cover"
              }}
              radius="md"
              shadow="none"
              removeWrapper
            />
            <span className="text-lg text-foreground font-semibold">{title}</span>
          </Link>
        </div>

        {/* Remove item */}
        <div className="flex justify-end items-start">
          <CartButtonDelete productId={id} cartStore={cartStore} />
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
