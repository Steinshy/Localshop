// React
import { FC } from 'react';

// NextJS
import { Metadata } from 'next';

// Actions
import { getProducts } from '@actions/actionsProducts';

// Components
import ProductsHeader from '@components/products/productsHeader';
import ProductsList from '@components/products/productsList';

// Utils
import { capitalize, unslug } from '@utils/helpers';

// Interfaces
import { ProductsCategoryPageProps } from '@interfaces/products';

export const metadata: Metadata = {
  title: 'Products'
};

const ProductsCategoryPage: FC<ProductsCategoryPageProps> = async ({ params, searchParams }) => {
  const urlParams = searchParams || {}, title = capitalize(unslug(params.categorySlug));
  const { data, pagy } = await getProducts(1, urlParams['q']?.toString(), params.categorySlug);

  return (
    <>
      <ProductsHeader title={title} />
      <div className='gap-2 px-2 pb-4 my-4'>
        <ProductsList data={data} pagy={pagy} categorySlug={params.categorySlug} />
      </div>
    </>
  );
};

export default ProductsCategoryPage;
