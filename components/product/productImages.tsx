'use client';

// React
import { FC, useState } from 'react';

// NextUI
import { Image, Modal, ModalContent, useDisclosure } from '@nextui-org/react';

// Interfaces
import { ProductImagesProps } from '@interfaces/product';

const ProductImages: FC<ProductImagesProps> = ({ title, mainImage, images }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState<string>(mainImage);

  const handleImageMouseOver = (newImage: string) => {
    if (newImage !== selectedImage) setSelectedImage(newImage);
  };

  const thumbnailImages = images.map((image) => (
    <Image
      key={image.full}
      removeWrapper
      className="w-[40px] h-[40px] object-cover shadow-sm rounded-md border-1 hover:cursor-pointer"
      alt={title}
      src={image.thumbnail}
      onMouseOver={() => handleImageMouseOver(image.full)}
      // onMouseLeave={() => handleImageMouseOver(mainImage)}
    />
  ));

  return (
    <div className="flex flex-col items-center">
      <Image onClick={onOpen} className="w-[300px] h-[300px] object-cover hover:cursor-zoom-in" alt={title} src={selectedImage} removeWrapper />
      {images.length > 1 && <div className="grid grid-flow-col mt-2 gap-3 max-w-[300px]">{thumbnailImages}</div>}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl" hideCloseButton>
        <ModalContent>{(onClose) => <Image onClick={onClose} className="w-full object-contains hover:cursor-zoom-out" alt={title} src={selectedImage} removeWrapper />}</ModalContent>
      </Modal>
    </div>
  );
};

export default ProductImages;
