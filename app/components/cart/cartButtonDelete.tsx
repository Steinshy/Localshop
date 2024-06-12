// React
import { FC } from "react";

// NextUI
import { Button } from "@nextui-org/react";

// Icons
import { FaTrash } from "react-icons/fa";

// Interfaces
import { CartResponse, CartButtonDeleteProps } from "@interfaces/cart";

// Helpers
import http from "@utils/http";

const CartButtonDelete: FC<CartButtonDeleteProps> = ({ cartStore, productId }) => {
  const handleDeleteCart = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const apiFetch = async () => {
      const response = await http.delete(`/cart/clear`);
      const { data } = response?.data as { data: CartResponse };
      cartStore.update(data);
    };
    void apiFetch();
  };

  const handleDeleteItem = (productId: number, event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const apiFetch = async () => {
      const response = await http.delete(`/cart/remove_item?product_id=${productId}`);
      const { data } = response?.data as { data: CartResponse };
      cartStore.update(data);
    };

    void apiFetch();
  };

  return productId ? (
    <Button
      color="default"
      variant="light"
      className="text-foreground/25"
      onClick={(event) => handleDeleteItem(productId, event)}
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
