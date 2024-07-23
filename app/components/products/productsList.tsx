'use client';

// React
import { useState, useEffect, FC, useCallback } from 'react';

// NextUI
import { Spinner } from '@nextui-org/react';

// NextJS
import { useSearchParams } from 'next/navigation';

// Components
import ProductCard from '@components/product/productCard';

// Interfaces
import { PagyProps } from '@interfaces/general';
import { ProductResponse } from '@interfaces/product';
import { ProductsListProp } from '@interfaces/products';

// Actions
import { getProducts } from '@actions/actionsProducts';
import SearchBar from '@components/searchBar';

const ProductsList: FC<ProductsListProp> = ({ data, pagy, categorySlug }) => {
  const searchParams = useSearchParams(),
        [localPagy, setLocalPagy] = useState<PagyProps>(pagy || { page: 0, pages: 1 }),
        [localProducts, setLocalProducts] = useState<ProductResponse[]>(data || []),
        [query, setQuery] = useState<string>(searchParams.get('q') || ''),
        [isFetching, setIsFetching] = useState<boolean>(false);

  const fetch = useCallback(async (page?: number, query?: string) => {
    page = page || 1;
    if (page < 1 || page > localPagy.pages || isFetching || query === searchParams.get('q')) return;
    setIsFetching(true);

    void updateQueryURL(query);

    const { data, pagy, error } = await getProducts(page, query, categorySlug);
    setIsFetching(false);

    if (!error) {
      setLocalProducts((previousProducts) => (page > 1 ? [...previousProducts, ...data] : data));
      setLocalPagy(pagy);
    }
  }, [isFetching, localPagy.pages, searchParams, categorySlug]);

  const updateQueryURL = (value?: string) =>  {
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

  // Infinite scrolling
  useEffect(() => {
    const handleScroll = () => {
      const offsetY = 10;
      if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - offsetY)
        return;
      void fetch(localPagy.page + 1, query);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [localPagy.page, fetch, query, isFetching, searchParams]);

  return (
    <>
      {/* Search form */}
      <SearchBar query={query} setQuery={setQuery} fetch={fetch} isFetching={isFetching} />

      {/* Products List */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 w-full my-4'>
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
        <div className='flex justify-center items-center mt-4'>
          <p className='text-sm text-foreground/50'>{localProducts.length} Products</p>
        </div>
      )}
    </>
  );
};

export default ProductsList;
