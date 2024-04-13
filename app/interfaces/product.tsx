type ProductPageProps = {
  params: {
    id: string;
  };
};

type ProductObj = {
  id: number;
  description: string;
  price: number;
  title: string;
  stock: number;
  rating: number;
  category: string;
  thumbnail: string;
  images: [string];
};

type ProductDataProps = {
  products: ProductObj;
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

export type {
  ProductPageProps,
  ProductObj,
  ProductDataProps,
  ProductCardProps,
  ProductImagesProps
}
