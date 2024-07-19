// React
import { FC, useContext, useCallback } from 'react';

// NextUI
import { Button } from '@nextui-org/react';

// Icons
import { FaTrash } from 'react-icons/fa';

// subProviders
import { CartContext } from '@subProviders/cartProvider'

// Interfaces
import { CartClearBtnProps } from '@interfaces/cart';

// Actions
import { deleteCart, deleteCartItem } from '@actions/actionsCart';

const CartClearBtn: FC<CartClearBtnProps> = ({ id }) => {
  const cartStore = useContext(CartContext);
  if (!cartStore.data) return;

  const handleDeleteCart = useCallback((e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      const apiFetch = async () => {
        const { data, error } = await deleteCart();
        if (!error) cartStore.update(data);
      };

      void apiFetch();
    },
    [cartStore]
  );

  const handleDeleteItem = useCallback((e: React.MouseEvent<HTMLElement>, productId: string) => {
      e.preventDefault();
      const apiFetch = async () => {
        const { data, error } = await deleteCartItem(productId);
        if (!error) cartStore.update(data);
      };

      void apiFetch();
    }, [cartStore]);

  return id ? (
    <Button
      color='default'
      variant='light'
      className='text-foreground/25'
      onClick={(e) => handleDeleteItem(e, id)}
      startContent={<FaTrash />}
      isIconOnly
      size='sm'
    ></Button>
  ) : (
    <Button
      color='default'
      variant='light'
      onClick={handleDeleteCart}
      startContent={<FaTrash className='text-foreground/50' />}
      className='text-foreground/50'
    >
      Delete Cart
    </Button>
  );
};

export default CartClearBtn;
