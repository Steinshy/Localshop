'use client';

// React
import { FC, useContext, useState } from 'react';

// NextUI
import { Image, Input } from '@nextui-org/react';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { Button, ButtonGroup } from '@nextui-org/button';

// Components
import CartButtonDelete from '@components/cart/cartButtonDelete';

// Interfaces
import { CartProductProps } from '@interfaces/cart';

// Utils
import { CartContext } from '@utils/subProviders';

// API
import { deleteCartItem, updateQuantity } from 'actions';

const CartProduct: FC<CartProductProps> = ({ cartItem }) => {
  const cartStore = useContext(CartContext);

  const { quantity, price, product } = cartItem;

  const { data } = product;
  const { attributes } = data;
  const { id, title, thumbnail } = attributes;

  const [currentQuantity, setCurrentQuantity] = useState<string>(quantity.toString());

  const deleteItem = async () => {
    const response = await deleteCartItem(id.toString());
    const { data } = response;
    cartStore.update(data);
  };

  const handleQuantityChange = (quantity: string) => {
    if (Number(quantity) <= 0) return void deleteItem();

    const apiCall = async () => {
      setCurrentQuantity(quantity);
      const response = await updateQuantity(quantity, id.toString());
      const { data } = response;
      cartStore.update(data);
    };

    void apiCall();
  };

  return (
    <>
      <Card className='flex flex-col gap-2 w-full'>
        <div className='flex justify-end'>
          <CartButtonDelete productId={id} cartStore={cartStore} />
        </div>
        <CardHeader className='flex justify-center'>
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
        </CardHeader>

        {/* Single item information */}
        <CardBody className='flex flex-col gap-2'>
          <div className='flex justify-center'>
            <span className='text-lg font-semibold'>{title}</span>
          </div>
          <div className='flex flex-row justify-center'>
            <Input className='gap-4' size='sm' label='Quantity' radius='full' color='primary' value={currentQuantity} />
            <ButtonGroup size='sm'>
              <Button
                onClick={() => handleQuantityChange((Number(currentQuantity) - 1).toString())}
                variant='solid'
                size='sm'
                className='ml-2'
                color='primary'
                radius='sm'
              >
                -
              </Button>
              <Button
                onClick={() => handleQuantityChange((Number(currentQuantity) + 1).toString())}
                variant='solid'
                size='sm'
                className='ml-2'
                color='primary'
                radius='sm'
              >
                +
              </Button>
            </ButtonGroup>
          </div>
          <CardFooter className='flex justify-center'>
            <div className='flex flex-grow items-center justify-center'>
              <p className='text-lg text-foreground'>{price * Number(currentQuantity)}€</p>
            </div>
          </CardFooter>
        </CardBody>
      </Card>
    </>
  );
};

export default CartProduct;
