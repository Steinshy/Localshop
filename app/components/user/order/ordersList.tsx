'use client';

// React
import { FC, useState } from 'react';

// NextUI
import { Button, Spinner } from '@nextui-org/react';

// Components
import OrderCard from '@components/user/order/orderCard';
import SearchBar from '@components/searchBar';

// Actions
import { getOrders } from '@actions/actionsUserOrders';

// Interfaces
import { OrderListProps, OrderResponse } from '@interfaces/userOrder';
import { PagyProps } from '@interfaces/general';
import { ErrorObj } from '@interfaces/httpUtils';

// Utils
import { showToast } from '@utils/helpers';

const OrdersList: FC<OrderListProps> = ({ items = [], pageInfos = { page: 1, pages: 1 }, pageError }) => {
  const [orders, setOrders] = useState<OrderResponse[]>(items),
        [isFetching, setIsFetching] = useState<boolean>(false),
        [query, setQuery] = useState<string>(''),
        [pagy, setPagy] = useState<PagyProps>(pageInfos),
        [error, setError] = useState<Error | ErrorObj | string | undefined>(pageError);

  const fetch = (page?: number, query?: string) => {
    const apiFetch = async () => {
      const { data, pagy, error } = await getOrders(page, query);
      setIsFetching(false);

      if (error) {
        setError(error);
        return showToast(error.message, 'error');
      }

      setOrders(data);
      setPagy(pagy);
    };

    setIsFetching(true);
    void apiFetch();
  };

  const handlePreviousPage = () => {
    void fetch(pagy.page - 1, query);
  };

  const handleNextPage = () => {
    void fetch(pagy.page + 1, query);
  };

  return (
    <>
      <h2 className='text-2xl'>Orders</h2>
      <div className='grid grid-cols-1 sm:flex items-center gap-2'>
        <div className='grid grid-cols-4 gap-2 sm:flex sm:flex-1'>
          <div className='col-span-3 sm:flex-1'>
            <SearchBar query={query} setQuery={setQuery} fetch={fetch} isFetching={isFetching} />
          </div>
        </div>
      </div>

      <div className='flex flex-col flex-grow my-4'>
        {orders.length > 0 && !error && !isFetching ? (
          <div className='grid grid-cols-1 gap-3'>
            {orders.map((order) => (
              <OrderCard key={`order_${order.id}`} order={order} />
            ))}
          </div>
        ) : (
          <div className='flex flex-col flex-grow items-center justify-center'>
            {isFetching ? <Spinner color='primary' size='lg' /> : <p className='text-md break-all'>{error ? 'There was an error retrieving your orders' : query.length > 0 ? `No results for ${query}` : 'No orders has been made yet'}</p>}
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className='flex justify-between items-center'>
        <Button size='sm' isDisabled={pagy.page <= 1 || isFetching} onPress={handlePreviousPage}>
          Previous
        </Button>
        <p className='text-sm text-foreground/50'>
          Displaying page {pagy.page} of {pagy.pages}
        </p>
        <Button size='sm' isDisabled={pagy.page === pagy.pages || isFetching} onPress={handleNextPage}>
          Next
        </Button>
      </div>
    </>
  );
};

export default OrdersList;
