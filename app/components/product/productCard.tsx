'use client';

// React
import { FC } from 'react';

// NextJS
import Link from 'next/link';

// NextUI
import { Image, Chip } from '@nextui-org/react';

// Components
import AddToCart from '@components/product/addToCart';
import ReviewsStars from '@components/product/reviewsStars';

// Interfaces
import { ProductCardProps } from '@interfaces/product';

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { attributes } = product;
  const { slug, title, thumbnail, price, rating, stock, category } = attributes;
  const { url: image } = thumbnail;
  const { data: { attributes: { slug:categorySlug } } } = category;

  return (
    <article className='border-1 rounded-md shadow-md relative w-full h-full flex flex-col'>
      {/* Chip */}
      <div className='absolute top-4 right-4 z-[11]'>
        <Link href={`/products/${categorySlug}/${slug}`}>
          {stock > 50 ? (
            <Chip color='danger' size='md'>New</Chip>
          ) : stock < 10 && stock > 1 ? (
            <Chip color='danger' size='md'>Low stock</Chip>
          ) : stock < 2 && (
            <Chip color='danger' size='md'>Last piece!</Chip>
          )}
        </Link>
      </div>
      {/* Image */}
      <div className='flex flex-col'>
        <Link href={`/products/${categorySlug}/${slug}`}>
          <Image
            removeWrapper
            radius='none'
            shadow='none'
            className='bg-default/20 w-full h-[250px] object-cover'
            alt={title}
            src={image}
          />
        </Link>
      </div>
      {/* Infos */}
      <div className='flex flex-col flex-grow justify-between p-2'>
        <h2 className='text-md text-center'>{title}</h2>
        <div className='flex justify-center my-3'>
          <ReviewsStars rating={rating} />
        </div>
        <div className='flex justify-between'>
          <p className='text-lg'>{price} €</p>
          <AddToCart localProduct={product} isIconOnly />
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
