'use client';

// React
import { FC, useContext, useCallback } from 'react';

// NextJS
import { useRouter } from 'next/navigation';

// NextUI
import { Button, ButtonProps } from '@nextui-org/react';

// Icon
import { FaShoppingCart, FaArrowRight } from 'react-icons/fa';

// Actions
import { addItemToCart } from 'actions';

// Interface
import { AddToCartProps } from '@interfaces/cart';

// Utils
import { UserContext, CartContext } from '@utils/subProviders';
import { showToast } from '@utils/helpers';

const AddToCart: FC<AddToCartProps> = ({ localProduct, isIconOnly = false }) => {
  const router = useRouter(),
    userStore = useContext(UserContext),
    cartStore = useContext(CartContext);

  // Cart & User
  const { isLogged } = userStore, { data: { attributes: { items } }} = cartStore;

  // localProduct
  const { id: product_id } = localProduct;
  const cartItem = items.find(({ product: cartProduct }) => cartProduct.data.id.toString() === product_id);
  const cartItemsQuantity = cartItem ? cartItem.quantity : 0;

  const handleAddItem = useCallback(
    async (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      if (cartItemsQuantity > 0) {
        return router.push('/order/cart');
      }
      try {
        const response = await addItemToCart(product_id);
        const { data } = response;
        cartStore.update(data);
        showToast('Item has been added to your cart !', 'success');
      } catch (error) {
        showToast('Something went wrong !', 'error');
      }
    },
    [cartItemsQuantity, product_id, router, cartStore]
  );

  const btnOptions: ButtonProps = {
    color: cartItemsQuantity > 0 ? 'success' : 'primary',
    startContent: cartItemsQuantity > 0 && !isIconOnly && <FaArrowRight className='text-lg text-white' />,
    children: cartItemsQuantity > 0 ? 'Go to Cart' : 'Add to Cart',
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    handleAddItem(e).catch((error) => {
      console.error('Error adding item to cart:', error);
    });
  };

  const buttonContent = isIconOnly ? (
    cartItemsQuantity > 0 ? (
      <FaArrowRight className='text-lg text-white' />
    ) : (
      <FaShoppingCart className='text-lg' />
    )
  ) : (
    btnOptions.children
  );

  return isLogged() ? (
    <Button
      {...btnOptions}
      variant='solid'
      size={isIconOnly ? 'sm' : 'md'}
      radius='sm'
      onClick={handleClick}
      isIconOnly={isIconOnly}
      className={cartItemsQuantity > 0 ? 'text-white' : ''}
    >
      {buttonContent}
    </Button>
  ) : null;
};

export default AddToCart;
