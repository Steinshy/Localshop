// React
import { FC } from "react";

// NextUI
import { Button } from "@nextui-org/react";

// Icons
import { FaTrash } from "react-icons/fa";

// Interfaces
import { CartButtonDeleteProps, CartGeneralResponse } from "@interfaces/cart";

// Utils
import http from "@utils/http";

const CartButtonDelete: FC<CartButtonDeleteProps> = ({ productId, cartStore }) => {
  const handleDeleteCart = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const apiFetch = async () => {
      const response = await http.delete(`/cart/clear`);
      const { data } = response?.data as { data: CartGeneralResponse };
      cartStore.update(data);
    };
    void apiFetch();
  };

  const handleDeleteItem = (productId: string, event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const apiFetch = async () => {
      const response = await http.delete(`/cart/remove_item?product_id=${productId}`);
      const { data } = response?.data as { data: CartGeneralResponse };
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
