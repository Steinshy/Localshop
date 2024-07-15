// NextJS
import { StaticImageData } from 'next/image';
import { Metadata } from 'next';
import Link from 'next/link';

// Components
import ProductCard from '@components/product/productCard';

// Actions
import { getBestSellers, getLastPieces, getNewest } from '@actions/actionsProducts';

// Icons
import { FaAppleWhole, FaArrowRightLong, FaHouse } from 'react-icons/fa6';

// Assets
import { BG } from '@assets/index';
import { Button, ScrollShadow } from '@nextui-org/react';

export const metadata: Metadata = {
  title: 'Home | Localshop',
};

const HomePage = async () => {
  const BGImage = BG as StaticImageData,
    { data: bestSellers } = await getBestSellers(),
    { data: newProducts } = await getNewest(),
    { data: lastPieces } = await getLastPieces();

  return (
    <>
      <section
        className='relative bg-cover bg-center -mt-[64px] min-h-screen flex flex-col items-center p-2'
        style={{ backgroundImage: `url(${BGImage.src})` }}
      >
        <div className='absolute inset-0 bg-black/50 backdrop-blur-sm' />
        <div className='relative text-white px-2 max-w-screen-lg mx-auto h-full flex flex-col flex-grow justify-center'>
          <h1 className='text-8xl flex justify-center items-center my-8'>
            <div className='bg-white text-black p-1 relative rounded-s-lg flex items-center'>
              L<FaAppleWhole className='text-7xl inline' />
              CAL
            </div>
            <div className='bg-black text-white p-1 rounded-e-lg'>SHOP</div>
          </h1>

          <section className='mt-8'>
            <p className='text-4xl font-semibold mb-2 flex items-center underline'>
              <FaHouse className='inline mr-3' /> Your{' '}
              <span className='ml-1 bg-white text-black p-1 rounded-s-lg'>Neighborhood</span>
              <span className='bg-black text-white p-1 rounded-e-lg'>Marketplace</span>
            </p>
            <p className='text-xl pl-8'>
              At LocalShop, we believe in the power of community and the importance of supporting local businesses. Our
              platform connects you with the best local products, handpicked from your neighborhood&apos;s finest
              artisans, farmers, and small business owners. By choosing LocalShop, you&apos;re not only getting
              high-quality, unique items but also contributing to the growth and sustainability of your local economy.
            </p>
            <Button size='md' variant='flat' className='ml-8 mt-4 text-lg text-white' endContent={<FaArrowRightLong />}>
              Read more about us
            </Button>
          </section>
        </div>
        <div className='relative mb-8'>
          <Button
            as={Link}
            href='#shopnow'
            size='md'
            color='primary'
            variant='solid'
            className='ml-8 mt-4 text-lg text-white'
            endContent={<FaAppleWhole />}
          >
            Shop Now
          </Button>
        </div>
      </section>
      <div className='flex flex-col gap-2 px-2 py-4'>
        <section id='shopnow'>
          <div className='my-4'>
            <h2 className='text-4xl inline bg-black text-white p-1 px-2 rounded-lg'>Buy Fresh, Buy Local</h2>
          </div>
          <ScrollShadow hideScrollBar orientation='horizontal' className='max-w-full'>
            <div className='grid grid-flow-col gap-2'>
              {newProducts.map((item) => (
                <div key={item.id} className='w-[300px]'>
                  <ProductCard product={item} />
                </div>
              ))}
            </div>
          </ScrollShadow>
        </section>

        <section>
          <div className='my-4'>
            <h2 className='text-4xl inline bg-black text-white p-1 px-2 rounded-lg'>Our Top Picks</h2>
          </div>
          <ScrollShadow hideScrollBar orientation='horizontal' className='max-w-full'>
            <div className='grid grid-flow-col gap-2'>
              {bestSellers.map((item) => (
                <div key={item.id} className='w-[300px]'>
                  <ProductCard product={item} />
                </div>
              ))}
            </div>
          </ScrollShadow>
        </section>

        <section>
          <div className='my-4'>
            <h2 className='text-4xl inline bg-black text-white p-1 px-2 rounded-lg'>Hurry, Few Left!</h2>
          </div>
          <ScrollShadow hideScrollBar orientation='horizontal' className='max-w-full'>
            <div className='grid grid-flow-col gap-2'>
              {lastPieces.map((item) => (
                <div key={item.id} className='w-[300px]'>
                  <ProductCard product={item} />
                </div>
              ))}
            </div>
          </ScrollShadow>
        </section>
      </div>
    </>
  );
};

export default HomePage;
