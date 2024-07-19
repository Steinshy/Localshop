'use client';

// React
import { FC, useState } from 'react';

// NextUI
import { Button, Input, Spinner } from '@nextui-org/react';

// Components
import OrderCard from '@components/user/order/orderCard';

// Icons
import { FaSearch } from 'react-icons/fa';

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

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    void fetch(1, query);
  };

  const handleClear = () => {
    setQuery('');
    void fetch(1);
  };

  const handlePreviousPage = () => {
    void fetch(pagy.page - 1, query);
  };

  const handleNextPage = () => {
    void fetch(pagy.page + 1, query);
  };

  return (
    <>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl'>Orders</h1>
        {/* Search form */}
        <form onSubmit={handleSearch} className='flex flex-grow justify-center items-center px-2'>
          <Input aria-label='Search' placeholder='Type...' type='search' value={query} onValueChange={setQuery} onClear={handleClear} startContent={<FaSearch />} size='md' isDisabled={isFetching} isClearable />
        </form>
      </div>

      <div className='flex flex-col flex-grow'>
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
