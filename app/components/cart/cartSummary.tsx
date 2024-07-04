// React
import { FC } from 'react';

// NextUi
import { Card } from '@nextui-org/card';

// Components
import CartDiscount from '@components/cart/cartDiscount';
import OrderProcessButton from '@components/cart/orderProcessButton';

// Interfaces
import { CartSummaryProps } from '@interfaces/cart';

const CartSummary: FC<CartSummaryProps> = ({ items, coupon, finalPrice, totalPrice }) => {
  const { data } = coupon || {};
  const { attributes } = data || {};
  const { code: couponCode, discount: couponDiscount } = attributes || {};
  
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

      <hr className='my-4' />
      <div className='grid grid-cols-2 gap-4 text-foreground'>
        <p className='text-lg text-start'>Total:</p>
        <p className='text-lg text-end'>{totalPrice}€</p>
      </div>
      {couponDiscount > 0 && (
        <>
          <div className='grid grid-cols-1 gap-4'>
            <p className='text-small text-end mb-4 text-foreground/75 italic'>-{couponDiscount}%</p>
          </div>

          <hr className='my-4' />
          <div className='grid grid-cols-2 gap-4 text-foreground'>
            <p className='text-lg text-start'>Subtotal:</p>
            <p className='text-lg text-end'>{finalPrice}€</p>
          </div>

          <div className='grid grid-cols-1 gap-4'>
            <p className='text-small text-center mb-4 text-foreground/75 italic'>
              Shipping and taxes will be calculated at checkout
            </p>
          </div>
        </>
      )}

      {/* COUPONS */}
      <CartDiscount couponCode={couponCode} couponDiscount={couponDiscount} totalPrice={totalPrice} />

      {/* Shipping - Payment Button */}
      <div className='grid gap-4'>
        <OrderProcessButton items={items} />
      </div>
    </Card>
  );
};

export default CartSummary;
