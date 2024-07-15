// NextJS
import { StaticImageData } from 'next/image';
import { Metadata } from 'next';

// Components
import ProductCard from '@components/product/productCard';

// Actions
import { getBestSellers, getLastPieces, getNewest } from '@actions/actionsProducts';

// Assets
import { BG } from '@assets/index';
import { ScrollShadow } from '@nextui-org/react';

export const metadata: Metadata = {
  title: 'Home | Localshop'
};

const HomePage = async () => {
  const BGImage = BG as StaticImageData,
        { data:bestSellers } = await getBestSellers(),
        { data:newProducts } = await getNewest(),
        { data:lastPieces } = await getLastPieces();

  return (
    <>
      <section className='relative bg-cover bg-center min-h-[400px] flex flex-col items-center p-2' style={{ backgroundImage: `url(${BGImage.src})` }}>
        <div className='absolute inset-0 bg-black/50 backdrop-blur-sm' />
        <div className='text-white relative px-2 max-w-screen-lg mx-auto h-full flex flex-col flex-grow items-center justify-center'>
          <h1 className="text-5xl">Welcome to Localshop!</h1>

          <p className="text-lg text-center mt-4">
            Localshop is a platform that allows you to buy and sell products from local businesses in your area.
          </p>

          <p className="text-lg text-center">
            We believe that local businesses are the backbone of our communities and we want to help them thrive.
          </p>
        </div>
      </section>
      <div className='flex flex-col gap-2 px-2 py-4'>
      <section>
          <h2 className='text-4xl my-2'>Best Sellers</h2>
          <ScrollShadow hideScrollBar orientation="horizontal" className="max-w-full">
            <div className='grid grid-flow-col gap-2'>
              {bestSellers.map((item) => (
                <div key={item.id} className='w-[330px]'>
                  <ProductCard product={item} />
                </div>
              ))}
            </div>
          </ScrollShadow>
        </section>

        <section>
          <h2 className='text-4xl my-2'>New</h2>
          <ScrollShadow hideScrollBar orientation="horizontal" className="max-w-full">
            <div className='grid grid-flow-col gap-2'>
              {newProducts.map((item) => (
                <div key={item.id} className='w-[330px]'>
                  <ProductCard product={item} />
                </div>
              ))}
            </div>
          </ScrollShadow>
        </section>
       
        <section>
          <h2 className='text-4xl my-2'>Last pieces</h2>
          <ScrollShadow hideScrollBar orientation="horizontal" className="max-w-full">
            <div className='grid grid-flow-col gap-2'>
              {lastPieces.map((item) => (
                <div key={item.id} className='w-[330px]'>
                  <ProductCard product={item} />
                </div>
              ))}
            </div>
          </ScrollShadow>
        </section>
      </div>
    </>
  );
}

export default HomePage;
