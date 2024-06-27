'use client';

// React
import { useState, useEffect, FC, useCallback } from 'react';

// NextUI
import { Input, Spinner } from '@nextui-org/react';

// NextJS
import { useSearchParams } from 'next/navigation';

// Components
import ProductCard from '@components/product/productCard';

// Icons
import { FaSearch } from 'react-icons/fa';

// Interfaces
import { PagyProps } from '@interfaces/general';
import { ProductResponse } from '@interfaces/product';
import { ProductsListProp } from '@interfaces/products';

// Actions
import { getProducts } from 'actions';

const ProductsList: FC<ProductsListProp> = ({ products, pagy }) => {
  const searchParams = useSearchParams();
  const [localPagy, setLocalPagy] = useState<PagyProps>(pagy || { page: 0, pages: 1 }),
    [localProducts, setLocalProducts] = useState<ProductResponse[]>(products.data || []),
    [query, setQuery] = useState<string>(searchParams.get('q') || ''),
    [isFetching, setIsFetching] = useState<boolean>(false);

  const fetchData = useCallback(
    async (page: number, query: string) => {
      if (page > localPagy.pages || isFetching) return;
      setIsFetching(true);

      try {
        const { products, pagy } = await getProducts(page, query);

        if (page > 1) {
          setLocalProducts((localProducts) => [...(localProducts || []), ...(products.data || [])]);
        } else {
          setLocalProducts(products.data || []);
        }
        setLocalPagy(pagy);
        setIsFetching(false);
      } catch (error) {
        setIsFetching(false);
        console.error('An error occurred while fetching products: ', error);
      }
    },
    [isFetching, localPagy.pages]
  );

  const updateQueryURL = (value?: string) => {
    value = value || undefined;
    if (value !== undefined) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('q', value);
      window.history.pushState(null, '', `?${params.toString()}`);
    } else {
      const url = window.location.href.split('?')[0];
      window.history.pushState({}, '', url);
    }
  };

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    void updateQueryURL(query);
    void fetchData(1, query);
  };

  const handleClear = () => {
    setQuery('');
    void updateQueryURL();
    void fetchData(1, '');
  };

  // Infinite scrolling
  useEffect(() => {
    const handleScroll = () => {
      const offsetY = 10;
      if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - offsetY)
        return;
      void fetchData(localPagy.page + 1, query);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [localPagy.page, fetchData, query, isFetching]);

  return (
    <>
      {/* Search form */}
      <form onSubmit={handleSearch} className='flex justify-center items-center px-2 mb-4'>
        <Input
          aria-label='Search'
          placeholder='Type...'
          type='search'
          value={query}
          onValueChange={setQuery}
          onClear={handleClear}
          startContent={<FaSearch />}
          size='md'
          className='max-w-screen-2xl'
          isDisabled={isFetching}
          isClearable
        />
      </form>

      {/* Products list */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 px-2 pb-4'>
        {localProducts.map((product) => (
          <ProductCard key={`product_${product.id}`} product={product} />
        ))}
      </div>

      {/* Infinite scrolling loading state */}
      {isFetching && (
        <div className='flex justify-center items-center my-2'>
          <Spinner />
        </div>
      )}

      {/* Results - end of the pages */}
      {localPagy.page >= localPagy.pages && (
        <div className='flex justify-center items-center my-4'>
          <p className='text-sm text-foreground/50'>{localProducts.length} Products</p>
        </div>
      )}
    </>
  );
};

export default ProductsList;
