"use client";

// React
import { FC, useContext } from "react";

// NextJS
import { useRouter } from "next/navigation";

// NextUI
import { Button } from "@nextui-org/react";

// Icon
import { FaShoppingCart, FaArrowRight } from "react-icons/fa";

// Interface
import { ProductCardProps } from "@interfaces/product";
import { CartResponse } from "@interfaces/cart";

// Utils
import { CartContext } from "@utils/subProviders";
import http from "@utils/http";

const AddToCart: FC<ProductCardProps> = ({ product, isIconOnly }) => {
  const router = useRouter(), cartStore = useContext(CartContext);
  const { attributes } = cartStore.data;
  const { items } = attributes;

  const item = items.find(({ product:cartProduct }) => cartProduct.id.toString() === product.id);
  const quantity = item ? item.quantity : 0;
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    if (quantity > 0) {
      return router.push('/order/cart');
    }

    // CALL API ADD ITEM
    const apiCall = async () => {
      const response = await http.post('/cart/add_item', { product_id: product.id });
      const { data } = response?.data as { data: CartResponse };
      cartStore.update(data);
    }

    void apiCall();
  };

  return (
    <Button
      color={quantity > 0 ? 'success' : 'primary'}
      variant="solid"
      size={isIconOnly ? 'sm' : 'md'}
      radius="sm"
      onClick={handleClick}
      startContent={
        quantity >= 1 &&
        !isIconOnly && <FaArrowRight className="text-lg text-white" />
      }
      isIconOnly={isIconOnly}
      className={quantity > 0 ? 'text-white' : ''}
    >
      {isIconOnly ? (
        quantity > 0 ? (
          <FaArrowRight className="text-lg text-white" />
        ) : (
          <FaShoppingCart className="text-lg" />
        )
      ) : quantity > 0 ? (
        'Go to Cart'
      ) : (
        'Add to Cart'
      )}
    </Button>
  );
};

export default AddToCart;
