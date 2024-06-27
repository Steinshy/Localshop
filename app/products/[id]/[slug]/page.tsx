'use server';

// React
import { FC } from 'react';

// Actions
import { getProduct, getProductReviews } from 'actions';

// Components
import ProductImages from '@components/product/productImages';
import Breadcrumb from '@components/layout/breadCrumb';
import AddToCard from '@components/product/addToCart';
import ProductReviews from '@components/product/productReviews';

// Interfaces
import { ProductResponse, ProductPageProps } from '@interfaces/product';

const ProductPage: FC<ProductPageProps> = async ({ params }) => {
  const product = (await getProduct(params.id)) as ProductResponse;
  const { attributes } = product;
  const { id, title, description, price, thumbnail, images } = attributes;
  const { reviews } = await getProductReviews(params.id);

  const breadCrumbItems = [{ title: 'Products', href: '/products' }, { title: title }];

  return product ? (
    <>
      <Breadcrumb items={breadCrumbItems} />
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 items-center justify-center p-4'>
        <ProductImages key={id} title={title} mainImage={thumbnail.url} images={images} />
        <div className='flex flex-col gap-4'>
          <h1 className='text-3xl font-semibold text-center sm:text-start'>{title}</h1>
          <p className='text-md text-foreground/75'>{description}</p>
          <p className='text-md font-semibold'>{price}€</p>

          <div className='flex justify-center sm:justify-start'>
            <AddToCard localProduct={product} />
          </div>
        </div>
      </div>
      <div className='flex flex-col flex-grow justify-center p-4'>
        <h2 className='text-2xl font-semibold text-center mb-4'>User Reviews</h2>
        <div className='grid grid-cols-4 gap-4'></div>
        {reviews.data.length === 0 ? (
          reviews.data.map((review) => <ProductReviews key={review.id} review={review} />)
        ) : (
          <p>No reviews yet</p>
        )}
      </div>
    </>
  ) : null;
};

export default ProductPage;
