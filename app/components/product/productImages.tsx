'use client';

// React
import { FC, useState, useCallback } from 'react';

// NextUI
import { Card, Image } from '@nextui-org/react';

// Interfaces
import { ProductImagesProps } from '@interfaces/product';

const ProductImages: FC<ProductImagesProps> = ({ title, mainImage, images }) => {
  const [selectedImage, setSelectedImage] = useState(mainImage);
  const handleImageChange = useCallback((newImage: string) => {
    setSelectedImage(newImage);
  }, []);

  return (
    <div className='flex flex-col items-center'>
      <Card className='w-[300px] h-[300px]'>
        <Image
          className='w-[300px] h-[300px] object-cover'
          alt={title}
          src={selectedImage}
          shadow='none'
          radius='sm'
          isZoomed
        />
      </Card>

      {images.length > 1 &&
        <div className='grid grid-flow-col mt-2 gap-3 max-w-[300px]'>
          {images.map((image) => (
            <Card key={image.full} className='w-[40px] h-[40px] object-cover'>
              <Image
                className='w-[40px] h-[40px] object-cover'
                shadow='none'
                radius='sm'
                alt={title}
                src={image.thumbnail}
                onMouseOver={() => handleImageChange(image.full)}
              />
            </Card>
          ))}
        </div>
      }
    </div>
  );
};

export default ProductImages;
