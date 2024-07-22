// React
import { FC } from 'react';

// NextJS
import type { Metadata } from 'next';

// Actions
import { getPreviouslyOrdered, getProduct } from '@actions/actionsProducts';
import { getProductReviews } from '@actions/actionsReviews';

// Components
import ProductImages from '@components/product/productImages';
import AddToCard from '@components/product/addToCart';
import ProductReview from '@components/product/productReview';
import PreviouslyOrdered from '@components/product/previouslyOrdered';

// Utils
import { capitalize, unslug } from '@utils/helpers';

// Interfaces
import { ProductPageProps } from '@interfaces/product';

export const generateMetadata = async ({ params }:ProductPageProps): Promise<Metadata> => {
  const { data, error } = await getProduct(params.productSlug);
  if (error) return {};
  return { title: `${data.attributes.title} - ${capitalize(unslug(params.categorySlug))}` };
}

const ProductPage: FC<ProductPageProps> = async ({ params }) => {
  const [product, reviews, previouslyOrdered] = await Promise.all([getProduct(params.productSlug),
                                                getProductReviews(params.productSlug),
                                                getPreviouslyOrdered(params.productSlug)
                                              ]);
  const { data: localProduct } = product;
  const { attributes: { id, title, description, price, thumbnail, images } } = localProduct;
  const { data: { reviews: { data: reviewsItems } } } = reviews;
  const { data:previouslyOrderedData } = previouslyOrdered;
  const { item, infos} = previouslyOrderedData;

  return product ? (
    <div className='max-w-screen-2xl mx-auto w-full p-4 mb-4 flex flex-col flex-grow'>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 items-center justify-center flex-grow'>
        <ProductImages key={id} title={title} mainImage={thumbnail.url} images={images} />
        <div className='flex flex-col gap-4'>
          <PreviouslyOrdered item={item} infos={infos} />
          <h1 className='text-3xl font-semibold text-center sm:text-start'>{title}</h1>
          <p className='text-md text-foreground/75'>{description}</p>
          <p className='text-md font-semibold'>{price}€</p>
          <div className='flex justify-center sm:justify-start'>
            <AddToCard localProduct={localProduct} />
          </div>
        </div>
      </div>

      <div className='flex flex-col items-center'>
        <h2 className='text-2xl font-semibold text-center my-4'>User Reviews</h2>
        {reviewsItems.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 w-full'>
            {reviewsItems.map((review) => (
              <ProductReview key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <p className='text-lg text-center'>No reviews has been added yet</p>
        )}
      </div>
    </div>
  ) : null;
};

export default ProductPage;
