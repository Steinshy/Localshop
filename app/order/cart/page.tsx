'use client';

// React
import { useContext, useState, useEffect } from 'react';

// Components
import CartContentView from '@components/cart/cartContentView';
import CartEmptyView from '@components/cart/cartEmptyView';

// Utils
import { CartContext } from '@utils/subProviders';

const CartPage = () => {
  const [hasRefreshed, setHasRefreshed] = useState(false);

  const cartStore = useContext(CartContext);
  const { data: { attributes } } = useContext(CartContext);
  const { items } = attributes;

  useEffect(() => {
    if (!hasRefreshed) {
      async () => {
        try {
          await cartStore.refresh();
        } catch (error) {
          console.error('Failed to refresh cart:', error);
        }
        setHasRefreshed(true);
      };
    }
  }, [cartStore, hasRefreshed]);

  return (
    <div className='flex flex-col col-span-1 lg:col-span-2'>
      {items.length > 0 ? <CartContentView items={items} cartStore={cartStore} /> : <CartEmptyView />}
    </div>
  );
};

export default CartPage;
