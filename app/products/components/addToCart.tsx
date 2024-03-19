"use client";

// React Context
import { FC, useContext } from "react";
import { CartContext } from "../../utils/cartProvider";

// Next - navigation
import Link from "next/link";
import { useRouter } from "next/navigation";

// NextUi - Reat Icon
import { Button } from "@nextui-org/react";
import { FaShoppingCart, FaArrowRight } from "react-icons/fa";

// Interface - ProductCardProps
import { ProductCardProps } from "../../utils/interfaces";

const AddToCart: FC<ProductCardProps> = ({ product, isIconOnly = false }) => {
  const { id, title, category, thumbnail, price } = product;
  const cartStore = useContext(CartContext);
  const item = cartStore.data.find((item) => item.id === product.id);
  const quantity = item ? item.quantity : 0;
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    if (quantity > 0) {
      return router.push("/cart");
    }

    if (item) {
      item.quantity += 1;
      cartStore.update((prev) =>
        prev.map((i) => (i.id === item.id ? item : i))
      );
    } else {
      const newItem = {
        id,
        discount: 0,
        quantity: 1,
        price,
        title,
        category,
        thumbnail,
      };

      cartStore.update((prev) => [...prev, newItem]);
    }
  };

  return (
    <Button
      color={quantity > 0 ? "success" : "primary"}
      variant="solid"
      size={isIconOnly ? "sm" : "md"}
      radius="sm"
      href="/cart"
      as={Link}
      onClick={handleClick}
      startContent={
        quantity >= 1 &&
        !isIconOnly && <FaArrowRight className="text-lg text-white" />
      }
      isIconOnly={isIconOnly}
      className={quantity > 0 ? "text-white" : ""}
    >
      {isIconOnly ? (
        quantity > 0 ? (
          <FaArrowRight className="text-lg text-white" />
        ) : (
          <FaShoppingCart className="text-lg" />
        )
      ) : quantity > 0 ? (
        "Go to Cart"
      ) : (
        `Add to Cart`
      )}
    </Button>
  );
};

export default AddToCart;
