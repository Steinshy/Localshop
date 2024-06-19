"use client";

// React
import { FC, useContext, useCallback } from "react";

// NextJS
import { useRouter } from "next/navigation";

// NextUI
import { Button } from "@nextui-org/react";

// Icon
import { FaShoppingCart, FaArrowRight } from "react-icons/fa";

// API
import { addItemToCart } from "actions";

// Interface
import { ProductCardProps } from "@interfaces/product";

// Utils
import { UserContext, CartContext } from "@utils/subProviders";
import { showToast } from "@utils/helpers";

const AddToCart: FC<ProductCardProps> = ({ product, isIconOnly }) => {
  const router = useRouter();
  const userStore = useContext(UserContext);
  const cartStore = useContext(CartContext);
  const { isLogged } = userStore;
  const { attributes } = cartStore.data;
  const { items } = attributes;
  const cartItem = items.find(({ product: cartProduct }) => cartProduct.id.toString() === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddItemToCart = useCallback(() => {
    if (quantity > 0) {
      return router.push("/order/cart");
    }
    try {
      const apiCall = async () => {
        const { data } = await addItemToCart(product.id);
        cartStore.update(data);
        showToast("Item has been added to your cart !", "success");
      };
      void apiCall();
    } catch (error) {
      showToast("Something went wrong !", "error");
    }
  }, [product.id, quantity, cartStore, router]);

  return isLogged() ? (
    <Button
      variant="solid"
      size={isIconOnly ? "sm" : "md"}
      radius="sm"
      color={quantity > 0 ? "success" : "primary"}
      onClick={() => handleAddItemToCart()}
      isIconOnly={isIconOnly}
      className={quantity > 0 ? "text-white" : ""}
      startContent={
        quantity > 0 ? <FaArrowRight className="text-lg text-white" /> : <FaShoppingCart className="text-lg" />
      }
    >
      {quantity > 0 ? "Go to Cart" : "Add to Cart"}
    </Button>
  ) : null;
};

export default AddToCart;
