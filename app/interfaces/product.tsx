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
    };
    images: [string];
  };
};

type ProductDataProps = {
  products: {
    data: ProductObj;
  }
  pagy: {
    pages: number;
  }
  total: number;
  limit: number;
};

type ProductCardProps = {
  product: ProductObj;
  isLoading?: boolean;
  isIconOnly?: boolean;
};

type ProductImagesProps = {
  alt: string;
  main: string;
  images: [string];
};

export type { ProductPageProps, ProductObj, ProductDataProps, ProductCardProps, ProductImagesProps };
