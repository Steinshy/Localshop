'use client';

// React
import { FC, useContext, useState } from 'react';

// NextJS
import Link from 'next/link';

// NextUI
import { Link as NextLink, Button, Image, Input, Card, CardBody } from '@nextui-org/react';

// Components
import CartClearBtn from '@components/cart/cartClearBtn';

// Interfaces
import { CartProductProps } from '@interfaces/cart';

// Providers
import { CartContext } from '@providers/cartProvider';

// Actions
import { deleteCartItem, updateQuantity } from '@actions/actionsCart';

const CartProduct: FC<CartProductProps> = ({ cartItem }) => {
  const cartStore = useContext(CartContext),
    [isFetching, setIsFetching] = useState<boolean>(false);
  if (!cartStore.data) return;

  const { quantity, total, product } = cartItem;
  const {
    data: {
      id,
      attributes: { category, slug: productSlug, title, thumbnail }
    }
  } = product;
  const {
    data: {
      attributes: { slug: categorySlug }
    }
  } = category;

  const deleteItem = async () => {
    setIsFetching(true);
    const { data, error } = await deleteCartItem(id);
    setIsFetching(false);
    if (!error) cartStore.update(data);
  };

  const handleQuantityChange = (quantity: number) => {
    if (quantity <= 0) return void deleteItem();

    const apiCall = async () => {
      setIsFetching(true);
      const { data, error } = await updateQuantity(quantity, id);
      setIsFetching(false);
      if (!error) cartStore.update(data);
    };

    void apiCall();
  };

  return (
    <Card className="flex flex-col gap-2 w-full">
      <div className="flex justify-end">
        <CartClearBtn id={id} />
      </div>
      <div className="text-lg text-center font-semibold">
        <NextLink color="foreground" as={Link} href={`/products/${categorySlug}/${productSlug}`}>
          {title}
        </NextLink>
      </div>

      {/* Single item information */}
      <CardBody className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div className="flex flex-col items-center">
          <Link href={`/products/${categorySlug}/${productSlug}`}>
            <Image
              src={thumbnail.url}
              alt={title}
              classNames={{
                img: 'w-[150px] h-[150px] object-cover'
              }}
              radius="md"
              shadow="none"
              removeWrapper
            />
          </Link>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <Input
            className="gap-4"
            classNames={{
              mainWrapper: 'items-center',
              inputWrapper: 'p-0 w-[150px]',
              innerWrapper: 'w-[150px]',
              input: 'text-center'
            }}
            size="sm"
            radius="sm"
            color="default"
            value={quantity.toString()}
            startContent={
              <Button onClick={() => handleQuantityChange(quantity - 1)} variant="solid" size="sm" color="default" radius="sm" className="w-[40px]" style={{ minWidth: 0 }} isDisabled={isFetching}>
                -
              </Button>
            }
            endContent={
              <Button onClick={() => handleQuantityChange(quantity + 1)} variant="solid" size="sm" color="default" radius="sm" className="w-[40px]" style={{ minWidth: 0 }} isDisabled={isFetching}>
                +
              </Button>
            }
          />
          <p className="text-lg text-foreground">{total}</p>
        </div>
      </CardBody>
    </Card>
  );
};

export default CartProduct;
