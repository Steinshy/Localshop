// React
import { FC } from 'react';

// NextJS
import { redirect } from 'next/navigation';

const OrderPage:FC = () => {
  redirect('/order/cart');
}

export default OrderPage;
