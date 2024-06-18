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
    data: ProductObj;
  };
  pagy: {
    pages: number;
  };
  total: number;
  limit: number;
};

type ProductsListProp = {
  getProducts: (page?: number | undefined, query?: string | undefined) => Promise<ProductDataProps>;
  products: ProductObj[];
  pages: number;
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
  alt: string;
  main: string;
  images: [ProductImageProps];
};

export type { ProductPageProps, ProductObj, ProductDataProps, ProductsListProp, ProductCardProps, ProductImagesProps };
