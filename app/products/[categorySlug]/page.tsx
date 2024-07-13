// React
import { FC } from 'react';

// NextJS
import { Metadata } from 'next';

// Actions
import { getProducts } from '@actions/actionsProducts';

// Components
import ProductsList from '@components/products/productsList';

// NextUI
import { Card, Image } from '@nextui-org/react';

// Assets
import { offer1, offer2, offer3, offer4, BG } from '../../assets/index';

// Utils
import { capitalize, unslug } from '@utils/helpers';

// Interfaces
import { ProductsCategoryPageProps } from '@interfaces/products';

export const metadata: Metadata = {
  title: 'Products'
};

const ProductsCategoryPage: FC<ProductsCategoryPageProps> = async ({ params, searchParams }) => {
  const urlParams = searchParams || {}, offersArray = [offer1, offer2, offer3, offer4];
  const { data, pagy } = await getProducts(1, urlParams['q']?.toString(), params.categorySlug);

  const title = capitalize(unslug(params.categorySlug));

  return (
    <>
      <section className='relative bg-cover bg-center min-h-[400px] h-[400px]' style={{ backgroundImage: `url(${BG.src})` }}>
        <div className='absolute inset-0 bg-black/50 backdrop-blur-sm' />
        <div className='relative px-2 max-w-screen-lg mx-auto h-full flex flex-col items-center justify-center gap-4'>
          <h1 className='text-white text-3xl font-bold tracking-tight text-heading lg:text-4xl xl:text-5xl'>
            {title}
          </h1>
          <p className='text-white text-md text-heading xl:text-lg lg:text-md'>
            Welcome to our product catalog, where innovation meets excellence! We have a curated selection of
            high-quality products tailored to meet your diverse needs and exceed your expectations. Whether you&#39;re a
            beginner or an expert, we have something for you. All of our products are carefully crafted to enhance your
            experience and make every task seamless. From cutting-edge technology to timeless classics, we offer a wide
            range of options to choose from.
          </p>
          <div className='grid gap-2 grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4'>
            {offersArray.map((offer, i) => (
              <Image
                key={`header_img_${i}`}
                className='aspect-video'
                alt={`offersImage_${i}`}
                src={offer.src}
                removeWrapper
              />
            ))}
          </div>
        </div>
      </section>
      <div className='gap-2 px-2 pb-4 my-4'>
        <ProductsList data={data} pagy={pagy} categorySlug={params.categorySlug} />
      </div>
    </>
  );
};

export default ProductsCategoryPage;
