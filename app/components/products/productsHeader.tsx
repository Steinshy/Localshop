// React
import { FC } from 'react';

// NextJS
import { StaticImageData } from 'next/image';

// NextUI
import { Image } from '@nextui-org/react';

// Assets
import { offer1, offer2, offer3, offer4, BG } from '@assets/index';

// Interfaces
export type ProductsHeaderProps = {
  title?: string;
}

const ProductsHeader: FC<ProductsHeaderProps> = ({ title }) => {
  const offersArray = [offer1, offer2, offer3, offer4] as StaticImageData[],
        BGImage = BG as StaticImageData;

  return (
    <section className='relative bg-cover bg-center min-h-[400px] h-[400px]' style={{ backgroundImage: `url(${BGImage.src})` }}>
      <div className='absolute inset-0 bg-black/50 backdrop-blur-sm' />
      <div className='relative px-2 max-w-screen-lg mx-auto h-full flex flex-col items-center justify-center gap-4'>
        <h1 className='text-white text-3xl font-bold tracking-tight text-heading lg:text-4xl xl:text-5xl'>
          {title || 'Products'}
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
  );
};

export default ProductsHeader;
