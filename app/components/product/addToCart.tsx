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
import { addItemToCart } from '@actions/actionsCart';

// Interface
import { AddToCartProps } from '@interfaces/cart';

// Utils
import { CartContext } from '@subProviders/cartProvider';
import { UserContext } from '@subProviders/userProvider';
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

  const handleAddItem = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (cartItemsQuantity > 0) return router.push('/order');

    const apiFetch = async () => {
      const { data, error } = await addItemToCart(product_id);
      if (error) return showToast(error.message, 'error');

      cartStore.update(data);
      showToast(`${localProduct.attributes.title} has been added to your cart!`, 'success');
    }

    void apiFetch();
  }, [localProduct, cartItemsQuantity, product_id, router, cartStore]);

  const btnOptions: ButtonProps = {
    color: cartItemsQuantity > 0 ? 'success' : 'primary',
    startContent: cartItemsQuantity > 0 && !isIconOnly && <FaArrowRight className='text-lg text-white' />,
    children: cartItemsQuantity > 0 ? 'Go to Cart' : 'Add to Cart',
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
      onClick={(e) => handleAddItem(e)}
      isIconOnly={isIconOnly}
      startContent={cartItemsQuantity > 0 ? null : isIconOnly ? null : <FaShoppingCart className='text-lg' />}
      endContent={cartItemsQuantity > 0 ? isIconOnly ? null : <FaArrowRight className='text-lg text-white' /> : null}
      className={cartItemsQuantity > 0 ? 'text-white' : ''}
    >
      {buttonContent}
    </Button>
  ) : null;
};

export default AddToCart;
