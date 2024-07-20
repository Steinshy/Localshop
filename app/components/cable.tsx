'use client';

// React
import { useEffect, useContext } from 'react';

// Modules
import { Cable, Channel, createConsumer } from '@rails/actioncable';

// subProviders
import { CartContext } from '@subProviders/cartProvider';
import { UserContext } from '@subProviders/userProvider';

// Interfaces
import { ReceivedData } from '@interfaces/httpUtils';
const CableComponent = () => {
  const isProd = process.env.NODE_ENV === 'production';
  const cableURL = isProd ? 'wss://api.sandfox.ovh/cable' : 'ws://api.localshop.test:3005/cable';
  const userStore = useContext(UserContext),
    cartStore = useContext(CartContext),
    cable: Cable = createConsumer(cableURL);

  const { isLogged, refresh: userRefresh } = userStore,
    { refresh: cartRefresh } = cartStore;

  useEffect(() => {
    if (!isLogged()) return;

    const channel: Channel = cable.subscriptions.create('UsersChannel', {
      disconnected: () => console.log('ws: unsubscribed.'),
      connected: () => console.log('ws: subscribed.'),
      received: (received_data: ReceivedData) => {
        const { type } = received_data;

        if (type === 'user') void userRefresh();
        if (type === 'cart') void cartRefresh();
      },
    });

    return () => {
      channel.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged]);

  return <></>;
};

export default CableComponent;
