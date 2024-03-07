"use client";

// React Context
import { FC, useContext } from "react";
import { CartContext } from "../../utils/cartProvider";

// NextUi - Reat Icon
import { Button } from "@nextui-org/react";
import { FaCartPlus } from "react-icons/fa";

// Interface - ProductCardProps
import { ProductCardProps } from "../../utils/site";

const AddToCart: FC<ProductCardProps> = ({ product }) => {
  const cartStore = useContext(CartContext);

  if (!product || !cartStore) {
    return null;
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    
    const item = cartStore.data.find((item) => item.id === product.id);
    if (item) {
      const newCart = cartStore.data.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      cartStore.update(newCart);
      return;
    } else {
      const newItem = {
        id: product.id,
        discount: 0,
        quantity: 1,
        price: product.price,
        title: product.title,
        category: product.category,
        thumbnail: product.thumbnail,
      };

      cartStore.update([...cartStore.data, newItem]);
    }
  };

  return (
    <Button
      isIconOnly
      color="primary"
      variant="flat"
      size="sm"
      radius="sm"
      onClick={handleClick}
    >
      <FaCartPlus className="text-lg" />
    </Button>
  );
};

export default AddToCart;
