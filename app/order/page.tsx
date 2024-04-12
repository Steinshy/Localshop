import { redirect } from 'next/navigation';

const OrderPage = () => {
  redirect('/order/cart');
}

export default OrderPage;
