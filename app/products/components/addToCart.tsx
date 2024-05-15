"use client";

// React
import { FC, useContext } from "react";

// Providers
import { CartContext } from "@/app/utils/subProviders";

// NextJS
import { useRouter } from "next/navigation";

// NextUI
import { Button } from "@nextui-org/react";

// Icon
import { FaShoppingCart, FaArrowRight } from "react-icons/fa";

// Interface
import { ProductCardProps } from "@/app/interfaces/product";

const AddToCart: FC<ProductCardProps> = ({ product, isIconOnly }) => {
  const { id, title, category, thumbnail, price, stock } = product;
  const cartStore = useContext(CartContext);

  const { attributes } = cartStore.data;
  const { items } = attributes;
  const item = items.find((item) => item.id === product.id);
  const quantity = item ? item.quantity : 0;
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    if (quantity > 0) {
      return router.push("/order/cart");
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
        stock,
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
