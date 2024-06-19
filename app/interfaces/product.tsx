import { PagyProps } from "./general";

type ProductPageProps = {
  params: {
    id: string;
  };
};

type ProductObj = {
  id: string;
  attributes: {
    id: number;
    description: string;
    price: number;
    title: string;
    stock: number;
    rating: number;
    category: string;
    thumbnail: {
      url: string;
      full: string;
    };
    images: [ProductImageProps];
  };
};

type ProductDataProps = {
  products: {
    data: ProductObj[];
  };
  pagy: PagyProps;
  total: number;
  limit: number;
};

type ProductsListProp = {
  products: ProductObj[];
  pagy: PagyProps;
}

type ProductCardProps = {
  product: ProductObj;
  isLoading?: boolean;
  isIconOnly?: boolean;
};

type ProductImageProps = {
  thumbnail: string;
  full: string;
};

type ProductImagesProps = {
  title: string;
  mainImage: string;
  images: [ProductImageProps];
};

export type { ProductPageProps, ProductObj, ProductDataProps, ProductsListProp, ProductCardProps, ProductImagesProps };
