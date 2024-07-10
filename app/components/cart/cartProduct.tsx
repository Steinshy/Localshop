'use client';

// React
import { FC, useContext, useEffect, useState } from 'react';

// NextUI
import { Image, Input } from '@nextui-org/react';
import { Card, CardBody } from '@nextui-org/card';
import { Button } from '@nextui-org/button';

// Components
import CartClearBtn from '@components/cart/cartClearBtn';

// Interfaces
import { CartProductProps } from '@interfaces/cart';

// Utils
import { CartContext } from '@utils/subProviders';

// API
import { deleteCartItem, updateQuantity } from 'actions';

const CartProduct: FC<CartProductProps> = ({ cartItem }) => {
  const cartStore = useContext(CartContext);
  const { quantity, price, product } = cartItem;
  const { data: { id, attributes: { title, thumbnail } } } = product;
  const [currentQuantity, setCurrentQuantity] = useState<number>(quantity);

  // Context - CartItem - Used to refresh after sync
  const { data: { attributes: { items } } } = cartStore;
  const ContextCartItem = items.find(({ product: cartProduct }) => cartProduct.data.id.toString() === id);

  useEffect(() => {
    if(ContextCartItem?.quantity) setCurrentQuantity(ContextCartItem?.quantity);
  }, [ContextCartItem?.quantity]);

  const deleteItem = async () => {
    const { data, error } = await deleteCartItem(id);
    if (!error) cartStore.update(data);
  };

  const handleQuantityChange = (quantity: number) => {
    if (quantity <= 0) return void deleteItem();

    const apiCall = async () => {
      setCurrentQuantity(quantity);
      const { data, error } = await updateQuantity(quantity, id);
      if (!error) cartStore.update(data);
    };

    void apiCall();
  };

  return (
    <Card className='flex flex-col gap-2 w-full'>
      <div className='flex justify-end'>
        <CartClearBtn id={id} cartStore={cartStore} />
      </div>

      {/* Single item information */}
      <CardBody className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
        <div className='flex flex-col items-center'>
          <Image
            src={thumbnail.url}
            alt={title}
            classNames={{
              img: 'w-[150px] h-[150px] object-cover',
            }}
            radius='md'
            shadow='none'
            removeWrapper
          />
          <span className='text-lg font-semibold'>{title}</span>
        </div>
        <div className='flex flex-col justify-center items-center gap-2'>
          <Input
            className='gap-4'
            classNames={{
              mainWrapper: 'items-center',
              inputWrapper: 'p-0 w-[150px]',
              innerWrapper: 'w-[150px]',
              input: 'text-center',
            }}
            size='sm'
            radius='sm'
            color='default'
            value={currentQuantity.toString()}
            startContent={
              <Button
                onClick={() => handleQuantityChange(currentQuantity - 1)}
                variant='solid'
                size='sm'
                color='default'
                radius='sm'
                className='w-[40px]'
                style={{ minWidth: 0 }}
              >
                -
              </Button>
            }
            endContent={
              <Button
                onClick={() => handleQuantityChange(currentQuantity + 1)}
                variant='solid'
                size='sm'
                color='default'
                radius='sm'
                className='w-[40px]'
                style={{ minWidth: 0 }}
              >
                +
              </Button>
            }
          />
          <p className='text-lg text-foreground'>{price * currentQuantity}€</p>
        </div>
      </CardBody>
    </Card>
  );
};

export default CartProduct;
