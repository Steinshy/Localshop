'use client';

// React
import { useContext } from 'react';

// Next
import Link from 'next/link';

// NextJS
import { usePathname } from 'next/navigation';

// NextUI
import { Avatar, Badge, Card, Tooltip } from '@nextui-org/react';

// Components
import CartDiscount from '@components/cart/cartDiscount';
import CheckoutButton from '@components/cart/checkoutButton';

// subProviders
import { CartContext } from '@subProviders/cartProvider';

// Interfaces
import { AddressResponse } from '@interfaces/userAddress';
import { CartItemProps } from '@interfaces/cart';

const CartSummary = () => {
  const cartStore = useContext(CartContext), pathname = usePathname();
  if (!cartStore.data) return;
  const { shipping, billing, data: { attributes: { coupon, totalPrice, finalPrice, items, shipping_price, taxes_price } } } = cartStore;
  const { data: { attributes: { code, discount } } } = coupon || { data: { attributes: {} } };

  const Address = ({ address }:{ address: AddressResponse }) => {
    const { attributes } = address;
    const { lastname, firstname, address:line, zip, city, state, country, phone } = attributes;

    return (
      <>
        <p>{lastname} {firstname}</p>
        <p>{line}</p>
        <p>{zip} {city} {state} {country}</p>
        <p>{phone}</p>
      </>
    )
  };

  return (
    <Card className='sticky top-[70px] border-1 p-4 rounded-md'>
      <h2 className='text-2xl font-semibold mb-4 text-foreground text-center'>Order summary</h2>
      {(items.length > 0 && pathname !== '/order') &&
        <>
          <div className='text-sm'>
            <p className='text-md font-semibold'>Products</p>
            <div className='grid grid-cols-9 gap-2 pt-2'>
              {items.map((item: CartItemProps) => {
                const { quantity, product } = item;
                const { data: { id, attributes: { category, slug, title, thumbnail: { url } } } } = product;
                const { data: { attributes: { slug: categorySlug } } } = category;
                return (
                  <Badge key={`product_${id}`} content={quantity} color='primary' size='sm'>
                    <Tooltip content={title}>
                      <Link href={`/products/${categorySlug}/${slug}`}>
                        <Avatar radius='md' size='sm' src={url} />
                      </Link>
                    </Tooltip>
                  </Badge>
                )
              })}
            </div>
          </div>
          <hr className='my-4' />
        </>
      }
      {((shipping || billing) && pathname !== '/order') &&
        <>
          <div className='text-sm flex flex-col gap-2'>
            {shipping &&
              <div>
                <p className='text-md font-semibold'>Shipped to</p>
                <Address address={shipping} />
              </div>
            }
            {billing &&
              <div>
                <p className='text-md font-semibold'>Billed to</p>
                <Address address={billing} />
              </div>
            }
          </div>
          <hr className='my-4' />
        </>
      }
      <div className='grid grid-cols-2 gap-4'>
        <p className='text-lg text-start'>Shipping:</p>
        <p className='text-lg text-end'>{shipping_price}€</p>
      </div>

      <div className='grid grid-cols-2 gap-4 text-foreground'>
        <p className='text-lg text-start'>Taxes:</p>
        <p className='text-lg text-end'>{taxes_price}€</p>
      </div>

      <p className='text-small text-foreground/75 italic'>Shipping and taxes will be calculated at checkout</p>

      <hr className='my-4' />
      <div className='grid grid-cols-2 gap-4 text-foreground'>
        <p className='text-lg text-start'>Total:</p>
        <p className={`text-end ${discount ? 'text-foreground/50 text-md' : 'text-lg'}`}>{totalPrice}€</p>
      </div>
      {discount && (
        <>
          <p className='text-small text-end text-foreground/75 italic'>-{discount}%</p>
          <p className='text-end text-lg'>{finalPrice}€</p>
        </>
      )}

      <hr className='my-4' />

      {/* COUPONS */}
      <CartDiscount couponCode={code} couponDiscount={discount} totalPrice={totalPrice} />

      {/* Shipping - Payment Button */}
      <CheckoutButton items={items} />
    </Card>
  )
};

export default CartSummary;
