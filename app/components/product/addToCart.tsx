"use client";

// React
import { FC, useContext } from "react";

// NextJS
import { useRouter } from "next/navigation";

// NextUI
import { Button, ButtonProps } from "@nextui-org/react";

// Icon
import { FaShoppingCart, FaArrowRight } from "react-icons/fa";

// Actions
import { addItemToCart } from "actions";

// Interface
import { ProductCardProps } from "@interfaces/product";
import { CartResponse } from "@interfaces/cart";

// Utils
import { UserContext, CartContext } from "@utils/subProviders";
import { showToast } from "@utils/helpers";

const AddToCart: FC<ProductCardProps> = ({ product, isIconOnly }) => {
  const router = useRouter(),
        userStore = useContext(UserContext),
        cartStore = useContext(CartContext);

  const { isLogged } = userStore
  const { attributes } = cartStore.data
  const { items } = attributes
  const cartItem = items.find(({ product: cartProduct }) => cartProduct.id.toString() === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddItem = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (quantity > 0) {
      return router.push("/order/cart");
    }
    try {
      const apiCall = async () => {
        const response = await addItemToCart(product.id);
        const { data } = response?.data as { data: CartResponse };
        cartStore.update(data)
        showToast("Item has been added to your cart !", "success");
      };
      void apiCall();
    } catch (error) {
      showToast("Something went wrong !", "error");
    }
  }

  const btnOptions: ButtonProps = {
    color: quantity > 0 ? "success" : "primary",
    startContent: quantity > 0 && !isIconOnly && <FaArrowRight className="text-lg text-white" />,
    children: quantity > 0 ? "Go to Cart" : "Add to Cart",
  };

  const buttonContent = isIconOnly ? (
    <>{quantity > 0 ? <FaArrowRight className="text-lg text-white" /> : <FaShoppingCart className="text-lg" />}</>
  ) : (
    btnOptions.children
  );

  return isLogged() ? (
    <Button
      {...btnOptions}
      variant="solid"
      size={isIconOnly ? "sm" : "md"}
      radius="sm"
      onClick={handleAddItem}
      isIconOnly={isIconOnly}
      className={quantity > 0 ? "text-white" : ""}
    >
      {buttonContent}
    </Button>
  ) : null;
};

export default AddToCart;
