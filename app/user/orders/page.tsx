// NextJS
import { Metadata } from 'next';

// Components
import OrdersList from '@components/user/order/ordersList';

// Actions
import { getOrders } from '@actions/actionsUserOrders';

export const metadata: Metadata = { title: 'Orders'};

const OrdersPage = async () => {
  const { data:orders, pagy, error } = await getOrders();
  return <OrdersList items={orders} pageInfos={pagy} pageError={error} />;
};

export default OrdersPage;
