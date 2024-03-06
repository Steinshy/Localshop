'use client';

// React - NextUi
import { FC, useState } from 'react';
import { Image, Link } from '@nextui-org/react';

// Interface - ProductImagesProps
import { ProductImagesProps } from "../../utils/site";

const ProductImages:FC<ProductImagesProps> = ({ alt, main, images }: { alt: string, main: string, images: [string]}) => {

  const [mainImage, setMainImage] = useState(main);
  const handleImageChange = (image: string) => { setMainImage(image); }

  return (
    <div className="flex flex-col items-center">
      <Image
        alt={alt}
        src={mainImage}
        classNames={{
          img: "w-[300px] h-[300px] object-cover",
          wrapper: "border-2",
        }}
        radius="sm"
        isZoomed
      />

      <div className="grid grid-flow-col mt-2 gap-3 max-w-[300px]">
        {images.map((image: string, index: number) => (
          <Link key={index} href="#" onMouseOver={() => handleImageChange(image)}>
            <Image
              alt={alt}
              src={image}
              classNames={{
                img: "w-[40px] h-[40px] object-cover",
                wrapper: "border-2",
              }}
              shadow="none"
              radius="sm"
              isZoomed
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
