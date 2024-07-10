'use client';

// React
import { useContext } from 'react';

// NextUi
import { Card } from '@nextui-org/card';

// Components
import CartDiscount from '@components/cart/cartDiscount';
import CheckoutButton from '@components/cart/checkoutButton';

// Utils
import { CartContext } from '@utils/subProviders';

const CartSummary = () => {
  const cartStore = useContext(CartContext);
  const {
    data: {
      attributes: { coupon, totalPrice, finalPrice, items },
    },
  } = cartStore;
  const {
    data: {
      attributes: { code, discount },
    },
  } = coupon || { data: { attributes: {} } };

  return (
    <Card className='sticky top-[70px] border-1 p-4 rounded-md'>
      <h2 className='text-2xl font-semibold mb-4 text-foreground text-center'>Order summary</h2>
      <div className='grid grid-cols-2 gap-4'>
        <p className='text-lg text-start'>Shipping:</p>
        <p className='text-lg text-end'>0€</p>
      </div>

      <div className='grid grid-cols-2 gap-4 text-foreground'>
        <p className='text-lg text-start'>Taxes:</p>
        <p className='text-lg text-end'>0€</p>
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
