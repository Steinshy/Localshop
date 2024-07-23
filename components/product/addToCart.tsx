'use client';

// React
import { FC, useContext, useState } from 'react';

// NextJS
import { useRouter } from 'next/navigation';

// NextUI
import { Button } from '@nextui-org/react';

// Icon
import { FaShoppingCart, FaArrowRight } from 'react-icons/fa';

// Actions
import { addItemToCart } from '@actions/actionsCart';

// Interface
import { AddToCartProps } from '@interfaces/cart';
import { ProductResponse } from '@interfaces/product';

// Providers
import { CartContext } from '@providers/cartProvider';
import { UserContext } from '@providers/userProvider';

// Utils
import { showToast } from '@utils/helpers';

const AddToCart: FC<AddToCartProps> = ({ localProduct, isIconOnly = false }) => {
  const cartStore = useContext(CartContext),
    userStore = useContext(UserContext),
    router = useRouter();

  const [isFetching, setItFetching] = useState<boolean>(false);

  if (!cartStore.data || !userStore.isLogged) return null;
  const { items } = cartStore.data?.attributes || { items: [] };
  const cartItem = items.find(({ product: cartProduct }: { product: { data: ProductResponse } }) => cartProduct.data.id === localProduct.id);
  const cartItemsQuantity = cartItem ? cartItem.quantity : 0;

  const handleAddItem = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (cartItemsQuantity > 0) return router.push('/order');

    const apiFetch = async () => {
      const { data, error } = await addItemToCart(localProduct.id);
      setItFetching(false);
      if (error) return showToast(error.message, 'error');

      cartStore.update(data);
      showToast(`${localProduct.attributes.title}\nhas been added to your cart!`, 'success');
    };

    setItFetching(true);
    void apiFetch();
  };

  return (
    <Button
      isLoading={isFetching}
      variant="solid"
      color={cartItemsQuantity > 0 ? 'success' : 'primary'}
      size={isIconOnly ? 'sm' : 'md'}
      radius="sm"
      onClick={(e) => handleAddItem(e)}
      isIconOnly={isIconOnly}
      startContent={cartItemsQuantity < 1 && !isIconOnly && !isFetching && <FaShoppingCart className="text-lg" />}
      endContent={cartItemsQuantity > 0 && !isIconOnly && !isFetching && <FaArrowRight className="text-lg" />}
      className={cartItemsQuantity > 0 ? 'text-white' : ''}
    >
      {isIconOnly ? cartItemsQuantity > 0 ? <FaArrowRight className="text-lg text-white" /> : <FaShoppingCart className="text-lg" /> : cartItemsQuantity > 0 ? 'Go to Cart' : 'Add to Cart'}
    </Button>
  );
};

export default AddToCart;
