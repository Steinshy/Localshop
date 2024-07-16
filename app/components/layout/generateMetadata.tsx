import { FC } from 'react';

type ProductMetadataProps = {
  productSlug: string;
};

export const ProductMetadata: FC<ProductMetadataProps> = ({ productSlug }) => {
  return <div>{`Product - ${productSlug}`}</div>;
};
