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

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    AddNewItem();
  };

  const AddNewItem = () => {
    const newItem = {
      id: product.id,
      discount: 0,
      quantity: 1,
    };

    cartStore.update([...cartStore.data, newItem]);
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
