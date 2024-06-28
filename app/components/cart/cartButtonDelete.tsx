// React
import { FC } from "react";

// NextUI
import { Button } from "@nextui-org/react";

// Icons
import { FaTrash } from "react-icons/fa";

// Interfaces
import { CartButtonDeleteProps } from "@interfaces/cart";

// Actions
import { deleteCart, deleteCartItem } from "actions";

const CartButtonDelete: FC<CartButtonDeleteProps> = ({ productId, cartStore }) => {
  const handleDeleteCart = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const apiFetch = async () => {
      const response = await deleteCart();
      const { data } = response;
      cartStore.update(data);
    };

    void apiFetch();
  };

  const handleDeleteItem = (e: React.MouseEvent<HTMLElement>, productId: string) => {
    e.preventDefault();

    const apiFetch = async () => {
      const response = await deleteCartItem(productId);
      const { data } = response;
      cartStore.update(data);
    };

    void apiFetch();
  };

  return productId ? (
    <Button
      color="default"
      variant="light"
      className="text-foreground/25"
      onClick={(e) => handleDeleteItem(e, productId.toString())}
      startContent={<FaTrash />}
      isIconOnly
      size="sm"
    ></Button>
  ) : (
    <Button
      color="default"
      variant="light"
      onClick={handleDeleteCart}
      startContent={<FaTrash className="text-foreground/50" />}
      className="text-foreground/50"
    >
      Delete Cart
    </Button>
  );
};

export default CartButtonDelete;
