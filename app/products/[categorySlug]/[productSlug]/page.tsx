// React
import { FC } from 'react';

// NextJS
import { Metadata } from 'next';

// Actions
import { getProduct } from '@actions/actionsProducts';
import { getProductReviews } from '@actions/actionsReviews';

// Components
import ProductImages from '@components/product/productImages';
import AddToCard from '@components/product/addToCart';
import ProductReview from '@components/product/productReview';

// Interfaces
import { ProductPageProps } from '@interfaces/product';
import PreviouslyOrdered from '@components/product/previouslyOrdered';

type MetaProps = { params: { productSlug: string } }
 
export async function generateMetadata({ params }: MetaProps): Promise<Metadata> {
  const { productSlug } = params;
  const { data } = await getProduct(productSlug);
  const { attributes: { title } } = data;
  return { title: title }
}

const ProductPage: FC<ProductPageProps> = async ({ params }) => {
  const { productSlug } = params;
  const [product, reviews] = await Promise.all([getProduct(productSlug), getProductReviews(productSlug)]);

  const { data:localProduct } = product;
  const { attributes: { id, title, description, price, thumbnail, images } } = localProduct;
  const { data: { reviews: { data:reviewsItems } } } = reviews;
  
  return product ? (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 items-center justify-center p-4'>
        <ProductImages key={id} title={title} mainImage={thumbnail.url} images={images} />
        <div className='flex flex-col gap-4'>
          <PreviouslyOrdered productId={id} />
          <h1 className='text-3xl font-semibold text-center sm:text-start'>{title}</h1>
          <p className='text-md text-foreground/75'>{description}</p>
          <p className='text-md font-semibold'>{price}€</p>
          <div className='flex justify-center sm:justify-start'>
            <AddToCard localProduct={localProduct} />
          </div>
        </div>
      </div>

      <div className='flex flex-col flex-grow justify-center p-4'>
        <h2 className='text-2xl font-semibold text-center mb-4'>User Reviews</h2>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
          {reviewsItems.length > 0 ? (
            reviewsItems.map((review) => <ProductReview key={review.id} review={review} />)
          ) : (
            <p className='text-lg text-center'>No reviews has been added yet</p>
          )}
        </div>
      </div>
    </>
  ) : null;
};

export default ProductPage;
