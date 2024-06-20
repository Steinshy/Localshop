import { PagyProps } from "./general";

type ProductPageProps = {
  params: {
    id: string;
  };
};

type ProductObj = {
  id: string;
  type: string;
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
    data?: ProductObj[];
  };
  pagy: PagyProps;
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

type ProductsPageProps = {
  searchParams?: {
    [key: string]: string | string[] | undefined
  }; 
}

export type { ProductsPageProps, ProductPageProps, ProductObj, ProductDataProps, ProductsListProp, ProductCardProps, ProductImagesProps };
