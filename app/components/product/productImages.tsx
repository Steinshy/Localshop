"use client";

// React
import { FC, useState, useCallback } from "react";

// NextUI
import { Image } from "@nextui-org/react";

// Interfaces
import { ProductImagesProps } from "@interfaces/product";

const ProductImages: FC<ProductImagesProps> = ({ alt, main, images }) => {
  const [mainImage, setMainImage] = useState(main);

  const handleImageChange = useCallback((image: string) => {
    setMainImage(image);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <Image
        alt={alt}
        src={mainImage}
        className="w-[300px] h-[300px] object-cover"
        shadow="none"
        radius="sm"
        isZoomed
      />

      <div className="grid grid-flow-col mt-2 gap-3 max-w-[300px]">
        {images.map((image) => (
          <Image
            className="w-[40px] h-[40px] object-cover"
            key={image.full}
            alt={alt}
            src={image.thumbnail}
            shadow="none"
            radius="sm"
            isZoomed
            onMouseOver={() => handleImageChange(image.full)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
