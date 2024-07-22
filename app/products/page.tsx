// React
import { FC } from 'react';

// NextJS
import { Metadata } from 'next';

// Actions
import { getProducts } from '@actions/actionsProducts';

// Components
import ProductsHeader from '@components/products/productsHeader';
import ProductsList from '@components/products/productsList';

// Interfaces
import { ProductsPageProps } from '@interfaces/products';

export const metadata: Metadata = { title: 'Products' };

const ProductsPage: FC<ProductsPageProps> = async ({ searchParams }) => {
  const urlParams = searchParams || {};
  const { data, pagy } = await getProducts(1, urlParams['q']?.toString());

  return (
    <>
      <ProductsHeader />
      <div className='max-w-screen-2xl mx-auto w-full flex flex-col items-center flex-grow mt-4 mb-8 px-2'>
        <ProductsList data={data} pagy={pagy} />
      </div>
    </>
  );
};

export default ProductsPage;
