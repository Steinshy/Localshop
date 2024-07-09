'use client';

// React
import { useEffect, useContext } from "react";

// Modules
import { Cable, Channel, createConsumer } from '@rails/actioncable';

// Utils
import { UserContext, CartContext } from "@utils/subProviders";

interface ReceivedData {
  type: 'user' | 'cart';
}

const CableComponent = () => {
  const userStore = useContext(UserContext),
        cartStore = useContext(CartContext),
        cable:Cable = createConsumer('ws://api.localshop.test:3005/cable');

  const { refresh:userRefresh } = userStore, { refresh:cartRefresh } = cartStore;

  useEffect(() => {
    const channel:Channel = cable.subscriptions.create('UsersChannel',
      {
        disconnected: () => console.log('ws: unsubscribed.'),
        connected: () => console.log('ws: subscribed.'),
        received: (received_data:ReceivedData) => {
          // console.log("ws: received data.", received_data);
          const { type } = received_data;

          if (type === 'user') void userRefresh();
          if (type === 'cart') void cartRefresh();
        }
      }
    );

    return () => { channel.unsubscribe(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}

export default CableComponent;
