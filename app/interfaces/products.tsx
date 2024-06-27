// Interface
import { PagyProps } from '@interfaces/general';

// Products => Page
type ProductsPageProps = {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
};

type ProductData = {
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

// Action => getProducts
type getProductsResponse = {
  products: {
    data?: ProductData[],
  }
  pagy: PagyProps;
};

// Products => Composant => ProductList
type ProductsListProp = {
  products: {
    data?: ProductData[],
  }
  pagy: PagyProps;
};

export type { ProductsPageProps, ProductData, getProductsResponse, ProductsListProp };
