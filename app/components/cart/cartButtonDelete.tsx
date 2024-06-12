// React
import { FC } from "react";

// NextUI
import { Button } from "@nextui-org/react";
import { FaTrash } from "react-icons/fa";

// Interfaces
import { CartResponse, CartContextType } from "@interfaces/cart";

// Helpers
import http from "@utils/http";

interface CartButtonDeleteProps {
  cartStore: CartContextType;
  productId: string;
}

const CartButtonDelete: FC<CartButtonDeleteProps> = ({ cartStore, productId }) => {

  // SEPARATE FUNCTION TO USE THE TWO BUTTONS
  const handleCartAction = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const apiCall = async () => {
      const response = await http.delete(`/cart/clear`);
      const { data } = response?.data as { data: CartResponse };
      cartStore.update(data);
    }
    void apiCall();
  };

  const handleItemAction = (productId: string, event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const apiCall = async () => {
      const response = await http.delete(`/cart/remove_item?product_id=${productId}`);
      const { data } = response?.data as { data: CartResponse };
      cartStore.update(data);
    }

    void apiCall();
  }

  return productId ? (
    <Button
      color="default"
      variant="light"
      onClick={(event) => handleItemAction(productId, event)}
      startContent={<FaTrash className="text-foreground/50" />}
      className="text-foreground/50">
    </Button>

  ) : (
    <Button
      color="default"
      variant="light"
      onClick={handleCartAction}
      startContent={<FaTrash className="text-foreground/50" />}
      className="text-foreground/50"
    >
      Delete Cart
    </Button>
  );
};

export default CartButtonDelete;
