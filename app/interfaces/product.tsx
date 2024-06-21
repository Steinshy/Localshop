import { PagyProps } from './general';

// General Interface
type ProductResponse = {
  id: string;
  type: string;
  attributes: {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    thumbnail: ProductThumbnail;
    images: [ProductImage];
  };
};

// ProductResponse => Thumbnail
type ProductThumbnail = {
  url: string;
  full: string;
};
// ProductResponse => Images
type ProductImage = {
  thumbnail: string;
  full: string;
};

// Product API - Get
type getProductResponse = {
  data: ProductResponse;
};

// Product => Page
type ProductPageProps = {
  params: {
    id: string;
  };
};

type ProductDataProps = {
  products: {
    data?: ProductResponse[];
  };
  pagy: PagyProps;
};

// Product => productCard
type ProductCardProps = {
  product: ProductResponse;
  isIconOnly?: boolean;
};

type ProductImagesProps = {
  title: string;
  mainImage: string;
  images: [ProductImage];
};

export type {
  ProductPageProps,
  ProductResponse,
  ProductDataProps,
  ProductCardProps,
  ProductImagesProps,
  getProductResponse,
};
