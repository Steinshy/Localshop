'use client';

// React
import { FC, useCallback, useState } from 'react';

// NextUI
import { Card, Image } from '@nextui-org/react';

// Interfaces
import { ProductImagesProps } from '@interfaces/product';

const ProductImages: FC<ProductImagesProps> = ({ title, mainImage, images }) => {
  const [selectedImage, setSelectedImage] = useState(mainImage);

  const handleImageMouseOver = useCallback((newImage: string) => {
    setSelectedImage(newImage);
  }, [setSelectedImage]);

  const thumbnailImages = images.map((image) => (
    <Card key={image.full} className='w-[40px] h-[40px] object-cover' onMouseOver={() => handleImageMouseOver(image.full)}>
      <Image className='w-[40px] h-[40px] object-cover' radius='sm' alt={title} src={image.thumbnail} />
    </Card>
  ));

  return (
    <div className='flex flex-col items-center'>
      <Card className='w-[300px] h-[300px]'>
        <Image className='w-[300px] h-[300px] object-cover' alt={title} src={selectedImage} radius='sm' isZoomed />
      </Card>

      {images.length > 0 && <div className='grid grid-flow-col mt-2 gap-3 max-w-[300px]'>{thumbnailImages}</div>}
    </div>
  );
};

export default ProductImages;
