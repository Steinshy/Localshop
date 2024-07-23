// React
import { FC } from 'react';

// NextJS
// import { notFound } from 'next/navigation';
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

// TODO :
// Request Category and return undefined if not found
export const generateMetadata = ({ params }: ProductsCategoryPageProps): Metadata => {
  return { title: capitalize(unslug(params.categorySlug)) };
};

// TODO :
// Request Category and redirect to 404 if not found
const ProductsCategoryPage: FC<ProductsCategoryPageProps> = async ({ params, searchParams }) => {
  const urlParams = searchParams || {},
    title = capitalize(unslug(params.categorySlug));
  const { data, pagy } = await getProducts(1, urlParams['q']?.toString(), params.categorySlug);

  return (
    <>
      <ProductsHeader title={title} />
      <div className="max-w-screen-2xl mx-auto w-full flex flex-col items-center flex-grow mt-4 mb-8 px-2">
        <ProductsList data={data} pagy={pagy} categorySlug={params.categorySlug} />
      </div>
    </>
  );
};

export default ProductsCategoryPage;
